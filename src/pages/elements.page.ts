// src/pages/elements.page.ts
import { Page } from '@playwright/test';
import { BasePage } from './base/base.page';
import { TextBoxPage } from './textbox.page';
import { RadioButtonPage } from './radiobutton.page';

export class ElementsPage extends BasePage {
    protected readonly PAGE_URL = '/elements';
    protected readonly PAGE_NAME = 'Elements';

    constructor(page: Page) {
        super(page);
    }

    // Locators
    get textBoxMenuItem() { return this.page.locator('li:has-text("Text Box")'); }
    get checkBoxMenuItem() { return this.page.locator('li:has-text("Check Box")'); }
    get radioButtonMenuItem() { return this.page.locator('li:has-text("Radio Button")'); }

    // Page verification
    async verifyPageLoaded(): Promise<void> {
        await this.waitForPageLoad();  // Ensure the page is fully loaded before any checks
        await this.verifyPageUrl();
        await this.verifyElementVisible(this.textBoxMenuItem);
    }

    // Navigation
    async navigateToTextBox(): Promise<TextBoxPage> {
        await this.textBoxMenuItem.click();
        return new TextBoxPage(this.page);
    }

    async navigateToRadioButton(): Promise<RadioButtonPage> {
        await this.radioButtonMenuItem.click();
        return new RadioButtonPage(this.page);
    }
}
