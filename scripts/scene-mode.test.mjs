import test from 'node:test';
import assert from 'node:assert/strict';
import { readScenePreference, saveScenePreference, resolveSceneMode, loadScene, disposeWorld, scenePreferenceKey } from '../src/scene-mode.js';

function storage(value=null) {return { getItem:()=>value, setItem:(key,next)=>{assert.equal(key,scenePreferenceKey);value=next;} };}
function fakeWorld() {
  const counts={geometry:0,material:0,texture:0,clear:0};
  const texture={isTexture:true,dispose(){counts.texture++;}};
  const material={map:texture,dispose(){counts.material++;}};
  const geometry={dispose(){counts.geometry++;}};
  return { counts, scene:{traverse(visitor){visitor({geometry,material});visitor({geometry,material});},clear(){counts.clear++;}} };
}
test('Saved choices validate shape, malformed JSON and denied storage',()=>{
  for(const value of [null,'bad','{"mode":"invalid"}','"enhanced"','{}'])assert.equal(readScenePreference(storage(value)),'auto');
  const saved=storage();assert.equal(saveScenePreference(saved,'enhanced'),true);assert.equal(readScenePreference(saved),'enhanced');
  assert.equal(saveScenePreference(saved,'bad'),false);
  const denied={getItem(){throw Error('denied');},setItem(){throw Error('denied');}};
  assert.equal(readScenePreference(denied),'auto');assert.equal(saveScenePreference(denied,'classic'),false);
});
test('Automatic capability choice is conservative and explicit overrides remain available',()=>{
  assert.equal(resolveSceneMode(),'enhanced');
  for(const hints of [{coarsePointer:true},{memory:4},{cores:4}])assert.equal(resolveSceneMode(hints),'classic');
  assert.equal(resolveSceneMode({preference:'enhanced',memory:2,coarsePointer:true}),'enhanced');
  assert.equal(resolveSceneMode({preference:'enhanced',recovery:true}),'classic');
  assert.equal(resolveSceneMode({preference:'classic'}),'classic');
});
test('Classic startup skips the enhanced module entirely',async()=>{
  const world=fakeWorld();const result=await loadScene({},'classic',{createClassic:()=>world,loadEnhanced:()=>assert.fail('must not load')});
  assert.equal(result.world,world);assert.equal(result.recovered,false);
});
test('Enhanced import and factory failures recover to classic',async()=>{
  for(const loadEnhanced of [()=>Promise.reject(Error('asset unavailable')),()=>({createEnhancedWorld(){throw Error('initialization failed');}})]){
    const world=fakeWorld();const result=await loadScene({},'enhanced',{createClassic:()=>world,loadEnhanced});
    assert.equal(result.world,world);assert.equal(result.mode,'classic');assert.equal(result.recovered,true);
  }
});
test('Timed-out loading recovers, and late enhanced resources are disposed',async()=>{
  const late=fakeWorld();let resolve;
  const module=new Promise(done=>{resolve=done;});
  const result=await loadScene({},'enhanced',{createClassic:fakeWorld,loadEnhanced:()=>module,timeoutMs:5});
  assert.equal(result.recovered,true);
  resolve({createEnhancedWorld:()=>late});
  await new Promise(done=>setTimeout(done,0));
  assert.deepEqual(late.counts,{geometry:1,material:1,texture:1,clear:1});
});
test('Disposal releases shared resources once',()=>{
  const world=fakeWorld();disposeWorld(world);
  assert.deepEqual(world.counts,{geometry:1,material:1,texture:1,clear:1});
});
