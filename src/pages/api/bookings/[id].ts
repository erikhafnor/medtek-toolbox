export const prerender = false;

import type { APIRoute } from 'astro';
import { cancelBooking } from '../../../lib/booking/db';

export const DELETE: APIRoute = async ({ params, request, url }) => {
  const id = params.id ?? '';
  // header keeps the token out of server access logs; query is a curl fallback
  const token = request.headers.get('x-cancel-token') ?? url.searchParams.get('token') ?? '';
  if (!id || !token) {
    return new Response(JSON.stringify({ error: 'invalid-input' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  let deleted;
  try {
    deleted = await cancelBooking(id, token);
  } catch (err) {
    console.error('booking cancel failed:', err);
    return new Response(JSON.stringify({ error: 'service-unavailable' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  if (!deleted) {
    return new Response(JSON.stringify({ error: 'not-found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return new Response(null, { status: 204 });
};
