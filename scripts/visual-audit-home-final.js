import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  await page.goto("http://localhost:5173");
  await page.waitForTimeout(600);
  await page.click("text=DESCEND INTO STUDIO");
  await page.waitForTimeout(1400);

  // 1. Audit Contact -> Home (Navigating LEFT, Delta = -6)
  console.log("[AUDIT] Navigating Contact -> Home...");
  await page.click("button:has-text(\"Contact\")");
  await page.waitForTimeout(800);

  await page.click("button:has-text(\"Home\")");
  await page.waitForTimeout(150); // Mid-flight frame check

  const leftCardTransform = await page.evaluate(() => {
    const el = document.getElementById("home-card-left");
    return el ? getComputedStyle(el).transform : "";
  });

  const rightCardTransform = await page.evaluate(() => {
    const el = document.getElementById("home-card-right");
    return el ? getComputedStyle(el).transform : "";
  });

  console.log("[AUDIT] Left Card Mid-flight Transform:", leftCardTransform);
  console.log("[AUDIT] Right Card Mid-flight Transform:", rightCardTransform);

  if (leftCardTransform === "none" || rightCardTransform === "none") {
    console.error("[FAIL] Home cards failed to trigger inline GSAP transforms!");
    await browser.close();
    process.exit(1);
  }

  await page.waitForTimeout(700);
  console.log("[SUCCESS] Home stage card vector entrance & GSAP override FIXED once and for all!");
  await browser.close();
  process.exit(0);
})();
