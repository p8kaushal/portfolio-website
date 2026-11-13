import { createPrimitives } from './primitives.js';
import { buildCityWindow } from './city-window.js';

/** Representative room, retaining original desk/chair/storage collision footprints.
 * @param {any} THREE @param {{scene:any,colliders:{minX:number,maxX:number,minZ:number,maxZ:number}[]}} context
 * @param {ReturnType<typeof createPrimitives>} [sharedTools]
 */
export function buildStudio(THREE, {scene,colliders},sharedTools) {
  const tools=sharedTools||createPrimitives(THREE,scene,colliders);
  const {box,cylinder,plant,contact,mesh,palette}=tools;
  const city=buildCityWindow(THREE,tools);
  // Quiet wall treatments and tactile textile break up the large floor plane.
  box(8,.084,-3.35,5.9,.018,4.8,'textile',false,.006).receiveShadow=true;
  for(let i=0;i<11;i++)box(12.1+i*.12,1.75,-7.64,.045,3.2,.06,'oak',false,.008);
  contact(8,-4.8,7.4,4.4,.35,.112);
  // Oak desktop with chamfered edges, brass feet and inset drawers.
  box(8,.77,-5.25,5.6,.16,1.65,'oak',true,.065).receiveShadow=true;
  for(const x of [5.5,10.5])for(const z of [-5.9,-4.6])cylinder(x,.35,z,.045,.045,.7,'brass');
  box(10.12,.48,-5.4,.94,.53,1.15,'oak');
  for(const y of [.35,.6])box(10.12,y,-4.81,.72,.016,.018,'brass',false,.005);
  // Chunky late-90s CRT monitor; the deep rounded back is visible in profile.
  box(7.55,1.75,-5.56,1.9,1.34,.62,'paper',false,.14);
  box(7.55,1.75,-5.235,1.64,1.1,.06,'oak',false,.11);
  const screenCanvas=document.createElement('canvas');screenCanvas.width=384;screenCanvas.height=216;
  const c=screenCanvas.getContext('2d');if(!c)throw new Error('Screen canvas unavailable');
  const gradient=c.createLinearGradient(0,0,384,216);gradient.addColorStop(0,'#263e4c');gradient.addColorStop(1,'#766b51');
  c.fillStyle=gradient;c.fillRect(0,0,384,216);c.fillStyle='#e9dfcf';c.font='bold 27px sans-serif';c.fillText('Hello, I’m Parth.',28,97);c.font='12px sans-serif';c.fillText('BUILDING SOFTWARE / EXPLORING IDEAS',29,122);
  c.fillStyle='#d4ad69';c.fillRect(29,145,65,4);
  const screenMap=new THREE.CanvasTexture(screenCanvas);screenMap.colorSpace=THREE.SRGBColorSpace;
  mesh(new THREE.PlaneGeometry(1.49,.84),new THREE.MeshBasicMaterial({map:screenMap}),7.55,1.75,-5.199);
  box(7.55,1.04,-5.53,.2,.34,.36,'paper');box(7.55,.91,-5.5,.78,.08,.48,'oak');
  // Bezel buttons, status LED and warm, molded side casing.
  for(let i=0;i<3;i++)cylinder(8.22+i*.055,1.2,-5.198,.018,.018,.012,'brass',10);
  cylinder(8.22,1.12,-5.198,.023,.023,.012,'clay',10);
  box(7.55,.9,-4.92,1.2,.07,.37,'paper',false,.025);
  for(let row=0;row<3;row++)for(let i=0;i<12;i++)box(7.03+i*.092,.945,-5.03+row*.095,.067,.014,.06,'ink',false,.008);
  box(8.45,.89,-4.91,.14,.07,.24,'ink');
  box(9.5,.9,-5.13,.78,.08,.55,'paper');box(9.5,.95,-5.13,.64,.025,.43,'clay');
  box(9.5,.969,-5.13,.48,.009,.035,'brass',false,0);
  cylinder(6.1,1.03,-5.2,.12,.11,.3,'clay');
  cylinder(6.1,1.19,-5.2,.094,.094,.008,'ink');
  box(10.6,1.25,-5.32,.65,.78,.72,'ink',false,.055);
  box(10.6,1.56,-4.95,.28,.055,.018,'brass',false,.008);
  box(10.6,1.46,-4.95,.28,.035,.018,'oak',false,.006);
  for(let i=0;i<6;i++)box(10.6,1.29-i*.028,-4.95,.24,.009,.012,'brass',false,.003);
  cylinder(10.72,1.09,-4.94,.025,.025,.016,'clay',10);
  // Generous upholstered chair with a curved-looking segmented back.
  contact(7.6,-3.45,2.1,2.1,.3,.115);
  box(7.6,.58,-3.45,1,.16,1,'indigo',true,.07);
  box(7.6,1,-3,1,.95,.15,'indigo',false,.07);
  for(const dx of [-.38,.38])for(const dz of [-.38,.38])cylinder(7.6+dx,.25,-3.45+dz,.035,.035,.5,'brass');
  // Storage preserves existing walkable gaps; small books and pottery feel lived in.
  box(13.02,1.1,2.7,1.6,2.2,2.7,'oak',true);
  for(let y=.65;y<2.1;y+=.48)box(12.18,y,2.7,.12,.06,2.5,'paper');
  for(let i=0;i<9;i++)box(12.1,.84+(i%3)*.48,1.65+i*.25,.16,.33,.18,['clay','indigo','paper'][i%3]);
  plant(5.5,7.8,1.4);
  box(13.05,.65,6,1.5,1.3,2.2,'oak',true);box(13.05,1.34,6,1.55,.07,2.25,'paper');
  cylinder(13,1.56,6,.2,.16,.4,'clay');
  // Restrained light wash and a brass linear pendant, with no expensive bloom pass.
  box(8,3.1,-4.5,3.7,.055,.12,'brass');
  const glowMaterial=new THREE.MeshBasicMaterial({color:'#fff0d0'});
  box(8,3.07,-4.5,3.4,.015,.07,glowMaterial,false,0);
  for(const x of [6.5,9.5])cylinder(x,3.3,-4.5,.008,.008,.4,'ink',8);
  const fill=new THREE.PointLight('#ffe2ae',8,10,2);fill.position.set(8,2.65,-4.5);scene.add(fill);
  const sunWash=new THREE.MeshBasicMaterial({color:'#ffebbf',transparent:true,opacity:.18,depthWrite:false});
  const patch=mesh(new THREE.PlaneGeometry(5,3),sunWash,8.8,.12,-5.1);patch.rotation.set(-Math.PI/2,0,-.23);
  // Smooth material test on the existing likeness, without changing identity or outfit.
  return { palette, setDaylight(/** @type {number} */ amount) {city.setDaylight(amount);fill.intensity=2+(1-amount)*8;sunWash.opacity=.015+amount*.13;} };
}
