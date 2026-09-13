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
  
  console.log("[AUDIT] Setting Opacity Slider to 0.35...");
  await page.fill('input[type="range"][name="opacity"]', "0.35");
  await page.waitForTimeout(200);

  const navBg = await page.evaluate(() => {
    const navDiv = document.querySelector("nav > div");
    return navDiv ? getComputedStyle(navDiv).backgroundColor : "";
  });

  console.log("[AUDIT] Navbar Background computed with slider:", navBg);
  await page.screenshot({ path: "static/screenshots/navbar-transparency-tested.png" });

  if (!navBg.includes("0.35")) {
    console.error("[FAIL] Navbar did not reactively update opacity!");
    await browser.close();
    process.exit(1);
  }

  console.log("[SUCCESS] Navbar reactive glass transparency VERIFIED!");
  await browser.close();
  process.exit(0);
})();
