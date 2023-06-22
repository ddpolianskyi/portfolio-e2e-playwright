const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
	testDir: 'test/specs',
	testMatch: '*.js',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 3 : 3,
	workers: process.env.CI ? 3 : 3,
	reporter: [['list'], ['allure-playwright']],
	use: {
		baseURL: 'https://www.saucedemo.com',
		video: 'retain-on-failure'
	},
	projects: [
		{
			name: 'Chrome',
			use: { ...devices['Desktop Chrome'] },
		},

		{
			name: 'Firefox',
			use: { ...devices['Desktop Firefox'] },
		},

		{
			name: 'Safari',
			use: { ...devices['Desktop Safari'] },
		}
	]
});