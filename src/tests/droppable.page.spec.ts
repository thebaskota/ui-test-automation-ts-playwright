// src/tests/droppable.page.spec.ts
import { test, expect } from '@playwright/test';
import { DemoQAPage } from '../pages/demoqa.page';
import { InteractionsPage } from '../pages/interactions.page';
import { DroppablePage } from '../pages/droppable.page';
import { handleTestFailure } from '../utils/helpers';

test.describe('Droppable Page Tests', () => {
  let droppablePage: DroppablePage;
  let demoQAPage: DemoQAPage;
  let interactionsPage: InteractionsPage;

  test.beforeEach(async ({ page }) => {
    demoQAPage = new DemoQAPage(page);
    await demoQAPage.navigate();
    await demoQAPage.verifyPageLoaded();
    interactionsPage = await demoQAPage.navigateToInteractions();
    await interactionsPage.verifyPageLoaded();
    droppablePage = await interactionsPage.navigateToDroppable();
    await droppablePage.verifyPageLoaded();
  });

  test.afterEach(async ({ page }, testInfo) => {
    await handleTestFailure(page, testInfo, droppablePage.getPageName());
  });

  test('should allow draggable element to be dropped and show confirmation @smoke', async () => {
    await droppablePage.dragToTarget();
    const isDropped = await droppablePage.verifyDropped();
    expect(isDropped).toBe(true);
  });
});
