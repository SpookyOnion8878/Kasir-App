import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Vitest configuration. Kept separate from vite.config.ts to avoid a
// duplicate/conflicting Vite instance pulled in by vitest's own dependency.
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    exclude: ['**/node_modules/**', '**/dist/**'],
  },
});
