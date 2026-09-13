<script lang="ts">
	import { activeTab, isMuted, setTab, toggleMute, type TabType } from '$lib/stores/navStore';
	import { Volume2, VolumeX, Settings } from 'lucide-svelte';
	import { handleSectionTransition } from '$lib/animations/cameraChoreography';
	import { SECTIONS } from '$lib/constants/assets';
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

<nav class="fixed top-6 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] transition-all duration-700 {ready ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'}">
	<!-- Outer Apple Glass Capsule -->
	<div
		class="flex items-center gap-1.5 p-1.5 rounded-full bg-white/70 backdrop-blur-[var(--glass-blur,24px)] border border-white/90 shadow-[0_16px_48px_rgba(0,0,0,0.18)] overflow-x-auto no-scrollbar"
	>
		<div class="flex items-center gap-1">
			{#each tabs as tab}
				<button
					type="button"
					onclick={() => handleTabClick(tab.id)}
					style="color: {$activeTab === tab.id ? '#020617' : '#0f172a'}; font-weight: {$activeTab === tab.id ? '800' : '700'};"
					class="relative px-4 py-2 rounded-full text-xs tracking-wide transition-all duration-300 whitespace-nowrap cursor-pointer {$activeTab === tab.id
						? 'bg-white text-slate-950 font-black shadow-[0_4px_16px_rgba(0,0,0,0.18)] border border-white scale-105'
						: 'text-slate-950 font-bold hover:text-black hover:bg-white/40 transition-colors'}"
				>
					{tab.label}
				</button>
			{/each}
		</div>

		<div class="h-4 w-px bg-slate-400/40 mx-1 shrink-0"></div>

		<div class="flex items-center gap-1 shrink-0">
			<button
				type="button"
				onclick={handleMuteToggle}
				class="p-2 rounded-full text-slate-950 hover:text-black hover:bg-white/40 transition-colors cursor-pointer"
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
				class="p-2 rounded-full text-slate-950 hover:text-black hover:bg-white/40 transition-colors cursor-pointer"
				aria-label="Settings"
			>
				<Settings class="w-4 h-4 text-slate-950" />
			</button>
		</div>
	</div>
</nav>

{#if isSettingsOpen}
	<SettingsPanel onClose={() => isSettingsOpen = false} />
{/if}
