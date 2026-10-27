/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: { "/api": "http://localhost:8080" },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test-setup.ts",
    coverage: {
      include: ["src/**"],
      exclude: ["src/main.tsx", "src/test-setup.ts", "src/**/*.test.*"],
      thresholds: { lines: 70, functions: 70, branches: 70, statements: 70 },
    },
  },
});
