export const prerender = false;

import type { APIRoute } from 'astro';
import { purgeBookingsBefore } from '../../../lib/booking/db';
import { isValidDateString } from '../../../lib/booking/logic';
import { RETENTION_NOTE } from '../../../lib/booking/retention';

/**
 * Delete bookings for lab days before a given date — the retention rule made
 * actionable. Gated by src/middleware.ts, and deliberately staff-triggered
 * rather than automatic: deleting student records on a timer, unattended, is
 * not something to do quietly.
 */
export const POST: APIRoute = async ({ request }) => {
  let before = '';
  try {
    const body = (await request.json()) as { before?: unknown };
    before = typeof body.before === 'string' ? body.before : '';
  } catch {
    return new Response(JSON.stringify({ error: 'invalid-input' }), { status: 400 });
  }

  if (!isValidDateString(before)) {
    return new Response(JSON.stringify({ error: 'invalid-input' }), { status: 400 });
  }

  let removed: number;
  try {
    removed = await purgeBookingsBefore(before);
  } catch (err) {
    console.error('purge failed:', err);
    return new Response(JSON.stringify({ error: 'service-unavailable' }), { status: 503 });
  }

  // completions live in their own table and are untouched: a booking is
  // scheduling, an approval is the academic record
  console.warn(`staff purge: removed ${removed} booking(s) before ${before} (${RETENTION_NOTE})`);
  return new Response(JSON.stringify({ removed }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
};
