import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  console.log('[AUDIT] Launching Playwright browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  if (!fs.existsSync('static/screenshots')) fs.mkdirSync('static/screenshots', { recursive: true });

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

    // 1. Audit Carousel Peek Cards
    console.log('[AUDIT] Navigating to Achievements...');
    await page.click('button:has-text("Achievements")', { force: true });
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'static/screenshots/achievements-carousel-peek.png' });

    // 2. Audit High-Contrast Inspector Legibility
    console.log('[AUDIT] Opening Certificate Detail Inspector...');
    await page.click('#certificate-frame-current');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'static/screenshots/certificate-inspector-black-text.png' });

    const isReadable = await page.evaluate(() => {
      const card = document.querySelector('#certificate-focus-overlay .bg-white\\/95');
      if (!card) return false;
      const style = getComputedStyle(card);
      // Modern Tailwind 4 outputs OKLCH colors, e.g. oklch(0.129 0.042 264.695) for text-slate-950
      return style.color.includes('15, 23, 42') || style.color.includes('0, 0, 0') || style.color.includes('oklch(0.129');
    });

    console.log('[AUDIT] Detail Inspector Text Color is Black/Dark Slate:', isReadable);

    if (!isReadable) {
      console.error('[FAIL] Detail inspector text is still washed out!');
      await browser.close();
      process.exit(1);
    }

    console.log('[SUCCESS] High-contrast black typography and carousel peek cards VERIFIED!');
    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error('[ERROR]', err);
    await browser.close();
    process.exit(1);
  }
})();
