import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const baseURL = process.env.PORTFOLIO_URL || 'http://127.0.0.1:5173';
const mode = process.env.PORTFOLIO_MODE;
const output = mode ? `test-results/revamp-interactions-${mode}` : 'test-results/revamp-baseline';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const report = { checks: [], errors: [], scope: `Desktop Chromium, ${mode || 'automatic'} scene; session resume used to place visitor at each interaction approach.` };
let page;
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  if(mode)await context.addInitScript(mode => localStorage.setItem('portfolio-house-scene-v1', JSON.stringify({mode})),mode);
  page = await context.newPage();
  page.on('pageerror', error => report.errors.push(error.message));
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  const inventory = await page.evaluate(async () => {
    const THREE = await import('/node_modules/three/build/three.module.js');
    const { createWorld } = await import('/src/world.js');
    const world = createWorld(THREE);
    const { createEnhancedWorld } = await import('/src/enhanced-world.js');
    const enhanced = createEnhancedWorld(THREE);
    const serializeTargets = scene => [scene.computer,...scene.targets].map(({id,label,position,radius})=>({id,label,position:position.toArray(),radius}));
    if(JSON.stringify(world.colliders)!==JSON.stringify(enhanced.colliders))throw Error('Enhanced collision footprints must match classic');
    if(JSON.stringify(serializeTargets(world))!==JSON.stringify(serializeTargets(enhanced)))throw Error('Enhanced interaction targets must match classic');
    const { disposeWorld } = await import('/src/scene-mode.js');
    disposeWorld(enhanced);
    const targets = [world.computer, ...world.targets];
    const blocked = (x,z) => world.colliders.some(c => x > c.minX-.24 && x < c.maxX+.24 && z > c.minZ-.24 && z < c.maxZ+.24);
    const approaches = targets.map(target => {
      // Find a legal camera location at which this is the nearest active target.
      for (let radius = .8; radius < target.radius; radius += .15) {
        for (let angle = 0; angle < Math.PI*2; angle += Math.PI/12) {
          const x = target.position.x + Math.sin(angle)*radius;
          const z = target.position.z + Math.cos(angle)*radius;
          const nearest = targets.filter(t => Math.hypot(x-t.position.x,z-t.position.z)<t.radius).sort((a,b)=>Math.hypot(x-a.position.x,z-a.position.z)-Math.hypot(x-b.position.x,z-b.position.z))[0];
          if (!blocked(x,z) && nearest === target) return { id:target.id,label:target.label,x,z,yaw:angle };
        }
      }
      throw Error(`No valid approach for ${target.label}`);
    });
    world.setTimeMode('day');
    const day = world.scene.background.getHexString();
    world.setTimeMode('night');
    const night = world.scene.background.getHexString();
    if (day === night) throw Error('Day/night should change the environment');
    world.setTimeMode('cycle');
    world.update(0);
    const cycleStart = world.scene.background.getHexString();
    world.update(90000);
    if (world.scene.background.getHexString() !== cycleStart) throw Error('Reduced-motion cycle should stay static');
    const summary = { approaches, lighting: { day, night, reducedMotionCycle: cycleStart }, colliders: world.colliders.length, meshes: 0, triangles: 0 };
    const materials = new Set(), geometries = new Set();
    world.scene.traverse(object => {
      if (!object.isMesh) return;
      summary.meshes++;
      summary.triangles += (object.geometry.index?.count || object.geometry.attributes.position.count)/3;
      geometries.add(object.geometry);
      for(const material of [object.material].flat()) materials.add(material);
    });
    for(const geometry of geometries) geometry.dispose();
    for(const material of materials) material.dispose();
    return summary;
  });
  report.inventory = inventory;
  for (const target of inventory.approaches) {
    await page.close();
    page = await context.newPage();
    page.on('pageerror', error => report.errors.push(error.message));
    // Seed before app startup; writing before reload would be overwritten by pagehide saving.
    await page.addInitScript(target => sessionStorage.setItem('portfolio-house-session-v1', JSON.stringify({ ...target, pitch: 0, noticeShown: true, playableSeconds: 0 })), target);
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    if(mode)await page.locator(`[data-scene-mode="${mode}"]`).waitFor();
    await page.locator('#resume-game').click();
    await page.locator('#prompt').waitFor({ state: 'visible' });
    assert.match(await page.locator('#prompt').textContent(), new RegExp(target.label));
    await page.keyboard.press('e');
    if (target.id === 'projects') {
      await page.getByRole('dialog', { name: 'Interactive computer' }).waitFor();
      await page.locator('[data-launch="projects"]').click();
      const projects = page.locator('[data-project]');
      assert.ok(await projects.count() > 0);
      await projects.first().click();
      await page.getByRole('button', { name: 'Back to projects' }).click();
      await page.screenshot({ path: `${output}/computer.png`, fullPage: true });
      await page.locator('.pc-exit').click();
    } else {
      const dialog = page.locator('.house-interaction');
      await dialog.waitFor({ state: 'visible' });
      if (target.id === 'file') {
        await dialog.locator('.hi-pdf-pages[aria-busy="false"]').waitFor();
        assert.ok(await dialog.locator('canvas').count() > 0);
        await dialog.getByRole('tab', { name: 'Skills' }).click();
        assert.ok(await dialog.locator('.hi-skill-card').count() > 0);
      } else if (target.id === 'awards') {
        await dialog.getByRole('button', { name: 'Next achievement' }).click();
        await dialog.getByRole('button', { name: 'Previous achievement' }).click();
      } else if (target.id === 'tv') {
        await dialog.locator('[data-play]').click();
        await dialog.getByRole('button', { name: 'Next chapter' }).click();
        await dialog.getByRole('button', { name: 'Previous chapter' }).click();
      }
      await page.screenshot({ path: `${output}/${target.id}-${inventory.approaches.indexOf(target)}.png`, fullPage: true });
      await page.keyboard.press('Escape');
      assert.equal(await dialog.isVisible(), false);
    }
    report.checks.push(target.label);
  }
  await page.locator('#menu-toggle').click();
  await page.locator('#settings').click();
  for(const mode of ['day','night','cycle']) {
    await page.locator('#gs-time').selectOption(mode);
    assert.equal(await page.locator('#gs-time').inputValue(), mode);
  }
  for(const quality of ['low','balanced','high','auto']) await page.locator('#gs-quality').selectOption(quality);
  await page.getByRole('button', { name: 'Close settings' }).click();
  await page.locator('#map-toggle').click();
  await page.getByRole('heading', { name: 'House map' }).waitFor();
  await page.getByRole('button', { name: 'Close house map' }).click();
  await page.locator('.game-map-dialog').waitFor({state:'hidden'});
  await page.locator('#game-hud').waitFor({state:'visible'});
  await page.keyboard.press('p');
  await page.locator('.phone-overlay:not([hidden])').waitFor();
  await page.locator('[data-dismiss]').click();
  await page.locator('[data-phone-close]').click();
  report.checks.push('Graphics presets and day/night/cycle', 'House map open/close', 'Phone notification dismiss/close');
  assert.deepEqual(report.errors, []);
  await writeFile(`${output}/interactions.json`, JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
} catch(error) {
  report.failure=String(error);
  if(page&&!page.isClosed()) {
    report.diagnostic=await page.evaluate(()=>({focus:document.activeElement?.outerHTML.slice(0,300),openDialogs:[...document.querySelectorAll('dialog[open]')].map(node=>node.className),menuOpen:document.querySelector('#menu-toggle')?.getAttribute('aria-expanded'),phoneHidden:document.querySelector('.phone-overlay')?.hidden,mode:document.querySelector('[data-scene-mode]')?.dataset.sceneMode}));
    await page.screenshot({path:`${output}/failure.png`,fullPage:true});
  }
  await writeFile(`${output}/failure.json`,JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
  throw error;
} finally {
  await browser.close();
}
