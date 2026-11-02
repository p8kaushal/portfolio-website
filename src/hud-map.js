// @ts-nocheck
/** Mount a small, non-interactive floor plan and announce room changes. */
export function mountHouseMap(container) {
  const root = document.createElement('div');
  root.className = 'house-hud';
  root.innerHTML = `<style>
    .house-hud{position:absolute;z-index:2;right:16px;top:16px;pointer-events:none;color:#fff6dc;font-family:Impact,"Arial Narrow",sans-serif;text-shadow:2px 2px 0 #111,-1px -1px 0 #111,1px -1px 0 #111,-1px 1px 0 #111}
    .house-hud[hidden]{display:none}
    .house-hud .house-map{background:#302d21;border:3px solid #171815;outline:2px solid #e3d2a5;padding:4px;box-shadow:4px 5px 0 #0008;width:178px}
    .house-hud .house-map-head{display:flex;justify-content:space-between;align-items:baseline;gap:5px;margin-bottom:4px;padding:2px 3px;font:900 11px Impact,"Arial Narrow",sans-serif;letter-spacing:.08em;text-transform:uppercase}
    .house-hud .house-map-head span{color:#ffe0a0;text-align:right}
    .house-hud svg{display:block;width:164px;height:auto;background:#b7a378;image-rendering:pixelated}
    .house-hud .house-room-toast{position:absolute;right:0;top:125px;text-align:right;white-space:nowrap;color:#fff4cd;font:italic 900 24px Impact,"Arial Narrow",sans-serif;letter-spacing:.02em;text-transform:uppercase;opacity:0;transform:translateY(-4px);transition:opacity .2s,transform .2s;text-shadow:3px 3px 0 #10110e,-2px -2px 0 #10110e,2px -2px 0 #10110e,-2px 2px 0 #10110e}
    .house-hud .house-room-toast.visible{opacity:1;transform:none}
    @media(max-width:600px){.house-hud{right:8px;top:8px}.house-hud .house-map{width:132px;padding:3px;border-width:2px}.house-hud svg{width:122px}.house-hud .house-map-head{font-size:9px}.house-hud .house-room-toast{top:101px;font-size:18px}}
    @media(prefers-reduced-motion:reduce){.house-hud .house-room-toast{transition:none}}
  </style><div class="house-map"><div class="house-map-head"><b>House map</b><span data-room>Living room</span></div>
    <svg viewBox="0 0 280 180" aria-hidden="true" focusable="false">
      <rect x="0" y="0" width="280" height="180" fill="#c5b58e"/>
      <rect x="3" y="3" width="91" height="174" fill="#bb9d79"/><rect x="96" y="3" width="88" height="174" fill="#d2ba8e"/><rect x="186" y="3" width="91" height="174" fill="#b3b190"/>
      <path d="M95 0v55 M95 91v89 M185 0v55 M185 91v89" fill="none" stroke="#343a2c" stroke-width="4"/>
      <rect x="0" y="0" width="280" height="180" fill="none" stroke="#343a2c" stroke-width="5"/>
      <text x="48" y="20" text-anchor="middle" fill="#433e2d" font-size="9" font-family="monospace" font-weight="bold">BEDROOM</text>
      <text x="140" y="20" text-anchor="middle" fill="#433e2d" font-size="9" font-family="monospace" font-weight="bold">LIVING</text>
      <text x="232" y="20" text-anchor="middle" fill="#433e2d" font-size="9" font-family="monospace" font-weight="bold">STUDIO</text>
      <rect x="38" y="38" width="34" height="44" rx="2" fill="#b98e7a"/><rect x="118" y="122" width="44" height="13" rx="2" fill="#849681"/><rect x="192" y="20" width="57" height="17" rx="2" fill="#a08065"/>
      <circle cx="215.5" cy="38" r="4" fill="#eaa23b"/>
      <g data-player><circle r="9" fill="#fff5d5" stroke="#171815" stroke-width="2"/><path d="M0 -8 L5 6 L0 3 L-5 6 Z" fill="#253b30"/></g>
    </svg></div><div class="house-room-toast" aria-hidden="true"></div><div data-announcement aria-live="polite" style="position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)"></div>`;
  container.appendChild(root);
  const arrow = root.querySelector('[data-player]');
  const label = root.querySelector('[data-room]');
  const toast = root.querySelector('.house-room-toast');
  const announcement = root.querySelector('[data-announcement]');
  let room = '', timer;
  return {
    update(x, z, yaw) {
      const px = Math.max(5, Math.min(275, (x + 14) * 10));
      const pz = Math.max(5, Math.min(175, (z + 8) * 10));
      arrow.setAttribute('transform', `translate(${px.toFixed(1)} ${pz.toFixed(1)}) rotate(${(-yaw * 180 / Math.PI).toFixed(1)})`);
      const next = x < -4.5 ? 'Bedroom' : x > 4.5 ? 'Studio' : 'Living room';
      if (next !== room) {
        const initial = !room;
        room = next;
        label.textContent = room;
        root.setAttribute('aria-label', `House map. Current room: ${room}.`);
        if (!initial) {
          announcement.textContent = `Entering ${room}`;
          toast.textContent = `Entering ${room}`;
          toast.classList.add('visible');
          clearTimeout(timer);
          timer = setTimeout(() => toast.classList.remove('visible'), 2400);
        }
      }
    },
    setVisible(visible) { root.hidden = !visible; },
    destroy() { clearTimeout(timer); root.remove(); }
  };
}
