/** Original, deterministic Mumbai-inspired window panorama. No external artwork. @param {boolean} night */
function drawCity(night) {
  const canvas = document.createElement('canvas'); canvas.width=1024;canvas.height=512;
  const c=canvas.getContext('2d');
  if(!c) throw new Error('City canvas unavailable');
  const sky=c.createLinearGradient(0,0,0,512);
  sky.addColorStop(0,night?'#213650':'#91b7cb');sky.addColorStop(1,night?'#738a9f':'#f4ddbb');
  c.fillStyle=sky;c.fillRect(0,0,1024,512);
  c.fillStyle=night?'#eceddf':'#fff0ca';c.beginPath();c.arc(790,95,night?20:30,0,Math.PI*2);c.fill();
  // Four depth bands: irregular residential towers, slab balconies and roof tanks.
  for(let layer=0;layer<4;layer++) {
    const width=38+layer*21, base=370+layer*45;
    for(let i=-1;i<1024/width+1;i++) {
      const x=i*width+((i*19+layer*11)%17),h=60+((i*47+layer*67+201)%141)+layer*12;
      c.fillStyle=night?['#637d91','#4f687e','#3f5667','#33464f'][layer]:['#bac9c8','#a7b6b7','#94a4a5','#7d9193'][layer];
      c.fillRect(x,base-h,width-5,h);
      if(layer>0) {
        c.fillStyle=night?'#506774':'#c5c4b4';
        for(let y=base-h+14;y<base;y+=18) c.fillRect(x+1,y,width-7,3);
        for(let row=0;row<Math.floor(h/18);row++) for(let col=0;col<3;col++) {
          const lit=(i*3+row*7+col*5+31)%5<2;
          c.fillStyle=night?(lit?'#e6ba78':'#304651'):'#617e87';
          c.fillRect(x+7+col*(width-15)/3,base-h+5+row*18,7+layer,7);
        }
        c.fillStyle=night?'#2b3d49':'#74878b';
        c.fillRect(x+width*.5,base-h-12,width*.23,12);
        c.beginPath();c.ellipse(x+width*.615,base-h-12,width*.115,3,0,0,Math.PI*2);c.fill();
        if(i%3===0){c.fillRect(x+7,base-h-22,2,22);c.fillRect(x+1,base-h-20,15,2);}
      }
    }
  }
  return canvas;
}

/** @param {any} THREE @param {ReturnType<import('./primitives.js').createPrimitives>} tools */
export function buildCityWindow(THREE, tools, {x=8.7,y=2.3,z=-7.61,width=6.7,height=2.15}={}) {
  const {box,mesh}=tools;
  const day=new THREE.CanvasTexture(drawCity(false)),night=new THREE.CanvasTexture(drawCity(true));
  day.colorSpace=night.colorSpace=THREE.SRGBColorSpace;
  mesh(new THREE.PlaneGeometry(width,height),new THREE.MeshBasicMaterial({map:day}),x,y,z);
  const overlayMaterial=new THREE.MeshBasicMaterial({map:night,transparent:true,opacity:0,depthWrite:false});
  mesh(new THREE.PlaneGeometry(width,height),overlayMaterial,x,y,z+.008);
  const edge=.11;
  box(x,y-height/2,z+.12,width+.23,.17,.36,'oak');
  box(x,y+height/2,z+.07,width+.23,edge,.2,'oak');
  for(const side of [-1,1]) box(x+side*width/2,y,z+.07,edge,height,.2,'oak');
  for(const offset of [-width/6,width/6]) box(x+offset,y,z+.11,.065,height,.12,'plaster',false,.01);
  box(x,y-.18,z+.12,width,.045,.12,'plaster',false,.005);
  // Subtle glass reflections stay local to the window; no full-screen effects.
  const glass=new THREE.MeshBasicMaterial({color:'#e6f1ef',transparent:true,opacity:.065,depthWrite:false});
  const gleam=mesh(new THREE.PlaneGeometry(.11,height*.92),glass,x-width*.36,y,z+.15);gleam.rotation.z=-.10;
  return { setDaylight(/** @type {number} */ amount) {overlayMaterial.opacity=1-amount;} };
}
