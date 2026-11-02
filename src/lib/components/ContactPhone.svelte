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
			<p class="text-xs text-slate-300 leading-snug mb-6">Available for architecture roles, virtual keynotes & spatial web projects.</p>
			<button
				type="button"
				onclick={() => { playSound('click'); isFormView = true; }}
				class="w-full py-3 px-4 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg"
			>
				<MessageSquare class="w-4 h-4" /> Send Quick Message
			</button>
		</div>

		<div class="grid grid-cols-2 gap-3 mb-2">
			<a
				href="mailto:parthkaushal1008@gmail.com"
				onmouseenter={() => playSound('click')}
				onclick={() => playSound('click')}
				class="bg-white/10 backdrop-blur-xl border border-white/15 hover:bg-white/20 text-white font-semibold rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer"
			>
				<Mail class="w-6 h-6 text-sky-400 shrink-0" />
				<span class="text-xs font-bold">Email</span>
			</a>
			<a
				href="https://github.com/p8kaushal"
				target="_blank"
				rel="noreferrer"
				onmouseenter={() => playSound('click')}
				onclick={() => playSound('click')}
				class="bg-white/10 backdrop-blur-xl border border-white/15 hover:bg-white/20 text-white font-semibold rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer"
			>
				<svg class="w-6 h-6 text-purple-400 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
				<span class="text-xs font-bold">GitHub</span>
			</a>
			<a
				href="https://www.linkedin.com/in/parth-kaushal-0b3518386/"
				target="_blank"
				rel="noreferrer"
				onmouseenter={() => playSound('click')}
				onclick={() => playSound('click')}
				class="bg-white/10 backdrop-blur-xl border border-white/15 hover:bg-white/20 text-white font-semibold rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer"
			>
				<svg class="w-6 h-6 text-blue-400 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
				<span class="text-xs font-bold">LinkedIn</span>
			</a>
			<a
				href="https://x.com/_ParthKaushal"
				target="_blank"
				rel="noreferrer"
				onmouseenter={() => playSound('click')}
				onclick={() => playSound('click')}
				class="bg-white/10 backdrop-blur-xl border border-white/15 hover:bg-white/20 text-white font-semibold rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer"
			>
				<svg class="w-6 h-6 text-sky-300 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
				<span class="text-xs font-bold">X / Twitter</span>
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
