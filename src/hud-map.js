// @ts-nocheck
/** Mount the circular, player-centred radar and announce room changes. */
export function mountHouseMap(container) {
  const root = document.createElement('div');
  root.className = 'house-hud';
  root.innerHTML = `<style>
    .house-hud{position:absolute;z-index:2;right:16px;top:16px;pointer-events:none;color:#f5f1df;font-family:Impact,"Arial Narrow",sans-serif;text-shadow:2px 2px #171917,-1px -1px #171917,1px -1px #171917,-1px 1px #171917}
    .house-hud[hidden]{display:none}
    .house-hud .radar{width:160px;height:160px;border-radius:50%;border:4px solid #181b18;outline:2px solid #d9d5c2;background:#aaac9e;box-shadow:3px 4px 0 #0009;overflow:hidden}
    .house-hud svg{display:block;width:100%;height:100%}
    .house-hud .house-map-head{font:900 13px Impact,"Arial Narrow",sans-serif;letter-spacing:.07em;text-transform:uppercase;text-align:center;margin:9px 0 0}
    .house-hud .house-room-toast{position:absolute;right:0;top:195px;text-align:right;white-space:nowrap;color:#f6f0d9;font:italic 900 24px Impact,"Arial Narrow",sans-serif;letter-spacing:.02em;text-transform:uppercase;opacity:0;transform:translateY(-4px);transition:opacity .2s,transform .2s;text-shadow:3px 3px #10110e,-2px -2px #10110e,2px -2px #10110e,-2px 2px #10110e}
    .house-hud .house-room-toast.visible{opacity:1;transform:none}
    @media(max-width:600px){.house-hud{right:8px;top:8px}.house-hud .radar{width:116px;height:116px;border-width:3px}.house-hud .house-map-head{font-size:11px;margin-top:6px}.house-hud .house-room-toast{top:145px;font-size:18px}}
    @media(prefers-reduced-motion:reduce){.house-hud .house-room-toast{transition:none}}
  </style><div class="house-map"><div class="radar"><svg viewBox="0 0 180 180" aria-hidden="true" focusable="false">
    <rect width="180" height="180" fill="#777d70"/>
    <g data-map>
      <rect x="0" y="0" width="280" height="180" fill="#aaa78e" stroke="#474d42" stroke-width="5"/>
      <rect x="3" y="3" width="91" height="174" fill="#b4a496"/><rect x="96" y="3" width="88" height="174" fill="#c4b9a1"/><rect x="186" y="3" width="91" height="174" fill="#a8ae9d"/>
      <path d="M95 0v55 M95 91v89 M185 0v55 M185 91v89" fill="none" stroke="#4b5148" stroke-width="5"/>
      <rect x="38" y="38" width="34" height="44" fill="#967c70"/><rect x="118" y="122" width="44" height="13" fill="#7c8977"/><rect x="192" y="20" width="57" height="17" fill="#947f6c"/>
      <circle cx="215.5" cy="38" r="6" fill="#e9c77e" stroke="#30382e" stroke-width="2"/>
    </g>
    <g data-player transform="translate(90 90)"><circle r="9" fill="#f5f0dc" stroke="#171a17" stroke-width="2"/><path data-arrow d="M0 -8 L5 6 L0 3 L-5 6 Z" fill="#253b30"/></g>
    <text x="90" y="15" text-anchor="middle" fill="#f8f4e4" stroke="#171a17" stroke-width="2" paint-order="stroke" font-size="12" font-family="sans-serif" font-weight="bold">N</text>
  </svg></div><div class="house-map-head" data-room>Living room</div></div><div class="house-room-toast" aria-hidden="true"></div><div data-announcement aria-live="polite" style="position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)"></div>`;
  container.appendChild(root);
  const map = root.querySelector('[data-map]');
  const arrow = root.querySelector('[data-arrow]');
  const label = root.querySelector('[data-room]');
  const toast = root.querySelector('.house-room-toast');
  const announcement = root.querySelector('[data-announcement]');
  let room = '', timer;
  return {
    update(x, z, yaw) {
      const px = (x + 14) * 10;
      const pz = (z + 8) * 10;
      map.setAttribute('transform', `translate(${(90-px).toFixed(1)} ${(90-pz).toFixed(1)})`);
      arrow.setAttribute('transform', `rotate(${(-yaw * 180 / Math.PI).toFixed(1)})`);
      const next = x < -4.5 ? 'Bedroom' : x > 4.5 ? 'Studio' : 'Living room';
      if (next !== room) {
        const initial = !room;
        room = next;
        label.textContent = room;
        root.setAttribute('aria-label', `House radar. Current room: ${room}.`);
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
