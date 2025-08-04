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
    inlineStylesheets: 'auto',
    assets: '_astro'
  },
  vite: {
    build: {
      cssMinify: true,
      minify: 'terser',
      rollupOptions: {
        output: {
          entryFileNames: '_astro/[name].[hash].js',
          chunkFileNames: '_astro/[name].[hash].js',
          assetFileNames: '_astro/[name].[hash].[ext]'
        }
      }
    }
  }
});
