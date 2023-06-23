const { expect } = require('@playwright/test');
const fixtures = require('../fixtures/fixtures.json');

const { LoginPage } = require('./LoginPage');

exports.BasePage = class BasePage {
    constructor(page){
        this.page = page;

        this.shoppingCartIcon = this.page.locator('.shopping_cart_link');
    };

    async open(){
        await this.page.goto('/');
    };
    async login(){
        const loginPage = new LoginPage(this.page);
        
        await loginPage.enterUsername(fixtures.validUsername);
        await loginPage.enterPassword(fixtures.validPassword);
        await loginPage.loginButton.click();
        await expect(loginPage.errorMessage).toBeHidden();
        await expect(this.page).toHaveURL(/inventory.html$/);
    };
};