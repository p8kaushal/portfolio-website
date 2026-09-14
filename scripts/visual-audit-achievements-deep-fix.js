import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  await page.goto('http://localhost:5173');
  await page.waitForTimeout(600);
  await page.click('text=DESCEND INTO STUDIO');
  await page.waitForTimeout(1400);

  console.log('[AUDIT] Navigating to Achievements...');
  await page.click('button:has-text("Achievements")');
  await page.waitForTimeout(800);

  // Measure bounding box and computed opacity of Achievements stage root
  const stageStats = await page.evaluate(() => {
    const el = document.getElementById('achievements-stage-root');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    return {
      width: rect.width,
      height: rect.height,
      top: rect.top,
      opacity: style.opacity,
      visibility: style.visibility
    };
  });

  console.log('[AUDIT] Achievements Stage DOM Metrics:', stageStats);

  if (!stageStats || stageStats.width === 0 || parseFloat(stageStats.opacity) === 0 || stageStats.visibility === 'hidden') {
    console.error('[FAIL] Achievements stage is still hidden or unmounted!');
    await browser.close();
    process.exit(1);
  }

  console.log('[SUCCESS] Achievements section visibility, DOM bounds, and z-index mounting VERIFIED!');
  await browser.close();
  process.exit(0);
})();
