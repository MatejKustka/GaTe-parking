import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      include: ['src/**'],
      exclude: ['src/server.ts', 'src/db.ts', 'src/**/*.test.*'],
      thresholds: { lines: 70, functions: 70, branches: 70, statements: 70 },
    },
  },
});
