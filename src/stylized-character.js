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
  const jersey = '#455b68', jerseyDark = '#344752', dark = '#25292a';
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

  // A simple collared shirt and tailored trousers give the portrait a quieter,
  // professional appearance while retaining the original likeness and pose.
  rounded(character,0,1.48,0,.60,.67,.30,jersey,.065);
  for (const side of [-1,1]) {
    rounded(character,side*.34,1.62,0,.21,.29,.29,jersey,.055,side*.25);
    limb(character,[side*.39,1.45,0],[side*.53,1.17,.005],.070,.060,skin);
    oval(character,side*.54,1.13,.005,.065,.09,.050,skin,18);
    for(let i=0;i<3;i++) oval(fine,side*(.51+i*.026),1.072,.035,.017,.045,.018,skin,12);
    rounded(detail,side*.075,1.755,.158,.14,.075,.018,'#d4ddd9',.012,side*.35);
  }
  rounded(detail,0,1.58,.157,.018,.30,.012,jerseyDark,.004);
  for (let i=0;i<3;i++) oval(fine,0,1.69-i*.09,.168,.008,.008,.004,'#d4ddd9',10);
  rounded(detail,0,1.255,.04,.60,.045,.30,'#303b3c',.012);
  // Cargo trousers: tapered limbs, pockets, knee pads and layered sneakers.
  for(const side of [-1,1]) {
    rounded(character,side*.16,.96,0,.27,.52,.29,'#292e2c',.08,side*.035);
    rounded(character,side*.17,.48,0,.25,.51,.27,'#292e2c',.075,-side*.025);
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
