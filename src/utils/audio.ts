// Self-contained Web Audio API synthesizer for sci-fi HUD sound effects
let audioCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

// Quick high-tech click
export const playClick = () => {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {
    // Audio contexts block before interaction
  }
};

// Shorter, sharper digital hover sound
export const playHover = () => {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.setValueAtTime(1000, ctx.currentTime + 0.02);

    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch (e) {}
};

// Digital glitch sweep for page transitions
export const playGlitchSynth = () => {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const duration = 0.25;

    const osc = ctx.createOscillator();
    const noiseGain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, now);
    osc.frequency.linearRampToValueAtTime(600, now + duration * 0.5);
    osc.frequency.linearRampToValueAtTime(80, now + duration);

    noiseGain.gain.setValueAtTime(0.05, now);
    noiseGain.gain.linearRampToValueAtTime(0.08, now + duration * 0.4);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    // Apply lowpass filter for deep hum
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, now);

    osc.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    osc.start();
    osc.stop(now + duration);
  } catch (e) {}
};

// Ascending beeps for progressive sequence loading
export const playSequenceSynth = () => {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const notes = [600, 850, 1100];

    notes.forEach((freq, index) => {
      const time = now + index * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.04, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + 0.08);
    });
  } catch (e) {}
};
