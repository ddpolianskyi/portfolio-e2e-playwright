const { expect } = require('@playwright/test');

exports.InventoryPage = class InventoryPage {
    constructor(page){
        this.page = page;

        this.itemDetailsName = this.page.locator('.inventory_details_name');
    };

    itemTitle(num){ return this.page.locator(`//*[@class="inventory_item"][${num}]//*[@class="inventory_item_name"]`) };
    itemAddToCartButton(num){ return this.page.locator(`//*[@class="inventory_item"][${num}]//*[contains(@data-test, "add-to-cart")]`) };
    itemRemoveFromCartButton(num){ return this.page.locator(`//*[@class="inventory_item"][${num}]//*[contains(@data-test, "remove")]`) };

    async clickItemTitle(num){
        await this.itemTitle(num).click();
        await expect(this.itemDetailsName).toBeVisible();
        await expect(this.page).toHaveURL(/inventory-item.html$/);
    }
};