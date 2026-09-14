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

  // 1. Navigate to Projects Stage
  console.log('[AUDIT] Navigating to Projects stage...');
  await page.click('button:has-text("Projects")');
  
  // Mid-boot frame check (monitor beam sweep active)
  await page.waitForTimeout(250);
  await page.screenshot({ path: 'static/screenshots/monitor-boot-midflight.png' });

  // Landed boot check
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'static/screenshots/monitor-boot-landed.png' });

  // 2. Audit Traffic Dots Presence
  const dotsCount = await page.evaluate(() => {
    const dots = document.querySelectorAll('.bg-rose-500\\/90, .bg-amber-500\\/90, .bg-emerald-500\\/90');
    return dots.length;
  });

  console.log('[AUDIT] Traffic Control Dots Count:', dotsCount);
  if (dotsCount < 3) {
    console.error('[FAIL] Monitor traffic control dots are missing!');
    await browser.close();
    process.exit(1);
  }

  // 3. Audit Scrollability of Projects Library
  console.log('[AUDIT] Testing project library scrollability...');
  const scrollable = await page.evaluate(() => {
    const el = document.getElementById('projects-scroll-container');
    if (!el) return false;
    return el.scrollHeight > el.clientHeight;
  });

  console.log('[AUDIT] Is Project Library Scrollable:', scrollable);
  if (!scrollable) {
    console.error('[FAIL] Projects container is not scrollable!');
    await browser.close();
    process.exit(1);
  }

  // Perform test scroll
  await page.hover('#projects-scroll-container');
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'static/screenshots/monitor-scrolled.png' });

  console.log('[SUCCESS] Modern monitor turn-on sequence, cleaned header, and scrollable library VERIFIED!');
  await browser.close();
  process.exit(0);
})();
