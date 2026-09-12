import { gsap } from 'gsap';
import { playSound } from '$lib/utils/soundEngine';

export function animateCamera(targetTab: string, containerElement: HTMLElement) {
	if (!containerElement) return;

	const backdrop = containerElement.querySelector('.studio-backdrop') as HTMLImageElement;
	const presenter = containerElement.querySelector('.presenter-layer') as HTMLElement;
	const experienceStation = containerElement.querySelector('.experience-station') as HTMLElement;
	const projectsStation = containerElement.querySelector('.projects-station') as HTMLElement;
	const phoneModal = containerElement.querySelector('.phone-modal') as HTMLElement;
	const cardContent = containerElement.querySelector('.card-overlay') as HTMLElement;

	const tl = gsap.timeline({ defaults: { ease: 'power2.inOut', duration: 0.8 } });

	// Phase 1: Spatial Glide Pass with Motion Blur (filter: blur(6px) -> blur(0px))
	tl.to(containerElement, { filter: 'blur(6px)', duration: 0.3 }, 0)
	  .to(containerElement, { filter: 'blur(0px)', duration: 0.4 }, 0.4);

	switch (targetTab) {
		case 'home':
			tl.to(backdrop, { opacity: 0.4, scale: 1.05, duration: 0.3 }, 0);
			tl.add(() => { if (backdrop) backdrop.src = '/bg-office-center.jpg'; }, 0.3);
			tl.to(backdrop, { opacity: 1, scale: 1.0, duration: 0.5 }, 0.3);
			tl.to(presenter, { opacity: 1, scale: 1 }, 0.2);
			if (experienceStation) tl.to(experienceStation, { opacity: 0, scale: 0.95 }, 0);
			if (projectsStation) tl.to(projectsStation, { opacity: 0, scale: 0.95 }, 0);
			if (phoneModal) tl.to(phoneModal, { y: '100%', opacity: 0 }, 0);
			if (cardContent) tl.to(cardContent, { opacity: 1, y: 0 }, 0.2);
			break;

		case 'about':
			tl.to(backdrop, { opacity: 0.4, scale: 1.1, duration: 0.3 }, 0);
			tl.add(() => { if (backdrop) backdrop.src = '/bg-office-left.jpg'; }, 0.3);
			tl.to(backdrop, { opacity: 1, scale: 1.05, duration: 0.5 }, 0.3);
			tl.to(presenter, { opacity: 1, scale: 1 }, 0.2);
			if (experienceStation) tl.to(experienceStation, { opacity: 0, scale: 0.95 }, 0);
			if (projectsStation) tl.to(projectsStation, { opacity: 0, scale: 0.95 }, 0);
			if (phoneModal) tl.to(phoneModal, { y: '100%', opacity: 0 }, 0);
			if (cardContent) tl.fromTo(cardContent, { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.6 }, 0.3);
			break;

		case 'experience':
			playSound('tv-on');
			// Phase 1 Glide -> Phase 2 Macro Arrival
			tl.to(backdrop, { opacity: 0.4, scale: 1.2, duration: 0.3 }, 0);
			tl.add(() => { if (backdrop) backdrop.src = '/bg-experience-macro.jpg'; }, 0.3);
			tl.to(backdrop, { opacity: 1, scale: 1.0, duration: 0.5 }, 0.3);
			tl.to(presenter, { opacity: 0 }, 0);
			if (experienceStation) {
				tl.fromTo(experienceStation, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.6 }, 0.3);
			}
			if (projectsStation) tl.to(projectsStation, { opacity: 0 }, 0);
			if (phoneModal) tl.to(phoneModal, { y: '100%', opacity: 0 }, 0);
			if (cardContent) tl.to(cardContent, { opacity: 0 }, 0);
			break;

		case 'projects':
			// Phase 1 Glide -> Phase 2 Macro Arrival
			tl.to(backdrop, { opacity: 0.4, scale: 1.2, duration: 0.3 }, 0);
			tl.add(() => { if (backdrop) backdrop.src = '/bg-projects-macro.jpg'; }, 0.3);
			tl.to(backdrop, { opacity: 1, scale: 1.0, duration: 0.5 }, 0.3);
			tl.to(presenter, { opacity: 0 }, 0);
			if (experienceStation) tl.to(experienceStation, { opacity: 0 }, 0);
			if (projectsStation) {
				tl.fromTo(projectsStation, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.6 }, 0.3);
			}
			if (phoneModal) tl.to(phoneModal, { y: '100%', opacity: 0 }, 0);
			if (cardContent) tl.to(cardContent, { opacity: 0 }, 0);
			break;

		case 'skills':
		case 'resume':
			// Phase 1 Glide -> Phase 2 Macro Paper Arrival
			tl.to(backdrop, { opacity: 0.4, scale: 1.15, duration: 0.3 }, 0);
			tl.add(() => { if (backdrop) backdrop.src = '/bg-paper-desk-macro.jpg'; }, 0.3);
			tl.to(backdrop, { opacity: 1, scale: 1.0, duration: 0.5 }, 0.3);
			tl.to(presenter, { opacity: 0 }, 0);
			if (experienceStation) tl.to(experienceStation, { opacity: 0 }, 0);
			if (projectsStation) tl.to(projectsStation, { opacity: 0 }, 0);
			if (phoneModal) tl.to(phoneModal, { y: '100%', opacity: 0 }, 0);
			if (cardContent) tl.fromTo(cardContent, { opacity: 0, y: 30, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.5 }, 0.3);
			break;

		case 'achievements':
			// Phase 1 Glide -> Phase 2 Macro Wall Arrival
			tl.to(backdrop, { opacity: 0.4, scale: 1.2, duration: 0.3 }, 0);
			tl.add(() => { if (backdrop) backdrop.src = '/bg-awards-wall-macro.jpg'; }, 0.3);
			tl.to(backdrop, { opacity: 1, scale: 1.0, duration: 0.5 }, 0.3);
			tl.to(presenter, { opacity: 0 }, 0);
			if (experienceStation) tl.to(experienceStation, { opacity: 0 }, 0);
			if (projectsStation) tl.to(projectsStation, { opacity: 0 }, 0);
			if (phoneModal) tl.to(phoneModal, { y: '100%', opacity: 0 }, 0);
			if (cardContent) tl.fromTo(cardContent, { opacity: 0, y: 30, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.3 }, 0.3);
			break;

		case 'contact':
			tl.to(backdrop, { opacity: 0.4, scale: 1.1, duration: 0.3 }, 0);
			tl.add(() => { if (backdrop) backdrop.src = '/bg-office-right.jpg'; }, 0.3);
			tl.to(backdrop, { opacity: 1, scale: 1.05, filter: 'blur(12px)', duration: 0.5 }, 0.3);
			tl.to(presenter, { opacity: 0 }, 0);
			if (experienceStation) tl.to(experienceStation, { opacity: 0 }, 0);
			if (projectsStation) tl.to(projectsStation, { opacity: 0 }, 0);
			if (phoneModal) {
				tl.fromTo(
					phoneModal,
					{ opacity: 0, y: '100%' },
					{ opacity: 1, y: '0%', duration: 0.8, ease: 'back.out(1.5)' },
					0.3
				);
			}
			if (cardContent) tl.to(cardContent, { opacity: 0 }, 0);
			break;

		default:
			break;
	}
}
