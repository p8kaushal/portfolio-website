import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const baseURL = process.env.PORTFOLIO_URL || 'http://127.0.0.1:4194';
const viewports = [{ width: 1440, height: 900 }, { width: 390, height: 844 }, { width: 667, height: 375 }];
const checks = [];
const browser = await chromium.launch({ headless: true });

function luminance(color) {
  const channels = color.match(/[\d.]+/g)?.slice(0, 3).map(Number) || [];
  const linear = channels.map(value => { const channel = value / 255; return channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4; });
  return .2126 * linear[0] + .7152 * linear[1] + .0722 * linear[2];
}

function contrast(first, second) {
  const [light, dark] = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (light + .05) / (dark + .05);
}

async function visit(viewport, mode = 'classic', position = { x: 0, z: 0 }) {
  const context = await browser.newContext({ viewport });
  await context.addInitScript(({ mode, position }) => {
    localStorage.setItem('portfolio-house-scene-v1', JSON.stringify({ mode }));
    sessionStorage.setItem('portfolio-house-session-v1', JSON.stringify({ ...position, yaw: 0, pitch: 0, noticeShown: true, playableSeconds: 0 }));
  }, { mode, position });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
  await page.locator('#resume-game').click();
  await page.locator('#game-hud').waitFor({ state: 'visible' });
  return { page, context, errors };
}

async function fullyScroll(container, target) {
  await container.evaluate(element => { element.scrollTop = element.scrollHeight; });
  const rect = await target.boundingBox();
  assert.ok(rect && rect.y >= 0 && rect.y + rect.height <= (await target.page().evaluate(() => innerHeight)), 'bottom content can be brought fully into view');
}

try {
  for (const viewport of viewports) {
    const { page, context, errors } = await visit(viewport);
    await page.locator('#menu-toggle').click();
    await page.locator('#settings').click();
    const settings = page.locator('.game-settings');
    const settingsContent = settings.locator('.gs-content');
    await page.waitForTimeout(60);
    if (await settingsContent.evaluate(element => element.scrollHeight > element.clientHeight)) {
      assert.equal(await settings.locator('.gs-scroll-cue').isVisible(), true, 'settings explains that more options are below');
      await fullyScroll(settingsContent, settings.locator('.scene-choice-compact'));
    } else {
      const scene = await settings.locator('.scene-choice-compact').boundingBox();
      assert.ok(scene && scene.y + scene.height <= viewport.height, 'all settings fit in the desktop viewport');
    }
    const sceneLinkColor = await settings.locator('.scene-choice-compact a').evaluate(element => getComputedStyle(element).color);
    assert.notEqual(sceneLinkColor, 'rgb(237, 199, 141)', '2D link uses readable contrast on the house-style panel');
    await settings.locator('.gs-close').click();

    await page.locator('#map-toggle').click();
    const map = page.locator('.game-map-dialog');
    await map.waitFor({ state: 'visible' });
    await fullyScroll(map, map.locator('.gm-footer'));
    await map.locator('.gm-close').click();

    await page.locator('#menu-toggle').click();
    await page.locator('#help').click();
    const help = page.locator('.game-help');
    await help.waitFor({ state: 'visible' });
    await fullyScroll(help, help.locator('.gh-tip'));
    await help.locator('.gh-close').click();

    await page.locator('#menu-toggle').click();
    await page.locator('#phone').click();
    const phone = page.locator('.phone-overlay:not([hidden]) .phone-shell');
    await phone.waitFor({ state: 'visible' });
    const incoming = page.locator('.phone-overlay:not([hidden]) .phone-incoming');
    assert.ok(await incoming.isVisible());
    const readMessage = incoming.locator('[data-answer]');
    const readBox = await readMessage.boundingBox();
    assert.ok(readBox && readBox.y >= 0 && readBox.y + readBox.height <= viewport.height, 'incoming message action stays visible');
    await readMessage.click();
    assert.ok(await phone.locator('.phone-body').innerText().then(text => text.length > 0), 'phone content renders after opening a message');
    assert.deepEqual(errors, []);
    checks.push(`settings, map, help and phone ${viewport.width}x${viewport.height}`);
    await context.close();
    console.log(checks.at(-1));
  }

  const targets = [
    ['computer', { x: 7.55, z: -2.1 }, '.pc-environment:not([hidden])'],
    ['tv', { x: 0, z: -5.5 }, '.house-interaction[data-mode="tv"]'],
    ['file', { x: 9.5, z: -3.5 }, '.house-interaction[data-mode="file"]'],
    ['awards', { x: -3.13, z: -5.5 }, '.house-interaction[data-mode="awards"]'],
    ['mirror', { x: -11.4, z: 2.7 }, '.house-interaction[data-mode="mirror"]']
  ];
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    for (const [id, position, selector] of targets) {
      const { page, context, errors } = await visit(viewport, 'enhanced', position);
      await page.locator('#prompt').click();
      const root = page.locator(selector);
      await root.waitFor({ state: 'visible' });
      if (id === 'computer') {
        const icons = root.locator('.pc-icon');
        const first = await icons.first().boundingBox();
        assert.ok(first && first.y >= 0 && first.y + first.height <= viewport.height, 'computer desktop icons stay visible');
      } else if (id === 'tv') {
        const footer = root.locator('.hi-tv-footer');
        const rect = await footer.boundingBox();
        assert.ok(rect && rect.y >= 0 && rect.y + rect.height <= viewport.height, 'TV playback controls stay visible');
        const timeline = root.locator('.hi-tv-screen');
        await fullyScroll(timeline, root.locator('.hi-timeline-entry').last());
      } else if (id === 'file') {
        const tabs = root.locator('.hi-tabs');
        const rect = await tabs.boundingBox();
        assert.ok(rect && rect.y >= 0 && rect.y + rect.height <= viewport.height, 'file tabs stay visible');
        assert.ok(await root.locator('.hi-paper-actions a').count() > 0, 'résumé action exists in the file view');
        await root.locator('.hi-tabs button[data-page="skills"]').click();
        const skillPage = root.locator('.hi-page-skills');
        const firstSkill = root.locator('.hi-skill-card').first();
        const skillCardColor = await firstSkill.evaluate(element => getComputedStyle(element).backgroundColor);
        const skillTag = firstSkill.locator('.hi-skill-tags span').first();
        const textColors = [
          [await firstSkill.locator('.hi-dossier-id').evaluate(element => getComputedStyle(element).color), skillCardColor],
          [await firstSkill.locator('h3').evaluate(element => getComputedStyle(element).color), skillCardColor],
          [await skillTag.evaluate(element => getComputedStyle(element).color), await skillTag.evaluate(element => getComputedStyle(element).backgroundColor)]
        ];
        for (const [foreground, background] of textColors) assert.ok(contrast(foreground, background) >= 4.5, `skills text contrast is readable (${contrast(foreground, background).toFixed(2)}:1)`);
        if (viewport.width <= 650 || viewport.height <= 600) {
          assert.ok(await root.locator('.hi-skill-scroll-cue').isVisible(), 'skills file signals that more groups are below');
          await fullyScroll(skillPage, root.locator('.hi-skill-card').last());
        }
      } else if (id === 'awards') {
        const navigation = root.locator('.hi-award-nav');
        const rect = await navigation.boundingBox();
        assert.ok(rect && rect.y >= 0 && rect.y + rect.height <= viewport.height, 'awards navigation stays visible');
        assert.ok(await root.locator('.hi-award-scroll').count() > 0, 'award text has its own scroll region');
      } else {
        const stage = root.locator('.hi-mirror-stage');
        const stageRect = await stage.boundingBox();
        assert.ok(stageRect && stageRect.width >= viewport.width * .4, 'character preview uses the left side of the screen');
        const initialView = await stage.screenshot();
        await page.mouse.move(stageRect.x + stageRect.width * .3, stageRect.y + stageRect.height * .5);
        await page.mouse.down();
        await page.mouse.move(stageRect.x + stageRect.width * .42, stageRect.y + stageRect.height * .5, { steps: 3 });
        await page.mouse.up();
        const rotatedView = await stage.screenshot();
        assert.notDeepEqual(rotatedView, initialView, 'mouse drag rotates the character');
        await page.keyboard.down('Shift');
        await page.mouse.move(stageRect.x + stageRect.width * .42, stageRect.y + stageRect.height * .5);
        await page.mouse.down();
        await page.mouse.move(stageRect.x + stageRect.width * .48, stageRect.y + stageRect.height * .56, { steps: 3 });
        await page.mouse.up();
        await page.keyboard.up('Shift');
        const pannedView = await stage.screenshot();
        assert.notDeepEqual(pannedView, rotatedView, 'shift-drag pans the character');
        await page.mouse.move(stageRect.x + stageRect.width * .5, stageRect.y + stageRect.height * .5);
        await page.mouse.wheel(0, -100);
        const zoomedView = await stage.screenshot();
        assert.notDeepEqual(zoomedView, pannedView, 'wheel zooms the character');
        for (const control of await root.locator('[data-view]').all()) {
          const rect = await control.boundingBox();
          assert.ok(rect && rect.y >= 0 && rect.y + rect.height <= viewport.height, 'character-view controls stay visible');
        }
      }
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
      assert.equal(overflow, false, `${id} has no horizontal page overflow`);
      assert.deepEqual(errors, []);
      checks.push(`${id} ${viewport.width}x${viewport.height}`);
      await context.close();
    }
    console.log(`interactions ${viewport.width}x${viewport.height}`);
  }

  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    const { page, context, errors } = await visit(viewport);
    await page.locator('.pq-launch').click();
    const dialog = page.locator('.portfolio-quick dialog');
    const nav = dialog.locator('nav');
    for (const name of ['About', 'Projects', 'Skills', 'Experience', 'Achievements', 'Contact']) {
      await nav.locator('button').filter({ hasText: new RegExp(`^${name}$`, 'i') }).click();
      const heading = dialog.locator(`#pq-${name.toLowerCase()}`);
      const headingRect = await heading.boundingBox();
      const navRect = await nav.boundingBox();
      assert.ok(headingRect && navRect && headingRect.y >= navRect.y + navRect.height - 1 && headingRect.y < viewport.height, `${name} heading is visible below the sticky menu`);
      const section = heading.locator('xpath=..');
      for (const card of await section.locator('.pq-item').all()) {
        const background = await card.evaluate(element => getComputedStyle(element).backgroundColor);
        for (const selector of ['h3', 'p', '.pq-meta', 'a']) {
          for (const textElement of await card.locator(selector).all()) {
            const foreground = await textElement.evaluate(element => getComputedStyle(element).color);
            assert.ok(contrast(foreground, background) >= 4.5, `${name} ${selector} text contrast is readable (${contrast(foreground, background).toFixed(2)}:1)`);
          }
        }
      }
    }
    assert.deepEqual(errors, []);
    checks.push(`portfolio headings and text contrast ${viewport.width}x${viewport.height}`);
    await context.close();
    console.log(checks.at(-1));
  }
  console.log(JSON.stringify({ checks }, null, 2));
} finally {
  await browser.close();
}
