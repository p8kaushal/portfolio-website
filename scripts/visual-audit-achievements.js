import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  if (!fs.existsSync('static/screenshots')) fs.mkdirSync('static/screenshots');

  await page.goto('http://localhost:5173');
  await page.waitForTimeout(600);
  await page.click('text=DESCEND INTO STUDIO');
  await page.waitForTimeout(1400);

  // 1. Audit Navigation to Achievements Wall
  console.log('[AUDIT] Navigating to Achievements stage...');
  await page.click('button:has-text("Achievements")');
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'static/screenshots/achievements-hall-of-fame.png' });

  // 2. Audit Autoplay Carousel Tick
  const initialTitle = await page.innerText('#certificate-frame-current h3');
  console.log(`[AUDIT] Initial Certificate Title: "${initialTitle}"`);

  console.log('[AUDIT] Waiting 5 seconds for autoplay slide transition...');
  await page.waitForTimeout(5000);

  const nextTitle = await page.innerText('#certificate-frame-current h3');
  console.log(`[AUDIT] Autoplay Certificate Title: "${nextTitle}"`);

  if (initialTitle === nextTitle) {
    console.error('[FAIL] Achievements autoplay carousel failed to advance automatically!');
    await browser.close();
    process.exit(1);
  }

  // 3. Audit Certificate Selection & Detail Modal Punch-In
  console.log('[AUDIT] Clicking certificate frame to trigger detail modal...');
  await page.click('#certificate-frame-current');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'static/screenshots/certificate-detail-modal.png' });

  const isModalVisible = await page.isVisible('#certificate-detail-modal');
  if (!isModalVisible) {
    console.error('[FAIL] Certificate detail modal failed to open on selection!');
    await browser.close();
    process.exit(1);
  }

  console.log('[SUCCESS] Hall of Fame certificate frames, autoplay carousel, and detail inspection modal VERIFIED!');
  await browser.close();
  process.exit(0);
})();
