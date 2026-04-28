import { test, expect } from '@playwright/test';

/**
 * 1. Open the Playwright page
 * 2. Click on "API"
 * 3. Check the URL
 * 4. Click on "LocatorAssertions"
 * 5. Check the URL
 * 6. Check that the header is "LocatorAssertions"
 * 7. Check that toBeAttached is visible
 * 8. Check that toBeAttached has the appropriate classes
 */
test('check toBeAttached on LocatorAssertions page', async ({ page }) => {
    // 1. Open the Playwright page
    await page.goto('https://playwright.dev');

    // 2. Click on "API"
    await page.getByRole('link', { name: 'API' }).click();

    // 3. Check the URL
    await expect(page).toHaveURL('https://playwright.dev/docs/api/class-playwright');

    // 4. Click on "LocatorAssertions"
    await page.getByRole('link', { name: 'LocatorAssertions' }).click();

    // 5. Check the URL
    await expect(page).toHaveURL('https://playwright.dev/docs/api/class-locatorassertions');

    // 6. Check that the header is "LocatorAssertions"
    const header = page.locator('header');
    await expect(header).toContainText('LocatorAssertions');

    const toBeAttached = page.locator(`#locator-assertions-to-be-attached`);
    // 7. Check that toBeAttached is visible
    await expect(toBeAttached).toBeVisible();
    // 8. Check that toBeAttached has the appropriate classes
    await expect(toBeAttached).toHaveClass('anchor anchorWithStickyNavbar_LWe7');
})