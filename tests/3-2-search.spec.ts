import { test, type Page } from '@playwright/test';
import { PlaywrightHomePage } from '../pages/3-2-playwright-home-page';
import { PlaywrightSearch } from '../pages/3-2-playwright-search';

const playwrightUrl = 'https://playwright.dev/';
let locatorsUrl = 'https://playwright.dev/docs/locators';
let playwrightHomePage: PlaywrightHomePage;
let playwrightSearch: PlaywrightSearch;

/**
 * Executes before each test
 */
test.beforeEach(async ({ page }) => {
    await page.goto(playwrightUrl); // Go to the Playwright homepage
    playwrightHomePage = new PlaywrightHomePage(page); // Create a POM from the homepage
    clickSearchBar(page);
});

/**
 * Clicks the search bar on the homepage and instantiates a POM from the new page
 * @param page object to instantiate the new PlaywrightSearch POM with
 */
async function clickSearchBar(page: Page) {
    await playwrightHomePage.clickSearchBar(); // Click the search bar
    playwrightSearch = new PlaywrightSearch(page); // Create a POM from the new page
}

test.describe('Playwright search functionality', () => {

    // Positive test case
    /**
     * Check that the Locators guide shows as a result when "locator guide"
     * is typed into the search bar
     */
    test('should list the Locators guide when given query "locator guide"', async () => {
        await playwrightSearch.fillSearchBar('locator guide');
        await playwrightSearch.assertSearchResult('Locators');
        await playwrightSearch.selectResult(3);
        await playwrightSearch.assertUrl(locatorsUrl);
    });

    // Negative test case
    /**
     * Check that no results show when "nonexistent" is typed into the
     * search bar
     */
    test('should have no results when given query "nonexistent"', async () => {
        await playwrightSearch.fillSearchBar('nonexistent');
        await playwrightSearch.assertSearchResult('');
    });
});