const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './api/tests',
  timeout: 30 * 1000,
  fullyParallel: false,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/playwright-report', open: 'never' }]
  ],
  use: {
    baseURL: 'https://automationexercise.com'
  }
});