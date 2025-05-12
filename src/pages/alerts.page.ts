// src/pages/alerts.page.ts
import { Page } from '@playwright/test';
import { BasePage } from './base/base.page';

export class AlertsPage extends BasePage {
    protected readonly PAGE_URL = '/alerts';
    protected readonly PAGE_NAME = 'Alerts';

    // Locator getters
    get alertButton() { return this.page.locator('#alertButton'); }
    get confirmButton() { return this.page.locator('#confirmButton'); }
    get promptButton() { return this.page.locator('#promptButton'); }

    constructor(page: Page) {
        super(page);
    }

    // Page verification required by BasePage
    async verifyPageLoaded(): Promise<void> {
        await this.waitForPageLoad();  // Ensure the page is fully loaded before any checks
        await this.verifyPageUrl();
        await this.verifyElementVisible(this.alertButton);
        await this.verifyElementVisible(this.confirmButton);
        await this.verifyElementVisible(this.promptButton);
    }

    // Actions for this page
    async triggerAlert(): Promise<void> {
        await this.alertButton.click();
    }

    async triggerConfirm(): Promise<void> {
        await this.confirmButton.click();
    }

    async triggerPrompt(): Promise<void> {
        await this.promptButton.click();
    }
}
