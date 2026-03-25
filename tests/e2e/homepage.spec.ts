import { test, expect } from '@playwright/test';

test('EN homepage loads with search and device chips', async ({ page }) => {
  await page.goto('/en/');
  await expect(page.locator('text=medtek').first()).toBeVisible();
  await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
  await expect(page.locator('text=Defibrillator')).toBeVisible();
});

test('NO homepage loads with Norwegian text', async ({ page }) => {
  await page.goto('/no/');
  await expect(page.locator('text=Hva jobber du med')).toBeVisible();
});
