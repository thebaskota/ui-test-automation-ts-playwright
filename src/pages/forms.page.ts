// src/pages/forms.page.ts
import { Page } from '@playwright/test';
import { BasePage } from './base/base.page';
import { PracticeFormPage } from './practice-form.page';

export class FormsPage extends BasePage {
    protected readonly PAGE_URL = '/forms';
    protected readonly PAGE_NAME = 'Forms';

    constructor(page: Page) {
        super(page);
    }

    // Locators
    get practiceFormMenuItem() { return this.page.locator('li:has-text("Practice Form")'); }

    // Navigation
    async navigateToPracticeForm(): Promise<PracticeFormPage> {
        await this.practiceFormMenuItem.click();
        return new PracticeFormPage(this.page);
    }

    // Page verification
    async verifyPageLoaded(): Promise<void> {
        await this.waitForPageLoad();  // Ensure the page is fully loaded before any checks
        await this.verifyPageUrl();
        await this.verifyElementVisible(this.practiceFormMenuItem);
    }
}
