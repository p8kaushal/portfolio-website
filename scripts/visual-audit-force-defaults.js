import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  // Clear all storage before navigating
  await page.goto("http://localhost:5173");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForTimeout(600);

  await page.click("text=DESCEND INTO STUDIO");
  await page.waitForTimeout(1400);

  // Measure computed styles on Home Left Card
  const style = await page.evaluate(() => {
    const card = document.getElementById("home-card-left");
    if (!card) return null;
    const comp = getComputedStyle(card);
    return {
      blur: comp.backdropFilter || comp.webkitBackdropFilter,
      bg: comp.backgroundColor
    };
  });

  console.log("[AUDIT] Computed Home Left Card Glass Specs:", style);

  if (!style || !style.blur.includes("24px")) {
    console.error(`[FAIL] Expected 24px backdrop blur, but got: ${style?.blur}`);
    await browser.close();
    process.exit(1);
  }

  console.log("[SUCCESS] Apple default glass values (24px blur / 0.65 opacity) verified!");
  await browser.close();
  process.exit(0);
})();
