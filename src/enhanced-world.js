import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { createWorld } from './world.js';
import { disposeWorld } from './scene-mode.js';
import { buildStudio } from './enhanced/studio.js';
import { createPrimitives } from './enhanced/primitives.js';
import { buildArchitecture } from './enhanced/architecture.js';
import { buildBedroom } from './enhanced/bedroom.js';
import { buildLivingRoom } from './enhanced/living-room.js';

/** Batch static opaque surfaces by material; keep animated markers/character separate.
 * @param {any} THREE @param {any} world
 */
export function batchStaticSurfaces(THREE, world) {
  /** @type {Map<string, {material:any,objects:any[]}>} */
  const batches=new Map();
  world.scene.updateMatrixWorld(true);
  world.scene.traverse((/** @type {any} */ object) => {
    if(!object.isMesh || !object.material?.isMeshStandardMaterial || object.material.transparent) return;
    for(let parent=object.parent;parent;parent=parent.parent)if(parent===world.character)return;
    const key=`${object.material.uuid}:${Number(object.castShadow)}:${Number(object.receiveShadow)}`;
    if(!batches.has(key))batches.set(key,{material:object.material,objects:[]});
    batches.get(key)?.objects.push(object);
  });
  let removed=0;
  for(const {material,objects} of batches.values()) {
    if(objects.length<2)continue;
    const copies=objects.map(object=>{
      const copy=object.geometry.index?object.geometry.toNonIndexed():object.geometry.clone();
      copy.applyMatrix4(object.matrixWorld);return copy;
    });
    const geometry=mergeGeometries(copies,false);
    for(const copy of copies)copy.dispose();
    if(!geometry)throw new Error('Static surface merge failed');
    const merged=new THREE.Mesh(geometry,material);merged.name='static-surfaces';
    merged.castShadow=objects[0].castShadow;merged.receiveShadow=objects[0].receiveShadow;
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
  /** @type {ReturnType<typeof createPrimitives>} */
  let tools;
  /** @type {{setDaylight:(amount:number)=>void}[]} */
  const rooms=[];
  try {
    const world=createWorld(THREE,{
      scene,localLights:false,flatShading:false,legacyAccents:false,
      buildArchitecture:context=>{tools=createPrimitives(THREE,scene,context.colliders);buildArchitecture(THREE,context,tools);},
      buildBedroom:context=>{rooms.push(buildBedroom(THREE,context,tools));},
      buildStudio:context=>{rooms.push(buildStudio(THREE,context,tools));},
      buildLivingRoom:context=>{rooms.push(buildLivingRoom(THREE,context,tools));}
    });
    scene.fog=new THREE.Fog('#c4c9bf',26,65);
    const hemisphere=scene.children.find((/** @type {any} */ object)=>object.isHemisphereLight);
    const sun=scene.children.find((/** @type {any} */ object)=>object.isDirectionalLight);
    if(sun){sun.position.set(-4,14,-3);sun.castShadow=true;Object.assign(sun.shadow.camera,{left:-20,right:20,top:16,bottom:-16,near:.5,far:45});sun.shadow.camera.updateProjectionMatrix();sun.shadow.bias=-.0005;sun.shadow.normalBias=.04;sun.shadow.radius=2;sun.shadow.autoUpdate=false;}
    const dayGround=new THREE.Color('#c7bca6'),nightGround=new THREE.Color('#736451');
    const dayFill=new THREE.Color('#ffedcf'),nightFill=new THREE.Color('#bdcdda');
    // Preserve all classic contracts and interaction locations.
    const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
    let lastReducedMotion=motion.matches;
    const updateClassic=world.update,setClassicTime=world.setTimeMode,setClassicQuality=world.setQuality;
    let mode='cycle',lastDaylight=-Infinity;
    /** @type {number|null} */
    let cycleStart=null;
    /** @param {number} amount */
    function daylight(amount){for(const room of rooms)room.setDaylight(amount);if(hemisphere){hemisphere.groundColor.lerpColors(nightGround,dayGround,amount);hemisphere.color.lerpColors(nightFill,dayFill,amount);}}
    world.setTimeMode=value=>{mode=['day','night','cycle'].includes(value)?value:'cycle';cycleStart=null;lastDaylight=-Infinity;setClassicTime(mode);daylight(mode==='night'?0:1);};
    world.update=(now=0)=>{
      if(motion.matches!==lastReducedMotion){lastReducedMotion=motion.matches;cycleStart=null;lastDaylight=-Infinity;}
      updateClassic(now);
      if(mode==='cycle'&&now-lastDaylight>=100){if(cycleStart===null)cycleStart=now;daylight(motion.matches?1:.5+.5*Math.cos((now-cycleStart)/180000*Math.PI*2));lastDaylight=now;}
    };
    world.setQuality=level=>{setClassicQuality(level);};
    batchStaticSurfaces(THREE,world);
    scene.userData.variant='enhanced';
    world.setTimeMode('cycle');
    let shadowQuality='';
    /** @param {any} renderer @param {string} quality */
    function configureRenderer(renderer,quality) {
      renderer.shadowMap.enabled=quality==='high';renderer.shadowMap.type=THREE.BasicShadowMap;
      if(sun)sun.shadow.intensity=.4;
      renderer.shadowMap.autoUpdate=false;
      if(sun&&shadowQuality!==quality){
        shadowQuality=quality;const size=1024;
        sun.shadow.mapSize.set(size,size);sun.shadow.map?.dispose();sun.shadow.map=null;
        sun.shadow.needsUpdate=true;renderer.shadowMap.needsUpdate=true;
      }
    }
    return {...world,configureRenderer};
  } catch(error) {disposeWorld({scene});throw error;}
}
