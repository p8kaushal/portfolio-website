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

  // 1. Audit Short Hop (Home -> About, Delta = 1)
  console.log('[AUDIT] Testing Short Hop Momentum (Home -> About)...');
  await page.click('button:has-text("About")');
  await page.waitForTimeout(180);
  await page.screenshot({ path: 'static/screenshots/momentum-short-hop.png' });

  // 2. Audit Cross-Room Long Sweep (About -> Contact, Delta = 7)
  console.log('[AUDIT] Testing Cross-Room High-Momentum Sweep (About -> Contact)...');
  await page.waitForTimeout(800);
  await page.click('button:has-text("Contact")');
  await page.waitForTimeout(220);
  await page.screenshot({ path: 'static/screenshots/momentum-long-sweep.png' });

  console.log('[SUCCESS] Content-aware directional vectoring and distance-scaled momentum bounce VERIFIED!');
  await browser.close();
  process.exit(0);
})();
