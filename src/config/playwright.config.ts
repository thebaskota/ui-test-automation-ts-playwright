import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60000, // Global test timeout
  expect: {
    timeout: 10000 // Timeout for expect() assertions
  },
  retries: 1,
  reporter: 'html',
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    }
  ]
});