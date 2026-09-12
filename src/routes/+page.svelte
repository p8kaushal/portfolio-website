<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import PresenterStage from '$lib/components/PresenterStage.svelte';
	import MobileTablet from '$lib/components/MobileTablet.svelte';
</script>

<svelte:head>
	<title>Apple Keynote Interactive Portfolio</title>
	<meta name="description" content="Apple Keynote-inspired interactive spatial developer portfolio" />
</svelte:head>

<main class="relative w-full h-screen overflow-hidden bg-neutral-950 font-sans">
	<Navbar />
	<PresenterStage />
	<MobileTablet />
</main>
