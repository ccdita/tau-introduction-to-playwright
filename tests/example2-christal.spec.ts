import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/home-page-christal'; // Import the HomePage POM

// This test file uses the AAA pattern to organize tests
// Only uses the HomePage POM (example2.spec.ts uses both the HomePage and TopMenuPage POMs)

/**
 * In example.spec.ts, the playwright URL is being accessed multiple times
 * Let's refactor this functionality to avoid repetition
 */
const playwrightURL = 'https://playwright.dev/';
let homePage: HomePage; // Block-scoped (unlike var), reassignable

/**
 * Because each test in example.spec.ts begins with accessing the Playwright URL,
 * let's create a beforeEach method doing exactly this
 */
test.beforeEach(async ({page}) => {
    await page.goto(playwrightURL);
    // Create a new instance of the HomePage POM and assign to homePage
    homePage = new HomePage(page);
});

/**
 * Some tests use the same command: await page.getByRole('link', { name: 'Get started' }).click();
 * Let's create an async function to store this command and call it in the tests that use this action
 */
async function clickGetStarted() {
    // await page.getByRole('link', { name: 'Get started' }).click();
    // Replace the above statement with the one below since we are using a POM
    await homePage.clickGetStarted();
}

/**
 * Group the tests together
 */
test.describe('Playwright website', () => {
    test('has title', async () => {
        // await expect(page).toHaveTitle(/Playwright/);
        // Replace the above statement with the one below since we are using a POM
        await homePage.assertPageTitle();
    });

    test('get started link', async ({ page }) => {
        await clickGetStarted();
        await expect(page).toHaveURL(/.*intro/);
    });

    test('check Java page', async ({ page }) => {
        await clickGetStarted();
        await page.getByRole('button', { name: 'Node.js' }).hover();
        await page.getByText('Java', { exact: true }).click();
        // await page.getByRole('navigation', { name: 'Main' }).getByText('Java').click(); // in case the locator above doesn't work, you can use this line. Remove the line above and use this one instead.
        await expect(page).toHaveURL('https://playwright.dev/java/docs/intro');
        await expect(page.getByText('Installing Playwright', { exact: true })).not.toBeVisible();
        const javaDescription = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`;
        await expect(page.getByText(javaDescription)).toBeVisible();
    });
});