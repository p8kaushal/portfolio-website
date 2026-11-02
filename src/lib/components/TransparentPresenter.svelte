<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	interface Props {
		webmSrc?: string;
		movSrc?: string;
		class?: string;
		id?: string;
		alt?: string;
		enableCanvasFallback?: boolean;
		chromaKeyGreen?: boolean;
		chromaKeyBlack?: boolean;
	}

	let {
		webmSrc = '/videos/presenter-transparent.webm',
		movSrc = '/videos/presenter-transparent.mov',
		class: className = 'w-auto h-full object-contain pointer-events-none select-none',
		id = 'transparent-presenter-video',
		alt = 'Presenter avatar with transparent background',
		enableCanvasFallback = false,
		chromaKeyGreen = true,
		chromaKeyBlack = false
	}: Props = $props();

	let videoEl = $state<HTMLVideoElement | null>(null);
	let canvasEl = $state<HTMLCanvasElement | null>(null);
	let isPlaying = $state(false);
	let hasError = $state(false);
	let animFrameId: number | null = null;
	let useCanvas = $state(false);

	$effect(() => {
		useCanvas = enableCanvasFallback;
	});

	// Real-time canvas fallback processing
	function renderCanvasLoop() {
		if (!videoEl || !canvasEl || videoEl.paused || videoEl.ended) {
			animFrameId = requestAnimationFrame(renderCanvasLoop);
			return;
		}

		const ctx = canvasEl.getContext('2d', { willReadFrequently: true });
		if (ctx && videoEl.videoWidth > 0 && videoEl.videoHeight > 0) {
			if (canvasEl.width !== videoEl.videoWidth || canvasEl.height !== videoEl.videoHeight) {
				canvasEl.width = videoEl.videoWidth;
				canvasEl.height = videoEl.videoHeight;
			}

			ctx.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);
			const frame = ctx.getImageData(0, 0, canvasEl.width, canvasEl.height);
			const data = frame.data;

			for (let i = 0; i < data.length; i += 4) {
				const r = data[i];
				const g = data[i + 1];
				const b = data[i + 2];

				// Chroma Key #00FF00 green spill & matte removal
				const isGreen = chromaKeyGreen && (g > 60 && g > r * 1.2 && g > b * 1.2);
				// Chroma Key black matte removal if applicable
				const isBlack = chromaKeyBlack && (r < 18 && g < 18 && b < 18);

				if (isGreen || isBlack) {
					data[i + 3] = 0; // Transparent alpha
				} else if (chromaKeyGreen && g > 70 && g > r && g > b) {
					// Soft edge despill
					data[i + 1] = Math.max(r, b);
				}
			}
			ctx.putImageData(frame, 0, 0);
		}

		animFrameId = requestAnimationFrame(renderCanvasLoop);
	}

	function handlePlaying() {
		isPlaying = true;
		if (useCanvas) {
			renderCanvasLoop();
		}
	}

	function handleError(e: Event) {
		console.warn('[TransparentPresenter] Video source error, falling back to canvas pipeline:', e);
		hasError = true;
		useCanvas = true;
	}

	onMount(() => {
		if (videoEl) {
			// Trigger silent autoplay with error catch to satisfy strict autoplay policies
			const playPromise = videoEl.play();
			if (playPromise !== undefined) {
				playPromise
					.then(() => {
						isPlaying = true;
					})
					.catch((err) => {
						console.log('[TransparentPresenter] Autoplay waiting or muted required:', err);
					});
			}

			if (useCanvas) {
				videoEl.addEventListener('play', renderCanvasLoop);
			}
		}
	});

	onDestroy(() => {
		if (animFrameId !== null) {
			cancelAnimationFrame(animFrameId);
		}
	});
</script>

{#if useCanvas}
	<video
		bind:this={videoEl}
		{id}
		autoplay
		loop
		muted
		playsinline
		onplaying={handlePlaying}
		onerror={handleError}
		class="hidden"
		aria-hidden="true"
	>
		<source src={webmSrc} type="video/webm; codecs=vp9" />
		<source src={movSrc} type="video/quicktime" />
	</video>
	<canvas
		bind:this={canvasEl}
		class={className}
		aria-label={alt}
	></canvas>
{:else}
	<video
		bind:this={videoEl}
		{id}
		autoplay
		loop
		muted
		playsinline
		onplaying={handlePlaying}
		onerror={handleError}
		class={className}
		aria-label={alt}
	>
		<source src={webmSrc} type="video/webm; codecs=vp9" />
		<source src={movSrc} type="video/quicktime" />
	</video>
{/if}
