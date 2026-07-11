import { test, expect } from '@playwright/test';

test.describe('booking page', () => {
  test('renders bilingual booking pages', async ({ page }) => {
    await page.goto('/en/booking/');
    await expect(page.getByRole('heading', { name: 'Book a lab session' })).toBeVisible();

    await page.goto('/no/booking/');
    await expect(page.getByRole('heading', { name: 'Book labtid' })).toBeVisible();
  });

  test('preselects lab from query param', async ({ page }) => {
    await page.goto('/en/booking/?lab=mte200-defibrillator');
    await expect(page.locator('#booking-lab')).toHaveValue('mte200-defibrillator');
    // single-unit device warning is shown for the defib analyzer
    await expect(page.getByText('Fluke Impulse 7000DP', { exact: false }).first()).toBeVisible();
  });

  test('books a session and cancels it again', async ({ page }) => {
    await page.goto('/en/booking/?lab=mte210-electrical-safety');

    // wait for availability to load, then pick the last free start time
    const startChips = page.locator('fieldset button:not([disabled])');
    await expect(startChips.first()).toBeVisible({ timeout: 15_000 });
    await startChips.last().click();

    await page.locator('#booking-name').fill('E2E Testgruppe');
    await page.locator('#booking-email').fill('e2e@stud.uis.no');
    await page.getByRole('button', { name: 'Book session' }).click();

    await expect(page.getByRole('status')).toContainText('Session booked!', { timeout: 15_000 });

    // the booking shows up in the room overview grid and in "my bookings"
    const myBookings = page.getByRole('region', { name: 'My bookings' });
    await expect(myBookings.getByText('Electrical Safety', { exact: false })).toBeVisible();

    // cancel it again (also cleans up the shared database)
    await myBookings.getByRole('button', { name: 'Cancel booking' }).click();
    await expect(myBookings.getByText('No bookings in this browser yet.')).toBeVisible({
      timeout: 15_000,
    });
  });
});
