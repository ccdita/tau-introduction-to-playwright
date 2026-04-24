# Introduction to Playwright

## Chapter 1 - Exercises

**1. Take a look at the 2 test files that were created [example.spec.ts](/tests/example.spec.ts) and [demo-todo-app.spec.ts](/tests-examples/demo-todo-app.spec.ts) and get familiar with the terminology used there. Maybe use the Search available on the [Website](https://playwright.dev/docs/intro) to learn more about the commands.**

**2. Run the tests using the UI Mode and also the command line. What differences do you see?**

UI Mode:
- Launched using `npx playwright test --ui`
- GUI for real-time interaction
- Time travel debugging
- Watch Mode grants ability to automatically re-run specific tests whenever changes to code are saved
- Built-in Trace Viewer that displays network requests, console logs, DOM snapshots in the window
- Locator Picker for hovering over page elements and generating locators

Command Line:
- Executed using `npx playwright test`
- Text-based for speed
- Headless by default (no visible browser window)
- Flexible filtering with flags to quickly customize test runs without manually clicking through a menu

**3. Take a look at the other existing files (listed below) and try to identify their function in the project:**
- [.gitignore](/.gitignore): Specifies which intentionally untracked files should be ignored by Git
- [package-lock.json](/package-lock.json): Locks the exact version of every dependency and sub-dependency in a Node.js project to ensure consistency across environments
- [playwright.config.ts](/playwright.config.ts): Defines how tests are executed, reported, and managed.