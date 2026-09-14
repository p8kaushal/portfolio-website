import { gsap } from "gsap";
import { get } from "svelte/store";
import { SECTIONS } from "../constants/assets";
import { systemSettings } from "$lib/stores/glassSettings";
import { playSpatialSweep } from "$lib/audio/spatialAudio";

export type TabType = keyof typeof SECTIONS;

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
	const outgoingCards = activeStage.querySelectorAll('.floating-glass-card');
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

	const stageCardEnterX = isMovingRight ? '60px' : '-60px';

	const tl = gsap.timeline({
		onComplete: () => {
			onCompleteCallback();
			gsap.set([activeStage, incomingStage], { clearProps: "transform,x,y,filter" });
			gsap.set(activeStage, { opacity: 1 });
			gsap.set(incomingStage, { opacity: 0 });

			// Unified Floating Stage Card Entry (Identical pipeline for Home and About)
			const stageCard = document.querySelector('#stage-active .floating-glass-card');
			if (stageCard) {
				gsap.fromTo(
					stageCard,
					{ x: stageCardEnterX, opacity: 0 },
					{
						x: '0px',
						opacity: 1,
						duration: 0.50 / speedMult,
						ease: 'power3.out',
						clearProps: 'transform,opacity'
					}
				);
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
