<script lang="ts">
	import { onMount } from 'svelte';
	import { activeTab, setTab } from '$lib/stores/navStore';
	import { animateCamera } from '$lib/animations/cameraChoreography';
	import { playSound } from '$lib/utils/soundEngine';
	import { Mail, ExternalLink, Download, Award, CheckCircle, Monitor, Tv, Layers, X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-svelte';

	let stageContainer = $state<HTMLElement | null>(null);
	let carouselRef = $state<HTMLElement | null>(null);
	let currentVideoSrc = $state('/presenter-home.webm');
	let activeProjectModal = $state<any | null>(null);
	let activeAwardModal = $state<any | null>(null);
	let activeExpIndex = $state(0);

	$effect(() => {
		const tab = $activeTab;
		if (tab === 'home') {
			currentVideoSrc = '/presenter-home.webm';
		} else if (tab === 'about') {
			currentVideoSrc = '/presenter-about.webm';
		}

		activeProjectModal = null;
		activeAwardModal = null;

		if (stageContainer) {
			animateCamera(tab, stageContainer);
		}
	});

	onMount(() => {
		if (stageContainer) {
			animateCamera($activeTab, stageContainer);
		}
	});

	const experiences = [
		{ year: '2024 - Present', role: 'Staff Frontend Architect', company: 'Apple Keynote Inc.', desc: 'Designing next-gen WebGL and CSS 3D interactive spatial experiences.', keyPoints: ['Pioneered 4-layer composition engines', 'Optimized 60 FPS GSAP timelines', 'Architected SvelteKit design systems'] },
		{ year: '2022 - 2024', role: 'Senior Interactive Developer', company: 'Creative Web Labs', desc: 'Pioneered GSAP camera choreography engines for virtual events.', keyPoints: ['Built camera pan interpolations', 'Integrated WebM transparent video', 'Tuned sub-second CDN load times'] },
		{ year: '2020 - 2022', role: 'Full Stack Engineer', company: 'TechVision Studio', desc: 'Built real-time web dashboards and SvelteKit applications.', keyPoints: ['Developed WebSocket state sync', 'Created custom Tailwind design tokens', 'Managed automated CI/CD builds'] }
	];

	const projects = [
		{ title: 'Keynote Studio 3D', tech: 'SvelteKit • GSAP • Tailwind', desc: 'Cinematic Apple Keynote virtual stage portfolio engine.', fullDesc: 'High-performance interactive 2D spatial canvas rendering engine with GSAP camera choreography, WebM transparent video loops, and responsive glass tablet controls.', link: 'https://github.com' },
		{ title: 'Spatial UI Kit', tech: 'TypeScript • Canvas • WebGL', desc: 'High-performance interactive vector device frames.', fullDesc: 'Resolution-independent CSS/SVG vector device frames optimized for spatial camera transitions and zero resolution degradation.', link: 'https://github.com' },
		{ title: 'AI Presenter Keyer', tech: 'WebM • HTML5 • FFmpeg', desc: 'Transparent video keying pipeline for real-time web avatars.', fullDesc: 'Automated green-screen background removal and FFmpeg WebM encoding pipeline for real-time HTML5 video presenter avatars.', link: 'https://github.com' }
	];

	const skills = [
		{ category: 'Frontend Architecture', items: ['Svelte / SvelteKit', 'TypeScript', 'Tailwind CSS', 'GSAP Animation', 'HTML5 Canvas'] },
		{ category: 'Systems & Performance', items: ['Performance Tuning', 'Spatial UI Design', 'State Management', 'WebM Transparent Video'] },
		{ category: 'Tooling & CI/CD', items: ['Git & GitHub', 'Vite / Rollback', 'Figma Prototyping', 'Vercel CDN'] }
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

<div bind:this={stageContainer} class="relative w-full h-full overflow-hidden bg-neutral-950 select-none">
	<!-- LAYER 1 (Z-index 0): Dynamic Studio Backdrop -->
	<div class="absolute inset-0 z-0 overflow-hidden">
		<img
			src="/bg-office-center.jpg"
			alt="Keynote Studio Stage Backdrop"
			class="studio-backdrop absolute inset-0 w-full h-full object-cover origin-center brightness-95 contrast-105 transition-all duration-500 ease-out"
		/>
	</div>

	<!-- LAYER 2 (Z-index 10): Presenter Video Layer -->
	{#if $activeTab === 'home' || $activeTab === 'about'}
		<div class="presenter-layer absolute inset-0 z-10 flex items-center justify-center pointer-events-none transition-transform duration-700 ease-out">
			<video
				src={currentVideoSrc}
				autoplay
				loop
				muted
				playsinline
				class="absolute bottom-0 h-[82vh] w-auto object-contain transition-all duration-500 {$activeTab === 'home' ? 'left-1/2 -translate-x-1/2' : 'left-[10%]'}"
				style="filter: drop-shadow(0 20px 30px rgba(0,0,0,0.3)) brightness(0.98) contrast(1.02);"
			></video>
		</div>
	{/if}

	<!-- LAYER 3 (Z-index 20): Surface-Locked Macro Stations -->
	<!-- Experience Macro TV Glass Display -->
	{#if $activeTab === 'experience'}
		<div class="experience-station absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-4xl sm:w-[72%] h-[68%] z-20 overflow-hidden rounded-xl bg-neutral-950/90 backdrop-blur-md p-6 border border-white/10 shadow-2xl text-white pointer-events-auto flex flex-col justify-between">
			<div class="flex items-center justify-between pb-3 border-b border-neutral-800">
				<div class="flex items-center gap-2">
					<Tv class="w-5 h-5 text-sky-400 shrink-0" />
					<span class="text-xs font-mono font-bold tracking-widest text-sky-400 uppercase">4K HDR TV MONITOR // MACRO VIEW</span>
				</div>
				<span class="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
					<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> ONLINE
				</span>
			</div>

			<!-- Interactive Node Timeline Bar -->
			<div class="flex items-center justify-around bg-neutral-900/80 rounded-xl p-2 border border-neutral-800 my-2">
				{#each experiences as exp, idx}
					<button
						type="button"
						onmouseenter={() => playSound('click')}
						onclick={() => { playSound('click'); activeExpIndex = idx; }}
						class="px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer {activeExpIndex === idx ? 'bg-sky-500/20 text-sky-400 border border-sky-500/50 shadow-xs' : 'text-neutral-400 hover:text-white'}"
					>
						{exp.year}
					</button>
				{/each}
			</div>

			<!-- Active Role Responsibilities -->
			<div class="bg-neutral-900/70 rounded-xl p-5 border border-neutral-800/80 flex-1 flex flex-col justify-between">
				<div>
					<div class="flex justify-between items-start mb-1">
						<h4 class="text-lg font-bold text-white">{experiences[activeExpIndex].role}</h4>
						<span class="text-xs font-semibold text-sky-300">{experiences[activeExpIndex].company}</span>
					</div>
					<p class="text-xs text-neutral-300 mb-3">{experiences[activeExpIndex].desc}</p>
				</div>
				<ul class="space-y-1.5">
					{#each experiences[activeExpIndex].keyPoints as point}
						<li class="text-xs text-neutral-300 flex items-center gap-2">
							<span class="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0"></span> {point}
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{/if}

	<!-- Projects Macro Monitor Display Shelf -->
	{#if $activeTab === 'projects'}
		<div class="projects-station absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-4xl sm:w-[70%] h-[65%] z-20 rounded-xl bg-slate-950/95 border border-slate-700/60 p-6 overflow-hidden text-white pointer-events-auto flex flex-col justify-between">
			<div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
				<div class="flex items-center gap-2">
					<Monitor class="w-5 h-5 text-emerald-400 shrink-0" />
					<span class="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">32" STUDIO MONITOR // DESKTOP OS</span>
				</div>
				<span class="text-[10px] font-mono text-neutral-400">RETINA 6K</span>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-auto max-h-[calc(100%-48px)] no-scrollbar">
				{#each projects as proj}
					<button
						type="button"
						onmouseenter={() => playSound('click')}
						onclick={() => { playSound('click'); activeProjectModal = proj; }}
						class="group text-left p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-400/60 hover:bg-slate-800/80 transition-all duration-200 flex flex-col justify-between cursor-pointer"
					>
						<div>
							<span class="text-[10px] font-mono text-emerald-400 block mb-1.5">{proj.tech}</span>
							<h4 class="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mb-2">{proj.title}</h4>
							<p class="text-xs text-neutral-300 leading-relaxed mb-4">{proj.desc}</p>
						</div>
						<span class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors">
							Focus Project <ExternalLink class="w-3.5 h-3.5" />
						</span>
					</button>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Contact Realistic iOS Phone Frame -->
	{#if $activeTab === 'contact'}
		<div class="phone-modal absolute inset-0 z-20 flex items-center justify-center p-6 pointer-events-auto">
			<div class="relative w-full max-w-xs rounded-[48px] border-[8px] border-neutral-800 bg-black p-4 shadow-2xl shadow-black/60 overflow-hidden text-white">
				<div class="w-24 h-4 bg-neutral-900 rounded-full mx-auto mb-5 flex items-center justify-center">
					<div class="w-2.5 h-2.5 rounded-full bg-black border border-neutral-800"></div>
				</div>
				<div class="text-center mb-5">
					<h3 class="text-xl font-extrabold text-white mb-0.5">Get In Touch</h3>
					<p class="text-[10px] text-neutral-400">Available for innovative web architecture roles.</p>
				</div>
				<div class="grid grid-cols-2 gap-3 mb-5">
					<a
						href="mailto:hello@example.com"
						onmouseenter={() => playSound('click')}
						onclick={() => playSound('click')}
						class="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col items-center hover:scale-105 hover:bg-neutral-800 hover:border-sky-400/50 transition-all cursor-pointer"
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
						class="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col items-center hover:scale-105 hover:bg-neutral-800 hover:border-purple-400/50 transition-all cursor-pointer"
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
						class="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col items-center hover:scale-105 hover:bg-neutral-800 hover:border-blue-400/50 transition-all cursor-pointer"
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
						class="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col items-center hover:scale-105 hover:bg-neutral-800 hover:border-sky-300/50 transition-all cursor-pointer"
					>
						<svg class="w-5 h-5 text-sky-300 mb-1.5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
						<span class="text-xs font-medium">X / Twitter</span>
					</a>
				</div>
				<div class="w-28 h-1 bg-neutral-600 rounded-full mx-auto"></div>
			</div>
		</div>
	{/if}

	<!-- LAYER 4 (Z-index 30): Overlays & Stage Content Cards -->
	<!-- Home Dual-Column Glass Framing -->
	{#if $activeTab === 'home'}
		<div class="card-overlay absolute inset-0 z-30 pointer-events-auto hidden sm:block">
			<!-- Left Column Card -->
			<div class="backdrop-blur-2xl bg-white/80 border border-white/60 shadow-2xl rounded-3xl p-6 text-neutral-900 absolute left-12 top-1/2 -translate-y-1/2 w-80">
				<span class="inline-block px-3 py-1 rounded-full bg-sky-500/10 text-sky-700 text-xs font-mono font-semibold uppercase tracking-wider mb-2">STAGE 01</span>
				<h1 class="text-2xl font-black text-neutral-900 mb-1">PARTH KAUSHAL</h1>
				<p class="text-xs font-bold text-sky-700 mb-3">Senior Systems Architect</p>
				<div class="flex items-center gap-2 p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-semibold">
					<span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0"></span> Available for Architecture Roles
				</div>
			</div>

			<!-- Right Column Card -->
			<div class="backdrop-blur-2xl bg-white/80 border border-white/60 shadow-2xl rounded-3xl p-6 text-neutral-900 absolute right-12 top-1/2 -translate-y-1/2 w-80">
				<h3 class="text-sm font-bold uppercase tracking-wider text-neutral-600 mb-2">Executive Summary</h3>
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

	<!-- STAGE 4: Printed Paper Technical Spec Sheet -->
	{#if $activeTab === 'skills'}
		<div class="card-overlay absolute inset-0 z-30 flex items-center justify-center p-6 pointer-events-auto">
			<div class="font-sans text-neutral-900 tracking-tight bg-slate-50/95 shadow-2xl rounded-sm p-8 max-w-2xl w-full mx-auto rotate-[-1deg] border border-neutral-300/60">
				<div class="flex items-center justify-between pb-3 border-b border-neutral-300 mb-4">
					<div>
						<h2 class="text-xl font-mono font-bold text-neutral-900 uppercase">STUDIO SPECIFICATION SHEET</h2>
						<p class="text-[11px] text-neutral-600 font-mono">PARTH KAUSHAL // PRINTED ARCHITECTURAL MANIFEST</p>
					</div>
					<span class="px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-mono text-[10px] font-bold">REV 2026</span>
				</div>
				<div class="space-y-4">
					{#each skills as skillGroup}
						<div>
							<h4 class="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 mb-1.5">{skillGroup.category}</h4>
							<div class="flex flex-wrap gap-1.5">
								{#each skillGroup.items as item}
									<span class="px-2.5 py-1 rounded bg-neutral-900 text-white font-mono text-xs font-medium">{item}</span>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}

	<!-- STAGE 4: Printed Resume Paper Sheet -->
	{#if $activeTab === 'resume'}
		<div class="card-overlay absolute inset-0 z-30 flex items-center justify-center p-6 pointer-events-auto">
			<div class="font-sans text-neutral-900 tracking-tight bg-white/95 shadow-2xl rounded-sm p-8 max-w-2xl w-full mx-auto relative rotate-[1deg] border border-neutral-300/60">
				<div class="flex justify-between items-start pb-4 border-b border-neutral-300 mb-4">
					<div>
						<h2 class="text-2xl font-black text-neutral-900">Parth Kaushal</h2>
						<p class="text-xs font-mono text-sky-700 font-bold">Senior Systems Architect & Creative Developer</p>
					</div>
					<a
						href="/resume.pdf"
						download
						onclick={() => playSound('click')}
						class="px-3.5 py-1.5 rounded bg-sky-600 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-sky-700 transition-colors shadow-xs"
					>
						<Download class="w-3.5 h-3.5" /> Download PDF
					</a>
				</div>
				<div class="space-y-3 text-xs text-neutral-700 leading-relaxed">
					<div class="p-3 rounded bg-slate-50 border border-neutral-200">
						<h4 class="font-bold text-neutral-900 text-xs mb-0.5">Executive Summary</h4>
						<p class="text-[11px]">5+ years of experience leading interactive web frontend architectures, high-performance canvas rendering, and spatial UI engines.</p>
					</div>
					<div class="p-3 rounded bg-slate-50 border border-neutral-200">
						<h4 class="font-bold text-neutral-900 text-xs mb-0.5">Core Competencies</h4>
						<p class="text-[11px]">SvelteKit, GSAP 3D Timelines, WebM Transparent Video Pipelines, TypeScript, Tailwind CSS, Performance Tuning.</p>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- STAGE 5: Achievements Moving Belt Carousel -->
	{#if $activeTab === 'achievements'}
		<div class="card-overlay absolute inset-0 z-30 flex items-center justify-center p-6 pointer-events-auto">
			<div class="relative w-full max-w-4xl">
				<!-- Frosted Glass Manual Arrow Controls -->
				<button
					type="button"
					onclick={() => scrollCarousel('left')}
					class="absolute -left-5 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full backdrop-blur-2xl bg-white/80 border border-white/60 text-neutral-900 shadow-2xl hover:bg-white transition-all cursor-pointer"
					aria-label="Scroll Carousel Left"
				>
					<ChevronLeft class="w-6 h-6" />
				</button>
				<button
					type="button"
					onclick={() => scrollCarousel('right')}
					class="absolute -right-5 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full backdrop-blur-2xl bg-white/80 border border-white/60 text-neutral-900 shadow-2xl hover:bg-white transition-all cursor-pointer"
					aria-label="Scroll Carousel Right"
				>
					<ChevronRight class="w-6 h-6" />
				</button>

				<!-- Horizontal Scrolling Belt -->
				<div bind:this={carouselRef} class="flex gap-8 overflow-x-auto snap-x scrollbar-none p-4">
					{#each awards as award}
						<button
							type="button"
							onmouseenter={() => playSound('click')}
							onclick={() => { playSound('click'); activeAwardModal = award; }}
							class="snap-center shrink-0 w-72 text-left p-6 rounded-3xl backdrop-blur-2xl bg-white/85 border border-white/60 shadow-2xl hover:border-amber-400/80 hover:bg-white transition-all duration-300 cursor-pointer"
						>
							<Award class="w-8 h-8 text-amber-500 mb-3" />
							<h4 class="text-base font-extrabold text-neutral-900 mb-1">{award.title}</h4>
							<p class="text-xs text-neutral-600 mb-2">{award.org}</p>
							<span class="inline-block font-mono text-[10px] font-bold text-amber-700 px-2.5 py-0.5 rounded-full bg-amber-500/15">{award.year}</span>
						</button>
					{/each}
				</div>
			</div>
		</div>
	{/if}

	<!-- LAYER 5 (Z-index 40): 3D Pop-Forward Focus Modals -->
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
