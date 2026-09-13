<script lang="ts">
	import '../app.css';
	import { activeTab as activeSection } from '$lib/stores/navStore';
	import Navbar from '$lib/components/Navbar.svelte';
	import ExperienceTV from '$lib/components/ExperienceTV.svelte';
	import ProjectsGrid from '$lib/components/ProjectsGrid.svelte';
	import SkillsSheet from '$lib/components/SkillsSheet.svelte';
	import ResumeSheet from '$lib/components/ResumeSheet.svelte';
	import AchievementsWall from '$lib/components/AchievementsWall.svelte';
	import ContactPhone from '$lib/components/ContactPhone.svelte';
	import { SECTIONS } from '$lib/constants/assets';
	import { ArrowRight } from 'lucide-svelte';
	import { setTab } from '$lib/stores/navStore';

	let { children } = $props();

	let activeSectionKey = $derived(($activeSection as keyof typeof SECTIONS) || 'home');
	let activeImageSrc = $derived(SECTIONS[activeSectionKey]?.image || '/bg-office-center.jpg');
</script>

<main class="relative w-screen h-screen overflow-hidden bg-black select-none">
	<!-- Navbar -->
	<Navbar />

	<!-- Active Stage Layer -->
	<div id="stage-active" class="absolute inset-0 w-full h-full z-10 pointer-events-auto">
		<img
			id="active-bg-img"
			src={activeImageSrc}
			class="w-full h-full object-cover"
			alt="Stage Background"
		/>

		<!-- Presenter Video Avatars (Z-Index 30) -->
		{#if $activeSection === 'home'}
			<div class="absolute left-1/2 bottom-0 -translate-x-1/2 z-30 pointer-events-none">
				<video
					src="/presenter-home.webm"
					autoplay
					loop
					muted
					playsinline
					class="h-[82vh] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
				></video>
			</div>

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
		{:else if $activeSection === 'about'}
			<div class="absolute left-[12%] bottom-0 z-30 pointer-events-none">
				<video
					src="/presenter-about.webm"
					autoplay
					loop
					muted
					playsinline
					class="h-[82vh] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
				></video>
			</div>

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
		{:else if $activeSection === 'experience'}
			<ExperienceTV isActive={$activeSection === 'experience'} />
		{:else if $activeSection === 'projects'}
			<ProjectsGrid />
		{:else if $activeSection === 'skills'}
			<SkillsSheet />
		{:else if $activeSection === 'resume'}
			<ResumeSheet />
		{:else if $activeSection === 'achievements'}
			<AchievementsWall />
		{:else if $activeSection === 'contact'}
			<ContactPhone />
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
