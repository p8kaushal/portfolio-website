// @ts-nocheck
import { createStylizedCharacter } from './stylized-character.js';
/** @typedef {{scene:any,colliders:{minX:number,maxX:number,minZ:number,maxZ:number}[]}} RoomContext */
/** Procedural, asset-free house for the first-person portfolio.
 * The default path is the preserved classic scene; room builders share its interaction contract.
 * @param {any} THREE
 * @param {{scene?:any,localLights?:boolean,flatShading?:boolean,legacyAccents?:boolean,buildArchitecture?:(context:RoomContext)=>void,buildBedroom?:(context:RoomContext)=>void,buildStudio?:(context:RoomContext)=>void,buildLivingRoom?:(context:RoomContext)=>void,daySkyColor?:string,nightSkyColor?:string}} [options]
 */
export function createWorld(THREE, { scene = new THREE.Scene(), buildArchitecture, buildBedroom, buildStudio, buildLivingRoom, localLights = true, flatShading = true, legacyAccents = true, daySkyColor = '#c8b49a', nightSkyColor = '#384451' } = {}) {
  scene.background = new THREE.Color('#c8b49a');
  // Distance haze and a warm, flat-lit palette evoke early 3D game worlds.
  scene.fog = new THREE.Fog('#c8b49a', 18, 43);
  const colliders = [];
  const materials = {};
  const mat = (color, roughness = 1) => { if (!materials[color]) { const softened = new THREE.Color(color); const hsl = {}; softened.getHSL(hsl); softened.setHSL(hsl.h, hsl.s * .78, hsl.l); materials[color] = new THREE.MeshStandardMaterial({ color: softened, roughness, flatShading }); } return materials[color]; };
  const box = (x, y, z, w, h, d, color, collision = false) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(color));
    mesh.position.set(x, y, z);
    scene.add(mesh);
    if (collision) colliders.push({ minX: x - w / 2, maxX: x + w / 2, minZ: z - d / 2, maxZ: z + d / 2 });
    return mesh;
  };
  const cylinder = (x,y,z,r1,r2,h,color,segments=12) => {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,segments),mat(color));
    mesh.position.set(x,y,z);scene.add(mesh);return mesh;
  };
  const wall = (x,z,w,d,h=3.5) => box(x,h/2,z,w,h,d,'#bbac8b',true);
  const leg = (x,z) => box(x,.35,z,.13,.7,.13,'#694c3e');
  const table = (x,z,w,d,color='#a77856') => {
    box(x,.77,z,w,.14,d,color,true);
    for (const dx of [-w/2+.15,w/2-.15]) for (const dz of [-d/2+.15,d/2-.15]) leg(x+dx,z+dz);
  };
  const plant = (x,z,scale=1) => {
    cylinder(x,.24*scale,z,.26*scale,.2*scale,.48*scale,'#b5755b');
    cylinder(x,.49*scale,z,.18*scale,.18*scale,.07*scale,'#5a4937');
    const leaf = new THREE.Mesh(new THREE.IcosahedronGeometry(.38*scale,0),mat('#648365')); leaf.position.set(x,.91*scale,z); scene.add(leaf);
    const leaf2 = new THREE.Mesh(new THREE.IcosahedronGeometry(.26*scale,0),mat('#809a70')); leaf2.position.set(x+.22*scale,.78*scale,z-.08*scale); scene.add(leaf2);
  };
  const art = (x,y,z,w,h,color,side='back') => {
    if (side === 'back') { box(x,y,z,w+.12,h+.12,.06,'#735c49'); box(x,y,z+.04,w,h,.03,color); }
    else { box(x,y,z,.06,h+.12,w+.12,'#735c49'); box(x+.04,y,z,.03,h,w,color); }
  };
  const rug = (x,z,w,d,color) => { box(x,.035,z,w,.045,d,color); box(x,.06,z,w-.13,.012,d-.13,'#d7bd9e'); box(x,.07,z,w-.25,.012,d-.25,color); };

  // A compact but generous layout: bedroom left, living space middle, studio right.
  // About 28 by 18 units, with wide passages and direct lines between rooms.
  const windowMaterial = new THREE.MeshBasicMaterial({color:'#c9c0a7'});
  const windowBodies=[];
  if(buildArchitecture) {
    buildArchitecture({scene,colliders});
  } else {
  box(0,-.12,1,28,.24,18,'#8c7357');
  box(-9.2,.008,1,9.5,.025,17.5,'#bfa47d');
  box(0,.009,1,8.7,.03,17.5,'#bea47f');
  box(9.2,.008,1,9.5,.025,17.5,'#aea07d');
  // Wooden floor seams are real geometry, not image textures.
  for (let z=-7.45;z<9.8;z+=.7) box(0,.026,z,27.4,.008,.013,'#967e5e');
  wall(0,-8,28.4,.35); wall(0,10,28.4,.35); wall(-14,1,.35,18); wall(14,1,.35,18);
  // Openings in both room dividers, wide enough for accessible movement.
  wall(-4.5,-5.25,.28,5.5); wall(-4.5,5.55,.28,8.9);
  wall(4.5,-5.25,.28,5.5); wall(4.5,5.55,.28,8.9);
  // Timber doorway headers give each passage a deliberate architectural frame.
  for (const x of [-4.5,4.5]) { box(x,3.18,-.7,.4,.25,3.7,'#af9274'); box(x,1.55,-2.55,.4,3.1,.16,'#af9274'); box(x,1.55,1.15,.4,3.1,.16,'#af9274'); }
  // Skirting gives the architecture a crisp, designed edge.
  box(0,.16,-7.79,27.7,.25,.08,'#b39d80'); box(0,.16,9.79,27.7,.25,.08,'#b39d80');
  // Window treatment is procedurally modelled; no textures are loaded.
  const windowBack=(x,z=-7.77)=>{
    box(x,2.2,z,2.5,1.65,.07,'#9b765e');
    const pane=box(x,2.2,z+.05,2.27,1.42,.06,'#cfab79');pane.material=windowMaterial;
    // The sun and moon are drawn within each pane in front of the sky and behind the mullions.
    const sunDisc=new THREE.Mesh(new THREE.CircleGeometry(.145,16),new THREE.MeshBasicMaterial({color:'#f5dda2',transparent:true,depthWrite:false,fog:false}));
    const moonDisc=new THREE.Mesh(new THREE.CircleGeometry(.12,16),new THREE.MeshBasicMaterial({color:'#e5e9e4',transparent:true,depthWrite:false,fog:false}));
    sunDisc.position.set(x-.55,2.45,z+.091);moonDisc.position.set(x+.55,2.45,z+.092);scene.add(sunDisc,moonDisc);
    windowBodies.push({x,z,sunDisc,moonDisc});
    box(x,2.2,z+.11,.07,1.42,.03,'#e1c59c');box(x,2.2,z+.11,2.27,.07,.03,'#e1c59c');
  };
  windowBack(-8.3); windowBack(0); windowBack(8.4);
  }

  // BEDROOM: bed, nightstand, wardrobe and mirror.
  if(buildBedroom) {
    buildBedroom({scene,colliders});
  } else {
  rug(-8.1,-2.2,5.8,4.6,'#a36d5b');
  box(-9,-3.0+3.42,-4.15,3.35,.55,4.4,'#805d4b',true);
  box(-9,.78,-4.15,3.12,.34,4.15,'#d9ccb0');
  box(-9,.99,-3.4,3.12,.16,2.55,'#a96853');
  box(-9.75,1.02,-5.55,1.15,.18,.72,'#e1d4b8'); box(-8.3,1.02,-5.55,1.15,.18,.72,'#e1d4b8');
  box(-10.86,.7,-5.1,.8,1.35,1.2,'#ad8a68',true); box(-10.86,1.41,-5.1,.86,.1,1.25,'#d0aa7b');
  cylinder(-10.86,1.65,-5.1,.17,.23,.4,'#e5c88f');
  // Wardrobe sits flush to the bedroom's west wall; its mirror faces the room.
  box(-12.95,1.45,3.2,1.75,2.9,3.7,'#795e4c',true);
  box(-12.035,1.53,3.2,.09,2.52,1.45,'#5d4b3e');
  box(-11.975,1.53,3.2,.04,2.34,1.26,'#a8b8b4');
  box(-11.94,1.53,2.87,.012,2.15,.025,'#d5ded1');
  box(-12.025,1.47,4.45,.08,2.45,.08,'#b19576');
  box(-11.98,1.35,4.53,.05,.23,.05,'#d9bb79');
  box(-12.035,1.47,1.95,.08,2.45,.08,'#b19576');
  box(-11.98,1.35,1.87,.05,.23,.05,'#d9bb79');
  art(-7.6,2,-7.74,1.0,.7,'#d5a27e'); plant(-5.5,7.6,1.25);
  // A low reading bench and wall accents give the larger bedroom a useful edge.
  box(-12.65,.43,6.3,1.5,.65,2.5,'#b88f74',true); box(-12.65,.8,6.3,1.4,.12,2.35,'#dfc7a7');
  box(-13.78,2.2,2.7,.08,1.15,1.5,'#bca286'); box(-13.72,2.2,2.7,.04,.95,1.3,'#d6b8a0');
  }
  
  // STUDIO: long desk, monitor, keyboard, paper file and chair.
  if (buildStudio) {
    buildStudio({ scene, colliders });
  } else {
  rug(8,-3.35,5.9,4.8,'#7d8569');
  table(8,-5.25,5.6,1.65);
  box(7.55,1.72,-5.55,1.9,1.12,.16,'#343f3b');
  box(7.55,1.73,-5.44,1.68,.89,.04,'#718c7a');
  // Desktop icons are small geometric marks on the screen.
  box(6.95,1.97,-5.41,.18,.18,.015,'#e4c795'); box(6.95,1.68,-5.41,.18,.18,.015,'#d7e2ca');
  box(7.55,1.04,-5.53,.14,.34,.14,'#3d4940'); box(7.55,.91,-5.5,.65,.08,.35,'#3d4940');
  box(7.55,.9,-4.92,1.2,.08,.37,'#e3d9c0');
  for(let i=0;i<9;i++) box(7.08+i*.12,.95,-4.92,.07,.012,.2,'#827e70');
  box(9.5,.9,-5.13,.78,.08,.55,'#f4ead1'); box(9.5,.95,-5.13,.64,.035,.43,'#d6aa76');
  box(10.6,1.25,-5.32,.65,.78,.72,'#59665b'); box(10.6,1.4,-4.94,.25,.06,.02,'#d5b979');
  // Chair is movable in appearance only; keep its footprint collidable.
  box(7.6,.58,-3.45,1.0,.16,1.0,'#788c78',true); box(7.6,1.0,-3.0,1.0,.95,.15,'#788c78');
  for(const dx of [-.38,.38]) for(const dz of [-.38,.38]) box(7.6+dx,.25,-3.45+dz,.1,.5,.1,'#5d6659');
  // Studio storage sits against the east wall rather than floating in the room.
  // The shelves and their contents share the same offsets as the cabinet.
  box(13.02,1.1,2.7,1.6,2.2,2.7,'#a58266',true);
  for(let y=.65;y<2.1;y+=.48) box(12.18,y,2.7,.12,.08,2.5,'#d5b48b');
  for(let i=0;i<7;i++) box(12.10,.8+(i%3)*.48,1.7+i*.32,.16,.35,.22,['#b16e57','#d0ae77','#6d8a76'][i%3]);
  plant(5.5,7.8,1.4);
  // Keep a gap between the two pieces of furniture, with both backs at the wall.
  box(13.05,.65,6.0,1.5,1.3,2.2,'#98745a',true); box(13.05,1.34,6.0,1.55,.08,2.25,'#c5a37e');
  box(13.76,2.2,-.1,.08,1.15,1.6,'#8f715a'); box(13.7,2.2,-.1,.04,.95,1.4,'#b8c9a8');
  }

  // LIVING ROOM: sofa, low table, TV and a small trophy display.
  if(buildLivingRoom) {
    buildLivingRoom({scene,colliders});
  } else {
  rug(0,2.3,6.1,4.6,'#777c5e');
  box(0,.43,4.35,4.25,.7,1.25,'#5f7355',true); box(0,1.0,4.88,4.25,1.1,.32,'#5f7355');
  box(-1.25,.85,4.2,1,.22,.75,'#8c9970'); box(0,.85,4.2,1,.22,.75,'#8c9970'); box(1.25,.85,4.2,1,.22,.75,'#8c9970');
  table(0,1.7,2.5,1.15,'#af8866'); box(.15,.89,1.7,.5,.09,.4,'#eee1bd');
  // Media console is set against the back wall, with a framed flat screen.
  box(0,.48,-7.14,4.2,.85,1.0,'#745b48',true);
  box(0,.93,-7.14,4.28,.10,1.04,'#a58b6d');
  for (const x of [-1.35,0,1.35]) { box(x,.48,-6.62,1.26,.66,.035,'#886e55'); box(x,.53,-6.59,.28,.035,.025,'#c8b28d'); }
  box(0,1.06,-7.05,.85,.10,.45,'#292f2b');
  box(0,1.22,-7.12,.14,.26,.12,'#292f2b');
  box(0,2.06,-7.10,3.65,2.05,.16,'#2b302c');
  box(0,2.08,-7.005,3.39,1.78,.035,'#4b5c50');
  box(0,1.18,-6.98,.09,.035,.02,'#b3b29a');
  // Cabinet backs to the same wall; shelves, frame and trophies use geometry.
  box(-3.13,1.37,-7.46,1.35,2.72,.55,'#795d47',true);
  box(-3.13,2.76,-7.43,1.45,.12,.65,'#b29471');
  box(-3.13,.10,-7.43,1.45,.18,.65,'#5f493b');
  box(-3.13,1.40,-7.15,1.15,2.47,.03,'#4d5040');
  for(let y=.75;y<2.5;y+=.76) box(-3.13,y,-7.13,1.23,.07,.56,'#bda081');
  for(const x of [-3.79,-2.47]) box(x,1.4,-7.10,.08,2.7,.08,'#a88b6a');
  // Distinct cups, stems and plinths make awards legible in the cabinet.
  for(const [x,y] of [[-3.43,.98],[-2.85,.98],[-3.13,1.74]]) {
    box(x,y-.16,-6.98,.30,.10,.24,'#4d4132');
    cylinder(x,y-.04,-6.98,.055,.075,.18,'#b69a57',8);
    cylinder(x,y+.13,-6.98,.16,.095,.22,'#d7b970',10);
    box(x-.19,y+.13,-6.98,.06,.17,.06,'#c9a960');
    box(x+.19,y+.13,-6.98,.06,.17,.06,'#c9a960');
  }
  art(2.8,2,-7.74,1.3,.95,'#cd9a7c'); plant(2.85,8.4,1.1);
  // A console behind the seating defines the larger living room.
  box(-.6,.48,9.25,3.2,.9,.65,'#a17d60',true); box(-.6,.96,9.25,3.3,.08,.7,'#ceb28e');
  cylinder(-1.6,1.13,9.25,.16,.2,.3,'#c58268');
  }

  // Geometric streaks on the floor suggest late-afternoon light without
  // expensive realtime shadows. They are translucent and don't affect collision.
  const lightPatches = [];
  const lightPatch = (x,z,w,d) => {
    const patch = new THREE.Mesh(new THREE.PlaneGeometry(w,d), new THREE.MeshBasicMaterial({color:'#ddd0b5',transparent:true,opacity:.11,depthWrite:false,side:THREE.DoubleSide}));
    patch.rotation.x=-Math.PI/2; patch.rotation.z=-.18; patch.position.set(x,.081,z); scene.add(patch); lightPatches.push(patch.material);
  };
  if(legacyAccents) {
  lightPatch(-8.3,-5.7,2.1,3.4); lightPatch(0,-5.8,2.1,3.4); lightPatch(8.4,-5.8,2.1,3.4);
  // A simple retro rug motif, composed entirely of geometry.
  for(let i=-2;i<=2;i++) box(i*.62,.082,3.05,.28,.014,.28,'#c69e6c');
  // Flat graphic picture details are generated in scene, not imported textures.
  box(2.8,1.85,-7.68,1.04,.07,.02,'#855e4b');
  box(2.48,2.0,-7.67,.13,.27,.02,'#885f4b'); box(2.78,2.06,-7.67,.14,.39,.02,'#885f4b'); box(3.08,1.98,-7.67,.14,.23,.02,'#885f4b');
  }
  const ambient = new THREE.HemisphereLight('#f4e7d4','#74786d',1.35);scene.add(ambient);
  const sun = new THREE.DirectionalLight('#f5e5ce',1.15);sun.position.set(-3,8,4);scene.add(sun);
  // Grounded floor lamps: a weighted base, slender stem, shade and warm bulb.
  // They are decorative and do not obstruct the walkable paths.
  const lamps = [];
  for (const [x,z] of [[-5.8,5.7],[3.25,6.8],[12.8,-2.7]]) {
    cylinder(x,.045,z,.28,.31,.09,'#5d5548',16);
    cylinder(x,.80,z,.045,.055,1.48,'#70604c',10);
    cylinder(x,1.55,z,.11,.08,.12,'#8a765a',10);
    const shade=new THREE.Mesh(new THREE.CylinderGeometry(.19,.32,.42,14,1,true),mat('#d5c7a8'));
    shade.position.set(x,1.76,z);scene.add(shade);
    const glow=new THREE.Mesh(new THREE.SphereGeometry(.09,10,8),new THREE.MeshBasicMaterial({color:'#e9d4af'}));
    glow.position.set(x,1.59,z);scene.add(glow);
    const lamp=new THREE.PointLight('#f6d8ad',0,12,2);lamp.position.set(x,1.62,z);if(localLights)scene.add(lamp);
    lamps.push({lamp,glow});
  }
  // Untextured sky discs are also visible above the open-roof walls when looking up.
  const skySun=new THREE.Mesh(new THREE.CircleGeometry(2.2,24),new THREE.MeshBasicMaterial({color:'#f2d49a',transparent:true,depthWrite:false,fog:false}));
  const skyMoon=new THREE.Mesh(new THREE.CircleGeometry(1.65,24),new THREE.MeshBasicMaterial({color:'#e1e8e4',transparent:true,depthWrite:false,fog:false}));
  skySun.position.set(0,21,-34);skyMoon.position.set(0,21,-34);scene.add(skySun,skyMoon);
  const daySky=new THREE.Color(daySkyColor),nightSky=new THREE.Color(nightSkyColor);
  const dayWindow=new THREE.Color('#c9c0a7'),nightWindow=new THREE.Color('#536476');
  const daySun=new THREE.Color('#f5e5ce'),nightSun=new THREE.Color('#9baec4');
  const dayGlow=new THREE.Color('#e3d3b5'),nightGlow=new THREE.Color('#ffe0ac');
  const lightColor=new THREE.Color();
  let timeMode='cycle', cycleStart=null, lastLighting=-Infinity;
  function applyDaylight(amount, phase=0){
    const daylight=THREE.MathUtils.clamp(amount,0,1),night=1-daylight;
    scene.background.lerpColors(nightSky,daySky,daylight);
    scene.fog.color.copy(scene.background);
    windowMaterial.color.lerpColors(nightWindow,dayWindow,daylight);
    sun.color.lerpColors(nightSun,daySun,daylight);
    ambient.intensity=.73+daylight*.62;
    sun.intensity=.20+daylight*.95;
    lightColor.lerpColors(nightGlow,dayGlow,daylight);
    for(const {lamp,glow} of lamps){lamp.intensity=night*5.5;glow.material.color.copy(lightColor);}
    for(const material of lightPatches)material.opacity=.015+daylight*.095;
    // Daylight starts at noon. Sun and moon take opposite arcs across the sky;
    // fade each body near its horizon instead of leaving both visible at once.
    const angle=phase*Math.PI*2, arc=Math.sin(angle), height=Math.cos(angle);
    const sunOpacity=THREE.MathUtils.smoothstep(daylight,.34,.64);
    const moonOpacity=1-THREE.MathUtils.smoothstep(daylight,.36,.66);
    skySun.position.set(18*arc,13+8*height,-34);skyMoon.position.set(-18*arc,13-8*height,-34);
    skySun.material.opacity=sunOpacity;skyMoon.material.opacity=moonOpacity;
    skySun.visible=sunOpacity>.005;skyMoon.visible=moonOpacity>.005;
    for(const {x,z,sunDisc,moonDisc} of windowBodies){
      sunDisc.position.set(x+.66*arc,2.18+.30*height,z+.091);
      moonDisc.position.set(x-.66*arc,2.18-.30*height,z+.092);
      sunDisc.material.opacity=sunOpacity;moonDisc.material.opacity=moonOpacity;
      sunDisc.visible=sunOpacity>.005;moonDisc.visible=moonOpacity>.005;
    }
  }
  function setTimeMode(mode){
    timeMode=['cycle','day','night'].includes(mode)?mode:'cycle';
    cycleStart=null;lastLighting=-Infinity;
    // Deterministic, immediately visible settings; cycling starts in daylight.
    applyDaylight(timeMode==='night'?0:1,timeMode==='night'?.5:0);
  }
  setTimeMode('cycle');

  // High-contrast hovering diamonds mark the objects visitors can use. They are
  // drawn in the scene, occluded by furniture, and never pulse or flash.
  const markers = [];
  const markerGeometry = new THREE.OctahedronGeometry(.16, 0);
  const markerMaterial = new THREE.MeshBasicMaterial({color:'#f4d79d'});
  for (const [x,y,z] of [
    [-11.72,3.18,3.2], // mirror
    [7.55,2.70,-5.25], // computer
    [9.5,1.36,-5.13], // file
    [-3.13,3.13,-6.93], // trophies
    [0,3.32,-6.9], // TV
    [0,1.90,4.0], // couch / TV
  ]) {
    const gem = new THREE.Mesh(markerGeometry, markerMaterial);
    gem.position.set(x,y,z); scene.add(gem); markers.push({mesh:gem,base:y});
  }
  const motionPreference = typeof window !== 'undefined' ? window.matchMedia?.('(prefers-reduced-motion: reduce)') : null;
  let lastReducedMotion = !!motionPreference?.matches;

  // Original procedural likeness; user-provided images remain reference-only.
  const { character, setQuality } = createStylizedCharacter(THREE, mat);
  character.visible=false;scene.add(character);
  return {
    scene, colliders, character, setQuality, setTimeMode,
    spawn: { x: 0, y: 1.65, z: -.2, yaw: 0 },
    computer: { id: 'projects', label: 'Use the computer', position: new THREE.Vector3(7.55,1.2,-4.2), radius: 2.3 },
    // Points sit on their objects; radii extend into the walkable approach.
    // The nearest target resolves overlaps between the desk items and the TV cabinet.
    targets: [
      { id: 'mirror', label: 'Look in the mirror', position: new THREE.Vector3(-11.95, 1.55, 3.2), radius: 2.0 },
      { id: 'file', label: 'Open the file', position: new THREE.Vector3(9.5, .95, -5.13), radius: 1.8 },
      { id: 'awards', label: 'Inspect the trophies', position: new THREE.Vector3(-3.13, 1.4, -7.0), radius: 2.0 },
      { id: 'tv', label: 'Watch the TV', position: new THREE.Vector3(0, 2.0, -7.0), radius: 2.25 },
      { id: 'tv', label: 'Sit and watch TV', position: new THREE.Vector3(0, 1.0, 3.95), radius: 1.7 },
    ],
    update(now = 0) {
      const reduceMotion = !!motionPreference?.matches;
      if(reduceMotion!==lastReducedMotion){lastReducedMotion=reduceMotion;cycleStart=null;lastLighting=-Infinity;if(reduceMotion&&timeMode==='cycle')applyDaylight(1);}
      if (!reduceMotion) for (const {mesh,base} of markers) { mesh.position.y = base + Math.sin(now * .0015) * .065; mesh.rotation.y = now * .00035; }
      // The introductory portrait breathes and shifts gently, without moving its feet.
      if(character.visible){const breath=reduceMotion?0:Math.sin(now*.002);character.position.y=breath*.012;character.scale.y=1+breath*.005;character.rotation.z=breath*.006;}
      // Three-minute loop, anchored when cycling begins rather than wall-clock time.
      // Throttle updates: light changes are gradual and do not need per-frame work.
      if(timeMode==='cycle'&&!reduceMotion&&now-lastLighting>=100){
        if(cycleStart===null)cycleStart=now;
        const phase=((now-cycleStart)%180000)/180000;
        applyDaylight(.5+.5*Math.cos(phase*Math.PI*2),phase);
        lastLighting=now;
      }
    }
  };
}
