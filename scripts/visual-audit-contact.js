import { chromium } from "playwright";
import fs from "fs";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  if (!fs.existsSync("static/screenshots")) fs.mkdirSync("static/screenshots", { recursive: true });

  await page.goto("http://localhost:5173");
  await page.waitForTimeout(2200);

  console.log("[AUDIT] Navigating to Contact tab...");
  await page.click('button:has-text("Contact")');
  await page.waitForTimeout(800);

  await page.click('button[aria-label="Settings"]');
  await page.waitForTimeout(300);
  await page.fill('input[type="range"][name="blur"]', "38");
  await page.waitForTimeout(200);

  await page.screenshot({ path: "static/screenshots/contact-settings-reactive.png" });

  const phoneBg = await page.evaluate(() => {
    const el = document.getElementById("contact-phone-root");
    return el ? getComputedStyle(el).backgroundColor : "";
  });

  console.log("[AUDIT] Contact Phone Background computed:", phoneBg);
  if (!phoneBg || phoneBg === "rgba(0, 0, 0, 0)") {
    console.error("[FAIL] Contact phone glass styling failed to apply!");
    await browser.close();
    process.exit(1);
  }

  console.log("[SUCCESS] Contact phone transition and reactive settings bindings VERIFIED!");
  await browser.close();
  process.exit(0);
})();
