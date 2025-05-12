// src/pages/widgets.page.ts
import { Page } from '@playwright/test';
import { BasePage } from './base/base.page';

export class WidgetsPage extends BasePage {
    protected readonly PAGE_URL = '/widgets';
    protected readonly PAGE_NAME = 'Widgets';

    constructor(page: Page) {
        super(page);
    }

    // Locators
    get accordianMenuItem() { return this.page.locator('li:has-text("Accordian")'); }

    // Optional: Add navigation or verification methods as needed
    async verifyPageLoaded(): Promise<void> {
        await this.waitForPageLoad();  // Ensure the page is fully loaded before any checks
        await this.verifyPageUrl();
        await this.verifyElementVisible(this.accordianMenuItem);
    }
}
