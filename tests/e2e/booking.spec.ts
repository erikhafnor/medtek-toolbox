import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { testStudent } from './fixtures';

/** The lab selector, distinct from the lab chips in the weekly plan table. */
const labPicker = (page: import('@playwright/test').Page) =>
  page.getByRole('group', { name: 'Lab assignment' });

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
    await expect(labPicker(page).getByRole('button', { name: /^Defibrillator$/ })).toBeVisible();
    await expect(labPicker(page).getByRole('button', { name: /^Ventilator$/ })).toBeVisible();
    await expect(labPicker(page).getByRole('button', { name: /Electrical safety/ })).toHaveCount(0);

    await page.getByRole('button', { name: 'MTE210', exact: true }).click();
    await expect(labPicker(page).getByRole('button', { name: /Electrical safety/ })).toBeVisible();
    await expect(labPicker(page).getByRole('button', { name: /^Defibrillator$/ })).toHaveCount(0);
  });

  test('shows a core lab on its five Tuesdays, in two slots', async ({ page }) => {
    await page.goto('/en/booking/?lab=mte200-defibrillator');

    // weeks 37-40 plus the spare week-42 day; block 2's weeks belong to others
    await expect(page.locator('[data-slot="1"]')).toHaveCount(5);
    await expect(page.getByText('The last day is spare', { exact: false })).toBeVisible();
    await expect(page.locator('[data-date="2026-09-08"][data-slot="1"]')).toBeVisible();
    await expect(page.locator('[data-date="2026-10-13"][data-slot="2"]')).toBeVisible();
    await expect(page.locator('[data-date="2026-10-20"][data-slot="1"]')).toHaveCount(0);

    // both periods are columns of the sign-up sheet, and every day has both
    await expect(page.getByRole('columnheader', { name: '09:00–11:30' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: '11:30–14:00' })).toBeVisible();
    await expect(page.locator('[data-date="2026-09-15"][data-slot="2"]')).toBeVisible();

    await expect(page.getByText('1 group × up to 3 students per slot')).toBeVisible();
  });

  test('the weekly plan never schedules more than three labs a day', async ({ page }) => {
    await page.goto('/en/booking/?lab=mte200-defibrillator');
    const rows = page.getByRole('region', { name: 'Weekly plan' }).getByRole('row');
    await expect(rows.first()).toBeVisible();

    for (const row of await rows.all()) {
      const heading = (await row.getByRole('rowheader').textContent()) ?? '';
      const chips = await row.getByRole('button').count();
      if (heading.includes('Week 41')) {
        // the closed week is explained here rather than silently missing
        await expect(row.getByText('Closed for booking')).toBeVisible();
        expect(chips, heading).toBe(0);
      } else {
        expect(chips, heading).toBe(3);
      }
    }
  });

  test('block 2 labs are visible but locked until block 1 finishes', async ({ page }) => {
    const student = testStudent();
    await page.goto('/en/booking/?lab=mte200-ultrasound');
    await page.locator('#booking-name').fill(student.name);
    await page.locator('#booking-email').fill(student.email);

    // the plan is visible, and says it is a choice…
    await expect(page.locator('[data-slot="1"]')).toHaveCount(4);
    await expect(page.getByText('Elective — choose 2 of these 4 labs.')).toBeVisible();
    await expect(page.getByText('These labs open for booking', { exact: false })).toBeVisible();
    // …but nothing can be claimed yet
    const seats = page.getByRole('button', { name: '+ Take seat' });
    await expect(seats.first()).toBeDisabled();

    // a block 1 lab, by contrast, is claimable right away
    await labPicker(page).getByRole('button', { name: /^ECG$/ }).click();
    await expect(page.getByText('These labs open for booking', { exact: false })).toHaveCount(0);
    await expect(page.getByRole('button', { name: '+ Take seat' }).first()).toBeEnabled();
  });

  test('shows MTE210 Wednesdays with weeks 39 and 41 closed', async ({ page }) => {
    await page.goto('/en/booking/?lab=mte210-hospital-networks');
    await expect(page.getByText('Week 39 and 41 closed for booking.')).toBeVisible();
    // three groups at once on lab PCs, so it clears 18 students in three days
    await expect(page.locator('[data-slot="1"]')).toHaveCount(3);
    await expect(page.getByText('3 groups × up to 3 students per slot')).toBeVisible();
    // the two closed weeks are called out in the plan
    await expect(
      page.getByRole('region', { name: 'Weekly plan' }).getByText('Closed for booking', { exact: true })
    ).toHaveCount(2);
  });

  test('allows two MTE200 labs on one Tuesday in different slots', async ({ page }) => {
    const student = testStudent();
    await page.goto('/en/booking/?lab=mte200-defibrillator');
    await page.locator('#booking-name').fill(student.name);
    await page.locator('#booking-email').fill(student.email);

    // take the 09:00 slot in week 38
    const morning = page.locator('[data-date="2026-09-15"][data-slot="1"]');
    await expect(page.getByRole('columnheader', { name: '09:00–11:30' })).toBeVisible();
    await morning.getByRole('button', { name: '+ Take seat' }).click();
    await expect(page.getByRole('status')).toContainText('Seat booked!', { timeout: 15_000 });

    // a different lab, same Tuesday: the 09:00 slot is blocked, 11:30 is not
    await labPicker(page).getByRole('button', { name: /^ECG$/ }).click();
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
    const student = testStudent();
    await page.goto('/en/booking/?lab=mte200-infusion-pump');

    const seatButtons = page.getByRole('button', { name: '+ Take seat' });
    await expect(seatButtons.first()).toBeVisible({ timeout: 15_000 });
    await expect(seatButtons.first()).toBeDisabled();

    await page.locator('#booking-name').fill(student.name);
    await page.locator('#booking-email').fill(student.email);
    await expect(seatButtons.first()).toBeEnabled();

    // first free button is week 37, the 09:00 slot
    await seatButtons.first().click();
    await expect(page.getByRole('status')).toContainText('Seat booked!', { timeout: 15_000 });
    await expect(page.getByText(new RegExp(`${student.name}\\s*\\(you\\)`))).toBeVisible();

    const myBookings = page.getByRole('region', { name: 'My bookings' });
    await expect(myBookings.getByText('KE E-455', { exact: false })).toBeVisible();

    // the .ics carries the 09:00 slot in UTC (CEST, +02:00) and the room
    const downloadPromise = page.waitForEvent('download');
    await myBookings.getByRole('button', { name: 'Calendar file' }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('mte200-infusion-pump-2026-09-08.ics');
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

  test('looking up bookings by email never returns a cancel token', async ({ request }) => {
    // student addresses are guessable, so a token here would let anyone cancel
    // a classmate's seat just by typing their address
    const response = await request.post('/api/bookings/lookup', {
      data: { email: 'someone@stud.uis.no' },
    });
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).not.toMatch(/cancelToken|cancel_token/i);
    expect(JSON.parse(body)).toHaveProperty('bookings');

    const bad = await request.post('/api/bookings/lookup', { data: { email: 'not-an-email' } });
    expect(bad.status()).toBe(400);
  });

  test('shows the room and a booking link on the new reconstruction lab', async ({ page }) => {
    await page.goto('/no/labs/mte210-ct-reconstruction/');
    await expect(page.getByText('Rom: KE E-455', { exact: false })).toBeVisible();
    await expect(page.getByRole('link', { name: /Book labtid for denne/ })).toBeVisible();
    // it carries the second half of the CT lab, starting at Part 4
    await expect(page.getByRole('heading', { name: /Del 4/ })).toBeVisible();
  });
});
