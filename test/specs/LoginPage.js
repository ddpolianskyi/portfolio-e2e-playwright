const { test, expect } = require('@playwright/test');
const fixtures = require('../fixtures/fixtures.json');

const { BasePage } = require('../pageobjects/BasePage');
const { LoginPage } = require('../pageobjects/LoginPage');

const errorMessages = [
    'Epic sadface: Username is required',
    'Epic sadface: Password is required',
    'Epic sadface: Username and password do not match any user in this service',
    'Epic sadface: Sorry, this user has been locked out.'
];

test.beforeEach(async ({ page }) => {
    const basePage = new BasePage(page);

    await basePage.open();
});

test.describe('Login', () => {
    test('Should login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.enterUsername(fixtures.validUsername);
        await loginPage.enterPassword(fixtures.validPassword);
        await loginPage.loginButton.click();
        await expect(loginPage.errorMessage).toBeHidden();
        await expect(page).toHaveURL(/inventory.html$/);
    });

    test('Should not login with empty fields', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.loginButton.click();
        await loginPage.checkError(errorMessages[0]);
    });

    test('Should not login with empty password field', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.enterUsername(fixtures.validUsername);
        await loginPage.loginButton.click();
        await loginPage.checkError(errorMessages[1]);
    });

    test('Should not login with non-existing user credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.enterUsername(fixtures.nonExistingUsername);
        await loginPage.enterPassword(fixtures.validPassword);
        await loginPage.loginButton.click();
        await loginPage.checkError(errorMessages[2]);
    });

    test('Should not login with locked out user credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.enterUsername(fixtures.lockedOutUsername);
        await loginPage.enterPassword(fixtures.validPassword);
        await loginPage.loginButton.click();
        await loginPage.checkError(errorMessages[3]);
    });
});