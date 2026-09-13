import { chromium } from "playwright";
import fs from "fs";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  if (!fs.existsSync("static/screenshots")) fs.mkdirSync("static/screenshots", { recursive: true });

  await page.goto("http://localhost:5173");
  await page.waitForTimeout(2200);

  console.log("[AUDIT] Opening Settings Panel...");
  await page.click('button[aria-label="Settings"]');
  await page.waitForTimeout(300);
  
  console.log("[AUDIT] Adjusting Opacity Slider to 0.40...");
  const slider = page.locator('input[type="range"][name="opacity"]');
  await slider.evaluate(el => {
    el.value = "0.4";
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  });
  await page.waitForTimeout(200);

  const panelBg = await page.evaluate(() => {
    const panel = document.querySelector(".fixed.top-20");
    return panel ? getComputedStyle(panel).backgroundColor : "";
  });

  console.log("[AUDIT] Settings Panel Background computed with slider:", panelBg);
  await page.screenshot({ path: "static/screenshots/settings-panel-self-reactive.png" });

  if (!panelBg.includes("0.4")) {
    console.error("[FAIL] Settings Panel itself did not reactively update opacity!");
    await browser.close();
    process.exit(1);
  }

  console.log("[SUCCESS] Settings Panel self-reactivity VERIFIED!");
  await browser.close();
  process.exit(0);
})();
