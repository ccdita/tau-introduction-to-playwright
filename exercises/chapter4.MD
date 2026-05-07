# Introduction to Playwright

## Chapter 4 - Exercises

**1. Revisit the previous tests you implemented and add visual testing via Applitools to them. How much that increased the test runtime?**

Adding visual testing via Applitools to the Playwright Search test (`x-x-search.spec.ts`) increased the test runtime by about 17 seconds.

**2. Add visual testing via Playwright to the [example2.spec.ts](/tests/example2.spec.ts) file. What differences have you noticed from Applitools?**

Visual testing via Playwright is more selective in that you must specify the elements you want to assert. Conversely, visual testing via Applitools captures any visual differences between the current page state and the baseline depending on the `eyes.check()` options used.

1. Run the [example3.spec.ts](/tests/example3.spec.ts) with the Ultra Fast Grid. How does it compare to the Classic Runner?

1. Explore other check settings. Can you list a few scenarios that each of them is most appropriate for?

1. In the Eyes Test Manager (Applitools Dashboard) explore the commands to accept/reject a baseline. What changes have you noticed in the test results?