import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  if (!fs.existsSync('static/screenshots')) fs.mkdirSync('static/screenshots', { recursive: true });

  await page.goto('http://localhost:5173');
  await page.waitForTimeout(600);

  console.log('[AUDIT] Clicking DESCEND INTO STUDIO...');
  await page.click('text=DESCEND INTO STUDIO');

  // Check mid-descent frame (t = 650ms)
  await page.waitForTimeout(650);
  await page.screenshot({ path: 'static/screenshots/navbar-mid-descent.png' });

  const isNavVisibleMidDescent = await page.evaluate(() => {
    const nav = document.getElementById('main-navbar');
    if (!nav) return false;
    const style = getComputedStyle(nav);
    return parseFloat(style.opacity) > 0.3;
  });

  console.log('[AUDIT] Navbar Opacity Mid-Descent:', isNavVisibleMidDescent);

  if (!isNavVisibleMidDescent) {
    console.error('[FAIL] Navbar is still hidden during descent!');
    await browser.close();
    process.exit(1);
  }

  // Check final landed state
  await page.waitForTimeout(700);
  await page.screenshot({ path: 'static/screenshots/navbar-landed-home.png' });

  console.log('[SUCCESS] Navbar descent synchronization VERIFIED!');
  await browser.close();
  process.exit(0);
})();
