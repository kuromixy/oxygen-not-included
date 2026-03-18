// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://kuromixy.github.io',
  base: '/oxygen-not-included',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
