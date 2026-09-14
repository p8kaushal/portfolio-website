<script lang="ts">
	import { systemSettings } from '$lib/stores/glassSettings';
	import { playSound } from '$lib/utils/soundEngine';

	let { project, onClose }: { project: any; onClose: () => void } = $props();
</script>

<!-- Absolute In-Monitor Overlay (Fits Strictly Inside Screen Bezels) -->
<div 
  id="project-detail-modal"
  class="absolute inset-0 z-40 flex flex-col justify-between p-6 md:p-8 bg-slate-950/90 text-white pointer-events-auto transition-all duration-300 overflow-hidden"
  style="background-color: rgba(15, 23, 42, {$systemSettings.opacity + 0.2}); backdrop-filter: blur({$systemSettings.blur}px); -webkit-backdrop-filter: blur({$systemSettings.blur}px);"
>
  <!-- In-Monitor Header -->
  <div class="w-full pb-4 border-b border-white/15 flex justify-between items-center shrink-0">
    <div class="flex items-center gap-3">
      <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
      <span class="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">{project.title} // Details Inspector</span>
    </div>
    <button 
      type="button"
      onclick={() => { playSound('click'); onClose(); }}
      class="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
    >
      <span>✕ CLOSE</span>
    </button>
  </div>

  <!-- In-Monitor Split Content Body -->
  <div class="flex-1 overflow-y-auto py-6 grid grid-cols-1 md:grid-cols-12 gap-6">
    <!-- Left Media Column (6 Cols) -->
    <div class="md:col-span-6 flex flex-col space-y-4">
      <div class="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/20 bg-slate-900 shadow-2xl">
        {#if project.videoUrl}
          <video src={project.videoUrl} autoplay loop muted playsinline class="w-full h-full object-cover"></video>
        {:else}
          <img src={project.thumbnailUrl || '/images/projects/placeholder.jpg'} alt={project.title} class="w-full h-full object-cover" />
        {/if}
      </div>
    </div>

    <!-- Right Specs & CTAs Column (6 Cols) -->
    <div class="md:col-span-6 flex flex-col justify-between space-y-4">
      <div>
        <h2 class="text-2xl font-black text-white">{project.title}</h2>
        <p class="text-xs text-slate-200 mt-2 font-medium leading-relaxed">
          {project.longDescription || project.description}
        </p>

        <div class="mt-4">
          <h4 class="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider mb-2">Technologies</h4>
          <div class="flex flex-wrap gap-1.5">
            {#each (project.tags || []) as tag}
              <span class="text-xs font-mono font-bold px-2.5 py-1 bg-white/10 rounded-lg text-white border border-white/15">{tag}</span>
            {/each}
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-3 pt-4 border-t border-white/15">
        {#if project.liveUrl}
          <a 
            href={project.liveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            class="flex-1 text-center py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono text-xs font-black shadow-lg transition-all"
          >
            🚀 LIVE DEMO ↗
          </a>
        {/if}
        {#if project.githubUrl}
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            class="flex-1 text-center py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/20 text-white font-mono text-xs font-bold transition-all"
          >
            GITHUB ↗
          </a>
        {/if}
      </div>
    </div>
  </div>
</div>
