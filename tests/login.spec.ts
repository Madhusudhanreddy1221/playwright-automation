import { test, expect } from '@playwright/test';

test.describe('Login Functionality', () => {

  // This runs before EVERY test in this block
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
  });

  test('Test case 1: Positive LogIn test', async ({ page }) => {
    await page.getByLabel('Username').fill('student');
    await page.getByLabel('Password').fill('Password123');
    await page.getByRole('button', { name: 'Submit' }).click();

    // Verify URL
    await expect(page).toHaveURL(/logged-in-successfully/);
    
    // Verify Expected Text
    const message = page.locator('text=Congratulations');
    await expect(message).toBeVisible();

    // Verify Logout button
    const logoutBtn = page.getByRole('link', { name: 'Log out' });
    await expect(logoutBtn).toBeVisible();
  });

  test('Test case 2: Negative username test', async ({ page }) => {
    await page.getByLabel('Username').fill('incorrectUser');
    await page.getByLabel('Password').fill('Password123');
    await page.getByRole('link', { name: 'Submit' }).click();

    // Verify error message is displayed
    const errorMsg = page.locator('#error'); // Common ID for errors on this site
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toHaveText('Your username is invalid!');
  });

  test('Test case 3: Negative password test', async ({ page }) => {
    await page.getByLabel('Username').fill('student');
    await page.getByLabel('Password').fill('incorrectPassword');
    await page.getByRole('button', { name: 'Submit' }).click();

    // Verify error message is displayed and text matches
    const errorMsg = page.locator('#error');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toHaveText('Your password is invalid!');
  });

});