import { gsap } from 'gsap';
import { writable } from 'svelte/store';

export const activeFocusedCertificate = writable<any | null>(null);

let activeTiltHandler: ((e: MouseEvent) => void) | null = null;

export function openCertificateFocus(certificate: any) {
  activeFocusedCertificate.set(certificate);

  const bgStage = document.getElementById('stage-active');
  const navbar = document.getElementById('main-navbar');

  // Hide Navbar during focus
  if (navbar) gsap.to(navbar, { y: -80, opacity: 0, duration: 0.35, ease: 'power2.in' });

  // Blur Studio Backdrop
  if (bgStage) {
    gsap.to(bgStage, {
      scale: 1.12,
      filter: 'blur(32px) brightness(0.4)',
      duration: 0.7,
      ease: 'expo.out'
    });
  }

  // Animate zoomed sheet entry on next tick
  setTimeout(() => {
    const sheet = document.getElementById('zoomed-certificate-sheet');
    if (sheet) {
      gsap.fromTo(
        sheet,
        { scale: 0.8, y: 30, rotateX: 8 },
        {
          scale: 1.0,
          y: 0,
          rotateX: 0,
          duration: 0.65,
          ease: 'back.out(1.2)',
          onComplete: () => {
            attach3DTilt(sheet);
          }
        }
      );
    }
  }, 20);
}

export function closeCertificateFocus() {
  detach3DTilt();

  const bgStage = document.getElementById('stage-active');
  const navbar = document.getElementById('main-navbar');
  const sheet = document.getElementById('zoomed-certificate-sheet');

  if (sheet) {
    gsap.to(sheet, { scale: 0.85, opacity: 0, duration: 0.3 });
  }

  // Unblur Studio Backdrop
  if (bgStage) {
    gsap.to(bgStage, {
      scale: 1.0,
      filter: 'blur(0px) brightness(1.0)',
      duration: 0.6,
      ease: 'expo.out'
    });
  }

  // Restore Navbar
  if (navbar) gsap.to(navbar, { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.1)' });

  activeFocusedCertificate.set(null);
}

function attach3DTilt(el: HTMLElement) {
  activeTiltHandler = (e: MouseEvent) => {
    const rect = el.getBoundingClientRect();
    const rotX = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    const rotY = ((e.clientX - rect.left) / rect.width - 0.5) * 8;

    gsap.to(el, {
      rotateX: rotX,
      rotateY: rotY,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 1000
    });
  };
  window.addEventListener('mousemove', activeTiltHandler);
}

function detach3DTilt() {
  if (activeTiltHandler) {
    window.removeEventListener('mousemove', activeTiltHandler);
    activeTiltHandler = null;
  }
}
