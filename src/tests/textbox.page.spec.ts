// src/tests/textbox.page.spec.ts

import { test, expect } from '@playwright/test';
import { DemoQAPage } from '../pages/demoqa.page';
import { ElementsPage } from '../pages/elements.page';
import { TextBoxPage } from '../pages/textbox.page';
import { DemoQAData } from '../testdata/demoqa.data';
import { handleTestFailure } from '../utils/helpers';

test.describe('Text Box Page Tests', () => {
  let textBoxPage: TextBoxPage;
  let demoQAPage: DemoQAPage;
  let elementsPage: ElementsPage;

  test.beforeEach(async ({ page }) => {
    demoQAPage = new DemoQAPage(page);
    await demoQAPage.navigate();
    await demoQAPage.verifyPageLoaded();
    elementsPage = await demoQAPage.navigateToElements();
    await elementsPage.verifyPageLoaded();
    textBoxPage = await elementsPage.navigateToTextBox();
    await textBoxPage.verifyPageLoaded();
  });

  test.afterEach(async ({ page }, testInfo) => {
    await handleTestFailure(page, testInfo, textBoxPage.getPageName());
  });

  test('should submit form and show output with entered values @smoke', async () => {
    const { name, email } = DemoQAData.users.standard;

    await textBoxPage.fillForm(name, email);
    await textBoxPage.submitForm();

    await expect(textBoxPage.output).toBeVisible();
    await expect(textBoxPage.output).toContainText(name);
    await expect(textBoxPage.output).toContainText(email);
  });

  test('should get an error when email is incorrect @regression', async () => {
    const nameOnly = DemoQAData.users.standard.name;
    const incorrectEmail = DemoQAData.users.incorrect.email;

    await textBoxPage.fillForm(nameOnly, incorrectEmail);
    await textBoxPage.submitForm();

    // Output section should NOT appear
    await expect(textBoxPage.output).toBeHidden();

    // Optional: check red border or invalid class on email field
    await expect(textBoxPage.emailInput).toHaveClass(/.*field-error.*/);
  });
});
