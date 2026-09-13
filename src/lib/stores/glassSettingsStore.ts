import { writable } from 'svelte/store';

export interface GlassSettings {
	blur: number;
	opacity: number;
}

export const DEFAULT_GLASS_SETTINGS: GlassSettings = {
	blur: 24,
	opacity: 65
};

export const glassSettings = writable<GlassSettings>({ ...DEFAULT_GLASS_SETTINGS });

export function updateGlassBlur(blur: number) {
	glassSettings.update((s) => ({ ...s, blur }));
	syncGlassCSSVariables();
}

export function updateGlassOpacity(opacity: number) {
	glassSettings.update((s) => ({ ...s, opacity }));
	syncGlassCSSVariables();
}

export function resetGlassSettings() {
	glassSettings.set({ ...DEFAULT_GLASS_SETTINGS });
	syncGlassCSSVariables();
}

export function syncGlassCSSVariables() {
	if (typeof document !== 'undefined') {
		glassSettings.subscribe((s) => {
			document.documentElement.style.setProperty('--glass-blur', `${s.blur}px`);
			document.documentElement.style.setProperty('--glass-opacity', `${s.opacity}%`);
		})();
	}
}
