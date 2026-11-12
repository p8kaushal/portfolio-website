import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const baseURL = process.env.PORTFOLIO_URL || 'http://127.0.0.1:5173';
const output = 'test-results/revamp-baseline';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const report = { baseURL, capturedAt: new Date().toISOString(), profiles: [] };
try {
  for (const profile of [
    { name: 'desktop', viewport: { width: 1440, height: 900 } },
    { name: 'mobile', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' }
  ]) {
    const { name, ...contextOptions } = profile;
    const context = await browser.newContext(contextOptions);
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const response = await page.goto(baseURL, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200);
    await page.locator('#skip').click();
    if (profile.isMobile) await page.locator('#rotate-continue').click();
    await page.locator('#game-hud').waitFor({ state: 'visible' });
    if (profile.isMobile) {
      await page.locator('.touch-controls').waitFor({ state: 'visible' });
      assert.equal(await page.evaluate(() => matchMedia('(any-pointer:coarse)').matches), true);
    }
    await page.screenshot({ path: `${output}/${profile.name}.png`, fullPage: true });
    const intervals = await page.evaluate(() => new Promise(resolve => {
      const samples = [];
      let previous;
      function frame(now) {
        if (previous !== undefined) samples.push(now - previous);
        previous = now;
        if (samples.length < 180) requestAnimationFrame(frame);
        else resolve(samples.sort((a, b) => a - b));
      }
      requestAnimationFrame(frame);
    }));
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    assert.equal(overflow, false, `${profile.name}: horizontal overflow`);
    await page.getByRole('button', { name: 'Portfolio menu', exact: true }).click();
    for (const name of ['About', 'Projects', 'Skills', 'Experience', 'Achievements', 'Contact']) {
      await page.getByRole('button', { name, exact: true }).click();
      await page.getByRole('heading', { name, exact: true }).waitFor();
    }
    await page.getByRole('button', { name: 'Close portfolio menu' }).click();
    const fallback = await context.request.get(`${baseURL}/2d/index.html`);
    assert.equal(fallback.status(), 200);
    assert.deepEqual(errors, []);
    const navigation = await page.evaluate(() => {
      const entry = performance.getEntriesByType('navigation')[0];
      return { domContentLoadedMs: entry.domContentLoadedEventEnd, loadMs: entry.loadEventEnd };
    });
    let movement;
    if (!profile.isMobile) {
      movement = await page.evaluate(() => new Promise(resolve => {
        const keys = ['d', 'a', 's', 'w'];
        const samples = [];
        const positions = [];
        let start, previous, activeKey;
        const dispatch = (type, key) => document.activeElement.dispatchEvent(new KeyboardEvent(type, { key, bubbles: true }));
        function frame(now) {
          start ??= now;
          const elapsed = now-start;
          if (previous !== undefined) samples.push(now-previous);
          previous = now;
          const key = elapsed < 10000 ? keys[Math.floor(elapsed/2500)] : null;
          if (key !== activeKey) {
            window.dispatchEvent(new Event('pagehide'));
            const saved = JSON.parse(sessionStorage.getItem('portfolio-house-session-v1'));
            if (saved) positions.push({ x: saved.x, z: saved.z });
            if (activeKey) dispatch('keyup', activeKey);
            if (key) dispatch('keydown', key);
            activeKey = key;
          }
          if (elapsed < 10000) requestAnimationFrame(frame);
          else {
            window.dispatchEvent(new Event('pagehide'));
            samples.sort((a,b)=>a-b);
            resolve({ durationMs: elapsed, samples: samples.length, frameIntervalP95: samples[Math.floor(samples.length*.95)], positions, finalSession: JSON.parse(sessionStorage.getItem('portfolio-house-session-v1')), path: 'D/A/S/W, 2.5 seconds each; collision handling remains enabled.' });
          }
        }
        requestAnimationFrame(frame);
      }));
      assert.ok(movement.positions.some(position => Math.hypot(position.x,position.z+.2)>.1), 'Movement should update the saved camera');
    }
    report.profiles.push({ name, errors, overflow, navigation, frameIntervalP50: intervals[90], frameIntervalP95: intervals[171], samples: intervals.length, movement, note: 'Headless local Chromium; frame samples and synthetic keyboard traversal do not establish physical-device performance. Navigation is a local uncached context, without network throttling.' });
    await context.close();
  }
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
