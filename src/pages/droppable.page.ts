// src/pages/droppable.page.ts
import { Page } from '@playwright/test';
import { BasePage } from './base/base.page';

export class DroppablePage extends BasePage {
    protected readonly PAGE_URL = '/droppable';
    protected readonly PAGE_NAME = 'Droppable';

    constructor(page: Page) {
        super(page);
    }

    // Locators
    get draggable() { return this.page.locator('#draggable'); }
    get dropTarget() { return this.page.locator('#simpleDropContainer #droppable'); }
    get dropText() { return this.page.locator('#simpleDropContainer #droppable p'); }

    // Page verification Required by BasePage
    async verifyPageLoaded(): Promise<void> {
        await this.waitForPageLoad();
        await this.verifyPageUrl();
        await this.verifyElementVisible(this.draggable);
        await this.verifyElementVisible(this.dropTarget);
    }

    // Actions
    async dragToTarget(): Promise<void> {
        await this.draggable.dragTo(this.dropTarget);
    }

    async verifyDropped(): Promise<boolean> {
        await this.dropText.waitFor();
        await this.dropTarget.waitFor();
        await this.dropText.scrollIntoViewIfNeeded();
        await this.verifyElementVisible(this.dropText);
        await this.page.waitForTimeout(500); // slight delay for UI update

        const dropTextHandle = await this.dropText.elementHandle();
        if (!dropTextHandle) return false;

        try {
            await this.page.waitForFunction(
                (el) => el.textContent?.includes('Dropped!'),
                dropTextHandle,
                { timeout: 1000 }
            );
            return true;
        } catch {
            return false;
        }
    }


}
