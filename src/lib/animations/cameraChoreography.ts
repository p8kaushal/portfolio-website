import { gsap } from 'gsap';
import { playSound } from '$lib/utils/soundEngine';

export function animateCamera(targetTab: string, containerElement: HTMLElement, currentTab?: string) {
	if (!containerElement) return;

	const backdrop = containerElement.querySelector('.studio-backdrop') as HTMLImageElement;
	const presenter = containerElement.querySelector('.presenter-layer') as HTMLElement;
	const experienceStation = containerElement.querySelector('.experience-station') as HTMLElement;
	const projectsStation = containerElement.querySelector('.projects-station') as HTMLElement;
	const phoneModal = containerElement.querySelector('.phone-modal') as HTMLElement;
	const cardContent = containerElement.querySelector('.card-overlay') as HTMLElement;

	gsap.killTweensOf([containerElement, backdrop, presenter]);

	const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });

	const setBackdropSrc = (src: string) => {
		if (backdrop) backdrop.src = src;
	};

	// STAGE 3: SKILLS <-> RESUME ZERO-ROOM-FLASH PAN
	// When switching between Skills and Resume, stay locked on bg-desk-macro.jpg without reloading/flashing wide room
	if (
		(currentTab === 'skills' && targetTab === 'resume') ||
		(currentTab === 'resume' && targetTab === 'skills')
	) {
		tl.to(containerElement, { filter: 'blur(2px)', duration: 0.15 }, 0);
		if (cardContent) {
			const xTarget = targetTab === 'resume' ? -420 : 0;
			tl.to(cardContent, { x: xTarget, duration: 0.45, ease: 'power2.out' }, 0);
		}
		tl.to(containerElement, { filter: 'blur(0px)', duration: 0.15 }, 0.2);
		return;
	}

	switch (targetTab) {
		case 'home':
			tl.to(containerElement, { filter: 'blur(4px)', duration: 0.25 }, 0);
			tl.to(backdrop, { scale: 1.0, x: 0, y: 0, transformOrigin: '50% 50%', duration: 0.5 }, 0);
			tl.add(() => setBackdropSrc('/bg-office-center.jpg'), 0.25);
			tl.to(containerElement, { filter: 'blur(0px)', duration: 0.25 }, 0.25);

			tl.to(presenter, { opacity: 1, scale: 1, duration: 0.4 }, 0.2);
			if (experienceStation) tl.to(experienceStation, { opacity: 0, scale: 0.95 }, 0);
			if (projectsStation) tl.to(projectsStation, { opacity: 0, scale: 0.95 }, 0);
			if (phoneModal) tl.to(phoneModal, { y: '100%', opacity: 0, duration: 0.4 }, 0);
			if (cardContent) tl.to(cardContent, { opacity: 1, y: 0, x: 0, duration: 0.4 }, 0.25);
			break;

		case 'about':
			tl.to(containerElement, { filter: 'blur(4px)', duration: 0.25 }, 0);
			tl.to(backdrop, { scale: 1.1, x: 0, y: 0, transformOrigin: '30% 50%', duration: 0.5 }, 0);
			tl.add(() => setBackdropSrc('/bg-office-left.jpg'), 0.25);
			tl.to(containerElement, { filter: 'blur(0px)', duration: 0.25 }, 0.25);

			tl.to(presenter, { opacity: 1, scale: 1, duration: 0.4 }, 0.2);
			if (experienceStation) tl.to(experienceStation, { opacity: 0, scale: 0.95 }, 0);
			if (projectsStation) tl.to(projectsStation, { opacity: 0, scale: 0.95 }, 0);
			if (phoneModal) tl.to(phoneModal, { y: '100%', opacity: 0, duration: 0.4 }, 0);
			if (cardContent) tl.fromTo(cardContent, { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.5 }, 0.3);
			break;

		case 'experience':
			playSound('tv-on');
			// Phase A & B: Wide anchor -> Scale camera up targeting TV wall (scale: 1.8, y: -120px) over 0.6s
			tl.add(() => setBackdropSrc('/bg-office-center.jpg'), 0);
			tl.to(containerElement, { filter: 'blur(4px)', duration: 0.3 }, 0);
			tl.to(backdrop, { scale: 1.8, y: -60, transformOrigin: '35% 35%', duration: 0.6 }, 0);

			// Phase C: At peak zoom (0.5s), crossfade to dedicated TV macro backdrop (0.3s) and fade in UI
			tl.add(() => setBackdropSrc('/bg-experience-macro.jpg'), 0.5);
			tl.to(backdrop, { scale: 1.0, y: 0, transformOrigin: '50% 50%', duration: 0.3 }, 0.5);
			tl.to(containerElement, { filter: 'blur(0px)', duration: 0.3 }, 0.5);

			tl.to(presenter, { opacity: 0, duration: 0.3 }, 0);
			if (experienceStation) {
				tl.fromTo(experienceStation, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.4 }, 0.5);
			}
			if (projectsStation) tl.to(projectsStation, { opacity: 0 }, 0);
			if (phoneModal) tl.to(phoneModal, { y: '100%', opacity: 0 }, 0);
			if (cardContent) tl.to(cardContent, { opacity: 0 }, 0);
			break;

		case 'projects':
			// Phase A & B: Glide from TV wall to right desk monitor (scale: 2.1, x: 180px, y: 80px) over 0.6s
			tl.add(() => setBackdropSrc('/bg-office-center.jpg'), 0);
			tl.to(containerElement, { filter: 'blur(4px)', duration: 0.3 }, 0);
			tl.to(backdrop, { scale: 2.1, x: -100, y: -40, transformOrigin: '65% 65%', duration: 0.6 }, 0);

			// Phase C: At peak zoom (0.5s), crossfade to dedicated desktop monitor macro backdrop
			tl.add(() => setBackdropSrc('/bg-projects-macro.jpg'), 0.5);
			tl.to(backdrop, { scale: 1.0, x: 0, y: 0, transformOrigin: '50% 50%', duration: 0.3 }, 0.5);
			tl.to(containerElement, { filter: 'blur(0px)', duration: 0.3 }, 0.5);

			tl.to(presenter, { opacity: 0, duration: 0.3 }, 0);
			if (experienceStation) tl.to(experienceStation, { opacity: 0 }, 0);
			if (projectsStation) {
				tl.fromTo(projectsStation, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.4 }, 0.5);
			}
			if (phoneModal) tl.to(phoneModal, { y: '100%', opacity: 0 }, 0);
			if (cardContent) tl.to(cardContent, { opacity: 0 }, 0);
			break;

		case 'skills':
		case 'resume':
			// Phase A & B: Tilt camera down toward oak desk surface (y: 220px, scale: 2.2) over 0.6s
			tl.add(() => setBackdropSrc('/bg-office-center.jpg'), 0);
			tl.to(containerElement, { filter: 'blur(4px)', duration: 0.3 }, 0);
			tl.to(backdrop, { scale: 2.2, y: -120, transformOrigin: '50% 75%', duration: 0.6 }, 0);

			// Phase C: At peak zoom (0.5s), crossfade to dedicated paper desk macro backdrop
			tl.add(() => setBackdropSrc('/bg-desk-macro.jpg'), 0.5);
			tl.to(backdrop, { scale: 1.0, x: 0, y: 0, transformOrigin: '50% 50%', duration: 0.3 }, 0.5);
			tl.to(containerElement, { filter: 'blur(0px)', duration: 0.3 }, 0.5);

			tl.to(presenter, { opacity: 0, duration: 0.3 }, 0);
			if (experienceStation) tl.to(experienceStation, { opacity: 0 }, 0);
			if (projectsStation) tl.to(projectsStation, { opacity: 0 }, 0);
			if (phoneModal) tl.to(phoneModal, { y: '100%', opacity: 0 }, 0);
			if (cardContent) {
				const initialX = targetTab === 'resume' ? -420 : 0;
				tl.fromTo(cardContent, { opacity: 0, y: 20, x: initialX, scale: 0.97 }, { opacity: 1, y: 0, x: initialX, scale: 1, duration: 0.4 }, 0.5);
			}
			break;

		case 'achievements':
			// Phase A & B: Pan camera left along wooden wall plank section (x: -240px, scale: 1.7) over 0.6s
			tl.add(() => setBackdropSrc('/bg-office-left.jpg'), 0);
			tl.to(containerElement, { filter: 'blur(4px)', duration: 0.3 }, 0);
			tl.to(backdrop, { scale: 1.7, x: 120, transformOrigin: '20% 40%', duration: 0.6 }, 0);

			// Phase C: At peak zoom (0.5s), crossfade to dedicated award wall macro backdrop
			tl.add(() => setBackdropSrc('/bg-wall-awards-macro.jpg'), 0.5);
			tl.to(backdrop, { scale: 1.0, x: 0, y: 0, transformOrigin: '50% 50%', duration: 0.3 }, 0.5);
			tl.to(containerElement, { filter: 'blur(0px)', duration: 0.3 }, 0.5);

			tl.to(presenter, { opacity: 0, duration: 0.3 }, 0);
			if (experienceStation) tl.to(experienceStation, { opacity: 0 }, 0);
			if (projectsStation) tl.to(projectsStation, { opacity: 0 }, 0);
			if (phoneModal) tl.to(phoneModal, { y: '100%', opacity: 0 }, 0);
			if (cardContent) tl.fromTo(cardContent, { opacity: 0, y: 20, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.4 }, 0.5);
			break;

		case 'contact':
			// Phase A & B: Pan camera right toward oak side table on bg-office-right.jpg
			tl.add(() => setBackdropSrc('/bg-office-right.jpg'), 0);
			tl.to(backdrop, { scale: 1.1, transformOrigin: '50% 50%', filter: 'blur(8px)', duration: 0.5 }, 0);
			tl.to(containerElement, { filter: 'blur(0px)', duration: 0.5 }, 0);

			tl.to(presenter, { opacity: 0, duration: 0.3 }, 0);
			if (experienceStation) tl.to(experienceStation, { opacity: 0 }, 0);
			if (projectsStation) tl.to(projectsStation, { opacity: 0 }, 0);
			if (cardContent) tl.to(cardContent, { opacity: 0 }, 0);

			// Phase C: Animate realistic smartphone frame rising from below screen bounds
			if (phoneModal) {
				tl.fromTo(
					phoneModal,
					{ opacity: 0, y: '100%' },
					{ opacity: 1, y: '0%', duration: 0.7, ease: 'back.out(1.4)' },
					0.3
				);
			}
			break;

		default:
			break;
	}
}
