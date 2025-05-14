import { test, Browser } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const wikipediaUsername = process.env.WIKIPEDIA_USERNAME;
const wikipediaPassword = process.env.WIKIPEDIA_PASSWORD;

const authFile = 'src/auth/login.json';

/**
 * Manually create a Wikipedia account and then finish this test
 * so that it signs into Wikipedia and captures the logged-in
 * session to src/auth/login.json, so that the tests in all.test.ts
 * run as a signed in user.
 */
test('Sign in to Wikipedia', async ({ page }) => {
    if (!wikipediaUsername || !wikipediaPassword) {
        throw new Error(`Need a username and password to sign in!`);
    }

    await page.goto('https://en.wikipedia.org/w/index.php?title=Special:UserLogin');

    await page.fill('#wpName1', wikipediaUsername);
    await page.fill('#wpPassword1', wikipediaPassword);
    await page.click('#wpLoginAttempt');


    // Wait for login confirmation
    await page.waitForSelector('#p-vector-user-menu-userpage');

    // Save session state
    await page.context().storageState({ path: authFile });

    await page.close();

});
