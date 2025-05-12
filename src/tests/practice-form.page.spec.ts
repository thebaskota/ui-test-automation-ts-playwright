// src/tests/practice-form.page.spec.ts
import { test, expect } from '@playwright/test';
import { DemoQAPage } from '../pages/demoqa.page';
import { FormsPage } from '../pages/forms.page';
import { PracticeFormPage } from '../pages/practice-form.page';
import { DemoQAData } from '../testdata/demoqa.data';
import { handleTestFailure } from '../utils/helpers';

test.describe('Practice Form Page Tests', () => {
    let practiceFormPage: PracticeFormPage;
    let formsPage: FormsPage;
    let demoQAPage: DemoQAPage;

    test.beforeEach(async ({ page }) => {
        demoQAPage = new DemoQAPage(page);
        await demoQAPage.navigate();
        formsPage = await demoQAPage.navigateToForms();
        await formsPage.verifyPageLoaded();
        practiceFormPage = await formsPage.navigateToPracticeForm();
        await practiceFormPage.verifyPageLoaded();
    });

    test.afterEach(async ({ page }, testInfo) => {
        await handleTestFailure(page, testInfo, practiceFormPage.getPageName());
    });

    test('should submit full form and show confirmation modal @smoke', async () => {
        const { name, email } = DemoQAData.users.standard;
        const phone = DemoQAData.forms.validPhone;
        const lastName = DemoQAData.forms.validLastName;
        const gender = DemoQAData.forms.gender; 

        await practiceFormPage.fillForm(name, lastName, email, phone, gender);
        await practiceFormPage.submitForm();

        await expect(practiceFormPage.confirmationModal).toBeVisible();
    });

    test('should show error when required field (phone) is missing @regression', async () => {
        const name = DemoQAData.forms.validFirstName;
        const email = DemoQAData.users.standard.email;
        const lastName = DemoQAData.forms.validLastName;
        const phone = DemoQAData.forms.invalidPhone;
        const gender = DemoQAData.forms.gender;

        await practiceFormPage.fillForm(name, lastName, email, phone, gender);
        await practiceFormPage.submitForm();

        await expect(practiceFormPage.mobileNumberInput.evaluate(el => !(el as HTMLInputElement).checkValidity())).resolves.toBe(true);
        await expect(practiceFormPage.confirmationModal).not.toBeVisible();
    });

    test('should show error on incorrect email format @regression', async () => {
        const name = DemoQAData.forms.validFirstName;
        const invalidEmail = DemoQAData.users.incorrect.email;
        const phone = DemoQAData.forms.validPhone;
        const lastName = DemoQAData.forms.validLastName;
        const gender = DemoQAData.forms.gender;

        await practiceFormPage.fillForm(name, lastName, invalidEmail, phone, gender);
        await practiceFormPage.submitForm();

        await expect(practiceFormPage.emailInput.evaluate(el => !(el as HTMLInputElement).checkValidity())).resolves.toBe(true);
        await expect(practiceFormPage.confirmationModal).not.toBeVisible();
    });
});
