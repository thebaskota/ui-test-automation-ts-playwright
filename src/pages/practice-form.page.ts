// src/pages/practice-form.page.ts
import { Page } from '@playwright/test';
import { BasePage } from './base/base.page';

export class PracticeFormPage extends BasePage {
    protected readonly PAGE_URL = '/automation-practice-form';
    protected readonly PAGE_NAME = 'Practice Form';

    constructor(page: Page) {
        super(page);
    }

    // Locators
    get header() { return this.page.locator('.practice-form-wrapper h5'); }
    get firstNameInput() { return this.page.locator('#firstName'); }
    get lastNameInput() { return this.page.locator('#lastName'); }
    get emailInput() { return this.page.locator('#userEmail'); }
    get genderRadioMale() { return this.page.locator('label[for="gender-radio-1"]'); }
    get genderRadioFemale() { return this.page.locator('label[for="gender-radio-2"]'); }
    get mobileNumberInput() { return this.page.locator('#userNumber'); }
    get submitButton() { return this.page.locator('#submit'); }
    get confirmationModal() { return this.page.locator('#example-modal-sizes-title-lg'); }

    // Page verification Required by BasePage
    async verifyPageLoaded(): Promise<void> {
        await this.waitForPageLoad();  // Ensure the page is fully loaded before any checks
        await this.verifyPageUrl();
        await this.verifyElementVisible(this.firstNameInput);
        await this.verifyElementVisible(this.submitButton);
    }

    // Actions
    async fillForm(firstName: string, lastName: string, email: string, phone: string, gender: string = 'Male'): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        
        // Select gender based on the provided value
        if (gender.toLowerCase() === 'male') {
            await this.genderRadioMale.click();
        } else if (gender.toLowerCase() === 'female') {
            await this.genderRadioFemale.click();
        } else {
            throw new Error(`Unsupported gender: ${gender}`);
        }
        
        await this.mobileNumberInput.fill(phone);
    }

    async submitForm(): Promise<void> {
        await this.submitButton.click();
    }

    async verifySubmission(): Promise<void> {
        await this.verifyElementVisible(this.confirmationModal);
    }
}
