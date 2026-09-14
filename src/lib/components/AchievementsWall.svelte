<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { playSound } from '$lib/utils/soundEngine';
	import { openCertificateFocus } from '$lib/animations/certificateFocusChoreography';

	let { achievements = [
		{
			id: 'awwwards-sotd',
			title: 'Site of the Day',
			issuer: 'Awwwards International',
			year: '2025',
			badge: 'GOLD EXCELLENCE',
			description: 'Recognized for outstanding WebGL spatial design and interactive UI mechanics.',
			details: 'Awarded by an international panel of 12 judges evaluating visual design, performance, and technical execution.',
			certificateCode: 'AWW-2025-9941'
		},
		{
			id: 'fwa-month',
			title: 'FWA of the Month',
			issuer: 'Favorite Website Awards',
			year: '2024',
			badge: 'TOP INNOVATION',
			description: 'Awarded for pioneering GSAP spatial camera transitions and composition engines.',
			details: 'Featured globally on FWA showcase for pushing boundaries in browser-based 3D spatial navigation.',
			certificateCode: 'FWA-MONTH-8820'
		},
		{
			id: 'apple-design-nominee',
			title: 'Apple Design Award Nominee',
			issuer: 'WWDC Developer Showcase',
			year: '2024',
			badge: 'FINALIST',
			description: 'Nominated for Apple Keynote-inspired human scale portfolio interface design.',
			details: 'Selected as a finalist in Spatial Computing & Interactive UI category during annual developer honors.',
			certificateCode: 'ADA-2024-0104'
		}
	] }: { achievements?: any[] } = $props();

	let activeIndex = $state(0);
	let direction = $state(1); // 1 = right, -1 = left
	let autoplayTimer = $state<any | null>(null);
	let isHovered = $state(false);

	function nextSlide() {
		if (!achievements?.length) return;
		playSound('click');
		direction = 1;
		activeIndex = (activeIndex + 1) % achievements.length;
	}

	function prevSlide() {
		if (!achievements?.length) return;
		playSound('click');
		direction = -1;
		activeIndex = (activeIndex - 1 + achievements.length) % achievements.length;
	}

	function startAutoplay() {
		stopAutoplay();
		autoplayTimer = setInterval(() => {
			if (!isHovered && achievements?.length) nextSlide();
		}, 4500);
	}

	function stopAutoplay() {
		if (autoplayTimer) {
			clearInterval(autoplayTimer);
			autoplayTimer = null;
		}
	}

	onMount(() => startAutoplay());
	onDestroy(() => stopAutoplay());
</script>

<div 
  id="achievements-stage-root"
  role="region"
  aria-label="Achievements Hall of Fame"
  class="relative w-full h-full flex flex-col items-center justify-center p-6 z-30 pointer-events-auto select-none"
  onmouseenter={() => (isHovered = true)}
  onmouseleave={() => (isHovered = false)}
>
  <!-- Main Carousel Outer Frame (Header Removed) -->
  <div class="relative w-full max-w-2xl h-[380px] flex items-center justify-center">
    
    <!-- Prev Arrow -->
    <button 
      type="button"
      onclick={prevSlide}
      aria-label="Previous Certificate"
      class="absolute left-0 z-40 w-12 h-12 rounded-full bg-slate-950/90 hover:bg-slate-900 border border-white/20 text-white font-mono text-lg font-bold shadow-2xl flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer"
    >
      ←
    </button>

    <!-- Center Certificate Frame (No Peek Cards) -->
    <div class="relative w-full h-full flex items-center justify-center px-14 overflow-hidden">
      {#key activeIndex}
        <button 
          type="button"
          id="certificate-frame-current"
          in:fly={{ x: direction * 40, duration: 350, easing: cubicOut }}
          out:fade={{ duration: 150 }}
          onclick={() => { playSound('click'); openCertificateFocus(achievements[activeIndex]); }}
          class="floating-glass-card absolute w-full max-w-[540px] bg-[#1a120b] border-[8px] border-[#2d1e12] rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.8)] p-5 cursor-pointer transition-all duration-300 hover:scale-[1.015] z-30 group text-left outline outline-1 outline-[#d4af37]/40 pointer-events-auto"
        >
          <!-- Parchment Inner Matting -->
          <div class="bg-[#f4efe6] p-6 rounded-lg border border-[#e2d7c5] shadow-inner flex flex-col justify-between h-full relative">
            <div class="space-y-3 text-slate-950">
              <div class="flex justify-between items-start border-b-2 border-amber-900/30 pb-3">
                <div>
                  <span class="text-[9px] font-mono font-bold tracking-widest text-amber-900 uppercase">OFFICIAL CERTIFICATE OF ACHIEVEMENT</span>
                  <h3 class="text-2xl font-black text-slate-950 font-serif mt-0.5">{achievements[activeIndex].title}</h3>
                </div>
                <span class="px-2.5 py-1 bg-amber-900/10 border border-amber-900/30 text-amber-950 font-mono text-[10px] font-bold rounded">
                  {achievements[activeIndex].year}
                </span>
              </div>

              <p class="text-xs text-slate-900 font-semibold leading-relaxed font-sans">
                {achievements[activeIndex].description}
              </p>

              <div class="pt-2 text-[11px] font-mono font-bold text-slate-600 flex justify-between items-center">
                <span>ISSUED BY: {achievements[activeIndex].issuer}</span>
                <span class="text-amber-900 font-bold">[ CLICK TO ZOOM & INSPECT 🔍 ]</span>
              </div>
            </div>

            <!-- Wax Seal -->
            <div class="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-gradient-to-tr from-amber-700 via-amber-400 to-yellow-600 shadow-xl flex flex-col items-center justify-center border-2 border-amber-200">
              <span class="text-[8px] font-mono font-black text-slate-950 uppercase tracking-tighter">VERIFIED</span>
            </div>
          </div>
        </button>
      {/key}
    </div>

    <!-- Next Arrow -->
    <button 
      type="button"
      onclick={nextSlide}
      aria-label="Next Certificate"
      class="absolute right-0 z-40 w-12 h-12 rounded-full bg-slate-950/90 hover:bg-slate-900 border border-white/20 text-white font-mono text-lg font-bold shadow-2xl flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer"
    >
      →
    </button>
  </div>

  <!-- Indicator Dots -->
  <div class="flex items-center gap-2 mt-6">
    {#each achievements as _, i}
      <button 
        type="button"
        onclick={() => { playSound('click'); direction = i > activeIndex ? 1 : -1; activeIndex = i; }}
        aria-label={`Go to slide ${i + 1}`}
        class={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
          i === activeIndex ? 'w-8 bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]' : 'w-2 bg-white/30 hover:bg-white/60'
        }`}
      ></button>
    {/each}
  </div>
</div>
