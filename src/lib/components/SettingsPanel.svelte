<script lang="ts">
	import { glassSettings, resetGlassDefaults } from '$lib/stores/glassSettings';
	import { playSound } from '$lib/utils/soundEngine';
	import { RotateCcw, Sliders, X } from 'lucide-svelte';

	let { onClose = () => {} } = $props<{ onClose?: () => void }>();

	function handleReset() {
		playSound('click');
		resetGlassDefaults();
	}
</script>

<div
	style="background-color: rgba(255, 255, 255, {$glassSettings.opacity}); backdrop-filter: blur({$glassSettings.blur}px); -webkit-backdrop-filter: blur({$glassSettings.blur}px);"
	class="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-80 border border-white/90 shadow-2xl rounded-2xl p-6 text-slate-950 font-sans animate-in fade-in slide-in-from-top-4 transition-all duration-200 backdrop-blur-2xl"
>
	<div class="flex items-center justify-between pb-3 border-b border-slate-900/10 mb-4">
		<div class="flex items-center gap-2">
			<Sliders class="w-4 h-4 text-sky-700" />
			<h3 class="text-sm font-black text-slate-950 tracking-tight">Control Center Settings</h3>
		</div>
		<button
			type="button"
			onclick={() => { playSound('click'); onClose(); }}
			class="p-1 rounded-full text-slate-600 hover:text-slate-950 hover:bg-slate-900/10 transition-colors cursor-pointer"
		>
			<X class="w-4 h-4" />
		</button>
	</div>

	<div class="space-y-4 text-xs font-semibold">
		<div>
			<div class="flex justify-between items-center mb-1.5">
				<span class="text-slate-900 font-bold">Glass UI Blur Intensity</span>
				<span class="font-mono text-[11px] font-bold text-sky-700">{$glassSettings.blur}px</span>
			</div>
			<input
				type="range"
				name="blur"
				min="8"
				max="40"
				step="2"
				bind:value={$glassSettings.blur}
				class="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-900/10 accent-sky-600 border border-white/40"
			/>
		</div>

		<div>
			<div class="flex justify-between items-center mb-1.5">
				<span class="text-slate-900 font-bold">Glass Surface Intensity</span>
				<span class="font-mono text-[11px] font-bold text-sky-700">{Math.round($glassSettings.opacity * 100)}%</span>
			</div>
			<input
				type="range"
				name="opacity"
				min="0.2"
				max="0.95"
				step="0.05"
				bind:value={$glassSettings.opacity}
				class="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-900/10 accent-sky-600 border border-white/40"
			/>
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
