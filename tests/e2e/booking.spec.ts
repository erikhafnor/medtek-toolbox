import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

/** A name unique per run, so parallel/repeat runs never collide on the one-seat-per-lab rule. */
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

  test('shows the semester with weeks 39 and 41 closed', async ({ page }) => {
    await page.goto('/en/booking/');

    // all seven Wednesdays are listed; the two closed ones are labelled
    await expect(page.getByText('Week 37', { exact: false })).toBeVisible();
    await expect(page.getByText('Week 43', { exact: false })).toBeVisible();
    // exact match, so the summary line 'Week 39 and 41 closed…' is not counted
    await expect(page.getByText('Closed for booking', { exact: true })).toHaveCount(2);
    await expect(page.getByText('Week 39 and 41 closed for booking.')).toBeVisible();
  });

  test('preselects lab from query param and shows its capacity', async ({ page }) => {
    await page.goto('/en/booking/?lab=mte210-electrical-safety');
    await expect(page.getByRole('button', { name: /Electrical Safety/ })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    // lab 1: one group of three, and the single-unit analyzer warning
    await expect(page.getByText('1 group × up to 3 students per week')).toBeVisible();
    await expect(page.getByText('Fluke ESA615', { exact: false }).first()).toBeVisible();

    // lab 2 runs three groups in the same weekly slot
    await page.getByRole('button', { name: /Hospital Networks/ }).click();
    await expect(page.getByText('3 groups × up to 3 students per week')).toBeVisible();
  });

  test('blocks the other lab in the same Wednesday slot', async ({ page }) => {
    const student = `E2E${stamp()}`;
    await page.goto('/en/booking/?lab=mte210-electrical-safety');
    await page.locator('#booking-name').fill(student);
    await page.locator('#booking-email').fill(`${student.toLowerCase()}@stud.uis.no`);

    // take the lab 1 seat in the first open week (week 37)
    const week37 = page.locator('li').filter({ hasText: 'Week 37' });
    await week37.getByRole('button', { name: '+ Take seat' }).first().click();
    await expect(page.getByRole('status')).toContainText('Seat booked!', { timeout: 15_000 });

    // switch to lab 2: week 37 is now blocked, later weeks are still open
    await page.getByRole('button', { name: /Hospital Networks/ }).click();
    const lab2Week37 = page.locator('li').filter({ hasText: 'Week 37' });
    await expect(lab2Week37.getByText('You already have', { exact: false })).toBeVisible();
    await expect(lab2Week37.getByRole('button', { name: '+ Take seat' }).first()).toBeDisabled();

    const lab2Week38 = page.locator('li').filter({ hasText: 'Week 38' });
    await expect(lab2Week38.getByRole('button', { name: '+ Take seat' }).first()).toBeEnabled();

    // clean up the shared database
    const myBookings = page.getByRole('region', { name: 'My bookings' });
    await myBookings.getByRole('button', { name: 'Cancel booking' }).click();
    await expect(myBookings.getByText('No bookings in this browser yet.')).toBeVisible({
      timeout: 15_000,
    });
  });

  test('takes a seat and cancels it again', async ({ page }) => {
    const student = `E2E${stamp()}`;
    await page.goto('/en/booking/?lab=mte210-hospital-networks');

    // seat buttons stay disabled until name and email are valid
    const seatButtons = page.getByRole('button', { name: '+ Take seat' });
    await expect(seatButtons.first()).toBeVisible({ timeout: 15_000 });
    await expect(seatButtons.first()).toBeDisabled();

    await page.locator('#booking-name').fill(student);
    await page.locator('#booking-email').fill(`${student.toLowerCase()}@stud.uis.no`);
    await expect(seatButtons.first()).toBeEnabled();

    await seatButtons.first().click();
    await expect(page.getByRole('status')).toContainText('Seat booked!', { timeout: 15_000 });

    // the seat now shows in the semester map, marked as ours
    // \s also matches the nbsp that keeps the marker on the name's line
    await expect(page.getByText(new RegExp(`${student}\\s*\\(you\\)`))).toBeVisible();

    const myBookings = page.getByRole('region', { name: 'My bookings' });
    await expect(myBookings.getByText('Hospital Networks', { exact: false })).toBeVisible();
    // the room is shown alongside the booking
    await expect(myBookings.getByText('KE E-455', { exact: false })).toBeVisible();

    // the .ics download carries the right room and UTC instants (CEST, +02:00)
    const downloadPromise = page.waitForEvent('download');
    await myBookings.getByRole('button', { name: 'Calendar file' }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('mte210-lab-2026-09-09.ics');
    const ics = readFileSync((await download.path())!, 'utf8');
    expect(ics).toContain('BEGIN:VEVENT');
    expect(ics).toContain('DTSTART:20260909T081500Z');
    expect(ics).toContain('DTEND:20260909T110000Z');
    expect(ics).toContain('LOCATION:KE E-455');

    // and the Google link targets the same window
    const href = await myBookings.getByRole('link', { name: 'Google' }).getAttribute('href');
    // parsed rather than string-matched: URLSearchParams writes spaces as '+',
    // which decodeURIComponent does not turn back into a space
    const google = new URL(href ?? '');
    expect(google.host).toBe('calendar.google.com');
    expect(google.searchParams.get('dates')).toBe('20260909T081500Z/20260909T110000Z');
    expect(google.searchParams.get('location')).toContain('KE E-455');

    // one seat per lab: every remaining seat button for this lab is now disabled
    await expect(seatButtons.first()).toBeDisabled();

    // cancel it again (also cleans up the shared database)
    await myBookings.getByRole('button', { name: 'Cancel booking' }).click();
    await expect(myBookings.getByText('No bookings in this browser yet.')).toBeVisible({
      timeout: 15_000,
    });
    await expect(seatButtons.first()).toBeEnabled();
  });
});
