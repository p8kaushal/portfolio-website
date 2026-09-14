import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  await page.goto('http://localhost:5173');
  await page.waitForTimeout(600);
  await page.click('text=DESCEND INTO STUDIO');
  await page.waitForTimeout(1400);

  console.log('[AUDIT] Testing Home -> About card animation...');
  await page.click('button:has-text("About")');
  await page.waitForTimeout(550); // Check during active card spring entrance

  const isAnimating = await page.evaluate(() => {
    const card = document.querySelector('.floating-glass-card');
    if (!card) return false;
    const style = getComputedStyle(card);
    return style.transform !== 'none' || parseFloat(style.opacity) < 1;
  });

  if (!isAnimating) {
    console.error('[FAIL] Floating glass card animation is not firing on tab switch!');
    await browser.close();
    process.exit(1);
  }

  console.log('[SUCCESS] Spatial card entrance animation successfully restored!');
  await browser.close();
  process.exit(0);
})();
