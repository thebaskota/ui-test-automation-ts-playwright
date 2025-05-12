// src/tests/radiobutton.page.spec.ts

import { test, expect } from '@playwright/test';
import { DemoQAPage } from '../pages/demoqa.page';
import { ElementsPage } from '../pages/elements.page';
import { RadioButtonPage } from '../pages/radiobutton.page';
import { handleTestFailure } from '../utils/helpers';

test.describe('Radio Button Page Tests', () => {
  let radioButtonPage: RadioButtonPage;
  let demoQAPage: DemoQAPage;
  let elementsPage: ElementsPage;

  test.beforeEach(async ({ page }) => {
    demoQAPage = new DemoQAPage(page);
    await demoQAPage.navigate();
    await demoQAPage.verifyPageLoaded();
    elementsPage = await demoQAPage.navigateToElements();
    await elementsPage.verifyPageLoaded();
    radioButtonPage = await elementsPage.navigateToRadioButton();
    await radioButtonPage.verifyPageLoaded();
  });

  test.afterEach(async ({ page }, testInfo) => {
    await handleTestFailure(page, testInfo, radioButtonPage.getPageName());
  });

  test('should select "Yes" radio button and show correct result @smoke', async () => {
    await radioButtonPage.selectYes();
    const result = await radioButtonPage.getSelectedResult();
    expect(result).toBe('Yes');
  });

  test('should select "Impressive" radio button and show correct result @regression', async () => {
    await radioButtonPage.selectImpressive();
    const result = await radioButtonPage.getSelectedResult();
    expect(result).toBe('Impressive');
  });

  test('should verify that "No" radio button is disabled @regression', async () => {
    const isDisabled = await radioButtonPage.isNoRadioDisabled();
    expect(isDisabled).toBe(true);
  });
});
