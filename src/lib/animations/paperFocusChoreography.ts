import { gsap } from "gsap";
import { writable } from "svelte/store";

export const isPaperFocused = writable<boolean>(false);
export const focusedPaperType = writable<"skills" | "resume" | null>(null);

let activeTiltHandler: ((e: MouseEvent) => void) | null = null;

export function enterPaperFocus(type: "skills" | "resume") {
  const paperEl = document.getElementById(type === "skills" ? "paper-sheet-left" : "paper-sheet-right");
  const bgStage = document.getElementById("stage-active");
  const navbar = document.getElementById("main-navbar");
  const focusModal = document.getElementById("paper-zoom-overlay");

  if (!paperEl || !bgStage) return;

  isPaperFocused.set(true);
  focusedPaperType.set(type);

  // Hide Navbar during paper focus
  if (navbar) gsap.to(navbar, { y: -80, opacity: 0, duration: 0.35, ease: "power2.in" });

  // 1. Blur Studio Backdrop
  gsap.to(bgStage, {
    scale: 1.15,
    filter: "blur(32px) brightness(0.4)",
    duration: 0.7,
    ease: "expo.out"
  });

  // 2. Reveal Fixed Screen-Space Zoom Overlay
  if (focusModal) {
    focusModal.style.display = "flex";
    const cardContent = focusModal.querySelector("#zoomed-paper-card");

    gsap.killTweensOf([focusModal, cardContent]);
    gsap.fromTo(
      focusModal,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power2.out" }
    );

    if (cardContent) {
      gsap.fromTo(
        cardContent,
        { scale: 0.8, y: 40, rotateX: 10 },
        {
          scale: 1.0,
          y: 0,
          rotateX: 0,
          duration: 0.75,
          ease: "back.out(1.2)",
          onComplete: () => {
            attach3DTilt(cardContent as HTMLElement);
          }
        }
      );
    }
  }
}

export function exitPaperFocus() {
  const bgStage = document.getElementById("stage-active");
  const navbar = document.getElementById("main-navbar");
  const focusModal = document.getElementById("paper-zoom-overlay");

  detach3DTilt();

  // 1. Unblur Studio Backdrop
  if (bgStage) {
    gsap.to(bgStage, {
      scale: 1.0,
      filter: "blur(0px) brightness(1.0)",
      duration: 0.6,
      ease: "expo.out"
    });
  }

  // 2. Hide Zoom Overlay
  if (focusModal) {
    const cardContent = focusModal.querySelector("#zoomed-paper-card");
    gsap.to(cardContent, { scale: 0.85, opacity: 0, duration: 0.3 });
    gsap.to(focusModal, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        focusModal.style.display = "none";
        isPaperFocused.set(false);
        focusedPaperType.set(null);
        if (cardContent) gsap.set(cardContent, { clearProps: "all" });
      }
    });
  }

  // Restore Navbar
  if (navbar) gsap.to(navbar, { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.1)" });
}

// 3D TILT ENGINE (Welcome-inspired Paper Tilt)
function attach3DTilt(el: HTMLElement) {
  activeTiltHandler = (e: MouseEvent) => {
    const rect = el.getBoundingClientRect();
    const rotX = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    const rotY = ((e.clientX - rect.left) / rect.width - 0.5) * 10;

    gsap.to(el, {
      rotateX: rotX,
      rotateY: rotY,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000
    });
  };
  window.addEventListener("mousemove", activeTiltHandler);
}

function detach3DTilt() {
  if (activeTiltHandler) {
    window.removeEventListener("mousemove", activeTiltHandler);
    activeTiltHandler = null;
  }
}
