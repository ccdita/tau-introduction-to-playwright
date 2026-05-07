# Introduction to Playwright

## Chapter 4 - Exercises

**1. Revisit the previous tests you implemented and add visual testing via Applitools to them. How much that increased the test runtime?**

Adding visual testing via Applitools to the Playwright Search test (`x-x-search.spec.ts`) increased the test runtime by about 17 seconds.

**2. Add visual testing via Playwright to the [example2.spec.ts](/tests/example2.spec.ts) file. What differences have you noticed from Applitools?**

Visual testing via Playwright is more selective in that you must specify the elements you want to assert. Conversely, visual testing via Applitools captures any visual differences between the current page state and the baseline depending on the `eyes.check()` options used.

**3. Run the [example3.spec.ts](/tests/example3.spec.ts) with the Ultra Fast Grid. How does it compare to the Classic Runner?**

Ultrafast Grid produces a single batch in the Applitools Test Manager for each test run. Meanwhile, Classic Runner produces a batch for each test run per browser.

**4. Explore other check settings. Can you list a few scenarios that each of them is most appropriate for?**

- `region`
    - Visually checking a specific element, such as a header
    - Visually checking a specific container or section of the page using locators

- `frames`
    - Visually check `<iframe>` content embedding a document within the webpage

- `matchLevel`
    - `Strict`: Visually checking a login page to ensure absolutely nothing has changed
    - `Layout`: Visually checking that search results are displayed in the correct layout after entering a search query
    - `IgnoreColors`: Visually checking the structure/layout of the page without regard for color choices in UI
    - `Dynamic`: Visually check a page while ignoring dynamic content like advertisements or animations

- `ignoreRegions`
    - Checking for patterns and formatting instead of the actual content itself in dynamic content (e.g., dates and timestamps)

- `layoutRegions`, `strictRegions`, `dynamicRegions`, `contentRegions`, `floatingRegions`
    - Visually checking a group of regions with a particular characteristic (layout, which regions to strictly test, dynamic regions, content, floating regions)

- `accessibilityRegions`
    - Visually checking that the main header on a page is of type `LargeText`

- `fully`
    - Visually checking that an entire page does not change

**5. In the Eyes Test Manager (Applitools Dashboard) explore the commands to accept/reject a baseline. What changes have you noticed in the test results?**

- When I accept a baseline, Eyes finds all similar tests and automatically accepts the baseline for those tests
- When I reject a baseline/checkpoint image, Eyes remembers the decision and automatically rejects the checkpoint image on subsequent test runs so that I do not need to review them again