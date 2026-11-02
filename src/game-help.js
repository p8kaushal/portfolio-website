// @ts-nocheck
/** An accessible, self-contained controls guide for the playable house. */
export function mountGameHelp(host, { onOpen = () => {}, onClose = () => {} } = {}) {
  const dialog = document.createElement('dialog');
  dialog.className = 'game-help';
  dialog.setAttribute('aria-labelledby', 'game-help-title');
  dialog.innerHTML = `<style>
    .game-help{box-sizing:border-box;width:min(760px,calc(100vw - 24px));max-height:calc(100dvh - 24px);margin:auto;padding:0;overflow:auto;border:3px solid #171b14;background:#33392d;color:#f2e3c6;box-shadow:5px 5px #1118;font-family:Arial,system-ui,sans-serif}
    .game-help::backdrop{background:#10140fd9}.game-help *{box-sizing:border-box}.game-help button{font:inherit;cursor:pointer}.game-help :focus-visible{outline:3px solid #f1be73;outline-offset:3px}
    .gh-head{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:17px 22px;background:#24291f;border-bottom:2px solid #141810}.gh-kicker{font:700 10px monospace;letter-spacing:.12em;text-transform:uppercase;color:#d5a16d}.gh-head h2{margin:5px 0 0;font:900 28px/1 Impact,'Arial Narrow',sans-serif;text-transform:uppercase;letter-spacing:.04em}.gh-close{flex:none;min-height:44px;min-width:44px;touch-action:manipulation;padding:9px 14px;color:#20271c;background:#dfcda9;border:2px solid #10150e;box-shadow:2px 2px #0c100b;font-weight:800}
    .gh-content{padding:20px 22px 24px}.gh-content>p{margin:0 0 18px;color:#d0c5ac;font-size:13px;line-height:1.5}.gh-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.gh-section{background:#272e24;border:1px solid #716d55;padding:16px}.gh-section h3{margin:0 0 12px;color:#e1b984;font:700 11px monospace;letter-spacing:.12em;text-transform:uppercase}.gh-row{display:flex;align-items:center;gap:12px;padding:6px 0;color:#efe2ca;font-size:13px}.gh-keys{min-width:112px;display:flex;gap:4px;flex-wrap:wrap}.gh-key{display:inline-grid;place-items:center;min-width:25px;min-height:25px;padding:3px 6px;background:#e1d0ad;color:#273020;border:1px solid #0f170d;box-shadow:2px 2px #0e140d;font:700 10px monospace}.gh-touch{padding:7px 0;border-bottom:1px solid #4b5140;font-size:13px;line-height:1.45;color:#eee1c7}.gh-touch:last-child{border:0}.gh-tip{margin-top:14px;padding:12px 14px;border-left:3px solid #c9995f;background:#403e2d;color:#e8d8bc;font-size:12px;line-height:1.55}
    @media(max-width:600px){.gh-head{padding:14px 16px}.gh-content{padding:16px}.gh-grid{grid-template-columns:1fr}.gh-head h2{font-size:24px}.gh-row{font-size:12px}.gh-keys{min-width:100px}}
  </style><header class="gh-head"><div><div class="gh-kicker">The portfolio house / player guide</div><h2 id="game-help-title">Controls &amp; help</h2></div><button type="button" class="gh-close" aria-label="Close controls and help">Close ×</button></header><div class="gh-content"><p>Explore at your own pace. Look for highlighted objects and use them to learn more about Parth.</p><div class="gh-grid"><section class="gh-section" aria-labelledby="gh-desktop"><h3 id="gh-desktop">Keyboard &amp; mouse</h3><div class="gh-row"><span class="gh-keys"><span class="gh-key">W A S D</span><span class="gh-key">↑ ← ↓ →</span></span> Move</div><div class="gh-row"><span class="gh-keys"><span class="gh-key">MOUSE</span></span> Look around</div><div class="gh-row"><span class="gh-keys"><span class="gh-key">E</span></span> Use nearby object</div><div class="gh-row"><span class="gh-keys"><span class="gh-key">P</span></span> Open phone</div><div class="gh-row"><span class="gh-keys"><span class="gh-key">M</span></span> Open house map</div><div class="gh-row"><span class="gh-keys"><span class="gh-key">SHIFT</span></span> Hold to sprint</div><div class="gh-row"><span class="gh-keys"><span class="gh-key">SPACE</span></span> Jump</div><div class="gh-row"><span class="gh-keys"><span class="gh-key">C</span></span> Hold to crouch</div><div class="gh-row"><span class="gh-keys"><span class="gh-key">ESC</span></span> Close or release the mouse</div></section><section class="gh-section" aria-labelledby="gh-touch"><h3 id="gh-touch">Touch screen</h3><div class="gh-touch"><strong>Move:</strong> drag the joystick on the left.</div><div class="gh-touch"><strong>Look:</strong> drag the scene with another finger.</div><div class="gh-touch"><strong>Actions:</strong> tap Jump or Use; hold Run or Crouch.</div><div class="gh-touch"><strong>Phone:</strong> use the phone control in the game.</div><div class="gh-touch"><strong>Landscape:</strong> turn your phone sideways for the best play area. Use fullscreen where your browser supports it.</div></section></div><div class="gh-tip">The portfolio menu and résumé remain available for quick access. The circular radar shows your position, nearby rooms and points of interest.</div></div>`;
  host.appendChild(dialog);
  const closeButton = dialog.querySelector('.gh-close');
  let priorFocus = null;
  function close() {
    if (!dialog.open) return;
    dialog.close();
    onClose();
    if (priorFocus?.isConnected) priorFocus.focus();
  }
  closeButton.addEventListener('click', close);
  dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
  return {
    open() {
      if (dialog.open) return;
      priorFocus = document.activeElement;
      onOpen();
      dialog.showModal();
      closeButton.focus();
    },
    close,
    destroy() { if (dialog.open) dialog.close(); dialog.remove(); }
  };
}
