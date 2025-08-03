import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jgcamiloaga.me',
  compressHTML: true,
  integrations: [
    // Sitemap automático para portafolio
    sitemap()
  ],
  build: {
    inlineStylesheets: 'auto'
  },
  vite: {
    build: {
      cssMinify: true,
      minify: 'terser'
    }
  }
});
