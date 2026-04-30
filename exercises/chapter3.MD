# Introduction to Playwright

## Chapter 3 - Exercises

**1. Delete the file top-menu-page.ts and try to recreate it. What did you learn?**

I learned the following:
- It was helpful to first look at the test file, `example2.spec.ts`, that used `top-menu-page.ts`. From the test file, I was able to identify what methods and variables `top-menu-page.ts` needed.
- Declare all relevant elements and URLs in the variables section, then assign them uisng locators in the constructor.
- Avoid locating elements in the methods. The methods should take the elements (which should have been located and assigned in the constructor) and apply actions and assertions to them.

1. Describe and implement a scenario for the search using page object models. Make sure you fill the search with a term and use the keyboard arrows to select one of the results. 

1. Describe and implement a scenario where you need to use the beforeAll. What did you use it for?

1. Describe and implement a scenario where you need to use the afterAll. What did you use it for?

1. Describe and implement a scenario where you need to use the afterEach. What did you use it for?

1. Explore few of the methods of the testInfo. Which one did you find more interesting?