<script lang="ts">
 import { onMount } from 'svelte';
 import { mountApp } from '../v3-app.js';
 import { portfolio } from '../content.js';
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

<noscript>
 <main class="no-script-portfolio">
  <h1>{portfolio.name}</h1>
  <p>{portfolio.title} · {portfolio.location}</p>
  {#each portfolio.about as paragraph}<p>{paragraph}</p>{/each}
  <h2>Projects</h2>
  {#each portfolio.projects as project}
   <article><h3>{project.title}</h3><p>{project.description}</p><p>{project.details}</p><a href={project.githubUrl}>View repository: {project.title}</a></article>
  {/each}
  <h2>Experience</h2>
  {#each portfolio.experience as entry}<article><h3>{entry.title}</h3><p>{entry.meta}</p><p>{entry.description}</p></article>{/each}
  <h2>Achievements</h2>
  {#each portfolio.achievements as achievement}<article><h3>{achievement.title}</h3><p>{achievement.meta}</p><p>{achievement.description}</p></article>{/each}
  <h2>Skills</h2>
  {#each portfolio.skills as group}<p><strong>{group.title}:</strong> {group.details}</p>{/each}
  <h2>Contact</h2>
  <p><a href={portfolio.resumeUrl}>View résumé</a></p>
  {#each portfolio.contact as contact}{#if contact.href}<p><a href={contact.href}>{contact.title}: {contact.label}</a></p>{/if}{/each}
 </main>
</noscript>
<style>
 .no-script-portfolio { max-width: 52rem; margin: 3rem auto; padding: 0 1.25rem; font: 16px/1.6 system-ui, sans-serif; color: #26382d; }
 .no-script-portfolio article { margin-bottom: 1.5rem; }
 .no-script-portfolio a { color: #315d43; }
</style>
