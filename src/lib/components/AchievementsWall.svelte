<script lang="ts">
	import { playSound } from '$lib/utils/soundEngine';
	import { Award, ChevronLeft, ChevronRight, ShieldCheck, X } from 'lucide-svelte';

	let carouselRef = $state<HTMLElement | null>(null);
	let activeCertificateModal = $state<any | null>(null);

	const awards = [
		{
			title: 'Awwwards Site of the Day',
			year: '2025',
			org: 'Awwwards International',
			details: 'Recognized for outstanding web design, interactive spatial UI, and sub-second performance.',
			seal: 'GOLD CERTIFICATE #2025-AWD-01',
			verification: 'Verified by International Jury Panel'
		},
		{
			title: 'FWA of the Month',
			year: '2024',
			org: 'Favorite Website Awards',
			details: 'Awarded for pioneering GSAP spatial camera transitions and 4-layer composition engines.',
			seal: 'GOLD CERTIFICATE #2024-FWA-04',
			verification: 'Verified by FWA Official Board'
		},
		{
			title: 'Apple Design Award Nominee',
			year: '2024',
			org: 'WWDC Developer Showcase',
			details: 'Nominated for Apple Keynote-inspired human-scale portfolio interface.',
			seal: 'FINALIST HONORS #WWDC-2024',
			verification: 'Verified by WWDC Developer Showcase'
		},
		{
			title: 'Best Web Animation',
			year: '2023',
			org: 'CSS Design Awards',
			details: 'Honored for 60 FPS motion-blur camera transitions.',
			seal: 'SPECIAL KUDOS #2023-CSSDA',
			verification: 'Verified by CSS Design Awards Committee'
		}
	];

	function scrollCarousel(direction: 'left' | 'right') {
		playSound('click');
		if (carouselRef) {
			const scrollAmount = direction === 'left' ? -320 : 320;
			carouselRef.scrollBy({ left: scrollAmount, behavior: 'smooth' });
		}
	}
</script>

<div class="card-overlay absolute inset-0 z-30 flex items-center justify-center p-6 pointer-events-auto">
	<div class="relative w-full max-w-5xl">
		<button
			type="button"
			onclick={() => scrollCarousel('left')}
			class="absolute -left-6 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full backdrop-blur-xl bg-slate-900/80 border border-white/20 text-white shadow-2xl hover:bg-slate-800 transition-all cursor-pointer"
			aria-label="Scroll Carousel Left"
		>
			<ChevronLeft class="w-6 h-6" />
		</button>
		<button
			type="button"
			onclick={() => scrollCarousel('right')}
			class="absolute -right-6 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full backdrop-blur-xl bg-slate-900/80 border border-white/20 text-white shadow-2xl hover:bg-slate-800 transition-all cursor-pointer"
			aria-label="Scroll Carousel Right"
		>
			<ChevronRight class="w-6 h-6" />
		</button>

		<div bind:this={carouselRef} class="flex gap-8 overflow-x-auto snap-x scrollbar-none p-6">
			{#each awards as award}
				<button
					type="button"
					onmouseenter={() => playSound('click')}
					onclick={() => { playSound('click'); activeCertificateModal = award; }}
					class="snap-center shrink-0 w-80 text-left p-6 rounded-sm border-[10px] border-[#2a1a0e] bg-[#faf7f2] text-slate-900 shadow-[0_25px_60px_rgba(0,0,0,0.85)] hover:scale-[1.03] transition-all duration-300 cursor-pointer relative group"
				>
					<div class="mb-3 flex items-center justify-between">
						<Award class="w-8 h-8 text-amber-700" />
						<span class="bg-amber-500/15 text-amber-800 border border-amber-500/40 text-[10px] font-mono px-2.5 py-1 rounded-full font-bold">
							{award.year}
						</span>
					</div>
					<h4 class="text-xl font-serif font-bold text-slate-900 group-hover:text-amber-800 transition-colors mb-1">{award.title}</h4>
					<p class="text-xs font-serif text-slate-600 mb-3">{award.org}</p>
					<p class="text-[11px] font-serif text-slate-700 leading-relaxed line-clamp-2">{award.details}</p>
				</button>
			{/each}
		</div>
	</div>

	<!-- Interactive Framed Certificate Inspection Modal -->
	{#if activeCertificateModal}
		<div class="fixed inset-0 z-50 bg-black/40 backdrop-blur-3xl flex items-center justify-center p-6 pointer-events-auto">
			<div class="relative w-full max-w-lg rounded-sm border-[12px] border-[#2a1a0e] bg-[#faf7f2] p-8 text-slate-900 shadow-[0_25px_60px_rgba(0,0,0,0.85)] font-serif">
				<button
					type="button"
					onclick={() => { playSound('click'); activeCertificateModal = null; }}
					class="absolute top-3 right-3 p-1.5 rounded-full bg-amber-900/10 hover:bg-amber-900/20 text-slate-800 transition-colors cursor-pointer"
				>
					<X class="w-5 h-5" />
				</button>

				<div class="text-center">
					<div class="w-12 h-12 rounded-full bg-amber-500/20 border-2 border-amber-600 mx-auto flex items-center justify-center mb-3">
						<Award class="w-6 h-6 text-amber-700" />
					</div>
					<span class="font-mono text-[10px] font-bold text-amber-800 uppercase tracking-widest block mb-1">
						{activeCertificateModal.seal}
					</span>
					<h3 class="text-2xl font-serif font-bold text-slate-900 mb-1">{activeCertificateModal.title}</h3>
					<p class="text-xs font-serif font-bold text-amber-900 uppercase mb-4">{activeCertificateModal.org} • {activeCertificateModal.year}</p>
					<p class="text-xs font-serif text-slate-700 leading-relaxed italic mb-6">{activeCertificateModal.details}</p>

					<div class="pt-4 border-t border-amber-900/20 flex items-center justify-between text-[10px] font-mono text-slate-600">
						<span class="flex items-center gap-1 font-bold text-emerald-700"><ShieldCheck class="w-4 h-4" /> OFFICIAL SEAL</span>
						<span>{activeCertificateModal.verification}</span>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
