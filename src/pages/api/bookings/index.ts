export const prerender = false;

import type { APIRoute } from 'astro';
import { getLabCatalog, requiredDevicesByLab } from '../../../lib/booking/catalog';
import { DEVICE_MAP, DEVICES } from '../../../lib/booking/inventory';
import { createBooking } from '../../../lib/booking/db';
import {
  checkAvailability,
  isBookableDate,
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
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'invalid-input' }, 400);
  }

  const labId = typeof body.labId === 'string' ? body.labId : '';
  const date = typeof body.date === 'string' ? body.date : '';
  const startHour = Number(body.startHour);
  const duration = Number(body.duration);
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';

  if (
    !labId ||
    !Number.isInteger(startHour) ||
    !Number.isInteger(duration) ||
    duration < 1 ||
    duration > 8 ||
    name.length < 2 ||
    name.length > 80 ||
    !EMAIL_RE.test(email) ||
    email.length > 120
  ) {
    return json({ error: 'invalid-input' }, 400);
  }

  const today = osloToday();
  if (!isBookableDate(date, today)) {
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

  const outcome = await createBooking(
    { ...requestInterval, studentName: name, studentEmail: email },
    (existing) => checkAvailability(requestInterval, existing, requiredByLab, quantities)
  );

  if (!outcome.ok) {
    const { result } = outcome;
    if (result.reason === 'device-conflict') {
      return json(
        {
          error: 'device-conflict',
          devices: result.devices.map((key) => DEVICE_MAP[key]?.label ?? key),
        },
        409
      );
    }
    return json({ error: result.reason }, result.reason === 'outside-hours' ? 400 : 409);
  }

  return json({ booking: outcome.booking, cancelToken: outcome.cancelToken }, 201);
};
