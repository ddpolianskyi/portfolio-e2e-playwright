const { expect } = require('@playwright/test');

exports.CartPage = class CartPage {
    constructor(page){
        this.page = page;

        this.cartItems = this.page.locator('.cart_item');

        this.continueShoppingButton = this.page.locator('[data-test="continue-shopping"]');
        this.checkoutButton = this.page.locator('[data-test="checkout"]');
        
        this.checkoutFirstNameField = this.page.locator('#first-name');
        this.checkoutLastNameField = this.page.locator('#last-name');
        this.checkoutPostalCodeField = this.page.locator('#postal-code');
        this.checkoutContinueButton = this.page.locator('#continue');
        this.checkoutFinishButton = this.page.locator('#finish');
        this.checkoutErrorMessage = this.page.locator('[data-test="error"]');
    }

    itemTitle(num){ return this.page.locator(`//*[@class="cart_item"][${num}]//*[@class="inventory_item_name"]`) };
    itemRemoveFromCartButton(num){ return this.page.locator(`//*[@class="cart_item"][${num}]//*[contains(@data-test, "remove")]`) };

    async enterCheckoutFirstName(firstName){
        await this.checkoutFirstNameField.fill(firstName);
        await expect(this.checkoutFirstNameField).toHaveValue(firstName);
    };
    async enterCheckoutLastName(lastName){
        await this.checkoutLastNameField.fill(lastName);
        await expect(this.checkoutLastNameField).toHaveValue(lastName);
    };
    async enterCheckoutPostalCode(postalCode){
        await this.checkoutPostalCodeField.fill(postalCode);
        await expect(this.checkoutPostalCodeField).toHaveValue(postalCode);
    };
    async checkCheckoutError(errorName){
        await expect(this.checkoutErrorMessage).toBeVisible();
        await expect(this.checkoutErrorMessage).toHaveText(errorName);
    };
}