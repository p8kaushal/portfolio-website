import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const baseURL = process.env.PORTFOLIO_URL || 'http://127.0.0.1:4193';
const evidence = 'test-results/gta-era-regression';
await mkdir(evidence, { recursive: true });
const browser = await chromium.launch({ headless: true });
const errors = [];
const checks = [];

async function visit(mode, position, viewport = { width: 1440, height: 900 }) {
  const context = await browser.newContext({ viewport, reducedMotion: 'reduce' });
  await context.addInitScript(({ mode, position }) => {
    localStorage.setItem('portfolio-house-scene-v1', JSON.stringify({ mode }));
    sessionStorage.setItem('portfolio-house-session-v1', JSON.stringify({ ...position, yaw: 0, pitch: 0, noticeShown: true, playableSeconds: 0 }));
    window.__gtaAudioOscillators = 0;
    const audioBase = Object.getPrototypeOf(AudioContext.prototype);
    const descriptor = Object.getOwnPropertyDescriptor(audioBase, 'createOscillator');
    Object.defineProperty(audioBase, 'createOscillator', { ...descriptor, value: function (...args) { window.__gtaAudioOscillators++; return descriptor.value.apply(this, args); } });
  }, { mode, position });
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(`${mode}: ${error.message}`));
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  await page.locator(`[data-scene-mode="${mode}"]`).waitFor();
  await page.locator('#resume-game').click();
  await page.locator('#game-hud').waitFor({ state: 'visible' });
  return { page, context };
}

try {
  for (const mode of (process.env.GTA_ONLY_2D ? [] : ['enhanced', 'classic'])) {
    const movement = await visit(mode, { x: 0, z: 0 });
    movement.page.on('console', message => { if (message.type() === 'error') console.log(`${mode} console: ${message.text()}`); });
    movement.page.on('pageerror', error => console.log(`${mode} page error: ${error.stack}`));
    await movement.page.keyboard.down('w');
    await movement.page.waitForTimeout(1400);
    await movement.page.keyboard.up('w');
    const walkingSounds = await movement.page.evaluate(() => window.__gtaAudioOscillators);
    await movement.page.keyboard.down('Shift');
    await movement.page.keyboard.down('w');
    await movement.page.waitForTimeout(1400);
    await movement.page.keyboard.up('w');
    await movement.page.keyboard.up('Shift');
    const runningSounds = await movement.page.evaluate(() => window.__gtaAudioOscillators);
    console.log(`${mode} movement audio counts: walking=${walkingSounds}, sprint=${runningSounds}`);
    assert.ok(walkingSounds > 0 && runningSounds > walkingSounds, `${mode} walking and sprinting emit footstep sounds`);
    await movement.page.locator('#menu-toggle').click();
    await movement.page.locator('#settings').click();
    await movement.page.locator('#gs-muted').check();
    await movement.page.getByRole('button', { name: 'Close settings', exact: true }).click();
    const mutedSounds = await movement.page.evaluate(() => window.__gtaAudioOscillators);
    await movement.page.keyboard.press('p');
    await movement.page.locator('.phone-overlay:not([hidden]) .phone-shell').waitFor();
    assert.equal(await movement.page.evaluate(() => window.__gtaAudioOscillators), mutedSounds, `${mode} mute switch suppresses effects`);
    checks.push(`${mode}: walking, sprint cadence and mute control`);
    await movement.context.close();

    const objects = [
      ['computer', { x: 7.55, z: -2.1 }, '.pc-environment:not([hidden])'],
      ['tv', { x: 0, z: -5.5 }, '.house-interaction[data-mode="tv"]'],
      ['file', { x: 9.5, z: -3.5 }, '.house-interaction[data-mode="file"]'],
      ['awards', { x: -3.13, z: -5.5 }, '.house-interaction[data-mode="awards"]'],
      ['mirror', { x: -11.4, z: 2.7 }, '.house-interaction[data-mode="mirror"]']
    ];
    for (const [id, position, dialogSelector] of objects) {
      const { page, context } = await visit(mode, position);
      await page.screenshot({ path: `${evidence}/${mode}-${id}-world.png`, fullPage: true });
      await page.locator('#prompt').waitFor({ state: 'visible' });
      await page.locator('#prompt').click();
      await page.locator(dialogSelector).waitFor({ state: 'visible', timeout: 8000 });
      await page.screenshot({ path: `${evidence}/${mode}-${id}-interaction.png`, fullPage: true });
      const oscillators = await page.evaluate(() => window.__gtaAudioOscillators);
      assert.ok(oscillators > 0, `${mode} ${id} interaction emits a sound cue`);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
      assert.equal(overflow, false, `${mode} ${id} has no page overflow`);
      checks.push(`${mode}: ${id} prop screenshot, interaction opens, sound cue fires`);
      await context.close();
    }
    const { page, context } = await visit(mode, { x: 0, z: 0 });
    await page.keyboard.press('p');
    await page.locator('.phone-overlay:not([hidden]) .phone-shell').waitFor();
    await page.screenshot({ path: `${evidence}/${mode}-phone.png`, fullPage: true });
    assert.ok(await page.evaluate(() => window.__gtaAudioOscillators) > 0, `${mode} phone opening emits a sound cue`);
    await context.close();
    checks.push(`${mode}: phone opens and its sound cue fires`);
  }
  const fallback = await browser.newContext({ viewport: { width: 1280, height: 820 }, reducedMotion: 'reduce' });
  await fallback.addInitScript(() => {
    window.__gtaAudioOscillators = 0;
    const base = Object.getPrototypeOf(AudioContext.prototype);
    const descriptor = Object.getOwnPropertyDescriptor(base, 'createOscillator');
    Object.defineProperty(base, 'createOscillator', { ...descriptor, value: function (...args) { window.__gtaAudioOscillators++; return descriptor.value.apply(this, args); } });
  });
  const fallbackPage = await fallback.newPage();
  fallbackPage.on('pageerror', error => errors.push(`2D: ${error.message}`));
  fallbackPage.on('console', message => { if (message.type() === 'error') console.log(`2D console: ${message.text()}`); });
  await fallbackPage.goto(`${baseURL}/2d/index.html`, { waitUntil: 'networkidle' });
  await fallbackPage.locator('#start').click();
  await fallbackPage.screenshot({ path: `${evidence}/2d-world.png`, fullPage: true });
  await fallbackPage.locator('#soundToggle').click();
  await fallbackPage.keyboard.press('p');
  await fallbackPage.locator('#panel.phone').waitFor({ state: 'visible' });
  assert.equal(await fallbackPage.evaluate(() => window.__gtaAudioOscillators), 0, '2D mute control suppresses sounds');
  await fallbackPage.keyboard.press('Escape');
  await fallbackPage.locator('#soundToggle').click();
  await fallbackPage.keyboard.down('w');
  await fallbackPage.waitForTimeout(1300);
  await fallbackPage.keyboard.up('w');
  await fallbackPage.keyboard.press('e');
  await fallbackPage.locator('#panel h2').waitFor({ state: 'visible' });
  assert.ok(await fallbackPage.evaluate(() => window.__gtaAudioOscillators) > 0, '2D TV interaction plays its cue when unmuted');
  await fallbackPage.screenshot({ path: `${evidence}/2d-tv-interaction.png`, fullPage: true });
  await fallbackPage.keyboard.press('Escape');
  await fallbackPage.keyboard.press('p');
  assert.ok(await fallbackPage.evaluate(() => window.__gtaAudioOscillators) > 0, '2D phone plays its cue when unmuted');
  await fallbackPage.screenshot({ path: `${evidence}/2d-phone.png`, fullPage: true });
  await fallback.close();
  checks.push('2D fallback: phone interaction, warm prop/panel styling and mute control');
  assert.deepEqual(errors, []);
  console.log(JSON.stringify({ checks, errors, evidence }, null, 2));
} finally {
  await browser.close();
}
