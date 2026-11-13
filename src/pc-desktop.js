// @ts-nocheck
import { portfolio } from './content.js';

/** Mount a self-contained, simulated desktop. No network access is simulated. */
export function mountPC(host, { onExit = () => {} } = {}) {
  const root = document.createElement('div');
  root.className = 'pc-environment';
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'true');
  root.setAttribute('aria-label', 'Interactive computer');
  root.hidden = true;
  root.innerHTML = `<style>
    .pc-environment[hidden]{display:none}.pc-environment{position:fixed;inset:0;z-index:3000;background:#192c2b;color:#eef5ed;font-family:system-ui,sans-serif;display:flex;flex-direction:column;overflow:hidden}
    .pc-environment *{box-sizing:border-box}.pc-environment button,.pc-environment a{font:inherit}.pc-environment button{cursor:pointer}.pc-environment :focus-visible{outline:3px solid #f2b771;outline-offset:2px}
    .pc-top{min-height:46px;display:flex;align-items:center;gap:12px;padding:7px 16px;background:#192923;color:#eee1c6;border-bottom:1px solid #ffffff20;font-size:12px}.pc-top strong{letter-spacing:.07em}.pc-top span{color:#c9bea7}.pc-top .pc-exit{margin-left:auto;background:#f0eee3;color:#23392c;border:0;padding:8px 12px;font-weight:700;font-size:12px}
    .pc-workspace{position:relative;flex:1;min-height:0;overflow:hidden;background:linear-gradient(145deg,#789985,#446e64 55%,#274e49)}.pc-workspace:before,.pc-workspace:after{content:'';position:absolute;pointer-events:none;border:1px solid #ffffff12;transform:rotate(-30deg);width:90vw;height:90vw;left:30%;top:-100%}.pc-workspace:after{left:50%;top:-80%}
    .pc-desktop-icons{position:absolute;z-index:1;top:20px;left:16px;display:grid;gap:8px}.pc-icon{width:86px;min-height:78px;border:1px solid transparent;background:transparent;color:#fff;text-align:center;border-radius:5px;font-size:11px;padding:6px}.pc-icon:hover,.pc-icon:focus-visible{background:#ffffff1f;border-color:#ffffff35}.pc-icon .icon{display:block;font-size:29px;line-height:1.2;margin-bottom:6px;text-shadow:0 2px 5px #172b2450}
    .pc-watermark{position:absolute;right:24px;bottom:24px;text-align:right;color:#e4f0e080;font-size:11px;letter-spacing:.12em}.pc-watermark b{display:block;color:#e4f0e0af;font-size:20px;letter-spacing:-.03em}
    .pc-window{position:absolute;top:7%;left:18%;width:min(690px,75%);height:min(510px,82%);display:flex;flex-direction:column;background:#f4f2e9;color:#273a30;box-shadow:0 15px 50px #142a2475;border:1px solid #647b6a;border-radius:5px;overflow:hidden}.pc-window[hidden]{display:none}.pc-titlebar{background:#e9eee3;min-height:42px;display:flex;align-items:center;padding-left:14px;border-bottom:1px solid #cdd8c9;touch-action:none;user-select:none}.pc-titlebar strong{font-size:12px;flex:1}.pc-titlebar button{height:40px;width:42px;border:0;background:transparent;color:#34473a;font-size:18px}.pc-titlebar button:hover{background:#d9e0d3}.pc-titlebar .pc-close:hover{background:#c75c4d;color:white}.pc-window-body{flex:1;min-height:0;overflow:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;color:#293d31}.pc-toolbar{position:sticky;top:0;z-index:2;display:flex;align-items:center;gap:10px;padding:10px 15px;background:#f9faf5;border-bottom:1px solid #dbe3d7;font-size:12px}.pc-toolbar button{border:0;background:transparent;min-width:44px;min-height:44px;padding:8px;color:#4c6c56;font-size:13px;font-weight:700;touch-action:manipulation}.pc-address{flex:1;border:1px solid #dce4d9;background:white;padding:7px 10px;color:#7a8d7b;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.pc-content{padding:24px}.pc-content h2{margin:4px 0 8px;font-size:26px;letter-spacing:-.04em}.pc-content p{color:#617466;line-height:1.6;font-size:13px}.pc-kicker{font:700 10px monospace;letter-spacing:.12em;color:#a4775c;text-transform:uppercase}.pc-files{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px;margin-top:20px}.pc-file{border:1px solid #d9e1d5;background:#fff;color:#273e30;min-height:110px;text-align:left;padding:15px;line-height:1.4}.pc-file:hover{border-color:#718e77;background:#f2f7ed}.pc-file span{display:block;font-size:25px;margin-bottom:8px}.pc-file b{font-size:12px}.pc-card{background:#fff;border:1px solid #dce4d8;padding:18px;margin-top:18px}.pc-card b{font-size:12px;color:#7b927d}.pc-links{display:grid;gap:8px;margin-top:16px}.pc-link{display:block;padding:13px 14px;background:white;border:1px solid #dae4d9;color:#345d43;font-size:13px;text-decoration:none;overflow-wrap:anywhere}.pc-link:hover{background:#edf5ec}.pc-resume-link{display:inline-block;background:#587961;color:#fff;padding:11px 15px;margin-top:8px;text-decoration:none;font-weight:700;font-size:12px}.pc-resume-preview{padding:12px;background:#bec8ba}.pc-resume-preview canvas{display:block;width:100%;height:auto;background:white;margin:0 auto 12px;box-shadow:0 2px 8px #0003}.pc-resume-status{color:#33483a;padding:12px;font-size:13px}
    .pc-library{background:#202b29;color:#eef1e8;min-height:0}.pc-library .pc-toolbar{background:#27342f;color:#eee1c6;border-color:#46534b}.pc-library .pc-address{background:#34443b;color:#eee1c6;border-color:#53665a}.pc-library .pc-toolbar button{color:#f4e8cb}.pc-library .pc-content{padding:24px}.pc-library .pc-content p{color:#ddd0b8}.pc-library .pc-kicker{color:#d8ad72}.pc-library-header{display:flex;align-items:end;justify-content:space-between;gap:10px;border-bottom:1px solid #607466;padding-bottom:15px}.pc-library-header h2{color:#f5efdd;font-size:28px}.pc-library-header p{margin:2px 0}.pc-library-count{font:700 10px monospace;color:#cbbb99;white-space:nowrap}.pc-gallery{display:grid;grid-template-columns:repeat(auto-fit,minmax(155px,1fr));gap:12px;padding-top:18px}.pc-game{padding:0;min-width:0;text-align:left;background:#313f39;color:#f4eee0;border:1px solid #5f7262;transition:border-color .15s,transform .15s;overflow:hidden}.pc-game:hover,.pc-game:focus-visible{border-color:#e4bd80;transform:translateY(-2px)}.pc-game-art{display:block;width:100%;height:115px;background:#435b50;overflow:hidden}.pc-game-art svg{display:block;width:100%;height:100%;object-fit:cover}.pc-game-info{display:block;padding:13px}.pc-game-info strong{display:block;font-size:14px;line-height:1.3}.pc-game-meta{display:block;font:700 9px monospace;letter-spacing:.05em;text-transform:uppercase;color:#d6b888;margin-top:7px}.pc-game-desc{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden;margin-top:8px;color:#ddd0b8;font-size:11px;line-height:1.5}.pc-game-more{display:block;margin-top:12px;font-size:10px;font-weight:800;color:#eed29b;text-transform:uppercase;letter-spacing:.08em}.pc-detail-hero{display:grid;grid-template-columns:minmax(150px, .9fr) minmax(180px,1.2fr);gap:22px;align-items:center}.pc-detail-hero .pc-game-art{height:210px;border:1px solid #798876}.pc-library .pc-card{background:#33443b;border-color:#61776a;color:#f2f0e5}.pc-library .pc-card b{color:#d9b57f}.pc-library-links{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}.pc-library-links a{display:inline-block;padding:10px 12px;background:#e1c08b;color:#24342b;font-size:12px;font-weight:800;text-decoration:none}.pc-library-links a:hover{background:#f2d7a5}.pc-link-note{font-size:11px;color:#c9bea7;margin-top:15px}.pc-game-art svg text{font-family:monospace;font-weight:700;letter-spacing:.12em}.pc-library-intro-link{display:inline-block;margin-top:10px;color:#f3d19b;font-size:12px}.pc-library-intro-link:hover{color:#fff}.pc-github-trigger{display:inline-block;margin:10px 0 0 14px!important;padding:0!important;background:transparent!important;color:#f3d19b!important;text-decoration:underline;font-weight:700;font-size:12px;cursor:pointer}.pc-repo-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:9px;margin-top:12px}.pc-repo{display:block;padding:13px;background:#34433b;border:1px solid #637668;color:#f2eee1;text-decoration:none;overflow-wrap:anywhere}.pc-repo:hover{border-color:#e4bd80}.pc-repo strong{font-size:12px}.pc-repo small{display:block;color:#ddd0b8;line-height:1.5;margin-top:6px}.pc-repo-label{margin-top:23px;color:#dfc393;font:700 10px monospace;letter-spacing:.08em;text-transform:uppercase}.pc-library .pc-status{color:#ddd0b8;font-size:12px}@media(max-width:650px){.pc-library .pc-content{padding:16px}.pc-gallery{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.pc-game-art{height:90px}.pc-game-info{padding:10px}.pc-game-desc{-webkit-line-clamp:2}.pc-detail-hero{grid-template-columns:1fr}.pc-detail-hero .pc-game-art{height:140px}.pc-library-count{display:none}}@media(prefers-reduced-motion:reduce){.pc-game{transition:none}}
    .pc-taskbar{min-height:50px;display:flex;align-items:center;gap:7px;padding:6px 12px;background:#203a32;border-top:1px solid #ffffff20}.pc-start{background:#c5b18b;border:2px solid #171613;color:#29231c;font-weight:800;padding:8px 10px}.pc-tasks{display:flex;gap:5px;overflow:auto;flex:1}.pc-task{background:#ffffff18;color:#f0e3c6;border:0;padding:8px 11px;font-size:11px;white-space:nowrap}.pc-task[aria-pressed=true]{background:#ffffff32}.pc-clock{font:11px monospace;white-space:nowrap;color:#e4d6ba}
    @media(max-width:650px){.pc-top span{display:none}.pc-workspace .pc-window{left:3%!important;top:3%!important;width:94%;height:88%}.pc-content{padding:18px}.pc-desktop-icons{left:7px;top:10px}.pc-watermark{display:none}.pc-icon{width:70px}.pc-files{grid-template-columns:repeat(2,1fr)}}
    /* Resizing is available with a pointer, touch, or arrow keys on the focused handle. */
    .pc-resize{position:absolute;z-index:4;right:0;bottom:0;width:32px;height:32px;padding:0;border:2px solid #171613;background:#c5b18b;color:#29231c;cursor:nwse-resize;touch-action:none;font-size:20px;line-height:1;display:grid;place-items:center;user-select:none}
    .pc-window-body{padding-bottom:32px}
    @media(any-pointer:coarse){.pc-resize{width:44px;height:44px}.pc-window-body{padding-bottom:44px}}
    /* Keep window controls and navigation usable on landscape phones and tablets. */
    .pc-titlebar button{min-width:48px;min-height:44px;touch-action:manipulation}.pc-exit,.pc-start,.pc-task{min-height:44px;touch-action:manipulation}.pc-task{min-width:64px}.pc-window-body button,.pc-window-body a{touch-action:manipulation}
    @media (any-pointer:coarse) and (max-height:700px){.pc-workspace .pc-window{left:2%!important;top:2%!important;width:96%;height:96%}.pc-titlebar{min-height:44px}.pc-toolbar{padding:4px 10px}.pc-content,.pc-library .pc-content{padding:12px 16px}.pc-gallery{padding-top:10px}.pc-game-art{height:90px}.pc-desktop-icons{top:4px;left:5px;gap:0}.pc-icon{min-height:58px;width:75px}.pc-icon .icon{font-size:23px;margin-bottom:1px}.pc-taskbar{min-height:48px}.pc-top{min-height:42px}}
  </style><div class="pc-top"><strong>PARTH OS</strong><span>Interactive portfolio desktop</span><button type="button" class="pc-exit">← Leave computer <kbd>Esc</kbd></button></div><div class="pc-workspace"><div class="pc-desktop-icons"><button class="pc-icon" data-launch="projects"><span class="icon" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M4 8h9l3 3h12v13a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z" fill="currentColor" opacity=".75"/><path d="M4 13h24l-2 10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z" fill="currentColor"/></svg></span>Projects</button><button class="pc-icon" data-launch="resume"><span class="icon" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M8 3h11l6 6v20H8z" fill="currentColor"/><path d="M19 3v7h6M12 15h9M12 19h9M12 23h6" fill="none" stroke="#486256" stroke-width="1.5"/></svg></span>Résumé.pdf</button><button class="pc-icon" data-launch="browser"><span class="icon" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2"><circle cx="16" cy="16" r="12"/><path d="M4 16h24M16 4c-4 4-5 8-5 12s1 8 5 12c4-4 5-8 5-12s-1-8-5-12z"/></svg></span>Internet</button></div><div class="pc-watermark"><b>Parth OS</b>BUILT TO EXPLORE / V1.0</div></div><div class="pc-taskbar"><button class="pc-start" aria-label="Open projects folder">⌂</button><div class="pc-tasks" role="group" aria-label="Open applications"></div><span class="pc-clock"></span></div>`;
  host.append(root);
  const workspace = root.querySelector('.pc-workspace');
  const tasks = root.querySelector('.pc-tasks');
  const clock = root.querySelector('.pc-clock');
  const windows = new Map();
  let z = 5, previouslyFocused = null, dragCleanup = null;
  const escapeText = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const labels = {projects:'Projects', resume:'Résumé.pdf', browser:'Internet'};
  const pinnedRepositories=portfolio.projects.map(project => project.githubUrl?.split('/').pop()).filter(Boolean);
  const allLinks = portfolio.contact.filter(item => item.href && /^https?:/.test(item.href));
  function setTime(){clock.textContent = new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});}
  function updateTasks(){
    tasks.replaceChildren();
    windows.forEach((record, id) => {
      const button=document.createElement('button');button.type='button';button.className='pc-task';button.textContent=labels[id];button.dataset.task=id;button.setAttribute('aria-pressed', String(!record.element.hidden));button.onclick=()=>{record.element.hidden=false;bring(record);tasks.querySelector(`[data-task="${id}"]`)?.focus();};tasks.append(button);
    });
  }
  function bring(record){record.element.style.zIndex=String(++z);updateTasks();}
  function toolbar(path, back=false){return `<div class="pc-toolbar">${back?'<button type="button" data-back aria-label="Back to projects">← Back</button>':'<span aria-hidden="true">‹ &nbsp; ›</span>'}<div class="pc-address">${escapeText(path)}</div></div>`;}
  // Art is generated from SVG primitives rather than image assets.
  function projectArt(index, title) {
    // Each project gets a distinct illustration generated from vector geometry.
    const byRepository={'digital-metrology-inspector':0,'face-attendance':1,'Nation-State':2,'python_scraper':3,'python_yt':4,'ResonantAI':5};
    const slug=portfolio.projects[index]?.githubUrl?.split('/').filter(Boolean).pop();
    const artIndex=byRepository[slug] ?? 6;
    const palettes=[['#283d38','#a8bf98','#e5c784'],['#233e49','#8fbab2','#d4c197'],['#363d4c','#90a6aa','#dfc58d'],['#233f39','#85b2a0','#e2c47f'],['#423a41','#c19683','#e5c998'],['#273c45','#86b3b2','#e8c88c'],['#30433a','#8eaa94','#ddc090']];
    const [dark,mid,light]=palettes[artIndex];
    const motifs=[
      // Package inspection: measuring marks and extracted declaration lines.
      `<path d="M145 34l54-18 58 18v95l-58 25-54-25z" fill="${mid}" opacity=".38" stroke="${light}" stroke-width="3"/><path d="M145 34l54 22 58-22M199 56v98" fill="none" stroke="${light}" stroke-width="3"/><path d="M163 72h24m-24 10h25m-25 10h16m29-20h30m-30 10h24" stroke="${light}" stroke-width="3"/><path d="M118 47V30h18m133 0h18v17M118 117v18h18m133 0h18v-18" fill="none" stroke="${light}" stroke-width="4"/><path d="M105 150h180m-180-5v10m180-10v10" stroke="${mid}" stroke-width="3"/>`,
      // Face attendance: scan frame with a location pin and check mark.
      `<rect x="119" y="22" width="128" height="130" rx="8" fill="none" stroke="${light}" stroke-width="3"/><path d="M134 54V38h16m66 0h16v16m-98 66v16h16m66 0h16v-16" fill="none" stroke="${light}" stroke-width="4"/><circle cx="183" cy="70" r="22" fill="${mid}"/><path d="M146 130q3-38 37-38t37 38" fill="${mid}"/><path d="M277 43c-17 0-30 13-30 29 0 23 30 48 30 48s30-25 30-48c0-16-13-29-30-29z" fill="${mid}"/><path d="M264 72l9 9 17-19" fill="none" stroke="${dark}" stroke-width="6"/>`,
      // Nation-State: government building and a simple economic trend.
      `<path d="M118 62l71-38 71 38z" fill="${light}"/><path d="M125 68h128v10H125zm0 65h128v10H125z" fill="${mid}"/><path d="M142 79v51m30-51v51m34-51v51m30-51v51" stroke="${light}" stroke-width="10"/><path d="M270 120l20-26 17 9 29-42" fill="none" stroke="${light}" stroke-width="5"/><circle cx="336" cy="61" r="6" fill="${light}"/>`,
      // Finance scraper: browser frame, candlesticks, and extraction brackets.
      `<rect x="87" y="21" width="226" height="131" rx="6" fill="none" stroke="${light}" stroke-width="3"/><path d="M87 43h226" stroke="${light}" stroke-width="3"/><circle cx="101" cy="32" r="3" fill="${mid}"/><circle cx="113" cy="32" r="3" fill="${mid}"/><path d="M132 118V80m-8 12h16v18h-16zm44 30V65m-8 11h16v20h-16zm44 20V54m-8 13h16v14h-16zm44 40V72m-8 9h16v16h-16z" stroke="${mid}" stroke-width="3" fill="${mid}"/><path d="M110 58v-8h9m166 0h9v8m-184 67v8h9m166 0h9v-8" fill="none" stroke="${light}" stroke-width="3"/>`,
      // YouTube pipeline: video, audio waveform, and summary lines.
      `<rect x="65" y="45" width="105" height="72" rx="12" fill="${mid}"/><path d="M107 60v42l34-21z" fill="${dark}"/><path d="M185 80h16m8 0 6-20 9 40 9-54 9 68 9-50 8 16h15" fill="none" stroke="${light}" stroke-width="4" stroke-linecap="round"/><path d="M290 46h48v72h-48z" fill="none" stroke="${light}" stroke-width="3"/><path d="M299 61h30m-30 12h30m-30 12h24m-24 12h28" stroke="${mid}" stroke-width="4"/>`,
      // Speech restoration: a speech bubble and a repaired waveform.
      `<path d="M83 34h234v89H190l-34 23v-23H83z" fill="${mid}" opacity=".3" stroke="${light}" stroke-width="3"/><path d="M103 79h28l8-18 13 38 12-58 15 77 14-67 12 52 12-39 9 28 8-13h61" fill="none" stroke="${light}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M119 138h72m19 0h72" stroke="${mid}" stroke-width="3" opacity=".7"/>`,
      // Neutral fallback for a newly added project.
      `<rect x="92" y="29" width="216" height="119" rx="5" fill="none" stroke="${light}" stroke-width="4"/><path d="M92 53h216M124 85l-14 12 14 12m152-24 14 12-14 12m-40-34-23 44" fill="none" stroke="${mid}" stroke-width="5"/>`
    ];
    return `<svg viewBox="0 0 400 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><rect width="400" height="180" fill="${dark}"/><path d="M0 180L150 0H200L50 180M210 180L360 0H400L250 180" fill="${mid}" opacity=".08"/>${motifs[artIndex]}<text x="16" y="169" font-size="10" fill="${light}">${escapeText(title.toUpperCase())}</text></svg>`;
  }
  function safeProjectLink(value){if(typeof value!=='string'||!/^https?:\/\//i.test(value))return '';try{const u=new URL(value);return ['http:','https:'].includes(u.protocol)?u.href:''}catch{return ''}}
  function projectLinks(project){
    const demo=safeProjectLink(project.liveUrl || project.demoUrl || project.live || project.demo);
    const repo=safeProjectLink(project.githubUrl || project.repoUrl || project.repositoryUrl || project.github || project.repo);
    return [[demo,'Live project ↗'],[repo,'Source code ↗']].filter(([url])=>url);
  }
  function showFolder(record){
    record.view='folder';record.body.scrollTop=0;
    const github=portfolio.contact.find(item=>item.title==='GitHub'&&item.href)?.href;
    record.body.classList.add('pc-library');
    record.body.innerHTML=toolbar('This PC / Projects')+`<div class="pc-content"><div class="pc-library-header"><div><div class="pc-kicker">PARTH OS / PINNED PROJECTS</div><h2>Built &amp; explored.</h2><p>A snapshot of my pinned GitHub projects. Choose one to explore.</p>${github?`<a class="pc-library-intro-link" href="${escapeText(github)}" target="_blank" rel="noopener noreferrer">Visit GitHub profile ↗</a><button type="button" class="pc-github-trigger" data-github>Browse GitHub repositories →</button>`:''}</div><span class="pc-library-count">${portfolio.projects.length} PROJECTS</span></div><div class="pc-gallery">${portfolio.projects.map((project,i)=>`<button class="pc-game" type="button" data-project="${i}"><span class="pc-game-art">${projectArt(i,project.title)}</span><span class="pc-game-info"><strong>${escapeText(project.title)}</strong><span class="pc-game-meta">${escapeText(project.meta)}</span><span class="pc-game-desc">${escapeText(project.description)}</span><span class="pc-game-more">View project →</span></span></button>`).join('')}</div></div>`;
    record.body.querySelectorAll('[data-project]').forEach(button=>button.onclick=()=>showProject(record,Number(button.dataset.project)));
    const githubButton=record.body.querySelector('[data-github]');if(githubButton)githubButton.onclick=()=>showGithub(record);
  }
  function showProject(record,index){
    const project=portfolio.projects[index];if(!project)return;record.view='project';record.body.scrollTop=0;
    const links=projectLinks(project);
    record.body.classList.add('pc-library');
    record.body.innerHTML=toolbar('This PC / Projects / '+project.title,true)+`<div class="pc-content"><div class="pc-detail-hero"><div class="pc-game-art">${projectArt(index,project.title)}</div><div><div class="pc-kicker">PROJECT FILE / ${escapeText(project.meta)}</div><h2 tabindex="-1">${escapeText(project.title)}</h2><p>${escapeText(project.description)}</p><div class="pc-library-links">${links.map(([url,label])=>`<a href="${escapeText(url)}" target="_blank" rel="noopener noreferrer">${escapeText(label)}</a>`).join('')}</div>${links.length?'':'<div class="pc-link-note">Project links will appear here when available.</div>'}</div></div><div class="pc-card"><b>TECHNOLOGIES</b><p>${escapeText(project.details)}</p></div></div>`;
    record.body.querySelector('[data-back]').onclick=()=>{showFolder(record);record.body.querySelector(`[data-project="${index}"]`)?.focus()};record.body.querySelector('h2').focus();
  }
  async function showGithub(record) {
    record.view='github';record.body.scrollTop=0;
    const pinned=pinnedRepositories.map(name=>`<a class="pc-repo" href="https://github.com/p8kaushal/${encodeURIComponent(name)}" target="_blank" rel="noopener noreferrer"><strong>${escapeText(name)} ↗</strong><small>Public repository · pinned profile snapshot</small></a>`).join('');
    record.body.classList.add('pc-library');
    record.body.innerHTML=toolbar('GitHub / p8kaushal',true)+`<div class="pc-content"><div class="pc-kicker">GITHUB / PUBLIC PROFILE</div><h2 tabindex="-1">Repositories.</h2><p>Pinned projects and other public repositories from GitHub.</p><a class="pc-library-intro-link" href="https://github.com/p8kaushal" target="_blank" rel="noopener noreferrer">Open full GitHub profile ↗</a><div class="pc-repo-label">Pinned on profile · snapshot</div><div class="pc-repo-list">${pinned}</div><div class="pc-repo-label">Other public repositories</div><p class="pc-status" aria-live="polite">Loading public repositories from GitHub…</p><div class="pc-repo-list" data-repositories></div></div>`;
    record.body.querySelector('[data-back]').onclick=()=>{showFolder(record);record.body.querySelector('[data-github]')?.focus()};record.body.querySelector('h2').focus();
    const status=record.body.querySelector('.pc-status'), listing=record.body.querySelector('[data-repositories]');
    try {
      let repos=[];
      for(let page=1;page<=10;page++){
        const response=await fetch(`https://api.github.com/users/p8kaushal/repos?per_page=100&sort=updated&page=${page}`,{headers:{Accept:'application/vnd.github+json'}});
        if(!response.ok)throw new Error('GitHub API unavailable');
        const batch=await response.json();if(!Array.isArray(batch))throw new Error('Unexpected response');repos.push(...batch);if(batch.length<100)break;
      }
      if(record.view!=='github'||!record.element.isConnected)return;
      const pins=new Set(pinnedRepositories.map(name=>name.toLowerCase()));
      const others=repos.filter(repo=>!repo.private && typeof repo.name==='string' && !pins.has(repo.name.toLowerCase()) && safeProjectLink(repo.html_url));
      status.textContent=others.length?`${others.length} public repositories · updated from GitHub`:'No other public repositories returned by GitHub.';
      listing.innerHTML=others.map(repo=>`<a class="pc-repo" href="${escapeText(safeProjectLink(repo.html_url))}" target="_blank" rel="noopener noreferrer"><strong>${escapeText(repo.name)} ↗</strong><small>${escapeText(repo.description || 'View repository on GitHub.')}</small></a>`).join('');
    } catch {
      if(record.view==='github'&&record.element.isConnected)status.textContent='Could not load repositories right now. The pinned snapshot and profile link above are still available.';
    }
  }
  function showBrowser(record){record.body.innerHTML=toolbar('parth://bookmarks')+`<div class="pc-content"><div class="pc-kicker">YOUR START PAGE</div><h2>Find me online.</h2><p>Explore Parth’s confirmed links. These open in a new browser tab.</p><div class="pc-links">${allLinks.map(item=>`<a class="pc-link" href="${escapeText(item.href)}" target="_blank" rel="noopener noreferrer"><strong>${escapeText(item.title)}</strong> &nbsp; ${escapeText(item.label)} ↗</a>`).join('')}</div></div>`;}
  async function showResume(record){
    record.view='resume';record.body.scrollTop=0;
    record.body.innerHTML=toolbar('This PC / Desktop / Résumé.pdf')+`<div style="padding:8px 15px;background:#f9faf5"><a href="${escapeText(portfolio.resumeUrl)}" target="_blank" rel="noopener noreferrer" style="color:#345d43;font-size:12px">Open résumé in a new tab ↗</a></div><div class="pc-resume-preview" aria-label="Résumé preview" aria-busy="true"><p class="pc-resume-status">Loading résumé preview…</p></div>`;
    const container=record.body.querySelector('.pc-resume-preview');
    try{
      const [pdfjs,worker]=await Promise.all([import('pdfjs-dist'),import('pdfjs-dist/build/pdf.worker.min.mjs?url')]);
      pdfjs.GlobalWorkerOptions.workerSrc=worker.default;
      const pdf=await pdfjs.getDocument({url:new URL(portfolio.resumeUrl,window.location.href).href}).promise;
      if(!container.isConnected||record.view!=='resume')return;container.replaceChildren();
      for(let i=1;i<=pdf.numPages;i++){
        const page=await pdf.getPage(i);if(!container.isConnected||record.view!=='resume')break;
        const base=page.getViewport({scale:1}), width=Math.min(1200,Math.max(500,container.clientWidth*1.5));
        const viewport=page.getViewport({scale:width/base.width}),canvas=document.createElement('canvas');
        canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);canvas.setAttribute('role','img');canvas.setAttribute('aria-label',`Résumé page ${i} of ${pdf.numPages}`);container.appendChild(canvas);
        await page.render({canvas,canvasContext:canvas.getContext('2d'),viewport}).promise;
      }
      if(container.isConnected)container.setAttribute('aria-busy','false');
    }catch(error){if(container.isConnected){container.setAttribute('aria-busy','false');container.textContent='Preview unavailable. Open the résumé using the link above.';}console.error('PC résumé preview failed',error)}
  }

  function launch(id){
    if(windows.has(id)){const record=windows.get(id);record.element.hidden=false;bring(record);return;}
    const element=document.createElement('section');element.className='pc-window';element.setAttribute('role','region');element.setAttribute('aria-label',labels[id]);
    element.innerHTML=`<div class="pc-titlebar"><strong>${escapeText(labels[id])}</strong><button type="button" class="pc-minimize" aria-label="Minimize ${escapeText(labels[id])}">−</button><button type="button" class="pc-close" aria-label="Close ${escapeText(labels[id])}">×</button></div><div class="pc-window-body"></div><button type="button" class="pc-resize" aria-label="Resize ${escapeText(labels[id])} window using arrow keys or drag" title="Drag or use arrow keys to resize">◢</button>`;
    workspace.append(element);const record={element,body:element.querySelector('.pc-window-body')};windows.set(id,record);bring(record);
    element.addEventListener('pointerdown',()=>bring(record));
    element.querySelector('.pc-minimize').onclick=()=>{element.hidden=true;updateTasks();tasks.querySelector(`[data-task="${id}"]`)?.focus();};
    element.querySelector('.pc-close').onclick=()=>{element.remove();windows.delete(id);updateTasks();root.querySelector(`[data-launch="${id}"]`)?.focus();};
    const resizeHandle=element.querySelector('.pc-resize');
    function resizeWindow(width,height){
      const bounds=workspace.getBoundingClientRect(),box=element.getBoundingClientRect();
      const availableWidth=Math.max(1,bounds.right-box.left),availableHeight=Math.max(1,bounds.bottom-box.top);
      const minWidth=Math.min(280,availableWidth),minHeight=Math.min(170,availableHeight);
      element.style.width=Math.max(minWidth,Math.min(availableWidth,width))+'px';
      element.style.height=Math.max(minHeight,Math.min(availableHeight,height))+'px';
    }
    resizeHandle.addEventListener('pointerdown',event=>{
      if(event.button!==0)return;event.preventDefault();event.stopPropagation();bring(record);resizeHandle.focus();
      const rect=element.getBoundingClientRect(),startX=event.clientX,startY=event.clientY,pointerId=event.pointerId;
      resizeHandle.setPointerCapture(pointerId);
      function move(e){if(e.pointerId===pointerId){e.preventDefault();resizeWindow(rect.width+e.clientX-startX,rect.height+e.clientY-startY)}}
      function stop(e){if(e&&e.pointerId!==pointerId)return;resizeHandle.removeEventListener('pointermove',move);resizeHandle.removeEventListener('pointerup',stop);resizeHandle.removeEventListener('pointercancel',stop);resizeHandle.removeEventListener('lostpointercapture',stop);if(resizeHandle.hasPointerCapture(pointerId))resizeHandle.releasePointerCapture(pointerId);dragCleanup=null}
      dragCleanup?.();dragCleanup=stop;resizeHandle.addEventListener('pointermove',move);resizeHandle.addEventListener('pointerup',stop);resizeHandle.addEventListener('pointercancel',stop);resizeHandle.addEventListener('lostpointercapture',stop);
    });
    resizeHandle.addEventListener('keydown',event=>{
      const delta={ArrowLeft:[-24,0],ArrowRight:[24,0],ArrowUp:[0,-24],ArrowDown:[0,24]}[event.key];if(!delta)return;
      event.preventDefault();event.stopPropagation();const rect=element.getBoundingClientRect();resizeWindow(rect.width+delta[0],rect.height+delta[1]);
    });
    const titlebar=element.querySelector('.pc-titlebar');titlebar.addEventListener('pointerdown', event=>{
      if(event.target.closest('button') || event.pointerType==='touch' || matchMedia('(max-width:650px)').matches)return;
      const bounds=workspace.getBoundingClientRect(), initial=element.getBoundingClientRect(), startX=event.clientX, startY=event.clientY;
      function move(e){const left=Math.max(0,Math.min(bounds.width-element.offsetWidth,initial.left-bounds.left+e.clientX-startX));const top=Math.max(0,Math.min(bounds.height-element.offsetHeight,initial.top-bounds.top+e.clientY-startY));element.style.left=left+'px';element.style.top=top+'px';}
      function stop(){window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',stop);window.removeEventListener('pointercancel',stop);dragCleanup=null;}
      dragCleanup?.();dragCleanup=stop;window.addEventListener('pointermove',move);window.addEventListener('pointerup',stop);window.addEventListener('pointercancel',stop);
    });
    if(id==='projects')showFolder(record);else if(id==='browser')showBrowser(record);else showResume(record);
  }
  root.querySelectorAll('[data-launch]').forEach(button=>button.onclick=()=>launch(button.dataset.launch));
  root.querySelector('.pc-start').onclick=()=>launch('projects');
  function close(){if(root.hidden)return;root.hidden=true;dragCleanup?.();onExit();if(previouslyFocused?.isConnected)previouslyFocused.focus();}
  function keydown(event){
    if(root.hidden)return;
    if(event.key==='Escape'){event.preventDefault();event.stopPropagation();close();return;}
    if(event.key!=='Tab')return;
    const focusable=[...root.querySelectorAll('button:not([disabled]),a[href],[tabindex]:not([tabindex="-1"])')].filter(el=>el.getClientRects().length&&!el.closest('[hidden]'));
    if(!focusable.length)return;
    const first=focusable[0],last=focusable.at(-1),active=document.activeElement;
    if(!root.contains(active)){event.preventDefault();(event.shiftKey?last:first).focus()}
    else if(event.shiftKey&&active===first){event.preventDefault();last.focus()}
    else if(!event.shiftKey&&active===last){event.preventDefault();first.focus()}
  }
  root.querySelector('.pc-exit').onclick=close;
  document.addEventListener('keydown',keydown,true);
  return {open(){previouslyFocused=document.activeElement;root.hidden=false;setTime();root.querySelector('.pc-exit').focus();},close,destroy(){dragCleanup?.();document.removeEventListener('keydown',keydown,true);root.remove();}};
}
