// src/pages/textbox.page.ts
import { Page } from '@playwright/test';
import { BasePage } from './base/base.page';

export class TextBoxPage extends BasePage {
    protected readonly PAGE_URL = '/text-box';
    protected readonly PAGE_NAME = 'Text Box';

    constructor(page: Page) {
        super(page);
    }

    // Locators
    get fullNameInput() { return this.page.locator('#userName'); }
    get emailInput() { return this.page.locator('#userEmail'); }
    get submitButton() { return this.page.locator('#submit'); }
    get output() { return this.page.locator('#output'); }

    // Page verification Required by BasePage
    async verifyPageLoaded(): Promise<void> {
        await this.waitForPageLoad();  // Ensure the page is fully loaded before any checks
        await this.verifyPageUrl();
        await this.verifyElementVisible(this.fullNameInput);
        await this.verifyElementVisible(this.submitButton);
    }

    // Actions
    async fillForm(name: string, email: string): Promise<void> {
        await this.fullNameInput.fill(name);
        await this.emailInput.fill(email);
    }

    async submitForm(): Promise<void> {
        await this.submitButton.click();
    }

    async verifySubmissionVisible(): Promise<void> {
        await this.verifyElementVisible(this.output);
    }
}
