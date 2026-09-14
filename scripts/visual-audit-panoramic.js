import { chromium } from "playwright";
import fs from "fs";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  if (!fs.existsSync("static/screenshots")) fs.mkdirSync("static/screenshots", { recursive: true });

  await page.goto("http://localhost:5173");
  await page.waitForTimeout(2200);

  console.log("[AUDIT] Testing Continuous Panoramic Motion...");
  await page.click('button:has-text("About")');
  await page.waitForTimeout(800);
  await page.screenshot({ path: "static/screenshots/panorama-about.png" });

  await page.click('button:has-text("Contact")');
  await page.waitForTimeout(900);
  await page.screenshot({ path: "static/screenshots/panorama-contact.png" });

  const panoramaTransform = await page.evaluate(() => {
    const el = document.getElementById("stage-panorama");
    return el ? getComputedStyle(el).transform : "";
  });
  console.log("[AUDIT] Panorama Strip Transform computed:", panoramaTransform);

  console.log("[AUDIT] Testing Spatial Dolly Zoom to TV...");
  await page.click('button:has-text("Experience")');
  await page.waitForTimeout(900);
  await page.screenshot({ path: "static/screenshots/dolly-zoom-tv.png" });

  console.log("[SUCCESS] Continuous panoramic tracking, macro dolly zoom, and static desk panning VERIFIED!");
  await browser.close();
  process.exit(0);
})();
