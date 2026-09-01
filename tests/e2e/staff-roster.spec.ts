import { test, expect } from '@playwright/test';

// The roster is the only page that puts student email addresses on screen.
// These tests guard the gate itself: if the middleware is ever removed or its
// path matcher drifts, the suite fails rather than the addresses going public.

const STAFF_PATHS = ['/no/booking/oversikt/', '/en/booking/roster/', '/api/staff/bookings.csv'];

test.describe('staff roster access', () => {
  for (const path of STAFF_PATHS) {
    test(`${path} refuses anonymous requests`, async ({ request }) => {
      const response = await request.get(path);
      // 401 when a password is configured, 503 when it is not — never 200
      expect(response.status()).not.toBe(200);
      expect([401, 503]).toContain(response.status());
      // and the refusal itself must not carry any of the data it is protecting
      expect(await response.text()).not.toMatch(/@/);
    });

    test(`${path} refuses a wrong password`, async ({ request }) => {
      const response = await request.get(path, {
        headers: { authorization: `Basic ${Buffer.from('staff:wrong').toString('base64')}` },
      });
      expect(response.status()).not.toBe(200);
    });
  }

  test('the roster is not linked from the public site', async ({ page }) => {
    await page.goto('/no/booking/');
    const links = await page.getByRole('link').evaluateAll((els) =>
      els.map((el) => (el as HTMLAnchorElement).getAttribute('href') ?? '')
    );
    expect(links.filter((href) => /oversikt|roster|staff/.test(href))).toEqual([]);
  });

  test('public booking pages are untouched by the gate', async ({ request }) => {
    for (const path of ['/no/booking/', '/en/booking/', '/api/availability']) {
      expect((await request.get(path)).status(), path).toBe(200);
    }
  });
});
