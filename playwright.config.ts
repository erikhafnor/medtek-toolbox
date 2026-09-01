import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  // the suite books against the production database; this clears anything a
  // crashed or interrupted run left behind
  globalTeardown: './tests/e2e/global-teardown.ts',
  webServer: {
    // `astro preview` is unsupported with the Vercel adapter; use the dev server.
    command: 'npm run dev',
    port: 4321,
    reuseExistingServer: true,
  },
  use: {
    baseURL: 'http://localhost:4321',
  },
});
