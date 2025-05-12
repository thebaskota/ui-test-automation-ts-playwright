// src/tests/elements.page.spec.ts
import { test, expect } from '@playwright/test';
import { DemoQAPage } from '../pages/demoqa.page';
import { ElementsPage } from '../pages/elements.page';
import { TextBoxPage } from '../pages/textbox.page';
import { handleTestFailure } from '../utils/helpers';

test.describe('Elements Page Tests', () => {
  let elementsPage: ElementsPage;
  let demoQAPage: DemoQAPage;
  let textBoxPage: TextBoxPage

  test.beforeEach(async ({ page }) => {
    demoQAPage = new DemoQAPage(page);
    await demoQAPage.navigate();
    await demoQAPage.verifyPageLoaded();
    await demoQAPage.navigateToElements();
    elementsPage = new ElementsPage(page);
    await elementsPage.verifyPageLoaded();
  });

  test.afterEach(async ({ page }, testInfo) => {
    await handleTestFailure(page, testInfo, elementsPage.getPageName());
  });

  test('should verify Elements page loads with key elements @regression', async () => {
    await expect(elementsPage.textBoxMenuItem).toBeVisible();
    await expect(elementsPage.checkBoxMenuItem).toBeVisible();
  });

  test('should navigate to Text Box page from Elements page @smoke', async ({ page }) => {
    textBoxPage = await elementsPage.navigateToTextBox();
    await textBoxPage.verifyPageLoaded();

  });
});
