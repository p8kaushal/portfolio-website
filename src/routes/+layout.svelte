<script lang="ts">
	import "../app.css";
	import { activeTab as activeSection } from "$lib/stores/navStore";
	import Navbar from "$lib/components/Navbar.svelte";
	import ExperienceTV from "$lib/components/ExperienceTV.svelte";
	import ProjectsGrid from "$lib/components/ProjectsGrid.svelte";
	import SkillsSheet from "$lib/components/SkillsSheet.svelte";
	import ResumeSheet from "$lib/components/ResumeSheet.svelte";
	import AchievementsWall from "$lib/components/AchievementsWall.svelte";
	import ContactPhone from "$lib/components/ContactPhone.svelte";
	import WelcomeOverlay from "$lib/components/WelcomeOverlay.svelte";
	import { playVerticalCraneDrop } from "$lib/animations/introChoreography";
	import { SECTIONS } from "$lib/constants/assets";
	import { ArrowRight } from "lucide-svelte";
	import { setTab } from "$lib/stores/navStore";
	import { glassSettings } from "$lib/stores/glassSettings";

	let { children } = $props();

	let welcomeActive = $state(true);
	let navReady = $state(true);

	function handleDescend() {
		playVerticalCraneDrop(() => {
			welcomeActive = false;
		});
	}

	let activeSectionKey = $derived(($activeSection as keyof typeof SECTIONS) || "home");
	let activeImageSrc = $derived(SECTIONS[activeSectionKey]?.image || "/bg-office-center.jpg");
</script>

<main
	class="relative w-screen h-screen overflow-hidden bg-black select-none"
	style="--glass-blur: {$glassSettings.blur}px; --glass-opacity: {$glassSettings.opacity};"
>
	<!-- Keynote Welcome Overlay -->
	{#if welcomeActive}
		<WelcomeOverlay onDescend={handleDescend} />
	{/if}

	<!-- Split Floating Apple Glass Navbar -->
	<Navbar ready={navReady} />

	<!-- Active Stage Layer -->
	<div id="stage-active" class="absolute inset-0 w-full h-full z-10 pointer-events-auto overflow-hidden bg-black">
		<img
			id="active-bg-img"
			src={activeImageSrc}
			class="w-full h-full object-cover"
			alt="Stage Background"
		/>

		<!-- Presenter Videos (Raw Black Background at z-index: 30) -->
		{#if $activeSection === "home"}
			<video
				id="presenter-avatar-home"
				src="/presenter-home.webm"
				autoplay
				loop
				muted
				playsinline
				class="absolute left-1/2 bottom-0 -translate-x-1/2 h-[82vh] w-auto object-contain z-30 pointer-events-none"
			></video>

			<div id="home-stage-root" class="floating-glass-card absolute inset-0 z-30 flex items-center justify-between px-10 md:px-16 pointer-events-none hidden sm:flex">
				<!-- Left Glass Card -->
				<div
					id="home-card-left"
					style="background-color: rgba(255, 255, 255, {$glassSettings.opacity}); backdrop-filter: blur({$glassSettings.blur}px); -webkit-backdrop-filter: blur({$glassSettings.blur}px);"
					class="home-glass-card pointer-events-auto border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-3xl p-6 text-slate-900 w-80 transition-all duration-200 backdrop-blur-2xl"
				>
					<span class="inline-block px-3 py-1 rounded-full bg-sky-500/10 text-sky-700 text-xs font-mono font-semibold uppercase tracking-wider mb-2">STAGE 01</span>
					<h1 class="text-2xl font-black text-slate-900 mb-1">PARTH KAUSHAL</h1>
					<p class="text-xs font-bold text-sky-700 mb-3">Senior Systems Architect</p>
					<div class="flex items-center gap-2 p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-semibold">
						<span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0"></span> Available for Architecture Roles
					</div>
				</div>

				<!-- Center Presenter Slot Reserved -->

				<!-- Right Glass Card -->
				<div
					id="home-card-right"
					style="background-color: rgba(255, 255, 255, {$glassSettings.opacity}); backdrop-filter: blur({$glassSettings.blur}px); -webkit-backdrop-filter: blur({$glassSettings.blur}px);"
					class="home-glass-card pointer-events-auto border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-3xl p-6 text-slate-900 w-80 transition-all duration-200 backdrop-blur-2xl"
				>
					<h3 class="text-sm font-bold uppercase tracking-wider text-slate-600 mb-2">Executive Overview</h3>
					<p class="text-xs text-slate-700 leading-relaxed mb-4">
						Building cinematic 2D spatial web experiences with SvelteKit, GSAP camera choreography, and high-performance WebM video avatars.
					</p>
					<div class="flex gap-2">
						<button
							type="button"
							onclick={() => setTab("projects")}
							class="flex-1 py-2 px-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-1 cursor-pointer"
						>
							Projects <ArrowRight class="w-3.5 h-3.5" />
						</button>
						<button
							type="button"
							onclick={() => setTab("experience")}
							class="flex-1 py-2 px-3 rounded-xl bg-white/80 border border-slate-300 text-slate-900 text-xs font-bold hover:bg-white transition-colors flex items-center justify-center gap-1 cursor-pointer"
						>
							Experience
						</button>
					</div>
				</div>
			</div>
		{:else if $activeSection === "about"}
			<video
				src="/presenter-about.webm"
				autoplay
				loop
				muted
				playsinline
				class="absolute left-[12%] bottom-0 h-[82vh] w-auto object-contain z-30 pointer-events-none"
			></video>

			<div class="card-overlay absolute inset-0 z-30 flex items-center justify-end p-6 pointer-events-auto">
				<div
					style="background-color: rgba(255, 255, 255, {$glassSettings.opacity}); backdrop-filter: blur({$glassSettings.blur}px); -webkit-backdrop-filter: blur({$glassSettings.blur}px);"
					class="floating-glass-card border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-3xl p-8 text-slate-900 max-w-xl mr-[6%] transition-all duration-200 backdrop-blur-2xl"
				>
					<span class="inline-block px-3.5 py-1 rounded-full bg-purple-500/10 text-purple-700 text-xs font-semibold uppercase tracking-wider mb-3">About Presenter</span>
					<h2 class="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Architecting Spatial Web</h2>
					<p class="text-sm text-slate-700 leading-relaxed mb-4">
						Passionate Frontend Engineer specializing in high-performance WebGL, CSS 3D spatial UI, and SvelteKit applications with Apple-grade polish.
					</p>
					<div class="grid grid-cols-2 gap-3 text-xs font-medium text-slate-800 mb-4">
						<div class="p-2.5 rounded-xl bg-white/40 border border-white/60">📍 San Francisco, CA</div>
						<div class="p-2.5 rounded-xl bg-white/40 border border-white/60">🚀 5+ Years Experience</div>
					</div>
					<button
						type="button"
						class="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-md cursor-pointer"
					>
						About Presenter
					</button>
				</div>
			</div>
		{:else if $activeSection === "experience"}
			<ExperienceTV isActive={$activeSection === "experience"} />
		{:else if $activeSection === "projects"}
			<ProjectsGrid />
		{:else if $activeSection === "skills" || $activeSection === "resume"}
			<div id="desk-paper-wrapper" class="absolute inset-0 w-[130%] h-full flex transition-transform duration-100 pointer-events-auto z-30" style="transform: translateX({$activeSection === 'resume' ? '-28%' : '0%'});">
				<SkillsSheet />
				<ResumeSheet />
			</div>
		{:else if $activeSection === "achievements"}
			<AchievementsWall />
		{:else if $activeSection === "contact"}
			<div id="contact-phone-container" class="absolute left-1/2 bottom-12 -translate-x-1/2 z-30 pointer-events-auto">
				<ContactPhone />
			</div>
		{/if}
	</div>

	<!-- Dual-Buffer Pan Layer -->
	<div id="stage-incoming" class="absolute inset-0 w-full h-full z-20 pointer-events-none opacity-0">
		<img id="incoming-bg-img" src="/bg-office-center.jpg" class="w-full h-full object-cover" alt="Incoming Stage" />
	</div>
</main>

{#if children}
	{@render children()}
{/if}
