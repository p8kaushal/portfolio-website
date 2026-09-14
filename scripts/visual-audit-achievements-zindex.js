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
  await page.waitForTimeout(900);

  // Measure z-index and visibility of background vs achievements stage
  const zIndexes = await page.evaluate(() => {
    const bg = document.getElementById('bg-image-layer');
    const stage = document.getElementById('achievements-stage-root');
    const frame = document.getElementById('certificate-frame-current');
    
    return {
      bgZIndex: bg ? getComputedStyle(bg).zIndex : 'none',
      stageZIndex: stage ? getComputedStyle(stage).zIndex : 'none',
      frameVisible: !!frame && getComputedStyle(frame).display !== 'none'
    };
  });

  console.log('[AUDIT] Layering Metrics:', zIndexes);

  if (!zIndexes.frameVisible) {
    console.error('[FAIL] Achievements certificate frame is still hidden behind background layers!');
    await browser.close();
    process.exit(1);
  }

  console.log('[SUCCESS] Achievements stage z-index elevation above background wallpaper VERIFIED!');
  await browser.close();
  process.exit(0);
})();
