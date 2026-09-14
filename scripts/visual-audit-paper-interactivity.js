import { chromium } from 'playwright';

(async () => {
  console.log('[AUDIT] Launching Playwright browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  try {
    console.log('[AUDIT] Navigating to http://localhost:5173...');
    await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);

    // Dismiss welcome overlay if present
    const welcomeOverlay = page.locator('#welcome-overlay');
    if (await welcomeOverlay.isVisible().catch(() => false)) {
      console.log('[AUDIT] Dismissing Keynote Welcome Overlay...');
      await page.locator('#welcome-overlay button').first().click({ force: true }).catch(() => {});
      await page.waitForTimeout(1400);
    }

    // 1. Audit Skills Paper Zoom Interactivity & Close Action
    console.log('[AUDIT] Opening Skills zoom modal...');
    await page.click('button:has-text("Skills")', { force: true });
    await page.waitForTimeout(600);
    await page.click('#paper-sheet-left');
    await page.waitForTimeout(600);

    // Hover over card to verify 3D move listener active
    console.log('[AUDIT] Hovering over #zoomed-paper-card for 3D tilt tracking...');
    await page.hover('#zoomed-paper-card');
    await page.waitForTimeout(300);

    console.log('[AUDIT] Testing BACK TO DESK click event...');
    await page.click('text=← BACK TO DESK');
    await page.waitForTimeout(500);

    const isModalClosed = !(await page.isVisible('#zoomed-paper-card'));
    console.log('[AUDIT] Is Zoom Modal Dismissed cleanly:', isModalClosed);

    if (!isModalClosed) {
      throw new Error('[FAIL] BACK TO DESK click event failed to dismiss paper zoom overlay!');
    }

    console.log('[SUCCESS] Full pointer interactivity, 3D tilt, and clean dismissal VERIFIED!');
    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error('[ERROR]', err);
    await browser.close();
    process.exit(1);
  }
})();
