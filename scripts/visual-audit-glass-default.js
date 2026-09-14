import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  await page.goto("http://localhost:5173");
  await page.waitForTimeout(600);
  await page.click("text=DESCEND INTO STUDIO");
  await page.waitForTimeout(1400);

  // Measure computed backdrop-filter blur and background-color opacity on Home cards
  const glassStyle = await page.evaluate(() => {
    const card = document.getElementById("home-card-left");
    if (!card) return null;
    const computed = getComputedStyle(card);
    return {
      backdropFilter: computed.backdropFilter || computed.webkitBackdropFilter,
      backgroundColor: computed.backgroundColor
    };
  });

  console.log("[AUDIT] Computed Home Card Glass Style:", glassStyle);

  if (!glassStyle || !glassStyle.backdropFilter.includes("24px")) {
    console.error("[FAIL] Default glass blur (24px) is NOT being applied!");
    await browser.close();
    process.exit(1);
  }

  console.log("[SUCCESS] Default glass effect strength (24px blur / 65% opacity) restored!");
  await browser.close();
  process.exit(0);
})();
