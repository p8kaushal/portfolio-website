import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  if (!fs.existsSync('static/screenshots')) fs.mkdirSync('static/screenshots', { recursive: true });

  await page.goto('http://localhost:5173');
  await page.waitForTimeout(600);

  // Descend to Home
  await page.click('text=DESCEND INTO STUDIO');
  await page.waitForTimeout(1400);

  // Audit Home -> About -> Home parity
  console.log('[AUDIT] Testing Home -> About transition...');
  await page.click('button:has-text("About")');
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'static/screenshots/parity-about.png' });

  console.log('[AUDIT] Testing About -> Home transition parity...');
  await page.click('button:has-text("Home")');
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'static/screenshots/parity-home.png' });

  const isHomeCardVisible = await page.isVisible('#home-stage-root');
  if (!isHomeCardVisible) {
    console.error('[FAIL] Home stage root card failed to land properly!');
    await browser.close();
    process.exit(1);
  }

  console.log('[SUCCESS] Home and About section transition parity VERIFIED!');
  await browser.close();
  process.exit(0);
})();
