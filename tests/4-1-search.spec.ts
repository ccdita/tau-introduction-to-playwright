import { test, type Page } from '@playwright/test';
import { PlaywrightHomePage } from '../pages/4-1-playwright-home-page';
import { PlaywrightSearch } from '../pages/4-1-playwright-search';
import {
    BatchInfo,
    Configuration,
    EyesRunner,
    ClassicRunner,
    VisualGridRunner,
    BrowserType,
    DeviceName,
    ScreenOrientation,
    Eyes,
    Target
} from '@applitools/eyes-playwright';

const playwrightUrl = 'https://playwright.dev/';
let locatorsUrl = 'https://playwright.dev/docs/locators';
let playwrightHomePage: PlaywrightHomePage;
let playwrightSearch: PlaywrightSearch;

/**
 * Applitools setup
 */
export const USE_ULTRAFAST_GRID: boolean = true; // Use Ultrafast Grid Runner
export let Batch: BatchInfo;
export let Config: Configuration;
export let Runner: EyesRunner;
let eyes: Eyes;

/**
 * Sets up Applitools configurations
 */
test.beforeAll(async() => {
    if (USE_ULTRAFAST_GRID) {
        Runner = new VisualGridRunner({ testConcurrency: 5 });
    } else {
        Runner = new ClassicRunner();
    }

    const runnerName = (USE_ULTRAFAST_GRID) ? 'Ultrafast Grid' : 'Classic runner';
    Batch = new BatchInfo({ name: `Playwright website - ${runnerName}` });
    Config = new Configuration();
    Config.setBatch(Batch);
    if (USE_ULTRAFAST_GRID) {
        Config.addBrowser(800, 600, BrowserType.CHROME);
        Config.addBrowser(1600, 1200, BrowserType.FIREFOX);
        Config.addBrowser(1024, 768, BrowserType.SAFARI);
        Config.addDeviceEmulation(DeviceName.iPhone_11, ScreenOrientation.PORTRAIT);
        Config.addDeviceEmulation(DeviceName.Nexus_10, ScreenOrientation.LANDSCAPE); 
    }
});

/**
 * Executes before each test
 */
test.beforeEach(async ({ page }) => {
    // Applitools
    eyes = new Eyes(Runner, Config);
    await eyes.open(
        page,
        'Playwright',
        test.info().title,
        { width: 1024, height: 768 }
    );

    await page.goto(playwrightUrl); // Go to the Playwright homepage
    playwrightHomePage = new PlaywrightHomePage(page); // Create a POM from the homepage
    clickSearchBar(page);
});

/**
 * Closes the eyes instance to close the session after each test
 */
test.afterEach(async () => {
    await eyes.close();
});

/**
 * Retrieves the results of all visual tests executed within a test suite
 */
test.afterAll(async () => {
    const results = await Runner.getAllTestResults();
    console.log('Visual test results', results);
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
        await eyes.check('Locators page', Target.window()); // Do a visual check on the Locators page
        await playwrightSearch.assertUrl(locatorsUrl);
    });

    // Negative test case
    /**
     * Check that no results show when "nonexistent" is typed into the
     * search bar
     */
    test('should have no results when given query "nonexistent"', async () => {
        await playwrightSearch.fillSearchBar('nonexistent');
        // Do a visual check on a nonexistent search query
        await eyes.check('No results from search query', Target.window());
        await playwrightSearch.assertSearchResult('');
    });
});