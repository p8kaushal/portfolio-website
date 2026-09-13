<script lang="ts">
	import { activeTab, isMuted, setTab, toggleMute, type TabType } from '$lib/stores/navStore';
	import { playSound } from '$lib/utils/soundEngine';
	import { Volume2, VolumeX, Briefcase, User, Home, Code, FileText, Trophy, Mail, Layers } from 'lucide-svelte';

	const tabs: { id: TabType; label: string; icon: any }[] = [
		{ id: 'home', label: 'Home', icon: Home },
		{ id: 'about', label: 'About', icon: User },
		{ id: 'experience', label: 'Experience', icon: Briefcase },
		{ id: 'projects', label: 'Projects', icon: Code },
		{ id: 'skills', label: 'Skills', icon: Layers },
		{ id: 'resume', label: 'Resume', icon: FileText },
		{ id: 'achievements', label: 'Awards', icon: Trophy },
		{ id: 'contact', label: 'Contact', icon: Mail }
	];

	import { playExperienceTransition, resetStageToHome } from '$lib/animations/cameraChoreography';

	function selectTab(tabId: TabType) {
		playSound('click');
		if ($activeTab === tabId) return;

		if (tabId === 'experience') {
			playExperienceTransition(() => {
				setTab('experience');
			});
		} else {
			if (tabId === 'home' || tabId === 'about') {
				resetStageToHome();
			}
			setTab(tabId);
		}
	}
</script>

<div class="block md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[92vw]">
	<div class="backdrop-blur-2xl bg-white/85 border border-white/70 shadow-2xl rounded-3xl p-4 text-neutral-900">
		<div class="flex items-center justify-between pb-3 border-b border-neutral-200/80 mb-3">
			<div class="flex items-center gap-2">
				<div class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
				<span class="text-xs font-semibold uppercase tracking-wider text-neutral-600">Keynote Studio Tablet</span>
			</div>
			<button
				type="button"
				onclick={() => { toggleMute(); playSound('click'); }}
				class="p-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
			>
				{#if $isMuted}
					<VolumeX class="w-4 h-4 text-neutral-500" />
				{:else}
					<Volume2 class="w-4 h-4 text-sky-600" />
				{/if}
			</button>
		</div>

		<div class="grid grid-cols-4 gap-2">
			{#each tabs as tab}
				<button
					type="button"
					onclick={() => selectTab(tab.id)}
					class="flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-200 {$activeTab === tab.id
						? 'bg-sky-500/20 text-sky-800 font-bold border border-sky-400/40 shadow-xs'
						: 'bg-neutral-100/70 text-neutral-600 hover:bg-neutral-200/50'}"
				>
					<span class="w-4 h-4 mb-1 flex items-center justify-center">
						<tab.icon class="w-4 h-4" />
					</span>
					<span class="text-[10px] font-medium leading-none">{tab.label}</span>
				</button>
			{/each}
		</div>
	</div>
</div>
