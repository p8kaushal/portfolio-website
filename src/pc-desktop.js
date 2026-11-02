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
    .pc-window{position:absolute;top:7%;left:18%;width:min(690px,75%);height:min(510px,82%);display:flex;flex-direction:column;background:#f4f2e9;color:#273a30;box-shadow:0 15px 50px #142a2475;border:1px solid #647b6a;border-radius:5px;overflow:hidden}.pc-window[hidden]{display:none}.pc-titlebar{background:#e9eee3;min-height:42px;display:flex;align-items:center;padding-left:14px;border-bottom:1px solid #cdd8c9;touch-action:none;user-select:none}.pc-titlebar strong{font-size:12px;flex:1}.pc-titlebar button{height:40px;width:42px;border:0;background:transparent;color:#34473a;font-size:18px}.pc-titlebar button:hover{background:#d9e0d3}.pc-titlebar .pc-close:hover{background:#c75c4d;color:white}.pc-window-body{flex:1;overflow:auto;color:#293d31}.pc-toolbar{display:flex;align-items:center;gap:10px;padding:10px 15px;background:#f9faf5;border-bottom:1px solid #dbe3d7;font-size:12px}.pc-toolbar button{border:0;background:transparent;padding:5px;color:#4c6c56}.pc-address{flex:1;border:1px solid #dce4d9;background:white;padding:7px 10px;color:#7a8d7b;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.pc-content{padding:24px}.pc-content h2{margin:4px 0 8px;font-size:26px;letter-spacing:-.04em}.pc-content p{color:#617466;line-height:1.6;font-size:13px}.pc-kicker{font:700 10px monospace;letter-spacing:.12em;color:#a4775c;text-transform:uppercase}.pc-files{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px;margin-top:20px}.pc-file{border:1px solid #d9e1d5;background:#fff;color:#273e30;min-height:110px;text-align:left;padding:15px;line-height:1.4}.pc-file:hover{border-color:#718e77;background:#f2f7ed}.pc-file span{display:block;font-size:25px;margin-bottom:8px}.pc-file b{font-size:12px}.pc-card{background:#fff;border:1px solid #dce4d8;padding:18px;margin-top:18px}.pc-card b{font-size:12px;color:#7b927d}.pc-links{display:grid;gap:8px;margin-top:16px}.pc-link{display:block;padding:13px 14px;background:white;border:1px solid #dae4d9;color:#345d43;font-size:13px;text-decoration:none;overflow-wrap:anywhere}.pc-link:hover{background:#edf5ec}.pc-resume-link{display:inline-block;background:#587961;color:#fff;padding:11px 15px;margin-top:8px;text-decoration:none;font-weight:700;font-size:12px}.pc-resume-frame{width:100%;height:calc(100% - 46px);border:0;background:white}
    .pc-taskbar{min-height:50px;display:flex;align-items:center;gap:7px;padding:6px 12px;background:#203a32;border-top:1px solid #ffffff20}.pc-start{background:#d2dfcd;border:0;color:#254232;font-weight:800;padding:8px 10px}.pc-tasks{display:flex;gap:5px;overflow:auto;flex:1}.pc-task{background:#ffffff18;color:#eff7ee;border:0;padding:8px 11px;font-size:11px;white-space:nowrap}.pc-task[aria-pressed=true]{background:#ffffff32}.pc-clock{font:11px monospace;white-space:nowrap;color:#dae6da}
    @media(max-width:650px){.pc-top span{display:none}.pc-workspace .pc-window{left:3%!important;top:3%!important;width:94%;height:88%}.pc-content{padding:18px}.pc-desktop-icons{left:7px;top:10px}.pc-watermark{display:none}.pc-icon{width:70px}.pc-files{grid-template-columns:repeat(2,1fr)}}
  </style><div class="pc-top"><strong>PARTH OS</strong><span>Interactive portfolio desktop</span><button type="button" class="pc-exit">← Leave computer <kbd>Esc</kbd></button></div><div class="pc-workspace"><div class="pc-desktop-icons"><button class="pc-icon" data-launch="projects"><span class="icon">📁</span>Projects</button><button class="pc-icon" data-launch="resume"><span class="icon">📄</span>Résumé.pdf</button><button class="pc-icon" data-launch="browser"><span class="icon">◉</span>Internet</button></div><div class="pc-watermark"><b>Parth OS</b>BUILT TO EXPLORE / V1.0</div></div><div class="pc-taskbar"><button class="pc-start" aria-label="Open projects folder">⌂</button><div class="pc-tasks" aria-label="Open applications"></div><span class="pc-clock"></span></div>`;
  host.append(root);
  const workspace = root.querySelector('.pc-workspace');
  const tasks = root.querySelector('.pc-tasks');
  const clock = root.querySelector('.pc-clock');
  const windows = new Map();
  let z = 5, previouslyFocused = null, dragCleanup = null;
  const escapeText = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const labels = {projects:'Projects', resume:'Résumé.pdf', browser:'Internet'};
  const allLinks = portfolio.contact.filter(item => item.href && /^https?:/.test(item.href));
  function setTime(){clock.textContent = new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});}
  function updateTasks(){
    tasks.replaceChildren();
    windows.forEach((record, id) => {
      const button=document.createElement('button');button.type='button';button.className='pc-task';button.textContent=labels[id];button.setAttribute('aria-pressed', String(!record.element.hidden));button.onclick=()=>{record.element.hidden=false;bring(record);};tasks.append(button);
    });
  }
  function bring(record){record.element.style.zIndex=String(++z);updateTasks();}
  function toolbar(path, back=false){return `<div class="pc-toolbar">${back?'<button type="button" data-back aria-label="Back to projects">←</button>':'<span aria-hidden="true">‹ &nbsp; ›</span>'}<div class="pc-address">${escapeText(path)}</div></div>`;}
  function showFolder(record){record.body.innerHTML=toolbar('This PC / Projects')+`<div class="pc-content"><div class="pc-kicker">LOCAL FILES / ${portfolio.projects.length} ITEMS</div><h2>Projects</h2><p>A few things I’ve built and explored. Open a file to see more.</p><div class="pc-files">${portfolio.projects.map((project,i)=>`<button class="pc-file" type="button" data-project="${i}"><span>📄</span><b>${escapeText(project.title)}</b></button>`).join('')}</div></div>`;record.body.querySelectorAll('[data-project]').forEach(button=>button.onclick=()=>showProject(record,Number(button.dataset.project)));}
  function showProject(record,index){const project=portfolio.projects[index];record.body.innerHTML=toolbar('This PC / Projects / '+project.title,true)+`<div class="pc-content"><div class="pc-kicker">PROJECT FILE / ${escapeText(project.meta)}</div><h2>${escapeText(project.title)}</h2><p>${escapeText(project.description)}</p><div class="pc-card"><b>TECHNOLOGIES</b><p>${escapeText(project.details)}</p></div></div>`;record.body.querySelector('[data-back]').onclick=()=>showFolder(record);}
  function showBrowser(record){record.body.innerHTML=toolbar('parth://bookmarks')+`<div class="pc-content"><div class="pc-kicker">YOUR START PAGE</div><h2>Find me online.</h2><p>Explore Parth’s confirmed links. These open in a new browser tab.</p><div class="pc-links">${allLinks.map(item=>`<a class="pc-link" href="${escapeText(item.href)}" target="_blank" rel="noopener noreferrer"><strong>${escapeText(item.title)}</strong> &nbsp; ${escapeText(item.label)} ↗</a>`).join('')}</div></div>`;}
  function showResume(record){record.body.innerHTML=toolbar('This PC / Desktop / Résumé.pdf')+`<div style="padding:8px 15px;background:#f9faf5"><a href="${escapeText(portfolio.resumeUrl)}" target="_blank" rel="noopener noreferrer" style="color:#345d43;font-size:12px">Open résumé in a new tab ↗</a></div><iframe class="pc-resume-frame" title="Parth Kaushal’s résumé" src="${escapeText(portfolio.resumeUrl)}"></iframe>`;}
  function launch(id){
    if(windows.has(id)){const record=windows.get(id);record.element.hidden=false;bring(record);return;}
    const element=document.createElement('section');element.className='pc-window';element.setAttribute('role','region');element.setAttribute('aria-label',labels[id]);
    element.innerHTML=`<div class="pc-titlebar"><strong>${escapeText(labels[id])}</strong><button type="button" class="pc-minimize" aria-label="Minimize ${escapeText(labels[id])}">−</button><button type="button" class="pc-close" aria-label="Close ${escapeText(labels[id])}">×</button></div><div class="pc-window-body"></div>`;
    workspace.append(element);const record={element,body:element.querySelector('.pc-window-body')};windows.set(id,record);bring(record);
    element.addEventListener('pointerdown',()=>bring(record));
    element.querySelector('.pc-minimize').onclick=()=>{element.hidden=true;updateTasks();};
    element.querySelector('.pc-close').onclick=()=>{element.remove();windows.delete(id);updateTasks();};
    const titlebar=element.querySelector('.pc-titlebar');titlebar.addEventListener('pointerdown', event=>{
      if(event.target.closest('button') || matchMedia('(max-width:650px)').matches)return;
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
