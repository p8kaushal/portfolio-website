// @ts-nocheck
/** Mount a small, non-interactive floor plan and announce room changes. */
export function mountHouseMap(container) {
  const root = document.createElement('div');
  root.className = 'house-hud';
  root.innerHTML = `<style>
    .house-hud{position:absolute;z-index:2;right:16px;top:16px;pointer-events:none;color:#f7f6ec;font-family:system-ui,sans-serif}
    .house-hud[hidden]{display:none}
    .house-hud .house-map{background:#263b31e8;border:1px solid #d9dfcf99;padding:8px;box-shadow:0 4px 16px #24352a44;width:168px}
    .house-hud .house-map-head{display:flex;justify-content:space-between;align-items:baseline;gap:5px;margin-bottom:5px;font:700 9px monospace;letter-spacing:.08em;text-transform:uppercase}
    .house-hud .house-map-head span{color:#dcc398;text-align:right}
    .house-hud svg{display:block;width:150px;height:auto;background:#e5d5b8}
    .house-hud .house-room-toast{position:absolute;right:0;top:122px;text-align:right;white-space:nowrap;background:#263b31e8;padding:8px 10px;font:700 10px monospace;letter-spacing:.09em;text-transform:uppercase;opacity:0;transform:translateY(-4px);transition:opacity .2s,transform .2s}
    .house-hud .house-room-toast.visible{opacity:1;transform:none}
    @media(max-width:600px){.house-hud{right:8px;top:8px}.house-hud .house-map{width:126px;padding:6px}.house-hud svg{width:112px}.house-hud .house-map-head{font-size:8px}.house-hud .house-room-toast{top:95px;font-size:9px}}
    @media(prefers-reduced-motion:reduce){.house-hud .house-room-toast{transition:none}}
  </style><div class="house-map"><div class="house-map-head"><b>House map</b><span data-room>Living room</span></div>
    <svg viewBox="0 0 280 180" aria-hidden="true" focusable="false">
      <rect x="0" y="0" width="280" height="180" fill="#d7c8aa"/>
      <rect x="3" y="3" width="91" height="174" fill="#d8bfaa"/><rect x="96" y="3" width="88" height="174" fill="#d5c6a9"/><rect x="186" y="3" width="91" height="174" fill="#c4c9b0"/>
      <path d="M95 0v55 M95 91v89 M185 0v55 M185 91v89" fill="none" stroke="#5b6a58" stroke-width="4"/>
      <rect x="0" y="0" width="280" height="180" fill="none" stroke="#5b6a58" stroke-width="5"/>
      <text x="48" y="20" text-anchor="middle" fill="#6d6b5b" font-size="9" font-family="monospace" font-weight="bold">BEDROOM</text>
      <text x="140" y="20" text-anchor="middle" fill="#6d6b5b" font-size="9" font-family="monospace" font-weight="bold">LIVING</text>
      <text x="232" y="20" text-anchor="middle" fill="#6d6b5b" font-size="9" font-family="monospace" font-weight="bold">STUDIO</text>
      <rect x="38" y="38" width="34" height="44" rx="2" fill="#b98e7a"/><rect x="118" y="122" width="44" height="13" rx="2" fill="#849681"/><rect x="192" y="20" width="57" height="17" rx="2" fill="#a08065"/>
      <circle cx="215.5" cy="38" r="4" fill="#bd704b"/>
      <g data-player><circle r="9" fill="#f9f6e7" opacity=".95"/><path d="M0 -8 L5 6 L0 3 L-5 6 Z" fill="#2f5540"/></g>
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
