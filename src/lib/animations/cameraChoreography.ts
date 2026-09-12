import { gsap } from 'gsap';
import { playSound } from '$lib/utils/soundEngine';

export function animateCamera(targetTab: string, containerElement: HTMLElement) {
	if (!containerElement) return;

	const backdrop = containerElement.querySelector('.studio-backdrop') as HTMLElement;
	const presenter = containerElement.querySelector('.presenter-layer') as HTMLElement;
	const tvStation = containerElement.querySelector('.tv-station') as HTMLElement;
	const laptopStation = containerElement.querySelector('.laptop-station') as HTMLElement;
	const laptopLid = containerElement.querySelector('.laptop-lid') as HTMLElement;
	const phoneModal = containerElement.querySelector('.phone-modal') as HTMLElement;
	const cardContent = containerElement.querySelector('.card-overlay') as HTMLElement;

	// Reset base camera state timeline
	const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.8 } });

	// Apply motion blur pass (filter: blur(4px) -> blur(0px))
	tl.to(containerElement, { filter: 'blur(4px)', duration: 0.25 }, 0)
	  .to(containerElement, { filter: 'blur(0px)', duration: 0.4 }, 0.3);

	switch (targetTab) {
		case 'home':
			tl.to(backdrop, { scale: 1, x: 0, y: 0, filter: 'blur(0px)' }, 0);
			tl.to(presenter, { scale: 1, x: 0, y: 0, opacity: 1 }, 0);
			tl.to(tvStation, { opacity: 0, scale: 0.9 }, 0);
			tl.to(laptopStation, { opacity: 0, y: 50 }, 0);
			tl.to(phoneModal, { y: '100%', opacity: 0 }, 0);
			if (cardContent) tl.to(cardContent, { opacity: 0, y: 20 }, 0);
			break;

		case 'about':
			tl.to(backdrop, { scale: 1.15, x: -100, y: 0, filter: 'blur(0px)' }, 0);
			tl.to(presenter, { scale: 1.05, x: -160, y: 0, opacity: 1 }, 0);
			tl.to(tvStation, { opacity: 0, scale: 0.9 }, 0);
			tl.to(laptopStation, { opacity: 0, y: 50 }, 0);
			tl.to(phoneModal, { y: '100%', opacity: 0 }, 0);
			if (cardContent) tl.fromTo(cardContent, { opacity: 0, x: 120 }, { opacity: 1, x: 0, duration: 0.6 }, 0.2);
			break;

		case 'experience':
			playSound('tv-on');
			tl.to(backdrop, { scale: 1.35, x: 220, y: -40, filter: 'blur(0px)' }, 0);
			tl.to(presenter, { opacity: 0.2, scale: 0.9, x: -300 }, 0);
			tl.to(tvStation, { opacity: 1, scale: 1, x: 0, y: 0 }, 0.1);
			tl.fromTo(tvStation, { opacity: 0 }, { opacity: 1, keyframes: [{ opacity: 0 }, { opacity: 1 }, { opacity: 0.7 }, { opacity: 1 }], duration: 0.5 }, 0.2);
			tl.to(laptopStation, { opacity: 0, y: 50 }, 0);
			tl.to(phoneModal, { y: '100%', opacity: 0 }, 0);
			if (cardContent) tl.fromTo(cardContent, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, 0.3);
			break;

		case 'projects':
			tl.to(backdrop, { scale: 1.25, x: -180, y: 60, filter: 'blur(0px)' }, 0);
			tl.to(presenter, { opacity: 0.15, scale: 0.9, x: 250 }, 0);
			tl.to(tvStation, { opacity: 0, scale: 0.9 }, 0);
			tl.to(laptopStation, { opacity: 1, y: 0, scale: 1 }, 0.1);
			if (laptopLid) {
				tl.fromTo(laptopLid, { rotateX: -85 }, { rotateX: 0, duration: 0.7, ease: 'back.out(1.2)' }, 0.2);
			}
			tl.to(phoneModal, { y: '100%', opacity: 0 }, 0);
			if (cardContent) tl.fromTo(cardContent, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 0.3);
			break;

		case 'skills':
		case 'resume':
		case 'achievements':
			tl.to(backdrop, { scale: 1.1, x: 50, y: 20, filter: 'blur(0px)' }, 0);
			tl.to(presenter, { opacity: 0.8, x: -200, scale: 1 }, 0);
			tl.to(tvStation, { opacity: 0 }, 0);
			tl.to(laptopStation, { opacity: 0 }, 0);
			tl.to(phoneModal, { y: '100%', opacity: 0 }, 0);
			if (cardContent) tl.fromTo(cardContent, { opacity: 0, y: 30, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.5 }, 0.2);
			break;

		case 'contact':
			tl.to(backdrop, { scale: 1.05, x: 0, y: 0, filter: 'blur(12px)' }, 0);
			tl.to(presenter, { opacity: 0.3, scale: 0.95 }, 0);
			tl.to(tvStation, { opacity: 0 }, 0);
			tl.to(laptopStation, { opacity: 0 }, 0);
			tl.to(phoneModal, { opacity: 1, y: '0%', duration: 0.7, ease: 'back.out(1.1)' }, 0.1);
			if (cardContent) tl.to(cardContent, { opacity: 0 }, 0);
			break;

		default:
			break;
	}
}
