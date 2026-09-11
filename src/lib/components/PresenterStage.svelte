<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import {
		activeTab,
		isMuted,
		setActiveTab,
		type Tab
	} from '$lib/stores/navStore';
	import {
		Sparkles,
		ExternalLink,
		Download,
		ChevronRight,
		Briefcase,
		Code2,
		Award,
		FileText,
		User,
		Mail,
		Terminal,
		GraduationCap,
		Copy,
		Check,
		Tv,
		Laptop,
		Smartphone,
		Printer,
		Send,
		Layers,
		CheckCircle2
	} from 'lucide-svelte';

	let {
		currentTab,
		interactive = true,
		showDebug = false
	}: {
		currentTab?: Tab;
		interactive?: boolean;
		showDebug?: boolean;
	} = $props();

	// Active tab derived: prop override if provided, otherwise navStore subscription
	const tabValue = $derived(currentTab ?? $activeTab);

	// Derived flag for Desk Demo Station (Projects & Skills tabs)
	const isDemoOpen = $derived(tabValue === 'projects' || tabValue === 'skills');

	// ==========================================
	// 1. Mouse Follow Parallax Physics
	// ==========================================
	let targetX = 0;
	let targetY = 0;
	let smoothX = $state(0);
	let smoothY = $state(0);
	let parallaxAnimId: number;

	function handleMouseMove(e: MouseEvent) {
		if (typeof window === 'undefined') return;
		const { innerWidth, innerHeight } = window;
		// Normalized -1.0 to 1.0 coordinates
		targetX = (e.clientX / innerWidth - 0.5) * 2;
		targetY = (e.clientY / innerHeight - 0.5) * 2;
	}

	function updateParallax() {
		// Smooth lerp damping factor
		smoothX += (targetX - smoothX) * 0.06;
		smoothY += (targetY - smoothY) * 0.06;
		parallaxAnimId = requestAnimationFrame(updateParallax);
	}

	// ==========================================
	// 2. Video Player & Fallback Management
	// ==========================================
	let videoElement: HTMLVideoElement | null = $state(null);
	let isVideoPlaying = $state(false);
	let videoError = $state(false);

	function handleVideoError() {
		videoError = true;
		isVideoPlaying = false;
	}

	function handleVideoPlaying() {
		isVideoPlaying = true;
		videoError = false;
	}

	// ==========================================
	// 3. Audio UI Trigger Helper
	// ==========================================
	function playUiSound(sound: 'click' | 'tv-on') {
		if ($isMuted || typeof window === 'undefined') return;
		try {
			const audio = new Audio(`/sounds/${sound}.mp3`);
			audio.volume = 0.35;
			audio.play().catch(() => {});
		} catch {}
	}

	// Watch active tab transitions for TV sound & effects
	$effect(() => {
		if (tabValue === 'experience') {
			playUiSound('tv-on');
		}
	});

	// ==========================================
	// 4. Interactive State for Overlays
	// ==========================================
	// Experience TV selected node
	let selectedExpIndex = $state(0);
	const experienceData = [
		{
			role: 'Lead Creative Technologist',
			company: 'Spatial Studio Lab',
			period: '2023 — Present',
			badge: 'Current Position',
			description:
				'Orchestrated multi-layer canvas composition pipelines, hardware-accelerated spatial presentations, and production Svelte 5 application ecosystems.',
			highlights: [
				'Pioneered 4-layer DOM stacking architecture reducing GPU load by 45%',
				'Maintained sub-16ms 60fps render loops across low-spec and mobile hardware',
				'Led team of 6 engineers building spatial client interfaces for Apple ecosystem'
			],
			technologies: ['Svelte 5', 'TypeScript', 'GSAP 3D', 'Web Audio API', 'Tailwind CSS']
		},
		{
			role: 'Senior Full-Stack Engineer',
			company: 'Vanguard Cloud Tech',
			period: '2021 — 2023',
			badge: 'Enterprise Architecture',
			description:
				'Architected low-latency microservices, real-time WebSocket dashboard meshes, and mission-critical reactive frontend applications serving over 500k active users.',
			highlights: [
				'Built zero-downtime distributed service mesh in Rust & Go with gRPC',
				'Streamlined frontend asset delivery with sub-second page loads across globe',
				'Authored resilient unit and visual regression testing suites with 98% coverage'
			],
			technologies: ['Rust', 'Go', 'Docker', 'WebSockets', 'PostgreSQL', 'Redis']
		},
		{
			role: 'B.S. in Computer Science',
			company: 'University Tech Institute',
			period: '2017 — 2021',
			badge: 'Summa Cum Laude',
			description:
				'Focused on Computer Graphics, Distributed Systems, Algorithm Optimization, and Human-Computer Interaction.',
			highlights: [
				'Published undergraduate thesis on GPU-accelerated canvas shader compositing',
				'President of Creative Computing and Open Source Architecture Club',
				'Top honors in ACM Regional Collegiate Programming Competition'
			],
			technologies: ['C++', 'WebGL', 'Algorithms', 'Linear Algebra', 'Distributed Systems']
		}
	];

	const currentExp = $derived(experienceData[selectedExpIndex] ?? experienceData[0]);

	// Projects Category & Data
	let selectedProjectCategory = $state<'all' | 'spatial' | 'systems'>('all');
	const projectsData = [
		{
			id: 'keynote',
			title: 'Keynote Spatial Portfolio',
			category: 'spatial',
			categoryLabel: 'Spatial 3D',
			subtitle: 'Apple Launch-Inspired 4-Layer Stage',
			description:
				'Cinematic personal portfolio utilizing zero-WebGL DOM layering, real-time video keying, and camera pan choreography.',
			tags: ['Svelte 5', 'Tailwind v4', 'GSAP', 'WebM Alpha'],
			metrics: '60 FPS // 0ms Shift',
			github: 'https://github.com/p8kaushal/portfolio-website',
			demo: '#home'
		},
		{
			id: 'hyperion',
			title: 'Hyperion Cloud Mesh',
			category: 'systems',
			categoryLabel: 'Systems',
			subtitle: 'Zero-Downtime Microservice Orchestrator',
			description:
				'High-throughput distributed service mesh engineered for ultra-low latency inter-process communication.',
			tags: ['Rust', 'gRPC', 'WebSockets', 'Docker'],
			metrics: '99.999% SLA // <2ms Ping',
			github: 'https://github.com/p8kaushal',
			demo: '#projects'
		},
		{
			id: 'aero',
			title: 'Aero 3D Physics Canvas',
			category: 'spatial',
			categoryLabel: 'Spatial 3D',
			subtitle: 'Sub-surface Light & Fluid Simulator',
			description:
				'Interactive real-time fluid dynamics and particle simulation sandbox running directly in the browser.',
			tags: ['WebGL', 'GLSL Shaders', 'Three.js', 'WebGPU'],
			metrics: '100k Particles @ 60fps',
			github: 'https://github.com/p8kaushal',
			demo: '#projects'
		},
		{
			id: 'neural',
			title: 'Neural Pulse Telemetry',
			category: 'systems',
			categoryLabel: 'Systems',
			subtitle: 'Realtime Distributed Telemetry Streamer',
			description:
				'High-frequency time-series monitoring pipeline processing and visualizing millions of metrics per second.',
			tags: ['Go', 'TypeScript', 'ClickHouse', 'Tailwind'],
			metrics: '1.2M Events/sec',
			github: 'https://github.com/p8kaushal',
			demo: '#projects'
		}
	];

	const filteredProjects = $derived(
		selectedProjectCategory === 'all'
			? projectsData
			: projectsData.filter((p) => p.category === selectedProjectCategory)
	);

	// Achievements Gallery Data
	let selectedAchievementIndex = $state(0);
	const achievementsData = [
		{
			title: 'Global Innovation Hackathon Winner',
			organization: 'Spatial Web Foundation',
			year: '2024',
			prize: '1st Place Grand Champion',
			description:
				'Recognized for architecting the most performant, battery-conscious spatial web interface running at 60 FPS without WebGL overhead.',
			stats: 'Top 1 of 850 Teams'
		},
		{
			title: 'Awwwards Site of the Day Candidate',
			organization: 'Awwwards International',
			year: '2025',
			prize: 'Honorable Mention & Dev Honors',
			description:
				'Nominated for exceptional visual composition, innovative 4-layer stage architecture, and microsecond responsiveness.',
			stats: 'Score: 9.42 / 10'
		},
		{
			title: 'AWS Certified Solutions Architect',
			organization: 'Amazon Web Services',
			year: '2023',
			prize: 'Professional Credential',
			description:
				'Validated master-level proficiency in designing fault-tolerant, elastic, and high-availability cloud infrastructure.',
			stats: 'Score: 940 / 1000'
		}
	];

	const currentAch = $derived(achievementsData[selectedAchievementIndex] ?? achievementsData[0]);

	// Contact State
	let copiedEmail = $state(false);
	let contactMessage = $state('');
	let messageSent = $state(false);

	function copyToClipboard(text: string) {
		playUiSound('click');
		if (typeof navigator !== 'undefined') {
			navigator.clipboard.writeText(text);
			copiedEmail = true;
			setTimeout(() => {
				copiedEmail = false;
			}, 2400);
		}
	}

	function handleSendMessage(e: Event) {
		e.preventDefault();
		playUiSound('click');
		if (!contactMessage.trim()) return;
		messageSent = true;
		setTimeout(() => {
			contactMessage = '';
			messageSent = false;
		}, 3000);
	}

	// Lifecycle Mount
	onMount(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('mousemove', handleMouseMove, { passive: true });
			parallaxAnimId = requestAnimationFrame(updateParallax);

			// Start video playback safely
			if (videoElement) {
				videoElement
					.play()
					.then(() => {
						isVideoPlaying = true;
					})
					.catch(() => {
						// Fallback if autoplay is restricted or video format is unsupported
						videoError = true;
					});
			}
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('mousemove', handleMouseMove);
			cancelAnimationFrame(parallaxAnimId);
		}
	});
</script>

<!-- ========================================================================= -->
<!-- 4-LAYER KEYNOTE STAGE COMPOSITION CONTAINER                               -->
<!-- ========================================================================= -->
<section
	id="presenter-stage"
	aria-label="Interactive Presenter Stage"
	class="relative w-full h-screen overflow-hidden select-none bg-neutral-950 font-sans"
>
	<!-- ===================================================================== -->
	<!-- LAYER 1 (Z-INDEX 0): BACKGROUND IMAGE & AMBIENT KEYNOTE LIGHTING      -->
	<!-- ===================================================================== -->
	<div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
		<!-- Main Apple Office Backdrop with Subtle Parallax Tracking -->
		<img
			src="/bg-office.jpg"
			alt="Keynote Studio Office Background"
			class="absolute inset-0 w-full h-full object-cover brightness-95 contrast-105 select-none transition-transform duration-700 ease-out"
			style="transform: scale(1.05) translate({smoothX * -10}px, {smoothY * -8}px);"
		/>

		<!-- Studio Ambient Lighting Vignette & Radial Key-Light -->
		<div
			class="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-neutral-950/40 pointer-events-none"
			aria-hidden="true"
		></div>
		<div
			class="absolute inset-0 pointer-events-none"
			style="background: radial-gradient(circle at 50% 40%, rgba(56, 189, 248, 0.12) 0%, transparent 60%);"
			aria-hidden="true"
		></div>
		<!-- Keynote Floor Shadow Reflection Line -->
		<div
			class="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent pointer-events-none"
			aria-hidden="true"
		></div>
	</div>

	<!-- ===================================================================== -->
	<!-- LAYER 2 (Z-INDEX 10): PRESENTER ELEMENT (VIDEO / FALLBACK IMAGE)       -->
	<!-- ===================================================================== -->
	<div
		class="absolute inset-0 z-10 flex items-end justify-center pointer-events-none overflow-hidden"
		aria-hidden="true"
	>
		<!-- Presenter Staging Container with Spatial Dynamic Repositioning -->
		<div
			class="relative flex items-end justify-center transition-all duration-700 ease-out h-[78vh] max-h-[820px] aspect-[9/16] sm:aspect-auto"
			style="
				transform: translate(
					calc({tabValue === 'about' ? '-22vw' : tabValue === 'experience' ? '20vw' : isDemoOpen ? '-24vw' : tabValue === 'contact' ? '0px' : '0px'} + {smoothX * -26}px),
					calc({smoothY * -14}px)
				) scale({tabValue === 'contact' ? '0.85' : isDemoOpen ? '0.9' : '1.0'});
				opacity: {tabValue === 'contact' ? '0.25' : isDemoOpen ? '0.65' : '1.0'};
				filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.7));
			"
		>
			{#if videoError}
				<!-- Fallback image rendered if video decoding fails or is unsupported -->
				<img
					src="/presenter-photo.png"
					alt="Presenter Standby Fallback"
					class="h-full w-auto object-contain object-bottom pointer-events-none select-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)]"
					style="mask-image: linear-gradient(to bottom, black 85%, transparent 100%); -webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%);"
				/>
			{:else}
				<!-- Primary HTML5 Transparent Video Loop -->
				<video
					bind:this={videoElement}
					src="/presenter-home.webm"
					autoplay
					loop
					muted
					playsinline
					preload="auto"
					class="h-full w-auto object-contain object-bottom pointer-events-none select-none transition-opacity duration-500 {isVideoPlaying
						? 'opacity-100'
						: 'opacity-0'}"
					style="mask-image: linear-gradient(to bottom, black 88%, transparent 100%); -webkit-mask-image: linear-gradient(to bottom, black 88%, transparent 100%);"
					onplaying={handleVideoPlaying}
					onerror={handleVideoError}
				>
					<source src="/presenter-home.webm" type="video/webm" onerror={handleVideoError} />
					<!-- Native HTML5 fallback image if video is unsupported by user agent -->
					<img
						src="/presenter-photo.png"
						alt="Presenter Standby Fallback"
						class="h-full w-auto object-contain object-bottom pointer-events-none select-none"
					/>
				</video>

				<!-- Standby placeholder image shown until video buffers and begins playback -->
				{#if !isVideoPlaying}
					<img
						src="/presenter-photo.png"
						alt="Presenter Initializing"
						class="absolute inset-0 h-full w-auto object-contain object-bottom pointer-events-none select-none"
						style="mask-image: linear-gradient(to bottom, black 85%, transparent 100%); -webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%);"
					/>
				{/if}
			{/if}

			<!-- Subtle Presenter Floor Anchor Glow -->
			<div
				class="absolute -bottom-4 left-1/2 -translate-x-1/2 w-72 h-8 rounded-full bg-sky-500/10 blur-xl pointer-events-none"
			></div>
		</div>
	</div>

	<!-- ===================================================================== -->
	<!-- LAYER 3 (Z-INDEX 20/30/40): OBJECT CUTOUT CONTAINERS                  -->
	<!-- 1. Studio TV Frame (Experience Tab)                                    -->
	<!-- 2. Desk Demo Station Laptop (Projects & Skills Tabs)                  -->
	<!-- 3. Presenter Phone Container (Contact Tab)                             -->
	<!-- ===================================================================== -->
	<div class="absolute inset-0 z-20 pointer-events-none overflow-hidden">
		<!-- ----------------------------------------------------------------- -->
		<!-- OBJECT 1: STUDIO TV FRAME (EXPERIENCE TAB)                        -->
		<!-- Positioned on frame-left (`absolute left-[10%] top-[20%] w-[45%] aspect-video`) -->
		<!-- Clean glass display bezel overlay hosting Experience interactive timeline -->
		<!-- ----------------------------------------------------------------- -->
		<div
			class="absolute transition-all duration-700 ease-out {tabValue === 'experience'
				? 'left-[10%] top-[20%] w-[45%] max-xl:w-[50%] max-lg:w-[85%] max-lg:left-1/2 max-lg:-translate-x-1/2 aspect-video z-30 opacity-100 pointer-events-auto'
				: 'left-[6%] top-[12%] w-[260px] lg:w-[320px] aspect-video opacity-40 hover:opacity-75 z-20 pointer-events-none'}"
			style="transform: translate({smoothX * -14}px, {smoothY * -10}px);"
		>
			<!-- TV Frame PNG Cutout Asset -->
			<img
				src="/tv-frame.png"
				alt="Studio Wall TV Frame Cutout"
				class="absolute inset-0 w-full h-full object-contain pointer-events-none select-none z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]"
			/>

			<!-- TV Screen Inner Surface / Display Bezel Area -->
			<div
				class="absolute inset-[6%] rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 z-20 flex flex-col justify-between"
				style="box-shadow: inset 0 0 35px rgba(0, 0, 0, 0.9);"
			>
				<!-- Scanlines CRT CSS Overlay -->
				<div
					class="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-30 opacity-40"
					aria-hidden="true"
				></div>

				{#if tabValue !== 'experience'}
					<!-- TV Standby Display -->
					<div class="relative z-10 h-full flex flex-col items-center justify-center text-center p-3">
						<Tv size={28} class="text-sky-400/50 mb-1.5 animate-pulse" />
						<span class="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
							STUDIO FEED // STANDBY
						</span>
						<span class="text-[9px] text-neutral-500 mt-1">Select Experience to Power On</span>
					</div>
				{:else}
					<!-- Clean Glass Display Bezel Overlay Hosting Experience Interactive Timeline -->
					<div
						class="relative z-20 h-full w-full pointer-events-auto backdrop-blur-xl bg-white/90 border border-white/80 rounded-lg p-3 sm:p-4 flex flex-col justify-between text-neutral-900 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-500"
					>
						<!-- Top TV Status Header Bar -->
						<div
							class="flex items-center justify-between border-b border-neutral-200/80 pb-2 text-[11px] font-mono text-neutral-500 shrink-0"
						>
							<div class="flex items-center gap-2">
								<span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
								<span class="font-bold tracking-tight text-neutral-900">STUDIO WALL // TIMELINE</span>
							</div>
							<div class="flex items-center gap-2.5">
								<span class="text-sky-700 font-semibold">CHANNEL 01</span>
								<span class="text-neutral-400 hidden sm:inline">4K HDR</span>
							</div>
						</div>

						<!-- Timeline Selector Tabs -->
						<div class="grid grid-cols-3 gap-1.5 sm:gap-2 my-2 shrink-0">
							{#each experienceData as exp, idx}
								{@const isSelected = selectedExpIndex === idx}
								<button
									type="button"
									onclick={() => {
										playUiSound('click');
										selectedExpIndex = idx;
									}}
									class="p-2 sm:p-2.5 rounded-lg text-left transition-all duration-200 cursor-pointer border {isSelected
										? 'bg-sky-500/15 border-sky-400/70 shadow-xs'
										: 'bg-white/60 border-neutral-200/70 hover:bg-white/90 hover:border-neutral-300'}"
								>
									<div class="flex items-center justify-between text-[10px] font-mono mb-0.5">
										<span class={isSelected ? 'text-sky-700 font-semibold' : 'text-neutral-500'}>{exp.period}</span>
										<span class="bg-neutral-100 text-neutral-700 border border-neutral-200/80 rounded px-1 text-[9px] font-medium hidden md:inline">
											{exp.badge}
										</span>
									</div>
									<div class="text-[11px] font-bold tracking-tight text-neutral-900 truncate">{exp.role}</div>
									<div class="text-[10px] text-neutral-500 truncate">{exp.company}</div>
								</button>
							{/each}
						</div>

						<!-- Active Timeline Node Detail View -->
						<div class="p-2.5 sm:p-3 rounded-lg bg-white/70 border border-neutral-200/70 space-y-2 overflow-y-auto scrollbar-none shadow-xs flex-1">
							<div class="flex flex-wrap items-center justify-between gap-1">
								<div>
									<h3 class="text-xs sm:text-sm font-bold tracking-tight text-neutral-900">{currentExp.role}</h3>
									<p class="text-[11px] text-sky-700 font-medium">{currentExp.company} — {currentExp.period}</p>
								</div>
								<span class="bg-neutral-100 text-neutral-700 border border-neutral-200/80 rounded-md px-2 py-0.5 text-[10px] font-medium">
									{currentExp.badge}
								</span>
							</div>

							<p class="text-[11px] text-neutral-600 leading-snug">
								{currentExp.description}
							</p>

							<!-- Highlights -->
							<div class="space-y-1">
								<div class="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
									Architectural Milestones
								</div>
								<ul class="space-y-0.5 text-[11px] text-neutral-700 pl-3.5 list-disc marker:text-sky-600">
									{#each currentExp.highlights as highlight}
										<li>{highlight}</li>
									{/each}
								</ul>
							</div>

							<!-- Tech Chips -->
							<div class="flex flex-wrap gap-1 pt-1">
								{#each currentExp.technologies as tech}
									<span class="bg-neutral-100 text-neutral-700 border border-neutral-200/80 rounded px-1.5 py-0.5 text-[10px] font-medium">
										{tech}
									</span>
								{/each}
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>

		<!-- ----------------------------------------------------------------- -->
		<!-- OBJECT 2: DESK DEMO STATION (PROJECTS & SKILLS TABS)              -->
		<!-- Laptop Container: Isometric perspective container at desk level   -->
		<!-- (`absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[50%]`)       -->
		<!-- Base & Lid elements ready for CSS `rotateX` lid-opening transforms-->
		<!-- ----------------------------------------------------------------- -->
		<div
			class="absolute transition-all duration-700 ease-out {isDemoOpen
				? 'bottom-[10%] left-1/2 -translate-x-1/2 w-[50%] max-xl:w-[65%] max-lg:w-[88%] aspect-[16/10] z-30 opacity-100 pointer-events-auto'
				: 'bottom-[2%] left-1/2 -translate-x-1/2 w-[34%] max-w-[360px] aspect-[16/10] opacity-45 hover:opacity-75 z-20 pointer-events-none'}"
			style="
				perspective: 1200px;
				transform-style: preserve-3d;
				transform: translate(calc(-50% + {smoothX * 12}px), {smoothY * 8}px);
			"
		>
			<!-- Base Element (/laptop-base.png) -->
			<div class="absolute bottom-0 inset-x-0 w-full h-[32%] z-10">
				<img
					src="/laptop-base.png"
					alt="Laptop Base Cutout"
					class="w-full h-full object-contain object-bottom pointer-events-none select-none drop-shadow-[0_25px_45px_rgba(0,0,0,0.85)]"
				/>
			</div>

			<!-- Lid Element with CSS rotateX transforms (/laptop-lid.png) -->
			<div
				class="absolute bottom-[18%] inset-x-[6%] h-[80%] transition-transform duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] z-20"
				style="
					transform-origin: bottom center;
					transform: rotateX({isDemoOpen ? '0deg' : '-70deg'});
					transform-style: preserve-3d;
				"
			>
				<!-- Lid PNG Cutout Asset -->
				<img
					src="/laptop-lid.png"
					alt="Laptop Lid Cutout"
					class="absolute inset-0 w-full h-full object-contain pointer-events-none select-none z-30"
				/>

				<!-- Lid Screen Interior Surface -->
				<div
					class="absolute inset-[6%] rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 z-20 flex flex-col justify-between"
					style="box-shadow: inset 0 0 35px rgba(0, 0, 0, 0.95);"
				>
					{#if !isDemoOpen}
						<!-- Docked standby indicator -->
						<div class="h-full w-full flex flex-col items-center justify-center text-center p-3">
							<Laptop size={28} class="text-sky-400/40 mb-1.5" />
							<span class="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
								DEMO STATION // DOCKED
							</span>
							<span class="text-[9px] text-neutral-500 mt-1">Select Projects or Skills to Open Station</span>
						</div>
					{:else}
						<!-- Clean Apple Light-Mode Frosted Glass Screen Overlay -->
						<div
							class="relative z-30 h-full w-full pointer-events-auto backdrop-blur-xl bg-white/90 border border-white/80 rounded-lg p-3 sm:p-4 flex flex-col justify-between text-neutral-900 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-400"
						>
							{#if tabValue === 'projects'}
								<!-- PROJECTS INTERFACE -->
								<div class="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200/80 pb-2 shrink-0">
									<div class="flex items-center gap-1.5 text-[11px] font-mono text-sky-700 font-semibold uppercase tracking-wider">
										<Code2 size={15} />
										<span>DEMO STATION // PROJECT REPOSITORY</span>
									</div>

									<!-- Category Filter Tabs -->
									<div class="flex items-center gap-1 p-0.5 rounded-full bg-neutral-100 border border-neutral-200/80">
										{#each ['all', 'spatial', 'systems'] as cat}
											{@const isSelected = selectedProjectCategory === cat}
											<button
												type="button"
												onclick={() => {
													playUiSound('click');
													selectedProjectCategory = cat as 'all' | 'spatial' | 'systems';
												}}
												class="px-2.5 py-0.5 rounded-full text-[10px] font-medium capitalize transition-all cursor-pointer {isSelected
													? 'bg-sky-500/20 text-sky-800 font-semibold shadow-xs'
													: 'text-neutral-600 hover:text-neutral-900'}"
											>
												{cat === 'all' ? 'All' : cat}
											</button>
										{/each}
									</div>
								</div>

								<!-- Projects Grid -->
								<div class="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2 overflow-y-auto scrollbar-none flex-1 pr-0.5">
									{#each filteredProjects as project (project.id)}
										<div
											class="p-2.5 rounded-lg bg-white/70 border border-neutral-200/70 hover:border-sky-400/60 hover:bg-white transition-all duration-200 flex flex-col justify-between space-y-2 group shadow-xs"
										>
											<div class="space-y-1">
												<div class="flex items-center justify-between">
													<span class="bg-neutral-100 text-neutral-700 border border-neutral-200/80 rounded px-1.5 py-0.5 text-[9px] font-medium">
														{project.categoryLabel}
													</span>
													<span class="text-[9px] font-mono text-emerald-700 font-semibold">{project.metrics}</span>
												</div>

												<h3 class="text-xs font-bold tracking-tight text-neutral-900 group-hover:text-sky-700 transition-colors">
													{project.title}
												</h3>
												<p class="text-[10px] text-neutral-600 leading-snug line-clamp-2">
													{project.description}
												</p>
											</div>

											<div class="space-y-1.5 pt-0.5">
												<div class="flex flex-wrap gap-1">
													{#each project.tags as tag}
														<span class="bg-neutral-100 text-neutral-700 border border-neutral-200/80 rounded px-1 py-0.5 text-[9px] font-medium">
															{tag}
														</span>
													{/each}
												</div>

												<div class="flex items-center justify-between pt-1 border-t border-neutral-200/70">
													<a
														href={project.github}
														target="_blank"
														rel="noopener noreferrer"
														class="text-[10px] font-semibold text-neutral-600 hover:text-neutral-900 inline-flex items-center gap-1 transition-colors"
													>
														Source <ExternalLink size={10} />
													</a>
													<a
														href={project.demo}
														class="text-[10px] font-semibold text-sky-700 hover:text-sky-800 inline-flex items-center gap-1 transition-colors"
													>
														Live Demo <ChevronRight size={10} />
													</a>
												</div>
											</div>
										</div>
									{/each}
								</div>
							{:else if tabValue === 'skills'}
								<!-- SKILLS INTERFACE -->
								<div class="flex items-center justify-between border-b border-neutral-200/80 pb-2 shrink-0">
									<div class="flex items-center gap-1.5 text-[11px] font-mono text-sky-700 font-semibold uppercase tracking-wider">
										<Terminal size={15} />
										<span>DOCUMENT STATION // TECHNICAL CAPABILITIES</span>
									</div>
									<span class="text-[10px] font-mono text-neutral-500">STACK MATRIX 2026</span>
								</div>

								<div class="space-y-2 my-2 overflow-y-auto scrollbar-none flex-1 pr-0.5">
									<!-- Frontend & Spatial Engineering -->
									<div class="p-2.5 rounded-lg bg-white/70 border border-neutral-200/70 space-y-1.5 shadow-xs">
										<h4 class="text-[11px] font-bold tracking-tight text-neutral-900 flex items-center gap-1.5">
											<span class="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
											Frontend & Spatial Engineering
										</h4>
										<div class="flex flex-wrap gap-1">
											{#each ['Svelte 5', 'SvelteKit', 'TypeScript', 'Tailwind CSS v4', 'GSAP 3D', 'Vite', 'Next.js', 'Web Audio API'] as skill}
												<span class="bg-neutral-100 text-neutral-700 border border-neutral-200/80 rounded px-1.5 py-0.5 text-[10px] font-medium hover:bg-neutral-200 transition-colors">
													{skill}
												</span>
											{/each}
										</div>
									</div>

									<!-- Graphics & Media -->
									<div class="p-2.5 rounded-lg bg-white/70 border border-neutral-200/70 space-y-1.5 shadow-xs">
										<h4 class="text-[11px] font-bold tracking-tight text-neutral-900 flex items-center gap-1.5">
											<span class="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
											Graphics, Media & Rendering Engine
										</h4>
										<div class="flex flex-wrap gap-1">
											{#each ['HTML5 Canvas 2D', 'Video Chroma-Keying', 'WebGL / Shaders', 'Three.js', 'CSS 3D Transforms', 'Alpha WebM Streaming', 'FFmpeg'] as skill}
												<span class="bg-neutral-100 text-neutral-700 border border-neutral-200/80 rounded px-1.5 py-0.5 text-[10px] font-medium hover:bg-neutral-200 transition-colors">
													{skill}
												</span>
											{/each}
										</div>
									</div>

									<!-- Backend & Cloud -->
									<div class="p-2.5 rounded-lg bg-white/70 border border-neutral-200/70 space-y-1.5 shadow-xs">
										<h4 class="text-[11px] font-bold tracking-tight text-neutral-900 flex items-center gap-1.5">
											<span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
											Backend Systems & Cloud Infrastructure
										</h4>
										<div class="flex flex-wrap gap-1">
											{#each ['Rust', 'Go', 'Node.js', 'Docker', 'WebSockets', 'gRPC', 'PostgreSQL', 'Redis', 'AWS Cloud'] as skill}
												<span class="bg-neutral-100 text-neutral-700 border border-neutral-200/80 rounded px-1.5 py-0.5 text-[10px] font-medium hover:bg-neutral-200 transition-colors">
													{skill}
												</span>
											{/each}
										</div>
									</div>
								</div>
							{/if}
						</div>
					{/if}
				</div>
			</div>
		</div>

		<!-- ----------------------------------------------------------------- -->
		<!-- OBJECT 3: PRESENTER PHONE CONTAINER (CONTACT TAB)                 -->
		<!-- Centered slide-up phone frame                                     -->
		<!-- (`absolute bottom-0 left-1/2 -translate-x-1/2 w-[320px] h-[580px] z-40`) -->
		<!-- Renders interactive GTA-style app tiles (GitHub, LinkedIn, Email) -->
		<!-- ----------------------------------------------------------------- -->
		<div
			class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[320px] h-[580px] z-40 transition-transform duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] pointer-events-auto {tabValue ===
			'contact'
				? 'translate-y-[-2%]'
				: 'translate-y-[120%]'}"
			style="transform: translate(calc(-50% + {smoothX * -10}px), calc({tabValue === 'contact' ? '-2%' : '120%'} + {smoothY * -8}px));"
		>
			<!-- Phone Frame Outer PNG Cutout Asset -->
			<img
				src="/phone-frame.png"
				alt="Smartphone Frame Cutout"
				class="absolute inset-0 w-full h-full object-contain pointer-events-none select-none z-30 drop-shadow-[0_-20px_50px_rgba(0,0,0,0.9)]"
			/>

			<!-- Phone Screen Display Surface -->
			<div
				class="absolute inset-x-[7%] top-[4%] bottom-[4%] rounded-[2.2rem] overflow-hidden bg-neutral-950/90 z-20 flex flex-col justify-between"
				style="box-shadow: inset 0 0 25px rgba(0, 0, 0, 0.95);"
			>
				<!-- Frosted Glass UI Inside Phone Screen -->
				<div
					class="relative z-20 h-full w-full backdrop-blur-xl bg-white/90 border border-white/70 p-4 sm:p-5 flex flex-col justify-between text-neutral-900"
				>
					<!-- Phone Top Status Bar -->
					<div
						class="flex items-center justify-between text-[10px] font-mono text-neutral-500 px-1 select-none border-b border-neutral-200/70 pb-2 shrink-0"
					>
						<span class="font-bold tracking-tight text-neutral-900">KEYNOTE OS</span>
						<div class="flex items-center gap-1.5">
							<span class="text-emerald-600 font-semibold">5G</span>
							<span class="text-neutral-600">100%</span>
						</div>
					</div>

					<!-- GTA-Style App Tiles -->
					<div class="space-y-1.5 py-1.5">
						<div class="text-[10px] font-mono text-neutral-500 uppercase tracking-wider px-1">
							Direct Apps
						</div>
						<div class="grid grid-cols-3 gap-2 text-center">
							<!-- Email Tile -->
							<button
								type="button"
								onclick={() => copyToClipboard('parthkaushal@example.com')}
								class="p-2.5 rounded-xl bg-sky-500/15 border border-sky-400/40 hover:bg-sky-500/25 flex flex-col items-center justify-center gap-1 transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
							>
								{#if copiedEmail}
									<Check size={18} class="text-emerald-600" />
								{:else}
									<Mail size={18} class="text-sky-700" />
								{/if}
								<span class="text-[10px] font-semibold text-neutral-900">
									{copiedEmail ? 'Copied' : 'Email'}
								</span>
							</button>

							<!-- GitHub Tile -->
							<a
								href="https://github.com/p8kaushal"
								target="_blank"
								rel="noopener noreferrer"
								class="p-2.5 rounded-xl bg-neutral-100 border border-neutral-200/80 hover:bg-neutral-200/70 flex flex-col items-center justify-center gap-1 transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
							>
								<Code2 size={18} class="text-neutral-800" />
								<span class="text-[10px] font-semibold text-neutral-900">GitHub</span>
							</a>

							<!-- LinkedIn Tile -->
							<a
								href="https://linkedin.com"
								target="_blank"
								rel="noopener noreferrer"
								class="p-2.5 rounded-xl bg-blue-500/15 border border-blue-400/40 hover:bg-blue-500/25 flex flex-col items-center justify-center gap-1 transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
							>
								<ExternalLink size={18} class="text-blue-700" />
								<span class="text-[10px] font-semibold text-neutral-900">LinkedIn</span>
							</a>
						</div>
					</div>

					<!-- Direct Message Prompt Form Inside Phone -->
					<form
						onsubmit={handleSendMessage}
						class="space-y-2 pt-2 border-t border-neutral-200/70 text-left"
					>
						<label for="contact-msg" class="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">
							Quick Transmit Message
						</label>
						<textarea
							id="contact-msg"
							bind:value={contactMessage}
							placeholder="Type message to Parth..."
							rows="3"
							class="w-full px-2.5 py-1.5 rounded-xl bg-white/80 border border-neutral-300 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 resize-none shadow-xs"
						></textarea>

						<button
							type="submit"
							class="w-full py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-sky-600/20 transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
						>
							{#if messageSent}
								<Check size={14} />
								<span>Dispatched!</span>
							{:else}
								<Send size={13} />
								<span>Transmit</span>
							{/if}
						</button>
					</form>

					<!-- Bottom Home Notch -->
					<div class="flex justify-center pt-2 shrink-0">
						<div class="w-20 h-1 rounded-full bg-neutral-400"></div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ===================================================================== -->
	<!-- LAYER 4 (Z-INDEX 30): HTML/TAILWIND INTERACTIVE OVERLAYS               -->
	<!-- Home, About, Resume, Achievements Keynote Cards & Global Stage Status -->
	<!-- ===================================================================== -->
	<div
		class="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-4 sm:p-8 pt-20"
	>
		<!-- ================================================================= -->
		<!-- TAB 1: HOME OVERLAY (KEYNOTE BIO SPOTLIGHT & HERO BANNER)        -->
		<!-- ================================================================= -->
		{#if tabValue === 'home'}
			<div
				class="pointer-events-auto max-w-xl space-y-5 animate-in fade-in slide-in-from-left-6 duration-500 my-auto ml-2 sm:ml-8 backdrop-blur-xl bg-white/85 border border-white/70 shadow-2xl rounded-2xl p-6 text-neutral-900"
			>
				<!-- Keynote Edition Badge -->
				<div
					class="inline-flex items-center gap-2 bg-neutral-100 text-neutral-700 border border-neutral-200/80 rounded-md px-2 py-0.5 text-xs font-medium font-mono uppercase tracking-wider"
				>
					<Sparkles size={14} class="text-sky-600 animate-spin-slow" />
					<span>KEYNOTE // 2026 EDITION</span>
				</div>

				<!-- Massive Keynote Typography -->
				<div class="space-y-1">
					<h1
						class="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900"
					>
						Parth Kaushal
					</h1>
					<p class="text-base sm:text-lg font-medium text-sky-700 tracking-wide">
						Creative Developer & Systems Architect
					</p>
				</div>

				<!-- Elevator Mission Statement -->
				<p
					class="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-lg"
				>
					Converging high-performance 4-layer web composition with microsecond distributed
					microservices. Engineered for buttery 60 FPS transitions without WebGL runtime weight.
				</p>

				<!-- Quick Spatial Metrics Grid -->
				<div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-lg pt-1">
					<div
						class="p-2.5 rounded-xl bg-white/70 border border-neutral-200/70 shadow-xs text-left"
					>
						<div class="text-lg font-bold tracking-tight text-neutral-900">60 FPS</div>
						<div class="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Spatial Loop</div>
					</div>
					<div
						class="p-2.5 rounded-xl bg-white/70 border border-neutral-200/70 shadow-xs text-left"
					>
						<div class="text-lg font-bold tracking-tight text-sky-700">5+ Yrs</div>
						<div class="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Engineering</div>
					</div>
					<div
						class="p-2.5 rounded-xl bg-white/70 border border-neutral-200/70 shadow-xs text-left"
					>
						<div class="text-lg font-bold tracking-tight text-neutral-900">30+</div>
						<div class="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Shipped Apps</div>
					</div>
					<div
						class="p-2.5 rounded-xl bg-white/70 border border-neutral-200/70 shadow-xs text-left"
					>
						<div class="text-lg font-bold tracking-tight text-emerald-700">99.9%</div>
						<div class="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">System SLA</div>
					</div>
				</div>

				<!-- Action Buttons -->
				<div class="flex flex-wrap items-center gap-3 pt-2">
					<button
						type="button"
						onclick={() => {
							playUiSound('click');
							setActiveTab('projects');
						}}
						class="px-5 py-2.5 rounded-full bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-2 transition-all duration-200 shadow-lg shadow-sky-600/25 hover:scale-[1.02] cursor-pointer"
					>
						Explore Projects
						<ChevronRight size={15} />
					</button>
					<button
						type="button"
						onclick={() => {
							playUiSound('click');
							setActiveTab('experience');
						}}
						class="px-5 py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-200/80 text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-2 transition-all duration-200 cursor-pointer"
					>
						<Tv size={14} class="text-sky-600" />
						Studio Wall
					</button>
					<button
						type="button"
						onclick={() => {
							playUiSound('click');
							setActiveTab('contact');
						}}
						class="px-4 py-2.5 rounded-full bg-white/60 hover:bg-white text-neutral-700 hover:text-neutral-900 border border-neutral-200/80 text-xs sm:text-sm font-medium tracking-wide transition-colors cursor-pointer"
					>
						Direct Contact
					</button>
				</div>
			</div>

		<!-- ================================================================= -->
		<!-- TAB 2: ABOUT OVERLAY (KEYNOTE PRESENTER BIO & PRINCIPLES CARD)   -->
		<!-- ================================================================= -->
		{:else if tabValue === 'about'}
			<div
				class="pointer-events-auto max-w-xl animate-in fade-in slide-in-from-right-6 duration-500 my-auto ml-auto mr-4 sm:mr-12"
			>
				<div
					class="backdrop-blur-xl bg-white/85 border border-white/70 shadow-2xl rounded-2xl p-6 text-neutral-900 space-y-4"
				>
					<div
						class="inline-flex items-center gap-2 bg-neutral-100 text-neutral-700 border border-neutral-200/80 rounded-md px-2 py-0.5 text-xs font-medium font-mono uppercase tracking-wider"
					>
						<User size={13} class="text-sky-600" />
						<span>BIOGRAPHY // THE ARCHITECT</span>
					</div>

					<h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
						Designing at the Edge of Performance
					</h2>

					<p class="text-xs sm:text-sm text-neutral-600 leading-relaxed">
						I specialize in converging high-level spatial visual storytelling with resilient
						distributed systems. My focus centers on creating frictionless digital experiences that
						mirror the precision of native desktop applications.
					</p>

					<!-- Principles Matrix -->
					<div class="space-y-2.5 pt-2">
						<div class="text-xs font-mono text-neutral-500 uppercase tracking-wider">
							Core Engineering Principles
						</div>

						<div class="grid gap-2">
							<div
								class="p-3 rounded-xl bg-white/60 border border-neutral-200/70 flex items-start gap-3 shadow-xs"
							>
								<div class="p-1.5 rounded-lg bg-sky-500/15 text-sky-700 shrink-0 mt-0.5">
									<Layers size={14} />
								</div>
								<div>
									<div class="text-xs font-bold tracking-tight text-neutral-900">Spatial Composability</div>
									<div class="text-[11px] text-neutral-600 mt-0.5 leading-snug">
										DOM stacking over heavy WebGL runtimes for extreme battery longevity and sub-second
										hydration.
									</div>
								</div>
							</div>

							<div
								class="p-3 rounded-xl bg-white/60 border border-neutral-200/70 flex items-start gap-3 shadow-xs"
							>
								<div class="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-700 shrink-0 mt-0.5">
									<CheckCircle2 size={14} />
								</div>
								<div>
									<div class="text-xs font-bold tracking-tight text-neutral-900">Frame-Budget Fidelity</div>
									<div class="text-[11px] text-neutral-600 mt-0.5 leading-snug">
										Guaranteed 60 FPS execution with zero layout shifts and hardware-accelerated
										interpolation.
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Navigation Link -->
					<div class="pt-2 flex items-center justify-between border-t border-neutral-200/70">
						<span class="text-xs text-neutral-500">Want to inspect the CV?</span>
						<button
							type="button"
							onclick={() => {
								playUiSound('click');
								setActiveTab('resume');
							}}
							class="text-xs font-semibold text-sky-700 hover:text-sky-800 inline-flex items-center gap-1 cursor-pointer"
						>
							Curriculum Vitae Sheet
							<ChevronRight size={13} />
						</button>
					</div>
				</div>
			</div>

		<!-- ================================================================= -->
		<!-- TAB 6: RESUME OVERLAY (PRINTABLE SHEET OVERLAY)                   -->
		<!-- ================================================================= -->
		{:else if tabValue === 'resume'}
			<div
				class="pointer-events-auto w-full max-w-3xl mx-auto my-auto animate-in fade-in zoom-in-95 duration-500 px-4"
			>
				<div
					class="backdrop-blur-xl bg-white/85 border border-white/70 shadow-2xl rounded-2xl p-6 text-neutral-900 space-y-5 max-h-[78vh] overflow-y-auto"
				>
					<!-- Header Bar with Download Action -->
					<div class="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200/70 pb-4">
						<div>
							<h2 class="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">Parth Kaushal</h2>
							<p class="text-xs sm:text-sm text-sky-700 font-medium">
								Staff Creative Software Engineer & Architect
							</p>
						</div>

						<div class="flex items-center gap-2">
							<button
								type="button"
								onclick={() => {
									playUiSound('click');
									window.print();
								}}
								class="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200/80 transition-colors cursor-pointer"
								title="Print Document"
							>
								<Printer size={16} />
							</button>
							<a
								href="/Parth_Kaushal_Resume.pdf"
								download
								class="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs flex items-center gap-2 shadow-md shadow-sky-600/20 transition-all cursor-pointer"
							>
								<Download size={14} />
								Download PDF
							</a>
						</div>
					</div>

					<!-- Executive Summary -->
					<div class="space-y-1">
						<div class="text-xs font-mono text-neutral-500 uppercase tracking-wider">
							Executive Summary
						</div>
						<p class="text-xs text-neutral-600 leading-relaxed">
							8+ years architecting performant frontends, high-fps spatial web products, and scalable
							microservices. Expert in sub-second rendering, DOM layering pipelines, and zero-downtime
							cloud deployments.
						</p>
					</div>

					<!-- Experience Highlights -->
					<div class="space-y-3 pt-2">
						<div class="text-xs font-mono text-neutral-500 uppercase tracking-wider">
							Professional Experience
						</div>

						<div class="p-3.5 rounded-xl bg-white/60 border border-neutral-200/70 space-y-1 shadow-xs">
							<div class="flex items-center justify-between text-xs">
								<span class="font-bold tracking-tight text-neutral-900">Lead Creative Technologist</span>
								<span class="text-sky-700 font-mono">2023 — Present</span>
							</div>
							<div class="text-[11px] text-neutral-500">Spatial Studio Lab</div>
							<p class="text-[11px] text-neutral-600 leading-relaxed pt-1">
								Orchestrated hardware-accelerated presentation canvases and Svelte 5 production
								architectures with 60 FPS guaranteed budgets.
							</p>
						</div>

						<div class="p-3.5 rounded-xl bg-white/60 border border-neutral-200/70 space-y-1 shadow-xs">
							<div class="flex items-center justify-between text-xs">
								<span class="font-bold tracking-tight text-neutral-900">Senior Full-Stack Engineer</span>
								<span class="text-sky-700 font-mono">2021 — 2023</span>
							</div>
							<div class="text-[11px] text-neutral-500">Vanguard Cloud Tech</div>
							<p class="text-[11px] text-neutral-600 leading-relaxed pt-1">
								Engineered low-latency microservices with Rust & Go, handling over 500k active users
								with 99.999% reliability.
							</p>
						</div>
					</div>
				</div>
			</div>

		<!-- ================================================================= -->
		<!-- TAB 7: ACHIEVEMENTS OVERLAY (THE WALL GALLERY // GTA V SELECTOR)  -->
		<!-- ================================================================= -->
		{:else if tabValue === 'achievements'}
			<div
				class="pointer-events-auto w-full max-w-4xl mx-auto my-auto animate-in fade-in zoom-in-95 duration-500 px-4"
			>
				<div
					class="backdrop-blur-xl bg-white/85 border border-white/70 shadow-2xl rounded-2xl p-6 text-neutral-900 space-y-5"
				>
					<div class="flex items-center justify-between border-b border-neutral-200/70 pb-3">
						<div class="flex items-center gap-2 text-xs font-mono text-amber-600 font-semibold uppercase tracking-wider">
							<Award size={16} />
							<span>THE WALL GALLERY // HONORS & RECOGNITION</span>
						</div>
						<span class="text-xs font-mono text-neutral-500">GTA V SELECTOR SYSTEM</span>
					</div>

					<!-- GTA V Weapon Selector Style Carousel -->
					<div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
						{#each achievementsData as ach, i}
							{@const isSelected = selectedAchievementIndex === i}
							<button
								type="button"
								onclick={() => {
									playUiSound('click');
									selectedAchievementIndex = i;
								}}
								class="p-4 rounded-xl text-left transition-all duration-200 cursor-pointer border {isSelected
									? 'bg-amber-500/15 border-amber-400 shadow-md scale-[1.02]'
									: 'bg-white/60 border-neutral-200/70 hover:bg-white/90 hover:border-neutral-300'}"
							>
								<div class="flex items-center justify-between text-[11px] font-mono mb-2">
									<span class={isSelected ? 'text-amber-700 font-bold' : 'text-neutral-500'}>
										{ach.year}
									</span>
									<Award
										size={16}
										class={isSelected ? 'text-amber-600 animate-bounce' : 'text-neutral-400'}
									/>
								</div>
								<div class="text-xs font-bold tracking-tight text-neutral-900 mb-1">{ach.title}</div>
								<div class="text-[11px] text-amber-700 font-mono">{ach.prize}</div>
							</button>
						{/each}
					</div>

					<!-- Active Detail Panel -->
					<div class="p-5 rounded-xl bg-white/60 border border-neutral-200/70 space-y-2 shadow-xs">
						<div class="flex items-center justify-between">
							<div>
								<h3 class="text-sm sm:text-base font-bold tracking-tight text-neutral-900">{currentAch.title}</h3>
								<div class="text-xs text-amber-700 font-mono">
									{currentAch.organization} — {currentAch.year}
								</div>
							</div>
							<span
								class="bg-neutral-100 text-neutral-700 border border-neutral-200/80 rounded-md px-2 py-0.5 text-xs font-medium"
							>
								{currentAch.stats}
							</span>
						</div>
						<p class="text-xs sm:text-sm text-neutral-600 leading-relaxed pt-1">
							{currentAch.description}
						</p>
					</div>
				</div>
			</div>
		{/if}

		<!-- Stage Footer Status Bar (Keynote Info) -->
		<div
			class="pointer-events-none w-full flex items-center justify-between text-[11px] font-mono text-neutral-400 border-t border-white/10 pt-3 select-none"
		>
			<div class="flex items-center gap-2">
				<span class="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
				<span>STAGE: {tabValue.toUpperCase()} // 4-LAYER COMPOSITION</span>
			</div>
			<div class="hidden sm:flex items-center gap-4">
				<span>PARALLAX: ACTIVE</span>
				<span>PRESENTER: {videoError ? 'FALLBACK-PHOTO' : 'HTML5-VIDEO'}</span>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes spin-slow {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
	:global(.animate-spin-slow) {
		animation: spin-slow 12s linear infinite;
	}
	/* Scrollbar utility styling */
	.scrollbar-none::-webkit-scrollbar {
		display: none;
	}
	.scrollbar-none {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
