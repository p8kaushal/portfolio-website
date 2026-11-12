import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const output = 'test-results/changing-room';
await mkdir(output, { recursive: true });
const errors = [];
const measurements = [];
try {
  for (const profile of [
    { name: 'desktop', viewport: { width: 1440, height: 900 } },
    { name: 'mobile', viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true },
    { name: 'mobile-landscape', viewport: { width: 844, height: 390 }, hasTouch: true, isMobile: true }
  ]) {
    const context = await browser.newContext({ ...profile, reducedMotion: 'reduce' });
    await context.addInitScript(() => {
      localStorage.setItem('portfolio-house-scene-v1', JSON.stringify({ mode: 'enhanced' }));
      sessionStorage.setItem('portfolio-house-session-v1', JSON.stringify({ x: -11.742944763917983, z: 3.972740661031255, yaw: 0.2617993877991494, pitch: 0, noticeShown: true, playableSeconds: 0 }));
    });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(process.env.PORTFOLIO_URL || 'http://127.0.0.1:4175', { waitUntil: 'networkidle' });
    await page.locator('[data-scene-mode="enhanced"]').waitFor();
    await page.locator('#resume-game').click();
    if (profile.hasTouch && await page.locator('#rotate-continue').isVisible()) await page.locator('#rotate-continue').click();
    await page.locator('#prompt').waitFor({ state: 'visible' });
    await page.locator('#prompt').click();
    const dialog = page.locator('dialog.house-interaction');
    await dialog.waitFor({ state: 'visible' });
    const stage = dialog.locator('.hi-mirror-stage');
    await stage.waitFor({ state: 'visible' });
    await dialog.getByRole('heading', { name: 'Parth Kaushal' }).waitFor();
    const copy = dialog.locator('.hi-copy');
    await copy.evaluate(element => { element.scrollTop = element.scrollHeight; });
    const stageBox = await stage.boundingBox();
    assert.ok(stageBox.height >= 100 && stageBox.y >= 0 && stageBox.y + stageBox.height <= profile.viewport.height, `${profile.name}: character remains visible while About scrolls`);
    const initial = await stage.screenshot({ path: `${output}/${profile.name}.png` });
    const frameIntervalP95 = await page.evaluate(async () => {
      const intervals = []; let previous = await new Promise(requestAnimationFrame);
      for (let i = 0; i < 180; i++) { const now = await new Promise(requestAnimationFrame); intervals.push(now - previous); previous = now; }
      return intervals.sort((a, b) => a - b)[Math.floor(intervals.length * .95)];
    });
    measurements.push({ profile: profile.name, frameIntervalP95 });
    const zoomButton = dialog.getByRole('button', { name: 'Zoom in' });
    if (profile.hasTouch) await zoomButton.tap();
    else { await zoomButton.focus(); await page.keyboard.press('Enter'); }
    const zoomed = await stage.screenshot();
    assert.notDeepEqual(initial, zoomed, `${profile.name}: zoom changes view`);
    await dialog.getByRole('button', { name: 'Pan left' }).click();
    const panned = await stage.screenshot();
    assert.notDeepEqual(zoomed, panned, `${profile.name}: pan changes view`);
    await dialog.getByRole('button', { name: 'Reset view' }).click();
    const reset = await stage.screenshot();
    assert.deepEqual(initial, reset, `${profile.name}: reset restores view`);
    if (profile.hasTouch) {
      const box = await stage.boundingBox();
      const client = await context.newCDPSession(page);
      const start = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
      await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [start] });
      await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: start.x + 45, y: start.y + 20 }] });
      await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      assert.notDeepEqual(await stage.screenshot(), initial, 'touch drag pans the view');
      await dialog.getByRole('button', { name: 'Reset view' }).tap();
      await client.detach();
    } else {
      const box = await stage.boundingBox();
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.wheel(0, -180);
      assert.notDeepEqual(await stage.screenshot(), initial, 'mouse wheel zooms the view');
      await dialog.getByRole('button', { name: 'Reset view' }).click();
      assert.deepEqual(await stage.screenshot(), initial, 'reset restores view after wheel zoom');
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down(); await page.mouse.move(box.x + box.width / 2 + 40, box.y + box.height / 2 + 20, { steps: 4 }); await page.mouse.up();
      assert.notDeepEqual(await stage.screenshot(), initial, 'pointer drag pans the view');
      await dialog.getByRole('button', { name: 'Reset view' }).click();
      const lost = await stage.locator('canvas').evaluate(canvas => {
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        const extension = gl?.getExtension('WEBGL_lose_context');
        if (!extension) return false;
        extension.loseContext(); return true;
      });
      assert.equal(lost, true, 'test browser exposes context-loss extension');
      await dialog.locator('.hi-glass').waitFor({ state: 'visible' });
      assert.equal(await dialog.locator('.hi-mirror-controls').count(), 0, 'lost context restores illustrated fallback');
    }
    await dialog.getByRole('button', { name: /Back to the house/ }).click();
    await dialog.waitFor({ state: 'hidden' });
    await page.locator('#game-hud').waitFor({ state: 'visible' });
    if (!profile.hasTouch) {
      await page.locator('#prompt').waitFor({ state: 'visible' });
      await page.locator('#prompt').click();
      await dialog.locator('.hi-mirror-stage canvas').waitFor({ state: 'visible' });
      await dialog.getByRole('button', { name: /Back to the house/ }).click();
      await page.locator('#game-hud').waitFor({ state: 'visible' });
    }
    await context.close();
  }
  // The house owns the first WebGL context; deny the portrait's second context.
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await context.addInitScript(() => {
    localStorage.setItem('portfolio-house-scene-v1', JSON.stringify({ mode: 'enhanced' }));
    sessionStorage.setItem('portfolio-house-session-v1', JSON.stringify({ x: -11.742944763917983, z: 3.972740661031255, yaw: 0.2617993877991494, pitch: 0, noticeShown: true, playableSeconds: 0 }));
    const original = HTMLCanvasElement.prototype.getContext;
    let webglRequests = 0;
    HTMLCanvasElement.prototype.getContext = function(type, ...args) {
      if (type === 'webgl2' && ++webglRequests > 1) return null;
      return original.call(this, type, ...args);
    };
  });
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(process.env.PORTFOLIO_URL || 'http://127.0.0.1:4175', { waitUntil: 'networkidle' });
  await page.locator('[data-scene-mode="enhanced"]').waitFor();
  await page.locator('#resume-game').click();
  await page.locator('#prompt').waitFor({ state: 'visible' });
  await page.locator('#prompt').click();
  const fallbackDialog = page.locator('dialog.house-interaction');
  await fallbackDialog.locator('.hi-glass').waitFor({ state: 'visible' });
  await fallbackDialog.getByRole('heading', { name: 'Parth Kaushal' }).waitFor();
  await fallbackDialog.getByRole('button', { name: /Back to the house/ }).click();
  await page.locator('#game-hud').waitFor({ state: 'visible' });
  await context.close();
  const classic = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce', hasTouch: true, isMobile: true });
  await classic.addInitScript(() => {
    localStorage.setItem('portfolio-house-scene-v1', JSON.stringify({ mode: 'classic' }));
    sessionStorage.setItem('portfolio-house-session-v1', JSON.stringify({ x: -11.742944763917983, z: 3.972740661031255, yaw: 0.2617993877991494, pitch: 0, noticeShown: true, playableSeconds: 0 }));
  });
  const classicPage = await classic.newPage();
  classicPage.on('pageerror', error => errors.push(error.message));
  await classicPage.goto(process.env.PORTFOLIO_URL || 'http://127.0.0.1:4175', { waitUntil: 'networkidle' });
  await classicPage.locator('[data-scene-mode="classic"]').waitFor();
  await classicPage.locator('#resume-game').click();
  await classicPage.locator('#rotate-continue').click();
  await classicPage.locator('#prompt').waitFor({ state: 'visible' });
  await classicPage.locator('#prompt').click();
  const classicDialog = classicPage.locator('dialog.house-interaction');
  const classicGlass = classicDialog.locator('.hi-glass');
  await classicGlass.waitFor({ state: 'visible' });
  await classicDialog.locator('.hi-copy').evaluate(element => { element.scrollTop = element.scrollHeight; });
  const classicBox = await classicGlass.boundingBox();
  assert.ok(classicBox.height >= 100 && classicBox.y + classicBox.height <= 844, 'classic portrait remains visible while About scrolls');
  await classicDialog.getByRole('button', { name: /Back to the house/ }).click();
  await classicPage.locator('#game-hud').waitFor({ state: 'visible' });
  await classic.close();
  assert.deepEqual(errors, []);
  await writeFile(`${output}/report.json`, JSON.stringify({ measurements, errors, note: 'Local headless Chromium; stationary open dialog, emulated touch is not a physical device measurement.' }, null, 2));
  console.log(JSON.stringify({ checks: 'Zoom, pan, reset, About, exit and context-loss recovery passed', measurements, errors }, null, 2));
} finally { await browser.close(); }
