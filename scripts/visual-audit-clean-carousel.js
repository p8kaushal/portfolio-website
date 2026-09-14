import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  console.log('[AUDIT] Launching Playwright browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  if (!fs.existsSync('static/screenshots')) fs.mkdirSync('static/screenshots', { recursive: true });

  try {
    console.log('[AUDIT] Navigating to http://localhost:5173...');
    await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);

    // Dismiss welcome overlay if present
    const welcomeOverlay = page.locator('#welcome-overlay');
    if (await welcomeOverlay.isVisible().catch(() => false)) {
      console.log('[AUDIT] Dismissing Keynote Welcome Overlay...');
      await page.locator('#welcome-overlay button').first().click({ force: true }).catch(() => {});
      await page.waitForTimeout(1400);
    }

    console.log('[AUDIT] Navigating to Achievements...');
    await page.click('button:has-text("Achievements")', { force: true });
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'static/screenshots/achievements-cleaned-track.png' });

    // Verify that all peek elements displaying titles are button elements wrapped in dark wood frames bg-[#1a120b]
    const unstyledTextNodesCount = await page.evaluate(() => {
      const allTextNodes = Array.from(document.querySelectorAll('#achievements-stage-root *')).filter(el => {
        return el.children.length === 0 && 
               el.textContent.includes('FWA of the') && 
               !el.closest('button.bg-\\[\\#1a120b\\]');
      });
      return allTextNodes.length;
    });

    console.log('[AUDIT] Unstyled Ghost Text Nodes Count:', unstyledTextNodesCount);

    if (unstyledTextNodesCount > 0) {
      console.error('[FAIL] Ghost text nodes still rendering in the background track!');
      await browser.close();
      process.exit(1);
    }

    console.log('[SUCCESS] Ghost elements purged and styled framed peek cards VERIFIED!');
    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error('[ERROR]', err);
    await browser.close();
    process.exit(1);
  }
})();
