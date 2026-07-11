export const prerender = false;

import type { APIRoute } from 'astro';
import { listBookingsByDate } from '../../lib/booking/db';
import { isValidDateString, openingHoursFor, WORKSTATION_COUNT } from '../../lib/booking/logic';

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const GET: APIRoute = async ({ url }) => {
  const date = url.searchParams.get('date') ?? '';
  if (!isValidDateString(date)) {
    return json({ error: 'invalid-input' }, 400);
  }
  const openHours = openingHoursFor(date);
  if (!openHours) {
    return json({ date, openHours: null, workstations: WORKSTATION_COUNT, bookings: [] });
  }

  let bookings;
  try {
    bookings = await listBookingsByDate(date);
  } catch (err) {
    console.error('availability read failed:', err);
    return json({ error: 'service-unavailable' }, 503);
  }
  return json({
    date,
    openHours,
    workstations: WORKSTATION_COUNT,
    bookings: bookings.map((b) => ({
      id: b.id,
      labId: b.labId,
      startHour: b.startHour,
      endHour: b.endHour,
      workstation: b.workstation,
      // first name only — no emails or full identities on the public API
      bookedBy: b.studentName.trim().split(/\s+/)[0] ?? '',
    })),
  });
};
