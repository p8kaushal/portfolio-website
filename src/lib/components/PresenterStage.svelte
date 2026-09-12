<script lang="ts">
	import { onMount } from 'svelte';
	import { activeTab } from '$lib/stores/navStore';
	import { animateCamera } from '$lib/animations/cameraChoreography';
	import { playSound } from '$lib/utils/soundEngine';
	import { Briefcase, GraduationCap, Mail, ExternalLink, Download, Award, CheckCircle } from 'lucide-svelte';

	let stageContainer: HTMLElement;
	let currentVideoSrc = $state('/presenter-home.webm');

	$effect(() => {
		const tab = $activeTab;
		if (tab === 'home') {
			currentVideoSrc = '/presenter-home.webm';
		} else if (tab === 'about' || tab === 'experience') {
			currentVideoSrc = '/presenter-about.webm';
		} else if (tab === 'contact' || tab === 'resume') {
			currentVideoSrc = '/presenter-contact.webm';
		}

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
		{ title: 'Keynote Studio 3D', tech: 'SvelteKit • GSAP • Tailwind', desc: 'Cinematic Apple Keynote virtual stage portfolio engine.', link: 'https://github.com' },
		{ title: 'Spatial UI Kit', tech: 'TypeScript • Canvas • WebGL', desc: 'High-performance interactive vector device frames.', link: 'https://github.com' },
		{ title: 'AI Presenter Keyer', tech: 'WebM • HTML5 • FFmpeg', desc: 'Transparent video keying pipeline for real-time web avatars.', link: 'https://github.com' }
	];

	const skills = [
		{ category: 'Frontend', items: ['Svelte / SvelteKit', 'TypeScript', 'Tailwind CSS', 'GSAP Animation', 'HTML5 Canvas'] },
		{ category: 'Architecture', items: ['Performance Tuning', 'Spatial UI Design', 'State Management', 'WebM Transparent Video'] },
		{ category: 'Tools', items: ['Git & GitHub', 'Vite / Rollback', 'Figma Prototyping', 'Vercel CDN'] }
	];

	const awards = [
		{ title: 'Awwwards Site of the Day', year: '2025', org: 'Awwwards International' },
		{ title: 'FWA of the Month', year: '2024', org: 'Favorite Website Awards' },
		{ title: 'Apple Design Award Nominee', year: '2024', org: 'WWDC Developer Showcase' }
	];
</script>

<div bind:this={stageContainer} class="relative w-full h-full overflow-hidden bg-neutral-950 select-none">
	<!-- LAYER 1 (Z-index 0): Studio Backdrop -->
	<div class="absolute inset-0 z-0 overflow-hidden">
		<img
			src="/bg-office.jpg"
			alt="Keynote Studio Stage Backdrop"
			class="studio-backdrop absolute inset-0 w-full h-full object-cover origin-center brightness-95 contrast-105 transition-transform duration-700 ease-out"
		/>
	</div>

	<!-- LAYER 2 (Z-index 10): Harmonized Presenter Video -->
	<div class="presenter-layer absolute inset-0 z-10 flex items-center justify-center pointer-events-none transition-transform duration-700 ease-out">
		<div class="relative w-full h-full flex items-end justify-center">
			<video
				src={currentVideoSrc}
				autoplay
				loop
				muted
				playsinline
				class="absolute bottom-0 left-[15%] h-[85vh] w-auto object-contain transition-all duration-500"
				style="filter: drop-shadow(0 20px 30px rgba(0,0,0,0.3)) brightness(0.98) contrast(1.02);"
			></video>
		</div>
	</div>

	<!-- LAYER 3 (Z-index 20): CSS/SVG Vector Device Frames -->
	<!-- Experience TV Wall Frame -->
	<div class="tv-station absolute top-[15%] left-[8%] z-20 w-[420px] sm:w-[540px] opacity-0 pointer-events-auto transition-all duration-500">
		<div class="relative rounded-2xl bg-neutral-900/90 border-4 border-neutral-700/80 shadow-2xl p-4 overflow-hidden backdrop-blur-xl">
			<!-- TV Glass reflection sheen -->
			<div class="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
			<div class="flex items-center justify-between pb-2 border-b border-neutral-700/60 mb-3">
				<span class="text-xs font-mono text-sky-400 uppercase tracking-widest flex items-center gap-1.5">
					<span class="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span> Experience Display Monitor
				</span>
				<span class="text-[10px] text-neutral-400">4K HDR</span>
			</div>
			<div class="space-y-3">
				{#each experiences as exp}
					<div class="p-3 rounded-xl bg-neutral-800/80 border border-neutral-700/50 hover:border-sky-500/50 transition-colors">
						<div class="flex justify-between items-start">
							<h4 class="text-sm font-semibold text-white">{exp.role}</h4>
							<span class="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-mono">{exp.year}</span>
						</div>
						<p class="text-xs text-neutral-400 font-medium">{exp.company}</p>
						<p class="text-[11px] text-neutral-300 mt-1">{exp.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Projects Laptop Station -->
	<div class="laptop-station absolute bottom-[18%] right-[10%] z-20 w-[460px] sm:w-[580px] opacity-0 pointer-events-auto transition-all duration-500">
		<div style="perspective: 1000px;">
			<!-- Laptop Lid Screen -->
			<div class="laptop-lid rounded-t-2xl bg-neutral-900 border-2 border-neutral-700/80 p-4 shadow-2xl origin-bottom transition-transform duration-700" style="transform-style: preserve-3d;">
				<div class="flex items-center justify-between pb-2 border-b border-neutral-800 mb-3">
					<span class="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
						<span class="w-2 h-2 rounded-full bg-emerald-400"></span> Projects Demo Viewport
					</span>
					<span class="text-[10px] text-neutral-400">MacBook Pro 16"</span>
				</div>
				<div class="grid grid-cols-1 gap-2.5">
					{#each projects as proj}
						<div class="p-3 rounded-xl bg-neutral-800/90 border border-neutral-700/60 hover:border-emerald-400/50 transition-colors flex justify-between items-center">
							<div>
								<h4 class="text-xs font-bold text-white">{proj.title}</h4>
								<p class="text-[10px] text-emerald-300 font-mono">{proj.tech}</p>
								<p class="text-[11px] text-neutral-300 mt-0.5">{proj.desc}</p>
							</div>
							<a href={proj.link} target="_blank" rel="noreferrer" class="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors">
								<ExternalLink class="w-3.5 h-3.5" />
							</a>
						</div>
					{/each}
				</div>
			</div>
			<!-- Laptop Base Frame -->
			<div class="h-4 bg-gradient-to-r from-neutral-300 via-neutral-200 to-neutral-400 rounded-b-xl border-t border-neutral-400 shadow-md flex justify-center items-center">
				<div class="w-16 h-1 bg-neutral-500 rounded-full"></div>
			</div>
		</div>
	</div>

	<!-- Contact Phone Station -->
	<div class="phone-modal absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[320px] sm:w-[360px] translate-y-[120%] opacity-0 pointer-events-auto transition-all duration-700">
		<div class="rounded-[40px] bg-neutral-950 border-[6px] border-neutral-800 p-5 shadow-2xl text-white">
			<!-- Phone Notch / Dynamic Island -->
			<div class="w-24 h-4 bg-neutral-900 rounded-full mx-auto mb-4 flex items-center justify-center">
				<div class="w-2.5 h-2.5 rounded-full bg-neutral-950 border border-neutral-800"></div>
			</div>
			<div class="text-center mb-4">
				<h3 class="text-lg font-bold text-white">Get In Touch</h3>
				<p class="text-xs text-neutral-400">Available for innovative web architecture roles.</p>
			</div>
			<div class="grid grid-cols-2 gap-3 mb-4">
				<a href="mailto:hello@example.com" onclick={() => playSound('click')} class="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col items-center hover:bg-neutral-800 transition-colors">
					<Mail class="w-5 h-5 text-sky-400 mb-1" />
					<span class="text-xs font-medium">Email</span>
				</a>
				<a href="https://github.com" target="_blank" rel="noreferrer" onclick={() => playSound('click')} class="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col items-center hover:bg-neutral-800 transition-colors">
					<svg class="w-5 h-5 text-purple-400 mb-1 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
					<span class="text-xs font-medium">GitHub</span>
				</a>
				<a href="https://linkedin.com" target="_blank" rel="noreferrer" onclick={() => playSound('click')} class="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col items-center hover:bg-neutral-800 transition-colors">
					<svg class="w-5 h-5 text-blue-400 mb-1 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
					<span class="text-xs font-medium">LinkedIn</span>
				</a>
				<a href="https://x.com" target="_blank" rel="noreferrer" onclick={() => playSound('click')} class="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col items-center hover:bg-neutral-800 transition-colors">
					<svg class="w-5 h-5 text-sky-300 mb-1 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
					<span class="text-xs font-medium">X / Twitter</span>
				</a>
			</div>
			<!-- Phone Home Bar -->
			<div class="w-28 h-1 bg-neutral-600 rounded-full mx-auto mt-2"></div>
		</div>
	</div>

	<!-- LAYER 4 (Z-index 30): High-Contrast Apple Light-Mode Frosted Glass Card Overlays -->
	<div class="card-overlay absolute top-[18%] right-[6%] z-30 max-w-xl pointer-events-auto transition-all duration-500">
		{#if $activeTab === 'home'}
			<div class="backdrop-blur-2xl bg-white/85 border border-white/60 shadow-2xl rounded-3xl p-8 text-neutral-900">
				<span class="inline-block px-3.5 py-1 rounded-full bg-sky-500/10 text-sky-700 text-xs font-semibold uppercase tracking-wider mb-3">Keynote Event</span>
				<h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 mb-2">Interactive Portfolio</h1>
				<p class="text-sm sm:text-base text-neutral-700 leading-relaxed mb-4">
					Welcome to the studio stage. Explore interactive stations showcasing web architecture, GSAP camera choreography, and transparent presenter keying.
				</p>
			</div>
		{:else if $activeTab === 'about'}
			<div class="backdrop-blur-2xl bg-white/85 border border-white/60 shadow-2xl rounded-3xl p-8 text-neutral-900">
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
			<div class="backdrop-blur-2xl bg-white/85 border border-white/60 shadow-2xl rounded-3xl p-8 text-neutral-900 w-[440px]">
				<h2 class="text-2xl font-bold text-neutral-900 mb-3">Technical Skills</h2>
				<div class="space-y-4">
					{#each skills as skillGroup}
						<div>
							<h4 class="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">{skillGroup.category}</h4>
							<div class="flex flex-wrap gap-1.5">
								{#each skillGroup.items as item}
									<span class="px-2.5 py-1 rounded-lg bg-neutral-900 text-white text-xs font-medium shadow-xs">{item}</span>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		{:else if $activeTab === 'resume'}
			<div class="backdrop-blur-2xl bg-white/85 border border-white/60 shadow-2xl rounded-3xl p-8 text-neutral-900 w-[440px]">
				<div class="flex justify-between items-center mb-3">
					<h2 class="text-2xl font-bold text-neutral-900">Curriculum Vitae</h2>
					<a href="/resume.pdf" download class="px-3.5 py-1.5 rounded-xl bg-sky-600 text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-sky-700 transition-colors">
						<Download class="w-4 h-4 shrink-0" /> PDF
					</a>
				</div>
				<div class="p-4 rounded-2xl bg-white/70 border border-neutral-200/80 text-xs text-neutral-700 leading-relaxed space-y-2">
					<p class="font-semibold text-neutral-900">Senior Frontend Architect</p>
					<p>Specialized in spatial UI design systems, SvelteKit, TypeScript, GSAP animation pipelines, and fast web applications.</p>
				</div>
			</div>
		{:else if $activeTab === 'achievements'}
			<div class="backdrop-blur-2xl bg-white/85 border border-white/60 shadow-2xl rounded-3xl p-8 text-neutral-900 w-[440px]">
				<h2 class="text-2xl font-bold text-neutral-900 mb-3 flex items-center gap-2">
					<Award class="w-6 h-6 text-amber-500 shrink-0" /> Honors & Awards
				</h2>
				<div class="space-y-2.5">
					{#each awards as award}
						<div class="p-3 rounded-2xl bg-white/70 border border-neutral-200/80 flex items-start gap-3">
							<CheckCircle class="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
							<div>
								<h4 class="text-xs font-bold text-neutral-900">{award.title}</h4>
								<p class="text-[10px] text-neutral-600">{award.org} • {award.year}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
