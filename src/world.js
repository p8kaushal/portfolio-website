// @ts-nocheck
/** Procedural, asset-free house for the first-person portfolio. */
export function createWorld(THREE) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#c8b49a');
  // Distance haze and a warm, flat-lit palette evoke early 3D game worlds.
  scene.fog = new THREE.Fog('#c8b49a', 18, 43);
  const colliders = [];
  const materials = {};
  const mat = (color, roughness = 1) => { if (!materials[color]) { const softened = new THREE.Color(color); const hsl = {}; softened.getHSL(hsl); softened.setHSL(hsl.h, hsl.s * .78, hsl.l); materials[color] = new THREE.MeshStandardMaterial({ color: softened, roughness, flatShading: true }); } return materials[color]; };
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
  const windowBack=(x,z=-7.77)=>{box(x,2.2,z,2.5,1.65,.07,'#9b765e');box(x,2.2,z+.05,2.27,1.42,.06,'#cfab79');box(x,2.2,z+.09,.07,1.42,.03,'#e1c59c');box(x,2.2,z+.09,2.27,.07,.03,'#e1c59c');};
  windowBack(-8.3); windowBack(0); windowBack(8.4);

  // BEDROOM: bed, nightstand, wardrobe and mirror.
  rug(-8.1,-2.2,5.8,4.6,'#a36d5b');
  box(-9,-3.0+3.42,-4.15,3.35,.55,4.4,'#805d4b',true);
  box(-9,.78,-4.15,3.12,.34,4.15,'#d9ccb0');
  box(-9,.99,-3.4,3.12,.16,2.55,'#a96853');
  box(-9.75,1.02,-5.55,1.15,.18,.72,'#e1d4b8'); box(-8.3,1.02,-5.55,1.15,.18,.72,'#e1d4b8');
  box(-10.86,.7,-5.1,.8,1.35,1.2,'#ad8a68',true); box(-10.86,1.41,-5.1,.86,.1,1.25,'#d0aa7b');
  cylinder(-10.86,1.65,-5.1,.17,.23,.4,'#e5c88f');
  box(-10.93,1.45,3.2,1.75,2.9,3.7,'#aa886b',true);
  box(-9.99,1.55,3.2,.12,2.35,1.15,'#aac6bb');
  box(-9.9,1.55,3.2,.06,2.18,.98,'#aabcb0');
  box(-9.9,.55,4.34,.08,.07,.25,'#e6ce91');
  art(-7.6,2,-7.74,1.0,.7,'#d5a27e'); plant(-5.5,7.6,1.25);
  // A low reading bench and wall accents give the larger bedroom a useful edge.
  box(-12.65,.43,6.3,1.5,.65,2.5,'#b88f74',true); box(-12.65,.8,6.3,1.4,.12,2.35,'#dfc7a7');
  box(-13.78,2.2,2.7,.08,1.15,1.5,'#bca286'); box(-13.72,2.2,2.7,.04,.95,1.3,'#d6b8a0');
  
  // STUDIO: long desk, monitor, keyboard, paper file and chair.
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
  box(10.9,1.1,3.6,1.6,2.2,2.7,'#a58266',true);
  for(let y=.65;y<2.1;y+=.48) box(10.06,y,3.6,.12,.08,2.5,'#d5b48b');
  for(let i=0;i<7;i++) box(9.98,.8+(i%3)*.48,2.6+i*.32,.16,.35,.22,['#b16e57','#d0ae77','#6d8a76'][i%3]);
  plant(5.5,7.8,1.4);
  // A storage cabinet and framed colour blocks add studio detail without assets.
  box(12.7,.65,5.9,1.5,1.3,2.2,'#98745a',true); box(12.7,1.34,5.9,1.55,.08,2.25,'#c5a37e');
  box(13.76,2.2,1.5,.08,1.15,2.2,'#8f715a'); box(13.7,2.2,1.5,.04,.95,2,'#b8c9a8');

  // LIVING ROOM: sofa, low table, TV and a small trophy display.
  rug(0,2.3,6.1,4.6,'#777c5e');
  box(0,.43,4.35,4.25,.7,1.25,'#5f7355',true); box(0,1.0,4.88,4.25,1.1,.32,'#5f7355');
  box(-1.25,.85,4.2,1,.22,.75,'#8c9970'); box(0,.85,4.2,1,.22,.75,'#8c9970'); box(1.25,.85,4.2,1,.22,.75,'#8c9970');
  table(0,1.7,2.5,1.15,'#af8866'); box(.15,.89,1.7,.5,.09,.4,'#eee1bd');
  box(0,.48,-6.8,4.2,.85,1.0,'#a47e5d',true); box(0,1.85,-7.13,3.45,1.9,.2,'#384942'); box(0,1.85,-7.0,3.1,1.55,.03,'#638275');
  box(0,1.3,-6.97,1.9,.035,.015,'#b0c6aa'); box(-.72,2.03,-6.97,.13,.48,.015,'#d1bb86'); box(-.4,1.88,-6.97,.13,.78,.015,'#d1bb86');box(-.08,2.12,-6.97,.13,.3,.015,'#d1bb86');
  box(-2.9,1.18,-6.9,1.15,2.35,.9,'#997356',true);
  for(let y=.6;y<2.1;y+=.7) box(-2.9,y,-6.35,1.05,.08,.55,'#d5b38a');
  for(const [x,y] of [[-3.15,.86],[-2.7,.86],[-2.9,1.56]]) { cylinder(x,y,-6.35,.13,.07,.25,'#e2bf72',8); box(x,y-.16,-6.35,.22,.08,.22,'#735b44'); }
  art(2.8,2,-7.74,1.3,.95,'#cd9a7c'); plant(2.85,8.4,1.1);
  // A console behind the seating defines the larger living room.
  box(-.6,.48,9.25,3.2,.9,.65,'#a17d60',true); box(-.6,.96,9.25,3.3,.08,.7,'#ceb28e');
  cylinder(-1.6,1.13,9.25,.16,.2,.3,'#c58268');

  // Geometric streaks on the floor suggest late-afternoon light without
  // expensive realtime shadows. They are translucent and don't affect collision.
  const lightPatch = (x,z,w,d) => {
    const patch = new THREE.Mesh(new THREE.PlaneGeometry(w,d), new THREE.MeshBasicMaterial({color:'#ddd0b5',transparent:true,opacity:.11,depthWrite:false,side:THREE.DoubleSide}));
    patch.rotation.x=-Math.PI/2; patch.rotation.z=-.18; patch.position.set(x,.081,z); scene.add(patch);
  };
  lightPatch(-8.3,-5.7,2.1,3.4); lightPatch(0,-5.8,2.1,3.4); lightPatch(8.4,-5.8,2.1,3.4);
  // A simple retro rug motif, composed entirely of geometry.
  for(let i=-2;i<=2;i++) box(i*.62,.082,3.05,.28,.014,.28,'#c69e6c');
  // Flat graphic picture details are generated in scene, not imported textures.
  box(2.8,1.85,-7.68,1.04,.07,.02,'#855e4b');
  box(2.48,2.0,-7.67,.13,.27,.02,'#885f4b'); box(2.78,2.06,-7.67,.14,.39,.02,'#885f4b'); box(3.08,1.98,-7.67,.14,.23,.02,'#885f4b');
  scene.add(new THREE.HemisphereLight('#f4e7d4','#74786d',1.35));
  const sun = new THREE.DirectionalLight('#f5e5ce',1.15);sun.position.set(-3,8,4);scene.add(sun);

  // Neutral, procedural figure exposed for a separate introductory camera.
  const character = new THREE.Group();
  const charBox=(x,y,z,w,h,d,color)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(color));m.position.set(x,y,z);character.add(m);};
  charBox(0,1.37,0,.65,.72,.35,'#667d69'); charBox(0,2.02,0,.48,.5,.42,'#c99170'); charBox(0,2.27,0,.5,.13,.44,'#353a33');
  charBox(-.4,1.35,0,.16,.7,.2,'#c99170');charBox(.4,1.35,0,.16,.7,.2,'#c99170');
  charBox(-.18,.66,0,.24,.72,.26,'#46524b');charBox(.18,.66,0,.24,.72,.26,'#46524b');
  charBox(-.18,.25,.04,.25,.14,.36,'#323c36');charBox(.18,.25,.04,.25,.14,.36,'#323c36');
  // Front-facing details are placed on +Z, toward the introduction camera.
  // Small, low-poly features keep the code-built figure readable at a distance.
  charBox(-.11,2.05,.218,.055,.065,.025,'#303932');
  charBox(.11,2.05,.218,.055,.065,.025,'#303932');
  charBox(0,1.92,.224,.11,.025,.025,'#8e5d4e');
  charBox(0,2.21,.19,.48,.16,.1,'#353a33');
  charBox(-.22,2.1,.08,.08,.25,.3,'#353a33');
  charBox(.22,2.1,.08,.08,.25,.3,'#353a33');
  charBox(0,1.55,.18,.18,.18,.03,'#d5c7a5');
  charBox(0,1.47,.203,.06,.03,.015,'#60715f');
  character.visible=false;scene.add(character);
  return {
    scene, colliders, character,
    spawn: { x: 0, y: 1.65, z: -.2, yaw: 0 },
    computer: { id: 'projects', label: 'Use the computer', position: new THREE.Vector3(7.55,1.2,-4.2), radius: 2.3 },
    // Points sit on their objects; radii extend into the walkable approach.
    // The nearest target resolves overlaps between the desk items and the TV cabinet.
    targets: [
      { id: 'mirror', label: 'Look in the mirror', position: new THREE.Vector3(-9.9, 1.55, 3.2), radius: 1.8 },
      { id: 'file', label: 'Open the file', position: new THREE.Vector3(9.5, .95, -5.13), radius: 1.8 },
      { id: 'awards', label: 'Inspect the trophies', position: new THREE.Vector3(-2.9, 1.4, -6.35), radius: 1.7 },
      { id: 'tv', label: 'Watch the timeline', position: new THREE.Vector3(0, 1.85, -7.0), radius: 2.0 },
    ],
    update() {}
  };
}
