import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jgcamiloaga.me',
  compressHTML: true,
  integrations: [
    sitemap()
  ],
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro'
  },
  vite: {
    build: {
      cssMinify: true,
      minify: 'terser'
    }
  }
});
