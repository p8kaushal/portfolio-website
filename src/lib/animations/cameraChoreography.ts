import { gsap } from 'gsap';
import { SECTIONS } from '../constants/assets';

export type TabType = keyof typeof SECTIONS;

export function playSpatialTransition(
	fromSection: string | undefined,
	toSection: string,
	onCompleteCallback: () => void
) {
	const fromKey = fromSection && SECTIONS[fromSection] ? fromSection : 'home';
	const fromConfig = SECTIONS[fromKey];
	const toConfig = SECTIONS[toSection] || SECTIONS['home'];

	const activeStage = document.getElementById('stage-active');
	const incomingStage = document.getElementById('stage-incoming');
	const incomingImg = document.getElementById('incoming-bg-img') as HTMLImageElement;

	if (!activeStage || !incomingStage || !incomingImg) {
		onCompleteCallback();
		return;
	}

	// 1. HARD CLEANUP: Kill running tweens and reset transforms to prevent 50-50 splits
	gsap.killTweensOf([activeStage, incomingStage]);
	gsap.set([activeStage, incomingStage], { clearProps: 'transform,x,y' });

	// Handle Desk Localized Camera Pan (Skills <-> Resume)
	const isDeskSwitch = (fromKey === 'skills' && toSection === 'resume') || 
	                     (fromKey === 'resume' && toSection === 'skills');

	if (isDeskSwitch) {
		const targetX = toSection === 'resume' ? '-28%' : '0%';
		gsap.to(activeStage, {
			x: targetX,
			duration: 0.45,
			ease: 'power2.inOut',
			onComplete: () => {
				onCompleteCallback();
				gsap.set(activeStage, { clearProps: 'transform,x,y' });
			}
		});
		return;
	}

	// 2. Preload incoming backdrop image
	incomingImg.src = toConfig.image;

	// 3. Calculate spatial direction vector
	const isMovingRight = toConfig.index > fromConfig.index;
	const panStart = isMovingRight ? '12vw' : '-12vw';
	const panExit = isMovingRight ? '-12vw' : '12vw';

	const tl = gsap.timeline({
		onComplete: () => {
			onCompleteCallback();
			// Reset transforms cleanly after state swap
			gsap.set([activeStage, incomingStage], { clearProps: 'transform,x,y' });
			gsap.set(activeStage, { opacity: 1 });
			gsap.set(incomingStage, { opacity: 0 });
		}
	});

	// 4. Dual-layer cinematic camera dolly pan
	tl.set(incomingStage, { x: panStart, opacity: 0 })
		.to(activeStage, { x: panExit, opacity: 0, duration: 0.55, ease: 'power2.inOut' }, 0)
		.to(incomingStage, { x: '0vw', opacity: 1, duration: 0.55, ease: 'power2.inOut' }, 0);
}

export function handleSectionTransition(fromSection: string | undefined, toSection: string, onCompleteCallback: () => void) {
	playSpatialTransition(fromSection, toSection, onCompleteCallback);
}

export function animateSpatialTransition(fromSection: string | undefined, toSection: string, onCompleteCallback: () => void) {
	playSpatialTransition(fromSection, toSection, onCompleteCallback);
}

export function playExperienceTransition(onCompleteCallback: () => void) {
	playSpatialTransition(undefined, 'experience', onCompleteCallback);
}

export function resetStageToHome() {
	playSpatialTransition(undefined, 'home', () => {});
}

export function animateCamera(targetTab: string, containerElement: HTMLElement, currentTab?: string) {
	playSpatialTransition(currentTab, targetTab, () => {});
}
