// @ts-nocheck
import { portfolio } from './content.js';

/**
 * Mount the always-available portfolio navigation.
 * @param {HTMLElement} host
 * @param {{onOpen?: () => void, onClose?: () => void}} [options]
 * @returns {{open: (section?: string) => void, close: () => void, destroy: () => void}}
 */
export function mountPortfolioUI(host, options = {}) {
  const sections = [
    ['about', 'About'], ['projects', 'Projects'], ['skills', 'Skills'],
    ['experience', 'Experience'], ['achievements', 'Achievements'], ['contact', 'Contact']
  ];
  const wrapper = document.createElement('div');
  wrapper.className = 'portfolio-quick';
  wrapper.innerHTML = `<style>
    .portfolio-quick{font-family:system-ui,sans-serif;color:#25382f}
    .portfolio-quick *{box-sizing:border-box}
    .portfolio-quick .pq-bar{display:flex;align-items:center;gap:.6rem;flex-wrap:wrap}
    .portfolio-quick button,.portfolio-quick a{font:inherit}
    .portfolio-quick .pq-launch,.portfolio-quick .pq-resume{border:1px solid #d2d8c8;border-radius:3px;background:#f8f7ec;color:#25382f;padding:.7rem 1rem;font-weight:700;font-size:.8rem;text-decoration:none;cursor:pointer}
    .portfolio-quick .pq-resume{background:#647e67;border-color:#647e67;color:#fff}
    .portfolio-quick :focus-visible{outline:3px solid #db855c;outline-offset:3px}
    .portfolio-quick dialog{width:min(900px,calc(100vw - 2rem));max-height:min(760px,calc(100dvh - 2rem));border:1px solid #c9d0bf;padding:0;background:#f8f7ed;color:#26392f;box-shadow:0 24px 80px #18251f66;overflow:auto}
    .portfolio-quick dialog::backdrop{background:#18251fb8}
    .portfolio-quick .pq-top{display:flex;align-items:start;justify-content:space-between;gap:1rem;padding:1.5rem 1.75rem 1rem}
    .portfolio-quick .pq-kicker{margin:0 0 .35rem;color:#a96948;font:700 .65rem monospace;letter-spacing:.14em;text-transform:uppercase}
    .portfolio-quick h2{font-size:clamp(1.5rem,4vw,2.25rem);letter-spacing:-.045em;margin:0}
    .portfolio-quick .pq-close{border:1px solid #d7ddce;background:#edf0e6;color:#26392f;font-size:1.3rem;width:2.4rem;height:2.4rem;cursor:pointer}
    .portfolio-quick nav{display:flex;gap:.35rem;flex-wrap:wrap;padding:0 1.75rem 1rem;border-bottom:1px solid #dfe3d8}
    .portfolio-quick nav button{padding:.5rem .65rem;background:transparent;color:#53675a;border:0;border-bottom:2px solid transparent;cursor:pointer;font-size:.8rem;font-weight:700}
    .portfolio-quick nav button[aria-current="page"]{color:#26392f;border-color:#cd825a}
    .portfolio-quick .pq-body{padding:1rem 1.75rem 2rem;line-height:1.6;font-size:.92rem}
    .portfolio-quick .pq-body h3{font-size:1rem;margin:0 0 .15rem}
    .portfolio-quick .pq-body p{color:#5b6a60;margin:.35rem 0 .75rem}
    .portfolio-quick .pq-item{border-bottom:1px solid #e0e4da;padding:1rem 0}
    .portfolio-quick .pq-meta{font-size:.75rem;color:#a26c4f;font-weight:700}
    .portfolio-quick .pq-body a{color:#385f49;overflow-wrap:anywhere}
    @media(max-width:600px){.portfolio-quick .pq-top{padding:1.2rem}.portfolio-quick nav{padding:0 1.2rem .8rem}.portfolio-quick .pq-body{padding:.7rem 1.2rem 1.5rem}}
  </style><div class="pq-bar"><button type="button" class="pq-launch">Portfolio menu</button><a class="pq-resume" target="_blank" rel="noopener">Résumé ↗</a></div>
  <dialog aria-labelledby="pq-heading"><div class="pq-top"><div><p class="pq-kicker">Parth Kaushal · Portfolio</p><h2 id="pq-heading" tabindex="-1"></h2></div><button class="pq-close" type="button" aria-label="Close portfolio menu">×</button></div><nav aria-label="Portfolio sections"></nav><div class="pq-body"></div></dialog>`;
  host.appendChild(wrapper);
  const dialog = wrapper.querySelector('dialog');
  const heading = wrapper.querySelector('#pq-heading');
  const body = wrapper.querySelector('.pq-body');
  const nav = wrapper.querySelector('nav');
  const resume = wrapper.querySelector('.pq-resume');
  resume.href = portfolio.resumeUrl;
  const textElement = (tag, text, className) => {
    const element = document.createElement(tag);
    element.textContent = text;
    if (className) element.className = className;
    return element;
  };
  const buttons = new Map();
  for (const [id, label] of sections) {
    const button = textElement('button', label);
    button.type = 'button';
    button.addEventListener('click', () => select(id));
    nav.appendChild(button);
    buttons.set(id, button);
  }
  function select(id) {
    const item = sections.find(([key]) => key === id) || sections[0];
    const [key, label] = item;
    heading.textContent = label;
    for (const [name, button] of buttons) {
      if (name === key) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    }
    body.replaceChildren();
    if (key === 'about') {
      body.append(textElement('h3', portfolio.title));
      for (const paragraph of portfolio.about) body.append(textElement('p', paragraph));
      body.append(textElement('p', portfolio.availability));
    } else {
      for (const entry of portfolio[key]) {
        const card = document.createElement('div');
        card.className = 'pq-item';
        card.append(textElement('h3', entry.title));
        if (entry.meta) card.append(textElement('div', entry.meta, 'pq-meta'));
        if (entry.description) card.append(textElement('p', entry.description));
        if (entry.details) card.append(textElement('p', entry.details));
        if (entry.label) {
          if (entry.href) {
            const link = textElement('a', entry.label);
            link.href = entry.href;
            if (entry.href.startsWith('https:')) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
            card.append(link);
          } else card.append(textElement('p', entry.label));
        }
        body.append(card);
      }
    }
    dialog.scrollTop = 0;
  }
  function open(section = 'about') {
    select(section);
    if (!dialog.open) { options.onOpen?.(); dialog.showModal(); }
    heading.focus();
  }
  function close() { if (dialog.open) dialog.close(); }
  wrapper.querySelector('.pq-launch').addEventListener('click', () => open());
  wrapper.querySelector('.pq-close').addEventListener('click', close);
  dialog.addEventListener('close', () => options.onClose?.());
  return { open, close, destroy() { if (dialog.open) dialog.close(); wrapper.remove(); } };
}
