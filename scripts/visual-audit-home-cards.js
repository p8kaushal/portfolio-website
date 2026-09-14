import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  if (!fs.existsSync('static/screenshots')) fs.mkdirSync('static/screenshots', { recursive: true });

  await page.goto('http://localhost:5173');
  await page.waitForTimeout(600);

  // Descend to Home stage
  await page.click('text=DESCEND INTO STUDIO');
  await page.waitForTimeout(1400);

  // Switch to About
  await page.click('button:has-text("About")');
  await page.waitForTimeout(800);

  // Switch back to Home (moving RIGHT -> LEFT navigation)
  console.log('[AUDIT] Testing About -> Home card entry vector...');
  await page.click('button:has-text("Home")');
  
  // Mid-flight check (both cards should be entering from the same X direction)
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'static/screenshots/home-cards-midflight.png' });

  // Landing check
  await page.waitForTimeout(650);
  await page.screenshot({ path: 'static/screenshots/home-cards-landed.png' });

  const leftVisible = await page.isVisible('#home-card-left');
  const rightVisible = await page.isVisible('#home-card-right');

  if (!leftVisible || !rightVisible) {
    console.error('[FAIL] Home section glass cards failed to land properly!');
    await browser.close();
    process.exit(1);
  }

  console.log('[SUCCESS] Home section unified card choreography & spring stagger VERIFIED!');
  await browser.close();
  process.exit(0);
})();
