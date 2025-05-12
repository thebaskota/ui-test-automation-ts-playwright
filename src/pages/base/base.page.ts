// src/pages/base/base.page.ts
import { Page, Locator, expect } from '@playwright/test';
import { DemoQAUrls, LoadStates } from '../../config/urls';

export abstract class BasePage {
    protected readonly page: Page;
    protected abstract readonly PAGE_URL: string;
    protected abstract readonly PAGE_NAME: string;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Abstract method to verify that the page is loaded.
     * All subclasses must implement this.
     */
    abstract verifyPageLoaded(): Promise<void>;
    
    /**
     * Wait for the page to load based on the provided state.
     * @param state Load state: "load", "domcontentloaded", "networkidle", etc.
     */
    async waitForPageLoad(state: LoadStates = "load"): Promise<void> {
        try {
            await this.page.waitForLoadState(state);
        } catch (error) {
            console.error(`Error while waiting for load state ${state}: `, error);
        }
    }

    /**
     * Verifies that the current page URL matches the expected URL.
     */
    async verifyPageUrl(): Promise<void> {
        await expect(this.page).toHaveURL(new RegExp(this.PAGE_URL));
    }

    /**
     * Verifies that the page title matches the expected title.
     * @param expectedTitle The expected page title.
     */
    protected async verifyPageTitle(expectedTitle: string): Promise<void> {
        await expect(this.page).toHaveTitle(expectedTitle);
    }

    /**
     * Verifies that the element is visible on the page.
     * @param element The element locator to check visibility.
     */
    protected async verifyElementVisible(element: Locator): Promise<void> {
        await expect(element).toBeVisible();
    }
    
    /**
     * Navigates to the page URL and verifies the page URL matches the expected one.
     */
    async navigate(): Promise<void> {
        await this.page.goto(`${DemoQAUrls.BASE}${this.PAGE_URL}`);
        await this.verifyPageUrl();
    }

   public getPageName(): string {
        return this.PAGE_NAME;
    }
 
}
