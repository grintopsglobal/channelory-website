// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Domain harus sama dengan public/CNAME, public/admin/config.yml, dan ALLOWED_ORIGINS di oauth-proxy/wrangler.toml.
const SITE = 'https://channelory.my.id';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  output: 'static',
  i18n: {
    locales: ['id'],
    defaultLocale: 'id',
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  integrations: [
    sitemap({
      // Tanpa opsi i18n: slug boleh beda per bahasa, hreflang dipasang di <head> (SEO.astro).
      filter: (page) => /\/id\//.test(page),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
