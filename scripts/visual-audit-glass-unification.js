import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  await page.goto("http://localhost:5173");
  await page.waitForTimeout(600);
  await page.click("text=DESCEND INTO STUDIO");
  await page.waitForTimeout(1400);

  // 1. Measure Home Card Blur
  const homeBlur = await page.evaluate(() => {
    const card = document.getElementById("home-card-left");
    return card ? getComputedStyle(card).backdropFilter : "";
  });

  // 2. Switch to About & Measure About Card Blur
  await page.click("button:has-text(\"About\")");
  await page.waitForTimeout(700);

  const aboutBlur = await page.evaluate(() => {
    const card = document.getElementById("about-glass-card");
    return card ? getComputedStyle(card).backdropFilter : "";
  });

  // 3. Switch Back to Home & Measure Again
  await page.click("button:has-text(\"Home\")");
  await page.waitForTimeout(700);

  const homeBlurAfter = await page.evaluate(() => {
    const card = document.getElementById("home-card-left");
    return card ? getComputedStyle(card).backdropFilter : "";
  });

  console.log(`[AUDIT] Initial Home Blur: ${homeBlur} | About Blur: ${aboutBlur} | Home Blur After: ${homeBlurAfter}`);

  if (homeBlur !== aboutBlur || homeBlur !== homeBlurAfter) {
    console.error("[FAIL] Glass effect mismatch detected between Home and About tabs!");
    await browser.close();
    process.exit(1);
  }

  console.log("[SUCCESS] Unified .apple-glass styling across Home and About VERIFIED!");
  await browser.close();
  process.exit(0);
})();
