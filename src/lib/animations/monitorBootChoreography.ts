import { gsap } from 'gsap';

export function playMonitorBootAnimation() {
  const monitor = document.getElementById('projects-monitor-root') || document.getElementById('projects-monitor-container');
  const scrollBody = document.getElementById('projects-scroll-container');

  if (!monitor) return;

  // Fail-safe cleanup
  gsap.killTweensOf([monitor, scrollBody]);

  const tl = gsap.timeline();

  // Phase 1: Subtle Backlight Beam Pulse & Unblur
  tl.fromTo(
    monitor,
    { scaleY: 0.98, opacity: 0.4, filter: 'blur(12px) brightness(0.5)' },
    { scaleY: 1.0, opacity: 1, filter: 'blur(0px) brightness(1.0)', duration: 0.6, ease: 'power3.out' }
  );

  if (scrollBody) {
    tl.fromTo(
      scrollBody,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      '-=0.3'
    );
  }
}
