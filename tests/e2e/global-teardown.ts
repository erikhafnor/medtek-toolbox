// Sweeps up bookings the e2e suite left in the database.
//
// The suite cancels its own bookings through the UI, and a per-test hook
// catches most of what a failure leaves behind — but neither runs when a test
// crashes, times out, or the whole run is interrupted. The Neon database is
// shared with production, so a leaked row is a fake student sitting on a real
// sign-up sheet. This is the backstop that runs regardless of how the suite
// ended.

import { neon } from '@neondatabase/serverless';
import { E2E_STUDENT_PREFIX } from './fixtures';

/** Playwright runs outside Astro, so the dev server's env is not ours. */
function loadDatabaseUrl(): string | undefined {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  try {
    // Node 20.12+; typed loosely so an older runtime just falls through
    (process as unknown as { loadEnvFile?: (path: string) => void }).loadEnvFile?.('.env.local');
  } catch {
    // no local env file — fine in CI, where DATABASE_URL is set directly
  }
  return process.env.DATABASE_URL;
}

export default async function globalTeardown(): Promise<void> {
  const databaseUrl = loadDatabaseUrl();
  if (!databaseUrl) {
    console.warn('[e2e teardown] DATABASE_URL not set — skipping booking cleanup');
    return;
  }

  try {
    const sql = neon(databaseUrl);
    // both columns must match: a real student could conceivably be named
    // something starting with "E2E", but not with that email as well
    const removed = (await sql`
      DELETE FROM slot_bookings
      WHERE student_name LIKE ${`${E2E_STUDENT_PREFIX}%`}
        AND lower(student_email) LIKE ${`${E2E_STUDENT_PREFIX.toLowerCase()}%@stud.uis.no`}
      RETURNING student_name`) as Array<{ student_name: string }>;

    if (removed.length > 0) {
      console.warn(
        `[e2e teardown] removed ${removed.length} test booking(s) left behind by a failed run`
      );
    }
  } catch (err) {
    // the run has already reported its own result; make a leak loud rather
    // than silent, since the rows are visible to students until cleared
    console.error(
      '[e2e teardown] cleanup FAILED — check slot_bookings for rows named ' +
        `${E2E_STUDENT_PREFIX}*`,
      err
    );
  }
}
