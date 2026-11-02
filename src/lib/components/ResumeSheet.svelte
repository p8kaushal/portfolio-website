<script lang="ts">
	import { activeTab as activeSection } from '$lib/stores/navStore';
	import { enterPaperFocus, isPaperFocused } from '$lib/animations/paperFocusChoreography';
	import { playSound } from '$lib/utils/soundEngine';

	function handleClick() {
		if ($activeSection === 'resume' && !$isPaperFocused) {
			playSound('click');
			enterPaperFocus('resume');
		}
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	id="paper-sheet-right"
	onclick={handleClick}
	class="absolute left-[53%] top-[12%] w-[36%] h-[76%] p-8 text-slate-900 font-mono rotate-[1deg] bg-[#fbf9f5] border border-[#e2d9cc] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] flex flex-col justify-between z-30 transition-all duration-300 {$activeSection === 'resume' ? 'cursor-pointer hover:shadow-[0_30px_70px_rgba(0,0,0,0.38)] hover:scale-[1.015] pointer-events-auto' : 'opacity-40 pointer-events-none'}"
>
	{#if $activeSection === 'resume'}
		<div class="space-y-4">
			<div class="border-b-2 border-slate-900 pb-2 mb-3 flex justify-between items-start">
				<div>
					<h2 class="text-xl font-black tracking-tight text-slate-950">PARTH KAUSHAL</h2>
					<p class="text-[11px] font-bold text-slate-800 uppercase">Full-Stack Developer & AI/ML Enthusiast</p>
				</div>
				<span class="px-2.5 py-1 bg-slate-900 text-white font-mono text-[10px] font-bold rounded">RESUME_V26</span>
			</div>
			<div class="space-y-3 text-xs text-slate-800 leading-snug">
				<div>
					<h4 class="font-black text-[11px] uppercase border-b border-slate-900 mb-1">Executive Credentials</h4>
					<p class="text-[10px] font-medium text-slate-700 leading-relaxed">B.Tech in CSE at VIT Pune (9.07 CGPA). Avionics Subdivision Engineer at DRDS. Building full-stack web platforms, machine learning pipelines, and interactive 3D simulations.</p>
				</div>
				<div>
					<h4 class="font-black text-[11px] uppercase border-b border-slate-900 mb-1">Experience & Milestones</h4>
					<p class="font-bold text-sky-800 text-[11px]">DRDS VIT Pune (2026 – Present)</p>
					<p class="text-[10px] text-slate-600">Avionics Subdivision Engineer (Mission 1 – RescueSwarm)</p>
					<p class="font-bold text-sky-800 text-[11px] mt-1">Independent Developer (2025 – Present)</p>
					<p class="text-[10px] text-slate-600">AI/ML, Computer Vision & Web Applications (IPL Predictor, FaceTrack, ResonantAI)</p>
					<p class="font-bold text-sky-800 text-[11px] mt-1">Smart India Hackathon 2026</p>
					<p class="text-[10px] text-slate-600">National Finalist (Internal Round 2)</p>
				</div>
			</div>
		</div>
		<div class="border-t border-slate-900/40 pt-2 flex justify-between items-center text-[10px] font-bold text-slate-600">
			<span>[ CLICK TO INSPECT & DOWNLOAD ]</span>
			<span class="text-slate-950 font-black">📄 PDF</span>
		</div>
	{:else}
		<div class="w-full h-full flex items-center justify-center text-slate-400 font-mono text-xs italic">
			[ Blank Sheet ]
		</div>
	{/if}
</div>
