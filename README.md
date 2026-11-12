# Parth Kaushal — Portfolio House

An interactive, code-built portfolio: explore the house in first person or use the portfolio menu for direct access to projects, experience, skills, achievements and contact details. A 2D version is available as a fallback.

## Local development

Use Node.js 24 and npm:

```sh
npm ci
npm run dev
```

The predev and prebuild scripts prepare a minimal `.generated-static` directory from the résumé and 2D source. They also generate the 2D portfolio content from `src/content.js`, so the two experiences use the same projects, experience, skills and achievements.

```sh
npm run lint
npm test
npm run check
npm run build
npm run preview
```

For the browser regression, start a fresh production preview after building and run `PORTFOLIO_URL=http://127.0.0.1:4173 npm run test:browser` with the actual preview URL. The interaction inventory script `scripts/revamp-interactions.mjs` imports Vite development modules and must be run against `npm run dev`; it is not a production browser test. The ESLint configuration covers the active JavaScript house runtime and maintained `.mjs` scripts; legacy Svelte/TypeScript components are not yet linted, and unused-variable checks remain deferred. The scoped minimatch overrides address a lint-tool advisory and should be revisited when upstream dependencies update.

The static production output is `build/`. Only the files required for v3 are copied into that output; legacy media in `static/` is not included.

## Updating content

Edit `src/content.js` for the portfolio, and replace `static/resume.pdf` when the résumé changes. Pinned projects are a snapshot of the GitHub profile; the PC also fetches other public repositories when GitHub is available. Project links should only be added when confirmed.

The 3D world, character, furniture and visual effects are generated in code. Time of day and graphics settings are available from the in-game menu. The experience includes keyboard and touch controls, a quick portfolio menu, a house map and a 2D fallback.

## House styles

Choose **Enhanced house**, **Classic house** or **Automatic** on the welcome screen or in graphics settings, then select **Apply view**. The enhanced house uses original procedural wood and textiles, rounded furniture, warm lighting, a cutaway ceiling with an open sky, and Mumbai-inspired day/night window views. The classic house preserves the previous retro scene. Automatic conservatively starts classic on touch devices and devices reporting low memory or CPU capacity; you can override that choice.

The saved style and graphics choices stay in the browser. Failed enhanced loading or context loss recovers to classic where rendering is available; the portfolio menu and `/2d/index.html` remain available when 3D cannot start. Enhanced preset scales are 100%/80%/60% for high/balanced/low, with manual resolution overrides. Automatic starts enhanced at Balanced (or Low for limited capability hints). High adds furniture shadow mapping; Balanced and Low use softer generated contact shading and fewer rendering costs.

Classic defaults live in `src/world.js`. Enhanced room builders, procedural surfaces and scoped presentation styles live in `src/enhanced/`, composed by `src/enhanced-world.js`. No downloaded game artwork, paid assets or external texture service is used. `PLAN.md` and phase verification documents record the current implementation and test evidence.

In the enhanced house, approach the bedroom wardrobe and use the mirror to open the character view and About information. Drag the portrait to pan; scroll over it with a mouse wheel or trackpad to zoom. Labelled buttons also pan, zoom and reset the view. The portrait stays visible while the About text scrolls. It is an on-demand 3D view against a fixed backdrop rather than a live reflection of the house. Classic uses the illustrated mirror, which is also the fallback if the portrait renderer cannot start or loses its graphics context. The existing character is awaiting likeness review.

## Deployment

The GitHub Pages workflow builds with Node 24 and uploads `build/`. It is configured for the existing `parthkaushal.in` root domain and runs on `main` or manual dispatch; work on another branch does not deploy automatically. Review the destination and changes before merging or deploying. Root-relative URLs assume the site is hosted at the domain root.
