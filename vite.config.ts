import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/officemag/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        black: resolve(__dirname, 'src/pages/black-page.html'),
      },
    },
  },
});
