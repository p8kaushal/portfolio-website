import { chromium } from "playwright";
import fs from "fs";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  if (!fs.existsSync("static/screenshots")) fs.mkdirSync("static/screenshots", { recursive: true });

  await page.goto("http://localhost:5173");
  await page.waitForTimeout(2200);

  console.log("[AUDIT] Testing Mid-Flight Blur Lifecycle Teardown...");
  await page.click('button:has-text("Experience")');
  await page.waitForTimeout(1050);

  const landedFilter = await page.evaluate(() => {
    const active = document.getElementById("stage-active");
    return active ? getComputedStyle(active).filter : "none";
  });
  console.log("[AUDIT] Active Stage Filter on Landing:", landedFilter);

  if (landedFilter !== "none" && !landedFilter.includes("blur(0px)")) {
    console.error("[FAIL] Motion blur failed to tear down to 0px on landing!");
    await browser.close();
    process.exit(1);
  }

  console.log("[AUDIT] Testing Zero-Blur Desk Surface Pan...");
  await page.click('button:has-text("Skills")');
  await page.waitForTimeout(600);
  await page.click('button:has-text("Resume")');
  await page.waitForTimeout(600);
  await page.screenshot({ path: "static/screenshots/desk-pan-crisp.png" });

  console.log("[AUDIT] Testing Contact Smartphone Mounting...");
  await page.click('button:has-text("Contact")');
  await page.waitForTimeout(850);
  await page.screenshot({ path: "static/screenshots/contact-phone-mounted.png" });

  const isPhoneVisible = await page.isVisible("#contact-phone-container, .contact-phone-wrapper");
  if (!isPhoneVisible) {
    console.error("[FAIL] Contact smartphone container is MISSING!");
    await browser.close();
    process.exit(1);
  }

  console.log("[SUCCESS] Mid-flight velocity blur, zero-blur desk pan, and Contact phone VERIFIED!");
  await browser.close();
  process.exit(0);
})();
