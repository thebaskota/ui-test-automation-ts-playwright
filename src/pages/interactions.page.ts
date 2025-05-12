// src/pages/interactions.page.ts
import { Page } from '@playwright/test';
import { BasePage } from './base/base.page';
import { DroppablePage } from './droppable.page';

export class InteractionsPage extends BasePage {
    protected readonly PAGE_URL = '/interaction';
    protected readonly PAGE_NAME = 'interaction';

    constructor(page: Page) {
        super(page);
    }

    // Locators
    get droppableMenuItem() { return this.page.locator('li:has-text("Droppable")'); }

    // page verification
    async verifyPageLoaded(): Promise<void> {
        await this.waitForPageLoad();  // Ensure the page is fully loaded before any checks
        await this.verifyPageUrl();
        await this.verifyElementVisible(this.droppableMenuItem);
    }

    // Navigation
    async navigateToDroppable(): Promise<DroppablePage> {
        await this.droppableMenuItem.click();
        return new DroppablePage(this.page);
    }
}
