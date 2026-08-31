export const prerender = false;

import type { APIRoute } from 'astro';
import { listSemesterBookings } from '../../lib/booking/db';
import { listSemesterWeeks } from '../../lib/booking/logic';
import { COURSES } from '../../lib/booking/courses';

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Both courses' whole semesters in one response. MTE200 is the larger of the
 * two at ten Tuesdays x two slots x seven labs x three seats, so a full room
 * every week is still only a few hundred rows — nothing to paginate.
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
    courses: COURSES.map((course) => ({
      id: course.id,
      weekday: course.weekday,
      slots: course.slots,
      closedWeeks: course.closedWeeks,
      weeks: listSemesterWeeks(course),
      labs: course.labs,
    })),
    bookings: bookings.map((b) => ({
      id: b.id,
      labId: b.labId,
      date: b.date,
      slot: b.slot,
      group: b.group,
      seat: b.seat,
      // first name only — no emails or full identities on the public API
      bookedBy: b.studentName.trim().split(/\s+/)[0] ?? '',
    })),
  });
};
