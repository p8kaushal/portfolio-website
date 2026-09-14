<script lang="ts">
	import { systemSettings, resetSystemDefaults } from "$lib/stores/glassSettings";
	import { playSound } from "$lib/utils/soundEngine";
	import { RotateCcw, Sliders, X, Gauge, Eye, Volume2 } from "lucide-svelte";

	let { onClose = () => {} } = $props<{ onClose?: () => void }>();

	function handleReset() {
		playSound("click");
		resetSystemDefaults();
	}
</script>

<div
	style="background-color: rgba(255, 255, 255, {$systemSettings.opacity}); backdrop-filter: blur({$systemSettings.blur}px); -webkit-backdrop-filter: blur({$systemSettings.blur}px);"
	class="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-84 border border-white/90 shadow-2xl rounded-2xl p-6 text-slate-950 font-sans animate-in fade-in slide-in-from-top-4 transition-all duration-200 backdrop-blur-2xl"
>
	<div class="flex items-center justify-between pb-3 border-b border-slate-900/10 mb-4">
		<div class="flex items-center gap-2">
			<Sliders class="w-4 h-4 text-sky-700" />
			<h3 class="text-sm font-black text-slate-950 tracking-tight">Control Center Settings</h3>
		</div>
		<button
			type="button"
			onclick={() => { playSound("click"); onClose(); }}
			class="p-1 rounded-full text-slate-600 hover:text-slate-950 hover:bg-slate-900/10 transition-colors cursor-pointer"
		>
			<X class="w-4 h-4" />
		</button>
	</div>

	<div class="space-y-4 text-xs font-semibold">
		<div>
			<div class="flex justify-between items-center mb-1.5">
				<span class="text-slate-900 font-bold">Glass UI Blur Intensity</span>
				<span class="font-mono text-[11px] font-bold text-sky-700">{$systemSettings.blur}px</span>
			</div>
			<input
				type="range"
				name="blur"
				min="8"
				max="40"
				step="2"
				bind:value={$systemSettings.blur}
				class="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-900/10 accent-sky-600 border border-white/40"
			/>
		</div>

		<div>
			<div class="flex justify-between items-center mb-1.5">
				<span class="text-slate-900 font-bold">Glass Surface Intensity</span>
				<span class="font-mono text-[11px] font-bold text-sky-700">{Math.round($systemSettings.opacity * 100)}%</span>
			</div>
			<input
				type="range"
				name="opacity"
				min="0.2"
				max="0.95"
				step="0.05"
				bind:value={$systemSettings.opacity}
				class="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-900/10 accent-sky-600 border border-white/40"
			/>
		</div>

		<div>
			<div class="flex justify-between items-center mb-1.5">
				<span class="text-slate-900 font-bold flex items-center gap-1.5"><Gauge class="w-3.5 h-3.5 text-sky-700" /> Camera Travel Speed</span>
				<span class="font-mono text-[11px] font-bold text-sky-700">{$systemSettings.cameraSpeed.toFixed(1)}x</span>
			</div>
			<input
				type="range"
				name="cameraSpeed"
				min="0.6"
				max="1.4"
				step="0.1"
				bind:value={$systemSettings.cameraSpeed}
				class="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-900/10 accent-sky-600 border border-white/40"
			/>
		</div>

		<div class="pt-2 border-t border-slate-900/10 space-y-2">
			<label class="flex items-center justify-between cursor-pointer py-1">
				<span class="text-slate-900 font-bold flex items-center gap-1.5"><Eye class="w-3.5 h-3.5 text-purple-600" /> Optical Motion Blur</span>
				<input
					type="checkbox"
					name="enableMotionBlur"
					bind:checked={$systemSettings.enableMotionBlur}
					class="w-4 h-4 rounded accent-sky-600 cursor-pointer"
				/>
			</label>

			<label class="flex items-center justify-between cursor-pointer py-1">
				<span class="text-slate-900 font-bold flex items-center gap-1.5"><Volume2 class="w-3.5 h-3.5 text-emerald-600" /> Spatial Audio Cues</span>
				<input
					type="checkbox"
					name="enableSpatialAudio"
					bind:checked={$systemSettings.enableSpatialAudio}
					class="w-4 h-4 rounded accent-sky-600 cursor-pointer"
				/>
			</label>
		</div>

		<button
			type="button"
			onclick={handleReset}
			class="w-full mt-2 py-2 px-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
		>
			<RotateCcw class="w-3.5 h-3.5" /> Restore Apple Defaults
		</button>
	</div>
</div>
