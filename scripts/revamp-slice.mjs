import assert from 'node:assert/strict';
import { mkdir,writeFile,readFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const baseURL=process.env.PORTFOLIO_URL||'http://127.0.0.1:5175';
const output='test-results/revamp-slice';await mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true});
const report={baseURL,checks:[],pageErrors:[]};
let enhancedFile;
try {enhancedFile=JSON.parse(await readFile('.svelte-kit/output/client/.vite/manifest.json','utf8'))['src/enhanced-world.js'].file;}catch{ /* Development tests use the source URL. */ }
async function pageFor(mode,options={}) {
  const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce',...options});
  await context.addInitScript(mode=>{
    if(mode&&!localStorage.getItem('portfolio-house-scene-v1'))localStorage.setItem('portfolio-house-scene-v1',JSON.stringify({mode}));
    sessionStorage.setItem('portfolio-house-session-v1',JSON.stringify({x:8.2,z:-.4,yaw:0,pitch:0,noticeShown:true,playableSeconds:0}));
  },mode);
  const page=await context.newPage();page.on('pageerror',error=>report.pageErrors.push(error.message));
  return {page,context};
}
async function ready(page,mode) {await page.waitForSelector(`[data-scene-mode="${mode}"]`);await page.locator('#resume-game:not([disabled])').waitFor();}
try {
  for(const mode of ['classic','enhanced']) {
    const {page,context}=await pageFor(mode);
    await page.goto(baseURL,{waitUntil:'networkidle'});await ready(page,mode);
    await page.locator('#resume-game').click();await page.locator('#game-hud').waitFor({state:'visible'});
    await page.screenshot({path:`${output}/${mode}-studio.png`,fullPage:true});
    await page.locator('#menu-toggle').click();await page.locator('#settings').click();
    for(const time of ['night','day']) {
      await page.locator('#gs-time').selectOption(time);
      await page.getByRole('button',{name:'Close settings',exact:true}).click();
      await page.screenshot({path:`${output}/${mode}-${time}.png`,fullPage:true});
      await page.locator('#menu-toggle').click();await page.locator('#settings').click();
    }
    await page.locator('#settings-house-style').selectOption(mode==='enhanced'?'classic':'enhanced');
    await page.locator('.scene-choice-compact button').click();
    await ready(page,mode==='enhanced'?'classic':'enhanced');
    assert.equal(await page.locator('#scene > canvas').count(),1);
    await page.reload({waitUntil:'networkidle'});await ready(page,mode==='enhanced'?'classic':'enhanced');
    report.checks.push(`${mode}: studio/day/night captures and live style switch`);
    await context.close();
  }
  const failed=await pageFor('enhanced');
  await failed.page.route('**/enhanced-world.js*',route=>route.abort());
  if(enhancedFile)await failed.page.route(`**/${enhancedFile}`,route=>route.abort());
  await failed.page.goto(baseURL,{waitUntil:'networkidle'});await ready(failed.page,'classic');
  assert.match(await failed.page.locator('.scene-choice:not(.scene-choice-compact) [role=status]').textContent(),/unavailable/);
  report.checks.push('Enhanced module failure automatically recovers to classic');
  await failed.context.close();

  const lost=await pageFor('enhanced');await lost.page.goto(baseURL,{waitUntil:'networkidle'});await ready(lost.page,'enhanced');
  await lost.page.evaluate(()=>document.querySelector('#scene canvas').getContext('webgl2').getExtension('WEBGL_lose_context').loseContext());
  await ready(lost.page,'classic');
  report.checks.push('WebGL context loss in enhanced automatically remounts classic');await lost.context.close();

  const unavailable=await pageFor('classic');
  await unavailable.context.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return type.startsWith('webgl')?null:original.call(this,type,...args);};});
  await unavailable.page.goto(baseURL,{waitUntil:'networkidle'});
  await unavailable.page.locator('.error').waitFor();
  await unavailable.page.getByRole('button',{name:'Portfolio menu',exact:true}).click();
  await unavailable.page.getByRole('button',{name:'Projects',exact:true}).click();
  await unavailable.page.getByRole('heading',{name:'Projects',exact:true}).waitFor();
  assert.equal((await unavailable.context.request.get(`${baseURL}/2d/index.html`)).status(),200);
  report.checks.push('Unsupported WebGL keeps direct portfolio and 2D usable');await unavailable.context.close();

  const mobile=await pageFor(null,{viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  await mobile.page.goto(baseURL,{waitUntil:'networkidle'});await ready(mobile.page,'classic');
  report.checks.push('Automatic coarse-pointer choice starts classic');await mobile.context.close();

  const corrupt=await pageFor(null);
  await corrupt.context.addInitScript(()=>localStorage.setItem('portfolio-house-scene-v1','invalid json'));
  await corrupt.page.goto(baseURL,{waitUntil:'networkidle'});
  await corrupt.page.locator('#resume-game:not([disabled])').waitFor();
  assert.equal(await corrupt.page.locator('#house-style').inputValue(),'auto');
  report.checks.push('Corrupt saved preference recovers to automatic');await corrupt.context.close();

  const denied=await pageFor(null);
  await denied.context.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Storage denied','SecurityError');}}));
  await denied.page.goto(baseURL,{waitUntil:'networkidle'});await denied.page.locator('#resume-game:not([disabled])').waitFor();
  await denied.page.locator('#house-style').selectOption('classic');
  await denied.page.locator('.scene-choice:not(.scene-choice-compact) button').click();await ready(denied.page,'classic');
  assert.equal(await denied.page.locator('#house-style').inputValue(),'classic');
  report.checks.push('Denied storage still permits an explicit in-memory style choice');await denied.context.close();
  assert.deepEqual(report.pageErrors,[]);
  await writeFile(`${output}/report.json`,JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
} finally {await browser.close();}
