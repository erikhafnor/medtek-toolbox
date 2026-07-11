export const prerender = false;

import type { APIRoute } from 'astro';
import { cancelBooking } from '../../../lib/booking/db';

export const DELETE: APIRoute = async ({ params, url }) => {
  const id = params.id ?? '';
  const token = url.searchParams.get('token') ?? '';
  if (!id || !token) {
    return new Response(JSON.stringify({ error: 'invalid-input' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const deleted = await cancelBooking(id, token);
  if (!deleted) {
    return new Response(JSON.stringify({ error: 'not-found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return new Response(null, { status: 204 });
};
