const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {
    constructor(page){
        this.page = page;

        this.usernameField = this.page.locator('#user-name');
        this.passwordField = this.page.locator('#password');
        this.loginButton = this.page.locator('#login-button');
        this.errorMessage = this.page.locator('[data-test="error"]');
    };

    async enterUsername(username){
        await this.usernameField.fill(username);
        await expect(this.usernameField).toHaveValue(username);
    };
    async enterPassword(password){
        await this.passwordField.fill(password);
        await expect(this.passwordField).toHaveValue(password);
    };
    async checkError(errorName){
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(errorName);
    };
};