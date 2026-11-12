// @ts-nocheck
import { portfolio } from './content.js';

/** Mount the direct, accessible portfolio alongside the interactive house.
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
    .portfolio-quick{font-family:system-ui,-apple-system,sans-serif;color:#f4e7c9}
    .portfolio-quick *{box-sizing:border-box}
    .portfolio-quick .pq-bar{display:flex;align-items:center;gap:.6rem;flex-wrap:wrap}
    .portfolio-quick button,.portfolio-quick a{font:inherit}
    .portfolio-quick .pq-launch,.portfolio-quick .pq-resume{border:1px solid #d2d8c8;border-radius:3px;background:#f8f7ec;color:#25382f;padding:.7rem 1rem;font-size:.8rem;font-weight:700;text-decoration:none;cursor:pointer}
    .portfolio-quick .pq-resume{background:#647e67;color:#fff;border-color:#647e67}
    .portfolio-quick :focus-visible{outline:3px solid #d97742;outline-offset:3px}
    .portfolio-quick dialog{width:min(1040px,calc(100vw - 2rem));height:min(850px,calc(100dvh - 2rem));max-width:none;max-height:none;padding:0;border:3px solid #171a15;background:#f1eadb;color:#26362c;box-shadow:8px 8px #171a15,0 24px 80px #10181199;overflow:auto;scroll-behavior:auto}
    .portfolio-quick dialog::backdrop{background:#151b16d9}
    .portfolio-quick .pq-top{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;background:#343d2d;color:#f5e8ca;padding:clamp(1.4rem,4vw,3rem);border-bottom:4px solid #b57643}
    .portfolio-quick .pq-kicker{color:#dfae79;text-transform:uppercase;letter-spacing:.12em;font:700 .68rem/1.5 monospace;margin:0 0 .55rem}
    .portfolio-quick .pq-top h2{font:900 clamp(2.2rem,6vw,4rem)/1 Impact,'Arial Narrow',sans-serif;letter-spacing:.025em;text-transform:uppercase;margin:0 0 .6rem}
    .portfolio-quick .pq-role{margin:0;color:#e2d5bc;font-size:1rem;line-height:1.5}.portfolio-quick .pq-cv{display:inline-block;color:#f5e8ca;margin-top:.9rem;font-size:.85rem;font-weight:700;text-underline-offset:.2em}
    .portfolio-quick nav .pq-close{margin-left:auto;background:#334638;border:1px solid #243328;color:#fff3d9;padding:.5rem .7rem;cursor:pointer}
    .portfolio-quick nav{display:flex;gap:.2rem;flex-wrap:wrap;position:sticky;top:0;z-index:2;background:#ded2bb;border-bottom:1px solid #b8aa92;padding:.55rem clamp(1rem,4vw,3rem)}
    .portfolio-quick nav button{padding:.55rem .7rem;background:transparent;color:#334337;border:0;cursor:pointer;font-size:.8rem;font-weight:750}
    .portfolio-quick nav button:hover,.portfolio-quick nav button:focus-visible{background:#334638;color:#fff3d9}
    .portfolio-quick .pq-body{padding:0 clamp(1.2rem,4vw,3rem) 3rem;line-height:1.65}
    .portfolio-quick section{padding:2rem 0;border-bottom:1px solid #c8bca7;scroll-margin-top:7rem}
    .portfolio-quick section:last-child{border:0}
    .portfolio-quick section h2{font:900 clamp(1.7rem,3vw,2.2rem)/1.1 Impact,'Arial Narrow',sans-serif;letter-spacing:.025em;text-transform:uppercase;color:#293c30;margin:0 0 1.1rem}
    .portfolio-quick section h3{font-size:1rem;line-height:1.35;color:#26382c;margin:0 0 .35rem}
    .portfolio-quick p{margin:.35rem 0 .8rem;color:#46564a}
    .portfolio-quick .pq-intro{max-width:75ch;font-size:1rem}
    .portfolio-quick .pq-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}
    .portfolio-quick .pq-item{background:#faf6eb;border:1px solid #d5c9b4;padding:1.1rem 1.2rem;min-width:0}
    .portfolio-quick .pq-meta{font:700 .72rem/1.5 monospace;color:#985a36;letter-spacing:.03em;margin-bottom:.45rem}
    .portfolio-quick .pq-item p:last-child{margin-bottom:0}
    .portfolio-quick .pq-item ul{padding-left:1.2rem;color:#46564a}
    .portfolio-quick .pq-body a{color:#315d43;font-weight:700;overflow-wrap:anywhere;text-underline-offset:.2em}
    .portfolio-quick .pq-body a:hover{color:#9a4e29}
    .portfolio-quick .pq-contact{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.6rem 1.5rem}
    .portfolio-quick .pq-contact .pq-item{padding:.8rem 1rem}
    @media(max-width:600px){.portfolio-quick dialog{width:calc(100vw - 1rem);height:calc(100dvh - 1rem)}.portfolio-quick section{scroll-margin-top:7rem}.portfolio-quick .pq-grid,.portfolio-quick .pq-contact{grid-template-columns:1fr}.portfolio-quick section{padding:1.5rem 0}}
  </style><div class="pq-bar"><button type="button" class="pq-launch">Portfolio menu</button><a class="pq-resume" target="_blank" rel="noopener noreferrer">Résumé ↗</a></div>
  <dialog aria-labelledby="pq-heading"><header class="pq-top"><div><p class="pq-kicker"></p><h2 id="pq-heading" tabindex="-1"></h2><p class="pq-role"></p><a class="pq-cv" target="_blank" rel="noopener noreferrer">View résumé ↗</a></div></header><nav aria-label="Portfolio sections"></nav><main class="pq-body"></main></dialog>`;
  host.appendChild(wrapper);
  const dialog = wrapper.querySelector('dialog');
  const heading = wrapper.querySelector('#pq-heading');
  const body = wrapper.querySelector('.pq-body');
  const nav = wrapper.querySelector('nav');
  wrapper.querySelector('.pq-resume').href = portfolio.resumeUrl;
  wrapper.querySelector('.pq-cv').href = portfolio.resumeUrl;
  wrapper.querySelector('.pq-kicker').textContent = portfolio.location;
  wrapper.querySelector('.pq-role').textContent = portfolio.title;
  heading.textContent = portfolio.name;

  const textElement = (tag, text, className) => {
    const element = document.createElement(tag);
    element.textContent = text;
    if (className) element.className = className;
    return element;
  };
  const addLink = (container, label, href) => {
    const link = textElement('a', label);
    link.href = href;
    if (href.startsWith('https:')) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
    container.append(link);
  };
  const destinations = new Map();
  for (const [id, label] of sections) {
    const section = document.createElement('section');
    section.setAttribute('aria-labelledby', `pq-${id}`);
    const title = textElement('h2', label);
    title.id = `pq-${id}`;
    title.tabIndex = -1;
    section.append(title);
    destinations.set(id, title);
    const button = textElement('button', label);
    button.type = 'button';
    button.addEventListener('click', () => goTo(id));
    nav.append(button);
    if (id === 'about') {
      const intro = document.createElement('div'); intro.className = 'pq-intro';
      for (const paragraph of portfolio.about) intro.append(textElement('p', paragraph));
      intro.append(textElement('p', portfolio.availability));
      section.append(intro);
    } else {
      const list = document.createElement('div');
      list.className = id === 'contact' ? 'pq-contact' : 'pq-grid';
      for (const entry of portfolio[id]) {
        const card = document.createElement('article'); card.className = 'pq-item';
        if (entry.meta) card.append(textElement('div', entry.meta, 'pq-meta'));
        card.append(textElement('h3', entry.title));
        if (entry.description) card.append(textElement('p', entry.description));
        if (entry.details) card.append(textElement('p', entry.details));
        if (id === 'projects' && entry.githubUrl) addLink(card, 'View repository ↗', entry.githubUrl);
        if (id === 'achievements') {
          if (entry.context) card.append(textElement('p', entry.context));
          if (entry.role) card.append(textElement('p', `Role: ${entry.role}`));
          if (entry.contribution) card.append(textElement('p', `${entry.contributionLabel}: ${entry.contribution}`));
          if (entry.contributions?.length) {
            const contributions = document.createElement('ul');
            for (const contribution of entry.contributions) contributions.append(textElement('li', contribution));
            card.append(contributions);
          }
          if (entry.outcome) card.append(textElement('p', `${entry.outcomeLabel}: ${entry.outcome}`));
          if (entry.repositoryUrl) addLink(card, 'View repository ↗', entry.repositoryUrl);
          else if (entry.repositoryNote) card.append(textElement('p', `Repository: ${entry.repositoryNote}`));
        }
        if (entry.label) {
          if (entry.href) addLink(card, entry.label, entry.href);
          else card.append(textElement('p', entry.label));
        }
        list.append(card);
      }
      section.append(list);
    }
    body.append(section);
  }
  const closeButton = textElement('button', 'Close ×', 'pq-close');
  closeButton.type = 'button';
  closeButton.setAttribute('aria-label', 'Close portfolio menu');
  nav.append(closeButton);
  function goTo(id) {
    const target = destinations.get(id) || destinations.get('about');
    target.focus({ preventScroll: true });
    target.scrollIntoView({ block: 'start', behavior: 'instant' });
  }
  function open(section = 'about') {
    if (!dialog.open) { options.onOpen?.(); dialog.showModal(); }
    if (section === 'about') { dialog.scrollTop = 0; heading.focus({ preventScroll: true }); }
    else goTo(section);
  }
  function close() { if (dialog.open) dialog.close(); }
  wrapper.querySelector('.pq-launch').addEventListener('click', () => open());
  wrapper.querySelector('.pq-close').addEventListener('click', close);
  dialog.addEventListener('close', () => options.onClose?.());
  return { open, close, destroy() { if (dialog.open) dialog.close(); wrapper.remove(); } };
}
