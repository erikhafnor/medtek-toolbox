// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  // Pages stay prerendered; only the /api booking endpoints opt into SSR.
  adapter: vercel(),
  // e2e tests run against `astro dev` (the Vercel adapter has no `astro preview`);
  // the toolbar's hidden island-props <code> blocks break Playwright text locators
  devToolbar: { enabled: false },
  integrations: [svelte()],

  vite: {
    plugins: [tailwindcss()],
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'no'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
