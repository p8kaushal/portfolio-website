import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await page.goto(process.env.PORTFOLIO_URL || 'http://127.0.0.1:5174', { waitUntil: 'networkidle' });
  const result = await page.evaluate(async () => {
    const THREE = await import('/node_modules/.vite/deps/three.js');
    const { Reflector } = await import('/node_modules/three/examples/jsm/objects/Reflector.js');
    const { createEnhancedWorld } = await import('/src/enhanced-world.js');
    const { disposeWorld } = await import('/src/scene-mode.js');
    const world = createEnhancedWorld(THREE);
    world.setQuality('balanced');
    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setPixelRatio(.8); renderer.setSize(1060, 685);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.15;
    world.configureRenderer(renderer, 'balanced');
    const camera = new THREE.PerspectiveCamera(65, 1060 / 685, .1, 80);
    camera.position.set(-9.6, 1.65, 3.2); camera.lookAt(-12, 1.5, 3.2);
    const geometry = new THREE.PlaneGeometry(1.26, 2.34);
    const mirror = new Reflector(geometry, { textureWidth: 512, textureHeight: 512, color: 0xaabbb0 });
    mirror.position.set(-11.91, 1.53, 3.2); mirror.rotation.y = Math.PI / 2;
    world.scene.add(mirror);
    async function sample(enabled) {
      mirror.visible = enabled;
      for (let i = 0; i < 30; i++) { renderer.render(world.scene, camera); await new Promise(requestAnimationFrame); }
      const durations = [], intervals = [];
      let previous = performance.now();
      for (let i = 0; i < 180; i++) {
        const now = await new Promise(requestAnimationFrame); intervals.push(now - previous); previous = now;
        const start = performance.now(); renderer.render(world.scene, camera); durations.push(performance.now() - start);
      }
      const p95 = values => values.sort((a,b) => a-b)[Math.floor(values.length * .95)];
      return { frameIntervalP95: p95(intervals), renderCallP95: p95(durations) };
    }
    const withoutReflection = await sample(false);
    const withReflection = await sample(true);
    const result = { withoutReflection, withReflection, textureSize: 512, note: 'Local headless Chromium, stationary wardrobe camera, Balanced quality; render-call time is CPU submission, not GPU timing. Reflector renders the scene a second time. This is a feasibility prototype, not the production mirror.' };
    world.scene.remove(mirror); mirror.dispose(); geometry.dispose(); disposeWorld(world); renderer.dispose();
    return result;
  });
  await mkdir('test-results/changing-room', { recursive: true });
  await writeFile('test-results/changing-room/reflection-prototype.json', JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
} finally { await browser.close(); }
