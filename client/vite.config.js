import { fileURLToPath, URL } from 'url';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import manifest from './manifest.js';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

export default defineConfig({
  server: {
    port: 8080,
  },
  preview: {
    '/': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
    '^/images/.*': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    VitePWA({
      manifest,
      strategies: 'generateSW',
      workbox: {
        globPatterns: ['**/*.{js,css,html,jpg,ico,xml,svg,png,ttf,woff2}'],
        runtimeCaching: [
          {
            urlPattern: '/books',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'books',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 1, // <== 1 day
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /.*images\/icons\/*.*.png/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 1, // <== 1 day
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https?:\/\/localhost:3000\/books/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'book-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 1, // <== 1 day
              },
            },
          },
        ],
      },
    }),
    quasar({
      sassVariables: 'src/quasar-variables.sass',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
