# README for Running Playwright UI Tests

## Overview

This repository contains UI tests using Playwright, written in TypeScript. The tests are designed to run on various pages of the DemoQA site, verifying the functionality and correctness of UI elements. This README will guide you through the steps to get started with the project, run the tests, and view the results.

---

## Prerequisites

Before running the tests, you need to ensure you have the following tools installed and set up:

1. **Node.js**: Make sure you have Node.js installed on your system. You can verify this by running:

   ```bash
   node --version
   ```

   If Node.js is not installed, download it from the official [Node.js website](https://nodejs.org/) and install it.

2. **Git**: You need Git to clone the repository. Verify if you have Git installed by running:

   ```bash
   git --version
   ```

   If Git is not installed, download it from the official [Git website](https://git-scm.com/) and install it.

---

## Setting Up the Project

Follow these steps to set up the project on your local machine:

1. **Clone the Repository**:

   Open your terminal and clone the GitHub repository to your local machine:

   ```bash
   git clone https://github.com/thebaskota/ui-test-automation-ts-playwright.git
   ```


2. **Navigate to the Project Folder**:

   Change to the project directory:

   ```bash
   cd ui-test-automation-ts-playwright
   ```

3. **Install Dependencies**:

   Run the following command to install all required dependencies:

   ```bash
   npm install
   ```

   This will install Playwright, TypeScript, and other necessary development dependencies.

---

## Running the Tests

Once you have set up the project and installed the dependencies, you can run the tests.

### 1. **Running the Tests in Headless Mode (Default)**

To run the tests without opening the browser UI, use the following command:

```bash
npm test
```

This command will execute the tests in headless mode (no browser UI) and generate an HTML report of the results.

### 2. **Running the Tests in Headed Mode (With Browser UI)**

If you want to run the tests while seeing the browser UI (useful for debugging), use the following command:

```bash
npm run test:headed
```

This will open the browser during the test execution and show the UI while tests run. It also generates an HTML report.

### 3. **Viewing the Test Report**

Once the tests have finished running, you can view the detailed test report. Use the following command to open the report:

```bash
npm run report
```

This will open the HTML report generated after the test run. You can view test results, logs, and screenshots if any failures occurred.

---

## Directory Structure

Here is a basic overview of the directory structure:

```
/ts-playwright-ui-test
|-- /node_modules            # Dependencies installed by npm
|-- /src                     # Source code for pages and tests
|   |-- /pages               # Page object models for each page (e.g., PracticeFormPage, DemoQAPage)
|   |-- /testdata            # Test data used in the tests
|   |-- /tests               # Test scripts (e.g., practice-form.page.spec.ts)
|-- /screenshots             # Screenshots captured during test failures
|-- /reports                 # Playwright HTML report (generated after test run)
|-- package.json             # Project metadata and dependencies
|-- tsconfig.json            # TypeScript configuration
|-- README.md                # This file
```

---

## Test Data

The tests make use of test data defined in `src/testdata/demoqa.data.ts`. You can update this file with different user data or form input data to test various scenarios. The test data includes:

* **Standard User Data**: For successful form submissions.
* **Invalid Data**: For testing failure scenarios, like incorrect email or missing required fields.

Example test data structure:

```ts
export const DemoQAData = {
    users: {
        standard: {
            name: 'Pradip Baskota',
            email: 'pradip@test.com'
        },
        empty: {
            name: '',
            email: ''
        },
        incorrect: {
            name: '',
            email: 'pradip@test'
        }
    },
    forms: {
        validFirstName: 'Pradip',
        validPhone: '1234567890',
        invalidPhone: '',
        gender: 'Male'
    }
};
```

---

## Modifying the Tests

If you need to modify the test steps or add new ones, you can update the test files located in the `src/tests` directory. The tests are based on the Page Object Model (POM) design, which makes it easy to maintain and extend.

For example, to add a new test for form submission, you would:

1. Create or modify a test file in `src/tests`.
2. Import the relevant page classes from `src/pages`.
3. Use the page objects to interact with the page and assert the expected outcomes.

---

## Troubleshooting

If you encounter any issues running the tests, consider the following:

* **Playwright Installation Issues**: Ensure that all dependencies are installed properly by running `npm install` again.

* **Browser Issues**: If the tests are failing due to browser issues, you may need to update your browser dependencies by running:

  ```bash
  npx playwright install
  ```

  This will ensure that all supported browsers (Chromium, Firefox, and WebKit) are installed.

* **Test Failures**: If a test fails, check the HTML report generated in the `/reports` folder. Playwright also saves screenshots of failed tests in the `/screenshots` folder.

---

## Conclusion

This README has covered how to set up the project, run the tests, and view the results. If you need to modify the tests or add new ones, follow the Page Object Model (POM) structure for easy test maintenance.
