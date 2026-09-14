import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  await page.goto('http://localhost:5173');
  await page.waitForTimeout(600);
  await page.click('text=DESCEND INTO STUDIO');
  await page.waitForTimeout(1400);

  // Switch to Achievements Stage
  console.log('[AUDIT] Navigating to Achievements stage...');
  await page.click('button:has-text("Achievements")');
  await page.waitForTimeout(700);

  const isStageRootVisible = await page.isVisible('#achievements-stage-root');
  const isFrameVisible = await page.isVisible('#certificate-frame-current');

  console.log(`[AUDIT] Achievements Stage Root Visible: ${isStageRootVisible} | Certificate Frame Visible: ${isFrameVisible}`);

  if (!isStageRootVisible || !isFrameVisible) {
    console.error('[FAIL] Achievements stage elements failed to mount or remain invisible!');
    await browser.close();
    process.exit(1);
  }

  console.log('[SUCCESS] Achievements Hall of Fame stage visibility & card mounting VERIFIED!');
  await browser.close();
  process.exit(0);
})();
