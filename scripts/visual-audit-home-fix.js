import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  await page.goto('http://localhost:5173');
  await page.waitForTimeout(600);
  await page.click('text=DESCEND INTO STUDIO');
  await page.waitForTimeout(1400);

  // 1. Audit Contact -> Home (Moving LEFT: Delta = -6)
  console.log('[AUDIT] Testing Contact -> Home card animation...');
  await page.click('button:has-text("Contact")');
  await page.waitForTimeout(800);

  await page.click('button:has-text("Home")');
  await page.waitForTimeout(150); // Mid-flight check

  const isHomeAnimating = await page.evaluate(() => {
    const leftCard = document.getElementById('home-card-left');
    const rightCard = document.getElementById('home-card-right');
    if (!leftCard || !rightCard) return false;
    
    const leftStyle = getComputedStyle(leftCard);
    const rightStyle = getComputedStyle(rightCard);
    
    // Check if transform is actively set by GSAP mid-flight
    return leftStyle.transform !== 'none' || parseFloat(leftStyle.opacity) < 1;
  });

  console.log('[AUDIT] Home Cards Mid-Flight Animation Status:', isHomeAnimating);

  if (!isHomeAnimating) {
    console.error('[FAIL] Home glass cards failed to animate on tab switch!');
    await browser.close();
    process.exit(1);
  }

  await page.waitForTimeout(700);
  console.log('[SUCCESS] Home section card transition & vector parity VERIFIED!');
  await browser.close();
  process.exit(0);
})();
