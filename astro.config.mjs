// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import pagefind from 'astro-pagefind';

// https://astro.build/config
export default defineConfig({
  site: 'https://kuromixy.github.io',
  base: '/oxygen-not-included',
  output: 'static',
  integrations: [pagefind()],
  vite: {
    plugins: [tailwindcss()],
  },
});
