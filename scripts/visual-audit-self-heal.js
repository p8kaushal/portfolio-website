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

  console.log('[DIAGNOSTIC] Inspecting Stage Track Structure...');
  const trackInfo = await page.evaluate(() => {
    const track = document.getElementById('spatial-stage-track');
    if (!track) return { error: 'spatial-stage-track missing!' };
    const children = Array.from(track.children).map(c => ({
      id: c.id,
      width: c.getBoundingClientRect().width,
      left: c.getBoundingClientRect().left
    }));
    return { count: track.children.length, children };
  });

  console.log('[DIAGNOSTIC] Track Children:', JSON.stringify(trackInfo, null, 2));

  // Test navigation to Achievements
  console.log('[DIAGNOSTIC] Navigating to Achievements...');
  await page.click('button:has-text("Achievements")');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'static/screenshots/self-heal-achievements.png' });

  const achievementsMetrics = await page.evaluate(() => {
    const stage = document.getElementById('stage-achievements') || document.getElementById('achievements-stage-root');
    const frame = document.getElementById('certificate-frame-current');
    if (!stage) return { error: 'Stage container not found' };
    const rect = stage.getBoundingClientRect();
    const style = getComputedStyle(stage);
    return {
      rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
      opacity: style.opacity,
      visibility: style.visibility,
      hasFrame: !!frame
    };
  });

  console.log('[DIAGNOSTIC] Achievements Metrics:', JSON.stringify(achievementsMetrics, null, 2));

  if (!achievementsMetrics.hasFrame || achievementsMetrics.rect.width === 0 || parseFloat(achievementsMetrics.opacity) === 0) {
    console.error('[FAIL] Achievements stage is broken or invisible!');
    await browser.close();
    process.exit(1);
  }

  console.log('[SUCCESS] Achievements stage self-healing diagnostic and visual audit PASSED!');
  await browser.close();
  process.exit(0);
})();
