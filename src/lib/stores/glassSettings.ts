import { writable } from 'svelte/store';

export interface SystemConfig {
	blur: number; // Default: 24 (px)
	opacity: number; // Default: 0.65 (65%)
	cameraSpeed: number; // Default: 1.0 (1.0x)
	enableMotionBlur: boolean;
	enableSpatialAudio: boolean;
}

export const DEFAULT_CONFIG: SystemConfig = {
	blur: 24,
	opacity: 0.65,
	cameraSpeed: 1.0,
	enableMotionBlur: true,
	enableSpatialAudio: true
};

export const DEFAULTS = DEFAULT_CONFIG;

// Force clear stale local storage cache during development reset
if (typeof window !== 'undefined') {
	localStorage.removeItem('spatial_portfolio_settings');
}

export const systemSettings = writable<SystemConfig>({ ...DEFAULT_CONFIG });

// Alias for backwards compatibility
export const glassSettings = systemSettings;

export function restoreDefaults() {
	systemSettings.set({ ...DEFAULT_CONFIG });
	if (typeof window !== 'undefined') {
		document.documentElement.style.setProperty('--glass-blur', '24px');
		document.documentElement.style.setProperty('--glass-opacity', '0.65');
	}
}

export function resetSystemDefaults() {
	restoreDefaults();
}

export function resetGlassDefaults() {
	restoreDefaults();
}
