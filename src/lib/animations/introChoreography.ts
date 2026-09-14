import { gsap } from 'gsap';
import { isWelcomeCompleted } from '$lib/stores/navStore';

export function playVerticalCraneDrop(onComplete: () => void) {
  const overlay = document.getElementById('welcome-overlay');
  const overlayCard = document.getElementById('welcome-glass-card');
  const bgStage = document.getElementById('stage-active');
  const navbar = document.getElementById('main-navbar');
  const presenter = document.querySelector('video');
  const homeCards = document.querySelectorAll('.home-glass-card');

  if (!overlay || !bgStage) {
    isWelcomeCompleted.set(true);
    onComplete();
    return;
  }

  const tl = gsap.timeline({
    onComplete: () => {
      overlay.style.display = 'none';
      isWelcomeCompleted.set(true);
      if (navbar) {
        navbar.classList.remove('pointer-events-none');
        navbar.classList.add('pointer-events-auto');
      }
      onComplete();
    }
  });

  // 1. Pre-Animation State Lock
  tl.set(bgStage, { scale: 1.25, y: '-10vh', filter: 'blur(36px) brightness(0.6)' })
    .set(navbar, { y: -60, opacity: 0 })
    .set(presenter, { y: 100, opacity: 0 })
    .set(homeCards, { y: 40, opacity: 0 });

  // 2. Welcome Card Exit (Scale up & fade)
  tl.to(overlayCard, {
    scale: 1.08,
    opacity: 0,
    duration: 0.45,
    ease: 'power2.in'
  }, 0);

  // 3. Room Camera Vertical Drop (Scale 1.25 -> 1.0, Y: -10vh -> 0vh, unblur)
  tl.to(bgStage, {
    scale: 1.0,
    y: '0vh',
    filter: 'blur(0px) brightness(1.0)',
    duration: 1.1,
    ease: 'expo.out'
  }, 0.15);

  // 4. SYNCHRONIZED NAVBAR DESCENT (Starts at t = 0.40s)
  tl.to(navbar, {
    y: 0,
    opacity: 1,
    duration: 0.75,
    ease: 'back.out(1.1)'
  }, 0.40);

  // 5. Presenter & Home Cards Slide In
  tl.to(presenter, {
    y: 0,
    opacity: 1,
    duration: 0.7,
    ease: 'power3.out'
  }, 0.50)
  .to(homeCards, {
    y: 0,
    opacity: 1,
    stagger: 0.08,
    duration: 0.55,
    ease: 'power3.out'
  }, 0.55);
}
