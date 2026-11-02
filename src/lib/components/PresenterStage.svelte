<script lang="ts">
	import { onMount } from 'svelte';
	import { activeTab, setTab } from '$lib/stores/navStore';
	import { animateSpatialTransition, playExperienceTransition } from '$lib/animations/cameraChoreography';
	import { playSound } from '$lib/utils/soundEngine';
	import ExperienceTv from '$lib/components/ExperienceTV.svelte';
	import TransparentPresenter from '$lib/components/TransparentPresenter.svelte';
	import { SPATIAL_FLOOR_PLAN } from '$lib/constants/assets';
	import { Mail, ExternalLink, Download, Award, CheckCircle, Monitor, Tv, Layers, X, ChevronLeft, ChevronRight, ArrowRight, FolderGit2, Terminal, Code2 } from 'lucide-svelte';

	let stageContainer = $state<HTMLElement | null>(null);
	let carouselRef = $state<HTMLElement | null>(null);

	let activeProjectModal = $state<any | null>(null);
	let activeAwardModal = $state<any | null>(null);
	let previousTab = $state<string | undefined>(undefined);



	$effect(() => {
		const tab = $activeTab;
		activeProjectModal = null;
		activeAwardModal = null;

		if (stageContainer) {
			if (tab === 'experience') {
				playExperienceTransition(() => {});
			} else {
				animateSpatialTransition(previousTab, tab, () => {});
			}
		}
		previousTab = tab;
	});

	onMount(() => {
		if (stageContainer) {
			animateSpatialTransition(undefined, $activeTab, () => {});
			previousTab = $activeTab;
		}
	});

	const projects = [
		{ title: 'Keynote Studio 3D', tech: 'SvelteKit • GSAP • Tailwind', desc: 'Cinematic Apple Keynote virtual stage portfolio engine.', fullDesc: 'High-performance interactive 2D spatial canvas rendering engine with GSAP camera choreography, WebM transparent video loops, and responsive glass tablet controls.', link: 'https://github.com' },
		{ title: 'Spatial UI Kit', tech: 'TypeScript • Canvas • WebGL', desc: 'High-performance interactive vector device frames.', fullDesc: 'Resolution-independent CSS/SVG vector device frames optimized for spatial camera transitions and zero resolution degradation.', link: 'https://github.com' },
		{ title: 'AI Presenter Keyer', tech: 'WebM • HTML5 • FFmpeg', desc: 'Transparent video keying pipeline for real-time web avatars.', fullDesc: 'Automated green-screen background removal and FFmpeg WebM encoding pipeline for real-time HTML5 video presenter avatars.', link: 'https://github.com' }
	];

	const skills = [
		{ category: 'Frontend Architecture', items: ['Svelte / SvelteKit', 'TypeScript', 'Tailwind CSS', 'GSAP Animation', 'HTML5 Canvas'] },
		{ category: 'Systems & Performance', items: ['Performance Tuning', 'Spatial UI Design', 'State Management', 'WebM Transparent Video'] },
		{ category: 'Tooling & CI/CD', items: ['Git & GitHub', 'Vite / Rollup', 'Figma Prototyping', 'Vercel CDN'] }
	];

	const awards = [
		{ title: 'Awwwards Site of the Day', year: '2025', org: 'Awwwards International', details: 'Recognized for outstanding web design, interactive spatial UI, and sub-second performance.' },
		{ title: 'FWA of the Month', year: '2024', org: 'Favorite Website Awards', details: 'Awarded for pioneering GSAP spatial camera transitions and 4-layer composition engines.' },
		{ title: 'Apple Design Award Nominee', year: '2024', org: 'WWDC Developer Showcase', details: 'Nominated for Apple Keynote-inspired human-scale portfolio interface.' },
		{ title: 'Best Web Animation', year: '2023', org: 'CSS Design Awards', details: 'Honored for 60 FPS motion-blur camera transitions.' }
	];

	function scrollCarousel(direction: 'left' | 'right') {
		playSound('click');
		if (carouselRef) {
			const scrollAmount = direction === 'left' ? -320 : 320;
			carouselRef.scrollBy({ left: scrollAmount, behavior: 'smooth' });
		}
	}
</script>

<div id="stage-viewport" bind:this={stageContainer} class="relative w-screen h-screen overflow-hidden bg-black select-none">
	<!-- Dual-Buffered Layer 1: Active Stage Layer -->
	<div id="active-stage-layer" class="absolute inset-0 w-full h-full z-10 pointer-events-none">
		<img id="wide-room-bg" src="/bg-office-center.jpg" class="w-full h-full object-cover studio-backdrop brightness-95 contrast-105" alt="Stage Layer Active" />
	</div>

	<!-- Dual-Buffered Layer 2: Next Stage Layer (Used for zero-flash sliding) -->
	<div id="next-stage-layer" class="absolute inset-0 w-full h-full z-15 opacity-0 pointer-events-none">
		<img id="next-room-bg" src="/bg-office-center.jpg" class="w-full h-full object-cover" alt="Stage Layer Next" />
	</div>

	<!-- Intermediate Mid View -->
	<div id="mid-room-layer" class="absolute inset-0 w-full h-full z-15 opacity-0 pointer-events-none">
		<img id="mid-room-bg" src="/bg-experience.jpg" class="w-full h-full object-cover" alt="Mid View" />
	</div>

	<!-- Macro Container Layer -->
	<div id="macro-room-layer" class="absolute inset-0 w-full h-full z-20 opacity-0 pointer-events-auto">
		<img id="macro-room-bg" src="/bg-experience-macro.jpg" class="w-full h-full object-cover" alt="Macro View" />

		{#if $activeTab === 'experience'}
			<ExperienceTv isActive={$activeTab === 'experience'} />
		{/if}

		{#if $activeTab === 'projects'}
			<div class="projects-station absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[68%] h-[58%] z-30 rounded-lg bg-slate-950 p-6 overflow-hidden text-white pointer-events-auto flex flex-col justify-between border border-slate-800 shadow-2xl">
				<div class="absolute inset-0 z-40 pointer-events-none" style="background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%);"></div>

				<div class="relative z-10 flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
					<span class="flex items-center gap-2"><Monitor class="w-4 h-4 text-emerald-400" /> STUDIO MONITOR OS</span>
					<span>32" 4K DISPLAY</span>
				</div>

				<div class="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-auto max-h-full no-scrollbar my-auto">
					{#each projects as proj}
						<button
							type="button"
							onmouseenter={() => playSound('click')}
							onclick={() => { playSound('click'); activeProjectModal = proj; }}
							class="group text-left p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-400/80 hover:bg-slate-800 transition-all duration-200 flex flex-col justify-between cursor-pointer shadow-lg"
						>
							<div>
								<span class="text-[10px] font-mono text-emerald-400 font-bold block mb-1.5">{proj.tech}</span>
								<h4 class="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mb-2">{proj.title}</h4>
								<p class="text-xs text-slate-300 leading-relaxed mb-4">{proj.desc}</p>
							</div>
							<span class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors">
								Focus Project <ExternalLink class="w-3.5 h-3.5" />
							</span>
						</button>
					{/each}
				</div>
			</div>
		{/if}

		{#if $activeTab === 'skills' || $activeTab === 'resume'}
			<div class="card-overlay absolute inset-0 z-30 pointer-events-auto transition-transform duration-500 ease-out {$activeTab === 'resume' ? '-translate-x-[60px]' : 'translate-x-0'}">
				<!-- Left Paper Sheet (Skills) -->
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
									<h4 class="text-[11px] font-black uppercase tracking-wider text-slate-900 mb-1">{skillGroup.category}</h4>
									<div class="flex flex-wrap gap-1.5">
										{#each skillGroup.items as item}
											<span class="px-2 py-0.5 border border-slate-900 text-slate-950 text-[10px] font-bold uppercase">{item}</span>
										{/each}
									</div>
								</div>
							{/each}
						</div>
					</div>
					<div class="border-t border-slate-900 pt-2 text-[9px] font-bold text-slate-900 text-center uppercase tracking-widest">
						SKILLS_MANIFOLD_01
					</div>
				</div>

				<!-- Right Paper Sheet (Resume) -->
				<div class="absolute left-[54%] top-[16%] w-[34%] h-[68%] p-6 text-slate-900 font-mono rotate-[1deg] mix-blend-multiply flex flex-col justify-between">
					<div>
						<div class="border-b-2 border-slate-900 pb-2 mb-3 flex justify-between items-start">
							<div>
								<h2 class="text-lg font-black tracking-tight text-slate-950">PARTH KAUSHAL</h2>
								<p class="text-[11px] font-bold text-slate-900 uppercase">Senior Systems Architect</p>
							</div>
							<a
								href="/resume.pdf"
								download
								onclick={() => playSound('click')}
								class="px-2.5 py-1 border-2 border-slate-900 text-slate-950 text-[10px] font-black uppercase flex items-center gap-1 hover:bg-slate-900 hover:text-white transition-colors pointer-events-auto"
							>
								<Download class="w-3 h-3" /> PDF
							</a>
						</div>
						<div class="space-y-3 text-xs text-slate-950 leading-snug">
							<div>
								<h4 class="font-black text-[11px] uppercase border-b border-slate-900 mb-1">Executive Summary</h4>
								<p class="text-[10px] font-medium">5+ years of experience leading interactive web frontend architectures, high-performance canvas rendering, and 2D spatial UI engines.</p>
							</div>
							<div>
								<h4 class="font-black text-[11px] uppercase border-b border-slate-900 mb-1">Core Competencies</h4>
								<p class="text-[10px] font-medium">SvelteKit, GSAP 3D Timelines, WebM Transparent Video Pipelines, TypeScript, Tailwind CSS, Performance Tuning.</p>
							</div>
						</div>
					</div>
					<div class="border-t border-slate-900 pt-2 text-[9px] font-bold text-slate-900 text-center uppercase tracking-widest">
						RESUME_MANIFOLD_02
					</div>
				</div>
			</div>
		{/if}

		{#if $activeTab === 'achievements'}
			<div class="card-overlay absolute inset-0 z-30 flex items-center justify-center p-6 pointer-events-auto">
				<div class="relative w-full max-w-5xl">
					<button
						type="button"
						onclick={() => scrollCarousel('left')}
						class="absolute -left-6 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full backdrop-blur-xl bg-slate-900/80 border border-white/20 text-white shadow-2xl hover:bg-slate-800 transition-all cursor-pointer"
						aria-label="Scroll Carousel Left"
					>
						<ChevronLeft class="w-6 h-6" />
					</button>
					<button
						type="button"
						onclick={() => scrollCarousel('right')}
						class="absolute -right-6 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full backdrop-blur-xl bg-slate-900/80 border border-white/20 text-white shadow-2xl hover:bg-slate-800 transition-all cursor-pointer"
						aria-label="Scroll Carousel Right"
					>
						<ChevronRight class="w-6 h-6" />
					</button>

					<div bind:this={carouselRef} class="flex gap-8 overflow-x-auto snap-x scrollbar-none p-6">
						{#each awards as award}
							<button
								type="button"
								onmouseenter={() => playSound('click')}
								onclick={() => { playSound('click'); activeAwardModal = award; }}
								class="snap-center shrink-0 w-80 text-left p-6 rounded-sm border-[10px] border-amber-950/40 bg-slate-900/90 text-white shadow-2xl hover:border-amber-500 hover:scale-[1.03] transition-all duration-300 cursor-pointer relative group"
							>
								<div class="w-3 h-3 rounded-full bg-amber-400 absolute top-2 right-2 shadow-sm"></div>
								<Award class="w-8 h-8 text-amber-400 mb-3" />
								<h4 class="text-base font-extrabold text-white group-hover:text-amber-300 transition-colors mb-1">{award.title}</h4>
								<p class="text-xs text-slate-400 mb-3">{award.org}</p>
								<span class="inline-block font-mono text-[10px] font-bold text-amber-300 px-2.5 py-1 rounded bg-slate-800 border border-slate-700">{award.year}</span>
							</button>
						{/each}
					</div>
				</div>
			</div>
		{/if}
	</div>

	<!-- STAGE 2: Restored Presenter Video Loop Tags -->
	{#if $activeTab === 'home'}
		<div class="presenter-layer absolute inset-0 z-30 flex items-end justify-center pointer-events-none transition-transform duration-700 ease-out">
			<TransparentPresenter
				id="presenter-video"
				webmSrc="/videos/presenter-transparent.webm"
				movSrc="/videos/presenter-transparent.mov"
				class="h-[82vh] w-auto object-contain drop-shadow-2xl z-20 pointer-events-none select-none"
				alt="Parth Kaushal - Home Stage Presenter"
			/>
		</div>
	{:else if $activeTab === 'about'}
		<div class="presenter-layer absolute inset-0 z-30 flex items-end justify-start pl-[10%] pointer-events-none transition-transform duration-700 ease-out">
			<TransparentPresenter
				id="presenter-video-about"
				webmSrc="/videos/presenter-about-transparent.webm"
				movSrc="/videos/presenter-about-transparent.mov"
				class="h-[82vh] w-auto object-contain drop-shadow-2xl z-20 pointer-events-none select-none"
				alt="Parth Kaushal - About Stage Presenter"
			/>
		</div>
	{/if}

	<!-- Contact Smartphone Container with Slide-Up Entrance -->
	{#if $activeTab === 'contact'}
		<div class="phone-modal contact-phone-wrapper absolute inset-0 z-30 flex items-center justify-center p-6 pointer-events-auto">
			<div class="relative w-[280px] h-[560px] rounded-[48px] border-[8px] border-slate-900 bg-black p-4 shadow-2xl shadow-black/80 overflow-hidden text-white flex flex-col justify-between">
				<div class="absolute -right-[11px] top-28 w-[3px] h-12 bg-slate-800 rounded-r-md"></div>
				<div class="absolute -left-[11px] top-24 w-[3px] h-8 bg-slate-800 rounded-l-md"></div>
				<div class="absolute -left-[11px] top-36 w-[3px] h-8 bg-slate-800 rounded-l-md"></div>

				<div class="w-24 h-5 bg-slate-950 rounded-full mx-auto flex items-center justify-center gap-2 border border-slate-800">
					<div class="w-2.5 h-2.5 rounded-full bg-black border border-slate-700"></div>
				</div>

				<div class="text-center my-auto">
					<h3 class="text-xl font-extrabold text-white mb-1">Get In Touch</h3>
					<p class="text-[11px] text-slate-400 leading-snug">Available for architecture roles & virtual keynote projects.</p>
				</div>

				<div class="grid grid-cols-2 gap-3 mb-4">
					<a
						href="mailto:hello@example.com"
						onmouseenter={() => playSound('click')}
						onclick={() => playSound('click')}
						class="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center hover:scale-105 hover:bg-slate-800 hover:border-sky-400/50 transition-all cursor-pointer"
					>
						<Mail class="w-5 h-5 text-sky-400 mb-1.5 shrink-0" />
						<span class="text-xs font-medium">Email</span>
					</a>
					<a
						href="https://github.com"
						target="_blank"
						rel="noreferrer"
						onmouseenter={() => playSound('click')}
						onclick={() => playSound('click')}
						class="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center hover:scale-105 hover:bg-slate-800 hover:border-purple-400/50 transition-all cursor-pointer"
					>
						<svg class="w-5 h-5 text-purple-400 mb-1.5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
						<span class="text-xs font-medium">GitHub</span>
					</a>
					<a
						href="https://linkedin.com"
						target="_blank"
						rel="noreferrer"
						onmouseenter={() => playSound('click')}
						onclick={() => playSound('click')}
						class="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center hover:scale-105 hover:bg-slate-800 hover:border-blue-400/50 transition-all cursor-pointer"
					>
						<svg class="w-5 h-5 text-blue-400 mb-1.5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
						<span class="text-xs font-medium">LinkedIn</span>
					</a>
					<a
						href="https://x.com"
						target="_blank"
						rel="noreferrer"
						onmouseenter={() => playSound('click')}
						onclick={() => playSound('click')}
						class="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center hover:scale-105 hover:bg-slate-800 hover:border-sky-300/50 transition-all cursor-pointer"
					>
						<svg class="w-5 h-5 text-sky-300 mb-1.5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
						<span class="text-xs font-medium">X / Twitter</span>
					</a>
				</div>
				<div class="w-28 h-1 bg-slate-600 rounded-full mx-auto"></div>
			</div>
		</div>
	{/if}

	<!-- Overlays -->
	{#if $activeTab === 'home'}
		<div class="card-overlay absolute inset-0 z-30 pointer-events-auto hidden sm:block">
			<div class="backdrop-blur-2xl bg-white/80 border border-white/60 shadow-2xl rounded-3xl p-6 text-neutral-900 absolute left-10 top-1/2 -translate-y-1/2 w-80">
				<span class="inline-block px-3 py-1 rounded-full bg-sky-500/10 text-sky-700 text-xs font-mono font-semibold uppercase tracking-wider mb-2">STAGE 01</span>
				<h1 class="text-2xl font-black text-neutral-900 mb-1">PARTH KAUSHAL</h1>
				<p class="text-xs font-bold text-sky-700 mb-3">Senior Systems Architect</p>
				<div class="flex items-center gap-2 p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-semibold">
					<span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0"></span> Available for Architecture Roles
				</div>
			</div>

			<div class="backdrop-blur-2xl bg-white/80 border border-white/60 shadow-2xl rounded-3xl p-6 text-neutral-900 absolute right-10 top-1/2 -translate-y-1/2 w-80">
				<h3 class="text-sm font-bold uppercase tracking-wider text-neutral-600 mb-2">Executive Overview</h3>
				<p class="text-xs text-neutral-700 leading-relaxed mb-4">
					Building cinematic 2D spatial web experiences with SvelteKit, GSAP camera choreography, and high-performance WebM video avatars.
				</p>
				<div class="flex gap-2">
					<button
						type="button"
						onclick={() => setTab('projects')}
						class="flex-1 py-2 px-3 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1 cursor-pointer"
					>
						Projects <ArrowRight class="w-3.5 h-3.5" />
					</button>
					<button
						type="button"
						onclick={() => setTab('experience')}
						class="flex-1 py-2 px-3 rounded-xl bg-white border border-neutral-300 text-neutral-900 text-xs font-bold hover:bg-neutral-100 transition-colors flex items-center justify-center gap-1 cursor-pointer"
					>
						Experience
					</button>
				</div>
			</div>
		</div>
	{/if}

	{#if $activeTab === 'about'}
		<div class="card-overlay absolute inset-0 z-30 flex items-center justify-end p-6 pointer-events-auto">
			<div class="backdrop-blur-2xl bg-white/80 border border-white/60 shadow-2xl rounded-3xl p-8 text-neutral-900 max-w-xl mr-[6%]">
				<span class="inline-block px-3.5 py-1 rounded-full bg-purple-500/10 text-purple-700 text-xs font-semibold uppercase tracking-wider mb-3">About Presenter</span>
				<h2 class="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">Architecting Spatial Web</h2>
				<p class="text-sm text-neutral-700 leading-relaxed mb-4">
					Passionate Frontend Engineer specializing in high-performance WebGL, CSS 3D spatial UI, and SvelteKit applications with Apple-grade polish.
				</p>
				<div class="grid grid-cols-2 gap-3 text-xs font-medium text-neutral-800">
					<div class="p-2.5 rounded-xl bg-white/60 border border-neutral-200">📍 San Francisco, CA</div>
					<div class="p-2.5 rounded-xl bg-white/60 border border-neutral-200">🚀 5+ Years Experience</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- Modals -->
	{#if activeProjectModal}
		<div class="fixed inset-0 z-40 bg-neutral-950/80 backdrop-blur-xl flex items-center justify-center p-6 pointer-events-auto">
			<div class="relative w-full max-w-xl rounded-3xl bg-neutral-900 border-2 border-emerald-400/60 shadow-2xl p-8 text-white">
				<button
					type="button"
					onclick={() => { playSound('click'); activeProjectModal = null; }}
					class="absolute top-4 right-4 p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors cursor-pointer"
				>
					<X class="w-5 h-5 text-neutral-400" />
				</button>
				<span class="text-xs font-mono text-emerald-400 block mb-2">{activeProjectModal.tech}</span>
				<h3 class="text-2xl font-bold text-white mb-3">{activeProjectModal.title}</h3>
				<p class="text-sm text-neutral-300 leading-relaxed mb-6">{activeProjectModal.fullDesc}</p>
				<a
					href={activeProjectModal.link}
					target="_blank"
					rel="noreferrer"
					class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-neutral-950 font-bold text-xs hover:bg-emerald-400 transition-colors"
				>
					Launch Project Demo <ExternalLink class="w-4 h-4" />
				</a>
			</div>
		</div>
	{/if}

	{#if activeAwardModal}
		<div class="fixed inset-0 z-40 bg-neutral-950/80 backdrop-blur-xl flex items-center justify-center p-6 pointer-events-auto">
			<div class="relative w-full max-w-lg rounded-3xl bg-white border-4 border-amber-400 shadow-2xl p-8 text-neutral-900">
				<button
					type="button"
					onclick={() => { playSound('click'); activeAwardModal = null; }}
					class="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer"
				>
					<X class="w-5 h-5 text-neutral-600" />
				</button>
				<div class="flex items-center gap-3 mb-4">
					<Award class="w-8 h-8 text-amber-500 shrink-0" />
					<div>
						<h3 class="text-xl font-black text-neutral-900">{activeAwardModal.title}</h3>
						<p class="text-xs font-semibold text-amber-700">{activeAwardModal.org} • {activeAwardModal.year}</p>
					</div>
				</div>
				<p class="text-sm text-neutral-700 leading-relaxed mb-4">{activeAwardModal.details}</p>
				<div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs font-mono text-amber-800 text-center font-bold">
					OFFICIAL CERTIFICATE OF RECOGNITION
				</div>
			</div>
		</div>
	{/if}
</div>
