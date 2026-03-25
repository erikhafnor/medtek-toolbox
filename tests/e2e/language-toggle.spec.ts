import { test, expect } from '@playwright/test';

test('language toggle switches between EN and NO', async ({ page }) => {
  await page.goto('/en/');
  // Find and click the language toggle link to NO
  await page.click('a:has-text("NO")');
  await expect(page).toHaveURL(/\/no\//);
  await expect(page.locator('text=Hva jobber du med')).toBeVisible();
});
