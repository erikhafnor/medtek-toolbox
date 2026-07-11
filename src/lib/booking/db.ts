// Persistence layer for bookings (Neon Postgres via the serverless driver).
//
// Single-statement paths use the stateless HTTP driver (one fetch per query —
// nothing to go stale while a Vercel function instance is suspended). The
// booking transaction needs an interactive session, so it opens a fresh
// WebSocket Client per request and closes it in `finally`; per-request
// connections to the pgbouncer endpoint are cheap at this volume.
//
// All booking creation is serialized with a transaction-scoped advisory lock:
// one lab room, low volume — correctness matters more than write throughput.
// The availability check runs inside the same transaction as the INSERT, so
// two simultaneous requests can never both pass the check. lock_timeout keeps
// a stalled holder from queueing every other request behind it indefinitely.

import { Client, neon, neonConfig } from '@neondatabase/serverless';
import type { AvailabilityResult, BookingInterval } from './logic';

const ADVISORY_LOCK_KEY = 823471;

// Cheap abuse guard on the auth-less API: at most this many upcoming
// bookings per email (11 labs total, so 6 leaves room for legitimate use).
export const MAX_ACTIVE_PER_EMAIL = 6;

/** Postgres error code when lock_timeout expires while waiting. */
export const PG_LOCK_TIMEOUT = '55P03';

export interface BookingRow extends BookingInterval {
  id: string;
  date: string;
  studentName: string;
}

export interface CreateBookingInput {
  labId: string;
  date: string;
  startHour: number;
  endHour: number;
  studentName: string;
  studentEmail: string;
  /** Today in the lab's timezone, for the per-email active-booking cap. */
  today: string;
}

export type CreateBookingOutcome =
  | { ok: true; booking: BookingRow; cancelToken: string }
  | {
      ok: false;
      result: Exclude<AvailabilityResult, { ok: true }> | { ok: false; reason: 'too-many-bookings' };
    };

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

/** Idempotent schema setup, deduplicated per function instance. */
export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      try {
        await sql()`
          CREATE TABLE IF NOT EXISTS bookings (
            id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            lab_id text NOT NULL,
            booking_date date NOT NULL,
            start_hour int NOT NULL CHECK (start_hour >= 0 AND start_hour < 24),
            end_hour int NOT NULL CHECK (end_hour > start_hour AND end_hour <= 24),
            workstation int NOT NULL CHECK (workstation >= 1 AND workstation <= 8),
            student_name text NOT NULL,
            student_email text NOT NULL,
            cancel_token text NOT NULL,
            created_at timestamptz NOT NULL DEFAULT now()
          )`;
        await sql()`CREATE INDEX IF NOT EXISTS bookings_date_idx ON bookings (booking_date)`;
      } catch (err) {
        // two cold instances can race the DDL; the loser's error is benign
        const code = (err as { code?: string })?.code;
        if (code === '23505' || code === '42P07') return;
        schemaReady = null; // allow retry on next request
        throw err;
      }
    })();
  }
  return schemaReady;
}

function rowToBooking(row: Record<string, unknown>): BookingRow {
  return {
    id: String(row.id),
    labId: String(row.lab_id),
    date: String(row.booking_date),
    startHour: Number(row.start_hour),
    endHour: Number(row.end_hour),
    workstation: Number(row.workstation),
    studentName: String(row.student_name),
  };
}

// booking_date::text keeps the date a plain 'YYYY-MM-DD' string — letting the
// driver parse it into a JS Date shifts it a day when the server is east of UTC
const SELECT_FIELDS =
  'id, lab_id, booking_date::text AS booking_date, start_hour, end_hour, workstation, student_name';

export async function listBookingsByDate(date: string): Promise<BookingRow[]> {
  await ensureSchema();
  const rows = (await sql()`
    SELECT id, lab_id, booking_date::text AS booking_date,
           start_hour, end_hour, workstation, student_name
    FROM bookings WHERE booking_date = ${date}
    ORDER BY start_hour, workstation`) as Record<string, unknown>[];
  return rows.map(rowToBooking);
}

/**
 * Create a booking. `check` receives the day's existing bookings and decides
 * (pure logic) whether the request fits and on which workstation.
 */
export async function createBooking(
  input: CreateBookingInput,
  check: (existing: BookingInterval[]) => AvailabilityResult
): Promise<CreateBookingOutcome> {
  await ensureSchema();
  const client = new Client({ connectionString: connectionString() });
  await client.connect();
  try {
    await client.query('BEGIN');
    // fail fast instead of queueing the whole site behind a stalled holder
    await client.query("SET LOCAL lock_timeout = '5s'");
    await client.query("SET LOCAL statement_timeout = '10s'");
    await client.query('SELECT pg_advisory_xact_lock($1)', [ADVISORY_LOCK_KEY]);

    const { rows: countRows } = await client.query(
      `SELECT count(*)::int AS n FROM bookings
       WHERE lower(student_email) = lower($1) AND booking_date >= $2`,
      [input.studentEmail, input.today]
    );
    if (countRows[0].n >= MAX_ACTIVE_PER_EMAIL) {
      await client.query('ROLLBACK');
      return { ok: false, result: { ok: false, reason: 'too-many-bookings' } };
    }

    const { rows } = await client.query(
      `SELECT ${SELECT_FIELDS} FROM bookings WHERE booking_date = $1`,
      [input.date]
    );
    const result = check(rows.map(rowToBooking));
    if (!result.ok) {
      await client.query('ROLLBACK');
      return { ok: false, result };
    }

    const cancelToken = crypto.randomUUID();
    const inserted = await client.query(
      `INSERT INTO bookings
         (lab_id, booking_date, start_hour, end_hour, workstation,
          student_name, student_email, cancel_token)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING ${SELECT_FIELDS}`,
      [
        input.labId,
        input.date,
        input.startHour,
        input.endHour,
        result.workstation,
        input.studentName,
        input.studentEmail,
        cancelToken,
      ]
    );
    await client.query('COMMIT');
    return { ok: true, booking: rowToBooking(inserted.rows[0]), cancelToken };
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
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
    DELETE FROM bookings WHERE id::text = ${id} AND cancel_token = ${cancelToken}
    RETURNING id`) as Record<string, unknown>[];
  return rows.length > 0;
}
