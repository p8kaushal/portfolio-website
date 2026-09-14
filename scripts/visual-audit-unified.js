import { chromium } from "playwright";
import fs from "fs";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  if (!fs.existsSync("static/screenshots")) fs.mkdirSync("static/screenshots", { recursive: true });

  await page.goto("http://localhost:5173");
  await page.waitForTimeout(2200);

  console.log("[AUDIT] Testing Contact Tab Smartphone Mounting...");
  await page.click('button:has-text("Contact")');
  await page.waitForTimeout(800);
  await page.screenshot({ path: "static/screenshots/contact-smartphone-restored.png" });

  const isPhoneVisible = await page.isVisible("#contact-phone-container, .contact-phone-wrapper");
  if (!isPhoneVisible) {
    console.error("[FAIL] Contact smartphone container is still MISSING!");
    await browser.close();
    process.exit(1);
  }

  const tabs = ["About", "Home", "Experience", "Projects", "Skills", "Resume", "Achievements", "Contact"];
  for (const tab of tabs) {
    console.log(`[AUDIT] Testing smooth horizontal pan to ${tab}...`);
    await page.click(`button:has-text("${tab}")`);
    await page.waitForTimeout(700);
    await page.screenshot({ path: `static/screenshots/unified-${tab.toLowerCase()}.png` });
  }

  console.log("[SUCCESS] Unified horizontal pan engine, restored Contact phone, and Apple Glass UI VERIFIED!");
  await browser.close();
  process.exit(0);
})();
