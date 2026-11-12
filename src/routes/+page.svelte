<script lang="ts">
 import { onMount } from 'svelte';
 import { mountApp } from '../v3-app.js';
 let host: HTMLDivElement;
 onMount(() => {
   let dispose: (() => void) | undefined;
   let generation = 0;
   let active = true;
   async function start(override?: { mode: string; recovery?: boolean }) {
     const current = ++generation;
     dispose?.();
     dispose = undefined;
     const cleanup = await mountApp(host, override);
     if (!active || current !== generation) cleanup();
     else dispose = cleanup;
   }
   function apply(event: Event) { void start((event as CustomEvent).detail); }
   host.addEventListener('house-style-apply', apply);
   void start();
   return () => { active = false; generation++; host.removeEventListener('house-style-apply', apply); dispose?.(); };
 });
</script>

<div bind:this={host}></div>
