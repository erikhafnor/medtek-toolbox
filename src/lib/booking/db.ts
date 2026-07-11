// Persistence layer for bookings (Neon Postgres via the serverless driver).
//
// All booking creation is serialized with a transaction-scoped advisory lock:
// one lab room, low volume — correctness matters more than write throughput.
// The availability check runs inside the same transaction as the INSERT, so
// two simultaneous requests can never both pass the check.

import { Pool, neonConfig } from '@neondatabase/serverless';
import type { AvailabilityResult, BookingInterval } from './logic';

const ADVISORY_LOCK_KEY = 823471;

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
}

export type CreateBookingOutcome =
  | { ok: true; booking: BookingRow; cancelToken: string }
  | { ok: false; result: Exclude<AvailabilityResult, { ok: true }> };

let pool: Pool | null = null;
let schemaReady: Promise<void> | null = null;

function getPool(): Pool {
  if (!pool) {
    const connectionString =
      process.env.DATABASE_URL ?? (import.meta.env.DATABASE_URL as string | undefined);
    if (!connectionString) {
      throw new Error('DATABASE_URL is not set');
    }
    // Node 22+ ships a global WebSocket, which the Neon driver uses locally.
    if (typeof WebSocket !== 'undefined') {
      neonConfig.webSocketConstructor = WebSocket;
    }
    pool = new Pool({ connectionString });
  }
  return pool;
}

/** Idempotent schema setup, run once per function instance. */
export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = getPool()
      .query(
        `CREATE TABLE IF NOT EXISTS bookings (
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
         );
         CREATE INDEX IF NOT EXISTS bookings_date_idx ON bookings (booking_date);`
      )
      .then(() => undefined)
      .catch((err) => {
        schemaReady = null; // allow retry on next request
        throw err;
      });
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
  const { rows } = await getPool().query(
    `SELECT ${SELECT_FIELDS} FROM bookings WHERE booking_date = $1
     ORDER BY start_hour, workstation`,
    [date]
  );
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
  const client = await getPool().connect();
  try {
    await client.query('BEGIN');
    await client.query('SELECT pg_advisory_xact_lock($1)', [ADVISORY_LOCK_KEY]);

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
    client.release();
  }
}

/** Delete a booking if id and cancel token match. Returns true if deleted. */
export async function cancelBooking(id: string, cancelToken: string): Promise<boolean> {
  await ensureSchema();
  const { rowCount } = await getPool().query(
    // id::text comparison avoids a thrown error on malformed UUIDs
    'DELETE FROM bookings WHERE id::text = $1 AND cancel_token = $2',
    [id, cancelToken]
  );
  return (rowCount ?? 0) > 0;
}
