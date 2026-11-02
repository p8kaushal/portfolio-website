<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { playSound } from '$lib/utils/soundEngine';
	import { Mail, Send, CheckCircle2, MessageSquare } from 'lucide-svelte';

	let isFormView = $state(false);
	let name = $state('');
	let email = $state('');
	let message = $state('');
	let isSent = $state(false);
	let phoneEl = $state<HTMLElement | null>(null);

	onMount(() => {
		const el = document.getElementById('contact-phone-root');
		if (el) {
			gsap.fromTo(
				el,
				{ y: 300, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.65, ease: 'back.out(1.1)', clearProps: 'transform' }
			);
		}
	});

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		playSound('click');
		isSent = true;
		setTimeout(() => {
			isSent = false;
			isFormView = false;
			name = '';
			email = '';
			message = '';
		}, 2000);
	}
</script>

<div
	id="contact-phone-root"
	bind:this={phoneEl}
	class="w-[360px] h-[700px] max-h-[82vh] rounded-[48px] border-4 border-slate-700/60 shadow-[0_25px_70px_rgba(0,0,0,0.85),inset_0_1px_2px_rgba(255,255,255,0.3)] relative overflow-hidden flex flex-col justify-between p-6 text-white"
	style="background-color: rgba(15, 23, 42, var(--glass-opacity, 0.85)); backdrop-filter: blur(var(--glass-blur, 24px));"
>
	<!-- Side Hardware Buttons Mock -->
	<div class="absolute -right-[7px] top-32 w-[3px] h-14 bg-slate-700 rounded-r-md"></div>
	<div class="absolute -left-[7px] top-28 w-[3px] h-10 bg-slate-700 rounded-l-md"></div>
	<div class="absolute -left-[7px] top-42 w-[3px] h-10 bg-slate-700 rounded-l-md"></div>

	<!-- Dynamic Island / Notch Mock -->
	<div class="w-28 h-7 bg-black rounded-full mx-auto mb-4 border border-white/10 flex items-center justify-center shrink-0">
		<div class="w-3 h-3 rounded-full bg-slate-900 border border-slate-700 mr-2"></div>
		<div class="w-2 h-2 rounded-full bg-blue-900/60"></div>
	</div>

	{#if !isFormView}
		<div class="text-center my-auto px-2">
			<h3 class="text-2xl font-extrabold text-white mb-2 tracking-tight">Get In Touch</h3>
			<p class="text-xs text-slate-300 leading-snug mb-5">Available for hackathons, collaborations & software development opportunities.</p>
			<button
				type="button"
				onclick={() => { playSound('click'); isFormView = true; }}
				class="w-full py-2.5 px-4 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg"
			>
				<MessageSquare class="w-4 h-4" /> Send Direct Message
			</button>
		</div>

		<div class="grid grid-cols-3 gap-2 mb-2">
			<a
				href="mailto:parth.kaushal.007@gmail.com"
				onmouseenter={() => playSound('click')}
				onclick={() => playSound('click')}
				class="bg-white/10 backdrop-blur-xl border border-white/15 hover:bg-white/20 text-white font-semibold rounded-2xl p-2.5 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer"
			>
				<Mail class="w-5 h-5 text-sky-400 shrink-0" />
				<span class="text-[11px] font-bold">Email</span>
			</a>
			<a
				href="https://github.com/p8kaushal"
				target="_blank"
				rel="noreferrer"
				onmouseenter={() => playSound('click')}
				onclick={() => playSound('click')}
				class="bg-white/10 backdrop-blur-xl border border-white/15 hover:bg-white/20 text-white font-semibold rounded-2xl p-2.5 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer"
			>
				<svg class="w-5 h-5 text-purple-400 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
				<span class="text-[11px] font-bold">GitHub</span>
			</a>
			<a
				href="https://linkedin.com/in/parthkaushal"
				target="_blank"
				rel="noreferrer"
				onmouseenter={() => playSound('click')}
				onclick={() => playSound('click')}
				class="bg-white/10 backdrop-blur-xl border border-white/15 hover:bg-white/20 text-white font-semibold rounded-2xl p-2.5 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer"
			>
				<svg class="w-5 h-5 text-blue-400 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
				<span class="text-[11px] font-bold">LinkedIn</span>
			</a>
			<a
				href="https://x.com/_ParthKaushal"
				target="_blank"
				rel="noreferrer"
				onmouseenter={() => playSound('click')}
				onclick={() => playSound('click')}
				class="bg-white/10 backdrop-blur-xl border border-white/15 hover:bg-white/20 text-white font-semibold rounded-2xl p-2.5 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer"
			>
				<svg class="w-5 h-5 text-sky-300 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
				<span class="text-[11px] font-bold">Twitter/X</span>
			</a>
			<a
				href="https://wa.me/919834491082"
				target="_blank"
				rel="noreferrer"
				onmouseenter={() => playSound('click')}
				onclick={() => playSound('click')}
				class="bg-white/10 backdrop-blur-xl border border-white/15 hover:bg-white/20 text-white font-semibold rounded-2xl p-2.5 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer"
			>
				<svg class="w-5 h-5 text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
				<span class="text-[11px] font-bold">WhatsApp</span>
			</a>
			<a
				href="https://t.me/parthkaushal"
				target="_blank"
				rel="noreferrer"
				onmouseenter={() => playSound('click')}
				onclick={() => playSound('click')}
				class="bg-white/10 backdrop-blur-xl border border-white/15 hover:bg-white/20 text-white font-semibold rounded-2xl p-2.5 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer"
			>
				<svg class="w-5 h-5 text-sky-400 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.536-.196 1.006.128.832.942z"/></svg>
				<span class="text-[11px] font-bold">Telegram</span>
			</a>
		</div>
	{:else}
		<!-- Interactive Quick-Send Glass Contact Form -->
		<form onsubmit={handleSubmit} class="flex-1 my-auto flex flex-col justify-between py-2 text-xs">
			<div class="flex items-center justify-between border-b border-white/20 pb-3 mb-3">
				<span class="font-black text-sm text-sky-400">Quick Message</span>
				<button
					type="button"
					onclick={() => { playSound('click'); isFormView = false; }}
					class="text-xs text-slate-400 hover:text-white font-bold cursor-pointer"
				>
					[Cancel]
				</button>
			</div>

			{#if isSent}
				<div class="my-auto text-center p-6 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
					<CheckCircle2 class="w-10 h-10 text-emerald-400 mx-auto mb-3 animate-bounce" />
					<p class="font-extrabold text-base">Signal Transmitted!</p>
					<p class="text-xs text-slate-300 mt-1">Thank you, Parth will reach back shortly.</p>
				</div>
			{:else}
				<div class="space-y-3">
					<div>
						<label for="phone-name-input" class="block text-[10px] font-mono font-bold text-slate-300 uppercase mb-1">YOUR NAME</label>
						<input
							id="phone-name-input"
							type="text"
							bind:value={name}
							required
							placeholder="John Doe"
							class="bg-white/10 border border-white/20 text-white placeholder-slate-400 rounded-xl p-3 w-full focus:outline-none focus:border-white/50"
						/>
					</div>

					<div>
						<label for="phone-email-input" class="block text-[10px] font-mono font-bold text-slate-300 uppercase mb-1">EMAIL ADDRESS</label>
						<input
							id="phone-email-input"
							type="email"
							bind:value={email}
							required
							placeholder="john@example.com"
							class="bg-white/10 border border-white/20 text-white placeholder-slate-400 rounded-xl p-3 w-full focus:outline-none focus:border-white/50"
						/>
					</div>

					<div>
						<label for="phone-message-input" class="block text-[10px] font-mono font-bold text-slate-300 uppercase mb-1">MESSAGE</label>
						<textarea
							id="phone-message-input"
							bind:value={message}
							required
							rows="3"
							placeholder="Hello Parth..."
							class="bg-white/10 border border-white/20 text-white placeholder-slate-400 rounded-xl p-3 w-full focus:outline-none focus:border-white/50 resize-none"
						></textarea>
					</div>
				</div>

				<button
					type="submit"
					class="mt-4 w-full py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
				>
					<Send class="w-4 h-4" /> Transmit Message
				</button>
			{/if}
		</form>
	{/if}

	<!-- iPhone Home Bar Indicator -->
	<div class="w-32 h-1 bg-slate-500 rounded-full mx-auto mt-2 shrink-0"></div>
</div>
