import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  if (!fs.existsSync('static/screenshots')) fs.mkdirSync('static/screenshots', { recursive: true });

  await page.goto('http://localhost:5173');
  await page.waitForTimeout(600);

  console.log('[AUDIT] Descending into Studio...');
  await page.click('text=DESCEND INTO STUDIO');
  await page.waitForTimeout(1400);

  // 1. Calculate Navbar Centering Accuracy
  const navBox = await page.locator('#main-navbar').boundingBox();
  const viewportWidth = 1920;

  console.log('[AUDIT] Computed Nav Box:', navBox);

  if (!navBox) {
    console.error('[FAIL] Navbar DOM element not found!');
    await browser.close();
    process.exit(1);
  }

  const navCenterX = navBox.x + (navBox.width / 2);
  const expectedCenterX = viewportWidth / 2;
  const offsetDiff = Math.abs(navCenterX - expectedCenterX);

  console.log(`[AUDIT] Nav Center X: ${navCenterX}px | Expected Center: ${expectedCenterX}px | Diff: ${offsetDiff}px`);

  // Assert navbar is centered within 5px margin of error
  if (offsetDiff > 5) {
    console.error(`[FAIL] Navbar is NOT centered horizontally! Offset difference is ${offsetDiff}px`);
    await browser.close();
    process.exit(1);
  }

  await page.screenshot({ path: 'static/screenshots/nav-perfectly-centered.png' });
  console.log('[SUCCESS] Navbar horizontal viewport centering VERIFIED!');
  await browser.close();
  process.exit(0);
})();
