import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  await page.goto('http://localhost:5173');
  await page.waitForTimeout(600);
  await page.click('text=DESCEND INTO STUDIO');
  await page.waitForTimeout(1400);

  // Switch to Projects Stage
  console.log('[AUDIT] Navigating to Projects stage...');
  await page.click('button:has-text("Projects")');
  await page.waitForTimeout(700);

  const isMonitorVisible = await page.isVisible('#projects-monitor-root');
  const cardCount = await page.evaluate(() => document.querySelectorAll('.project-card').length);

  console.log(`[AUDIT] Monitor Visible: ${isMonitorVisible} | Rendered Project Cards: ${cardCount}`);

  if (!isMonitorVisible || cardCount === 0) {
    console.error('[FAIL] Projects Studio Monitor failed to mount or render cards!');
    await browser.close();
    process.exit(1);
  }

  console.log('[SUCCESS] Projects section visibility & card mounting VERIFIED!');
  await browser.close();
  process.exit(0);
})();
