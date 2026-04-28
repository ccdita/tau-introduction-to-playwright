# Introduction to Playwright

## Chapter 2 - Exercises

**1. Change the number of workers on [playwright.config.ts](/playwright.config.ts) and see how it affects the tests run time. Use the command `npm run test:e2e:all` to run all the existing tests. Note that the number of workers will change too on the terminal. Suggestions: 1, 10, 100. What happens when you change it to 100?**

Increasing the number of workers speeds up the test execution time. 100 workers actually slows down test execution, possibly because of resource contention and excessive context switching.

**2. Change the reporter to 2 different options of your preference (mouse hover "reporter" to see the valid options). Besides the HTML, which ones could be useful for a project and why?**

- `list`: concise overview of all tests ran, with more detailed output about failures
- `line`: useful if the project has a large test suite because it only outputs details about failures
- `blob`: useful for tests running on multiple machines (; greater CPU utilization = faster test runtime) because it merges the reports from these shards
- `json`: outputs structured data which can be used to easily isolate root causes of failures
- `junit`: produces XML reports that can be used by CI/CD tools to visualize, analyze, and track test results, pass/fail rates, and execution times
- `github`: useful when a project's CI/CD pipeline is on GitHub actions because it surfaces test results directly on the GitHub Actions interface

**3. Change the value of trace for each option available and identify the differences between them. Note how the size of the folder changes for each option.**

- `off`: no files in `test-results`
- `on`: each test has its own folder in `test-results` containing a `trace.zip` file
- `retain-on-failure`: since all tests passed, there are no files in `test-results`
- `on-first-retry`: since all tests did not require any retries, there are no files in `test-results`
- `on-all-retries`: since all tests did not require any retries, there are no files in `test-results`

**4. Enable the video and check how it looks. Is it more useful than the trace in your opinion?**

No, the video is not more useful than the trace. The trace provides more information about the test results because it allows the user to "time-travel" through the test and navigate through each state. The video could be useful in cases where the user simply wants to watch the test in action and does not need further information like console logs or DOM snapshots to verify the test results.

**5. Create a new project on [playwright.config.ts](/playwright.config.ts), define a few unique settings and create a new script on [package.json](/package.json). Execute the new script. What useful params would make the test run even easier for you? Suggestion: Play with the different browsers and devices.**

- `--workers`: increases the number of workers to decrease test runtime
- `--project`: defines the project to run tests against
- `--reporter`: changes the type of reporter based on my preferences
- `--grep`: runs tagged tests against the defined project
- `--ui`: run tests in UI mode to visually watch tests as they run

**6. Create a new test file, describe a simple new test case and implement a new test. What other locators did you use besides `getByRole` and `getByText`. How about assertions, what other LocatorAssertions did you use besides `toBeVisible`, `toHaveURL` and `not.toBeVisible`?**

- Locators: `.locator()`
- LocatorAssertions: `toContainText()`, `toHaveClass()`

**7. Open the [demo-todo-app.spec.ts](/tests-examples/demo-todo-app.spec.ts) and add a .only to one of the describes, run the tests. Use the command `npm run test:e2e:all`. Did it work?**

Yes, adding a `.only` to the 'New Todo' describe ran all the tests within that describe.

**8. Still in the [demo-todo-app.spec.ts](/tests-examples/demo-todo-app.spec.ts) revert the .only and add a new tag to some of the tests/describes. Update the script `test:e2e:smoke` in [package.json](/package.json) to use the new tag. Did it work?**

Yes, adding the new `@tag` tag to some tests only ran those tests.