export const prerender = false;

import type { APIRoute } from 'astro';
import { listBookingsByEmail } from '../../../lib/booking/db';

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * A student's own bookings, so they can see them from a device that did not
 * make them.
 *
 * POST rather than GET so the address stays out of server logs and browser
 * history. The response carries no cancel token: addresses here are guessable,
 * and cancelling on someone else's behalf must stay with staff.
 */
export const POST: APIRoute = async ({ request }) => {
  let parsed: unknown;
  try {
    parsed = await request.json();
  } catch {
    return json({ error: 'invalid-input' }, 400);
  }
  const email =
    parsed && typeof parsed === 'object' && typeof (parsed as { email?: unknown }).email === 'string'
      ? (parsed as { email: string }).email.trim().toLowerCase()
      : '';

  if (!email || email.length > 120 || !EMAIL_RE.test(email)) {
    return json({ error: 'invalid-input' }, 400);
  }

  let bookings;
  try {
    bookings = await listBookingsByEmail(email);
  } catch (err) {
    console.error('booking lookup failed:', err);
    return json({ error: 'service-unavailable' }, 503);
  }

  return json({
    bookings: bookings.map((b) => ({
      id: b.id,
      labId: b.labId,
      date: b.date,
      slot: b.slot,
      group: b.group,
      seat: b.seat,
    })),
  });
};
