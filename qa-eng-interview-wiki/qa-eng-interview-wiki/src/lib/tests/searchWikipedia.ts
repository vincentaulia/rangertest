import { Page, devices, expect } from '@playwright/test';

/**
 * This test was generated using Ranger's test recording tool. The test is supposed to:
 * 1. Navigate to Wikipedia
 * 2. Go to the "Artificial intelligence" page
 * 3. Click "View history"
 * 4. Assert that the latest edit was made by the user "Worstbull"
 *
 * Instructions:
 * - Run the test and ensure it performs all steps described above
 * - Add assertions to the test to ensure it validates the expected
 *   behavior:
 *   - If the latest edit was not made by "Worstbull" update the steps above accordingly
 *   - Write your assertion to provide clear diagnostic feedback if it fails
 *
 * Good luck!
 */
export async function run(page: Page, params: {}) {
    /** STEP: Navigate to URL */
    await page.goto('https://www.wikipedia.org/');

    /** STEP: Enter text 'art' into the search input field */
    const searchInputField = page.locator('#searchInput');
    await searchInputField.fill('artificial');

    /** STEP: Click the 'Artificial Intelligence' link in the search suggestions */
    const artificialIntelligenceLink = page.locator('a[href="https://en.wikipedia.org/wiki/Artificial_intelligence"]')
    await artificialIntelligenceLink.click();

    // waits for the View History Button to be available
    await page.waitForSelector('#ca-history');

    // clicks the view history Button
    const viewHistoryButton = page.locator('#ca-history')
    await viewHistoryButton.click()

    // find the first (newest) item in the unordered list history
    const latestChange = page.locator('#pagehistory').locator('//ul/li').first()
    await expect(latestChange, 'username of latest history edit is as expected.').toContainText('Maxeto0910');

    await page.close()

}
