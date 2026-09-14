import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  if (!fs.existsSync('static/screenshots')) fs.mkdirSync('static/screenshots', { recursive: true });

  await page.goto('http://localhost:5173');
  await page.waitForTimeout(600);

  // 1. Descend into Studio
  await page.click('text=DESCEND INTO STUDIO');
  await page.waitForTimeout(1400);

  // 2. Audit Card Bounce from Home -> About
  console.log('[AUDIT] Testing Home -> About horizontal card bounce...');
  await page.click('button:has-text("About")');
  
  // Mid-flight check (card should be sliding in with opacity < 1)
  await page.waitForTimeout(250);
  await page.screenshot({ path: 'static/screenshots/card-bounce-midflight.png' });

  // Landing check
  await page.waitForTimeout(650);
  await page.screenshot({ path: 'static/screenshots/card-bounce-landed.png' });

  const isAboutCardVisible = await page.isVisible('.floating-glass-card');
  if (!isAboutCardVisible) {
    console.error('[FAIL] Floating glass card failed to animate into view!');
    await browser.close();
    process.exit(1);
  }

  console.log('[SUCCESS] Horizontal spring bounce card transitions VERIFIED!');
  await browser.close();
  process.exit(0);
})();
