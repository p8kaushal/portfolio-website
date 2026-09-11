<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import PresenterStage from '$lib/components/PresenterStage.svelte';
	import MobileTablet from '$lib/components/MobileTablet.svelte';
</script>

<svelte:head>
	<title>Parth Kaushal — Apple Keynote / Game Interactive Portfolio</title>
	<meta
		name="description"
		content="Interactive Apple Keynote-style spatial portfolio featuring a 4-layer composition model, transparent presenter video keying, and responsive tablet UI."
	/>
</svelte:head>

<main class="w-screen h-screen overflow-hidden bg-neutral-950 select-none relative font-sans text-neutral-100">
	<!-- Top Fortnite / Apple Style Navbar -->
	<Navbar />

	<!-- 4-Layer Desktop Presenter Stage -->
	<PresenterStage />

	<!-- Mobile Handheld Glass Tablet UI (Rendered on viewports < 768px) -->
	<MobileTablet />
</main>
