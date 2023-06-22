const { test, expect } = require('@playwright/test');

const { BasePage } = require('../pageobjects/BasePage');
const { InventoryPage } = require('../pageobjects/InventoryPage');
const { CartPage } = require('../pageobjects/CartPage');

test.beforeEach(async ({ page }) => {
    const basePage = new BasePage(page);

    await basePage.open();
    await basePage.login();
});

test.describe('Inventory', () => {
    test('The inventory item details page should be open', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        const itemTitle = await inventoryPage.itemTitle(1).textContent();
        await inventoryPage.itemTitle(1).click();
        await expect(inventoryPage.itemDetailsName).toBeVisible();
        await expect(inventoryPage.itemDetailsName).toHaveText(itemTitle);
        await expect(page).toHaveURL(/.*inventory-item.html/);
    });

    test('The inventory item should be moved to the shopping cart', async ({ page }) => {
        const basePage = new BasePage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        const itemTitle = await inventoryPage.itemTitle(1).textContent();
        await inventoryPage.itemAddToCartButton(1).click();
        await expect(inventoryPage.itemRemoveFromCartButton(1)).toBeVisible();
        await basePage.shoppingCartIcon.click();
        await expect(page).toHaveURL(/cart.html$/);
        await expect(cartPage.itemTitle(1)).toBeVisible();
        await expect(cartPage.itemTitle(1)).toHaveText(itemTitle);
    });

    test('The inventory item should be removed from the shopping cart', async ({ page }) => {
        const basePage = new BasePage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        await inventoryPage.itemAddToCartButton(1).click();
        await expect(inventoryPage.itemRemoveFromCartButton(1)).toBeVisible();
        await basePage.shoppingCartIcon.click();
        await expect(page).toHaveURL(/cart.html$/);
        await expect(cartPage.cartItems).toBeVisible();
        await cartPage.itemRemoveFromCartButton(1).click();
        await expect(cartPage.cartItems).toBeHidden();
    });
});