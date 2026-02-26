import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // This simulates the browser environment (window, document, localStorage)
    environment: "jsdom",
    // This makes 'describe', 'it', 'expect' available globally if you want
    globals: true,
  },
});
