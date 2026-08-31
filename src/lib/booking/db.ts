// Persistence layer for seat bookings (Neon Postgres via the serverless driver).
//
// Single-statement paths use the stateless HTTP driver (one fetch per query —
// nothing to go stale while a Vercel function instance is suspended). The
// booking transaction needs an interactive session, so it opens a fresh
// WebSocket Client per request and closes it in `finally`; per-request
// connections to the pgbouncer endpoint are cheap at this volume.
//
// Seat creation is serialized with a transaction-scoped advisory lock: one
// course, low volume — correctness matters more than write throughput. The
// availability check runs inside the same transaction as the INSERT, so two
// simultaneous requests can never both claim the last seat. lock_timeout keeps
// a stalled holder from queueing every other request behind it indefinitely.
//
// Both course rules are additionally enforced by unique constraints, so even a
// bug in the application check cannot overfill a group or give one student two
// seats in the same lab; those violations are translated back into the ordinary
// error codes rather than surfacing as a 500.

import { Client, neon, neonConfig } from '@neondatabase/serverless';
import type { SeatBooking, SeatResult, SeatUnavailableReason } from './logic';
import { FIRST_DATE, LAST_DATE, MAX_SEATS_PER_GROUP } from './semester';

const ADVISORY_LOCK_KEY = 823472;

/** Postgres error code when lock_timeout expires while waiting. */
export const PG_LOCK_TIMEOUT = '55P03';
/** Postgres error code for a unique-constraint violation. */
const PG_UNIQUE_VIOLATION = '23505';

const SEAT_CONSTRAINT = 'slot_bookings_seat_key';
const ONE_PER_LAB_CONSTRAINT = 'slot_bookings_one_per_lab_idx';

export interface SlotBookingRow extends SeatBooking {
  id: string;
  studentName: string;
}

export interface CreateSeatInput {
  labId: string;
  date: string;
  group: number;
  studentName: string;
  studentEmail: string;
}

export type CreateSeatOutcome =
  | { ok: true; booking: SlotBookingRow; cancelToken: string }
  | { ok: false; reason: SeatUnavailableReason | 'already-booked' };

// Node 22+ ships a global WebSocket, which the Neon driver uses locally.
if (typeof WebSocket !== 'undefined') {
  neonConfig.webSocketConstructor = WebSocket;
}

function connectionString(): string {
  const url = process.env.DATABASE_URL ?? (import.meta.env.DATABASE_URL as string | undefined);
  if (!url) throw new Error('DATABASE_URL is not set');
  return url;
}

type HttpSql = ReturnType<typeof neon>;
let httpSql: HttpSql | null = null;
let schemaReady: Promise<void> | null = null;

/** Stateless HTTP query function — safe to cache, holds no connection. */
function sql(): HttpSql {
  if (!httpSql) httpSql = neon(connectionString());
  return httpSql;
}

/**
 * The seat CHECK bound is interpolated from config rather than parameterized —
 * Postgres does not accept placeholders in DDL. Validated as a small integer so
 * a mistyped config can never become injected SQL.
 */
function seatBound(): number {
  const bound = Number(MAX_SEATS_PER_GROUP);
  if (!Number.isInteger(bound) || bound < 1 || bound > 20) {
    throw new Error(`booking/semester.ts: seatsPerGroup out of range (${MAX_SEATS_PER_GROUP})`);
  }
  return bound;
}

/** Idempotent schema setup, deduplicated per function instance. */
export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      try {
        await sql().query(`
          CREATE TABLE IF NOT EXISTS slot_bookings (
            id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            lab_id text NOT NULL,
            booking_date date NOT NULL,
            group_number int NOT NULL CHECK (group_number >= 1),
            seat_number int NOT NULL
              CHECK (seat_number >= 1 AND seat_number <= ${seatBound()}),
            student_name text NOT NULL,
            student_email text NOT NULL,
            cancel_token text NOT NULL,
            created_at timestamptz NOT NULL DEFAULT now(),
            CONSTRAINT ${SEAT_CONSTRAINT}
              UNIQUE (lab_id, booking_date, group_number, seat_number)
          )`);
        // one seat per student per lab — the course's repeat rule, enforced
        // in the database so the application check cannot be the only guard
        await sql().query(`
          CREATE UNIQUE INDEX IF NOT EXISTS ${ONE_PER_LAB_CONSTRAINT}
            ON slot_bookings (lab_id, lower(student_email))`);
        await sql().query(`
          CREATE INDEX IF NOT EXISTS slot_bookings_lab_date_idx
            ON slot_bookings (lab_id, booking_date)`);
      } catch (err) {
        // two cold instances can race the DDL; the loser's error is benign
        const code = (err as { code?: string })?.code;
        if (code === PG_UNIQUE_VIOLATION || code === '42P07') return;
        schemaReady = null; // allow retry on next request
        throw err;
      }
    })();
  }
  return schemaReady;
}

function rowToBooking(row: Record<string, unknown>): SlotBookingRow {
  return {
    id: String(row.id),
    labId: String(row.lab_id),
    date: String(row.booking_date),
    group: Number(row.group_number),
    seat: Number(row.seat_number),
    studentName: String(row.student_name),
  };
}

// booking_date::text keeps the date a plain 'YYYY-MM-DD' string — letting the
// driver parse it into a JS Date shifts it a day when the server is east of UTC
const SELECT_FIELDS =
  'id, lab_id, booking_date::text AS booking_date, group_number, seat_number, student_name';

/** Every seat booked in the semester window — at most a few dozen rows. */
export async function listSemesterBookings(): Promise<SlotBookingRow[]> {
  await ensureSchema();
  const rows = (await sql().query(
    `SELECT ${SELECT_FIELDS} FROM slot_bookings
     WHERE booking_date BETWEEN $1 AND $2
     ORDER BY booking_date, lab_id, group_number, seat_number`,
    [FIRST_DATE, LAST_DATE]
  )) as Record<string, unknown>[];
  return rows.map(rowToBooking);
}

/** Map a unique-constraint violation back to the rule the student broke. */
function reasonForUniqueViolation(err: unknown): CreateSeatOutcome | null {
  if ((err as { code?: string })?.code !== PG_UNIQUE_VIOLATION) return null;
  const constraint = (err as { constraint?: string })?.constraint ?? '';
  if (constraint === ONE_PER_LAB_CONSTRAINT) return { ok: false, reason: 'already-booked' };
  if (constraint === SEAT_CONSTRAINT) return { ok: false, reason: 'group-full' };
  return null;
}

/**
 * Claim a seat. `check` receives the seats already taken for that lab and date
 * and decides (pure logic) whether the request fits and which seat it gets.
 */
export async function createSeatBooking(
  input: CreateSeatInput,
  check: (existing: SeatBooking[]) => SeatResult
): Promise<CreateSeatOutcome> {
  await ensureSchema();
  const client = new Client({ connectionString: connectionString() });
  await client.connect();
  try {
    await client.query('BEGIN');
    // fail fast instead of queueing the whole site behind a stalled holder
    await client.query("SET LOCAL lock_timeout = '5s'");
    await client.query("SET LOCAL statement_timeout = '10s'");
    await client.query('SELECT pg_advisory_xact_lock($1)', [ADVISORY_LOCK_KEY]);

    const { rows: mine } = await client.query(
      `SELECT 1 FROM slot_bookings
       WHERE lab_id = $1 AND lower(student_email) = lower($2) LIMIT 1`,
      [input.labId, input.studentEmail]
    );
    if (mine.length > 0) {
      await client.query('ROLLBACK');
      return { ok: false, reason: 'already-booked' };
    }

    const { rows } = await client.query(
      `SELECT ${SELECT_FIELDS} FROM slot_bookings WHERE lab_id = $1 AND booking_date = $2`,
      [input.labId, input.date]
    );
    const result = check(rows.map(rowToBooking));
    if (!result.ok) {
      await client.query('ROLLBACK');
      return { ok: false, reason: result.reason };
    }

    const cancelToken = crypto.randomUUID();
    const inserted = await client.query(
      `INSERT INTO slot_bookings
         (lab_id, booking_date, group_number, seat_number,
          student_name, student_email, cancel_token)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING ${SELECT_FIELDS}`,
      [
        input.labId,
        input.date,
        input.group,
        result.seat,
        input.studentName,
        input.studentEmail,
        cancelToken,
      ]
    );
    await client.query('COMMIT');
    return { ok: true, booking: rowToBooking(inserted.rows[0]), cancelToken };
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    // a constraint the application check should have caught first: report the
    // rule, not a 500 — the student's next refresh will show the real state
    const violation = reasonForUniqueViolation(err);
    if (violation) return violation;
    throw err;
  } finally {
    await client.end().catch(() => {});
  }
}

/** Delete a booking if id and cancel token match. Returns true if deleted. */
export async function cancelBooking(id: string, cancelToken: string): Promise<boolean> {
  await ensureSchema();
  // id::text comparison avoids a thrown error on malformed UUIDs
  const rows = (await sql()`
    DELETE FROM slot_bookings WHERE id::text = ${id} AND cancel_token = ${cancelToken}
    RETURNING id`) as Record<string, unknown>[];
  return rows.length > 0;
}
