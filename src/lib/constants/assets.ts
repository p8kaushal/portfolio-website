export interface SectionConfig {
	index: number;
	label: string;
	image: string;
	presenter: string | null;
}

export const SECTIONS: Record<string, SectionConfig> = {
	about: { index: 0, label: 'About', image: '/bg-office-left.jpg', presenter: '/videos/presenter-about-transparent.webm' },
	home: { index: 1, label: 'Home', image: '/bg-office-center.jpg', presenter: '/videos/presenter-transparent.webm' },
	experience: { index: 2, label: 'Experience', image: '/bg-experience-macro.jpg', presenter: null },
	projects: { index: 3, label: 'Projects', image: '/bg-projects-macro.jpg', presenter: null },
	skills: { index: 4, label: 'Skills', image: '/bg-desk-macro.jpg', presenter: null },
	resume: { index: 5, label: 'Resume', image: '/bg-desk-macro.jpg', presenter: null },
	achievements: { index: 6, label: 'Achievements', image: '/bg-wall-awards-macro.jpg', presenter: null },
	contact: { index: 7, label: 'Contact', image: '/bg-office-right.jpg', presenter: null }
};

export const SPATIAL_FLOOR_PLAN = SECTIONS;
export const PORTFOLIO_ASSETS = SECTIONS;
export const ASSETS = {
	ROOM_CENTER: '/bg-office-center.jpg',
	ROOM_LEFT: '/bg-office-left.jpg',
	ROOM_RIGHT: '/bg-office-right.jpg',
	MACRO_EXPERIENCE: '/bg-experience-macro.jpg',
	MACRO_PROJECTS: '/bg-projects-macro.jpg',
	MACRO_DESK: '/bg-desk-macro.jpg',
	MACRO_AWARDS: '/bg-wall-awards-macro.jpg',
	PRESENTER_HOME: '/videos/presenter-transparent.webm',
	PRESENTER_ABOUT: '/videos/presenter-about-transparent.webm'
} as const;
