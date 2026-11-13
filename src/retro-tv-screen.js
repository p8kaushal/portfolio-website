/** Build an original, CRT-era portfolio title card without downloaded game art. */
/** @param {any} THREE */
export function createRetroTvTexture(THREE) {
  const canvas = document.createElement('canvas');
  canvas.width = 320;
  canvas.height = 240;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('TV canvas unavailable');

  const sky = context.createLinearGradient(0, 0, 0, canvas.height);
  sky.addColorStop(0, '#352b29');
  sky.addColorStop(.52, '#a65d43');
  sky.addColorStop(.72, '#d0955b');
  sky.addColorStop(1, '#483a32');
  context.fillStyle = sky;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // A block-built dusk skyline gives the idle set its own period-game image.
  context.fillStyle = '#e9bd78';
  context.beginPath();
  context.arc(245, 91, 27, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = '#635044';
  for (const [x, y, width, height] of [[0, 130, 39, 50], [35, 112, 34, 68], [64, 139, 45, 41], [105, 101, 42, 79], [145, 126, 38, 54], [179, 111, 36, 69], [209, 137, 45, 43], [249, 119, 32, 61], [276, 129, 44, 51]]) {
    context.fillRect(x, y, width, height);
    context.fillStyle = '#9b7656';
    for (let wy = y + 9; wy < y + height - 5; wy += 13) {
      for (let wx = x + 7; wx < x + width - 3; wx += 12) context.fillRect(wx, wy, 4, 5);
    }
    context.fillStyle = '#635044';
  }
  context.fillStyle = '#292522';
  context.fillRect(0, 180, 320, 60);
  context.fillStyle = '#bf8a53';
  context.fillRect(0, 180, 320, 3);
  context.fillStyle = '#ddbd83';
  context.fillRect(0, 205, 320, 2);
  context.fillStyle = '#f0d6a6';
  context.font = 'bold 11px monospace';
  context.fillText('CH 03  /  PARTH TV', 15, 22);
  context.font = 'bold 24px sans-serif';
  context.fillText('PLAYER 01', 15, 153);
  context.font = '10px monospace';
  context.fillStyle = '#ead5af';
  context.fillText('PUNE, INDIA  ·  PORTFOLIO', 16, 169);
  context.fillStyle = '#e1b66f';
  context.fillRect(16, 190, 92, 3);

  context.fillStyle = '#100e0dc0';
  for (let y = 0; y < canvas.height; y += 4) context.fillRect(0, y, canvas.width, 1);
  const vignette = context.createRadialGradient(160, 120, 55, 160, 120, 190);
  vignette.addColorStop(0, '#00000000');
  vignette.addColorStop(1, '#100d0b8c');
  context.fillStyle = vignette;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
