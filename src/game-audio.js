import { get } from 'svelte/store';
import { isMuted } from './lib/stores/navStore.ts';

/** Small, local, switchable sound cues for the vanilla house runtime. */
export function createGameAudio() {
  const muted = () => get(isMuted);
  const AudioContextClass = typeof window !== 'undefined' ? window.AudioContext : null;
  /** @type {AudioContext|null} */
  let context = null;
  /** @type {AudioBuffer|null} */
  let noiseBuffer = null;
  /** @type {ReturnType<typeof setTimeout>|null} */
  let stepTimer = null;
  let stepCadence = 0;

  function ensureContext() {
    if (!AudioContextClass || muted()) return null;
    if (!context) {
      context = new AudioContextClass();
      noiseBuffer = context.createBuffer(1, Math.round(context.sampleRate * .22), context.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      let seed = 8821;
      for (let i = 0; i < data.length; i++) {
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        data[i] = (seed / 4294967296 * 2 - 1) * (1 - i / data.length);
      }
    }
    if (context.state === 'suspended') context.resume().catch(() => {});
    return context;
  }

  /** @param {number} frequency @param {number} endFrequency @param {number} duration @param {number} volume @param {OscillatorType} [type] @param {number} [delay] */
  function tone(frequency, endFrequency, duration, volume, type = 'sine', delay = 0) {
    const audio = ensureContext();
    if (!audio) return;
    const start = audio.currentTime + delay;
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, endFrequency), start + duration);
    gain.gain.setValueAtTime(.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + .012);
    gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
    oscillator.connect(gain).connect(audio.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + .01);
  }

  /** @param {boolean} [sprinting] */
  function thump(sprinting = false) {
    const audio = ensureContext();
    if (!audio || !noiseBuffer) return;
    const source = audio.createBufferSource();
    const filter = audio.createBiquadFilter();
    const gain = audio.createGain();
    source.buffer = noiseBuffer;
    filter.type = 'lowpass';
    filter.frequency.value = sprinting ? 680 : 480;
    gain.gain.setValueAtTime(sprinting ? .045 : .03, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(.0001, audio.currentTime + .09);
    source.connect(filter).connect(gain).connect(audio.destination);
    source.start();
    source.stop(audio.currentTime + .1);
    tone(sprinting ? 82 : 68, 42, .085, sprinting ? .04 : .026, 'triangle');
  }

  /** @param {number} now @param {{moving?:boolean,sprinting?:boolean,crouching?:boolean,grounded?:boolean}} [state] */
  function updateMovement(now, { moving = false, sprinting = false, crouching = false, grounded = true } = {}) {
    if (!moving || !grounded || muted()) {
      if (stepTimer) clearTimeout(stepTimer);
      stepTimer = null;
      stepCadence = 0;
      return;
    }
    const running = sprinting && !crouching;
    const cadence = crouching ? 620 : running ? 315 : 475;
    if (stepTimer && stepCadence === cadence) return;
    if (stepTimer) clearTimeout(stepTimer);
    stepCadence = cadence;
    const playStep = () => {
      if (muted()) { stepTimer = null; stepCadence = 0; return; }
      thump(running);
      stepTimer = setTimeout(playStep, cadence);
    };
    playStep();
  }

  /** @param {string} kind */
  function play(kind) {
    if (muted()) return;
    const cues = {
      pc: () => { tone(94, 126, .12, .055, 'square'); tone(410, 240, .08, .018, 'sine', .09); },
      tv: () => { tone(54, 46, .22, .075, 'sawtooth'); tone(740, 280, .18, .028, 'sine', .08); },
      phone: () => { tone(190, 140, .1, .04, 'square'); tone(370, 310, .08, .025, 'sine', .08); },
      file: () => { tone(620, 360, .07, .025, 'triangle'); },
      mirror: () => { tone(260, 310, .12, .025, 'sine'); },
      awards: () => { tone(520, 700, .16, .03, 'triangle'); },
      jump: () => { tone(118, 180, .12, .02, 'triangle'); },
      land: () => { tone(72, 45, .1, .025, 'triangle'); }
    };
    cues[/** @type {keyof typeof cues} */ (kind)]?.();
  }

  function stop() { if (stepTimer) clearTimeout(stepTimer); stepTimer = null; stepCadence = 0; }
  function destroy() { stop(); if (context && context.state !== 'closed') context.close().catch(() => {}); context = null; noiseBuffer = null; }

  return { unlock: ensureContext, updateMovement, play, stop, destroy };
}
