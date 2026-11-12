import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		rolldownOptions: {
			output: {
				// Keep Three's core and WebGL renderer independently cacheable.
				// Avoid bundling the whole renderer into the portfolio page entry.
				codeSplitting: {
					groups: [
						{ name: 'three-core', test: /three\/build\/three\.core\.js/ },
						{ name: 'three-webgl', test: /three\/build\/three\.module\.js/ }
					]
				}
			}
		}
	},
	plugins: [
		tailwindcss(),
		sveltekit()
	]
});
