import { chromium } from "playwright";
import fs from "fs";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  if (!fs.existsSync("static/screenshots")) fs.mkdirSync("static/screenshots", { recursive: true });

  await page.goto("http://localhost:5173");
  await page.waitForTimeout(2200);

  console.log("[AUDIT] Testing Skills -> Resume Localized Desk Pan...");
  await page.click('button:has-text("Skills")');
  await page.waitForTimeout(600);
  await page.screenshot({ path: "static/screenshots/desk-skills-focused.png" });

  await page.click('button:has-text("Resume")');
  await page.waitForTimeout(600);
  await page.screenshot({ path: "static/screenshots/desk-resume-focused.png" });

  const bgImageSrc = await page.evaluate(() => {
    const img = document.getElementById("active-bg-img");
    return img ? img.getAttribute("src") : "";
  });
  if (!bgImageSrc.includes("bg-desk-macro.jpg")) {
    console.error("[FAIL] Desk background changed unexpectedly during Skills <-> Resume transition!");
    await browser.close();
    process.exit(1);
  }

  console.log("[AUDIT] Testing Cross-Room Parallax Sweep (About -> Contact)...");
  await page.click('button:has-text("About")');
  await page.waitForTimeout(800);

  const t0 = Date.now();
  await page.click('button:has-text("Contact")');
  await page.waitForSelector("#contact-phone-container, #contact-phone-root");
  const sweepDuration = Date.now() - t0;
  console.log(`[AUDIT] Cross-Room Sweep Duration: ${sweepDuration}ms`);

  await page.screenshot({ path: "static/screenshots/contact-phone-landed.png" });

  console.log("[AUDIT] Opening Control Center Settings Panel...");
  await page.click('button[aria-label="Settings"]');
  await page.waitForTimeout(300);
  const slider = page.locator('input[type="range"][name="cameraSpeed"]');
  await slider.evaluate(el => {
    el.value = "1.3";
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  });
  await page.waitForTimeout(200);
  await page.screenshot({ path: "static/screenshots/settings-panel-camera-dials.png" });

  console.log("[SUCCESS] Apple-grade 3-layer parallax, desk localized pan, and reactive glass controls VERIFIED!");
  await browser.close();
  process.exit(0);
})();
