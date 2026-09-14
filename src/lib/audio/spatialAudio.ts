import { get } from "svelte/store";
import { isMuted } from "$lib/stores/navStore";
import { systemSettings } from "$lib/stores/glassSettings";

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
	if (typeof window === "undefined") return null;
	if (!audioCtx) {
		const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
		if (AudioContextClass) {
			audioCtx = new AudioContextClass();
		}
	}
	if (audioCtx && audioCtx.state === "suspended") {
		audioCtx.resume().catch(() => {});
	}
	return audioCtx;
}

export function playSpatialSweep(delta: number, duration: number) {
	if (get(isMuted)) return;
	const settings = get(systemSettings);
	if (!settings.enableSpatialAudio) return;
	const ctx = getAudioContext();
	if (!ctx) return;

	try {
		const now = ctx.currentTime;
		const bufferSize = ctx.sampleRate * Math.min(duration, 1.5);
		const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
		const output = buffer.getChannelData(0);
		for (let i = 0; i < bufferSize; i++) {
			output[i] = Math.random() * 2 - 1;
		}

		const whiteNoise = ctx.createBufferSource();
		whiteNoise.buffer = buffer;

		const filter = ctx.createBiquadFilter();
		filter.type = "bandpass";
		filter.Q.value = 3.0;

		const baseFreq = Math.min(300 + delta * 50, 600);
		const peakFreq = Math.min(800 + delta * 120, 1600);
		filter.frequency.setValueAtTime(baseFreq, now);
		filter.frequency.exponentialRampToValueAtTime(peakFreq, now + duration * 0.45);
		filter.frequency.exponentialRampToValueAtTime(baseFreq * 0.8, now + duration);

		const gainNode = ctx.createGain();
		const maxVol = Math.min(0.08 + delta * 0.01, 0.15);
		gainNode.gain.setValueAtTime(0.001, now);
		gainNode.gain.linearRampToValueAtTime(maxVol, now + duration * 0.35);
		gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

		whiteNoise.connect(filter);
		filter.connect(gainNode);
		gainNode.connect(ctx.destination);

		whiteNoise.start(now);
		whiteNoise.stop(now + duration);
	} catch (e) {
		// Ignore AudioContext autoplay constraints
	}
}
