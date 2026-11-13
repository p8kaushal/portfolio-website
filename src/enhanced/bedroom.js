import { buildCityWindow } from './city-window.js';

/** Quiet bedroom and wardrobe alcove, with the original approach footprints.
 * @param {any} THREE @param {any} context @param {ReturnType<import('./primitives.js').createPrimitives>} tools
 */
export function buildBedroom(THREE,context,tools) {
  const {box,cylinder,plant,contact,mesh}=tools;
  const city=buildCityWindow(THREE,tools,{x:-8.8,width:5.9});
  // Linen curtains sit outside the glazing, leaving the city composition readable.
  for(const x of [-12,-5.6])for(let i=0;i<4;i++)cylinder(x+i*.07,2.25,-7.38,.055,.065,2.3,'textile',12);
  box(-8.1,.079,-2.2,5.8,.02,4.6,'textile',false,.005).receiveShadow=true;
  contact(-9,-4.15,5.4,6.3,.32,.108);
  box(-9,.42,-4.15,3.35,.55,4.4,'oak',true,.08);
  box(-9,.78,-4.15,3.12,.34,4.15,'textile',false,.12);
  box(-9,.99,-3.4,3.12,.16,2.55,'clay',false,.075);
  // Soft blanket edge and two deeply rounded pillows, rather than rigid cubes.
  box(-9,1.015,-3.0,3.13,.14,1.2,'indigo',false,.065);
  for(const x of [-9.75,-8.3])box(x,1.02,-5.55,1.15,.22,.72,'paper',false,.1);
  box(-9,1.06,-6.32,3.4,1.16,.17,'oak',false,.08);
  for(let i=0;i<12;i++)box(-10.5+i*.275,1.1,-6.21,.12,.9,.06,'textile',false,.03);
  box(-10.86,.7,-5.1,.8,1.35,1.2,'oak',true);
  box(-10.86,1.41,-5.1,.86,.1,1.25,'paper');
  cylinder(-10.86,1.6,-5.1,.045,.06,.3,'brass');
  cylinder(-10.86,1.84,-5.1,.19,.28,.32,'textile');
  mesh(new THREE.SphereGeometry(.09,12,8),new THREE.MeshBasicMaterial({color:'#ffe5ba'}),-10.86,1.68,-5.1);
  // Matte candybar mobile with a small reflective display and physical keys.
  box(-10.28,1.51,-5.13,.31,.055,.56,'ink',false,.055);
  box(-10.28,1.543,-5.16,.23,.012,.16,'indigo',false,.02);
  for(let row=0;row<3;row++)for(let col=0;col<3;col++)box(-10.35+col*.07,1.553,-5.28+row*.065,.042,.012,.035,'brass',false,.006);
  cylinder(-10.28,1.554,-5.08,.026,.026,.014,'brass',10);
  // The wardrobe footprint is retained; the large framed glass faces into the room.
  box(-12.95,1.45,3.2,1.75,2.9,3.7,'oak',true,.075);
  box(-12.035,1.53,3.2,.09,2.52,1.45,'ink');
  const glass=new THREE.MeshStandardMaterial({color:'#bbc0b1',metalness:.35,roughness:.2});
  box(-11.975,1.53,3.2,.04,2.34,1.26,glass,false,.015);
  for(const z of [2.51,3.89])box(-11.93,1.53,z,.06,2.46,.065,'brass');
  for(const y of [.3,2.76])box(-11.93,y,3.2,.06,.065,1.44,'brass');
  const sheen=new THREE.Mesh(new THREE.PlaneGeometry(.12,1.8),new THREE.MeshBasicMaterial({color:'#efe5d0',transparent:true,opacity:.18,depthWrite:false}));
  sheen.position.set(-11.946,1.55,2.72);sheen.rotation.y=.12;tools.group.add(sheen);
  for(const z of [1.97,4.43])box(-12.01,1.47,z,.06,2.45,.08,'ink');
  for(const z of [1.87,4.53])box(-11.97,1.35,z,.05,.24,.05,'brass');
  // A woven runner and warm vertical lights give the mirror its own dressing
  // area without adding obstacles to the original approach or changing bounds.
  box(-10.55,.083,3.2,2.35,.025,3.55,'textile',false,.025).receiveShadow=true;
  for(const z of [1.55,4.85]){
    box(-11.95,2.05,z,.08,.78,.12,'brass',false,.02);
    box(-11.89,2.05,z,.04,.65,.065,'paper',false,.02);
  }
  box(-11.95,2.88,3.2,.10,.08,3.52,'brass',false,.015);
  contact(-12.65,6.3,2.6,3.5,.23);
  box(-12.65,.43,6.3,1.5,.65,2.5,'oak',true);
  box(-12.65,.8,6.3,1.4,.16,2.35,'indigo',false,.07);
  box(-12.66,.92,6.2,1.15,.08,.65,'clay',false,.035);
  plant(-5.5,7.6,1.25);
  // Original abstract wall print, restrained and geometric.
  box(-13.77,2.2,-.2,.08,1.28,1.75,'oak');
  box(-13.71,2.2,-.2,.04,1.12,1.59,'paper');
  const disc=mesh(new THREE.CircleGeometry(.37,36),new THREE.MeshBasicMaterial({color:'#ba7058'}),-13.675,2.3,-.36);disc.rotation.y=Math.PI/2;
  box(-13.66,1.98,-.08,.015,.12,1.13,'indigo',false,0);
  return {setDaylight:city.setDaylight};
}
