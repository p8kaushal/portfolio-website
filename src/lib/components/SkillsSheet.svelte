<script lang="ts">
	import { playSound } from '$lib/utils/soundEngine';
	import { FileCode, X, Sparkles } from 'lucide-svelte';

	const skills = [
		{
			category: 'Frontend Architecture',
			items: ['Svelte / SvelteKit', 'TypeScript', 'Tailwind CSS', 'GSAP Animation', 'HTML5 Canvas'],
			details: 'Engineered high-performance SvelteKit 2D spatial canvas rendering engines with zero-lag GSAP camera choreographies.'
		},
		{
			category: 'Systems & Performance',
			items: ['Performance Tuning', 'Spatial UI Design', 'State Management', 'WebM Transparent Video'],
			details: 'Optimized WebM alpha video decoding and double-buffered canvas compositing for 60 FPS spatial web presentations.'
		},
		{
			category: 'Tooling & CI/CD',
			items: ['Git & GitHub', 'Vite / Rollup', 'Figma Prototyping', 'Vercel CDN'],
			details: 'Automated CI/CD pipelines with zero-downtime CDN deployments and Playwright visual regression harnesses.'
		}
	];

	let selectedCategory = $state<any | null>(null);
</script>

<div class="card-overlay absolute inset-0 z-30 pointer-events-auto transition-transform duration-500 ease-out">
	<div class="absolute left-[14%] top-[16%] w-[34%] h-[68%] p-6 text-slate-900 font-mono rotate-[-1deg] mix-blend-multiply flex flex-col justify-between">
		<div>
			<div class="border-b-2 border-slate-900 pb-2 mb-4 flex justify-between items-baseline">
				<div>
					<h2 class="text-base font-black tracking-tight uppercase text-slate-950">TECHNICAL SKILLS</h2>
					<p class="text-[10px] font-bold text-slate-800 uppercase">PARTH KAUSHAL // MANIFEST</p>
				</div>
				<span class="text-[10px] font-bold text-slate-900">SYS_REV_2026</span>
			</div>
			<div class="space-y-4">
				{#each skills as skillGroup}
					<div>
						<button
							type="button"
							onclick={() => { playSound('click'); selectedCategory = skillGroup; }}
							class="text-left w-full group cursor-pointer"
						>
							<h4 class="text-[11px] font-black uppercase tracking-wider text-slate-900 mb-1 group-hover:text-sky-700 flex items-center justify-between">
								<span>{skillGroup.category}</span>
								<span class="text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">[inspect]</span>
							</h4>
							<div class="flex flex-wrap gap-1.5">
								{#each skillGroup.items as item}
									<span class="px-2 py-0.5 border border-slate-900 text-slate-950 text-[10px] font-bold uppercase group-hover:border-sky-700">{item}</span>
								{/each}
							</div>
						</button>
					</div>
				{/each}
			</div>
		</div>
		<div class="border-t border-slate-900 pt-2 text-[9px] font-bold text-slate-900 text-center uppercase tracking-widest">
			SKILLS_MANIFOLD_01
		</div>
	</div>

	<!-- Blueprint Specification Drawer Modal on Left Paper Sheet -->
	{#if selectedCategory}
		<div class="absolute left-[14%] top-[16%] w-[34%] h-[68%] p-6 text-slate-900 font-mono bg-amber-50/95 border-2 border-slate-900 rotate-[-1deg] shadow-2xl z-40 flex flex-col justify-between">
			<div>
				<div class="flex items-center justify-between pb-2 border-b-2 border-slate-900 mb-3">
					<h3 class="text-xs font-black uppercase text-slate-950 flex items-center gap-1.5"><FileCode class="w-4 h-4" /> Blueprint Spec</h3>
					<button
						type="button"
						onclick={() => { playSound('click'); selectedCategory = null; }}
						class="p-1 rounded border border-slate-900 hover:bg-slate-900 hover:text-white transition-colors"
					>
						<X class="w-3.5 h-3.5" />
					</button>
				</div>
				<h4 class="text-sm font-black uppercase text-sky-800 mb-2">{selectedCategory.category}</h4>
				<p class="text-[11px] font-medium leading-relaxed text-slate-900 mb-4">{selectedCategory.details}</p>

				<div class="border-t border-slate-900 pt-3">
					<span class="text-[10px] font-black uppercase block mb-1">Production Integrations</span>
					<div class="flex flex-wrap gap-1">
						{#each selectedCategory.items as item}
							<span class="px-2 py-0.5 bg-slate-900 text-white text-[9px] font-bold uppercase">{item}</span>
						{/each}
					</div>
				</div>
			</div>

			<div class="border-t border-slate-900 pt-2 text-[9px] font-black text-slate-900 text-center uppercase tracking-widest">
				SPEC_VERIFIED_OK
			</div>
		</div>
	{/if}
</div>
