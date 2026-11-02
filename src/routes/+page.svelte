<script lang="ts">
 import { onMount } from 'svelte';
 import { mountApp } from '../v3-app.js';
 let host: HTMLDivElement;
 onMount(() => mountApp(host));
</script>
<svelte:head><title>Parth Kaushal — Portfolio House</title><meta name="description" content="Explore the work and story of Parth Kaushal in an interactive portfolio house." /></svelte:head>
<div bind:this={host}></div>
