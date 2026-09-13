<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let { videoSrc, positionClass = '' } = $props<{
		videoSrc: string;
		positionClass?: string;
	}>();

	let videoEl = $state<HTMLVideoElement | null>(null);
	let canvasEl = $state<HTMLCanvasElement | null>(null);
	let animId: number | null = null;

	function processFrame() {
		if (!videoEl || !canvasEl || videoEl.paused || videoEl.ended) {
			animId = requestAnimationFrame(processFrame);
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
			const d = frame.data;

			for (let i = 0; i < d.length; i += 4) {
				const r = d[i], g = d[i + 1], b = d[i + 2];

				// Key out Green screen (#00FF00) AND Pitch Black (#000000)
				const isGreen = g > 80 && g > r * 1.25 && g > b * 1.25;
				const isBlack = r < 18 && g < 18 && b < 18;

				if (isGreen || isBlack) {
					d[i + 3] = 0; // Alpha = 0 (Transparent)
				}
			}
			ctx.putImageData(frame, 0, 0);
		}
		animId = requestAnimationFrame(processFrame);
	}

	onMount(() => {
		if (videoEl) {
			videoEl.addEventListener('play', () => processFrame());
			if (!videoEl.paused) processFrame();
		}
	});

	onDestroy(() => {
		if (animId !== null) cancelAnimationFrame(animId);
	});
</script>

<div class={`absolute z-20 pointer-events-none ${positionClass}`}>
	<video bind:this={videoEl} src={videoSrc} autoplay loop muted playsinline class="hidden"></video>
	<canvas id="presenter-canvas" bind:this={canvasEl} class="h-[82vh] w-auto object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)]"></canvas>
</div>
