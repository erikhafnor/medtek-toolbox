import { test, expect, type Page } from '@playwright/test';

// The player is a Svelte island. On a cold dev server its script can arrive
// after the page is interactive, and a click sent before hydration is lost.
async function openScenario(page: Page, path: string) {
  await page.goto(path);
  await page.waitForLoadState('networkidle');
}

test('scenario player shows briefing and allows interaction', async ({ page }) => {
  await openScenario(page, '/en/scenarios/defib-wont-charge');
  // Verify briefing is visible
  await expect(page.locator('text=Nurse Kari')).toBeVisible();
  // Click a choice in first step
  const correctChoice = page.locator('button', { hasText: 'Talk to the nurse' });
  await correctChoice.click();
  // Verify feedback appears
  await expect(page.locator('text=Correct')).toBeVisible();
});

test('a scenario with a lab-handoff step can be played to completion', async ({ page }) => {
  await openScenario(page, '/en/scenarios/defib-wont-charge');

  await page.locator('button', { hasText: 'Talk to the nurse' }).click();
  await page.locator('button', { hasText: 'Bring to workshop, test with Fluke' }).click();

  // Step 3 is a lab-handoff: it takes no answer, so it must offer its own way on.
  const measurements = page.locator('text=Fluke Impulse 7000DP');
  await expect(measurements.first()).toBeVisible();
  const continueButton = page.getByRole('button', { name: /Readings noted/ });
  await expect(continueButton).toBeVisible();
  await continueButton.click();

  // The final question must now be reachable.
  await page.locator('button', { hasText: 'Degraded high-voltage capacitor' }).click();

  await expect(page.locator('text=Scenario complete')).toBeVisible();
  await expect(page.locator('text=Key Takeaways')).toBeVisible();
});

test('the Norwegian player can also be played past a lab-handoff', async ({ page }) => {
  await openScenario(page, '/no/scenarios/defib-wont-charge');

  await page.locator('button', { hasText: 'Snakk med sykepleieren' }).click();
  await page.locator('button', { hasText: 'Ta til verkstedet, test med Fluke' }).click();

  const continueButton = page.getByRole('button', { name: /gå videre/i });
  await expect(continueButton).toBeVisible();
  await continueButton.click();

  await page.locator('button', { hasText: /[Dd]egradert.*kondensator/ }).click();

  await expect(page.getByRole('heading', { name: 'Scenario fullført' })).toBeVisible();
});
