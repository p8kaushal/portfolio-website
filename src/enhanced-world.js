import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { createWorld } from './world.js';
import { disposeWorld } from './scene-mode.js';
import { buildStudio } from './enhanced/studio.js';

/** Batch static opaque surfaces by material; keep animated markers/character separate.
 * @param {any} THREE @param {any} world
 */
export function batchStaticSurfaces(THREE, world) {
  /** @type {Map<any, any[]>} */
  const batches=new Map();
  world.scene.updateMatrixWorld(true);
  world.scene.traverse((/** @type {any} */ object) => {
    if(!object.isMesh || !object.material?.isMeshStandardMaterial || object.material.transparent) return;
    for(let parent=object.parent;parent;parent=parent.parent)if(parent===world.character)return;
    if(!batches.has(object.material))batches.set(object.material,[]);
    batches.get(object.material)?.push(object);
  });
  let removed=0;
  for(const [material,objects] of batches) {
    if(objects.length<2)continue;
    const copies=objects.map(object=>{
      const copy=object.geometry.index?object.geometry.toNonIndexed():object.geometry.clone();
      copy.applyMatrix4(object.matrixWorld);return copy;
    });
    const geometry=mergeGeometries(copies,false);
    for(const copy of copies)copy.dispose();
    if(!geometry)throw new Error('Static surface merge failed');
    const merged=new THREE.Mesh(geometry,material);merged.name='static-surfaces';
    world.scene.add(merged);
    const oldGeometries=new Set();
    for(const object of objects){object.removeFromParent();oldGeometries.add(object.geometry);removed++;}
    for(const old of oldGeometries)old.dispose();
  }
  world.scene.userData.batchedSurfaceCount=removed;
}

/** @param {any} THREE */
export function createEnhancedWorld(THREE) {
  const scene=new THREE.Scene();
  /** @type {ReturnType<typeof buildStudio>} */
  let studio;
  try {
    const world=createWorld(THREE,{scene,localLights:false,buildStudio:(/** @type {Parameters<typeof buildStudio>[1]} */ context)=>{studio=buildStudio(THREE,context);}});
    // Preserve all classic contracts and interaction locations.
    const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateClassic=world.update,setClassicTime=world.setTimeMode,setClassicQuality=world.setQuality;
    let mode='cycle',lastDaylight=-Infinity;
    /** @type {number|null} */
    let cycleStart=null;
    /** @param {number} amount */
    function daylight(amount){studio.setDaylight(amount);}
    world.setTimeMode=value=>{mode=['day','night','cycle'].includes(value)?value:'cycle';cycleStart=null;lastDaylight=-Infinity;setClassicTime(mode);daylight(mode==='night'?0:1);};
    world.update=(now=0)=>{
      updateClassic(now);
      if(mode==='cycle'&&now-lastDaylight>=100){if(cycleStart===null)cycleStart=now;daylight(motion.matches?1:.5+.5*Math.cos((now-cycleStart)/180000*Math.PI*2));lastDaylight=now;}
    };
    world.setQuality=level=>{setClassicQuality(level);};
    const smoothMaterials=new Map();
    world.character.traverse((/** @type {any} */ object)=>{if(!object.isMesh)return;if(!smoothMaterials.has(object.material)){const material=object.material.clone();material.flatShading=false;smoothMaterials.set(object.material,material);}object.material=smoothMaterials.get(object.material);});
    batchStaticSurfaces(THREE,world);
    scene.userData.variant='enhanced';
    world.setTimeMode('cycle');
    return world;
  } catch(error) {disposeWorld({scene});throw error;}
}
