<script lang="ts">
	import { systemSettings } from '$lib/stores/glassSettings';
	import { playSound } from '$lib/utils/soundEngine';

	let { achievement, onClose }: { achievement: any; onClose: () => void } = $props();
</script>

<div 
  id="certificate-detail-modal"
  class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-2xl pointer-events-auto"
>
  <div 
    class="relative w-full max-w-3xl rounded-3xl border border-white/20 bg-slate-950/90 shadow-[0_35px_90px_rgba(0,0,0,0.7)] p-8 md:p-12 text-white flex flex-col justify-between overflow-hidden"
    style="background-color: rgba(15, 23, 42, {$systemSettings.opacity + 0.2}); backdrop-filter: blur({$systemSettings.blur}px);"
  >
    <!-- Top Header -->
    <div class="flex justify-between items-start border-b border-white/15 pb-6">
      <div>
        <span class="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono font-bold text-amber-400 rounded-full uppercase tracking-wider">
          {achievement.badge} // {achievement.year}
        </span>
        <h2 class="text-3xl font-black text-white mt-2 font-serif">{achievement.title}</h2>
        <p class="text-xs text-slate-400 font-mono mt-1">ISSUED BY: {achievement.issuer}</p>
      </div>

      <button 
        type="button"
        onclick={() => { playSound('click'); onClose(); }}
        class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-sm font-bold flex items-center justify-center transition-colors cursor-pointer"
      >
        ✕
      </button>
    </div>

    <!-- Modal Body Details -->
    <div class="my-6 space-y-4 text-slate-200">
      <div class="p-4 rounded-xl bg-white/5 border border-white/10">
        <h4 class="text-[10px] font-mono font-bold uppercase text-amber-400 tracking-wider">Executive Citation</h4>
        <p class="text-xs font-medium leading-relaxed mt-1 text-slate-200">{achievement.description}</p>
      </div>

      <div class="p-4 rounded-xl bg-white/5 border border-white/10">
        <h4 class="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">Verification Breakdown</h4>
        <p class="text-xs font-medium leading-relaxed mt-1 text-slate-300">{achievement.details}</p>
      </div>
    </div>

    <!-- Bottom Action & Verification Bar -->
    <div class="pt-6 border-t border-white/15 flex justify-between items-center text-xs font-mono">
      <span class="text-slate-400">ID: {achievement.certificateCode}</span>
      <button 
        type="button"
        onclick={() => { playSound('click'); onClose(); }}
        class="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl font-bold shadow-lg transition-all hover:scale-105 cursor-pointer"
      >
        DONE INSPECTING
      </button>
    </div>
  </div>
</div>
