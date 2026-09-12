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

	const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.8 } });

	// Motion blur pass
	tl.to(containerElement, { filter: 'blur(3px)', duration: 0.25 }, 0)
	  .to(containerElement, { filter: 'blur(0px)', duration: 0.4 }, 0.3);

	switch (targetTab) {
		case 'home':
			if (backdrop) backdrop.src = '/bg-office-center.jpg';
			tl.to(backdrop, { scale: 1, x: 0, y: 0, filter: 'blur(0px)' }, 0);
			tl.to(presenter, { opacity: 1, scale: 1 }, 0);
			if (experienceStation) tl.to(experienceStation, { opacity: 0, scale: 0.95 }, 0);
			if (projectsStation) tl.to(projectsStation, { opacity: 0, scale: 0.95 }, 0);
			if (phoneModal) tl.to(phoneModal, { y: '100%', opacity: 0 }, 0);
			if (cardContent) tl.to(cardContent, { opacity: 1, y: 0 }, 0);
			break;

		case 'about':
			if (backdrop) backdrop.src = '/bg-office-center.jpg';
			tl.to(backdrop, { scale: 1.1, x: -60, y: 0, filter: 'blur(0px)' }, 0);
			tl.to(presenter, { opacity: 1, scale: 1 }, 0);
			if (experienceStation) tl.to(experienceStation, { opacity: 0, scale: 0.95 }, 0);
			if (projectsStation) tl.to(projectsStation, { opacity: 0, scale: 0.95 }, 0);
			if (phoneModal) tl.to(phoneModal, { y: '100%', opacity: 0 }, 0);
			if (cardContent) tl.fromTo(cardContent, { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.6 }, 0.2);
			break;

		case 'experience':
			playSound('tv-on');
			if (backdrop) backdrop.src = '/bg-office-left.jpg';
			tl.to(backdrop, { scale: 1.05, x: 0, y: 0, filter: 'blur(0px)' }, 0);
			tl.to(presenter, { opacity: 0 }, 0);
			if (experienceStation) {
				tl.fromTo(experienceStation, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.6 }, 0.1);
			}
			if (projectsStation) tl.to(projectsStation, { opacity: 0 }, 0);
			if (phoneModal) tl.to(phoneModal, { y: '100%', opacity: 0 }, 0);
			if (cardContent) tl.to(cardContent, { opacity: 0 }, 0);
			break;

		case 'projects':
			if (backdrop) backdrop.src = '/bg-office-right.jpg';
			tl.to(backdrop, { scale: 1.05, x: 0, y: 0, filter: 'blur(0px)' }, 0);
			tl.to(presenter, { opacity: 0 }, 0);
			if (experienceStation) tl.to(experienceStation, { opacity: 0 }, 0);
			if (projectsStation) {
				tl.fromTo(projectsStation, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.6 }, 0.1);
			}
			if (phoneModal) tl.to(phoneModal, { y: '100%', opacity: 0 }, 0);
			if (cardContent) tl.to(cardContent, { opacity: 0 }, 0);
			break;

		case 'skills':
		case 'resume':
		case 'achievements':
			if (backdrop) backdrop.src = '/bg-office-center.jpg';
			tl.to(backdrop, { scale: 1.08, x: 0, y: 0, filter: 'blur(0px)' }, 0);
			tl.to(presenter, { opacity: 0 }, 0);
			if (experienceStation) tl.to(experienceStation, { opacity: 0 }, 0);
			if (projectsStation) tl.to(projectsStation, { opacity: 0 }, 0);
			if (phoneModal) tl.to(phoneModal, { y: '100%', opacity: 0 }, 0);
			if (cardContent) tl.fromTo(cardContent, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.5 }, 0.15);
			break;

		case 'contact':
			if (backdrop) backdrop.src = '/bg-office-center.jpg';
			tl.to(backdrop, { scale: 1.05, x: 0, y: 0, filter: 'blur(12px)' }, 0);
			tl.to(presenter, { opacity: 0 }, 0);
			if (experienceStation) tl.to(experienceStation, { opacity: 0 }, 0);
			if (projectsStation) tl.to(projectsStation, { opacity: 0 }, 0);
			if (phoneModal) tl.to(phoneModal, { opacity: 1, y: '0%', duration: 0.7, ease: 'back.out(1.1)' }, 0.1);
			if (cardContent) tl.to(cardContent, { opacity: 0 }, 0);
			break;

		default:
			break;
	}
}
