/**
 * test = test object for test cases
 * expect = used for assertions
 */
import { test, expect } from '@playwright/test';

/**
 * - Tests begin with a test name and the page object
 * - The page object gives us access to functions we can use on the page
 * - Tests also consist of an action and an assertion
 */
test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/'); // Action

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/); // Assertion
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});

/**
 * 1. Open the page
 * 2. Click at Get started
 * 3. Mouse hover the language dropdown
 * 4. Click at  Java
 * 5. Check the URL 
 * 6. Check the text "Installing Playwright" is not being displayed
 * 7. Check the text below is displayed
 * 
 * Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.
 * 
 * test.only = Run this test only (multiple tests can have the .only so that we can group them together)
 */
test.only('check Java page', async ({ page }) => {

  /**
   * 1. Go to the page
   * await allows us to run synchronously run commands in a Node application (i.e., the next step will execute only when the 
   * previous step completes)
   */
  await page.goto('https://playwright.dev');

  // 2. Click at Get started
  await page.getByRole('link', {name: 'Get started'}).click();

  // 3. Mouse over the language dropdown
  await page.getByRole('button', {name: 'Node.js'}).hover();

  // 4. Click at Java
  await page.getByText('Java', {exact: true}).click();
  // await page.getByRole('navigation', { name: 'Main' }).getByText('Java').click(); // in case the locator above doesn't work, you can use this line. Remove the line above and use this one instead.

  // 5. Check the URL
  await expect(page).toHaveURL('https://playwright.dev/java/docs/intro');

  // 6. Check the text "Installing Playwright" is not being displayed
  await expect(page.getByText('Installing Playwright', {exact: true})).not.toBeVisible();

  // 7. Check the given text is displayed
  const javaDescription = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`
  await expect(page.getByText(javaDescription)).toBeVisible();
});