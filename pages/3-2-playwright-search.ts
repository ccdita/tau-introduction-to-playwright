import { type Page, type Locator, expect, Keyboard } from '@playwright/test';

export class PlaywrightSearch {

    // Variables
    readonly page: Page;
    readonly searchbar: Locator;
    readonly noResultsText: Locator;
    readonly keyboard: Keyboard;

    // Constructor
    constructor(page: Page) {
        this.page = page;
        this.searchbar = page.getByPlaceholder('Search docs');
        this.noResultsText = page.getByText("No results for");
        this.keyboard = page.keyboard;
    }

    // Methods
    /**
     * Fills the search bar with the given query
     * @param query to enter into search bar
     */
    async fillSearchBar(query: string) {
        await this.searchbar.fill(query);
    }

    /**
     * Checks that the expected result appears. If the given result is empty (''), check that the
     * output indicates that there are no results for the query
     * @param result of query
     */
    async assertSearchResult(result: string) {
        if (result == '') {
            await expect(this.noResultsText).toBeVisible();
        } else {
            await expect(this.page.getByRole('link', { name: result, exact: true })).toBeVisible();
        }
    }

    /**
     * Selects a result x rows from the top using the down and enter keys for navigation and selection, respectively
     * @param x, number of rows selected result is located from the top
     */
    async selectResult(x: number) {
        for (let i = 0; i < x; i++) { await this.keyboard.press('ArrowDown'); }
        await this.keyboard.press('Enter');
    }

    /**
     * Checks that the loaded page's URL matches the given pageUrl
     * @param pageUrl to check the page's URL against
     */
    async assertUrl(pageUrl: string) {
        await expect(this.page).toHaveURL(pageUrl);
    }
}