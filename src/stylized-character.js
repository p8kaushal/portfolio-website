// @ts-nocheck
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

/** Original, procedural stylized character. The supplied photos and illustration
 * are visual references only; no image data or external model is embedded. */
export function createStylizedCharacter(THREE, material) {
  const character = new THREE.Group();
  const detail = new THREE.Group();
  const fine = new THREE.Group();
  character.add(detail, fine);
  const skin = '#bd896d', skinShade = '#9f6f59', hair = '#242423', hairHighlight = '#393837';
  const jersey = '#a32e3c', jerseyDark = '#732630', dark = '#25292a', trim = '#535957';
  function rounded(parent, x, y, z, w, h, d, color, radius = .025, angle = 0) {
    const mesh = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 3, radius), material(color));
    mesh.position.set(x, y, z); mesh.rotation.z = angle; parent.add(mesh); return mesh;
  }
  function oval(parent, x, y, z, sx, sy, sz, color, segments = 20) {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, segments, Math.max(10, Math.floor(segments * .7))), material(color));
    mesh.position.set(x, y, z); mesh.scale.set(sx, sy, sz); parent.add(mesh); return mesh;
  }
  function tube(parent, points, radius, color, segments = 24) {
    const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
    const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, segments, radius, 7, false), material(color));
    parent.add(mesh); return mesh;
  }
  function limb(parent, a, b, rTop, rBottom, color) {
    const start = new THREE.Vector3(...a), end = new THREE.Vector3(...b);
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBottom, start.distanceTo(end), 18, 1), material(color));
    mesh.position.copy(start).add(end).multiplyScalar(.5);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), start.clone().sub(end).normalize());
    parent.add(mesh); return mesh;
  }

  // Face and neck: tapered jaw, eyes, glasses, and a restrained smile.
  oval(character, 0, 2.07, 0, .218, .275, .178, skin, 28);
  limb(character, [0,1.88,0], [0,1.68,0], .105, .115, skinShade);
  for (const side of [-1,1]) {
    oval(character, side*.218, 2.04, 0, .043, .072, .04, skinShade, 16);
    oval(detail, side*.222, 2.045, .03, .022, .041, .012, skin, 12);
    oval(character, side*.092, 2.085, .163, .057, .035, .014, '#e7dbca', 18);
    oval(character, side*.092, 2.083, .178, .021, .023, .01, '#3b2b25', 16);
    oval(fine, side*.087, 2.091, .188, .006, .006, .004, '#f8f1e3', 10);
    tube(character, [[side*.035,2.137,.167],[side*.08,2.15,.174],[side*.14,2.14,.15]], .012, hair, 12);
    // Rounded, slightly upswept spectacle rims.
    const cx=side*.096;
    tube(character, [[cx-.073,2.113,.181],[cx-.075,2.065,.184],[cx-.055,2.039,.18],[cx+.055,2.039,.18],[cx+.075,2.065,.184],[cx+.073,2.113,.181],[cx-.073,2.113,.181]], .009, dark, 28);
    tube(detail, [[side*.17,2.105,.17],[side*.22,2.11,.06]], .008, dark, 8);
  }
  tube(character, [[-.026,2.104,.19],[0,2.11,.198],[.026,2.104,.19]], .008, dark, 10);
  oval(character,0,2.025,.181,.025,.048,.033,skinShade,16);
  oval(detail,0,2.031,.202,.019,.028,.014,skin,14);
  tube(character,[[-.057,1.969,.158],[-.025,1.959,.169],[.025,1.959,.169],[.057,1.969,.158]],.006,'#764a43',16);
  tube(detail,[[-.035,1.951,.154],[0,1.945,.163],[.035,1.951,.154]],.003,'#ce9b87',12);
  // Hair has a full silhouette and overlapping curved locks, rather than beads.
  oval(character,0,2.27,-.025,.23,.16,.18,hair,24);
  for (const [x,y,z,sx,sy,sz,angle] of [
    [-.17,2.30,.06,.08,.11,.075,-.4],[-.105,2.355,.07,.085,.12,.075,-.3],[-.035,2.38,.08,.08,.125,.075,-.1],
    [.045,2.38,.08,.08,.12,.075,.1],[.12,2.35,.065,.085,.11,.075,.3],[.18,2.29,.035,.07,.10,.07,.45],
    [-.20,2.22,-.04,.06,.11,.09,-.15],[.20,2.22,-.04,.06,.11,.09,.15]
  ]) { const lock=oval(character,x,y,z,sx,sy,sz,hair,16);lock.rotation.z=angle; }
  for (const side of [-1,1]) for (let i=0;i<3;i++) {
    const x=side*(.035+i*.055), y=2.31+(2-i)*.025;
    tube(detail, [[x-side*.027,y+.07,.148],[x+side*.015,y+.065,.169],[x+side*.028,y+.02,.18],[x+side*.005,y-.012,.176]], .009, hairHighlight, 14);
  }

  // A tailored red jersey with a cream outlined number and two sleeve bands.
  rounded(character,0,1.48,0,.62,.67,.31,jersey,.085);
  rounded(detail,0,1.785,.136,.23,.035,.03,jerseyDark,.012);
  for (const side of [-1,1]) {
    const sleeve=rounded(character,side*.35,1.62,0,.22,.29,.30,jersey,.065,side*.32);
    rounded(detail,side*.378,1.51,.02,.22,.035,.31,'#e4d8c2',.012,side*.32);
    rounded(detail,side*.386,1.47,.02,.22,.025,.31,'#e4d8c2',.009,side*.32);
    limb(character,[side*.40,1.45,0],[side*.56,1.17,.005],.075,.065,skin);
    oval(character,side*.57,1.13,.005,.072,.10,.052,skin,18);
    rounded(detail,side*.52,1.21,.01,.13,.055,.13,side<0?'#353e3d':'#756b5d',.018,side*.4);
    // Individual fingers make the relaxed pose less mannequin-like.
    for(let i=0;i<3;i++) oval(fine,side*(.54+i*.027),1.072,.035,.018,.052,.019,skin,12);
  }
  // Number is a layered outline and fill, keeping it legible from the mirror.
  const numeral=[[0,1.70,.21,.035],[.088,1.625,.035,.13],[0,1.55,.21,.035],[-.088,1.475,.035,.13],[0,1.40,.21,.035]];
  for(const [x,y,w,h] of numeral){rounded(character,x,y,.16,w+.018,h+.018,.015,'#e8dfcc',.004);rounded(character,x,y,.172,w,h,.012,jerseyDark,.003);}
  // Lightweight straps, shoulder pads and buckles echo the reference without copying assets.
  for (const side of [-1,1]) {
    rounded(detail,side*.28,1.70,.12,.115,.30,.055,'#454b4a',.025,side*.2);
    const pad=oval(detail,side*.34,1.76,0,.14,.08,.16,'#42494a',18);pad.rotation.z=-side*.2;
    rounded(detail,side*.27,1.65,.155,.10,.045,.025,'#858a80',.008,side*.2);
    oval(fine,side*.35,1.785,.13,.012,.012,.008,'#c8c5b2',10);
  }
  rounded(detail,0,1.265,.07,.64,.09,.32,'#383d3a',.025);
  rounded(detail,0,1.27,.239,.10,.075,.025,'#85877c',.008);
  rounded(detail,.245,1.20,.18,.15,.18,.12,'#5b5749',.025);
  rounded(fine,.245,1.23,.247,.11,.025,.012,'#a19882',.005);
  // Cargo trousers: tapered limbs, pockets, knee pads and layered sneakers.
  for(const side of [-1,1]) {
    rounded(character,side*.16,.96,0,.27,.52,.29,'#292e2c',.08,side*.035);
    rounded(character,side*.17,.48,0,.25,.51,.27,'#292e2c',.075,-side*.025);
    rounded(detail,side*.28,.91,0,.105,.23,.25,'#343b37',.025);
    rounded(detail,side*.17,.69,.15,.20,.18,.06,'#515954',.035);
    rounded(fine,side*.17,.69,.185,.14,.12,.014,'#69716b',.022);
    rounded(detail,side*.17,.245,.04,.25,.12,.28,'#4b3d35',.035);
    rounded(character,side*.17,.135,.065,.27,.14,.42,'#665246',.055);
    rounded(character,side*.17,.075,.09,.28,.055,.45,'#e4dccb',.022);
    rounded(detail,side*.17,.16,.225,.19,.06,.09,'#ded6c7',.02);
    for(let i=0;i<3;i++) rounded(fine,side*.17,.225-i*.025,.205+i*.012,.14,.012,.012,'#ded6c7',.004);
  }
  // Batch each quality layer by material. The portrait uses many small authored
  // parts, so this keeps draw calls and scene traversal bounded on low-end GPUs.
  function batchLayer(group) {
    const batches = new Map();
    for (const mesh of [...group.children]) {
      if (!mesh.isMesh) continue;
      if (!batches.has(mesh.material)) batches.set(mesh.material, []);
      batches.get(mesh.material).push(mesh);
    }
    for (const [surface, meshes] of batches) {
      if (meshes.length < 2) continue;
      const copies = meshes.map(mesh => {
        mesh.updateMatrix();
        const geometry = mesh.geometry.index ? mesh.geometry.toNonIndexed() : mesh.geometry.clone();
        geometry.applyMatrix4(mesh.matrix);
        return geometry;
      });
      const geometry = mergeGeometries(copies);
      copies.forEach(copy => copy.dispose());
      if (!geometry) continue;
      for (const mesh of meshes) { group.remove(mesh); mesh.geometry.dispose(); }
      group.add(new THREE.Mesh(geometry, surface));
    }
  }
  batchLayer(character); batchLayer(detail); batchLayer(fine);
  function setQuality(level='high') { detail.visible=level!=='low'; fine.visible=level==='high'; }
  setQuality('high');
  return { character, setQuality };
}
