import { gsap } from "gsap";
import { get } from "svelte/store";
import { SECTIONS } from "../constants/assets";
import { systemSettings } from "$lib/stores/glassSettings";
import { playSpatialSweep } from "$lib/audio/spatialAudio";

export type TabType = keyof typeof SECTIONS;

export function animateSpatialCards(
	incomingStage: HTMLElement, 
	fromSection: string, 
	toSection: string, 
	speedMult: number = 1.0
) {
	const fromIdx = SECTIONS[fromSection]?.index ?? 1;
	const toIdx = SECTIONS[toSection]?.index ?? 1;
	const signedDelta = toIdx - fromIdx;
	const absDelta = Math.abs(signedDelta);

	if (absDelta === 0) return;

	const cards = incomingStage.querySelectorAll('.floating-glass-card');
	if (!cards || cards.length === 0) {
		gsap.to(incomingStage, { opacity: 1, duration: 0.3 });
		return;
	}

	// Signed Vector Mapping:
	// Moving RIGHT (signedDelta > 0): Cards enter from RIGHT (+X -> 0)
	// Moving LEFT (signedDelta < 0): Cards enter from LEFT (-X -> 0)
	const direction = signedDelta > 0 ? 1 : -1;
	const baseXOffset = 45 + (24 * absDelta); 
	const initialX = direction * baseXOffset;

	const bounceOvershoot = 1.0 + (0.30 * Math.log(1 + absDelta)); 
	const duration = (0.40 + (0.07 * Math.min(absDelta, 5))) / speedMult;

	// HARD RESET GSAP STATE TO OVERRIDE CSS
	gsap.killTweensOf(cards);
	gsap.set(cards, { clearProps: 'transform' });

	gsap.fromTo(
		cards,
		{ 
			x: `${initialX}px`, 
			opacity: 0, 
			scale: 0.94 
		},
		{
			x: '0px',
			opacity: 1,
			scale: 1.0,
			duration: duration,
			stagger: 0.08,
			ease: `back.out(${bounceOvershoot})`,
			clearProps: 'transform,opacity,scale' // PRESERVES CSS CLASS BACKDROP-FILTER & OPACITY
		}
	);
}

export function playSpatialTransition(
	fromSection: string | undefined,
	toSection: string,
	onCompleteCallback: () => void
) {
	const fromKey = fromSection && SECTIONS[fromSection] ? fromSection : "home";
	const fromConfig = SECTIONS[fromKey];
	const toConfig = SECTIONS[toSection] || SECTIONS["home"];
	const delta = Math.abs(toConfig.index - fromConfig.index);

	const activeStage = document.getElementById("stage-active");
	const incomingStage = document.getElementById("stage-incoming");
	const incomingImg = document.getElementById("incoming-bg-img") as HTMLImageElement;

	if (!activeStage || !incomingStage || !incomingImg) {
		onCompleteCallback();
		return;
	}

	// 1. HARD CLEANUP: Prevent transform & filter bleed
	gsap.killTweensOf([activeStage, incomingStage]);
	gsap.set([activeStage, incomingStage], { clearProps: "transform,x,y,filter" });

	// Outgoing Card Exit Slide & Fade Out
	const outgoingCards = activeStage.querySelectorAll('.floating-glass-card, .home-glass-card');
	if (outgoingCards.length > 0) {
		const exitCardX = toConfig.index > fromConfig.index ? -60 : 60;
		gsap.to(outgoingCards, {
			x: exitCardX,
			opacity: 0,
			duration: 0.25,
			ease: "power2.in"
		});
	}

	// 2. LOCALIZED DESK PAN (Skills <-> Resume) - ZERO BLUR
	const isDeskSwitch = (fromKey === "skills" && toSection === "resume") || 
	                     (fromKey === "resume" && toSection === "skills");

	if (isDeskSwitch) {
		const deskWrapper = document.getElementById("desk-paper-wrapper");
		if (deskWrapper) {
			const targetX = toSection === "resume" ? "-28%" : "0%";
			gsap.to(deskWrapper, {
				x: targetX,
				duration: 0.38,
				ease: "power3.inOut",
				onComplete: () => {
					onCompleteCallback();
					gsap.set(activeStage, { clearProps: "transform,x,y,filter" });
				}
			});
			return;
		}
	}

	// 3. MID-FLIGHT VELOCITY BLUR LIFECYCLE (All Other Sections)
	const settings = get(systemSettings);
	const speedMult = settings.cameraSpeed || 1.0;

	let baseDuration = 0.40;
	let panDistance = "14vw";

	if (delta === 2 || delta === 3) {
		baseDuration = 0.65;
		panDistance = "25vw";
	} else if (delta >= 4) {
		baseDuration = 0.88;
		panDistance = "40vw";
	}

	const duration = baseDuration / speedMult;
	const isMovingRight = toConfig.index > fromConfig.index;

	const enterX = isMovingRight ? panDistance : `-${panDistance}`;
	const exitX = isMovingRight ? `-${panDistance}` : panDistance;

	playSpatialSweep(delta, duration);
	incomingImg.src = toConfig.image;

	// Execute content-aware spatial card animation on incoming stage
	animateSpatialCards(incomingStage, fromKey, toSection, speedMult);

	const tl = gsap.timeline({
		onComplete: () => {
			onCompleteCallback();
			gsap.set([activeStage, incomingStage], { clearProps: "transform,x,y,filter" });
			gsap.set(activeStage, { opacity: 1 });
			gsap.set(incomingStage, { opacity: 0 });

			const monitorRoot = document.getElementById('projects-monitor-root');
			if (monitorRoot) {
				gsap.set(monitorRoot, { clearProps: "transform,x,y" });
			}

			const activeStageEl = document.getElementById('stage-active');
			if (activeStageEl) {
				animateSpatialCards(activeStageEl, fromKey, toSection, speedMult);
			}

			if (toSection === 'projects') {
				import('$lib/animations/monitorBootChoreography').then((m) => {
					m.playMonitorBootAnimation();
				});
			}

			if (toSection === 'achievements') {
				const achStage = document.getElementById('achievements-stage-root');
				if (achStage) {
					gsap.killTweensOf(achStage);
					gsap.set(achStage, { clearProps: 'transform', opacity: 1, visibility: 'visible' });
					gsap.fromTo(
						achStage,
						{ opacity: 0, y: 20 },
						{ opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
					);
				}
			}
		}
	});

	// Lifecycle: Crisp start -> Horizontal blur peak mid-flight -> Tear down to 0px before landing
	tl.set(incomingStage, { x: enterX, opacity: 0, filter: "blur(0px)" }, 0)
	  .to([activeStage, incomingStage], { filter: "blur(20px, 0px) scaleX(1.02)", duration: duration * 0.35, ease: "power2.in" }, 0.05)
	  .to(activeStage, { x: exitX, opacity: 0, duration, ease: "expo.out" }, 0)
	  .to(incomingStage, { x: "0vw", opacity: 1, duration, ease: "expo.out" }, 0)
	  .to([activeStage, incomingStage], { filter: "blur(0px, 0px) scaleX(1.0)", duration: duration * 0.45, ease: "power2.out" }, duration * 0.40);
}

export function handleSectionTransition(fromSection: string | undefined, toSection: string, onCompleteCallback: () => void) {
	playSpatialTransition(fromSection || "home", toSection, onCompleteCallback);
}

export function animateSpatialTransition(fromSection: string | undefined, toSection: string, onCompleteCallback: () => void) {
	playSpatialTransition(fromSection || "home", toSection, onCompleteCallback);
}

export function playExperienceTransition(onCompleteCallback: () => void) {
	playSpatialTransition("home", "experience", onCompleteCallback);
}

export function resetStageToHome() {
	playSpatialTransition(undefined, "home", () => {});
}

export function animateCamera(targetTab: string, containerElement: HTMLElement, currentTab?: string) {
	playSpatialTransition(currentTab, targetTab, () => {});
}
