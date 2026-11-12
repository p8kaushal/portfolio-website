/** Scene choice is a user preference; hardware hints only choose an initial default. */
export const scenePreferenceKey = 'portfolio-house-scene-v1';
export const recoveryKey = 'portfolio-house-scene-recovery-v1';
const modes = ['auto', 'enhanced', 'classic'];

/** @param {Pick<Storage, 'getItem'>} storage */
export function readScenePreference(storage) {
  try {
    const saved = JSON.parse(storage.getItem(scenePreferenceKey) || 'null');
    return modes.includes(saved?.mode) ? saved.mode : 'auto';
  } catch { return 'auto'; }
}

/** @param {Pick<Storage, 'setItem'>} storage @param {string} mode */
export function saveScenePreference(storage, mode) {
  if (!modes.includes(mode)) return false;
  try { storage.setItem(scenePreferenceKey, JSON.stringify({ mode })); return true; }
  catch { return false; }
}

export function resolveSceneMode({ preference = 'auto', coarsePointer = false, memory = 0, cores = 0, recovery = false } = {}) {
  if (preference === 'classic' || recovery) return 'classic';
  if (preference === 'enhanced') return 'enhanced';
  return coarsePointer || (memory > 0 && memory <= 4) || (cores > 0 && cores <= 4) ? 'classic' : 'enhanced';
}

export function browserSceneChoice() {
  let preference = 'auto', recovery = false;
  try { preference = readScenePreference(localStorage); } catch { /* Storage can be denied. */ }
  try { recovery = sessionStorage.getItem(recoveryKey) === 'classic'; } catch { /* Session recovery is best effort. */ }
  const device = /** @type {Navigator & {deviceMemory?: number}} */ (navigator);
  return { preference, effective: resolveSceneMode({ preference, recovery, coarsePointer: matchMedia('(any-pointer:coarse)').matches, memory: Number(device.deviceMemory) || 0, cores: Number(device.hardwareConcurrency) || 0 }), recovery };
}

/** Dispose each shared GPU resource once, including generated texture maps.
 * @param {{scene: any} | undefined} world Three.js is an untyped external boundary in this JS project.
 */
export function disposeWorld(world) {
  if (!world?.scene) return;
  const geometries = new Set(), materials = new Set(), textures = new Set();
  world.scene.traverse((/** @type {any} */ object) => {
    if (object.geometry) geometries.add(object.geometry);
    for (const material of [object.material].flat().filter(Boolean)) {
      materials.add(material);
      for (const value of Object.values(material)) if (value?.isTexture) textures.add(value);
    }
  });
  for (const texture of textures) texture.dispose();
  for (const geometry of geometries) geometry.dispose();
  for (const material of materials) material.dispose();
  world.scene.clear();
}

/** The enhanced module stays out of the classic startup path.
 * @param {any} THREE
 * @param {string} mode
 * @param {{loadEnhanced?: () => any, createClassic: (three: any) => any, timeoutMs?: number}} options
 */
export async function loadScene(THREE, mode, { loadEnhanced = () => import('./enhanced-world.js'), createClassic, timeoutMs = 12000 }) {
  if (mode === 'classic') return { world: createClassic(THREE), mode: 'classic', recovered: false };
  let expired = false, timer;
  const enhanced = Promise.resolve().then(loadEnhanced).then(module => module.createEnhancedWorld(THREE)).then(world => {
    if (expired) { disposeWorld(world); throw new Error('Enhanced scene expired'); }
    return world;
  });
  try {
    const world = await Promise.race([enhanced, new Promise((_, reject) => { timer = setTimeout(() => { expired = true; reject(new Error('Enhanced scene timed out')); }, timeoutMs); })]);
    return { world, mode: 'enhanced', recovered: false };
  } catch (error) {
    return { world: createClassic(THREE), mode: 'classic', recovered: true, recoveryReason: error instanceof Error ? error.message : 'Enhanced scene unavailable' };
  } finally { clearTimeout(timer); }
}
