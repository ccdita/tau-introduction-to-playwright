import { type Page, type Locator } from '@playwright/test';

export class PlaywrightHomePage {

    // Variables
    readonly page: Page;
    readonly searchbar: Locator;

    // Constructor
    constructor(page: Page) {
        this.page = page;
        this.searchbar = page.getByLabel('Search (Ctrl+K)');
    }

    // Methods
    async clickSearchBar() {
        this.searchbar.click();
    }
}

export default PlaywrightHomePage;