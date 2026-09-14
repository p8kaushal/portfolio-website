import { writable } from 'svelte/store';

export interface SystemConfig {
	blur: number; // 8px to 40px (Default: 24)
	opacity: number; // 0.20 to 0.95 (Default: 0.65)
	cameraSpeed: number; // 0.6x to 1.4x (Default: 1.0x - Apple Default)
	enableMotionBlur: boolean; // true/false (Default: true)
	enableSpatialAudio: boolean; // true/false (Default: true)
}

export const DEFAULTS: SystemConfig = {
	blur: 24,
	opacity: 0.65,
	cameraSpeed: 1.0,
	enableMotionBlur: true,
	enableSpatialAudio: true
};

export const systemSettings = writable<SystemConfig>({ ...DEFAULTS });

// Alias for backwards compatibility
export const glassSettings = systemSettings;

export function resetSystemDefaults() {
	systemSettings.set({ ...DEFAULTS });
}

export function resetGlassDefaults() {
	resetSystemDefaults();
}
