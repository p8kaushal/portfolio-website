/* Local, low-volume effects for the standalone 2D house; no audio downloads. */
window.createHouseSounds = function createHouseSounds() {
  let context = null, muted = false, timer = null, cadence = 0;
  function ready() {
    if (muted || !window.AudioContext) return null;
    if (!context) context = new AudioContext();
    if (context.state === 'suspended') context.resume().catch(() => {});
    return context;
  }
  function tone(from, to, duration, volume, type = 'sine') {
    const audio = ready(); if (!audio) return;
    const oscillator = audio.createOscillator(), gain = audio.createGain(), start = audio.currentTime;
    oscillator.type = type; oscillator.frequency.setValueAtTime(from, start);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, to), start + duration);
    gain.gain.setValueAtTime(.0001, start); gain.gain.exponentialRampToValueAtTime(volume, start + .01);
    gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
    oscillator.connect(gain).connect(audio.destination); oscillator.start(start); oscillator.stop(start + duration + .01);
  }
  function play(kind) {
    if (muted) return;
    if (kind === 'pc') { tone(94, 126, .12, .05, 'square'); tone(410, 240, .08, .02); }
    else if (kind === 'tv') { tone(54, 46, .22, .07, 'sawtooth'); tone(740, 280, .18, .025); }
    else if (kind === 'phone') { tone(190, 140, .1, .04, 'square'); tone(370, 310, .08, .02); }
    else if (kind === 'file') tone(620, 360, .07, .025, 'triangle');
    else if (kind === 'mirror') tone(260, 310, .12, .025);
    else if (kind === 'awards') tone(520, 700, .16, .025, 'triangle');
  }
  function movement(active, sprinting) {
    const speed = sprinting ? 320 : 490;
    if (!active || muted) { if (timer) clearTimeout(timer); timer = null; cadence = 0; return; }
    if (timer && speed === cadence) return;
    if (timer) clearTimeout(timer);
    cadence = speed;
    const step = () => { if (muted) { timer = null; cadence = 0; return; } tone(sprinting ? 76 : 64, 38, .08, sprinting ? .035 : .022, 'triangle'); timer = setTimeout(step, speed); };
    step();
  }
  function setMuted(value) { muted = !!value; if (muted) movement(false, false); }
  function stop() { if (timer) clearTimeout(timer); timer = null; cadence = 0; }
  return { unlock: ready, play, movement, setMuted, stop };
};
