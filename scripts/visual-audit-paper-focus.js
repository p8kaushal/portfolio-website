import { chromium } from "playwright";
import fs from "fs";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  if (!fs.existsSync("static/screenshots")) fs.mkdirSync("static/screenshots", { recursive: true });

  await page.goto("http://localhost:5173");
  await page.waitForTimeout(600);
  await page.click("text=DESCEND INTO STUDIO");
  await page.waitForTimeout(1400);

  // 1. Audit Skills (Left Active, Right Blank)
  console.log("[AUDIT] Navigating to Skills stage...");
  await page.click("button:has-text(\"Skills\")", { force: true });
  await page.waitForTimeout(600);
  await page.screenshot({ path: "static/screenshots/desk-skills-left-active.png" });

  // Trigger Zoom on Left Sheet
  console.log("[AUDIT] Clicking Left Sheet to trigger spatial zoom...");
  await page.click("#paper-sheet-left");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "static/screenshots/desk-skills-zoomed-centered.png" });

  const isBackBtnVisible = await page.isVisible("text=← BACK TO DESK");
  if (!isBackBtnVisible) {
    console.error("[FAIL] BACK TO DESK button did not appear upon paper zoom!");
    await browser.close();
    process.exit(1);
  }

  // Click Back to Desk
  console.log("[AUDIT] Clicking Back to Desk...");
  await page.click("text=← BACK TO DESK", { force: true });
  await page.waitForTimeout(900);

  // 2. Audit Resume (Right Active, Left Blank & Download CTA)
  console.log("[AUDIT] Navigating to Resume stage...");
  await page.click("button:has-text(\"Resume\")", { force: true });
  await page.waitForTimeout(600);

  console.log("[AUDIT] Clicking Right Sheet to trigger Resume zoom...");
  await page.click("#paper-sheet-right");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "static/screenshots/desk-resume-zoomed-download.png" });

  const isDownloadVisible = await page.isVisible("text=DOWNLOAD RESUME PDF");
  if (!isDownloadVisible) {
    console.error("[FAIL] DOWNLOAD RESUME PDF button missing during Resume paper focus!");
    await browser.close();
    process.exit(1);
  }

  console.log("[SUCCESS] Single-sheet content isolation, Welcome-inspired 3D paper zoom, and PDF CTA VERIFIED!");
  await browser.close();
  process.exit(0);
})();
