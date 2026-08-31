import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

/** Unique per run, so repeat runs never collide on the one-seat-per-lab rule. */
const stamp = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

test.describe('booking page', () => {
  // The Neon database is shared with production, so a test that fails before its
  // own cleanup would leave a real seat behind. Sweep any survivors via the UI.
  test.afterEach(async ({ page }) => {
    try {
      const cancels = page
        .getByRole('region', { name: 'My bookings' })
        .getByRole('button', { name: 'Cancel booking' });
      for (let left = await cancels.count(); left > 0; left--) {
        await cancels.first().click();
        await expect(cancels).toHaveCount(left - 1, { timeout: 15_000 });
      }
    } catch {
      // page already closed, or nothing to clean — nothing useful to do here
    }
  });

  test('renders bilingual booking pages', async ({ page }) => {
    await page.goto('/en/booking/');
    await expect(page.getByRole('heading', { name: /Book lab time/ })).toBeVisible();

    await page.goto('/no/booking/');
    await expect(page.getByRole('heading', { name: /Book labtid/ })).toBeVisible();
  });

  test('switches between the two courses and their labs', async ({ page }) => {
    await page.goto('/en/booking/');

    // MTE200 is first, with all seven labs
    await expect(page.getByRole('button', { name: 'MTE200', exact: true })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    await expect(page.getByRole('button', { name: /Defibrillator Lab/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Ventilator Lab/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Electrical Safety/ })).toHaveCount(0);

    await page.getByRole('button', { name: 'MTE210', exact: true }).click();
    await expect(page.getByRole('button', { name: /Electrical Safety/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Defibrillator Lab/ })).toHaveCount(0);
  });

  test('shows MTE200 Tuesdays with two slots, only week 41 closed', async ({ page }) => {
    await page.goto('/en/booking/?lab=mte200-defibrillator');

    // weeks 37 through 47, and week 39 stays open for MTE200
    await expect(page.getByText('Week 37', { exact: false })).toBeVisible();
    await expect(page.getByText('Week 39', { exact: false })).toBeVisible();
    await expect(page.getByText('Week 47', { exact: false })).toBeVisible();
    await expect(page.getByText('Closed for booking', { exact: true })).toHaveCount(1);
    await expect(page.getByText('Week 41 closed for booking.')).toBeVisible();

    // both periods appear on every open Tuesday
    await expect(
      page.locator('[data-date="2026-09-15"][data-slot="1"]').getByText('09:00–11:30')
    ).toBeVisible();
    await expect(
      page.locator('[data-date="2026-09-15"][data-slot="2"]').getByText('11:30–14:00')
    ).toBeVisible();

    // one group of three per slot for MTE200
    await expect(page.getByText('1 group × up to 3 students per slot')).toBeVisible();
  });

  test('shows MTE210 Wednesdays with weeks 39 and 41 closed', async ({ page }) => {
    await page.goto('/en/booking/?lab=mte210-hospital-networks');
    await expect(page.getByText('Closed for booking', { exact: true })).toHaveCount(2);
    await expect(page.getByText('Week 39 and 41 closed for booking.')).toBeVisible();
    await expect(page.getByText('3 groups × up to 3 students per slot')).toBeVisible();
  });

  test('allows two MTE200 labs on one Tuesday in different slots', async ({ page }) => {
    const student = `E2E${stamp()}`;
    await page.goto('/en/booking/?lab=mte200-defibrillator');
    await page.locator('#booking-name').fill(student);
    await page.locator('#booking-email').fill(`${student.toLowerCase()}@stud.uis.no`);

    // take the 09:00 slot in week 38
    const morning = page.locator('[data-date="2026-09-15"][data-slot="1"]');
    await expect(morning.getByText('09:00–11:30')).toBeVisible();
    await morning.getByRole('button', { name: '+ Take seat' }).click();
    await expect(page.getByRole('status')).toContainText('Seat booked!', { timeout: 15_000 });

    // a different lab, same Tuesday: the 09:00 slot is blocked, 11:30 is not
    await page.getByRole('button', { name: /ECG Recording/ }).click();
    const ecgMorning = page.locator('[data-date="2026-09-15"][data-slot="1"]');
    const ecgAfternoon = page.locator('[data-date="2026-09-15"][data-slot="2"]');
    await expect(ecgMorning.getByText('You already have', { exact: false })).toBeVisible();
    await expect(ecgMorning.getByRole('button', { name: '+ Take seat' })).toBeDisabled();
    await expect(ecgAfternoon.getByRole('button', { name: '+ Take seat' })).toBeEnabled();

    // and it really books
    await ecgAfternoon.getByRole('button', { name: '+ Take seat' }).click();
    await expect(page.getByRole('status')).toContainText('Seat booked!', { timeout: 15_000 });
    const myBookings = page.getByRole('region', { name: 'My bookings' });
    await expect(myBookings.getByRole('listitem')).toHaveCount(2);
  });

  test('takes a seat, exports it to a calendar, and cancels it', async ({ page }) => {
    const student = `E2E${stamp()}`;
    await page.goto('/en/booking/?lab=mte200-ultrasound');

    const seatButtons = page.getByRole('button', { name: '+ Take seat' });
    await expect(seatButtons.first()).toBeVisible({ timeout: 15_000 });
    await expect(seatButtons.first()).toBeDisabled();

    await page.locator('#booking-name').fill(student);
    await page.locator('#booking-email').fill(`${student.toLowerCase()}@stud.uis.no`);
    await expect(seatButtons.first()).toBeEnabled();

    // first free button is week 37, the 09:00 slot
    await seatButtons.first().click();
    await expect(page.getByRole('status')).toContainText('Seat booked!', { timeout: 15_000 });
    await expect(page.getByText(new RegExp(`${student}\\s*\\(you\\)`))).toBeVisible();

    const myBookings = page.getByRole('region', { name: 'My bookings' });
    await expect(myBookings.getByText('KE E-455', { exact: false })).toBeVisible();

    // the .ics carries the 09:00 slot in UTC (CEST, +02:00) and the room
    const downloadPromise = page.waitForEvent('download');
    await myBookings.getByRole('button', { name: 'Calendar file' }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('mte200-ultrasound-2026-09-08.ics');
    const ics = readFileSync((await download.path())!, 'utf8');
    expect(ics).toContain('DTSTART:20260908T070000Z');
    expect(ics).toContain('DTEND:20260908T093000Z');
    expect(ics).toContain('LOCATION:KE E-455');

    const href = await myBookings.getByRole('link', { name: 'Google' }).getAttribute('href');
    // parsed rather than string-matched: URLSearchParams writes spaces as '+',
    // which decodeURIComponent does not turn back into a space
    const google = new URL(href ?? '');
    expect(google.searchParams.get('dates')).toBe('20260908T070000Z/20260908T093000Z');
    expect(google.searchParams.get('location')).toContain('KE E-455');

    // one seat per lab: the remaining buttons for this lab are now disabled
    await expect(seatButtons.first()).toBeDisabled();

    await myBookings.getByRole('button', { name: 'Cancel booking' }).click();
    await expect(myBookings.getByText('No bookings in this browser yet.')).toBeVisible({
      timeout: 15_000,
    });
    await expect(seatButtons.first()).toBeEnabled();
  });

  test('shows the room on a lab page that is not bookable', async ({ page }) => {
    await page.goto('/no/labs/mte210-ct-imaging/');
    await expect(page.getByText('Rom: KE E-455', { exact: false })).toBeVisible();
    await expect(page.getByRole('link', { name: /Book labtid for denne/ })).toHaveCount(0);
  });
});
