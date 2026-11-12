/** Shared, warm studio architecture. Collision dimensions reproduce classic exactly.
 * @param {any} THREE @param {any} context @param {ReturnType<import('./primitives.js').createPrimitives>} tools
 */
export function buildArchitecture(THREE,context,tools) {
  // Furniture casts the baked directional shadows; structural shells are receivers.
  // This approximates window daylight without expensive interior light transport.
  /** @type {typeof tools.box} */
  const box=(...args)=>{const object=tools.box(...args);object.castShadow=false;return object;};
  tools.group.name='enhanced-house';
  box(0,-.12,1,28,.24,18,'oak',false,0).receiveShadow=true;
  box(0,.035,1,27.8,.055,17.7,'oak',false,0).receiveShadow=true;
  const seam=new THREE.MeshStandardMaterial({color:'#99734e',roughness:1});
  for(let x=-13.5;x<14;x+=.7)box(x,.064,1,.012,.003,17.65,seam,false,0);
  // Cross joints keep the long boards from reading as a striped texture.
  for(let x=-13.5;x<14;x+=.7)for(let z=-6+(Math.round(x*10)%3)*1.1;z<9;z+=4.1)box(x+.35,.064,z,.68,.003,.012,seam,false,0);
  box(0,1.75,-8,28.4,3.5,.35,'plaster',true,.02);
  box(0,1.75,10,28.4,3.5,.35,'plaster',true,.02);
  box(-14,1.75,1,.35,3.5,18,'plaster',true,.02);
  box(14,1.75,1,.35,3.5,18,'plaster',true,.02);
  for(const x of [-4.5,4.5]) {
    box(x,1.75,-5.25,.28,3.5,5.5,'plaster',true,.02);
    box(x,1.75,5.55,.28,3.5,8.9,'plaster',true,.02);
    box(x,3.18,-.7,.4,.25,3.7,'oak');
    for(const z of [-2.55,1.15])box(x,1.55,z,.4,3.1,.16,'oak');
    box(x,.067,-.7,.48,.025,3.55,'brass',false,.005);
  }
  box(0,3.55,1,27.8,.1,17.7,'plaster',false,0);
  // Cove trim and skirting give the rooms a crafted edge without heavy ornament.
  for(const y of [.14,3.34]) {
    box(0,y,-7.78,27.7,.12,.09,'oak');box(0,y,9.78,27.7,.12,.09,'oak');
    for(const x of [-13.78,13.78])box(x,y,1,.09,.12,17.5,'oak');
  }
  for(const x of [-4.5,4.5])box(x,3.49,1,.35,.14,17.5,'oak');
}
