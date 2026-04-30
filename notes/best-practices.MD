# Best Practices - Playwright and Testing

https://playwright.dev/docs/best-practices

## Testing Philosophy

### Test user-visible behavior
- Tests should only see/interact with what end users see

### Make tests as isolated as possible
- Each test should run independently with its own local storage, session storage, data, cookies, etc.
- Isolation = reproducibility, easier debugging, and no cascading test failures

### Avoid testing third-party dependencies
- Do not test links to external sites or third party servers that you don't control
- Doing so is time consuming, you cannot control page you are linking to, and may fail your tests if there are cookie banners, overlay pages, etc.
- Use the Playwright Network API for this kind of testing

### Testing with a database
- Ensure you control the data
- Test against a staging environment
- For visual regression tests, ensure the OS and browser versions match

## Best Practices

### Use locators
- Use locators to find elements on a webpage
- Locators come with auto waiting and retry-ability
    - Auto waiting: Playwright performs actionability checks on the elements before interacting with it
- Prioritize user-facing attributes and explicit contracts for test resilience

**Use chaining and filtering**
- Locators can be chained to narrow down the search to a particular element

```typescript
// Get the list item 'Product 2'
const product = page.getByRole('listitem').filter({ hasText: 'Product 2' });
```

- Locators can also be filtered by text or by another locator

```typescript
await page
    .getByRole('listitem') // Get the list item 'Product 2'
    .filter({ hasText: 'Product 2' })
    // For this list item, click the button 'Add to cart'
    .getByRole('button', { name: 'Add to cart' }) 
    .click();
```

**Prefer user-facing attributes to XPath or CSS selectors**
- DOM can change, which can fail your tests

```typescript
// Do NOT do this, because the class can change!
page.locator('button.buttonIcon.episode-actions-later');

// Instead, DO this. This method is resilient to DOM changes
page.getByRole('button', { name: 'submit' });
```
### Generate locators
- Playwright's test generator can generate tests and pick locators for you
    - Looks at your page and identifies the best locator, prioritizing role, text, and test id locators
    - If there are multiple elements matching the locator, the test generator improves the locator to uniquely identify the target element

**Use `codegen` to generate locators**
- To pick a locator, run the `codegen` command followed by the URL you want to pick a locator from
```
npx playwright codegen playwright.dev
```

### Use web first assertions
- Playwright uses web first assertions to wait until the expected condition is met

**Don't use manual assertions**
- Don't use manual assertions that are not awaiting the expect (`await` must be before the `expect`)

```typescript
// Do NOT do this. For assertions like .isVisible(), the test won't wait - it will just check the locator is there and return immediately
expect(await page.getByText('welcome').isVisible()).toBe(true);

// Do this instead
await expect(page.getByText('welcome')).toBeVisible();
```

### Configure debugging
**Local debugging**
- Recommended to debug tests live in VSCode
- Live debug tests by clicking or editing locators in the test in VS Code, which will highlight the locator in the browser window + show you any other matching locators on the page
- Debug tests using Playwright inspector by running tests with the `--debug` flag
    - To debug a specific test add the name of the test file and the line number of the test followed by the `--debug` flag

        `npx playwright test example.spec.ts:9 --debug`

**Debugging on CI**
- Use Playwright trace viewer for CI failures
- Traces are configured in the Playwright config file and are set to run on CI on the first retry of a failed test
- Not recommended to configure traces to `on` because it's performance heavy
    - Instead, you can run a trace locally with the `--trace` flag

        `npx playwright test --trace on`

### Use Playwright's Tooling
- VS Code extension
- Test generator
- Trace viewer
- UI Mode
- Typescript

### Test across all browsers
- Ensures app works for all users
- In config file, set up projects with the browser or device to use

### Keep your Playwright dependency up to date
- Doing so allows you to test your app on the latest browser versions and catch failures before the latest browser version is released to the public

`npm install -D @playwright/test@latest`

### Run tests on CI
- Setup CI/CD and run your tests frequently (the more often, the better!)
    - Ideally, run tests on each commit and pull request
- Playwright comes with a GitHub actions workflow so that tests will run on CI for you with no setup required
- Playwright can be setup on a CI environment of your choice
- Use Linux when running tests on CI 
- Shard to make CI faster

**Optimize browser downloads on CI**
- Only install the browsers you actually need, especially on CI
    - e.g., if you're only testing with Chromium, install just Chromium
- Saves download time and disk space on CI machines

### Lint your tests
- Recommended to use TypeScript and linting with ESLint to catch errors early
- Use `@typescript-eslint/no-floating-promises` ESLint rule to make sure there are no missing awaits before the asynchronous calls to the Playwright API
- On your CI you can run `tsc --noEmit` to ensure that functions are called with the right signature

**Use parallelism and sharing**
- Playwright runs tests in parallel by default
- Tests in a single file are run in order, in the same worker process
- If you want to run independent tests in a single file in parallel, configure the mode to parallel or use sharding:

```typescript
import { test } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('runs in parallel 1', async ({ page }) => { /* ... */ });
test('runs in parallel 2', async ({ page }) => { /* ... */ });
```

`npx playwright test --shard=1/3`

## Productivity tips

### Use soft assertions
- Soft assertions don't immediately terminate a test execution, but rather compile and display a list of failed assertions once test ended

```typescript
// Make a few checks that will not stop the test when failed...
await expect.soft(page.getByTestId('status')).toHaveText('Success');

// ... and continue the test to check more things.
await page.getByRole('link', { name: 'next page' }).click();
```
