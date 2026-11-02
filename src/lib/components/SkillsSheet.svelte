<script lang="ts">
	import { activeTab as activeSection } from '$lib/stores/navStore';
	import { enterPaperFocus, isPaperFocused } from '$lib/animations/paperFocusChoreography';
	import { playSound } from '$lib/utils/soundEngine';

	const skills = [
		{
			category: 'Programming Languages',
			items: ['Python', 'JavaScript', 'TypeScript', 'C', 'C++', 'HTML5 / CSS3', 'SQL']
		},
		{
			category: 'Web & Backend',
			items: ['Node.js', 'Express.js', 'Flask', 'FastAPI', 'PostgreSQL', 'Supabase', 'SvelteKit']
		},
		{
			category: 'AI, ML & Computer Vision',
			items: ['OpenCV', 'scikit-learn', 'MediaPipe', 'pandas', 'NumPy', 'Librosa', 'face-recognition']
		},
		{
			category: 'Spatial, Game Dev & Embedded',
			items: ['Unity', 'Unreal Engine', 'WebGL', 'Babylon.js', 'FreeRTOS', 'ESP32', 'Git / Linux']
		}
	];

	function handleClick() {
		if ($activeSection === 'skills' && !$isPaperFocused) {
			playSound('click');
			enterPaperFocus('skills');
		}
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	id="paper-sheet-left"
	onclick={handleClick}
	class="absolute left-[14%] top-[16%] w-[34%] h-[68%] p-6 md:p-8 text-slate-900 font-mono rotate-[-1deg] bg-[#fbf9f5] border border-[#e2d9cc] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] flex flex-col justify-between z-30 transition-all duration-300 {$activeSection === 'skills' ? 'cursor-pointer hover:shadow-[0_30px_70px_rgba(0,0,0,0.38)] hover:scale-[1.015] pointer-events-auto' : 'opacity-40 pointer-events-none'}"
>
	{#if $activeSection === 'skills'}
		<div class="space-y-4">
			<div class="border-b-2 border-slate-900 pb-2 mb-3 flex justify-between items-baseline">
				<div>
					<h2 class="text-lg font-black tracking-tight uppercase text-slate-950">TECHNICAL SKILLS</h2>
					<p class="text-[10px] font-bold text-slate-700 uppercase">PARTH KAUSHAL // MANIFEST</p>
				</div>
				<span class="text-[10px] font-bold text-slate-800">SYS_REV_2026</span>
			</div>
			<div class="space-y-3">
				{#each skills as skillGroup}
					<div>
						<h4 class="text-[11px] font-black uppercase tracking-wider text-slate-900 mb-1 border-l-2 border-slate-900 pl-2">
							{skillGroup.category}
						</h4>
						<div class="flex flex-wrap gap-1.5">
							{#each skillGroup.items as item}
								<span class="px-2 py-0.5 bg-slate-200/70 border border-slate-900/30 text-slate-950 text-[10px] font-bold uppercase">{item}</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
		<div class="border-t border-slate-900/40 pt-2 text-[10px] font-bold text-slate-600 text-center uppercase tracking-widest">
			[ CLICK SHEET TO ZOOM & INSPECT 🔍 ]
		</div>
	{:else}
		<div class="w-full h-full flex items-center justify-center text-slate-400 font-mono text-xs italic">
			[ Blank Sheet ]
		</div>
	{/if}
</div>
