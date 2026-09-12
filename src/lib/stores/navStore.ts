import { writable } from 'svelte/store';

export type TabType = 'home' | 'about' | 'experience' | 'projects' | 'skills' | 'resume' | 'achievements' | 'contact';

export const activeTab = writable<TabType>('home');
export const isMuted = writable<boolean>(true);

export const setTab = (tab: TabType) => {
	activeTab.set(tab);
};

export const toggleMute = () => {
	isMuted.update((m) => !m);
};
