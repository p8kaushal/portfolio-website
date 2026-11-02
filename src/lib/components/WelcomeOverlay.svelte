<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { ArrowDown, Sparkles } from 'lucide-svelte';
	import { playSound } from '$lib/utils/soundEngine';
	import { gsap } from 'gsap';

	let { onDescend = () => {} } = $props<{ onDescend?: () => void }>();

	let cardRef = $state<HTMLElement | null>(null);
	let isDescending = $state(false);

	function handleMouseMove(e: MouseEvent) {
		if (isDescending) return;
		const { innerWidth, innerHeight } = window;
		const rotX = ((e.clientY / innerHeight) - 0.5) * -14;
		const rotY = ((e.clientX / innerWidth) - 0.5) * 14;

		if (cardRef) {
			gsap.to(cardRef, {
				rotateX: rotX,
				rotateY: rotY,
				duration: 0.5,
				ease: 'power2.out',
				transformPerspective: 1000
			});

			const rect = cardRef.getBoundingClientRect();
			const spotlightX = e.clientX - rect.left;
			const spotlightY = e.clientY - rect.top;
			cardRef.style.setProperty('--spotlight-x', `${spotlightX}px`);
			cardRef.style.setProperty('--spotlight-y', `${spotlightY}px`);
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if ((e.code === 'Space' || e.code === 'Enter') && !isDescending) {
			e.preventDefault();
			triggerDescend();
		}
	}

	function triggerDescend() {
		if (isDescending) return;
		isDescending = true;
		playSound('click');
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('keydown', handleKeydown);

		if (cardRef) {
			gsap.to(cardRef, {
				rotateX: 0,
				rotateY: 0,
				duration: 0.3,
				ease: 'power2.inOut'
			});
		}

		onDescend();
	}

	onMount(() => {
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('keydown', handleKeydown);

		// Startup sequence
		if (cardRef) {
			gsap.fromTo(
				cardRef,
				{ scale: 0.94, opacity: 0, y: 20 },
				{ scale: 1.0, opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
			);
		}

		gsap.fromTo(
			'#welcome-title-text',
			{ backgroundPosition: '-200% 0' },
			{ backgroundPosition: '200% 0', duration: 2.4, ease: 'power2.inOut', repeat: -1, repeatDelay: 3 }
		);
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('keydown', handleKeydown);
		}
	});
</script>

<div
	id="welcome-overlay"
	class="fixed inset-0 z-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 pointer-events-auto bg-slate-950/45 backdrop-blur-2xl text-center select-none overflow-hidden"
>
	<!-- Studio Ambient Background Glows matching the light keynote theme -->
	<div class="absolute -left-32 top-1/4 w-[500px] h-[500px] rounded-full bg-sky-400/20 blur-[130px] pointer-events-none"></div>
	<div class="absolute -right-32 bottom-1/4 w-[500px] h-[500px] rounded-full bg-slate-300/25 blur-[130px] pointer-events-none"></div>

	<!-- Main Interactive 3D Parallax Glass Card -->
	<div
		id="welcome-glass-card"
		bind:this={cardRef}
		class="relative max-w-3xl w-[92vw] sm:w-[88vw] p-8 sm:p-12 md:p-14 rounded-[36px] sm:rounded-[44px] border border-white/90 bg-white/75 backdrop-blur-3xl shadow-[0_30px_90px_rgba(0,0,0,0.18)] flex flex-col items-center text-center overflow-hidden transition-colors duration-300 apple-glass"
		style="background: radial-gradient(600px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(255, 255, 255, 0.92), rgba(255, 255, 255, var(--glass-opacity, 0.72))), var(--glass-bg, rgba(255, 255, 255, 0.72));"
	>
		<!-- Shimmer Border Accent -->
		<div class="absolute inset-0 rounded-[36px] sm:rounded-[44px] border border-white/60 pointer-events-none"></div>

		<!-- Top System Badge (matches Stage 01 and Section Badges) -->
		<div class="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 text-sky-800 font-mono text-[11px] sm:text-xs tracking-widest uppercase px-4 py-1.5 rounded-full shadow-xs backdrop-blur-md mb-6 sm:mb-8">
			<Sparkles class="w-3.5 h-3.5 text-sky-600 animate-pulse" />
			<span>SPATIAL SYSTEMS ARCHITECT • 2026 KEYNOTE</span>
		</div>

		<!-- Center Main Title Group -->
		<div id="welcome-title-group" class="max-w-2xl space-y-3 sm:space-y-4 mb-8 sm:mb-10">
			<h1
				id="welcome-title-text"
				class="font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-slate-950 uppercase bg-gradient-to-r from-slate-950 via-slate-800 to-slate-950 text-transparent bg-clip-text drop-shadow-xs"
			>
				PARTH KAUSHAL
			</h1>
			<p class="text-xs sm:text-base md:text-lg font-medium text-slate-700 tracking-wide max-w-xl mx-auto leading-relaxed">
				Architecting Next-Gen Spatial Web & Hardware Interfaces
			</p>
			<div class="flex flex-wrap items-center justify-center gap-2 pt-2">
				<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/5 border border-slate-900/10 text-slate-800 text-[11px] font-semibold">
					<span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Live Interactive Keynote
				</span>
				<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/5 border border-slate-900/10 text-slate-800 text-[11px] font-semibold">
					💎 Apple Glass 2.0
				</span>
				<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/5 border border-slate-900/10 text-slate-800 text-[11px] font-semibold">
					🧭 Spatial Choreography
				</span>
			</div>
		</div>

		<!-- Bottom CTA Button -->
		<div>
			<button
				type="button"
				onclick={triggerDescend}
				class="bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-8 py-4 rounded-full transition-all flex items-center gap-3 shadow-[0_12px_32px_rgba(15,23,42,0.3)] hover:scale-105 active:scale-95 cursor-pointer group"
			>
				<span>DESCEND INTO STUDIO</span>
				<ArrowDown class="w-4 h-4 text-white group-hover:translate-y-0.5 transition-transform" />
			</button>
		</div>
	</div>
</div>
