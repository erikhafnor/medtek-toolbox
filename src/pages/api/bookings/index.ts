export const prerender = false;

import type { APIRoute } from 'astro';
import { createSeatBooking, PG_LOCK_TIMEOUT } from '../../../lib/booking/db';
import { capacityFor, checkSeatAvailability, isValidDateString } from '../../../lib/booking/logic';

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** HTTP status per rejection: bad request vs. someone got there first. */
const STATUS: Record<string, number> = {
  'invalid-input': 400,
  'unknown-lab': 404,
  'closed-week': 400,
  'past-slot': 400,
  'group-full': 409,
  'already-booked': 409,
  'same-slot': 409,
};

export const POST: APIRoute = async ({ request }) => {
  let parsed: unknown;
  try {
    parsed = await request.json();
  } catch {
    return json({ error: 'invalid-input' }, 400);
  }
  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return json({ error: 'invalid-input' }, 400);
  }
  const body = parsed as Record<string, unknown>;

  const labId = typeof body.labId === 'string' ? body.labId : '';
  const date = typeof body.date === 'string' ? body.date : '';
  const group = Number(body.group);
  // strip control/format characters from the display name
  const name =
    typeof body.name === 'string' ? body.name.replace(/[\p{Cc}\p{Cf}]/gu, '').trim() : '';
  // lower-cased so the one-seat-per-lab rule can't be dodged with casing
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

  if (
    !labId ||
    labId.length > 100 ||
    !Number.isInteger(group) ||
    name.length < 2 ||
    name.length > 80 ||
    // length caps run before the regex so it only ever sees bounded input
    email.length > 120 ||
    !EMAIL_RE.test(email) ||
    !isValidDateString(date)
  ) {
    return json({ error: 'invalid-input' }, 400);
  }

  if (!capacityFor(labId)) {
    return json({ error: 'unknown-lab' }, 404);
  }

  const seatRequest = { labId, date, group };
  let outcome;
  try {
    outcome = await createSeatBooking(
      { ...seatRequest, studentName: name, studentEmail: email },
      (existing) => checkSeatAvailability(seatRequest, existing)
    );
  } catch (err) {
    // infra failures surface as retryable JSON, not an HTML 500
    if ((err as { code?: string })?.code === PG_LOCK_TIMEOUT) {
      return json({ error: 'busy' }, 503);
    }
    console.error('booking create failed:', err);
    return json({ error: 'service-unavailable' }, 503);
  }

  if (!outcome.ok) {
    return json({ error: outcome.reason }, STATUS[outcome.reason] ?? 409);
  }

  return json({ booking: outcome.booking, cancelToken: outcome.cancelToken }, 201);
};
