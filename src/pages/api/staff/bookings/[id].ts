export const prerender = false;

import type { APIRoute } from 'astro';
import { deleteBookingAsStaff } from '../../../../lib/booking/db';

/**
 * Cancel any booking, without its cancel token. Gated by src/middleware.ts —
 * this is how staff free a seat for a student who lost their browser storage,
 * which is the one case the students' own cancel flow cannot cover.
 */
export const DELETE: APIRoute = async ({ params }) => {
  const id = params.id ?? '';
  if (!id) {
    return new Response(JSON.stringify({ error: 'invalid-input' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let deleted: boolean;
  try {
    deleted = await deleteBookingAsStaff(id);
  } catch (err) {
    console.error('staff cancel failed:', err);
    return new Response(JSON.stringify({ error: 'service-unavailable' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(null, { status: deleted ? 204 : 404 });
};
