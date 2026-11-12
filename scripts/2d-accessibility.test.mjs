import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const baseURL = process.env.PORTFOLIO_URL || 'http://127.0.0.1:4173';

test('2D dialogs contain keyboard focus and restore it when dismissed', async () => {
  const browser = await chromium.launch();
  try {
    for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
      const page = await browser.newPage({ viewport });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(`${baseURL}/2d/index.html`, { waitUntil: 'networkidle' });
      assert.equal(await page.evaluate(() => document.activeElement.id), 'start');
      await page.keyboard.press('Tab');
      assert.equal(await page.evaluate(() => document.activeElement.id), 'start');
      await page.keyboard.press('Enter');
      const phone = page.locator('#phoneBtn');
      await phone.focus();
      await page.keyboard.press('Enter');
      assert.equal(await page.locator('#panel').getAttribute('role'), 'dialog');
      assert.equal(await page.locator('#panel').getAttribute('aria-modal'), 'true');
      assert.equal(await page.evaluate(() => document.activeElement.className), 'close');
      await page.keyboard.press('Shift+Tab');
      assert.equal(await page.evaluate(() => document.activeElement.getAttribute('data-app')), 'Socials');
      await page.keyboard.press('Escape');
      assert.equal(await phone.evaluate(element => element === document.activeElement), true);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      assert.deepEqual(errors, []);
      await page.close();
    }
  } finally {
    await browser.close();
  }
});
