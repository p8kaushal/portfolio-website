import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  await page.goto("http://localhost:5173");
  await page.waitForTimeout(600);
  await page.click("text=DESCEND INTO STUDIO");
  await page.waitForTimeout(1400);

  // Measure computed root CSS variable defaults
  const rootVars = await page.evaluate(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    return {
      blur: rootStyle.getPropertyValue("--glass-blur").trim(),
      opacity: rootStyle.getPropertyValue("--glass-opacity").trim()
    };
  });

  console.log("[AUDIT] Computed Root CSS Variables:", rootVars);

  if (rootVars.blur !== "24px" || rootVars.opacity !== "0.65") {
    console.error(`[FAIL] CSS variables failed to initialize to 24px / 0.65! Got: ${JSON.stringify(rootVars)}`);
    await browser.close();
    process.exit(1);
  }

  // Verify backdrop filter on Home left card
  const computedBlur = await page.evaluate(() => {
    const card = document.getElementById("home-card-left");
    return card ? getComputedStyle(card).backdropFilter : "";
  });

  console.log("[AUDIT] Home Left Card Backdrop Filter:", computedBlur);

  if (!computedBlur.includes("24px")) {
    console.error(`[FAIL] Home card backdrop filter expected 24px, but got: ${computedBlur}`);
    await browser.close();
    process.exit(1);
  }

  console.log("[SUCCESS] Root CSS Variable glass locking (24px blur / 0.65 opacity) VERIFIED!");
  await browser.close();
  process.exit(0);
})();
