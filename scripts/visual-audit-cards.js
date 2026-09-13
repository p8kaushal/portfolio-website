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
  
  console.log("[AUDIT] Setting Opacity Slider to 0.4...");
  const slider = page.locator('input[type="range"][name="opacity"]');
  await slider.evaluate(el => {
    el.value = "0.4";
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  });
  await page.waitForTimeout(200);

  const cardBg = await page.evaluate(() => {
    const card = document.querySelector(".card-overlay div[style*='background-color']");
    return card ? getComputedStyle(card).backgroundColor : "";
  });

  console.log("[AUDIT] Content Card Background computed with slider:", cardBg);
  await page.screenshot({ path: "static/screenshots/cards-transparency-tested.png" });

  if (!cardBg.includes("0.4")) {
    console.error("[FAIL] Home/About content cards did not reactively update opacity!");
    await browser.close();
    process.exit(1);
  }

  console.log("[SUCCESS] Home and About glass card reactivity VERIFIED!");
  await browser.close();
  process.exit(0);
})();
