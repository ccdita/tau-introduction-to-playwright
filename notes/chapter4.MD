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