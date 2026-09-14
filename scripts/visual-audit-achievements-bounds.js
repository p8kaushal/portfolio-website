import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  await page.goto('http://localhost:5173');
  await page.waitForTimeout(600);
  await page.click('text=DESCEND INTO STUDIO');
  await page.waitForTimeout(1400);

  console.log('[AUDIT] Navigating to Achievements stage...');
  await page.click('button:has-text("Achievements")');
  await page.waitForTimeout(900);

  const box = await page.locator('#certificate-frame-current').boundingBox();
  console.log('[AUDIT] Certificate Frame Bounding Box:', box);

  if (!box || box.width === 0 || box.height === 0) {
    console.error('[FAIL] Certificate frame is missing or collapsed!');
    await browser.close();
    process.exit(1);
  }

  console.log('[SUCCESS] Achievements stage bounding box and physical frame visibility VERIFIED!');
  await browser.close();
  process.exit(0);
})();
