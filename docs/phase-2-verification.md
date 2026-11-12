# Phase 2 — enhanced studio and fallback proof

Scope: one enhanced studio, shared classic interaction contract, scene selection and failure recovery. No unrelated portfolio/content features. Latest user waived intermediate visual-phase approvals after successful verification and commits.

## Implemented

- Original rounded oak furniture, woven indigo/textile surfaces, brass details, planted corner, a locally generated desktop display, layered Mumbai-inspired day/night window panorama and warm pendant lighting.
- A studio-builder extension to the existing world factory. Calling it without options retains classic geometry, materials, lighting and collision behavior. Both worlds share every interaction anchor and collision footprint.
- Static opaque surfaces merged by material in the enhanced world. Animated markers, sky, windows, light patches and the existing character stay separate. The character gets a smooth-material feasibility study without identity/outfit changes.
- Enhanced/classic/automatic selection outside the canvas and inside graphics settings. Saved choice, conservative coarse-pointer/low-memory/low-core defaults, explicit override and in-memory switching when storage is denied. Applying a style remounts the scene and offers the saved session.
- Lazy enhanced module; failed initialization/import/timeout recovers to classic. Late resources are disposed. Enhanced context loss remounts classic; unavailable WebGL retains direct portfolio navigation and 2D. A session recovery latch avoids repeated automatic enhanced startup failures until explicit retry.
- GPU geometries, materials and generated textures are disposed once when switching/unmounting. No new service, renderer migration or external asset dependency.

## Renderer and performance decision

Keep Three.js WebGLRenderer. The prototype does not justify a renderer migration. Retain physically based surface shading and tone mapping, use generated contact shading and one local studio fill instead of adding a full post-processing or shadow pipeline.

The first enhanced run missed budget (100 ms traversal p95). Corrected with no MSAA, static batching, fewer dynamic local light passes and explicit enhanced automatic render scales: high 100%, balanced 80%, low 60%. Classic automatic scales remain 125%/100%/65%; manual resolution overrides are preserved. This is a quality-tier decision, not an identical-pixel-workload comparison with classic.

Final optimized production measurement on the recorded local Apple M4/Chromium environment:

| Measurement | Result | Acceptance |
| --- | --- | --- |
| Desktop 1440×900, 10-second D/A/S/W traversal p95 | 33.4 ms | Pass, ≤33.4 ms with rounding to 0.1 ms |
| Desktop stationary p95, 180 samples | 16.8 ms | Recorded baseline |
| Emulated enhanced mobile 390×844 stationary p95 | 16.8 ms | Operable; no real-device claim |
| Initial encoded resource response bodies | 270,003 bytes | Pass, <3 MB; on-demand PDF not loaded |
| Page errors and horizontal overflow | None | Pass |

Measurements use fresh browser contexts on an unthrottled local production preview. Resource sizes come from browser timing entries; do not infer a WAN loading promise. Frame intervals include browser scheduling and are not GPU timings. Physical mobile, Safari/Firefox and screen-reader coverage remain unverified.

## Verification evidence

`npm run check`: exit 0, **0 errors and 0 warnings**. `npm run build`: exit 0, no warnings, static output generated. `node --test scripts/scene-mode.test.mjs`: **6 passed, 0 failed**. Initial JS-boundary type failures were corrected with JSDoc and explicit addon boundaries, without suppressing checks on the new rendering/loader logic.

Production `scripts/revamp-slice.mjs` passed classic/enhanced studio/day/night capture, live style switches and reload persistence, failed enhanced module recovery, context loss recovery, unavailable WebGL with direct-menu/2D access, automatic mobile classic choice, malformed preference recovery and denied-storage explicit choice. **Zero page errors.**

`scripts/revamp-baseline.mjs` with `PORTFOLIO_MODE=enhanced PORTFOLIO_ENFORCE_BUDGET=1` passed the enforced traversal/resource budgets, all six direct portfolio sections, 2D HTTP 200, touch-control visibility and viewport checks. Spatial regressions passed in both classic and enhanced, including exact target/collision parity, all six targets, PDF rendering, skills, awards, TV, settings, map and phone. An earlier phone timing timeout passed on retest; the harness now explicitly waits for the map to close and HUD to return before keyboard input.

Generated full captures stay under ignored `test-results/`; selected reports and review images are retained in `docs/phase-2-evidence/`. Rebuilds require restarting the Vite preview to avoid its cached prior manifest; an earlier stale-preview startup timeout was an infrastructure error, not a successful product check.

All new surfaces, artwork and geometry are original code under the project MIT license. Three.js addons use the existing Three.js MIT dependency. No photographs, game assets, paid assets or external asset hosts were introduced. No push, merge or deployment performed.
