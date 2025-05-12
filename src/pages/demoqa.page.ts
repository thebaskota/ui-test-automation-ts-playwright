// src/pages/demoqa.page.ts
import { Page } from '@playwright/test';
import { BasePage } from './base/base.page';
import { ElementsPage } from './elements.page';
import { FormsPage } from './forms.page';
import { AlertsPage } from './alerts.page';
import { WidgetsPage } from './widgets.page';
import { InteractionsPage } from './interactions.page';

export class DemoQAPage extends BasePage {
    protected readonly PAGE_URL = '';
    protected readonly PAGE_NAME = 'DemoQA Landing';

    // Locator getters
    get banner() { return this.page.locator('div.home-banner'); }
    get elementsCard() { return this.page.locator('div.card:has-text("Elements")'); }
    get formsCard() { return this.page.locator('div.card:has-text("Forms")'); }
    get alertsCard() { return this.page.locator('div.card:has-text("Alerts")'); }
    get widgetsCard() { return this.page.locator('div.card:has-text("Widgets")'); }
    get interactionsCard() { return this.page.locator('div.card:has-text("Interactions")'); }

    constructor(page: Page) {
        super(page);
    }

    // Page verification Required by BasePage
    async verifyPageLoaded(): Promise<void> {
        await this.waitForPageLoad();  // Ensure the page is fully loaded before any checks
        await this.verifyPageUrl();
        await this.verifyElementVisible(this.banner);
        await this.verifyElementVisible(this.elementsCard);
    }

    // Navigation methods
    async navigateToElements(): Promise<ElementsPage> {
        await this.elementsCard.click();
        await this.waitForPageLoad('networkidle');
        return new ElementsPage(this.page);
    }

    async navigateToForms(): Promise<FormsPage> {
        await this.formsCard.click();
        await this.waitForPageLoad('networkidle');
        return new FormsPage(this.page);
    }

    async navigateToAlerts(): Promise<AlertsPage> {
        await this.alertsCard.click();
        await this.waitForPageLoad('networkidle');
        return new AlertsPage(this.page);
    }

    async navigateToWidgets(): Promise<WidgetsPage> {
        await this.widgetsCard.click();
        await this.waitForPageLoad('networkidle');
        return new WidgetsPage(this.page);
    }

    async navigateToInteractions(): Promise<InteractionsPage> {
        await this.interactionsCard.click();
        await this.waitForPageLoad('networkidle');
        return new InteractionsPage(this.page);
    }

    // Page verification
    async verifypageLoaded(): Promise<void> {
        await this.verifyPageUrl();
        await this.verifyElementVisible(this.banner);
        await this.verifyElementVisible(this.elementsCard);
    }

    // Common actions
    async clickAllCategoryCards(): Promise<void> {
        const cards = [
            this.elementsCard,
            this.formsCard,
            this.alertsCard,
            this.widgetsCard,
            this.interactionsCard
        ];

        for (const card of cards) {
            await card.click();
            await this.page.goBack();
        }
    }
}