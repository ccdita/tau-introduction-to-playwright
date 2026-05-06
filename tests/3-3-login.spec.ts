import { test, type Page } from '@playwright/test';
import { LoginPage } from '../pages/3-3-login-page';
import { LoggedInPage } from '../pages/3-3-logged-in-page';

const loginPageUrl = 'https://practicetestautomation.com/practice-test-login/';
let page: Page;
let loginPage: LoginPage;
let loggedInPage: LoggedInPage;
let username = 'student';
let password = 'Password123';

/**
 * Logs into practicetestautomation.com
 */
test.beforeAll(async ({ browser }) => {
    /**
     * beforeAll runs once per worker, so the browser fixture is used instead of page
     * page is a per-test fixture that is created AFTER beforeAll finishes, so the browser fixture must be
     * used manually to create a page instance
     */
    page = await browser.newPage();
    await page.goto(loginPageUrl);
    loginPage = new LoginPage(page);
    await loginPage.logIntoPage(username, password);
    loggedInPage = new LoggedInPage(page);
});

/**
 * Closes the page after all tests have run
 */
test.afterAll(async () => {
    await page.close();
});

/**
 * Logs the result of each test
 */
test.afterEach( async ({}, testInfo) => {
    // Log each test result within this file
    console.log(`Finished "${testInfo.title}" with status "${testInfo.status}"`);
});

test.describe('practicetestautomation.com navigation', () => {
    
    test('should navigate to the homepage with the Home link', async () => {
        await loggedInPage.clickHomeLink();
        await loggedInPage.assertPageUrl('https://practicetestautomation.com/');
    });

    test('should navigate to the practice page with the Practice link', async () => {
        await loggedInPage.clickPracticeLink();
        await loggedInPage.assertPageHeading('Practice');
    });

    test('should navigate to the courses page with the Courses link', async () => {
        await loggedInPage.clickCoursesLink();
        await loggedInPage.assertPageHeading('Courses');
    });

    test('should navigate to the blog page with the Blog link', async () => {
        await loggedInPage.clickBlogLink();
        await loggedInPage.assertPageUrl('https://practicetestautomation.com/blog/');
    });

    test('should navigate to the contact page with the Contact link', async () => {
        await loggedInPage.clickContactLink();
        await loggedInPage.assertPageHeading('Contact');
    });
});

