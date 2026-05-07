# Chapter 4

## Chapter 4 - Visual Regression Testing with Applitools

- Playwright can produce and visually compare screenshots via `expect(page).toHaveScreenshot()`
- **Baseline**: an image reference used as the source of truth in visual testing
    - Differences from this baseline = visual error

### Applitools Setup 

- This course uses Applitools for visual testing
    - Good for managing baselines to select areas to be ignored, and for managing precision in image comparisons
- Install Applitools-Playwright integration:

`npm i -D @applitools/eyes-playwright`

### Running Visual Tests with Applitools
- Run `npm run test:visual:playwright` (See `package.json` for script)
- On the Applitools Eyes Dashboard, you will see:
    - The batch name and runner name
    - Baseline image
    - Differences from baseline image, if any
    - Test environment (branch, OS, browser, browser version, device, etc.)

**Error Checking with Applitools**
- `example-applitools.spec.ts` will simulate visual errors
- Two checks: login page and main page after signing in
- https://demo.applitools.com/index_v2.html has visual errors compared to https://demo.applitools.com
- Run `npm run test:visual:acme` with URL = https://demo.applitools.com to create the baseline images
- Run the same script again, but with URL = https://demo.applitools.com/index_v2.html to see how Applitools handles visual errors!