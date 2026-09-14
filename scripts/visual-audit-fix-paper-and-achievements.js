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

    // 1. Audit Skills Paper Zoom
    console.log('[AUDIT] Testing Skills Paper Zoom...');
    await page.click('button:has-text("Skills")', { force: true });
    await page.waitForTimeout(600);
    await page.click('#paper-sheet-left');
    await page.waitForTimeout(600);

    const isPaperZoomVisible = await page.isVisible('#zoomed-paper-card');
    console.log('[AUDIT] Zoomed Paper Card Visible:', isPaperZoomVisible);
    if (!isPaperZoomVisible) {
      throw new Error('[FAIL] Skills paper zoom overlay failed to display!');
    }

    // Close zoom
    await page.click('text=← BACK TO DESK');
    await page.waitForTimeout(400);

    // 2. Audit Achievements Wall (No side cards)
    console.log('[AUDIT] Testing Achievements Wall...');
    await page.click('button:has-text("Achievements")', { force: true });
    await page.waitForTimeout(800);

    const sideCardsCount = await page.evaluate(() => {
      return document.querySelectorAll('.translate-x-\\[60\\%\\], .-translate-x-\\[60\\%\\], .translate-x-\\[55\\%\\], .-translate-x-\\[55\\%\\]').length;
    });

    console.log('[AUDIT] Achievements Side Peek Cards Count:', sideCardsCount);
    if (sideCardsCount > 0) {
      throw new Error('[FAIL] Side peek cards still present on Achievements wall!');
    }

    console.log('[SUCCESS] Clean Achievements wall and un-frozen Skills paper zoom VERIFIED!');
    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error('[ERROR]', err);
    await browser.close();
    process.exit(1);
  }
})();
