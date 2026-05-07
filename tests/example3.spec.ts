import { test, type Page } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { TopMenuPage } from '../pages/top-menu-page';
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

const URL = 'https://playwright.dev/';
let homePage: HomePage;
let topMenuPage: TopMenuPage;
const pageUrl = /.*intro/;

// Applitools
// Defines which runner Applitools will use
// export const USE_ULTRAFAST_GRID: boolean = true;
export const USE_ULTRAFAST_GRID: boolean = false;
export let Batch: BatchInfo;
export let Config: Configuration;
export let Runner: EyesRunner;
let eyes: Eyes;
// end of Applitools

// beforeAll for Applitools
test.beforeAll(async() => {

    /**
     * Determine which runner to use
     * Ultrafast Grid
     * - All test execution will be managed by Applitools in the cloud
     * - Useful for running many browsers and devices
     * 
     * ClassicRunner
     * - Manage everything locally
     * - You must run every single browser or device in the local machine
     * - Time-consuming because you must download and install every single browser,
     * and manage parallelism locally
     */
    if (USE_ULTRAFAST_GRID) {
        /**
         * Define how many tests in parallel to run with testConcurrency
         * The free version of Applitools lets you run only one test
         */
        Runner = new VisualGridRunner({ testConcurrency: 5 });
    }
    else {
        Runner = new ClassicRunner();
    }
    
    // Displays on Applitools eyes dashboard
    const runnerName = (USE_ULTRAFAST_GRID) ? 'Ultrafast Grid' : 'Classic runner';
    /**
     * A batch is a collection of checkpoints for each test suite
     * - If we are using the VisualGridRunner, we will have one batch for all the configurations since
     * Applitools manages everything for us
     * - If we are using the ClassicRunner, each browser or device will be one group of batches, since
     * we will start and trigger every single test locally
     */
    Batch = new BatchInfo({name: `Playwright website - ${runnerName}`});
    
    Config = new Configuration();
    // Config.setApiKey("<your-api-key>");
    
    Config.setBatch(Batch);
    if (USE_ULTRAFAST_GRID) {
        // Add different viewports, screen orientations, browsers, devices
        Config.addBrowser(800, 600, BrowserType.CHROME);
        Config.addBrowser(1600, 1200, BrowserType.FIREFOX);
        Config.addBrowser(1024, 768, BrowserType.SAFARI);
        Config.addDeviceEmulation(DeviceName.iPhone_11, ScreenOrientation.PORTRAIT);
        Config.addDeviceEmulation(DeviceName.Nexus_10, ScreenOrientation.LANDSCAPE);
    }

});


test.beforeEach(async ({page}) => {
    //Applitools
    // Create a new eyes instance for each test
    eyes = new Eyes(Runner, Config);
    // Starts the test execution in Applitools
    await eyes.open(
      // Required parameters:
      page, // Driver
      'Playwright', // App name
      test.info().title, // Test name
      { width: 1024, height: 768 } // View port
    );
    //end of Applitools

    await page.goto(URL);
    homePage = new HomePage(page);
});

test.afterEach(async () => {
    // We must close the eyes instance after each test execution
    // Ensures session is finished
    await eyes.close();
});

test.afterAll(async() => {
  // forces Playwright to wait synchronously for all visual checkpoints to complete.
  const results = await Runner.getAllTestResults();
  console.log('Visual test results', results);
});

async function clickGetStarted(page: Page) {
    await homePage.clickGetStarted();
    topMenuPage = new TopMenuPage(page);
}

test.describe('Playwright website', () => {

    test('has title', async () => {
        await homePage.assertPageTitle();
        /**
         * Applitools performs visual check given the page name and target
         * - Target.window() only considers the viewport
         * - .fully() scrolls and takes a screenshot of the whole page
         * - For more check options: // https://applitools.com/docs/api-ref/sdk-api/playwright/js-intro/checksettings
         */
        await eyes.check('Home page', Target.window().fully());
    });
    
    test('get started link', async ({ page }) => {
        await clickGetStarted(page);
        await topMenuPage.assertPageUrl(pageUrl);
        // https://applitools.com/docs/api-ref/sdk-api/playwright/js-intro/checksettings#region-match-levels
        // Layout: Check only the layout and ignore actual text and graphics.
        // Useful for eCommerce apps where products may change
        await eyes.check('Get Started page', Target.window().fully().layout());
    });
    
    test('check Java page', async ({ page }) => {
        await test.step('Act', async () => {
            await clickGetStarted(page);
            await topMenuPage.hoverNode();
            await topMenuPage.clickJava();
        });    
        await test.step('Assert', async () => {
            await topMenuPage.assertPageUrl(pageUrl);
            await topMenuPage.assertNodeDescriptionNotVisible();
            await topMenuPage.assertJavaDescriptionVisible();
            // https://applitools.com/docs/api-ref/sdk-api/playwright/js-intro/checksettings#region-match-levels
            // Ignore colors: Similar to the strict match level but ignores changes in colors.
            await eyes.check('Java page', Target.window().fully().ignoreColors());
        });
    });
});