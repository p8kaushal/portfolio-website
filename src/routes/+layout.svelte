<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="relative w-screen h-screen overflow-hidden bg-neutral-950 text-neutral-100 select-none">
	<div class="canvas-container-full bg-neutral-950">
		{@render children()}
	</div>
</div>
