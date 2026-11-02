<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { fade, fly } from 'svelte/transition';
	import { playSound } from '$lib/utils/soundEngine';
	import { calculateHardwareBounds, TV_ANCHOR } from '$lib/utils/tvAnchor';
	import { Cpu, Terminal, X, ChevronRight } from 'lucide-svelte';

	let { isActive } = $props<{ isActive: boolean }>();

	let tvContainer = $state<HTMLElement | null>(null);
	let backlightBloom = $state<HTMLElement | null>(null);
	let glassGlare = $state<HTMLElement | null>(null);
	let dashboardContent = $state<HTMLElement | null>(null);

	let trackContainer = $state<HTMLElement | null>(null);
	let indicatorRing = $state<HTMLElement | null>(null);

	let activeNodeIndex = $state(0);
	let bounds = $state({ left: 0, top: 0, width: 0, height: 0 });
	let isDrawerOpen = $state(false);

	const nodePositions = [20, 50, 80];

	const careerTimeline = [
		{
			period: '2025 – Present',
			role: 'Independent Software Developer',
			org: 'Personal Projects & Systems Exploration',
			badge: 'FULL-STACK • AI/ML • GAME DEV',
			shortSummary: 'Building and experimenting with software projects across web development, machine learning, computer vision, game development, and desktop applications.',
			bulletPoints: [
				'Developed machine learning applications using real-world datasets, including an IPL match prediction project built with pandas, scikit-learn, and Flask.',
				'Worked on web-based product concepts such as Skill Swap and RentWheels, exploring application design, user-facing functionality, and backend development.',
				'Explored game development and interactive experiences using Unity, Unreal Engine, Phaser, WebGL, and Babylon.js.'
			],
			techStack: ['Python', 'TypeScript', 'Node.js', 'Flask', 'FastAPI', 'PostgreSQL', 'OpenCV', 'scikit-learn'],
			extendedSpecs: {
				telemetry: 'Active Prototyping Pipeline | Multi-Disciplinary Systems | 9.07 GPA Foundation',
				routine: 'End-to-end rapid prototyping from conceptual system diagrams to full-stack implementation',
				benchmarks: 'Sub-50ms API responses, modular architectures, and scalable full-stack deployments'
			}
		},
		{
			period: '2025 – 2029 (Exp.)',
			role: 'B.Tech — Computer Science & Engineering',
			org: 'Vishwakarma Institute of Technology, Pune',
			badge: 'CS • IoT • CYBERSECURITY • BLOCKCHAIN',
			shortSummary: 'Pursuing undergraduate studies in Computer Science and Engineering with a focus on IoT, Cybersecurity, and Blockchain Technology. Maintaining a 9.07 CGPA.',
			bulletPoints: [
				'Maintained a strong academic record with a 9.07 CGPA across core engineering disciplines.',
				'Finalist at Smart India Hackathon 2026 (Internal Round 2), tackling real-world problem statements.',
				'Active participant in collegiate hackathons, technical clubs, and peer collaborative engineering projects.'
			],
			techStack: ['C/C++', 'Python', 'Data Structures', 'Algorithms', 'DBMS', 'Computer Networks', 'Linux'],
			extendedSpecs: {
				telemetry: '9.07 / 10.0 CGPA | SIH 2026 Round 2 Finalist | VIT Pune Department of CSE',
				routine: 'Algorithmic problem-solving, operating systems principles, and distributed networking fundamentals',
				benchmarks: 'Top academic standing; rigorous coursework in IoT architectures, cryptography, and systems programming'
			}
		},
		{
			period: '2026 – Present',
			role: 'Avionics Subdivision Engineer',
			org: 'Drone Research & Development SIG (DRDS), VIT Pune',
			badge: 'AVIONICS • SWARM UAVs • TELEMETRY',
			shortSummary: 'Contributing to the avionics systems and hardware-software telemetry integration for autonomous UAVs under Mission 1 – RescueSwarm.',
			bulletPoints: [
				'Working on avionics firmware and sensor fusion integration for autonomous UAV swarm navigation in disaster response.',
				'Developing low-latency telemetry communication between onboard companion computers and ground control stations.',
				'Collaborating on hardware-in-the-loop (HIL) testing, fail-safe protocols, and flight controller calibration.'
			],
			techStack: ['Embedded C', 'C++', 'FreeRTOS', 'ESP32', 'STM32', 'Sensor Fusion', 'Telemetry Protocols'],
			extendedSpecs: {
				telemetry: 'Sub-50ms Swarm Telemetry Link | Deterministic Sensor Polling | Fail-Safe Redundancy',
				routine: 'Mission 1 – RescueSwarm: Autonomous multi-rotor coordination and RF communications stack',
				benchmarks: 'Verified in Hardware-In-The-Loop (HIL) bench simulations; robust packet recovery protocols'
			}
		}
	];

	function updateLayout() {
		if (typeof window !== 'undefined') {
			bounds = calculateHardwareBounds(TV_ANCHOR, window.innerWidth, window.innerHeight);
		}
	}

	onMount(() => {
		updateLayout();
		window.addEventListener('resize', updateLayout);
		return () => {
			window.removeEventListener('resize', updateLayout);
		};
	});

	$effect(() => {
		if (isActive) {
			triggerTvBootSequence();
		}
	});

	$effect(() => {
		const targetIdx = activeNodeIndex;
		if (indicatorRing && trackContainer) {
			const trackWidth = trackContainer.getBoundingClientRect().width;
			const targetX = (nodePositions[targetIdx] / 100) * trackWidth;
			gsap.to(indicatorRing, {
				x: targetX,
				duration: 0.4,
				ease: 'power2.out'
			});
		}
	});

	function selectNode(index: number) {
		playSound('click');
		activeNodeIndex = index;
		isDrawerOpen = false;
	}

	function triggerTvBootSequence() {
		if (!tvContainer || !backlightBloom || !glassGlare || !dashboardContent) return;

		const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

		tl.set(dashboardContent, { opacity: 0, scale: 0.98 })
		  .set(backlightBloom, { opacity: 0, scaleX: 0 })
		  .set(glassGlare, { opacity: 0, xPercent: -100 });

		tl.to(backlightBloom, { opacity: 1, scaleX: 1, duration: 0.45, ease: 'power3.inOut' }, 0.2)
		  .to(backlightBloom, { opacity: 0, duration: 0.2, ease: 'power1.out' }, 0.6);

		tl.to(glassGlare, { opacity: 0.85, xPercent: 100, duration: 0.4, ease: 'power1.inOut' }, 0.35);
		tl.to(dashboardContent, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' }, 0.65);
	}
</script>

<div
	id="experience-tv-root"
	bind:this={tvContainer}
	class="experience-station tv-screen-viewport absolute z-20 overflow-hidden rounded-[6px] text-slate-100 opacity-100 pointer-events-auto flex flex-col justify-between select-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] backdrop-blur-2xl"
	style="left: {bounds.left}px; top: {bounds.top}px; width: {bounds.width}px; height: {bounds.height}px; background-color: rgba(11, 19, 41, var(--glass-opacity)); backdrop-filter: blur(var(--glass-blur)); border: 1px solid rgba(255, 255, 255, 0.2);"
>
	<div
		class="tv-glass-glare absolute inset-0 z-40 pointer-events-none"
		style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, transparent 60%);"
	></div>

	<div
		bind:this={glassGlare}
		class="absolute inset-0 z-30 pointer-events-none opacity-0"
		style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, transparent 60%);"
	></div>

	<div
		bind:this={backlightBloom}
		class="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] z-20 pointer-events-none opacity-0"
		style="background: linear-gradient(90deg, transparent, #38bdf8, #ffffff, #38bdf8, transparent);"
	></div>

	<div bind:this={dashboardContent} class="relative z-10 w-full h-full p-6 sm:p-8 flex flex-col justify-between opacity-0 bg-transparent">
		<div class="flex items-center justify-between pb-3 border-b border-white/10 shrink-0 font-mono text-xs tracking-widest text-sky-400 uppercase font-bold">
			<span class="text-sky-400 font-bold">EXPERIENCE & EDUCATION</span>
			<span class="font-bold text-slate-300">PARTH KAUSHAL</span>
		</div>

		<div class="relative flex-1 my-3 overflow-hidden">
			{#key activeNodeIndex}
				<div
					in:fly={{ y: 8, duration: 220 }}
					out:fade={{ duration: 120 }}
					class="absolute inset-0 flex flex-col justify-between"
				>
					<div>
						<div class="mb-2.5 flex items-baseline justify-between gap-4">
							<div>
								<span class="text-xs font-mono font-bold text-sky-300 bg-sky-500/20 px-2.5 py-0.5 rounded-full border border-sky-400/40 inline-block mb-1">
									{careerTimeline[activeNodeIndex].period}
								</span>
								<h2 class="text-xl sm:text-2xl font-bold text-white tracking-tight">
									{careerTimeline[activeNodeIndex].role}
								</h2>
								<p class="text-xs sm:text-sm font-medium text-slate-300">
									{careerTimeline[activeNodeIndex].org}
								</p>
							</div>
							<button
								type="button"
								onclick={() => { playSound('click'); isDrawerOpen = !isDrawerOpen; }}
								class="px-3 py-1.5 rounded bg-sky-500/20 border border-sky-400/40 text-sky-300 text-xs font-mono font-bold flex items-center gap-1.5 hover:bg-sky-500/30 transition-colors cursor-pointer"
							>
								<Cpu class="w-3.5 h-3.5" /> View Extended Tech Specs
							</button>
						</div>

						<ul class="space-y-2 my-3">
							{#each careerTimeline[activeNodeIndex].bulletPoints as point}
								<li class="text-slate-200 text-xs sm:text-sm leading-relaxed flex items-start gap-2">
									<span class="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0 mt-1.5"></span>
									<span>{point}</span>
								</li>
							{/each}
						</ul>
					</div>

					<div class="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
						{#each careerTimeline[activeNodeIndex].techStack as tech}
							<span class="bg-slate-900/60 text-slate-200 text-xs px-2.5 py-1 rounded-md font-mono border border-white/15">
								{tech}
							</span>
						{/each}
					</div>
				</div>
			{/key}
		</div>

		<div bind:this={trackContainer} class="relative pt-4 pb-1 shrink-0">
			<div class="timeline-axis-line h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent w-full absolute top-7 left-0 right-0 z-0"></div>

			<div
				bind:this={indicatorRing}
				class="sliding-node-indicator absolute top-[21px] -ml-2.5 w-5 h-5 rounded-full border-2 border-sky-400 bg-sky-950 shadow-[0_0_12px_rgba(56,189,248,0.5)] z-20 pointer-events-none"
				style="left: 0px;"
			></div>

			<div class="relative w-full h-16 z-10">
				{#each careerTimeline as item, idx}
					<button
						type="button"
						onmouseenter={() => playSound('click')}
						onclick={() => selectNode(idx)}
						class="timeline-node-btn absolute top-0 -translate-x-1/2 flex flex-col items-center cursor-pointer group focus:outline-none"
						style="left: {nodePositions[idx]}%;"
					>
						<div class="vertical-stem w-[1px] h-5 transition-colors duration-200 {activeNodeIndex === idx ? 'bg-sky-400 font-bold' : 'bg-slate-600 group-hover:bg-slate-400'}"></div>
						<div class="circular-node-marker w-4 h-4 rounded-full border-2 transition-all duration-200 flex items-center justify-center {activeNodeIndex === idx ? 'border-sky-400 bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]' : 'border-sky-400/60 bg-sky-950/80 group-hover:border-sky-400'}">
							{#if activeNodeIndex === idx}
								<div class="w-1.5 h-1.5 rounded-full bg-slate-950"></div>
							{/if}
						</div>
						<div class="mt-1 text-center font-mono text-[11px] whitespace-nowrap">
							<span class="block font-bold transition-colors duration-200 {activeNodeIndex === idx ? 'text-sky-400' : 'text-slate-400 group-hover:text-slate-200'}">
								{item.period}
							</span>
							<span class="block text-[10px] font-medium truncate max-w-[120px] transition-colors duration-200 {activeNodeIndex === idx ? 'text-white font-bold' : 'text-slate-400 group-hover:text-slate-200'}">
								{item.org.split(' ')[0]}
							</span>
						</div>
					</button>
				{/each}
			</div>
		</div>

		<!-- Interactive Extended Tech Specs Drawer Inside TV Bezels -->
		{#if isDrawerOpen}
			<div
				transition:fly={{ x: 200, duration: 250 }}
				class="absolute inset-y-0 right-0 w-80 bg-slate-950/90 backdrop-blur-2xl border-l border-white/20 p-6 z-50 flex flex-col justify-between shadow-2xl font-mono text-xs text-white"
			>
				<div>
					<div class="flex items-center justify-between pb-3 border-b border-slate-800">
						<span class="text-sky-400 font-bold flex items-center gap-1.5"><Terminal class="w-4 h-4" /> EXTENDED SPECS</span>
						<button
							type="button"
							onclick={() => { playSound('click'); isDrawerOpen = false; }}
							class="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
						>
							<X class="w-4 h-4" />
						</button>
					</div>

					<div class="mt-4 space-y-4 text-slate-300">
						<div>
							<h4 class="text-[10px] uppercase font-bold text-sky-400 mb-1">Telemetry Metrics</h4>
							<p class="p-2 rounded bg-slate-950 border border-slate-800 text-[11px] leading-relaxed text-slate-200">
								{careerTimeline[activeNodeIndex].extendedSpecs.telemetry}
							</p>
						</div>

						<div>
							<h4 class="text-[10px] uppercase font-bold text-sky-400 mb-1">Execution Routine</h4>
							<p class="p-2 rounded bg-slate-950 border border-slate-800 text-[11px] leading-relaxed text-slate-200">
								{careerTimeline[activeNodeIndex].extendedSpecs.routine}
							</p>
						</div>

						<div>
							<h4 class="text-[10px] uppercase font-bold text-sky-400 mb-1">Benchmark Verification</h4>
							<p class="p-2 rounded bg-slate-950 border border-slate-800 text-[11px] leading-relaxed text-slate-200">
								{careerTimeline[activeNodeIndex].extendedSpecs.benchmarks}
							</p>
						</div>
					</div>
				</div>

				<div class="pt-3 border-t border-slate-800 text-[9px] text-slate-500 text-center uppercase tracking-widest">
					SYS_DIAGNOSTICS_OK
				</div>
			</div>
		{/if}
	</div>
</div>
