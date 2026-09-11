import { writable } from 'svelte/store';

export type Tab =
	| 'home'
	| 'about'
	| 'experience'
	| 'projects'
	| 'skills'
	| 'resume'
	| 'achievements'
	| 'contact';

export interface TabItem {
	id: Tab;
	label: string;
}

export const TABS: readonly TabItem[] = [
	{ id: 'home', label: 'Home' },
	{ id: 'about', label: 'About' },
	{ id: 'experience', label: 'Experience' },
	{ id: 'projects', label: 'Projects' },
	{ id: 'skills', label: 'Skills' },
	{ id: 'resume', label: 'Resume' },
	{ id: 'achievements', label: 'Achievements' },
	{ id: 'contact', label: 'Contact' }
] as const;

export const activeTab = writable<Tab>('home');
export const isMuted = writable<boolean>(true);

export function setActiveTab(tab: Tab): void {
	activeTab.set(tab);
}

export function toggleMute(): void {
	isMuted.update((muted) => !muted);
}
