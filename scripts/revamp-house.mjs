import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {chromium} from 'playwright';

const baseURL=process.env.PORTFOLIO_URL||'http://127.0.0.1:4175';
const output='test-results/revamp-house';await mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true});
const report={rooms:[],pageErrors:[],consoleWarnings:[],consoleErrors:[]};
try {
  for(const room of [
    {name:'living',x:0,z:-.2,yaw:0,pitch:0},
    {name:'bedroom',x:-8,z:.5,yaw:.12,pitch:0},
    {name:'studio',x:8.2,z:-.4,yaw:0,pitch:0},
    {name:'wardrobe',x:-9.6,z:3.2,yaw:Math.PI/2,pitch:0}
  ]) {
    const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
    await context.addInitScript(room=>{
      localStorage.setItem('portfolio-house-scene-v1',JSON.stringify({mode:'enhanced'}));
      localStorage.setItem('portfolio-house-graphics-v1',JSON.stringify({quality:'auto',resolution:'auto',timeMode:'day'}));
      sessionStorage.setItem('portfolio-house-session-v1',JSON.stringify({...room,noticeShown:true,playableSeconds:0}));
    },room);
    const page=await context.newPage();page.on('pageerror',error=>report.pageErrors.push(error.message));
    page.on('console',message=>{if(message.type()==='warning'&&!message.text().includes('GL Driver Message'))report.consoleWarnings.push(message.text());});
    page.on('console',message=>{if(message.type()==='error')report.consoleErrors.push(message.text());});
    await page.goto(baseURL,{waitUntil:'networkidle'});
    await page.waitForSelector('[data-scene-mode="enhanced"]');
    await page.locator('#resume-game').click();await page.locator('#game-hud').waitFor({state:'visible'});
    const day=await page.locator('#scene').screenshot({path:`${output}/${room.name}-day.png`});
    if(room.name==='living')await page.screenshot({path:`${output}/desktop.png`,fullPage:true});
    await page.locator('#menu-toggle').click();await page.locator('#settings').click();
    await page.locator('#gs-time').selectOption('night');
    await page.getByRole('button',{name:'Close settings',exact:true}).click();
    await page.locator('#game-hud').waitFor({state:'visible'});
    const night=await page.locator('#scene').screenshot({path:`${output}/${room.name}-night.png`});
    assert.notDeepEqual(day,night,`${room.name}: day/night must visibly differ with reduced motion`);
    if(room.name==='bedroom')for(const quality of ['high','balanced','low']) {
      await page.locator('#menu-toggle').click();await page.locator('#settings').click();
      await page.locator('#gs-quality').selectOption(quality);await page.locator('#gs-time').selectOption('day');
      await page.getByRole('button',{name:'Close settings',exact:true}).click();
      await page.locator('#scene').screenshot({path:`${output}/bedroom-${quality}.png`});
    }
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    report.rooms.push({name:room.name,dayNightDifferent:true,overflow:false});
    await context.close();
  }
  assert.deepEqual(report.pageErrors,[]);
  assert.deepEqual(report.consoleWarnings,[]);
  assert.deepEqual(report.consoleErrors,[]);
  await writeFile(`${output}/report.json`,JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
} finally {await browser.close();}
