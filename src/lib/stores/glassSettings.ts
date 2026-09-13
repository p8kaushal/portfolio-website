import { writable } from 'svelte/store';

export interface GlassConfig {
	blur: number; // in pixels (8 to 40)
	opacity: number; // surface opacity decimal (0.20 to 0.95)
}

export const DEFAULT_SETTINGS: GlassConfig = {
	blur: 24,
	opacity: 0.65
};

export const glassSettings = writable<GlassConfig>({ ...DEFAULT_SETTINGS });

export function resetGlassDefaults() {
	glassSettings.set({ ...DEFAULT_SETTINGS });
}
