# Introduction to Playwright

## Chapter 5 - Exercises

**1. Make a few other tests fail and explore the reports. What new things have you observed?**

- Playwright will notify you when a test timeout exceeds the set duration (default duration is 30 seconds)
- Playwright shows the function implementation where the test failed
- Playwright shows the duration of individual test runtime

**2. Debug a test via VS Code Playwright extension and also via Playwright Inspector. What differences have you noticed? What is the best option in your opinion and why?**

Playwright extension:
- Playwright highlights the line of code relevant to where the test error occurred in the editor
- Playwright displays a tab indicating the type of error that occurred, pointing to the error source. When this tab is clicked, it extends to show more details about the error (e.g., expected vs. actual values) and the error call log. This tab also presents different options for handling the test failures, such as navigating between failures, toggling test history, clearing all results, opening the failure in Editor, and closing the failure to clear it
- In the Test Explorer, failed tests are marked with a red X. Beside these tests, there are options to fix the failure, run or debug the test, and turn on Continous Run
- Tests can be debugged live in the editor (clicking on any of the locators in the editor highlights them in the browser window)
- Breakpoints (red dots) can be added to specific lines of code
- Breakpoints allow you to track variables, watch variables of your choice, see the call stack and loaded scripts, and toggle breakpoints

Playwright Inspector:
- New windows open (browsers launch in headed mode) for Playwright Inspector and the browser wherein tests are taking place
- Playwright Inspector allows you to record, play, pause, or step through each action using the toolbar
- The current action is highlighted in the test code and matching elements are highlighted in the browser window
- The error source is highlighted in red, and details of the error are highlighted in red below the test code
- Playwright Inspector allows you to live edit and pick locators
- `await page.pause();` allows you to set specific breakpoints within the code

I think the VS Code Playwright extension is better in that it essentially has the same functionalities as Playwright Inspector, but contained within the editor. That way, I can manage tests in one place instead of having multiple windows open at once. The most notable difference between the two tools is that breakpoints in the Playwright extension give you much more information about the test execution state than breakpoints in Playwright Inspector do.

**3. Explore the option `await page.pause();` to debug a test. Is it helpful? How is that compared to the Playwright Inspector and VS Code extension?**

`await page.pause();` is helpful because it allows you to set specific breakpoints to pause at when debugging with Playwright Inspector. This option is similar to setting breakpoints with the VS Code extension, which is done by clicking on the red dot to the left of a line of code.

With the VS Code extension, breakpoints allow you to track variables, watch variables of your choice, see the call stack and loaded scripts, and toggle breakpoints. There are no options to view this information in Playwright Inspector.

**4. When running the tests in UI, activate the [watch mode](https://playwright.dev/docs/test-ui-mode#watch-mode) and update a few tests. What happens?**

Activating Watch Mode for a test/multiple tests reruns those tests when a change is made to the test code.