/** An on-demand portrait of the house character, presented as a mirror view.
 * Geometry and materials belong to the house; only the renderer is owned here.
 * @param {any} THREE
 * @param {HTMLElement} stage
 * @param {any} source
 * @param {()=>void} onContextLost
 */
export function mountChangingRoom(THREE, stage, source, onContextLost) {
  // Create the context before allocating any scene-owned resources so a failed
  // WebGL initialization can return directly to the illustrated fallback.
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#71877d');
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 30);
  // A restrained, static mirror backdrop keeps the portrait legible without
  // rendering the whole house a second time. These resources are owned here.
  /** @type {{dispose:()=>void}[]} */
  const owned = [];
  /** @param {number} width @param {number} height @param {string} color @param {number} x @param {number} y @param {number} z */
  function panel(width, height, color, x, y, z) {
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshStandardMaterial({ color, roughness: 1 });
    owned.push(geometry, material);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z); scene.add(mesh); return mesh;
  }
  panel(5, 4, '#a6ae9f', 0, 1.8, -1.4);
  panel(2.9, 3.2, '#8a9b8e', 0, 1.5, -1.37);
  for (const x of [-1.5, 1.5]) panel(.045, 3.2, '#c8b590', x, 1.5, -1.34);
  const floor = panel(6, 5, '#a68764', 0, -.02, 0);
  floor.rotation.x = -Math.PI / 2;
  const shadowGeometry = new THREE.CircleGeometry(.52, 32);
  const shadowMaterial = new THREE.MeshBasicMaterial({ color: '#34443b', transparent: true, opacity: .22, depthWrite: false });
  owned.push(shadowGeometry, shadowMaterial);
  const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
  shadow.rotation.x = -Math.PI / 2; shadow.position.y = -.01; shadow.scale.y = .55; scene.add(shadow);
  const figure = source.clone(true);
  figure.visible = true;
  figure.position.set(0, 0, 0);
  figure.rotation.set(0, 0, 0);
  figure.scale.set(1, 1, 1);
  scene.add(figure);
  scene.add(new THREE.HemisphereLight('#fff3dd', '#56665c', 2.1));
  const light = new THREE.DirectionalLight('#fff0d7', 2.3);
  light.position.set(-3, 5, 5);
  scene.add(light);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.domElement.setAttribute('aria-hidden', 'true');
  stage.append(renderer.domElement);
  let zoom = 1, panX = 0, panY = 0;
  /** @type {{id:number,x:number,y:number}|null} */
  let pointer = null;
  function render() {
    const width = Math.max(stage.clientWidth, 1), height = Math.max(stage.clientHeight, 1);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // Fit the full body in both narrow and wide viewports at the reset position.
    const distance = Math.max(4.6, 2.05 / Math.max(camera.aspect, .25));
    camera.position.set(panX, 1.23 + panY, distance / zoom);
    camera.lookAt(panX, 1.23 + panY, 0);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  }
  /** @param {number} value @param {number} min @param {number} max */
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  /** @param {string} action */
  function change(action) {
    if (action === 'in') zoom = clamp(zoom * 1.15, 1, 1.8);
    if (action === 'out') zoom = clamp(zoom / 1.15, 1, 1.8);
    if (action === 'left') panX = clamp(panX - .1, -.45, .45);
    if (action === 'right') panX = clamp(panX + .1, -.45, .45);
    if (action === 'up') panY = clamp(panY + .1, -.45, .45);
    if (action === 'down') panY = clamp(panY - .1, -.45, .45);
    if (action === 'reset') { zoom = 1; panX = 0; panY = 0; }
    render();
  }
  /** @param {PointerEvent} event */
  function down(event) { pointer = { id: event.pointerId, x: event.clientX, y: event.clientY }; stage.setPointerCapture(event.pointerId); }
  /** @param {PointerEvent} event */
  function move(event) {
    if (!pointer || pointer.id !== event.pointerId) return;
    panX = clamp(panX - (event.clientX - pointer.x) * .004, -.45, .45);
    panY = clamp(panY + (event.clientY - pointer.y) * .004, -.45, .45);
    pointer.x = event.clientX; pointer.y = event.clientY; render();
  }
  /** @param {PointerEvent} event */
  function up(event) { if (pointer?.id === event.pointerId) pointer = null; }
  stage.addEventListener('pointerdown', down);
  stage.addEventListener('pointermove', move);
  stage.addEventListener('pointerup', up);
  stage.addEventListener('pointercancel', up);
  const observer = new ResizeObserver(render);
  observer.observe(stage);
  /** @param {Event} event */
  function contextLost(event) { event.preventDefault(); onContextLost(); }
  renderer.domElement.addEventListener('webglcontextlost', contextLost);
  render();
  return { change, destroy() {
    observer.disconnect();
    stage.removeEventListener('pointerdown', down); stage.removeEventListener('pointermove', move);
    stage.removeEventListener('pointerup', up); stage.removeEventListener('pointercancel', up);
    renderer.domElement.removeEventListener('webglcontextlost', contextLost);
    renderer.dispose(); owned.forEach(resource => resource.dispose()); renderer.domElement.remove();
  }};
}
