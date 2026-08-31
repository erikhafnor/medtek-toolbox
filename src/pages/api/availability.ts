export const prerender = false;

import type { APIRoute } from 'astro';
import { listSemesterBookings } from '../../lib/booking/db';
import { listSemesterWeeks } from '../../lib/booking/logic';
import { BOOKABLE_LABS, SLOT } from '../../lib/booking/semester';

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * The whole semester in one response — five open Wednesdays across two labs is
 * at most 60 seats, so there is nothing to paginate and the client can compose
 * the grid without a request per week.
 */
export const GET: APIRoute = async () => {
  let bookings;
  try {
    bookings = await listSemesterBookings();
  } catch (err) {
    console.error('availability read failed:', err);
    return json({ error: 'service-unavailable' }, 503);
  }

  return json({
    slot: SLOT,
    weeks: listSemesterWeeks(),
    labs: BOOKABLE_LABS,
    bookings: bookings.map((b) => ({
      id: b.id,
      labId: b.labId,
      date: b.date,
      group: b.group,
      seat: b.seat,
      // first name only — no emails or full identities on the public API
      bookedBy: b.studentName.trim().split(/\s+/)[0] ?? '',
    })),
  });
};
