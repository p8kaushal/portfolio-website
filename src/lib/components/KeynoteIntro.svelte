<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	let overlayRef = $state<HTMLElement | null>(null);
	let contentRef = $state<HTMLElement | null>(null);
	let isVisible = $state(true);

	onMount(() => {
		if (!overlayRef || !contentRef) return;

		const tl = gsap.timeline({
			onComplete: () => {
				isVisible = false;
			}
		});

		tl.fromTo(
			contentRef,
			{ scale: 0.94, opacity: 0, y: 15 },
			{ scale: 1, opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
		)
			.to(contentRef, { opacity: 0.9, duration: 0.5 }, '+=0.2')
			.to(contentRef, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' }, '+=0.2')
			.to(overlayRef, { opacity: 0, backdropFilter: 'blur(0px)', duration: 0.5, ease: 'power2.inOut' }, '-=0.2');
	});
</script>

{#if isVisible}
	<div
		bind:this={overlayRef}
		class="fixed inset-0 z-[100] bg-white/90 backdrop-blur-3xl flex flex-col items-center justify-center pointer-events-none select-none text-neutral-900"
	>
		<div bind:this={contentRef} class="text-center px-6 max-w-3xl">
			<span
				class="inline-block px-4 py-1.5 rounded-full bg-sky-500/10 text-sky-700 font-mono text-xs sm:text-sm font-bold uppercase tracking-widest mb-4 border border-sky-400/20"
			>
				STAGE 01 // APPLE KEYNOTE EDITION
			</span>
			<h1 class="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900 leading-tight mb-4">
				PARTH KAUSHAL
			</h1>
			<p class="text-base sm:text-xl font-medium text-neutral-600 tracking-wide">
				Creative Developer & Systems Architect
			</p>
		</div>
	</div>
{/if}
