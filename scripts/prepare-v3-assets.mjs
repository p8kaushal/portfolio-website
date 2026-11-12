import { mkdir, rm, readFile, writeFile, copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { portfolio } from '../src/content.js';

// Build only the files used by v3. Legacy static media remains in the repo but is
// never copied into the published artifact. The 2D fallback uses the same data.
const root = resolve('.generated-static');
await rm(root, { recursive: true, force: true });
await mkdir(resolve(root, '2d'), { recursive: true });
await Promise.all([
  copyFile('static/resume.pdf', resolve(root, 'resume.pdf')),
  copyFile('static/favicon.svg', resolve(root, 'favicon.svg')),
  copyFile('static/social-preview.png', resolve(root, 'social-preview.png')),
  copyFile('static/resume.pdf', resolve(root, '2d/resume.pdf'))
]);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const entry = (title, body) => `<div class="item"><strong>${esc(title)}</strong><small>${body}</small></div>`;
const projectRows = portfolio.projects.map(p => entry(p.title, `${esc(p.description)}<br>${esc(p.details)}<br><a href="${esc(p.githubUrl)}" target="_blank" rel="noopener noreferrer">View repository ↗</a>`)).join('');
const skillsRows = portfolio.skills.map(s => `<b>${esc(s.title)}:</b> ${esc(s.details)}`).join('<br>');
const experienceRows = portfolio.experience.map(e => entry(`${e.period} · ${e.title}`, `${esc(e.organization)}<br>${esc(e.description)}`)).join('');
const awardRows = portfolio.achievements.map(a => entry(a.title, [
  `<b>${esc(a.badge)} · ${esc(a.meta)}</b>`, esc(a.description), a.context && esc(a.context),
  a.role && `<b>My Role:</b> ${esc(a.role)}`,
  a.contribution && `<b>${esc(a.contributionLabel)}:</b> ${esc(a.contribution)}`,
  a.contributions?.length && `<b>My Contributions:</b><br>${a.contributions.map(item => `• ${esc(item)}`).join('<br>')}`,
  `<b>${esc(a.outcomeLabel)}:</b> ${esc(a.outcome)}`,
  a.repositoryUrl ? `<b>Repository:</b> <a href="${esc(a.repositoryUrl)}" target="_blank" rel="noopener noreferrer">View repository ↗</a>` : `<b>Repository:</b> ${esc(a.repositoryNote)}`
].filter(Boolean).join('<br><br>'))).join('');
const fallback = {
  about: ['01 / THE BEDROOM', 'Curious by nature. Builder by choice.', portfolio.about[0], entry(portfolio.title, portfolio.about.slice(1).map(esc).join('<br>')) + entry('Open to opportunities', esc(portfolio.availability))],
  projects: ['02 / THE STUDIO', 'Built & explored.', 'A snapshot of my pinned GitHub projects.', projectRows + entry('Résumé', '<a href="resume.pdf" target="_blank" rel="noopener noreferrer">Open the résumé ↗</a>')],
  file: ['02 / THE STUDIO', 'The important papers.', 'My résumé and skills.', entry('Résumé', '<a href="resume.pdf" target="_blank" rel="noopener noreferrer">Open the résumé PDF ↗</a>') + entry('Skills', skillsRows)],
  awards: ['03 / THE LIVING ROOM', 'The trophy cabinet.', 'Milestones and achievements.', awardRows],
  tv: ['03 / THE LIVING ROOM', 'The story so far.', 'Experience and education, most recent first.', experienceRows]
};
let html = await readFile('static/2d/index.html', 'utf8');
const marker = 'const content=window.__PORTFOLIO_CONTENT__;';
if (!html.includes(marker)) throw new Error('2D portfolio data marker is missing');
html = html.replace(marker, `const content=${JSON.stringify(fallback).replace(/</g, '\\u003c')};`);
await writeFile(resolve(root, '2d/index.html'), html);
console.log('Prepared v3 assets and synchronized 2D portfolio content.');
