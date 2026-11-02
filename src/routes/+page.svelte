<script lang="ts">
 import { onMount } from 'svelte';
 import { mountApp } from '../v3-app.js';
 let host: HTMLDivElement;
 onMount(() => mountApp(host));
</script>

<div bind:this={host}></div>
