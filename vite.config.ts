import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    target: 'esnext',
    lib: {
        entry: 'src/main.ts',
        name: 'ticking-ui',
        fileName: 'ticking-ui',
        formats: ['es', 'umd'],
    },
  },
});