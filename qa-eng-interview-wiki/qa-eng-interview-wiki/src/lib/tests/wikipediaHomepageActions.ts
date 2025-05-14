import { Page, expect } from '@playwright/test';

/**
 * This test was generated using Ranger's test recording tool. The test is supposed to:
 * 1. Navigate to Wikipedia's homepage
 * 2. Assert there are less than 7,000,000 articles in English
 * 3. Assert the page's text gets smaller when the 'Small' text size option is selected
 * 4. Assert the page's text gets larger when the 'Large' text size option is selected
 * 5. Assert the page's text goes back to the default size when the 'Standard' text size option is selected
 *
 * Instructions: Run the test and ensure it performs all steps described above
 *
 * Good luck!
 */
export async function run(page: Page, params: {}) {



    /** STEP: Navigate to URL */
    await page.goto('https://en.wikipedia.org/wiki/Main_Page');

    /** STEP: Click the link to view the total number of articles in English */
    const totalArticlesLink = await page.getByTitle('Special:Statistics').first();
    await totalArticlesLink.click();

    //wait for page to load
    await page.waitForSelector('.mw-statistics-articles');

    //find text referring to # of articles
    const articleStatisticsNumber = await page.locator('.mw-statistics-articles').locator('.mw-statistics-numbers').textContent();

    //convert string to number and assertion
    const number = articleStatisticsNumber?.replaceAll(',', '');
    await console.log(number);
    await expect(Number(number)).toBeLessThan(7000000);

    //back to main page
    await page.goto('https://en.wikipedia.org/wiki/Main_Page');

    //wait until page loads
    await page.waitForSelector('#mp-upper');

    /** STEP: Select the 'Small' text size option in the appearance settings */
    const smallTextSizeOption = await page.locator('#skin-client-pref-vector-feature-custom-font-size-value-0');
    await smallTextSizeOption.click();
    await expect(page.locator('#mp-upper')).toHaveCSS('font-size', '14px');

    /** STEP: Click the 'Large' text size option to change the display size */
    const largeTextSizeOption = await page.locator('#skin-client-pref-vector-feature-custom-font-size-value-2');
    await largeTextSizeOption.click();
    await expect(page.locator('#mp-upper')).toHaveCSS('font-size', '20px');

    /** STEP: Click the 'Standard' text size option in the appearance settings */
    const standardTextSizeOption = await page.locator('#skin-client-pref-vector-feature-custom-font-size-value-1');
    await standardTextSizeOption.click();
    await expect(page.locator('#mp-upper')).toHaveCSS('font-size', '16px');

    await page.close();
}
