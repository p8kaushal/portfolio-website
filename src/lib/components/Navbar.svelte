<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import {
		activeTab,
		isMuted,
		setActiveTab,
		toggleMute,
		TABS,
		type Tab
	} from '$lib/stores/navStore';
	import { Volume2, VolumeX } from 'lucide-svelte';

	let {
		onTabChange,
		onAudioToggle
	}: {
		onTabChange?: (tab: Tab) => void;
		onAudioToggle?: (muted: boolean) => void;
	} = $props();

	const dispatch = createEventDispatcher<{
		tabChange: { tab: Tab };
		audioToggle: { isMuted: boolean };
	}>();

	function handleTabClick(tabId: Tab) {
		setActiveTab(tabId);
		dispatch('tabChange', { tab: tabId });
		onTabChange?.(tabId);
	}

	function handleAudioToggle() {
		toggleMute();
		dispatch('audioToggle', { isMuted: !$isMuted });
		onAudioToggle?.(!$isMuted);
	}
</script>

<nav
	aria-label="Main Navigation"
	class="fixed top-4 left-1/2 -translate-x-1/2 z-50 backdrop-blur-xl bg-white/75 border border-white/60 text-neutral-900 shadow-2xl rounded-full px-6 py-2.5 flex items-center gap-6 max-w-[96vw] overflow-x-auto scrollbar-none"
>
	<!-- Tab Navigation List -->
	<ul class="flex items-center gap-1 sm:gap-1.5 m-0 p-0 list-none">
		{#each TABS as tab (tab.id)}
			{@const isActive = $activeTab === tab.id}
			<li>
				<button
					type="button"
					onclick={() => handleTabClick(tab.id)}
					aria-current={isActive ? 'page' : undefined}
					class="relative text-xs sm:text-sm tracking-wide whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 {isActive
						? 'bg-sky-500/15 text-sky-700 font-semibold rounded-full px-3.5 py-1 transition-all duration-300'
						: 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-900/5 font-medium rounded-full px-3.5 py-1 transition-all duration-300'}"
				>
					{tab.label}
				</button>
			</li>
		{/each}
	</ul>

	<!-- Divider -->
	<div class="h-4 w-px bg-neutral-300/80 shrink-0" aria-hidden="true"></div>

	<!-- Far-right edge: Mute / Unmute Button -->
	<button
		type="button"
		onclick={handleAudioToggle}
		aria-label={$isMuted ? 'Unmute audio' : 'Mute audio'}
		title={$isMuted ? 'Unmute audio' : 'Mute audio'}
		class="relative p-1.5 rounded-full text-neutral-600 hover:text-neutral-900 hover:bg-neutral-900/5 hover:scale-110 active:scale-95 transition-all duration-200 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 cursor-pointer"
	>
		{#if $isMuted}
			<VolumeX size={18} class="text-neutral-600 hover:text-neutral-900 transition-colors" />
		{:else}
			<Volume2 size={18} class="text-sky-600 transition-colors animate-pulse" />
		{/if}
	</button>
</nav>

<style>
	/* Hide scrollbar for Chrome, Safari and Opera */
	.scrollbar-none::-webkit-scrollbar {
		display: none;
	}
	/* Hide scrollbar for IE, Edge and Firefox */
	.scrollbar-none {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
