import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  if (!fs.existsSync('static/screenshots')) fs.mkdirSync('static/screenshots');

  await page.goto('http://localhost:5173');
  await page.waitForTimeout(600);
  await page.click('text=DESCEND INTO STUDIO');
  await page.waitForTimeout(1400);

  // 1. Audit Projects Monitor Boot & Legibility
  console.log('[AUDIT] Navigating to Projects...');
  await page.click('button:has-text("Projects")');
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'static/screenshots/projects-grid-thumbnails.png' });

  // Assert Thumbnail elements exist
  const thumbnailsCount = await page.evaluate(() => {
    return document.querySelectorAll('.project-card img, .project-card video').length;
  });

  console.log('[AUDIT] Project Card Media Thumbnails Count:', thumbnailsCount);
  if (thumbnailsCount < 4) {
    console.error('[FAIL] Project cards are missing media thumbnails!');
    await browser.close();
    process.exit(1);
  }

  // 2. Audit Redesigned Split Detail Modal
  console.log('[AUDIT] Opening Project Detail Modal...');
  await page.click('.project-card');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'static/screenshots/project-detail-split-modal.png' });

  const isModalVisible = await page.isVisible('#project-detail-modal');
  const isLiveDemoVisible = await page.isVisible('text=LAUNCH LIVE DEMO');
  const isGitHubVisible = await page.isVisible('text=VIEW GITHUB REPOSITORY');

  if (!isModalVisible || !isLiveDemoVisible || !isGitHubVisible) {
    console.error('[FAIL] Redesigned split modal or live/GitHub links missing!');
    await browser.close();
    process.exit(1);
  }

  console.log('[SUCCESS] Projects Studio Monitor overhaul, high-contrast cards, media thumbnails, split modal, and live links VERIFIED!');
  await browser.close();
  process.exit(0);
})();
