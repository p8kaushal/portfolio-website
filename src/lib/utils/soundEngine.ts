import { isMuted } from '$lib/stores/navStore';
import { get } from 'svelte/store';

let clickAudio: HTMLAudioElement | null = null;
let tvAudio: HTMLAudioElement | null = null;

if (typeof window !== 'undefined') {
	clickAudio = new Audio('/sounds/click.mp3');
	tvAudio = new Audio('/sounds/tv-on.mp3');
}

export function playSound(type: 'click' | 'tv-on') {
	if (get(isMuted)) return;

	try {
		if (type === 'click' && clickAudio) {
			clickAudio.currentTime = 0;
			clickAudio.play().catch(() => {});
		} else if (type === 'tv-on' && tvAudio) {
			tvAudio.currentTime = 0;
			tvAudio.play().catch(() => {});
		}
	} catch (e) {
		// Ignore audio autoplay restrictions
	}
}
