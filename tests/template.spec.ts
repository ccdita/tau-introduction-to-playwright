/**
 * Non-functional template with guidance on how to structure test files
 */
import { test, expect } from '@playwright/test';

//AAA Pattern
// Have all Arranges at the beginning, then Acts, and finally, Asserts
// Can be nested (e.g., Arrange section has Arranges, Acts, and Asserts in it)
// [Arrange]
// [Act]
// [Assert]

// ========== ARRANGE SECTION ==========

// Tip: variables should come at the very beginning of a file or method
const password = process.env.PASSWORD;

/**
 * .beforeAll() executes before all tests within the file 
 * Common scenarios:
 * - Start a server
 * - Create a db connection
 * - Reuse a sign-in state
 */
test.beforeAll(async ({ playwright }) => {
    // Skip the test if the environment is production
    test.skip(
      !!process.env.PROD,
      'Test intentionally skipped in production due to data dependency.'
    );
});
  
/**
 * .beforeEach() executes before each test within the file
 * Common scenarios:
 * - Open a URL before each test
 * - Clean up the db
 * - Create a page object
 * - Dismiss a modal
 * - Load parameters
 */
test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Running ${testInfo.title}`);
});

test.afterAll(async ({ page }, testInfo) => {
    console.log('Test file completed.');
    // close a DB connection
});

/**
 * .afterEach() executes after each test within the file
 * Example scenario: close a db connection
 */
test.afterEach( async ({ page }, testInfo) => {
    // Log each test result within this file
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

    if (testInfo.status !== testInfo.expectedStatus)
        console.log(`Did not run as expected, ended up at ${page.url()}`);
    // clean up all the data we created for this test through API calls
});

// ====================

/**
 * .describe() groups tests together
 * One file can have multiple describes (instructor recommends splitting the describes between files)
 */
// test.describe('Test Scenario', () => {
// test.describe.only('Test Scenario', () => {
test.describe.skip('Test Scenario', () => {
    test('Test Case One', async ({ page }) => {
        // Steps can be used as Arrange, Act, and Assert, if needed
        // Can also use .only() or .skip() here
        await test.step('Step One', async () => {
            // Can further have AAA implementations here
            // ...
        });

        await test.step('Step Two', async () => {
            // ...
        });

        // ...
    });
  
    test('Test Case Two', async ({ page }) => {
        // Arrange
        // Act
        // Assert
    });
/**
    test.only('Test Case Three', async ({ page }) => {
        // Arrange
        // Act
        // Assert
    });
 */  
/**
    test.skip('Test Case Four', async ({ page }) => {
        // Arrange
        // Act
        // Assert
    });
 */

  });
  