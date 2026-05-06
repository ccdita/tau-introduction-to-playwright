import { type Page, type Locator, expect } from '@playwright/test';

export class LoginPage {

    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly submitButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.getByLabel('Username');
        this.passwordField = page.getByLabel('Password');
        this.submitButton = page.getByRole('button', { name: 'Submit' });
    }

    /**
     * Fills the username field with the given username
     * @param username to enter
     */
    async fillUsernameField(username: string) {
        await this.usernameField.click();
        await this.usernameField.fill(username);
    }

    /**
     * Fills the password field with the given password
     * @param password to enter
     */
    async fillPasswordField(password: string) {
        await this.passwordField.click();
        await this.passwordField.fill(password);
    }

    /**
     * Clicks the submit button
     */
    async clickSubmit() {
        await this.submitButton.click();
    }

    /**
     * Logs into the page with the given username and password
     * @param username to enter
     * @param password to enter
     */
    async logIntoPage(username: string, password: string) {
        // Add await here to ensure the fields are filled before clicking the submit button
        await this.fillUsernameField(username);
        await this.fillPasswordField(password);
        // Promise.all() prevents race conditions between the button click and the navigation event
        await Promise.all([
            // Add listener for navigation before clicking the submit button to ensure it is detected
            this.page.waitForURL('https://practicetestautomation.com/logged-in-successfully/'),
            this.clickSubmit(),
        ]);
    }
}