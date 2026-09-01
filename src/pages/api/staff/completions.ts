export const prerender = false;

import type { APIRoute } from 'astro';
import { markCompleted, unmarkCompleted } from '../../../lib/booking/db';
import { bookingConfigFor } from '../../../lib/booking/logic';

/**
 * Approving a student for a lab, and undoing it. Gated by src/middleware.ts.
 *
 * A completion is keyed on the student and the lab rather than on a booking:
 * a student may be approved in a different session than the one they booked,
 * and the record must outlive the booking that the retention purge removes.
 */

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Payload {
  labId: string;
  studentEmail: string;
  studentName: string;
}

async function read(request: Request): Promise<Payload | null> {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return null;
  }
  const labId = typeof body.labId === 'string' ? body.labId : '';
  const studentEmail =
    typeof body.studentEmail === 'string' ? body.studentEmail.trim().toLowerCase() : '';
  const studentName = typeof body.studentName === 'string' ? body.studentName.trim() : '';

  // an unknown lab id would create a completion nothing can ever display
  if (!bookingConfigFor(labId)) return null;
  if (!studentEmail || studentEmail.length > 120 || !EMAIL_RE.test(studentEmail)) return null;
  if (studentName.length > 80) return null;

  return { labId, studentEmail, studentName };
}

export const POST: APIRoute = async ({ request }) => {
  const payload = await read(request);
  if (!payload) return json({ error: 'invalid-input' }, 400);

  try {
    await markCompleted(payload.labId, payload.studentName, payload.studentEmail);
  } catch (err) {
    console.error('mark completed failed:', err);
    return json({ error: 'service-unavailable' }, 503);
  }
  return json({ ok: true }, 200);
};

export const DELETE: APIRoute = async ({ request }) => {
  const payload = await read(request);
  if (!payload) return json({ error: 'invalid-input' }, 400);

  try {
    await unmarkCompleted(payload.labId, payload.studentEmail);
  } catch (err) {
    console.error('unmark completed failed:', err);
    return json({ error: 'service-unavailable' }, 503);
  }
  return json({ ok: true }, 200);
};
