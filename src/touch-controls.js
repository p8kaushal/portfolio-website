// @ts-nocheck
/**
 * Touch controls for the house. The canvas remains the independent look area,
 * so one finger can move while a second finger drags the scene to look.
 * @param {HTMLElement} container The positioned scene element.
 * @param {{onMove:(x:number,y:number)=>void,onSprint:(down:boolean)=>void,onCrouch:(down:boolean)=>void,onJump:()=>void,onInteract:()=>void}} callbacks
 */
export function mountTouchControls(container, callbacks) {
  const root = document.createElement('div');
  root.className = 'touch-controls';
  root.hidden = true;
  root.innerHTML = `<style>
    .touch-controls{display:none;position:absolute;inset:0;z-index:4;pointer-events:none;font-family:system-ui,sans-serif;color:#fff}
    .touch-controls[hidden]{display:none!important}
    @media (any-pointer:coarse){.touch-controls:not([hidden]){display:block}}
    .touch-controls .touch-stick{position:absolute;left:16px;bottom:16px;width:112px;height:112px;border:2px solid #f3e5c699;border-radius:50%;background:#1f2c20a6;box-shadow:0 2px 0 #10150fc9,inset 0 0 0 1px #10150f;touch-action:none;pointer-events:auto;user-select:none;-webkit-user-select:none}
    .touch-controls .touch-stick:focus-visible,.touch-controls button:focus-visible{outline:3px solid #ffe0a1;outline-offset:3px}
    .touch-controls .touch-knob{position:absolute;left:50%;top:50%;width:46px;height:46px;margin:-23px;border:2px solid #e9dcbccc;border-radius:50%;background:#c5b594a6;box-shadow:0 2px 3px #0006;pointer-events:none;will-change:transform}
    .touch-controls .touch-actions{position:absolute;right:14px;bottom:14px;display:grid;grid-template-columns:repeat(2,minmax(58px,auto));gap:7px;pointer-events:auto}
    .touch-controls button{min-width:58px;min-height:48px;border:2px solid #171a13;background:#2b382bee;box-shadow:2px 2px #11150f;color:#f9edcf;font:700 11px system-ui,sans-serif;letter-spacing:.04em;text-transform:uppercase;touch-action:none;user-select:none;-webkit-user-select:none;cursor:pointer}
    .touch-controls button:active,.touch-controls button[aria-pressed=true]{background:#846542;color:#fff6da}
    @media(max-width:430px){.touch-controls .touch-stick{width:92px;height:92px;left:10px;bottom:10px}.touch-controls .touch-knob{width:38px;height:38px;margin:-19px}.touch-controls .touch-actions{right:10px;bottom:10px;gap:4px}.touch-controls button{min-width:51px;min-height:43px;font-size:10px}}
  </style><div class="touch-stick" role="application" aria-label="Movement joystick. Drag to move; use the keyboard movement keys when available."><span class="touch-knob"></span></div><div class="touch-actions" aria-label="Game actions"><button type="button" data-hold="sprint" aria-label="Hold to sprint">Run</button><button type="button" data-hold="crouch" aria-label="Hold to crouch">Crouch</button><button type="button" data-action="jump">Jump</button><button type="button" data-action="interact">Use</button></div>`;
  container.appendChild(root);
  const stick = root.querySelector('.touch-stick');
  const knob = root.querySelector('.touch-knob');
  const held = new Map();
  let stickPointer = null;
  function setStick(e) {
    const r = stick.getBoundingClientRect();
    const radius = Math.min(r.width, r.height) * .34;
    let x = (e.clientX - (r.left + r.width / 2)) / radius;
    let y = (e.clientY - (r.top + r.height / 2)) / radius;
    const distance = Math.hypot(x, y);
    if (distance > 1) { x /= distance; y /= distance; }
    if (distance < .1) { x = 0; y = 0; }
    knob.style.transform = `translate(${x * radius}px, ${y * radius}px)`;
    callbacks.onMove(x, -y);
  }
  function resetStick() {
    stickPointer = null;
    knob.style.transform = '';
    callbacks.onMove(0, 0);
  }
  stick.addEventListener('pointerdown', e => {
    if (stickPointer !== null) return;
    e.preventDefault(); stickPointer = e.pointerId;
    stick.setPointerCapture(e.pointerId); setStick(e);
  });
  stick.addEventListener('pointermove', e => { if (e.pointerId === stickPointer) { e.preventDefault(); setStick(e); } });
  for (const event of ['pointerup','pointercancel','lostpointercapture']) stick.addEventListener(event, e => { if (e.pointerId === stickPointer) resetStick(); });
  for (const button of root.querySelectorAll('[data-hold]')) {
    const name = button.dataset.hold;
    const change = name === 'sprint' ? callbacks.onSprint : callbacks.onCrouch;
    function release() {
      if (!held.has(name)) return;
      held.delete(name); button.setAttribute('aria-pressed','false'); change(false);
    }
    button.addEventListener('pointerdown', e => {
      if (held.has(name)) return;
      e.preventDefault(); held.set(name, e.pointerId); button.setPointerCapture(e.pointerId);
      button.setAttribute('aria-pressed','true'); change(true);
    });
    for (const event of ['pointerup','pointercancel','lostpointercapture']) button.addEventListener(event, e => { if (held.get(name) === e.pointerId) release(); });
    button.addEventListener('keydown', e => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat && !held.has(name)) { e.preventDefault(); held.set(name, 'keyboard'); button.setAttribute('aria-pressed','true'); change(true); } });
    button.addEventListener('keyup', e => { if ((e.key === ' ' || e.key === 'Enter') && held.get(name) === 'keyboard') { e.preventDefault(); release(); } });
    button.addEventListener('blur', () => { if (held.get(name) === 'keyboard') release(); });
  }
  // Trigger on pointer down so a second finger can jump while the joystick is held.
  // Keyboard and assistive-technology clicks have detail 0 and remain supported.
  for (const [action, callback] of [['jump', callbacks.onJump], ['interact', callbacks.onInteract]]) {
    const button = root.querySelector(`[data-action=${action}]`);
    button.addEventListener('pointerdown', e => { e.preventDefault(); callback(); });
    button.addEventListener('click', e => { if (e.detail === 0) callback(); });
  }
  function reset() {
    resetStick();
    for (const [name] of held) {
      const button = root.querySelector(`[data-hold=${name}]`);
      button.setAttribute('aria-pressed','false');
      (name === 'sprint' ? callbacks.onSprint : callbacks.onCrouch)(false);
    }
    held.clear();
  }
  window.addEventListener('blur', reset);
  return {
    setVisible(visible) { if (root.hidden === !visible) return; if (!visible) reset(); root.hidden = !visible; },
    reset,
    destroy() { reset(); window.removeEventListener('blur', reset); root.remove(); }
  };
}
