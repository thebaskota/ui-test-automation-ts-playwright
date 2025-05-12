// src/pages/radiobutton.page.ts
import { Page } from '@playwright/test';
import { BasePage } from './base/base.page';

export class RadioButtonPage extends BasePage {
    protected readonly PAGE_URL = '/radio-button';
    protected readonly PAGE_NAME = 'Radio Button';

    constructor(page: Page) {
        super(page);
    }

    // Locators
    get yesRadio() { return this.page.locator('label[for="yesRadio"]'); }
    get impressiveRadio() { return this.page.locator('label[for="impressiveRadio"]'); }
    get noRadio() { return this.page.locator('#noRadio'); }
    get resultText() { return this.page.locator('.text-success'); }

    // Page verification required by BasePage
    async verifyPageLoaded(): Promise<void> {
        await this.waitForPageLoad();
        await this.verifyPageUrl();
        await this.verifyElementVisible(this.yesRadio);
    }

    // Actions
    async selectYes(): Promise<void> {
        await this.yesRadio.click();
    }

    async selectImpressive(): Promise<void> {
        await this.impressiveRadio.click();
    }

    async isNoRadioDisabled(): Promise<boolean> {
        return await this.noRadio.isDisabled();
    }

    async getSelectedResult(): Promise<string> {
        return await this.resultText.textContent() || '';
    }
}
