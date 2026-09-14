<script lang="ts">
	import { onMount } from 'svelte';
	import { systemSettings } from '$lib/stores/glassSettings';
	import { playSound } from '$lib/utils/soundEngine';
	import { playMonitorBootAnimation } from '$lib/animations/monitorBootChoreography';
	import ProjectDetailModal from './ProjectDetailModal.svelte';

	let { projects = [
		{
			id: 'keynote-3d',
			title: 'Keynote Studio 3D',
			year: '2026',
			category: 'Spatial Web',
			tech: 'SvelteKit • GSAP • Tailwind',
			tags: ['SvelteKit', 'GSAP 3D', 'WebM', 'Tailwind'],
			thumbnailUrl: '/bg-office-center.jpg',
			description: 'Cinematic Apple Keynote virtual stage portfolio engine with transparent WebM avatars and 2D spatial navigation.',
			longDescription: 'High-performance interactive 2D spatial canvas rendering engine with GSAP camera choreography, WebM transparent video loops, and responsive glass tablet controls.',
			liveUrl: 'https://keynote-studio-3d.vercel.app',
			githubUrl: 'https://github.com/p8kaushal/portfolio-website',
			highlights: [
				'4-Layer Z-Index Canvas Stack with GPU acceleration',
				'60 FPS Motion Blur with 0ms dropped frames',
				'Automatic WebM green-screen chroma keyer'
			]
		},
		{
			id: 'spatial-ui-kit',
			title: 'Spatial UI Kit',
			year: '2025',
			category: 'Canvas Engine',
			tech: 'TypeScript • Canvas • WebGL',
			tags: ['TypeScript', 'SVG Vectors', 'Canvas2D', 'CSS3D'],
			thumbnailUrl: '/bg-projects.jpg',
			description: 'High-performance interactive vector device frames and resolution-independent layout anchors.',
			longDescription: 'Resolution-independent CSS/SVG vector device frames optimized for spatial camera transitions and zero resolution degradation across 4K displays.',
			liveUrl: 'https://spatial-ui-kit.vercel.app',
			githubUrl: 'https://github.com/p8kaushal/spatial-ui-kit',
			highlights: [
				'Resolution-independent SVG vector path composition',
				'Sub-millisecond scaling re-renders on 4K screens',
				'Automated dynamic hardware aspect-ratio anchoring math'
			]
		},
		{
			id: 'ai-presenter-keyer',
			title: 'AI Presenter Keyer',
			year: '2025',
			category: 'Video Pipeline',
			tech: 'WebM • HTML5 • FFmpeg',
			tags: ['FFmpeg', 'WebM', 'Chroma Key', 'HTML5'],
			thumbnailUrl: '/bg-experience.jpg',
			description: 'Transparent video keying pipeline and dual-pass alpha channel generator for real-time HTML5 presenter avatars.',
			longDescription: 'Automated green-screen background removal and FFmpeg WebM encoding pipeline for real-time HTML5 video presenter avatars.',
			liveUrl: 'https://ai-presenter-keyer.vercel.app',
			githubUrl: 'https://github.com/p8kaushal/ai-presenter-keyer',
			highlights: [
				'Dual-pass FFmpeg chroma key filter chain',
				'Sub-100ms video decoding latency over CDN edge',
				'HTML5 Canvas2D real-time pixel shader fallback'
			]
		},
		{
			id: 'nation-state-sim',
			title: 'NationState Sim',
			year: '2025',
			category: 'Simulations',
			tech: 'SvelteKit • Supabase • Canvas',
			tags: ['SvelteKit', 'Supabase', 'WebSockets', 'Canvas API'],
			thumbnailUrl: '/bg-desk-papers.jpg',
			description: 'Geopolitical strategy engine with real-time dynamic market simulation and multiplayer socket sync.',
			longDescription: 'Full-stack geopolitical simulation web platform featuring real-time economic state machines and live map rendering.',
			liveUrl: 'https://nation-state-sim.vercel.app',
			githubUrl: 'https://github.com/p8kaushal/nation-state-sim',
			highlights: [
				'Event-driven Supabase Realtime socket bus',
				'120 updates/sec server state broadcasting',
				'Custom quadtree map spatial partitioner'
			]
		},
		{
			id: 'neural-speech-normalizer',
			title: 'Neural Speech Normalizer',
			year: '2025',
			category: 'AI / Research',
			tech: 'Python • PyTorch • ONNX',
			tags: ['Python', 'ONNX', 'PyTorch', 'IIT Bombay'],
			thumbnailUrl: '/bg-office-center.jpg',
			description: 'Low-latency neural audio normalization pipeline for edge deployment developed during research fellowship.',
			longDescription: 'Edge-optimized neural speech preprocessing pipeline converting noisy acoustic inputs into clean normalized speech features.',
			liveUrl: 'https://neural-speech.vercel.app',
			githubUrl: 'https://github.com/p8kaushal/neural-speech-normalizer',
			highlights: [
				'Quantized INT8 ONNX Runtime model export',
				'< 15ms inference latency on ARM CPU',
				'Automated PyTorch TorchScript JIT tracing'
			]
		},
		{
			id: 'glass-spatial-studio',
			title: 'Glass Spatial Studio',
			year: '2024',
			category: 'Design Systems',
			tech: 'CSS Custom Properties • Svelte',
			tags: ['Svelte', 'CSS Variables', 'Apple Design', 'Backdrop Filter'],
			thumbnailUrl: '/bg-projects.jpg',
			description: 'Apple-inspired glassmorphism component library with reactive blur and opacity system controls.',
			longDescription: 'Design system implementing translucent glass cards, dynamic backdrop blurs, and unified spatial state control.',
			liveUrl: 'https://glass-spatial-studio.vercel.app',
			githubUrl: 'https://github.com/p8kaushal/glass-spatial-studio',
			highlights: [
				'Unified CSS custom variable reactive binding',
				'Zero layout thrashing hardware composite layers',
				'Automated cross-browser backdrop-filter fallback cascade'
			]
		}
	] }: { projects?: any[] } = $props();

	let selectedProject = $state<any | null>(null);

	onMount(() => {
		playMonitorBootAnimation();
	});
</script>

<div 
  id="projects-monitor-root"
  class="absolute top-[12%] left-1/2 -translate-x-1/2 w-[76vw] max-w-[1140px] h-[60vh] max-h-[640px] rounded-[24px] bg-slate-950/90 border border-white/20 shadow-[0_32px_90px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden pointer-events-auto z-20 transition-opacity duration-300 opacity-100"
  style="background-color: rgba(255, 255, 255, {$systemSettings.opacity}); backdrop-filter: blur({$systemSettings.blur}px); -webkit-backdrop-filter: blur({$systemSettings.blur}px);"
>
  <!-- macOS Traffic Dots Header Bar -->
  <div class="w-full h-11 bg-slate-950/90 border-b border-white/10 px-5 flex items-center justify-between select-none shrink-0 z-30">
    <div class="flex items-center gap-2">
      <span class="w-3 h-3 rounded-full bg-rose-500/90 shadow-[0_0_8px_rgba(244,63,94,0.6)]"></span>
      <span class="w-3 h-3 rounded-full bg-amber-500/90 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></span>
      <span class="w-3 h-3 rounded-full bg-emerald-500/90 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">DisplayPort 1.4 • 144Hz</span>
      <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
    </div>
  </div>

  <!-- Scrollable Projects Body Grid -->
  <div 
    id="projects-scroll-container"
    class="flex-1 w-full overflow-y-auto overflow-x-hidden p-6 md:p-8 scroll-smooth pointer-events-auto z-20"
    style="scrollbar-width: thin; scrollbar-color: rgba(0,0,0,0.2) transparent;"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
      {#each projects as project}
        <!-- High-Contrast Readable Card Item -->
        <button
          type="button"
          onmouseenter={() => playSound('click')}
          onclick={() => { playSound('click'); selectedProject = project; }}
          class="project-card pointer-events-auto p-5 rounded-2xl bg-white/85 border border-white/90 shadow-[0_12px_32px_rgba(0,0,0,0.12)] hover:shadow-2xl hover:border-sky-500/60 transition-all duration-300 hover:scale-[1.015] cursor-pointer group flex flex-col justify-between text-slate-950 text-left"
        >
          <div>
            <!-- Media Thumbnail Preview -->
            <div class="relative aspect-video w-full rounded-xl overflow-hidden mb-3.5 bg-slate-950 border border-slate-200">
              <img 
                src={project?.thumbnailUrl || '/images/projects/placeholder.jpg'} 
                alt={project?.title || 'Project'}
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span class="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-slate-950/90 border border-white/20 text-[10px] font-mono font-bold text-sky-400 backdrop-blur-md">
                {project?.year ?? '2026'}
              </span>
            </div>

            <!-- Black Readable Typography -->
            <h3 class="text-base font-black text-slate-950 group-hover:text-sky-600 transition-colors flex items-center justify-between">
              {project?.title ?? 'Untitled Project'}
              <span class="text-xs text-slate-500 group-hover:text-sky-600 transition-colors">↗</span>
            </h3>
            <p class="text-xs text-slate-800 mt-1.5 font-semibold leading-relaxed line-clamp-2">
              {project?.description ?? ''}
            </p>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-200/80 flex flex-wrap gap-1.5">
            {#each (project?.tags ?? []) as tag}
              <span class="text-[10px] font-mono font-bold px-2.5 py-0.5 bg-slate-900 text-white rounded-md">{tag}</span>
            {/each}
          </div>
        </button>
      {/each}
    </div>
  </div>

  {#if selectedProject}
    <ProjectDetailModal project={selectedProject} onClose={() => (selectedProject = null)} />
  {/if}
</div>
