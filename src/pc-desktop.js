// @ts-nocheck
import { portfolio } from './content.js';

/** Mount a self-contained, simulated desktop. No network access is simulated. */
export function mountPC(host, { onExit = () => {} } = {}) {
  const root = document.createElement('div');
  root.className = 'pc-environment';
  root.hidden = true;
  root.innerHTML = `<style>
    .pc-environment[hidden]{display:none}.pc-environment{position:fixed;inset:0;z-index:3000;background:#192c2b;color:#eef5ed;font-family:system-ui,sans-serif;display:flex;flex-direction:column;overflow:hidden}
    .pc-environment *{box-sizing:border-box}.pc-environment button,.pc-environment a{font:inherit}.pc-environment button{cursor:pointer}.pc-environment :focus-visible{outline:3px solid #f2b771;outline-offset:2px}
    .pc-top{min-height:46px;display:flex;align-items:center;gap:12px;padding:7px 16px;background:#192923;color:#dce5db;border-bottom:1px solid #ffffff20;font-size:12px}.pc-top strong{letter-spacing:.07em}.pc-top span{color:#b1c3b4}.pc-top .pc-exit{margin-left:auto;background:#f0eee3;color:#23392c;border:0;padding:8px 12px;font-weight:700;font-size:12px}
    .pc-workspace{position:relative;flex:1;min-height:0;overflow:hidden;background:linear-gradient(145deg,#789985,#446e64 55%,#274e49)}.pc-workspace:before,.pc-workspace:after{content:'';position:absolute;pointer-events:none;border:1px solid #ffffff12;transform:rotate(-30deg);width:90vw;height:90vw;left:30%;top:-100%}.pc-workspace:after{left:50%;top:-80%}
    .pc-desktop-icons{position:absolute;z-index:1;top:20px;left:16px;display:grid;gap:8px}.pc-icon{width:86px;min-height:78px;border:1px solid transparent;background:transparent;color:#fff;text-align:center;border-radius:5px;font-size:11px;padding:6px}.pc-icon:hover,.pc-icon:focus-visible{background:#ffffff1f;border-color:#ffffff35}.pc-icon .icon{display:block;font-size:29px;line-height:1.2;margin-bottom:6px;text-shadow:0 2px 5px #172b2450}
    .pc-watermark{position:absolute;right:24px;bottom:24px;text-align:right;color:#e4f0e080;font-size:11px;letter-spacing:.12em}.pc-watermark b{display:block;color:#e4f0e0af;font-size:20px;letter-spacing:-.03em}
    .pc-window{position:absolute;top:7%;left:18%;width:min(690px,75%);height:min(510px,82%);display:flex;flex-direction:column;background:#f4f2e9;color:#273a30;box-shadow:0 15px 50px #142a2475;border:1px solid #647b6a;border-radius:5px;overflow:hidden}.pc-window[hidden]{display:none}.pc-titlebar{background:#e9eee3;min-height:42px;display:flex;align-items:center;padding-left:14px;border-bottom:1px solid #cdd8c9;touch-action:none;user-select:none}.pc-titlebar strong{font-size:12px;flex:1}.pc-titlebar button{height:40px;width:42px;border:0;background:transparent;color:#34473a;font-size:18px}.pc-titlebar button:hover{background:#d9e0d3}.pc-titlebar .pc-close:hover{background:#c75c4d;color:white}.pc-window-body{flex:1;min-height:0;overflow:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;color:#293d31}.pc-toolbar{position:sticky;top:0;z-index:2;display:flex;align-items:center;gap:10px;padding:10px 15px;background:#f9faf5;border-bottom:1px solid #dbe3d7;font-size:12px}.pc-toolbar button{border:0;background:transparent;min-width:44px;min-height:44px;padding:8px;color:#4c6c56;font-size:13px;font-weight:700;touch-action:manipulation}.pc-address{flex:1;border:1px solid #dce4d9;background:white;padding:7px 10px;color:#7a8d7b;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.pc-content{padding:24px}.pc-content h2{margin:4px 0 8px;font-size:26px;letter-spacing:-.04em}.pc-content p{color:#617466;line-height:1.6;font-size:13px}.pc-kicker{font:700 10px monospace;letter-spacing:.12em;color:#a4775c;text-transform:uppercase}.pc-files{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px;margin-top:20px}.pc-file{border:1px solid #d9e1d5;background:#fff;color:#273e30;min-height:110px;text-align:left;padding:15px;line-height:1.4}.pc-file:hover{border-color:#718e77;background:#f2f7ed}.pc-file span{display:block;font-size:25px;margin-bottom:8px}.pc-file b{font-size:12px}.pc-card{background:#fff;border:1px solid #dce4d8;padding:18px;margin-top:18px}.pc-card b{font-size:12px;color:#7b927d}.pc-links{display:grid;gap:8px;margin-top:16px}.pc-link{display:block;padding:13px 14px;background:white;border:1px solid #dae4d9;color:#345d43;font-size:13px;text-decoration:none;overflow-wrap:anywhere}.pc-link:hover{background:#edf5ec}.pc-resume-link{display:inline-block;background:#587961;color:#fff;padding:11px 15px;margin-top:8px;text-decoration:none;font-weight:700;font-size:12px}.pc-resume-preview{padding:12px;background:#bec8ba}.pc-resume-preview canvas{display:block;width:100%;height:auto;background:white;margin:0 auto 12px;box-shadow:0 2px 8px #0003}.pc-resume-status{color:#33483a;padding:12px;font-size:13px}
    .pc-library{background:#202b29;color:#eef1e8;min-height:0}.pc-library .pc-toolbar{background:#27342f;color:#d8e0d4;border-color:#46534b}.pc-library .pc-address{background:#34443b;color:#dde6d7;border-color:#53665a}.pc-library .pc-toolbar button{color:#f4e8cb}.pc-library .pc-content{padding:24px}.pc-library .pc-content p{color:#bdc8ba}.pc-library .pc-kicker{color:#d8ad72}.pc-library-header{display:flex;align-items:end;justify-content:space-between;gap:10px;border-bottom:1px solid #607466;padding-bottom:15px}.pc-library-header h2{color:#f5efdd;font-size:28px}.pc-library-header p{margin:2px 0}.pc-library-count{font:700 10px monospace;color:#cbbb99;white-space:nowrap}.pc-gallery{display:grid;grid-template-columns:repeat(auto-fit,minmax(155px,1fr));gap:12px;padding-top:18px}.pc-game{padding:0;min-width:0;text-align:left;background:#313f39;color:#f4eee0;border:1px solid #5f7262;transition:border-color .15s,transform .15s;overflow:hidden}.pc-game:hover,.pc-game:focus-visible{border-color:#e4bd80;transform:translateY(-2px)}.pc-game-art{display:block;width:100%;height:115px;background:#435b50;overflow:hidden}.pc-game-art svg{display:block;width:100%;height:100%;object-fit:cover}.pc-game-info{display:block;padding:13px}.pc-game-info strong{display:block;font-size:14px;line-height:1.3}.pc-game-meta{display:block;font:700 9px monospace;letter-spacing:.05em;text-transform:uppercase;color:#d6b888;margin-top:7px}.pc-game-desc{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden;margin-top:8px;color:#c9d3c6;font-size:11px;line-height:1.5}.pc-game-more{display:block;margin-top:12px;font-size:10px;font-weight:800;color:#eed29b;text-transform:uppercase;letter-spacing:.08em}.pc-detail-hero{display:grid;grid-template-columns:minmax(150px, .9fr) minmax(180px,1.2fr);gap:22px;align-items:center}.pc-detail-hero .pc-game-art{height:210px;border:1px solid #798876}.pc-library .pc-card{background:#33443b;border-color:#61776a;color:#f2f0e5}.pc-library .pc-card b{color:#d9b57f}.pc-library-links{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}.pc-library-links a{display:inline-block;padding:10px 12px;background:#e1c08b;color:#24342b;font-size:12px;font-weight:800;text-decoration:none}.pc-library-links a:hover{background:#f2d7a5}.pc-link-note{font-size:11px;color:#aebbad;margin-top:15px}.pc-game-art svg text{font-family:monospace;font-weight:700;letter-spacing:.12em}.pc-library-intro-link{display:inline-block;margin-top:10px;color:#f3d19b;font-size:12px}.pc-library-intro-link:hover{color:#fff}.pc-github-trigger{display:inline-block;margin:10px 0 0 14px!important;padding:0!important;background:transparent!important;color:#f3d19b!important;text-decoration:underline;font-weight:700;font-size:12px;cursor:pointer}.pc-repo-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:9px;margin-top:12px}.pc-repo{display:block;padding:13px;background:#34433b;border:1px solid #637668;color:#f2eee1;text-decoration:none;overflow-wrap:anywhere}.pc-repo:hover{border-color:#e4bd80}.pc-repo strong{font-size:12px}.pc-repo small{display:block;color:#bfcbbe;line-height:1.5;margin-top:6px}.pc-repo-label{margin-top:23px;color:#dfc393;font:700 10px monospace;letter-spacing:.08em;text-transform:uppercase}.pc-library .pc-status{color:#cbd2c6;font-size:12px}@media(max-width:650px){.pc-library .pc-content{padding:16px}.pc-gallery{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.pc-game-art{height:90px}.pc-game-info{padding:10px}.pc-game-desc{-webkit-line-clamp:2}.pc-detail-hero{grid-template-columns:1fr}.pc-detail-hero .pc-game-art{height:140px}.pc-library-count{display:none}}@media(prefers-reduced-motion:reduce){.pc-game{transition:none}}
    .pc-taskbar{min-height:50px;display:flex;align-items:center;gap:7px;padding:6px 12px;background:#203a32;border-top:1px solid #ffffff20}.pc-start{background:#d2dfcd;border:0;color:#254232;font-weight:800;padding:8px 10px}.pc-tasks{display:flex;gap:5px;overflow:auto;flex:1}.pc-task{background:#ffffff18;color:#eff7ee;border:0;padding:8px 11px;font-size:11px;white-space:nowrap}.pc-task[aria-pressed=true]{background:#ffffff32}.pc-clock{font:11px monospace;white-space:nowrap;color:#dae6da}
    @media(max-width:650px){.pc-top span{display:none}.pc-workspace .pc-window{left:3%!important;top:3%!important;width:94%;height:88%}.pc-content{padding:18px}.pc-desktop-icons{left:7px;top:10px}.pc-watermark{display:none}.pc-icon{width:70px}.pc-files{grid-template-columns:repeat(2,1fr)}}
    /* Keep window controls and navigation usable on landscape phones and tablets. */
    .pc-titlebar button{min-width:48px;min-height:44px;touch-action:manipulation}.pc-exit,.pc-start,.pc-task{min-height:44px;touch-action:manipulation}.pc-task{min-width:64px}.pc-window-body button,.pc-window-body a{touch-action:manipulation}
    @media (any-pointer:coarse) and (max-height:700px){.pc-workspace .pc-window{left:2%!important;top:2%!important;width:96%;height:96%}.pc-titlebar{min-height:44px}.pc-toolbar{padding:4px 10px}.pc-content,.pc-library .pc-content{padding:12px 16px}.pc-gallery{padding-top:10px}.pc-game-art{height:90px}.pc-desktop-icons{top:4px;left:5px;gap:0}.pc-icon{min-height:58px;width:75px}.pc-icon .icon{font-size:23px;margin-bottom:1px}.pc-taskbar{min-height:48px}.pc-top{min-height:42px}}
  </style><div class="pc-top"><strong>PARTH OS</strong><span>Interactive portfolio desktop</span><button type="button" class="pc-exit">← Leave computer <kbd>Esc</kbd></button></div><div class="pc-workspace"><div class="pc-desktop-icons"><button class="pc-icon" data-launch="projects"><span class="icon">📁</span>Projects</button><button class="pc-icon" data-launch="resume"><span class="icon">📄</span>Résumé.pdf</button><button class="pc-icon" data-launch="browser"><span class="icon">◉</span>Internet</button></div><div class="pc-watermark"><b>Parth OS</b>BUILT TO EXPLORE / V1.0</div></div><div class="pc-taskbar"><button class="pc-start" aria-label="Open projects folder">⌂</button><div class="pc-tasks" aria-label="Open applications"></div><span class="pc-clock"></span></div>`;
  host.append(root);
  const workspace = root.querySelector('.pc-workspace');
  const tasks = root.querySelector('.pc-tasks');
  const clock = root.querySelector('.pc-clock');
  const windows = new Map();
  let z = 5, previouslyFocused = null, dragCleanup = null;
  const escapeText = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const labels = {projects:'Projects', resume:'Résumé.pdf', browser:'Internet'};
  const pinnedRepositories=['digital-metrology-inspector','face-attendance','Nation-State','python_scraper','python_yt','ResonantAI'];
  const allLinks = portfolio.contact.filter(item => item.href && /^https?:/.test(item.href));
  function setTime(){clock.textContent = new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});}
  function updateTasks(){
    tasks.replaceChildren();
    windows.forEach((record, id) => {
      const button=document.createElement('button');button.type='button';button.className='pc-task';button.textContent=labels[id];button.setAttribute('aria-pressed', String(!record.element.hidden));button.onclick=()=>{record.element.hidden=false;bring(record);};tasks.append(button);
    });
  }
  function bring(record){record.element.style.zIndex=String(++z);updateTasks();}
  function toolbar(path, back=false){return `<div class="pc-toolbar">${back?'<button type="button" data-back aria-label="Back to projects">← Back</button>':'<span aria-hidden="true">‹ &nbsp; ›</span>'}<div class="pc-address">${escapeText(path)}</div></div>`;}
  // Art is generated from SVG primitives rather than image assets.
  function projectArt(index, title) {
    const palettes=[['#243e39','#94b793','#d8bc82'],['#263846','#7da3a2','#e0bd87'],['#443b46','#bc9c87','#d4c18e']];
    const [dark,mid,light]=palettes[index%palettes.length];
    const motifs=[
      `<path d="M60 142H340M88 119l45-36 48 21 58-60 55 31" fill="none" stroke="${light}" stroke-width="5"/><circle cx="239" cy="44" r="9" fill="${light}"/><path d="M74 151V92h18v59m24 0V71h18v80m24 0V103h18v48m24 0V54h18v97m24 0V85h18v66" fill="${mid}" opacity=".65"/>`,
      `<rect x="122" y="29" width="156" height="126" rx="8" fill="none" stroke="${light}" stroke-width="4"/><path d="M142 48h22m-22 0v21m94-21h22v21m-116 45v21h22m94-21v21h-22" fill="none" stroke="${light}" stroke-width="5"/><circle cx="200" cy="78" r="20" fill="${mid}"/><path d="M168 133q3-31 32-31t32 31" fill="${mid}"/>`,
      `<path d="M63 95H94l9-24 16 52 15-70 16 85 14-57 12 25h160" fill="none" stroke="${light}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="200" cy="93" r="64" fill="none" stroke="${mid}" stroke-width="2" opacity=".6"/><circle cx="200" cy="93" r="78" fill="none" stroke="${mid}" stroke-width="2" opacity=".4"/>`
    ];
    return `<svg viewBox="0 0 400 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><rect width="400" height="180" fill="${dark}"/><path d="M0 180L150 0H200L50 180M210 180L360 0H400L250 180" fill="${mid}" opacity=".08"/>${motifs[index%motifs.length]}<text x="16" y="169" font-size="10" fill="${light}">${escapeText(title.toUpperCase())}</text></svg>`;
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
    record.body.innerHTML=toolbar('This PC / Projects')+`<div class="pc-content"><div class="pc-library-header"><div><div class="pc-kicker">PARTH OS / PROJECT LIBRARY</div><h2>Built &amp; explored.</h2><p>Choose a project to see the story and technologies.</p>${github?`<a class="pc-library-intro-link" href="${escapeText(github)}" target="_blank" rel="noopener noreferrer">Visit GitHub profile ↗</a><button type="button" class="pc-github-trigger" data-github>Browse GitHub repositories →</button>`:''}</div><span class="pc-library-count">${portfolio.projects.length} PROJECTS</span></div><div class="pc-gallery">${portfolio.projects.map((project,i)=>`<button class="pc-game" type="button" data-project="${i}"><span class="pc-game-art">${projectArt(i,project.title)}</span><span class="pc-game-info"><strong>${escapeText(project.title)}</strong><span class="pc-game-meta">${escapeText(project.meta)}</span><span class="pc-game-desc">${escapeText(project.description)}</span><span class="pc-game-more">View project →</span></span></button>`).join('')}</div></div>`;
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
    element.innerHTML=`<div class="pc-titlebar"><strong>${escapeText(labels[id])}</strong><button type="button" class="pc-minimize" aria-label="Minimize ${escapeText(labels[id])}">−</button><button type="button" class="pc-close" aria-label="Close ${escapeText(labels[id])}">×</button></div><div class="pc-window-body"></div>`;
    workspace.append(element);const record={element,body:element.querySelector('.pc-window-body')};windows.set(id,record);bring(record);
    element.addEventListener('pointerdown',()=>bring(record));
    element.querySelector('.pc-minimize').onclick=()=>{element.hidden=true;updateTasks();};
    element.querySelector('.pc-close').onclick=()=>{element.remove();windows.delete(id);updateTasks();};
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
  function keydown(event){if(!root.hidden&&event.key==='Escape'){event.preventDefault();event.stopPropagation();close();}}
  root.querySelector('.pc-exit').onclick=close;
  document.addEventListener('keydown',keydown,true);
  return {open(){previouslyFocused=document.activeElement;root.hidden=false;setTime();root.querySelector('.pc-exit').focus();},close,destroy(){dragCleanup?.();document.removeEventListener('keydown',keydown,true);root.remove();}};
}
