// src/utils/helpers.ts
import { Page, TestInfo } from '@playwright/test';
import path from 'path';

export async function handleTestFailure(
  page: Page,
  testInfo: TestInfo,
  pageName: string
): Promise<void> {
  if (testInfo.status !== testInfo.expectedStatus) {
    const screenshotName = `${pageName}_${testInfo.title.replace(/\s+/g, '_')}.png`;
    const screenshotPath = path.join(testInfo.outputDir, screenshotName);

    await page.screenshot({ path: screenshotPath, fullPage: true });

    // Attach screenshot to report
    await testInfo.attach('Failure Screenshot', {
      path: screenshotPath,
      contentType: 'image/png',
    });
  }
}
