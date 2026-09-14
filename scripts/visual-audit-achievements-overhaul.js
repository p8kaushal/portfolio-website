import { chromium } from 'playwright';

(async () => {
  console.log('[AUDIT] Launching Playwright browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  try {
    console.log('[AUDIT] Navigating to http://localhost:5173...');
    await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Dismiss welcome overlay if present
    const enterBtn = page.locator('button:has-text("ENTER STUDIO"), button:has-text("EXPLORE STUDIO"), button:has-text("ENTER")');
    if (await enterBtn.first().isVisible().catch(() => false)) {
      console.log('[AUDIT] Dismissing Keynote Welcome Overlay...');
      await enterBtn.first().click();
      await page.waitForTimeout(1500);
    } else {
      const welcomeOverlay = page.locator('#welcome-overlay');
      if (await welcomeOverlay.isVisible().catch(() => false)) {
        console.log('[AUDIT] Clicking welcome overlay button directly...');
        await page.locator('#welcome-overlay button').first().click({ force: true }).catch(() => {});
        await page.waitForTimeout(1500);
      }
    }

    // Navigate to achievements section
    console.log('[AUDIT] Clicking Achievements nav button...');
    const achievementsNav = page.locator('button:has-text("Achievements")');
    await achievementsNav.click({ force: true });
    await page.waitForTimeout(1200);

    // Verify header text HONORS & CERTIFICATIONS is completely absent
    const headerText = page.locator('text=HONORS & CERTIFICATIONS');
    const headerVisible = await headerText.isVisible().catch(() => false);
    if (headerVisible) {
      throw new Error('[FAIL] HONORS & CERTIFICATIONS header text is still visible on stage!');
    }
    console.log('[PASS] Header text HONORS & CERTIFICATIONS confirmed removed.');

    // Verify stage root is visible
    const stageRoot = page.locator('#achievements-stage-root');
    await stageRoot.waitFor({ state: 'visible', timeout: 5000 });
    console.log('[PASS] #achievements-stage-root is visible.');

    // Verify carousel cycling with next arrow
    const initialTitle = await page.locator('#certificate-frame-current h3').innerText();
    console.log(`[AUDIT] Initial Certificate Title: "${initialTitle}"`);

    const nextBtn = page.locator('button[aria-label="Next Certificate"]');
    await nextBtn.click();
    await page.waitForTimeout(800);

    const nextTitle = await page.locator('#certificate-frame-current h3').innerText();
    console.log(`[AUDIT] Next Certificate Title: "${nextTitle}"`);

    if (initialTitle === nextTitle) {
      throw new Error('[FAIL] Carousel did not cycle to next certificate upon arrow click!');
    }
    console.log('[PASS] Carousel cycling with arrow controls verified.');

    // Verify certificate click opens focus overlay modal
    console.log('[AUDIT] Clicking certificate card to trigger 3D inspection mode...');
    const certCard = page.locator('#certificate-frame-current');
    await certCard.click();
    await page.waitForTimeout(800);

    const focusOverlay = page.locator('#certificate-focus-overlay');
    await focusOverlay.waitFor({ state: 'visible', timeout: 5000 });
    console.log('[PASS] #certificate-focus-overlay opened and visible.');

    // Verify zoomed certificate sheet inside overlay
    const zoomedSheet = page.locator('#zoomed-certificate-sheet');
    await zoomedSheet.waitFor({ state: 'visible', timeout: 3000 });
    console.log('[PASS] #zoomed-certificate-sheet rendered inside focus overlay.');

    // Close focus overlay
    const closeBtn = page.locator('button:has-text("BACK TO WALL")');
    await closeBtn.click();
    await page.waitForTimeout(600);

    const isOverlayClosed = !(await focusOverlay.isVisible());
    if (!isOverlayClosed) {
      throw new Error('[FAIL] #certificate-focus-overlay did not close on BACK TO WALL click!');
    }
    console.log('[PASS] Focus overlay closed successfully.');

    console.log('[SUCCESS] All Achievements Wall & Certificate Focus requirements passed visual & functional audit!');
  } catch (err) {
    console.error('[ERROR]', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
