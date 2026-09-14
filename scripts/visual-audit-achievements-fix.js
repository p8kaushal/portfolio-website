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

  // 1. Navigate from Home -> Achievements
  console.log('[AUDIT] Navigating Home -> Achievements...');
  await page.click('button:has-text("Achievements")');
  await page.waitForTimeout(900);
  await page.screenshot({ path: 'static/screenshots/achievements-from-home.png' });

  const isFrameVisible1 = await page.isVisible('#certificate-frame-current');
  console.log('[AUDIT] Certificate Frame Visible (From Home):', isFrameVisible1);

  // 2. Navigate Resume -> Achievements
  console.log('[AUDIT] Navigating Resume -> Achievements...');
  await page.click('button:has-text("Resume")');
  await page.waitForTimeout(600);
  await page.click('button:has-text("Achievements")');
  await page.waitForTimeout(900);
  await page.screenshot({ path: 'static/screenshots/achievements-from-resume.png' });

  const isFrameVisible2 = await page.isVisible('#certificate-frame-current');
  console.log('[AUDIT] Certificate Frame Visible (From Resume):', isFrameVisible2);

  if (!isFrameVisible1 || !isFrameVisible2) {
    console.error('[FAIL] Achievements certificate frame is missing or unmounted!');
    await browser.close();
    process.exit(1);
  }

  console.log('[SUCCESS] Achievements stage persistent mounting and certificate frame visibility VERIFIED!');
  await browser.close();
  process.exit(0);
})();
