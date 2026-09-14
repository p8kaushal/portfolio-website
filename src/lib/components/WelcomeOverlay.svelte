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
	class="fixed inset-0 z-50 flex flex-col items-center justify-center py-12 px-6 pointer-events-auto bg-black/75 backdrop-blur-2xl text-center select-none overflow-hidden"
>
	<!-- Studio Color Harmonization Ambient Background Glows -->
	<div class="absolute -left-32 top-1/4 w-[500px] h-[500px] rounded-full bg-amber-600/18 blur-[120px] pointer-events-none"></div>
	<div class="absolute -right-32 bottom-1/4 w-[500px] h-[500px] rounded-full bg-sky-500/12 blur-[120px] pointer-events-none"></div>

	<!-- Main Interactive 3D Parallax Glass Card -->
	<div
		id="welcome-glass-card"
		bind:this={cardRef}
		class="relative max-w-4xl w-[90vw] p-10 md:p-16 rounded-[40px] border border-white/20 bg-slate-950/60 backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,0.85)] flex flex-col items-center text-center overflow-hidden transition-colors duration-300"
		style="background: radial-gradient(600px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(255, 255, 255, 0.12), transparent 40%), rgba(15, 23, 42, var(--glass-opacity, 0.65));"
	>
		<!-- Shimmer Border Accent -->
		<div class="absolute inset-0 rounded-[40px] border border-white/10 pointer-events-none"></div>

		<!-- Top System Badge -->
		<div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 font-mono text-xs tracking-widest uppercase px-4 py-1.5 rounded-full shadow-lg backdrop-blur-md mb-8">
			<Sparkles class="w-3.5 h-3.5 text-amber-400 animate-pulse" />
			<span>SPATIAL SYSTEMS ARCHITECT • 2026 KEYNOTE</span>
		</div>

		<!-- Center Main Title Group -->
		<div id="welcome-title-group" class="max-w-3xl space-y-4 mb-10">
			<h1
				id="welcome-title-text"
				class="font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-white drop-shadow-[0_20px_50px_rgba(255,255,255,0.15)] uppercase bg-[length:200%_auto]"
			>
				PARTH KAUSHAL
			</h1>
			<p class="text-sm sm:text-lg md:text-xl font-medium text-slate-300 tracking-wide max-w-2xl mx-auto">
				Architecting Next-Gen Spatial Web & Hardware Interfaces
			</p>
		</div>

		<!-- Bottom CTA Button -->
		<div>
			<button
				type="button"
				onclick={triggerDescend}
				class="bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold text-sm px-8 py-4 rounded-full transition-all flex items-center gap-3 shadow-2xl cursor-pointer hover:scale-105 active:scale-95 group"
			>
				<span>DESCEND INTO STUDIO</span>
				<ArrowDown class="w-4 h-4 text-white group-hover:translate-y-0.5 transition-transform" />
			</button>
		</div>
	</div>
</div>
