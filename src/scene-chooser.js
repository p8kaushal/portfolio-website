// @ts-nocheck
import { browserSceneChoice, saveScenePreference, recoveryKey } from './scene-mode.js';

export function mountSceneChooser(host, { onApply = () => {}, compact = false } = {}) {
  const root = document.createElement('section');
  root.className = `scene-choice${compact ? ' scene-choice-compact' : ''}`;
  const id = compact ? 'settings-house-style' : 'house-style';
  root.innerHTML = `<style>
    .scene-choice{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin:0 0 20px;color:#eee3ce;font:13px/1.5 system-ui,sans-serif}.scene-choice label{font-weight:700}.scene-choice select,.scene-choice button{font:inherit;min-height:40px;padding:8px 12px;border:1px solid #9e967f;border-radius:5px;background:#e9dfcf;color:#283b3c}.scene-choice button{cursor:pointer;font-weight:700}.scene-choice a{color:#edc78d}.scene-choice [role=status]{flex-basis:100%;font-size:12px;color:#d5c9b0}.scene-choice-compact{margin:16px 0 0;padding:15px;border:1px solid #716d55}.scene-choice :focus-visible{outline:3px solid #e5b76e;outline-offset:3px}
  </style><label for="${id}">House style</label><select id="${id}"><option value="auto">Automatic</option><option value="enhanced">Enhanced house</option><option value="classic">Classic house</option></select><button type="button">Apply view</button><a href="/2d/index.html" data-sveltekit-reload>2D portfolio ↗</a><span role="status" aria-live="polite">Preparing the house…</span>`;
  host.append(root);
  const select = root.querySelector('select'), status = root.querySelector('[role=status]');
  root.querySelector('button').disabled = true;
  select.value = browserSceneChoice().preference;
  root.querySelector('button').onclick = () => {
    let saved = false;
    try { saved = saveScenePreference(localStorage, select.value); } catch { /* Still allow an in-memory choice. */ }
    try { sessionStorage.removeItem(recoveryKey); } catch { /* Storage is optional. */ }
    onApply(select.value, saved);
  };
  return {
    setPreference(mode) { select.value=mode; },
    setStatus(mode, recovered = false) {
      root.querySelector('button').disabled = false;
      status.textContent = mode==='unavailable' ? '3D rendering is unavailable here. Use the portfolio menu or the 2D portfolio.' : recovered ? 'Classic house is active because the enhanced view was unavailable. You can retry with Apply view.' : mode === 'enhanced' ? 'Enhanced house · a creative studio above the city. Classic and 2D are always available.' : 'Classic house · lighter rendering. Choose Enhanced house to try the new view.';
    },
    destroy() { root.remove(); }
  };
}
