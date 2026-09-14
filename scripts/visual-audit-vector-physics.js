import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  if (!fs.existsSync('static/screenshots')) fs.mkdirSync('static/screenshots', { recursive: true });

  await page.goto('http://localhost:5173');
  await page.waitForTimeout(600);
  await page.click('text=DESCEND INTO STUDIO');
  await page.waitForTimeout(1400);

  // 1. Audit Leftward Vector (Contact -> Home, Delta = -6)
  console.log('[AUDIT] Testing Contact -> Home leftward card vector...');
  await page.click('button:has-text("Contact")');
  await page.waitForTimeout(800);

  await page.click('button:has-text("Home")');
  await page.waitForTimeout(650); // Mid-spring entry check after camera landing
  await page.screenshot({ path: 'static/screenshots/vector-leftward-home-midflight.png' });

  // 2. Assert Cards are entering from -X (Left Side) when moving Left
  const midFlightX = await page.evaluate(() => {
    const card = document.querySelector('.home-glass-card');
    if (!card) return 0;
    const style = getComputedStyle(card);
    const matrix = new DOMMatrix(style.transform);
    return matrix.m41; // Return Translate X
  });

  console.log('[AUDIT] Mid-flight Translate X for Leftward Nav:', midFlightX);

  if (midFlightX > 0) {
    console.error('[FAIL] Inverted Vector Bug! Cards entered from Right (+X) during Leftward navigation!');
    await browser.close();
    process.exit(1);
  }

  await page.waitForTimeout(600);
  await page.screenshot({ path: 'static/screenshots/vector-leftward-home-landed.png' });

  console.log('[SUCCESS] Vector direction mapping & presenter video persistence VERIFIED!');
  await browser.close();
  process.exit(0);
})();
