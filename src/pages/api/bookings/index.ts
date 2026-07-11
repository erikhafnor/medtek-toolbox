export const prerender = false;

import type { APIRoute } from 'astro';
import { getLabCatalog, requiredDevicesByLab } from '../../../lib/booking/catalog';
import { DEVICE_MAP, DEVICES } from '../../../lib/booking/inventory';
import { createBooking, PG_LOCK_TIMEOUT } from '../../../lib/booking/db';
import {
  checkAvailability,
  isBookableDate,
  isValidDateString,
  openingHoursFor,
  osloHour,
  osloToday,
} from '../../../lib/booking/logic';

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  const startHour = Number(body.startHour);
  const duration = Number(body.duration);
  // strip control/format characters from the display name
  const name =
    typeof body.name === 'string' ? body.name.replace(/[\p{Cc}\p{Cf}]/gu, '').trim() : '';
  // lower-cased so the per-email booking cap can't be dodged with casing
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

  if (
    !labId ||
    labId.length > 100 ||
    !Number.isInteger(startHour) ||
    !Number.isInteger(duration) ||
    duration < 1 ||
    duration > 8 ||
    name.length < 2 ||
    name.length > 80 ||
    // length caps run before the regex so it only ever sees bounded input
    email.length > 120 ||
    !EMAIL_RE.test(email)
  ) {
    return json({ error: 'invalid-input' }, 400);
  }

  if (!isValidDateString(date)) {
    return json({ error: 'invalid-input' }, 400);
  }
  if (!openingHoursFor(date)) {
    return json({ error: 'closed' }, 400);
  }
  const today = osloToday();
  if (!isBookableDate(date, today)) {
    // an open weekday, but in the past or beyond the 8-week booking window
    return json({ error: 'past-date' }, 400);
  }
  if (date === today && startHour < osloHour()) {
    return json({ error: 'past-date' }, 400);
  }

  const catalog = await getLabCatalog('en');
  const lab = catalog.find((l) => l.id === labId);
  if (!lab) {
    return json({ error: 'unknown-lab' }, 404);
  }

  const requestInterval = { labId, date, startHour, endHour: startHour + duration };
  const requiredByLab = requiredDevicesByLab(catalog);
  const quantities = Object.fromEntries(DEVICES.map((d) => [d.key, d.quantity]));

  let outcome;
  try {
    outcome = await createBooking(
      { ...requestInterval, studentName: name, studentEmail: email, today },
      (existing) => checkAvailability(requestInterval, existing, requiredByLab, quantities)
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
    const { result } = outcome;
    if (result.reason === 'device-conflict') {
      return json(
        {
          error: 'device-conflict',
          // keys let the client localize; labels keep curl responses readable
          deviceKeys: result.devices,
          devices: result.devices.map((key) => DEVICE_MAP[key]?.label ?? key),
        },
        409
      );
    }
    return json({ error: result.reason }, result.reason === 'outside-hours' ? 400 : 409);
  }

  return json({ booking: outcome.booking, cancelToken: outcome.cancelToken }, 201);
};
