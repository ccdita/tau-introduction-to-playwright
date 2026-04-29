import { type Locator, type Page, expect } from '@playwright/test';

/**
 * POM for the Playwright homepage
 */

export class HomePage {

    // Variables
    readonly page: Page; // variable page of type Page
    readonly getStartedButton: Locator; // variable getStartedButton of type Locator
    readonly pageTitle: RegExp; // variable title of type RegExp

    // Constructor
    constructor(page: Page) {
        this.page = page; // Set the page instance variable to the given page argument
        // Get the 'Get started' button and assign to the getStartedButton instance variable
        this.getStartedButton = page.getByRole('link', { name: 'Get started' });
        this.pageTitle = /Playwright/;
    }

    // Methods
    /**
     * Clicks the 'Get Started' button
     */
    async clickGetStarted() {
        await this.getStartedButton.click();
    }

    /**
     * Check that the Playwright homepage has the correct title
     */
    async assertPageTitle() {
        await expect(this.page).toHaveTitle(this.pageTitle);
    }
}

/**
 * Export defaults:
 * - Only one per file
 * - Import syntax: import AnyAlias from './file'
 * - No curly braces in import syntax
 * 
 * Differs from named exports, which:
 * - Can have multiple exports per file
 * - Import syntax: import { ExactName } from './file'
 * - Required curly braces in import syntax
 * 
 * Export defaults are more common
 */
export default HomePage;