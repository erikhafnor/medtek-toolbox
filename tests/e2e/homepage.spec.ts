import { test, expect } from '@playwright/test';

test('EN homepage loads with search and device chips', async ({ page }) => {
  await page.goto('/en/');
  // the brand mark is an image now, so assert the accessible name of its link
  await expect(page.getByRole('link', { name: 'medtek.tools' }).first()).toBeVisible();
  await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
  // by role, not by text: the dev toolbar's island-props <code> blocks also
  // contain the device names and make a bare text locator ambiguous
  await expect(page.getByRole('link', { name: /Defibrillator/ })).toBeVisible();
});

test('NO homepage loads with Norwegian text', async ({ page }) => {
  await page.goto('/no/');
  await expect(page.locator('text=Hva jobber du med')).toBeVisible();
});
