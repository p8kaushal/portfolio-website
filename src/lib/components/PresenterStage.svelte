<script lang="ts">
	import { onMount } from 'svelte';
	import { activeTab } from '$lib/stores/navStore';
	import { animateCamera } from '$lib/animations/cameraChoreography';
	import { playSound } from '$lib/utils/soundEngine';
	import { Mail, ExternalLink, Download, Award, CheckCircle, Monitor, Tv, Layers, X } from 'lucide-svelte';

	let stageContainer: HTMLElement;
	let currentVideoSrc = $state('/presenter-home.webm');
	let activeProjectModal = $state<any | null>(null);
	let activeAwardModal = $state<any | null>(null);

	$effect(() => {
		const tab = $activeTab;
		if (tab === 'home') {
			currentVideoSrc = '/presenter-home.webm';
		} else if (tab === 'about') {
			currentVideoSrc = '/presenter-about.webm';
		}

		// Reset modals on tab switch
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
		{ year: '2024 - Present', role: 'Staff Frontend Architect', company: 'Apple Keynote Inc.', desc: 'Designing next-gen WebGL and CSS 3D interactive experiences.' },
		{ year: '2022 - 2024', role: 'Senior Interactive Developer', company: 'Creative Web Labs', desc: 'Pioneered GSAP camera choreography engines for virtual events.' },
		{ year: '2020 - 2022', role: 'Full Stack Engineer', company: 'TechVision Studio', desc: 'Built real-time web dashboards and SvelteKit applications.' }
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
		{ title: 'Apple Design Award Nominee', year: '2024', org: 'WWDC Developer Showcase', details: 'Nominated for Apple Keynote-inspired human-scale portfolio interface.' }
	];
</script>

<div bind:this={stageContainer} class="relative w-full h-full overflow-hidden bg-neutral-950 select-none">
	<!-- LAYER 1 (Z-index 0): Studio Backdrop -->
	<div class="absolute inset-0 z-0 overflow-hidden">
		<img
			src="/bg-office-center.jpg"
			alt="Keynote Studio Stage Backdrop"
			class="studio-backdrop absolute inset-0 w-full h-full object-cover origin-center brightness-95 contrast-105 transition-all duration-700 ease-out"
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
				class="absolute bottom-0 h-[80vh] w-auto object-contain transition-all duration-500 {$activeTab === 'home' ? 'left-1/2 -translate-x-1/2' : 'left-[10%]'}"
				style="filter: drop-shadow(0 20px 30px rgba(0,0,0,0.3)) brightness(0.98) contrast(1.02);"
			></video>
		</div>
	{/if}

	<!-- LAYER 3 (Z-index 20): Interactive Studio Stations -->
	<!-- Experience Station: Centered 4K Studio Wall TV Monitor -->
	{#if $activeTab === 'experience'}
		<div class="experience-station absolute inset-0 z-20 flex items-center justify-center p-6 pointer-events-auto">
			<div class="relative w-full max-w-4xl rounded-3xl bg-neutral-950/90 border-4 border-neutral-700/80 shadow-2xl p-6 sm:p-8 overflow-hidden backdrop-blur-2xl text-white">
				<div class="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10 pointer-events-none"></div>
				<div class="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
					<div class="flex items-center gap-3">
						<Tv class="w-6 h-6 text-sky-400 shrink-0" />
						<span class="text-sm font-mono font-bold tracking-widest text-sky-400 uppercase">
							4K HDR STUDIO WALL DISPLAY
						</span>
					</div>
					<div class="flex items-center gap-2">
						<span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
						<span class="text-xs font-mono text-neutral-400">ONLINE // 60 FPS</span>
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
					{#each experiences as exp}
						<div class="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-sky-400/50 transition-all duration-300">
							<span class="inline-block px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 font-mono text-xs mb-3">{exp.year}</span>
							<h4 class="text-base font-bold text-white mb-1">{exp.role}</h4>
							<p class="text-xs font-semibold text-neutral-400 mb-2">{exp.company}</p>
							<p class="text-xs text-neutral-300 leading-relaxed">{exp.desc}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}

	<!-- Projects Station: Centered 32-inch Studio Monitor Desktop Viewport -->
	{#if $activeTab === 'projects'}
		<div class="projects-station absolute inset-0 z-20 flex items-center justify-center p-6 pointer-events-auto">
			<div class="relative w-full max-w-4xl rounded-3xl bg-neutral-950/95 border-4 border-neutral-800 shadow-2xl p-6 sm:p-8 backdrop-blur-2xl text-white">
				<div class="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
					<div class="flex items-center gap-3">
						<Monitor class="w-6 h-6 text-emerald-400 shrink-0" />
						<span class="text-sm font-mono font-bold tracking-widest text-emerald-400 uppercase">
							32-INCH STUDIO DESKTOP DISPLAY // PROJECT SHELF
						</span>
					</div>
					<span class="text-xs font-mono text-neutral-400">RETINA 6K</span>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-5">
					{#each projects as proj}
						<button
							type="button"
							onmouseenter={() => playSound('click')}
							onclick={() => { playSound('click'); activeProjectModal = proj; }}
							class="group text-left p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-emerald-400/60 hover:bg-neutral-800/80 transition-all duration-300 flex flex-col justify-between cursor-pointer"
						>
							<div>
								<span class="text-xs font-mono text-emerald-400 block mb-1.5">{proj.tech}</span>
								<h4 class="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors mb-2">{proj.title}</h4>
								<p class="text-xs text-neutral-300 leading-relaxed mb-4">{proj.desc}</p>
							</div>
							<span class="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors">
								Focus Project <ExternalLink class="w-3.5 h-3.5" />
							</span>
						</button>
					{/each}
				</div>
			</div>
		</div>
	{/if}

	<!-- Contact Phone Station: iOS Smartphone Vector Frame -->
	{#if $activeTab === 'contact'}
		<div class="phone-modal absolute inset-0 z-20 flex items-center justify-center p-6 pointer-events-auto">
			<div class="relative w-full max-w-md rounded-[48px] bg-neutral-950 border-[8px] border-neutral-800 p-6 shadow-2xl text-white">
				<div class="w-28 h-5 bg-neutral-900 rounded-full mx-auto mb-6 flex items-center justify-center">
					<div class="w-3 h-3 rounded-full bg-neutral-950 border border-neutral-800"></div>
				</div>
				<div class="text-center mb-6">
					<h3 class="text-2xl font-black text-white mb-1">Get In Touch</h3>
					<p class="text-xs text-neutral-400">Available for innovative web architecture roles.</p>
				</div>
				<div class="grid grid-cols-2 gap-3.5 mb-6">
					<a
						href="mailto:hello@example.com"
						onclick={() => playSound('click')}
						class="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col items-center hover:bg-neutral-800 hover:border-sky-400/50 transition-all"
					>
						<Mail class="w-6 h-6 text-sky-400 mb-2 shrink-0" />
						<span class="text-xs font-semibold">Email</span>
					</a>
					<a
						href="https://github.com"
						target="_blank"
						rel="noreferrer"
						onclick={() => playSound('click')}
						class="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col items-center hover:bg-neutral-800 hover:border-purple-400/50 transition-all"
					>
						<svg class="w-6 h-6 text-purple-400 mb-2 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
						<span class="text-xs font-semibold">GitHub</span>
					</a>
					<a
						href="https://linkedin.com"
						target="_blank"
						rel="noreferrer"
						onclick={() => playSound('click')}
						class="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col items-center hover:bg-neutral-800 hover:border-blue-400/50 transition-all"
					>
						<svg class="w-6 h-6 text-blue-400 mb-2 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
						<span class="text-xs font-semibold">LinkedIn</span>
					</a>
					<a
						href="https://x.com"
						target="_blank"
						rel="noreferrer"
						onclick={() => playSound('click')}
						class="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col items-center hover:bg-neutral-800 hover:border-sky-300/50 transition-all"
					>
						<svg class="w-6 h-6 text-sky-300 mb-2 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
						<span class="text-xs font-semibold">X / Twitter</span>
					</a>
				</div>
				<div class="w-32 h-1 bg-neutral-600 rounded-full mx-auto mt-2"></div>
			</div>
		</div>
	{/if}

	<!-- LAYER 4 (Z-index 30): Apple Light-Mode Frosted Glass Card Overlays -->
	<div class="card-overlay absolute inset-0 z-30 flex items-center justify-center p-6 pointer-events-auto">
		{#if $activeTab === 'home'}
			<div class="backdrop-blur-2xl bg-white/85 border border-white/60 shadow-2xl rounded-3xl p-8 text-neutral-900 max-w-xl text-center absolute right-[8%] top-[20%]">
				<span class="inline-block px-3.5 py-1 rounded-full bg-sky-500/10 text-sky-700 text-xs font-semibold uppercase tracking-wider mb-3">Keynote Event</span>
				<h1 class="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 mb-2">Interactive Portfolio</h1>
				<p class="text-sm sm:text-base text-neutral-700 leading-relaxed mb-4">
					Welcome to the studio stage. Explore interactive stations showcasing web architecture, GSAP camera choreography, and transparent presenter keying.
				</p>
			</div>
		{:else if $activeTab === 'about'}
			<div class="backdrop-blur-2xl bg-white/85 border border-white/60 shadow-2xl rounded-3xl p-8 text-neutral-900 max-w-xl absolute right-[8%] top-[20%]">
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
		{:else if $activeTab === 'skills'}
			<!-- Studio Specification Sheet -->
			<div class="backdrop-blur-2xl bg-white/85 border border-white/60 shadow-2xl rounded-3xl p-8 text-neutral-900 max-w-3xl w-full mx-auto">
				<div class="flex items-center gap-3 pb-4 border-b border-neutral-200 mb-6">
					<Layers class="w-6 h-6 text-sky-600 shrink-0" />
					<div>
						<h2 class="text-2xl font-extrabold text-neutral-900 leading-tight">Studio Specification Sheet</h2>
						<p class="text-xs text-neutral-600">Core technical stack and architectural capabilities</p>
					</div>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
					{#each skills as skillGroup}
						<div class="p-4 rounded-2xl bg-white/60 border border-neutral-200">
							<h4 class="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">{skillGroup.category}</h4>
							<div class="flex flex-wrap gap-2">
								{#each skillGroup.items as item}
									<span class="px-3 py-1 rounded-xl bg-neutral-900 text-white text-xs font-medium shadow-xs">{item}</span>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		{:else if $activeTab === 'resume'}
			<!-- Printable Document Sheet -->
			<div class="backdrop-blur-2xl bg-white/90 border border-white/80 shadow-2xl rounded-3xl p-8 text-neutral-900 max-w-3xl w-full mx-auto relative">
				<div class="flex justify-between items-start pb-4 border-b border-neutral-200 mb-6">
					<div>
						<h2 class="text-3xl font-black text-neutral-900">Parth Kaushal</h2>
						<p class="text-sm font-semibold text-sky-700">Senior Systems Architect & Creative Developer</p>
					</div>
					<a
						href="/resume.pdf"
						download
						onclick={() => playSound('click')}
						class="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold flex items-center gap-2 hover:bg-sky-700 transition-colors shadow-md"
					>
						<Download class="w-4 h-4 shrink-0" /> Download PDF
					</a>
				</div>
				<div class="space-y-4 text-xs text-neutral-700 leading-relaxed">
					<div class="p-4 rounded-2xl bg-white/60 border border-neutral-200">
						<h4 class="font-bold text-neutral-900 text-sm mb-1">Executive Summary</h4>
						<p>5+ years of experience leading interactive web frontend architectures, high-performance canvas rendering, and spatial UI engines.</p>
					</div>
					<div class="p-4 rounded-2xl bg-white/60 border border-neutral-200">
						<h4 class="font-bold text-neutral-900 text-sm mb-1">Core Competencies</h4>
						<p>SvelteKit, GSAP 3D Timelines, WebM Transparent Video Pipelines, TypeScript, Tailwind CSS, Performance Optimization.</p>
					</div>
				</div>
			</div>
		{:else if $activeTab === 'achievements'}
			<!-- Studio Wall of Honor -->
			<div class="backdrop-blur-2xl bg-white/85 border border-white/60 shadow-2xl rounded-3xl p-8 text-neutral-900 max-w-3xl w-full mx-auto">
				<div class="flex items-center gap-3 pb-4 border-b border-neutral-200 mb-6">
					<Award class="w-7 h-7 text-amber-500 shrink-0" />
					<div>
						<h2 class="text-2xl font-extrabold text-neutral-900 leading-tight">Studio Wall of Honor</h2>
						<p class="text-xs text-neutral-600">Framed certificates and industry recognition</p>
					</div>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
					{#each awards as award}
						<button
							type="button"
							onmouseenter={() => playSound('click')}
							onclick={() => { playSound('click'); activeAwardModal = award; }}
							class="text-left p-5 rounded-2xl bg-white/70 border border-neutral-200 hover:border-amber-400/60 hover:bg-white/90 transition-all duration-300 shadow-sm cursor-pointer"
						>
							<CheckCircle class="w-6 h-6 text-amber-500 mb-2" />
							<h4 class="text-sm font-extrabold text-neutral-900 mb-1">{award.title}</h4>
							<p class="text-xs text-neutral-600">{award.org}</p>
							<span class="inline-block mt-2 font-mono text-[10px] font-bold text-amber-700 px-2 py-0.5 rounded-full bg-amber-500/15">{award.year}</span>
						</button>
					{/each}
				</div>
			</div>
		{/if}
	</div>

	<!-- LAYER 5 (Z-index 40): 3D Pop-Forward Focus Modals -->
	{#if activeProjectModal}
		<div class="fixed inset-0 z-40 bg-neutral-950/80 backdrop-blur-xl flex items-center justify-center p-6 pointer-events-auto">
			<div class="relative w-full max-w-xl rounded-3xl bg-neutral-900 border-2 border-emerald-400/60 shadow-2xl p-8 text-white">
				<button
					type="button"
					onclick={() => { playSound('click'); activeProjectModal = null; }}
					class="absolute top-4 right-4 p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
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
					class="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
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
