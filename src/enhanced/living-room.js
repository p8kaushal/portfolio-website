import { buildCityWindow } from './city-window.js';

/** Living gallery: upholstered forms, oak cabinetry and original display graphics.
 * @param {any} THREE @param {any} context @param {ReturnType<import('./primitives.js').createPrimitives>} tools
 */
export function buildLivingRoom(THREE,context,tools) {
  const {box,cylinder,plant,contact,mesh}=tools;
  const city=buildCityWindow(THREE,tools,{x:2.85,y:2.28,width:2.05,height:1.9});
  box(0,.079,2.3,6.1,.025,4.6,'textile',false,.008).receiveShadow=true;
  contact(0,4.35,6.2,3.6,.3,.11);
  box(0,.43,4.35,4.25,.7,1.25,'indigo',true,.12);
  box(0,1,4.88,4.25,1.1,.32,'indigo',false,.13);
  for(const x of [-1.25,0,1.25])box(x,.85,4.2,1.03,.24,.78,'indigo',false,.09);
  for(const x of [-2.02,2.02])box(x,.85,4.3,.34,.8,1.38,'indigo',false,.13);
  for(const [x,color] of [[-1.55,'clay'],[1.45,'textile']]){const pillow=box(Number(x),1.17,4.56,.68,.56,.2,String(color),false,.08);pillow.rotation.z=Number(x)*.09;}
  for(const x of [-1.7,1.7])for(const z of [3.95,4.76])cylinder(x,.14,z,.05,.045,.22,'brass');
  contact(0,1.7,4.5,2.8,.22,.115);
  box(0,.77,1.7,2.5,.14,1.15,'oak',true,.1).receiveShadow=true;
  for(const x of [-.95,.95])for(const z of [1.38,2.02])cylinder(x,.35,z,.04,.04,.7,'brass');
  box(.15,.89,1.7,.5,.09,.4,'paper');box(.14,.948,1.7,.48,.025,.38,'clay');
  cylinder(-.62,.99,1.65,.13,.1,.32,'clay');
  // Floating-look cabinet remains grounded and collidable in its existing location.
  box(0,.48,-7.14,4.2,.85,1,'oak',true,.065);
  box(0,.93,-7.14,4.28,.1,1.04,'paper');
  for(const x of [-1.35,0,1.35]) {
    box(x,.48,-6.62,1.26,.66,.035,'oak',false,.015);
    box(x,.53,-6.59,.28,.035,.025,'brass',false,.008);
  }
  box(0,1.06,-7.05,.85,.1,.45,'ink');box(0,1.22,-7.12,.14,.26,.12,'ink');
  box(0,2.06,-7.1,3.65,2.05,.16,'ink',false,.065);
  const canvas=document.createElement('canvas');canvas.width=640;canvas.height=360;
  const c=canvas.getContext('2d');if(!c)throw new Error('TV canvas unavailable');
  const gradient=c.createLinearGradient(0,0,640,360);gradient.addColorStop(0,'#213e54');gradient.addColorStop(1,'#5c7d76');c.fillStyle=gradient;c.fillRect(0,0,640,360);
  c.fillStyle='#d4ad69';c.font='15px monospace';c.fillText('PARTH / EXPERIENCE',48,78);
  c.fillStyle='#f1e6d0';c.font='bold 43px sans-serif';c.fillText('The story so far.',46,152);
  c.font='16px sans-serif';c.fillText('Every experience adds a new perspective.',48,192);
  c.strokeStyle='#d4ad69';c.lineWidth=2;c.beginPath();c.moveTo(50,265);c.lineTo(580,265);c.stroke();
  for(let i=0;i<5;i++){c.beginPath();c.arc(50+i*132.5,265,6,0,Math.PI*2);c.fillStyle=i===0?'#e7c285':'#91aca3';c.fill();}
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
  mesh(new THREE.PlaneGeometry(3.41,1.81),new THREE.MeshBasicMaterial({map:texture}),0,2.08,-7.005);
  // Trophies use lathed cup profiles and metal handles, with no downloaded assets.
  box(-3.13,1.37,-7.46,1.35,2.72,.55,'oak',true);
  box(-3.13,1.4,-7.15,1.15,2.47,.03,'ink',false,0);
  for(const y of [.75,1.51,2.27])box(-3.13,y,-7.13,1.23,.07,.56,'oak');
  for(const x of [-3.79,-2.47])box(x,1.4,-7.1,.08,2.7,.08,'brass');
  for(const [x,y]of[[-3.43,.98],[-2.85,.98],[-3.13,1.74]]) {
    box(x,y-.16,-6.98,.3,.1,.24,'ink');cylinder(x,y-.04,-6.98,.045,.07,.18,'brass');
    const points=[[.05,-.12],[.085,-.09],[.105,-.03],[.13,.06],[.16,.12]].map(([radius,height])=>new THREE.Vector2(radius,height));
    mesh(new THREE.LatheGeometry(points,24),tools.palette.brass,x,y+.13,-6.98);
    for(const side of [-1,1]){const handle=mesh(new THREE.TorusGeometry(.095,.017,8,20,Math.PI*1.6),tools.palette.brass,x+side*.13,y+.15,-6.98);handle.rotation.z=side===1?-.8:Math.PI+.8;}
  }
  // South-side console keeps the original circulation gap behind the sofa.
  box(-.6,.48,9.25,3.2,.9,.65,'oak',true);box(-.6,.96,9.25,3.3,.08,.7,'paper');
  cylinder(-1.6,1.13,9.25,.16,.2,.3,'clay');
  for(let i=0;i<3;i++)box(.2,1.03+i*.055,9.25,.62,.05,.36,['indigo','paper','clay'][i]);
  plant(2.85,8.4,1.1);
  return {setDaylight:city.setDaylight};
}
