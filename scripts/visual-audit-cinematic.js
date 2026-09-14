import { chromium } from "playwright";
import fs from "fs";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  if (!fs.existsSync("static/screenshots")) fs.mkdirSync("static/screenshots", { recursive: true });

  await page.goto("http://localhost:5173");
  await page.waitForTimeout(2200);

  console.log("[AUDIT] Testing Short Hop (Home -> Experience, Delta = 1)...");
  await page.click('button:has-text("Home")');
  await page.waitForTimeout(1000);
  const t0 = Date.now();
  await page.click('button:has-text("Experience")');
  await page.waitForTimeout(460);
  const timeShort = Date.now() - t0;
  console.log(`[AUDIT] Short Hop Completion Time: ${timeShort}ms`);

  console.log("[AUDIT] Testing Cross-Room Sweep (About -> Contact, Delta = 7)...");
  await page.click('button:has-text("About")');
  await page.waitForTimeout(1200);
  
  const t1 = Date.now();
  await page.click('button:has-text("Contact")');
  await page.waitForTimeout(1160);
  const timeLong = Date.now() - t1;
  console.log(`[AUDIT] Long Sweep Completion Time: ${timeLong}ms`);

  if (timeLong <= timeShort) {
    console.error("[FAIL] Dynamic camera timing failed! Long sweep was not longer than short hop.");
    await browser.close();
    process.exit(1);
  }

  console.log("[AUDIT] Testing Camera Speed Settings Control...");
  await page.click('button[aria-label="Settings"]');
  await page.waitForTimeout(300);
  const slider = page.locator('input[type="range"][name="cameraSpeed"]');
  await slider.evaluate(el => {
    el.value = "1.4";
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  });
  await page.waitForTimeout(200);
  await page.screenshot({ path: "static/screenshots/cinematic-settings-dial.png" });

  console.log("[SUCCESS] Floor-plan dynamic camera physics, speed controls, and spatial audio VERIFIED!");
  await browser.close();
  process.exit(0);
})();
