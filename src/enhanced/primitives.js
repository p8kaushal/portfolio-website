import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

/** Original procedural surface studies; deterministic, small, and entirely local.
 * @param {any} THREE @param {string} kind @param {string} base @param {string} accent
 */
export function createSurface(THREE, kind, base, accent) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Surface canvas unavailable');
  context.fillStyle = base; context.fillRect(0, 0, 128, 128);
  context.fillStyle = accent;
  for (let i = 0; i < 900; i++) {
    const x = (i*73 + (i%7)*13)%128, y = (i*41 + (i%11)*7)%128;
    context.globalAlpha = kind === 'wood' ? .16 : .12;
    context.fillRect(x, y, kind === 'wood' ? 1 : 2, kind === 'wood' ? 8+(i%29) : 1);
  }
  if (kind === 'fabric') {
    context.globalAlpha = .12;
    for (let i=0;i<128;i+=4) { context.fillRect(i,0,1,128); context.fillRect(0,i,128,1); }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(kind === 'wood' ? 2 : 3, 3);
  texture.anisotropy = 4;
  return texture;
}

/** @param {any} THREE @param {any} scene @param {{minX:number,maxX:number,minZ:number,maxZ:number}[]} colliders */
export function createPrimitives(THREE, scene, colliders) {
  const palette = {
    plaster: new THREE.MeshStandardMaterial({ color: '#e9dfcf', roughness: .94 }),
    oak: new THREE.MeshStandardMaterial({ map: createSurface(THREE,'wood','#b88453','#694625'), roughness: .66 }),
    indigo: new THREE.MeshStandardMaterial({ map: createSurface(THREE,'fabric','#344e68','#8294a3'), roughness: .97 }),
    textile: new THREE.MeshStandardMaterial({ map: createSurface(THREE,'fabric','#d2c3a5','#9d8a69'), roughness: 1 }),
    clay: new THREE.MeshStandardMaterial({ color: '#ba7058', roughness: .88 }),
    leaf: new THREE.MeshStandardMaterial({ color: '#617d67', roughness: .85 }),
    brass: new THREE.MeshStandardMaterial({ color: '#d4ad69', metalness: .55, roughness: .35 }),
    ink: new THREE.MeshStandardMaterial({ color: '#26353e', roughness: .54 }),
    paper: new THREE.MeshStandardMaterial({ color: '#f4ead9', roughness: .94 }),
  };
  const group = new THREE.Group(); group.name = 'enhanced-studio'; scene.add(group);
  /** @param {any} geometry @param {any} material @param {number} x @param {number} y @param {number} z */
  function mesh(geometry, material, x,y,z) {
    const object = new THREE.Mesh(geometry, typeof material === 'string' ? palette[/** @type {keyof typeof palette} */(material)] : material);
    object.position.set(x,y,z); group.add(object); return object;
  }
  /** @param {number} x @param {number} y @param {number} z @param {number} w @param {number} h @param {number} d @param {any} [material] */
  function box(x,y,z,w,h,d,material='oak',collision=false,radius=.04) {
    const object = mesh(radius ? new RoundedBoxGeometry(w,h,d,2,Math.min(radius,w/4,h/4,d/4)) : new THREE.BoxGeometry(w,h,d),material,x,y,z);
    if(collision) colliders.push({minX:x-w/2,maxX:x+w/2,minZ:z-d/2,maxZ:z+d/2});
    return object;
  }
  /** @param {number} x @param {number} y @param {number} z @param {number} top @param {number} bottom @param {number} height @param {string} [material] */
  function cylinder(x,y,z,top,bottom,height,material='brass',segments=20) {
    return mesh(new THREE.CylinderGeometry(top,bottom,height,segments),material,x,y,z);
  }
  /** @param {number} x @param {number} y @param {number} z @param {number} rx @param {number} ry @param {number} rz @param {string} [material] */
  function ellipsoid(x,y,z,rx,ry,rz,material='leaf') {
    const object = mesh(new THREE.SphereGeometry(1,12,8),material,x,y,z);object.scale.set(rx,ry,rz);return object;
  }
  /** @param {number} x @param {number} z @param {number} w @param {number} d */
  function contact(x,z,w,d,opacity=.2,y=.09) {
    const canvas = document.createElement('canvas'); canvas.width=canvas.height=64;
    const context=canvas.getContext('2d');
    if (!context) throw new Error('Contact canvas unavailable');
    const gradient=context.createRadialGradient(32,32,2,32,32,32);
    gradient.addColorStop(0,`rgba(28,25,20,${opacity})`);gradient.addColorStop(1,'rgba(28,25,20,0)');
    context.fillStyle=gradient;context.fillRect(0,0,64,64);
    const material=new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(canvas),transparent:true,depthWrite:false});
    const object=mesh(new THREE.PlaneGeometry(w,d),material,x,y,z);object.rotation.x=-Math.PI/2;return object;
  }
  /** @param {number} x @param {number} z */
  function plant(x,z,size=1) {
    contact(x,z,1.4*size,1.4*size,.25);
    cylinder(x,.23*size,z,.25*size,.19*size,.46*size,'clay');
    cylinder(x,.46*size,z,.23*size,.23*size,.03,'ink');
    for(let i=0;i<7;i++) {
      const angle=i*2.4, height=(.7+(i%3)*.16)*size;
      const leaf=ellipsoid(x+Math.sin(angle)*.21*size,height,z+Math.cos(angle)*.21*size,.11*size,.39*size,.065*size);
      leaf.rotation.set(Math.cos(angle)*.45,angle,Math.sin(angle)*.45);
    }
  }
  return { group, palette, box,cylinder,ellipsoid,contact,plant,mesh };
}
