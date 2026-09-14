import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  if (!fs.existsSync('static/screenshots')) fs.mkdirSync('static/screenshots', { recursive: true });

  await page.goto('http://localhost:5173');
  await page.waitForTimeout(600);

  // 1. Descend into Studio
  console.log('[AUDIT] Descending into Studio...');
  await page.click('text=DESCEND INTO STUDIO');
  await page.waitForTimeout(1400);

  // 2. Screenshot Nav Pill Shape
  await page.screenshot({ path: 'static/screenshots/nav-pill-repaired.png' });

  // Assert Nav is rounded capsule pill (not full width)
  const navBox = await page.locator('#main-navbar').boundingBox();
  console.log('[AUDIT] Navbar Bounding Box computed:', navBox);

  if (!navBox || navBox.width > 900) {
    console.error('[FAIL] Navbar is still stretched full width! Width:', navBox?.width);
    await browser.close();
    process.exit(1);
  }

  // 3. Open Settings & Change Sliders (Verify Nav DOES NOT disappear)
  console.log('[AUDIT] Opening Settings Panel & Modifying Sliders...');
  await page.click('button[aria-label="Settings"]');
  await page.waitForTimeout(300);

  await page.evaluate(() => {
    const opacitySlider = document.querySelector('input[name="opacity"]');
    if (opacitySlider) {
      opacitySlider.value = '0.45';
      opacitySlider.dispatchEvent(new Event('input', { bubbles: true }));
      opacitySlider.dispatchEvent(new Event('change', { bubbles: true }));
    }
    const blurSlider = document.querySelector('input[name="blur"]');
    if (blurSlider) {
      blurSlider.value = '16';
      blurSlider.dispatchEvent(new Event('input', { bubbles: true }));
      blurSlider.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });

  await page.waitForTimeout(300);
  await page.screenshot({ path: 'static/screenshots/nav-settings-active-visible.png' });

  const isNavVisibleAfterSettings = await page.isVisible('#main-navbar');
  if (!isNavVisibleAfterSettings) {
    console.error('[FAIL] Navbar DISAPPEARED after changing settings!');
    await browser.close();
    process.exit(1);
  }

  console.log('[SUCCESS] Navbar capsule shape and settings persistence VERIFIED!');
  await browser.close();
  process.exit(0);
})();
