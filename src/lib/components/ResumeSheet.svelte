<script lang="ts">
	import { playSound } from '$lib/utils/soundEngine';
	import { Download, FileText, X } from 'lucide-svelte';

	let isPdfPreviewOpen = $state(false);
</script>

<div class="card-overlay absolute inset-0 z-30 pointer-events-auto transition-transform duration-500 ease-out">
	<!-- Positioned strictly inside Right Blueprint Paper bounds -->
	<div
		class="absolute left-[53%] top-[12%] w-[36%] h-[76%] p-8 text-slate-900 font-mono rotate-[1deg] mix-blend-multiply flex flex-col justify-between overflow-y-auto no-scrollbar"
	>
		<div>
			<div class="border-b-2 border-slate-900 pb-2 mb-3 flex justify-between items-start">
				<div>
					<h2 class="text-lg font-black tracking-tight text-slate-950">PARTH KAUSHAL</h2>
					<p class="text-[11px] font-bold text-slate-900 uppercase">Senior Systems Architect</p>
				</div>
				<button
					type="button"
					onclick={() => { playSound('click'); isPdfPreviewOpen = true; }}
					class="px-2.5 py-1 border-2 border-slate-900 text-slate-950 text-[10px] font-black uppercase flex items-center gap-1 hover:bg-slate-900 hover:text-white transition-colors cursor-pointer shrink-0"
				>
					<FileText class="w-3 h-3" /> Credentials
				</button>
			</div>
			<div class="space-y-3 text-xs text-slate-950 leading-snug">
				<div>
					<h4 class="font-black text-[11px] uppercase border-b border-slate-900 mb-1">Executive Summary</h4>
					<p class="text-[10px] font-medium">5+ years of experience leading interactive web frontend architectures, high-performance canvas rendering, and 2D spatial UI engines.</p>
				</div>
				<div>
					<h4 class="font-black text-[11px] uppercase border-b border-slate-900 mb-1">Core Competencies</h4>
					<p class="text-[10px] font-medium">SvelteKit, GSAP 3D Timelines, WebM Transparent Video Pipelines, TypeScript, Tailwind CSS, Performance Tuning.</p>
				</div>
			</div>
		</div>
		<div class="border-t border-slate-900 pt-2 flex justify-between items-center text-[9px] font-bold text-slate-900 uppercase tracking-widest shrink-0">
			<span>RESUME_MANIFOLD_02</span>
			<a
				href="/resume.pdf"
				download
				onclick={() => playSound('click')}
				class="hover:underline flex items-center gap-1"
			>
				<Download class="w-3 h-3" /> PDF
			</a>
		</div>
	</div>

	<!-- Extended PDF Credentials Preview Drawer Modal -->
	{#if isPdfPreviewOpen}
		<div class="absolute left-[53%] top-[12%] w-[36%] h-[76%] p-6 text-slate-900 font-mono bg-white/80 backdrop-blur-2xl border-2 border-slate-900 rotate-[1deg] shadow-2xl z-40 flex flex-col justify-between overflow-y-auto no-scrollbar">
			<div>
				<div class="flex items-center justify-between pb-2 border-b-2 border-slate-900 mb-3">
					<h3 class="text-xs font-black uppercase text-slate-950 flex items-center gap-1.5"><FileText class="w-4 h-4 text-sky-700" /> Full Credentials</h3>
					<button
						type="button"
						onclick={() => { playSound('click'); isPdfPreviewOpen = false; }}
						class="p-1 rounded border border-slate-900 hover:bg-slate-900 hover:text-white transition-colors cursor-pointer"
					>
						<X class="w-3.5 h-3.5" />
					</button>
				</div>

				<div class="space-y-3 text-[10px] text-slate-900">
					<div>
						<h4 class="font-black uppercase border-b border-slate-900 mb-1">Career Timeline</h4>
						<p class="font-bold text-sky-800">NationState Simulation (2025)</p>
						<p class="text-[9px]">Full-Stack Web Architect (Supabase & GSAP Canvas Engine)</p>
						<p class="font-bold text-sky-800 mt-1">Resonant AI (2025–2026)</p>
						<p class="text-[9px]">Neural Pipeline Architect (ONNX Speech Normalizers @ IIT Bombay)</p>
					</div>

					<div>
						<h4 class="font-black uppercase border-b border-slate-900 mb-1">Education & Honors</h4>
						<p class="font-bold">B.Tech Computer Science & Engineering</p>
						<p class="text-[9px]">Eureka! IIT Bombay Top Honors; Awwwards Site of the Day Winner</p>
					</div>
				</div>
			</div>

			<div class="flex items-center justify-between pt-2 border-t border-slate-900 text-[9px] font-bold">
				<span>VERIFIED_DOCUMENT</span>
				<a
					href="/resume.pdf"
					download
					onclick={() => playSound('click')}
					class="px-2 py-1 bg-slate-900 text-white rounded font-black uppercase flex items-center gap-1 hover:bg-slate-800 transition-colors"
				>
					<Download class="w-3 h-3" /> Download PDF
				</a>
			</div>
		</div>
	{/if}
</div>
