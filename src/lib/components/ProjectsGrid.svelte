<script lang="ts">
	import { playSound } from '$lib/utils/soundEngine';
	import { ExternalLink, Monitor, Cpu, X, CheckCircle2 } from 'lucide-svelte';

	const projects = [
		{
			title: 'Keynote Studio 3D',
			tech: 'SvelteKit • GSAP • Tailwind',
			desc: 'Cinematic Apple Keynote virtual stage portfolio engine.',
			fullDesc: 'High-performance interactive 2D spatial canvas rendering engine with GSAP camera choreography, WebM transparent video loops, and responsive glass tablet controls.',
			link: 'https://github.com',
			inspectorSpecs: {
				architecture: '4-Layer Z-Index Canvas Stack with GPU-accelerated CSS transforms',
				performance: '60 FPS Motion Blur; 0ms dropped frames during camera pans',
				pipeline: 'Automatic WebM green-screen chroma keyer with custom alpha mask generation'
			}
		},
		{
			title: 'Spatial UI Kit',
			tech: 'TypeScript • Canvas • WebGL',
			desc: 'High-performance interactive vector device frames.',
			fullDesc: 'Resolution-independent CSS/SVG vector device frames optimized for spatial camera transitions and zero resolution degradation.',
			link: 'https://github.com',
			inspectorSpecs: {
				architecture: 'Resolution-independent SVG vector path composition engine',
				performance: 'Sub-millisecond scaling re-renders across 4K displays',
				pipeline: 'Automated dynamic hardware aspect-ratio anchoring math'
			}
		},
		{
			title: 'AI Presenter Keyer',
			tech: 'WebM • HTML5 • FFmpeg',
			desc: 'Transparent video keying pipeline for real-time web avatars.',
			fullDesc: 'Automated green-screen background removal and FFmpeg WebM encoding pipeline for real-time HTML5 video presenter avatars.',
			link: 'https://github.com',
			inspectorSpecs: {
				architecture: 'Dual-pass FFmpeg chroma key filter chain (colorkey=0x00FF00:0.3:0.2)',
				performance: 'Sub-100ms video decoding latency over HTTP/2 CDN edge',
				pipeline: 'HTML5 Canvas2D real-time pixel shader fallback'
			}
		}
	];

	let activeInspectorModal = $state<any | null>(null);
</script>

<div class="projects-station absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[68%] h-[58%] z-30 rounded-xl bg-slate-900/85 backdrop-blur-3xl p-6 overflow-hidden text-white pointer-events-auto flex flex-col justify-between border border-white/15 shadow-2xl">
	<div class="absolute inset-0 z-40 pointer-events-none" style="background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%);"></div>

	<div class="relative z-10 flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-slate-300">
		<div class="flex items-center gap-2">
			<div class="flex items-center gap-1.5">
				<span class="w-3 h-3 rounded-full bg-[#FF5F56] inline-block shadow-xs"></span>
				<span class="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block shadow-xs"></span>
				<span class="w-3 h-3 rounded-full bg-[#27C93F] inline-block shadow-xs"></span>
			</div>
			<span class="ml-2 font-bold tracking-wider text-slate-200">STUDIO MONITOR OS</span>
		</div>
		<span class="font-bold text-sky-400">32" 4K DISPLAY</span>
	</div>

	<div class="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-auto max-h-full no-scrollbar my-auto">
		{#each projects as proj}
			<button
				type="button"
				onmouseenter={() => playSound('click')}
				onclick={() => { playSound('click'); activeInspectorModal = proj; }}
				class="group text-left p-5 rounded-lg bg-white/10 backdrop-blur-xl border border-white/15 hover:bg-white/20 transition-all duration-200 flex flex-col justify-between cursor-pointer shadow-lg"
			>
				<div>
					<span class="text-[10px] font-mono text-sky-400 font-bold block mb-1.5">{proj.tech}</span>
					<h4 class="text-lg font-bold text-white group-hover:text-sky-300 transition-colors mb-2">{proj.title}</h4>
					<p class="text-xs text-slate-200 leading-relaxed mb-4">{proj.desc}</p>
				</div>
				<span class="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 group-hover:underline transition-colors">
					Focus Project <ExternalLink class="w-3.5 h-3.5" />
				</span>
			</button>
		{/each}
	</div>

	<!-- Interactive Studio Monitor Device Inspector Modal -->
	{#if activeInspectorModal}
		<div class="absolute inset-0 z-50 bg-slate-900/70 backdrop-blur-2xl p-6 flex flex-col justify-between text-white border border-slate-700/50">
			<div>
				<div class="flex items-center justify-between pb-3 border-b border-slate-800">
					<div class="flex items-center gap-2">
						<Cpu class="w-5 h-5 text-emerald-400" />
						<h3 class="text-lg font-bold text-white">{activeInspectorModal.title}</h3>
					</div>
					<button
						type="button"
						onclick={() => { playSound('click'); activeInspectorModal = null; }}
						class="p-1.5 rounded bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
					>
						<X class="w-5 h-5" />
					</button>
				</div>

				<div class="mt-4 space-y-4 font-mono text-xs">
					<div class="p-3 rounded bg-slate-950/80 border border-slate-800">
						<span class="text-[10px] text-emerald-400 font-bold uppercase block mb-1">Architecture Specification</span>
						<p class="text-slate-200">{activeInspectorModal.inspectorSpecs.architecture}</p>
					</div>

					<div class="p-3 rounded bg-slate-950/80 border border-slate-800">
						<span class="text-[10px] text-emerald-400 font-bold uppercase block mb-1">Performance Benchmarks</span>
						<p class="text-slate-200">{activeInspectorModal.inspectorSpecs.performance}</p>
					</div>

					<div class="p-3 rounded bg-slate-950/80 border border-slate-800">
						<span class="text-[10px] text-emerald-400 font-bold uppercase block mb-1">Build Pipeline</span>
						<p class="text-slate-200">{activeInspectorModal.inspectorSpecs.pipeline}</p>
					</div>
				</div>
			</div>

			<div class="flex items-center justify-between pt-3 border-t border-slate-800">
				<span class="text-[10px] font-mono text-slate-500 uppercase">INSPECTOR_ACTIVE</span>
				<a
					href={activeInspectorModal.link}
					target="_blank"
					rel="noreferrer"
					class="px-4 py-2 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 transition-colors"
				>
					<svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg> Launch GitHub Repository <ExternalLink class="w-3.5 h-3.5" />
				</a>
			</div>
		</div>
	{/if}
</div>
