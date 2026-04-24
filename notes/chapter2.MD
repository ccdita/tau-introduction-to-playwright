# Chapter 2

## Chapter 2.2 - The Test Runner and Your First Test

### Understanding `package.json` and test runner scripts
- `package.json` defines optional scripts and all versions of the dependencies used by the project

**Scripts**
- Examples of scripts, which are found in `package.json`

`"test:e2e": "npx playwright test tests/"`
- Instead of typing `npx playwright test tests/`, we can just run `npm run test:e2e` which does the same thing
- `tests/` defines the SPECIFIC folder to run against. `tests` without the `/` selects all folders that have the word "tests"

---

`"test:e2e:all": "npx playwright test tests --project=all-browsers-and-tests"`
- `--project` links to the defined `playwright.config.ts` file `project` (`all-browsers-and-tests`)
- `tests` runs for all folders that have the word "tests"

---

`"test:e2e:ci": "CI=1 npx playwright test --project=ci --shard=$CI_NODE_INDEX/$CI_NODE_TOTAL"`
- `CI=1` sets the CI environment variable, which is accessed in the `playwright.config.ts` file (`process.env.CI`)
- The CI environment variable can also be defined in a `.env` file
- `--project=ci` links to the project `ci` in `playwright.config.cs` (script will run on the CI)

---

`"test:e2e:dev": "npx playwright test tests-examples/ --project=chromium --headed --retries=0 --reporter=line"`
- `--project=chromium` links to the `chromium` project in `playwright.config.ts` (script will only run on Chromium)
- Parameters passed via the command line override `playwright.config.ts`:
    - `--headed` opens browser(s) when the script is run
    - `--retries=0` indicates no retries if a test fails
    - `--reporter=line` uses the line reporter

---

`"test:e2e:smoke": "npx playwright test tests-examples/ --grep @smoke --project=chromium"`
- `--grep @smoke` only runs tests with the `@smoke` tag

---

`"test:e2e:non-smoke": "npx playwright test tests-examples/ --grep-invert @smoke --project=firefox"`
- `--grep-invert @smoke` only runs tests without the `@smoke` tag


For more commands/info on running tests: https://playwright.dev/docs/running-tests


