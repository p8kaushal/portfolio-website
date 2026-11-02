<script lang="ts">
	import { activeTab, isMuted, setTab, toggleMute, isWelcomeCompleted, type TabType } from '$lib/stores/navStore';
	import { systemSettings } from '$lib/stores/glassSettings';
	import { Volume2, VolumeX, Settings } from 'lucide-svelte';
	import { handleSectionTransition } from '$lib/animations/cameraChoreography';
	import SettingsPanel from '$lib/components/SettingsPanel.svelte';

	let { ready = false } = $props<{ ready?: boolean }>();

	let isSettingsOpen = $state(false);

	const tabs: { id: TabType; label: string }[] = [
		{ id: 'about', label: 'About' },
		{ id: 'home', label: 'Home' },
		{ id: 'experience', label: 'Experience' },
		{ id: 'projects', label: 'Projects' },
		{ id: 'skills', label: 'Skills' },
		{ id: 'resume', label: 'Resume' },
		{ id: 'achievements', label: 'Achievements' },
		{ id: 'contact', label: 'Contact' }
	];

	function handleTabClick(tabId: TabType) {
		const current = $activeTab;
		if (current === tabId) return;

		setTab(tabId);
		handleSectionTransition(current, tabId, () => {});
	}

	function handleMuteToggle() {
		toggleMute();
	}
</script>

<!-- Outer Centering Overlay (Handles 100% Horizontal Viewport Centering) -->
<div class="fixed top-3 sm:top-6 left-0 right-0 z-40 flex justify-center pointer-events-none px-2 sm:px-4">
	<nav
		id="main-navbar"
		style="background-color: rgba(255, 255, 255, {$systemSettings.opacity}); backdrop-filter: blur({$systemSettings.blur}px); -webkit-backdrop-filter: blur({$systemSettings.blur}px);"
		class="flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full border border-white/80 shadow-[0_16px_48px_rgba(0,0,0,0.18)] max-w-[96vw] overflow-x-auto no-scrollbar scroll-smooth transition-opacity duration-300 {$isWelcomeCompleted ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}"
	>
		<div class="flex items-center gap-0.5 sm:gap-1 shrink-0">
			{#each tabs as tab}
				<button
					type="button"
					onclick={() => handleTabClick(tab.id)}
					style="color: {$activeTab === tab.id ? '#020617' : '#0f172a'}; font-weight: {$activeTab === tab.id ? '800' : '700'};"
					class="relative px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs tracking-wide shrink-0 transition-all duration-300 whitespace-nowrap cursor-pointer {$activeTab === tab.id
						? 'bg-white text-slate-950 font-black shadow-[0_4px_16px_rgba(0,0,0,0.18)] border border-white scale-105'
						: 'text-slate-950 font-bold hover:text-black hover:bg-white/40 transition-colors'}"
				>
					{tab.label}
				</button>
			{/each}
		</div>

		<div class="h-4 w-px bg-slate-400/40 mx-0.5 sm:mx-1 shrink-0"></div>

		<div class="flex items-center gap-0.5 sm:gap-1 shrink-0">
			<button
				type="button"
				onclick={handleMuteToggle}
				class="p-1.5 sm:p-2 rounded-full text-slate-950 hover:text-black hover:bg-white/40 transition-colors cursor-pointer"
				aria-label={$isMuted ? 'Unmute Audio' : 'Mute Audio'}
			>
				{#if $isMuted}
					<VolumeX class="w-4 h-4 text-slate-700" />
				{:else}
					<Volume2 class="w-4 h-4 text-sky-600" />
				{/if}
			</button>

			<button
				type="button"
				onclick={() => isSettingsOpen = !isSettingsOpen}
				class="p-1.5 sm:p-2 rounded-full text-slate-950 hover:text-black hover:bg-white/40 transition-colors cursor-pointer"
				aria-label="Settings"
			>
				<Settings class="w-4 h-4 text-slate-950" />
			</button>
		</div>
	</nav>
</div>

{#if isSettingsOpen}
	<SettingsPanel onClose={() => isSettingsOpen = false} />
{/if}
