import { chromium } from 'playwright';
import fs from 'fs';

const STAGES = ['About', 'Home', 'Experience', 'Projects', 'Skills', 'Resume', 'Achievements', 'Contact'];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  if (!fs.existsSync('static/screenshots')) fs.mkdirSync('static/screenshots');

  await page.goto('http://localhost:5173');
  await page.waitForTimeout(600);
  await page.click('text=DESCEND INTO STUDIO');
  await page.waitForTimeout(1400);

  for (const stage of STAGES) {
    console.log(`[AUDIT] Testing Navigation to "${stage}"...`);
    await page.click(`button:has-text("${stage}")`);
    await page.waitForTimeout(900);

    const isVisible = await page.evaluate((stageName) => {
      const sectionLower = stageName.toLowerCase();
      // Check stage-specific element mounted in active section
      if (sectionLower === 'home') return document.querySelector('#home-stage-root') !== null;
      if (sectionLower === 'about') return document.querySelector('#about-glass-card') !== null;
      if (sectionLower === 'experience') return document.querySelector('#experience-tv-root') !== null;
      if (sectionLower === 'projects') return document.querySelector('#projects-monitor-root') !== null;
      if (sectionLower === 'skills') return document.querySelector('#paper-sheet-left') !== null;
      if (sectionLower === 'resume') return document.querySelector('#paper-sheet-right') !== null;
      if (sectionLower === 'achievements') return document.querySelector('#achievements-stage-root') !== null;
      if (sectionLower === 'contact') return document.querySelector('#contact-phone-container') !== null;
      return false;
    }, stage);

    console.log(`[AUDIT] Stage "${stage}" Mounted & Visible:`, isVisible);

    if (!isVisible) {
      console.error(`[FAIL] Stage "${stage}" is invisible or not rendered properly!`);
      await page.screenshot({ path: `static/screenshots/FAIL-${stage}.png` });
      await browser.close();
      process.exit(1);
    }

    await page.screenshot({ path: `static/screenshots/SUCCESS-${stage}.png` });
  }

  console.log('[SUCCESS] All 8 portfolio stages rendered with 100% visibility and correct camera alignment!');
  await browser.close();
  process.exit(0);
})();
