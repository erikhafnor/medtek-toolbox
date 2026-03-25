import { test, expect } from '@playwright/test';

test('scenario player shows briefing and allows interaction', async ({ page }) => {
  await page.goto('/en/scenarios/defib-wont-charge');
  // Verify briefing is visible
  await expect(page.locator('text=Nurse Kari')).toBeVisible();
  // Click a choice in first step
  const correctChoice = page.locator('button', { hasText: 'Talk to the nurse' });
  await correctChoice.click();
  // Verify feedback appears
  await expect(page.locator('text=Correct')).toBeVisible();
});
