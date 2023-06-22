const { test, expect } = require('@playwright/test');
const fixtures = require('../fixtures/fixtures.json');

const { BasePage } = require('../pageobjects/BasePage');
const { CartPage } = require('../pageobjects/CartPage');

const errorMessages = [
    'Error: First Name is required',
    'Error: Last Name is required',
    'Error: Postal Code is required'
];

test.beforeEach(async ({ page }) => {
    const basePage = new BasePage(page);

    await basePage.open();
    await basePage.login();
});

test.describe('Shopping cart', () => {
    test('Returning to the inventory page from the shopping cart page', async ({ page }) => {
        const basePage = new BasePage(page);
        const cartPage = new CartPage(page);

        await basePage.shoppingCartIcon.click();
        await expect(page).toHaveURL(/cart.html$/);
        await cartPage.continueShoppingButton.click();
        await expect(page).toHaveURL(/inventory.html$/);
    });

    test('Making an order using checkout', async ({ page }) => {
        const basePage = new BasePage(page);
        const cartPage = new CartPage(page);

        await basePage.shoppingCartIcon.click();
        await cartPage.checkoutButton.click();
        await cartPage.checkoutContinueButton.click();
        await cartPage.checkCheckoutError(errorMessages[0]);

        await cartPage.enterCheckoutFirstName(fixtures.firstName);
        await cartPage.checkoutContinueButton.click();
        await cartPage.checkCheckoutError(errorMessages[1]);

        await cartPage.enterCheckoutLastName(fixtures.lastName);
        await cartPage.checkoutContinueButton.click();
        await cartPage.checkCheckoutError(errorMessages[2]);
    });
});