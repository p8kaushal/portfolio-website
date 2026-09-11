<script lang="ts">
	import { fly } from 'svelte/transition';
	import {
		activeTab,
		isMuted,
		setActiveTab,
		toggleMute,
		TABS,
		type Tab
	} from '$lib/stores/navStore';
	import {
		Volume2,
		VolumeX,
		Briefcase,
		Code2,
		Award,
		FileText,
		User,
		Sparkles,
		Mail,
		ExternalLink,
		Download,
		ChevronRight,
		GraduationCap,
		Terminal
	} from 'lucide-svelte';

	let copiedEmail = $state(false);

	function copyEmail() {
		navigator.clipboard.writeText('parthkaushal@example.com');
		copiedEmail = true;
		setTimeout(() => {
			copiedEmail = false;
		}, 2000);
	}
</script>

<!-- Mobile Tablet Container: ONLY displayed on viewports < 768px -->
<aside
	aria-label="Mobile Keynote Tablet"
	class="md:hidden fixed inset-0 z-40 flex items-center justify-center p-2.5 sm:p-4 pointer-events-auto bg-black/70 backdrop-blur-lg"
>
	<!-- Centered Glassmorphic Tablet Card -->
	<div
		class="w-full max-w-sm sm:max-w-md h-[94vh] max-h-[860px] flex flex-col rounded-[2.5rem] border border-white/15 bg-neutral-950/85 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.15)] overflow-hidden relative"
	>
		<!-- Tablet Top Bezel: Camera Notch & Speaker -->
		<div class="pt-3 pb-1.5 px-6 flex items-center justify-between shrink-0 select-none">
			<!-- Time / Status -->
			<div class="flex items-center gap-1.5 text-[11px] font-mono font-medium text-neutral-400">
				<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
				<span>KEYNOTE // OS</span>
			</div>

			<!-- Dynamic Island / Speaker notch -->
			<div class="flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/90 border border-white/10">
				<span class="w-2.5 h-2.5 rounded-full bg-neutral-800 border border-neutral-700"></span>
				<span class="w-10 h-1 rounded-full bg-neutral-800"></span>
			</div>

			<!-- Audio Mute / Unmute Button -->
			<button
				type="button"
				onclick={toggleMute}
				aria-label={$isMuted ? 'Unmute Audio' : 'Mute Audio'}
				class="p-1 rounded-full text-neutral-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
			>
				{#if $isMuted}
					<VolumeX size={15} class="text-neutral-400" />
				{:else}
					<Volume2 size={15} class="text-sky-400 animate-pulse" />
				{/if}
			</button>
		</div>

		<!-- Scrollable Tab Bar inside Tablet -->
		<nav
			aria-label="Tablet Sections"
			class="px-3 py-2 border-b border-white/10 shrink-0 overflow-x-auto scrollbar-none"
		>
			<div class="flex items-center gap-1.5 min-w-max">
				{#each TABS as tab (tab.id)}
					{@const isActive = $activeTab === tab.id}
					<button
						type="button"
						onclick={() => setActiveTab(tab.id)}
						aria-current={isActive ? 'page' : undefined}
						class="px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-all duration-200 focus:outline-none {isActive
							? 'bg-sky-500/20 text-sky-300 border border-sky-400/40 shadow-[0_0_12px_rgba(56,189,248,0.25)]'
							: 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5 border border-transparent'}"
					>
						{tab.label}
					</button>
				{/each}
			</div>
		</nav>

		<!-- Main Content Stage with Smooth Tab Sliding Transitions -->
		<div class="relative flex-1 overflow-hidden">
			{#key $activeTab}
				<div
					in:fly={{ x: 28, duration: 240, delay: 40 }}
					out:fly={{ x: -28, duration: 180 }}
					class="absolute inset-0 overflow-y-auto px-4 py-3.5 space-y-4 text-neutral-200 scrollbar-none"
				>
					<!-- ==================== HOME TAB ==================== -->
					{#if $activeTab === 'home'}
						<div class="space-y-4">
							<div class="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3">
								<div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-sky-400/10 text-sky-400 border border-sky-400/30">
									<Sparkles size={11} />
									Keynote 2026 Edition
								</div>
								<h1 class="text-2xl font-bold tracking-tight text-white">
									Parth Kaushal
								</h1>
								<p class="text-xs text-sky-300/90 font-medium">
									Creative Developer & Systems Architect
								</p>
								<p class="text-xs text-neutral-400 leading-relaxed">
									Crafting cinematic, spatial web experiences with high-performance architectures, hardware-accelerated animations, and responsive interfaces.
								</p>
							</div>

							<!-- Quick Stats Grid -->
							<div class="grid grid-cols-2 gap-2.5">
								<div class="p-3 rounded-xl bg-white/[0.03] border border-white/5">
									<div class="text-lg font-bold text-white">5+</div>
									<div class="text-[11px] text-neutral-400">Years Engineering</div>
								</div>
								<div class="p-3 rounded-xl bg-white/[0.03] border border-white/5">
									<div class="text-lg font-bold text-sky-400">60 FPS</div>
									<div class="text-[11px] text-neutral-400">Spatial Smoothness</div>
								</div>
								<div class="p-3 rounded-xl bg-white/[0.03] border border-white/5">
									<div class="text-lg font-bold text-white">30+</div>
									<div class="text-[11px] text-neutral-400">Shipped Projects</div>
								</div>
								<div class="p-3 rounded-xl bg-white/[0.03] border border-white/5">
									<div class="text-lg font-bold text-emerald-400">99.9%</div>
									<div class="text-[11px] text-neutral-400">System Reliability</div>
								</div>
							</div>

							<!-- Quick Action Buttons -->
							<div class="flex gap-2">
								<button
									type="button"
									onclick={() => setActiveTab('projects')}
									class="flex-1 py-2.5 px-3 rounded-xl bg-sky-500 text-neutral-950 font-semibold text-xs tracking-wide flex items-center justify-center gap-1.5 hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/20"
								>
									Explore Projects
									<ChevronRight size={13} />
								</button>
								<button
									type="button"
									onclick={() => setActiveTab('contact')}
									class="py-2.5 px-3 rounded-xl bg-white/10 text-white font-medium text-xs tracking-wide flex items-center justify-center gap-1.5 hover:bg-white/15 transition-colors border border-white/10"
								>
									Connect
								</button>
							</div>
						</div>

					<!-- ==================== ABOUT TAB ==================== -->
					{:else if $activeTab === 'about'}
						<div class="space-y-3.5">
							<div class="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider">
								<User size={14} />
								The Architect Behind the Screen
							</div>

							<div class="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
								<h2 class="text-lg font-bold text-white">Designing at the Edge of Performance</h2>
								<p class="text-xs text-neutral-300 leading-relaxed">
									I specialize in converging high-level spatial visual storytelling with resilient distributed systems. My focus centers on creating frictionless digital experiences that mirror the precision of native desktop applications.
								</p>
								<p class="text-xs text-neutral-400 leading-relaxed">
									Whether architecting multi-layer viewport pipelines, fine-tuning sub-millisecond rendering loops, or developing cloud microservices, my work reflects a commitment to simplicity, elegance, and extreme performance.
								</p>
							</div>

							<div class="space-y-2">
								<div class="text-xs font-semibold text-white tracking-wide">Core Principles</div>
								<div class="space-y-1.5">
									<div class="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5">
										<div class="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0"></div>
										<div>
											<div class="text-xs font-medium text-white">Spatial Composability</div>
											<div class="text-[11px] text-neutral-400">Layered DOM orchestration over heavy 3D runtimes for maximum battery life.</div>
										</div>
									</div>
									<div class="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5">
										<div class="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0"></div>
										<div>
											<div class="text-xs font-medium text-white">Frame-Budget Fidelity</div>
											<div class="text-[11px] text-neutral-400">Predictable 60fps execution with zero layout shifts and optimized paint cycles.</div>
										</div>
									</div>
								</div>
							</div>
						</div>

					<!-- ==================== EXPERIENCE TAB ==================== -->
					{:else if $activeTab === 'experience'}
						<div class="space-y-3.5">
							<div class="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider">
								<Briefcase size={14} />
								Studio Wall & Timeline
							</div>

							<!-- Timeline Nodes -->
							<div class="relative pl-5 border-l border-white/10 space-y-4 my-2">
								<!-- Node 1 -->
								<div class="relative">
									<div class="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-sky-400 border-2 border-neutral-950 shadow-[0_0_8px_rgba(56,189,248,0.8)]"></div>
									<div class="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
										<div class="flex items-center justify-between text-[11px] text-sky-400 font-medium">
											<span>Lead Creative Technologist</span>
											<span>2023 - Present</span>
										</div>
										<div class="text-xs font-bold text-white">Spatial Studio Lab</div>
										<p class="text-[11px] text-neutral-400 leading-relaxed">
											Orchestrated multi-threaded web canvases, real-time spatial presentation frameworks, and modern Svelte 5 application ecosystems.
										</p>
									</div>
								</div>

								<!-- Node 2 -->
								<div class="relative">
									<div class="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-neutral-600 border-2 border-neutral-950"></div>
									<div class="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
										<div class="flex items-center justify-between text-[11px] text-sky-400 font-medium">
											<span>Senior Full-Stack Engineer</span>
											<span>2021 - 2023</span>
										</div>
										<div class="text-xs font-bold text-white">Vanguard Cloud Tech</div>
										<p class="text-[11px] text-neutral-400 leading-relaxed">
											Architected low-latency microservices, real-time streaming dashboards, and reactive client interfaces scaled to over 500k users.
										</p>
									</div>
								</div>

								<!-- Node 3 -->
								<div class="relative">
									<div class="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-neutral-700 border-2 border-neutral-950"></div>
									<div class="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
										<div class="flex items-center justify-between text-[11px] text-sky-400 font-medium">
											<span>B.S. in Computer Science</span>
											<span>2017 - 2021</span>
										</div>
										<div class="text-xs font-bold text-white">University Tech Institute</div>
										<p class="text-[11px] text-neutral-400 leading-relaxed">
											Focused on Distributed Computing, Computer Graphics, Algorithm Analysis, and Human-Computer Interaction.
										</p>
									</div>
								</div>
							</div>
						</div>

					<!-- ==================== PROJECTS TAB ==================== -->
					{:else if $activeTab === 'projects'}
						<div class="space-y-3.5">
							<div class="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider">
								<Code2 size={14} />
								Demo Station & Projects
							</div>

							<div class="space-y-3">
								<!-- Project 1 -->
								<div class="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:border-sky-400/40 transition-colors">
									<div class="flex items-start justify-between gap-2">
										<div>
											<h3 class="text-xs font-bold text-white">Keynote Spatial Portfolio</h3>
											<p class="text-[11px] text-neutral-400">Apple Keynote inspired interactive 4-layer stage</p>
										</div>
										<span class="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-500/20 text-sky-300 border border-sky-400/30">
											Svelte 5
										</span>
									</div>
									<div class="flex flex-wrap gap-1.5 pt-1">
										<span class="px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-neutral-300">GSAP 3D</span>
										<span class="px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-neutral-300">Tailwind CSS</span>
										<span class="px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-neutral-300">Alpha WebM</span>
									</div>
									<div class="pt-1 flex items-center gap-2">
										<a
											href="https://github.com/p8kaushal/portfolio-website"
											target="_blank"
											rel="noopener noreferrer"
											class="text-[11px] text-sky-400 hover:text-sky-300 inline-flex items-center gap-1 font-medium"
										>
											Source Code <ExternalLink size={11} />
										</a>
									</div>
								</div>

								<!-- Project 2 -->
								<div class="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:border-sky-400/40 transition-colors">
									<div class="flex items-start justify-between gap-2">
										<div>
											<h3 class="text-xs font-bold text-white">Hyperion Cloud Orchestrator</h3>
											<p class="text-[11px] text-neutral-400">Zero-downtime microservice orchestration mesh</p>
										</div>
										<span class="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
											Rust
										</span>
									</div>
									<div class="flex flex-wrap gap-1.5 pt-1">
										<span class="px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-neutral-300">WebSockets</span>
										<span class="px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-neutral-300">Docker</span>
										<span class="px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-neutral-300">gRPC</span>
									</div>
									<div class="pt-1 flex items-center gap-2">
										<a
											href="#projects"
											class="text-[11px] text-sky-400 hover:text-sky-300 inline-flex items-center gap-1 font-medium"
										>
											System Spec <ExternalLink size={11} />
										</a>
									</div>
								</div>

								<!-- Project 3 -->
								<div class="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:border-sky-400/40 transition-colors">
									<div class="flex items-start justify-between gap-2">
										<div>
											<h3 class="text-xs font-bold text-white">Aero Engine 3D Canvas</h3>
											<p class="text-[11px] text-neutral-400">Sub-surface scattering & physics playground</p>
										</div>
										<span class="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
											WebGL
										</span>
									</div>
									<div class="flex flex-wrap gap-1.5 pt-1">
										<span class="px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-neutral-300">Three.js</span>
										<span class="px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-neutral-300">GLSL</span>
										<span class="px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-neutral-300">Physics</span>
									</div>
								</div>
							</div>
						</div>

					<!-- ==================== SKILLS TAB ==================== -->
					{:else if $activeTab === 'skills'}
						<div class="space-y-3.5">
							<div class="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider">
								<Terminal size={14} />
								Document Station // Technical Skillset
							</div>

							<div class="space-y-2.5">
								<!-- Frontend Group -->
								<div class="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
									<div class="text-xs font-bold text-white flex items-center gap-1.5">
										<span class="w-2 h-2 rounded-full bg-sky-400"></span>
										Frontend & Spatial Engineering
									</div>
									<div class="flex flex-wrap gap-1.5">
										{#each ['Svelte 5', 'SvelteKit', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Next.js', 'Vite'] as skill}
											<span class="px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20 text-[11px]">
												{skill}
											</span>
										{/each}
									</div>
								</div>

								<!-- 3D & Graphics -->
								<div class="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
									<div class="text-xs font-bold text-white flex items-center gap-1.5">
										<span class="w-2 h-2 rounded-full bg-purple-400"></span>
										Graphics, Media & Visuals
									</div>
									<div class="flex flex-wrap gap-1.5">
										{#each ['WebGL', 'Three.js', 'Canvas 2D', 'Video Keying', 'FFmpeg', 'CSS 3D Transforms'] as skill}
											<span class="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[11px]">
												{skill}
											</span>
										{/each}
									</div>
								</div>

								<!-- Backend & Systems -->
								<div class="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
									<div class="text-xs font-bold text-white flex items-center gap-1.5">
										<span class="w-2 h-2 rounded-full bg-emerald-400"></span>
										Backend, Clouds & Infrastructure
									</div>
									<div class="flex flex-wrap gap-1.5">
										{#each ['Node.js', 'Go', 'Rust', 'PostgreSQL', 'Redis', 'Docker', 'REST / GraphQL'] as skill}
											<span class="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[11px]">
												{skill}
											</span>
										{/each}
									</div>
								</div>
							</div>
						</div>

					<!-- ==================== RESUME TAB ==================== -->
					{:else if $activeTab === 'resume'}
						<div class="space-y-3.5">
							<div class="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider">
								<FileText size={14} />
								Curriculum Vitae Sheet
							</div>

							<!-- Document Sheet Mockup -->
							<div class="p-4 rounded-2xl bg-neutral-900 border border-white/15 shadow-xl space-y-3 text-neutral-300">
								<div class="border-b border-white/10 pb-2.5">
									<h2 class="text-sm font-bold text-white">Parth Kaushal</h2>
									<p class="text-[11px] text-sky-400">Staff-Level Creative Software Engineer</p>
									<p class="text-[10px] text-neutral-400">Silicon Valley & Remote</p>
								</div>

								<div class="space-y-1">
									<div class="text-[11px] font-bold text-white uppercase tracking-wider">Summary</div>
									<p class="text-[11px] text-neutral-400 leading-relaxed">
										8+ years architecting performant frontends, high-fps interactive web products, and scalable microservices.
									</p>
								</div>

								<div class="space-y-1">
									<div class="text-[11px] font-bold text-white uppercase tracking-wider">Key Roles</div>
									<div class="text-[11px] text-neutral-300">Lead Technologist — Spatial Studio Lab</div>
									<div class="text-[10px] text-neutral-400">2023 - Present</div>
									<div class="text-[11px] text-neutral-300 mt-1">Full-Stack Architect — Vanguard Cloud</div>
									<div class="text-[10px] text-neutral-400">2021 - 2023</div>
								</div>

								<!-- Anchored Download PDF button -->
								<div class="pt-2">
									<a
										href="/Parth_Kaushal_Resume.pdf"
										download
										class="w-full py-2.5 px-3 rounded-xl bg-sky-500 text-neutral-950 font-semibold text-xs tracking-wide flex items-center justify-center gap-2 hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/20"
									>
										<Download size={14} />
										Download Complete PDF
									</a>
								</div>
							</div>
						</div>

					<!-- ==================== ACHIEVEMENTS TAB ==================== -->
					{:else if $activeTab === 'achievements'}
						<div class="space-y-3.5">
							<div class="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider">
								<Award size={14} />
								The Wall Gallery // Honors
							</div>

							<div class="space-y-2.5">
								<!-- Award 1 -->
								<div class="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 hover:border-amber-400/40 transition-colors">
									<div class="p-2 rounded-lg bg-amber-400/10 text-amber-300 border border-amber-400/20 shrink-0">
										<Award size={18} />
									</div>
									<div class="space-y-0.5">
										<div class="text-xs font-bold text-white">Global Innovation Hackathon Winner</div>
										<div class="text-[10px] text-amber-300">1st Place — Spatial Web Experience (2024)</div>
										<p class="text-[11px] text-neutral-400">Awarded for fastest frame-rate interactive canvas application.</p>
									</div>
								</div>

								<!-- Award 2 -->
								<div class="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 hover:border-sky-400/40 transition-colors">
									<div class="p-2 rounded-lg bg-sky-400/10 text-sky-300 border border-sky-400/20 shrink-0">
										<Sparkles size={18} />
									</div>
									<div class="space-y-0.5">
										<div class="text-xs font-bold text-white">Awwwards Site of the Day Candidate</div>
										<div class="text-[10px] text-sky-300">Developer Category (2025)</div>
										<p class="text-[11px] text-neutral-400">Nominated for 4-layer composition and zero-WebGL performance.</p>
									</div>
								</div>

								<!-- Award 3 -->
								<div class="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 hover:border-emerald-400/40 transition-colors">
									<div class="p-2 rounded-lg bg-emerald-400/10 text-emerald-300 border border-emerald-400/20 shrink-0">
										<GraduationCap size={18} />
									</div>
									<div class="space-y-0.5">
										<div class="text-xs font-bold text-white">AWS Certified Solutions Architect</div>
										<div class="text-[10px] text-emerald-300">Professional Level</div>
										<p class="text-[11px] text-neutral-400">High-availability distributed cloud systems engineering.</p>
									</div>
								</div>
							</div>
						</div>

					<!-- ==================== CONTACT TAB ==================== -->
					{:else if $activeTab === 'contact'}
						<div class="space-y-3.5">
							<div class="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider">
								<Mail size={14} />
								Direct Line // Smartphone Dispatch
							</div>

							<!-- Contact App Tiles -->
							<div class="grid grid-cols-2 gap-2.5">
								<!-- Email Tile -->
								<button
									type="button"
									onclick={copyEmail}
									class="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-sky-400/40 transition-all text-left space-y-2 group"
								>
									<div class="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-400/30 flex items-center justify-center group-hover:scale-110 transition-transform">
										<Mail size={16} />
									</div>
									<div>
										<div class="text-xs font-bold text-white">Email</div>
										<div class="text-[10px] text-neutral-400 truncate">
											{copiedEmail ? 'Copied to Clipboard!' : 'parth@example.com'}
										</div>
									</div>
								</button>

								<!-- GitHub Tile -->
								<a
									href="https://github.com/p8kaushal"
									target="_blank"
									rel="noopener noreferrer"
									class="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-sky-400/40 transition-all space-y-2 group block"
								>
									<div class="w-8 h-8 rounded-xl bg-white/10 text-white border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
										<svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
											<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
										</svg>
									</div>
									<div>
										<div class="text-xs font-bold text-white">GitHub</div>
										<div class="text-[10px] text-neutral-400 truncate">@p8kaushal</div>
									</div>
								</a>

								<!-- LinkedIn Tile -->
								<a
									href="https://linkedin.com"
									target="_blank"
									rel="noopener noreferrer"
									class="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-sky-400/40 transition-all space-y-2 group block"
								>
									<div class="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
										<svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
											<path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z" />
										</svg>
									</div>
									<div>
										<div class="text-xs font-bold text-white">LinkedIn</div>
										<div class="text-[10px] text-neutral-400 truncate">Parth Kaushal</div>
									</div>
								</a>

								<!-- X / Twitter Tile -->
								<a
									href="https://twitter.com"
									target="_blank"
									rel="noopener noreferrer"
									class="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-sky-400/40 transition-all space-y-2 group block"
								>
									<div class="w-8 h-8 rounded-xl bg-neutral-800 text-neutral-200 border border-white/15 flex items-center justify-center group-hover:scale-110 transition-transform">
										<svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
											<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
										</svg>
									</div>
									<div>
										<div class="text-xs font-bold text-white">X / Twitter</div>
										<div class="text-[10px] text-neutral-400 truncate">@p8kaushal</div>
									</div>
								</a>
							</div>

							<!-- Availability Pill -->
							<div class="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs">
								<span class="text-neutral-400">Collaboration Status</span>
								<span class="inline-flex items-center gap-1 text-emerald-400 font-medium">
									<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
									Open to Projects
								</span>
							</div>
						</div>
					{/if}
				</div>
			{/key}
		</div>

		<!-- Tablet Bottom Bezel: Home Indicator Bar -->
		<div class="py-2.5 flex justify-center shrink-0">
			<div class="w-32 h-1 rounded-full bg-white/30"></div>
		</div>
	</div>
</aside>

<style>
	/* Hide scrollbar for clean tablet viewport */
	.scrollbar-none::-webkit-scrollbar {
		display: none;
	}
	.scrollbar-none {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
