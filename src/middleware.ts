// Gates the staff pages behind a shared password.
//
// Vercel's own Password Protection cannot do this job: its scope is a whole
// deployment, not a path, so switching it on would lock students out of the
// entire site — and it is an Enterprise feature or a paid Pro add-on anyway.
// HTTP Basic Auth here protects exactly the staff routes, costs nothing, and
// still gives staff a plain browser password prompt on any device.
//
// The password lives in STAFF_PASSWORD. It is never committed: set it in the
// Vercel dashboard for Production and Preview, and in .env.local for dev.

import { defineMiddleware } from 'astro:middleware';

const REALM = 'medtek.tools staff';

/** Paths that expose student emails and must never be public. */
function isStaffPath(pathname: string): boolean {
  return /\/(oversikt|roster)(\/|$)/.test(pathname) || pathname.startsWith('/api/staff/');
}

function unauthorized(): Response {
  return new Response('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"`,
      // a staff roster must never be cached by a proxy or a shared browser
      'Cache-Control': 'no-store',
    },
  });
}

/** Compare without leaking the answer through how long the check takes. */
function matches(given: string, expected: string): boolean {
  if (given.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < given.length; i++) {
    diff |= given.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

export const onRequest = defineMiddleware(async (context, next) => {
  if (!isStaffPath(context.url.pathname)) return next();

  const expected =
    process.env.STAFF_PASSWORD ?? (import.meta.env.STAFF_PASSWORD as string | undefined);

  // fail closed: a missing password locks the page rather than opening it
  if (!expected) {
    console.error('STAFF_PASSWORD is not set — refusing to serve the staff roster');
    return new Response('Staff access is not configured.', {
      status: 503,
      headers: { 'Cache-Control': 'no-store' },
    });
  }

  const header = context.request.headers.get('authorization') ?? '';
  const [scheme, encoded] = header.split(' ');
  if (scheme?.toLowerCase() !== 'basic' || !encoded) return unauthorized();

  let decoded: string;
  try {
    decoded = atob(encoded);
  } catch {
    return unauthorized();
  }

  // any username is accepted; the password is the shared secret
  const password = decoded.slice(decoded.indexOf(':') + 1);
  if (!matches(password, expected)) return unauthorized();

  const response = await next();
  response.headers.set('Cache-Control', 'no-store');
  // student names and emails must not be indexed if a link ever escapes
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
});
