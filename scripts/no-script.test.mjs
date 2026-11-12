import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { portfolio } from '../src/content.js';

const baseURL = process.env.PORTFOLIO_URL || 'http://127.0.0.1:4173';

test('the portfolio and share metadata remain available without JavaScript', async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const response = await page.goto(baseURL, { waitUntil: 'load' });
    assert.equal(response.status(), 200);
    assert.equal(await page.getByRole('heading', { name: portfolio.name, exact: true }).count(), 1);
    for (const project of portfolio.projects) {
      assert.equal(await page.getByRole('link', { name: `View repository: ${project.title}` }).getAttribute('href'), project.githubUrl);
    }
    for (const section of ['Projects', 'Experience', 'Achievements', 'Skills', 'Contact']) {
      assert.equal(await page.getByRole('heading', { name: section, exact: true }).count(), 1);
    }
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://parthkaushal.in/');
    assert.equal(await page.locator('meta[property="og:image"]').getAttribute('content'), 'https://parthkaushal.in/social-preview.png');
    assert.equal((await page.request.get(`${baseURL}/social-preview.png`)).status(), 200);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  } finally {
    await browser.close();
  }
});
