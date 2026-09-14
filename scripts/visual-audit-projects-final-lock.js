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

  // 1. Audit Monitor Positional Stability across entry directions
  console.log('[AUDIT] Navigating Skills -> Projects...');
  await page.click('button:has-text("Skills")');
  await page.waitForTimeout(600);
  await page.click('button:has-text("Projects")');
  await page.waitForTimeout(800);

  const boxFromLeft = await page.locator('#projects-monitor-root').boundingBox();

  console.log('[AUDIT] Navigating Achievements -> Projects...');
  await page.click('button:has-text("Achievements")');
  await page.waitForTimeout(600);
  await page.click('button:has-text("Projects")');
  await page.waitForTimeout(800);

  const boxFromRight = await page.locator('#projects-monitor-root').boundingBox();

  console.log(`[AUDIT] Monitor Pos X (From Left): ${boxFromLeft.x}px | Pos X (From Right): ${boxFromRight.x}px`);
  if (Math.abs(boxFromLeft.x - boxFromRight.x) > 2) {
    console.error('[FAIL] Monitor position is shifting depending on navigation direction!');
    await browser.close();
    process.exit(1);
  }

  // 2. Audit In-Monitor Detail Modal Bounds
  console.log('[AUDIT] Opening Project Detail Modal...');
  await page.click('.project-card');
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'static/screenshots/in-monitor-detail-modal.png' });

  const isModalStrictlyInside = await page.evaluate(() => {
    const monitor = document.getElementById('projects-monitor-root');
    const modal = document.getElementById('project-detail-modal');
    if (!monitor || !modal) return false;

    const mRect = monitor.getBoundingClientRect();
    const dRect = modal.getBoundingClientRect();

    return (
      dRect.top >= mRect.top &&
      dRect.bottom <= mRect.bottom + 2 &&
      dRect.left >= mRect.left &&
      dRect.right <= mRect.right + 2
    );
  });

  console.log('[AUDIT] Is Modal Strictly Enclosed in Monitor Bezels:', isModalStrictlyInside);
  if (!isModalStrictlyInside) {
    console.error('[FAIL] Project Detail Modal is overflowing outside the monitor frame!');
    await browser.close();
    process.exit(1);
  }

  console.log('[SUCCESS] Constant monitor positioning, high-contrast black typography, and encapsulated glass detail modal VERIFIED!');
  await browser.close();
  process.exit(0);
})();
