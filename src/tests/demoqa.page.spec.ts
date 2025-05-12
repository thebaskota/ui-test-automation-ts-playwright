// src/tests/demoqa.page.spec.ts
import { test, expect } from '@playwright/test';
import { DemoQAUrls } from '../config/urls';
import { DemoQAPage } from '../pages/demoqa.page';
import { handleTestFailure } from '../utils/helpers';

test.describe('DemoQA Landing Page Tests', () => {
    let demoQAPage: DemoQAPage;

    test.beforeEach(async ({ page }) => {
        demoQAPage = new DemoQAPage(page);

        await test.step('Navigate to DemoQA homepage', async () => {
            await demoQAPage.navigate();
            await demoQAPage.verifyPageLoaded();
        });
    });

    test.afterEach(async ({ page }, testInfo) => {
        await handleTestFailure(page, testInfo, demoQAPage.getPageName());
    });

    test('Verify homepage loads correctly with all main elements @smoke', async () => {
        await test.step('Verify page title and URL', async () => {
            await expect(demoQAPage['page']).toHaveTitle('DEMOQA');
            await expect(demoQAPage['page']).toHaveURL(DemoQAUrls.BASE);
        });

        await test.step('Verify all category cards are visible', async () => {
            const cards = [
                demoQAPage.elementsCard,
                demoQAPage.formsCard,
                demoQAPage.alertsCard,
                demoQAPage.widgetsCard,
                demoQAPage.interactionsCard,
            ];

            for (const card of cards) {
                await expect(card).toBeVisible();
            }
        });
    });

    test('Verify navigation from category cards to sub-pages @regression', async () => {
        const navigationTests = [
            { name: 'Elements', navigate: () => demoQAPage.navigateToElements() },
            { name: 'Forms', navigate: () => demoQAPage.navigateToForms() },
            { name: 'Widgets', navigate: () => demoQAPage.navigateToWidgets() },
        ];

        for (const { name, navigate } of navigationTests) {
            await test.step(`Navigate to ${name} page and verify header`, async () => {
                const targetPage = await navigate();
                await targetPage.verifyPageLoaded();

                await demoQAPage.navigate(); // Navigate back to the homepage
                await demoQAPage.verifyPageLoaded();
                
            });
        }
    });
});
