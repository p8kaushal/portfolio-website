import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  if (!fs.existsSync('static/screenshots')) fs.mkdirSync('static/screenshots', { recursive: true });

  await page.goto('http://localhost:5173');
  await page.waitForTimeout(600); // Startup animation

  // 1. Initial Glass Card Screenshot
  await page.screenshot({ path: 'static/screenshots/welcome-interactive-initial.png' });

  // 2. Simulate Cursor Hover & Parallax Tilt
  console.log('[AUDIT] Simulating cursor movement across welcome glass card...');
  await page.mouse.move(1400, 300); // Move cursor to top right
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'static/screenshots/welcome-interactive-tilted.png' });

  // Assert 3D transform is inline on #welcome-glass-card
  const transformStyle = await page.evaluate(() => {
    const card = document.getElementById('welcome-glass-card');
    return card ? card.style.transform : '';
  });
  console.log('[AUDIT] Welcome card tilt transform computed:', transformStyle);

  if (!transformStyle || !transformStyle.includes('rotate')) {
    console.error('[FAIL] Interactive cursor 3D tilt is missing or not updating!');
    await browser.close();
    process.exit(1);
  }

  // 3. Test Transition Hand-off
  console.log('[AUDIT] Triggering Descend button...');
  await page.click('text=DESCEND INTO STUDIO');
  await page.waitForTimeout(1400);

  const isNavVisible = await page.isVisible('nav');
  if (!isNavVisible) {
    console.error('[FAIL] Navbar did not mount after welcome descent!');
    await browser.close();
    process.exit(1);
  }

  console.log('[SUCCESS] Interactive welcome glass stage & cursor reactivity VERIFIED!');
  await browser.close();
  process.exit(0);
})();
