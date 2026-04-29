import { test, type Page } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { TopMenuPage } from '../pages/top-menu-page';

/**
 * Final version of example2.spec.ts which combines the HomePage and TopMenuPage POMs
 * example2-christal.spec.ts only uses the HomePage POM
 */

const URL = 'https://playwright.dev/';
let homePage: HomePage;
let topMenuPage: TopMenuPage;
const pageUrl = /.*intro/;

/**
 * Executes the following before each test
 */
test.beforeEach(async ({page}) => {
    await page.goto(URL); // Go to the defined URL
    homePage = new HomePage(page); // Create an instance of the HomePage POM
});

/**
 * Clicks the 'Get Started' button on the homepage and creates a new instance of the TopMenuPage POM
 * @param page to create instance of TopMenuPage POM of
 */
async function clickGetStarted(page: Page) {
    await homePage.clickGetStarted();
    topMenuPage = new TopMenuPage(page);
}

test.describe('Playwright website', () => {

    /**
     * Check that the homepage has the correct page title
     */
    test('has title', async () => {
        await homePage.assertPageTitle();
    });
    
    /**
     * Check that the page URL is correct after clicking the 'Get Started' button
     */
    test('get started link', async ({ page }) => {
        // Act
        await clickGetStarted(page);
        // Assert
        await topMenuPage.assertPageUrl(pageUrl);
    });
    
    /**
     * Checks that the description changes correctly when changing languages to Java
     */
    test('check Java page', async ({ page }) => {
        // Clicks the 'Java' option in the language dropdown menu
        // Notice the Act and Asset steps of the AAA pattern here
        await test.step('Act', async () => {
            await clickGetStarted(page); // Click the 'Get Started' button
            await topMenuPage.hoverNode(); // Hover over the button initially named 'Node.js'
            await topMenuPage.clickJava(); // Click the 'Java' option in the dropdown menu
        });
      
        // Checks that the appropriate description is displayed upon clicking the 'Java' option
        await test.step('Assert', async () => {
            await topMenuPage.assertPageUrl(pageUrl); // Check that the page URL is correct after clicking the 'Java' option
            await topMenuPage.assertNodeDescriptionNotVisible(); // Check that the Node.js description is not visible
            await topMenuPage.assertJavaDescriptionVisible(); // Check that the Java description is visible
        });
    });
});