<script lang="ts">
	import { activeTab, isMuted, setTab, toggleMute, type TabType } from '$lib/stores/navStore';
	import { playSound } from '$lib/utils/soundEngine';
	import { Volume2, VolumeX } from 'lucide-svelte';

	const tabs: { id: TabType; label: string }[] = [
		{ id: 'home', label: 'Home' },
		{ id: 'about', label: 'About' },
		{ id: 'experience', label: 'Experience' },
		{ id: 'projects', label: 'Projects' },
		{ id: 'skills', label: 'Skills' },
		{ id: 'resume', label: 'Resume' },
		{ id: 'achievements', label: 'Achievements' },
		{ id: 'contact', label: 'Contact' }
	];

	function handleTabClick(tabId: TabType) {
		setTab(tabId);
		playSound('click');
	}

	function handleMuteToggle() {
		toggleMute();
		playSound('click');
	}
</script>

<nav class="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-[95vw] sm:max-w-none">
	<div
		class="backdrop-blur-2xl bg-white/75 border border-white/60 text-neutral-900 shadow-2xl rounded-full px-6 py-2.5 flex items-center gap-6 overflow-x-auto no-scrollbar"
	>
		<div class="flex items-center gap-1.5 sm:gap-2">
			{#each tabs as tab}
				<button
					type="button"
					onclick={() => handleTabClick(tab.id)}
					class="px-3.5 py-1 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer hover:bg-neutral-200/60 {$activeTab === tab.id
						? 'bg-sky-500/15 text-sky-700 font-semibold rounded-full px-3.5 py-1 transition-all duration-300 shadow-xs'
						: 'text-neutral-600 hover:text-neutral-900'}"
				>
					{tab.label}
				</button>
			{/each}
		</div>

		<div class="h-4 w-px bg-neutral-300/80 mx-1 shrink-0"></div>

		<button
			type="button"
			onclick={handleMuteToggle}
			class="p-1.5 rounded-full text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50 transition-colors cursor-pointer shrink-0"
			aria-label={$isMuted ? 'Unmute Audio' : 'Mute Audio'}
		>
			{#if $isMuted}
				<VolumeX class="w-4 h-4 text-neutral-500" />
			{:else}
				<Volume2 class="w-4 h-4 text-sky-600" />
			{/if}
		</button>
	</div>
</nav>
