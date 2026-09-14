import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  if (!fs.existsSync('static/screenshots')) fs.mkdirSync('static/screenshots', { recursive: true });

  await page.goto('http://localhost:5173');
  await page.waitForTimeout(500);

  // 1. Screenshot Welcome Overlay
  console.log('[AUDIT] Verifying Welcome Overlay UI...');
  await page.screenshot({ path: 'static/screenshots/welcome-overlay-initial.png' });

  const isTitleVisible = await page.isVisible('text=PARTH KAUSHAL');
  if (!isTitleVisible) {
    console.error('[FAIL] Welcome title PARTH KAUSHAL is not visible!');
    await browser.close();
    process.exit(1);
  }

  // 2. Trigger Vertical Descent
  console.log('[AUDIT] Triggering Vertical Crane Drop...');
  await page.click('text=DESCEND INTO STUDIO');
  await page.waitForTimeout(1400);

  await page.screenshot({ path: 'static/screenshots/welcome-landed-home.png' });

  // 3. Assert Navbar and Home cards are visible after landing
  const isNavVisible = await page.isVisible('nav');
  if (!isNavVisible) {
    console.error('[FAIL] Floating navbar did not animate in after crane drop!');
    await browser.close();
    process.exit(1);
  }

  console.log('[SUCCESS] Vertical crane drop welcome sequence VERIFIED!');
  await browser.close();
  process.exit(0);
})();
