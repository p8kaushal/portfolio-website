# Project roadmap and handoff

## Current state

- Goal continuation is blocked pending explicit Phase 1 acceptance. The same gate was confirmed across three consecutive goal turns; all authorized Phase 1 deliverables are saved. Resume implementation when the user approves or revises the concept, layout and budgets. Do not interpret automatic goal continuations as phase approval.
- Status: user authorized full implementation and explicitly requested a persistent goal on 2026-11-12. Phase 1 deliverables and verification are complete, awaiting user acceptance of art direction, layout and proposed budgets. Phase acceptance gates and separate merge approval remain in force. No enhanced-scene code has been written.
- Current branch: `feat/phase-1-art-direction`, created from `docs/project-handoff` at `fc86538`, retaining the v3 baseline and handoff. Remote refs have not been fetched.
- Current changes: continuation notes, Phase 1 specification/concept board, tracked baseline evidence, repeatable browser scripts and Vite chunk splitting to resolve the existing build warning; application logic and classic scene unchanged.

## Version and branch inventory

| Branch | Recorded commit | Purpose / relationship |
| --- | --- | --- |
| `feat/phase-1-art-direction` | `148c47e` (verified deliverables; later documentation records may follow) | Phase 1 specification, original concept board, browser baseline/evidence and warning-free build configuration. Awaiting user phase acceptance. |
| `v1-3d-space`, `origin/v1-3d-space` | `c1e47f6` | Preserved v1 3D space version; diverged from v2 (5 commits unique to v1, 28 unique to v2). |
| `v2-keynote`, `origin/v2-keynote` | `649e5bb` | Preserved v2 keynote version; ancestor of v3. |
| `v3-portfolio-house`, `origin/v3-portfolio-house` | `b867cfd` | Current v3 portfolio house, 14 commits ahead of v2. |
| `main` | `649e5bb` | Local main currently equals v2 and is 14 commits behind locally recorded `origin/main`. Do not assume it is the current version. |
| `origin/main` | `b867cfd` | Locally recorded remote main equals v3. |
| `origin/gh-pages` | `f5ad22a` | Existing deployment branch; preserve. |

Existing version names are descriptive; no refs have been renamed, deleted, fetched, pushed, merged, or reset. Create a descriptive feature branch from the appropriate current v3 baseline once the phase is approved. Confirm remote state before any operation that depends on it.

## Approved implementation roadmap — visual revamp first

Audience: anyone curious about Parth, especially recruiters and collaborators. Visual priority: cinematic, more realistic stylized rendering with some colorful game-like character, inspired by Fortnite; a cozy creative studio interior with an original Mumbai-inspired city view through the windows. Outdoor exploration is deferred. The house layout may be redesigned visually, but all current features, interactions and behavior must remain intact. Preserve the day/night cycle with normal, pleasant weather; a weather cycle is deferred. Desktop is the preferred experience. Use only free assets and open-source tools; no paid assets, services, or tools. The user wants the stylized visual revamp prioritized; accessibility and richer content remain explicit follow-up tasks. Existing functionality and accessible routes must not regress during visual work. Full implementation is authorized; phase acceptance reviews remain required.

Each implementation phase begins on a descriptive feature branch based on the latest approved v3 work; perform the listed tests, fix failures and warnings, record output, commit verified work and obtain user approval before the next phase. Merging to main requires separate explicit approval. Branch names are proposals. Keep historical v1/v2/v3 refs unchanged. Preserve current v3 as both selectable and automatic fallback, and retain the 2D route.

### Phase 1 — Art direction, layout and feasibility (`feat/phase-1-art-direction`)
- [x] Create an original art direction inspired by Fortnite's polished stylized realism: reference board, color palette, lighting, material and proportions; balance cinematic realism with selective stylization. Explore Mumbai-inspired architecture and atmosphere as views through windows without assuming a specific real location; outdoor exploration is future scope. Original schematic board: `docs/phase-1-board.svg`; specification: `docs/phase-1-spec.md`. User acceptance pending.
- [x] Design the full house's room layout, user journey, focal points and furniture, including the changing room, while retaining every existing feature and interaction. Interaction mapping, room sketch and desktop/mobile/fallback strategy are in `docs/phase-1-spec.md` and `docs/phase-1-board.svg`. User acceptance pending.
- [x] Inventory existing features/assets and runtime contracts. Documented asset license evidence, excluded legacy media, procedural/authored character options and relative scope in `docs/phase-1-spec.md`. No new external assets introduced; existing GSAP license explicitly distinguished from open-source tooling.
- [ ] Capture baseline loading, responsiveness, frame time and device/browser behavior on available representative hardware. Record a feature-by-feature and interaction-by-interaction baseline, including the existing day/night cycle and settings, for regression comparison. Agree measurable performance, asset size, loading and quality budgets and test matrix; identify hardware unavailable for verification.
- [ ] Deliver a reviewed visual specification, technical proposal and prototype acceptance criteria. Check documentation and any prototypes with appropriate automated checks and manual evidence; obtain phase approval.

### Phase 2 — Vertical slice and fallback proof (`feat/phase-2-visual-slice`)
- [ ] Create one representative enhanced room or scene section with approved lighting, textures, furniture, proportions, camera and movement, plus a representative character/material test if feasible. Compare screenshots and performance to Phase 1 criteria.
- [ ] Prove integration with the current Three.js runtime and assess renderer choice; adopt a new renderer or asset pipeline only after weighing migration, browser support, performance and maintenance.
- [ ] Prototype explicit enhanced/classic selection, saved preference, automatic capability-based choice, and recovery to classic on failed initialization or asset load. Treat hardware detection as a heuristic and allow user override. Retain the 2D route.
- [ ] Exercise loading failures, unsupported rendering, context loss and preference recovery; run relevant automated, visual, keyboard, performance and standard project checks. Document actual measurements and obtain user approval before whole-house production.

### Phase 3 — Enhanced house environment (`feat/phase-3-stylized-house`)
- [ ] Build the agreed full layout in modular areas, with cohesive architecture, furniture, props, textures, lighting, Mumbai-inspired window views, pleasant weather and the existing day/night cycle. Use original or properly licensed assets and a documented asset inventory.
- [ ] Preserve and reconnect all existing features and interactions, including computer, projects, skills, résumé, experience, awards, contact, map, navigation, controls and settings, using the baseline inventory as the acceptance checklist. Maintain keyboard/touch access, reduced-motion support and content parity across enhanced, classic and 2D paths.
- [ ] Optimize geometry, texture formats, loading, shadows, rendering resolution and effects for agreed tiers; lazy-load where appropriate. Verify desktop/mobile layouts, existing functions, fallback, visual output, standard checks and budgets; obtain user approval.

### Phase 4 — Changing room, character and mirror (`feat/phase-4-changing-room`)
- [ ] Design and build the new changing room and a large mirror; settle camera, visitor position and the relationship between the mirror and inspectable character.
- [ ] Produce an original stylized likeness via the agreed asset/rigging pipeline and approved references. Compare the existing procedural likeness against the desired quality and decide whether new modeling and reference photos are needed. Establish rights and obtain likeness review before finalizing.
- [ ] Keep the character continuously visible in the changing-room experience, with zoom, pan and reset and any agreed rotation. Offer keyboard and touch equivalents, accessible descriptions and reduced motion. Defer extra poses, outfit changes and animations unless the user later adds them.
- [ ] Prototype and budget a live reflection; use a lower-cost or static alternative where needed. Test visual fidelity, interaction, reflection, device performance and recovery, and obtain phase approval.

### Phase 5 — Accessibility audit and improvements (`feat/phase-5-accessibility`)
- [ ] Audit startup, menu, computer, project list/details, enhanced and classic navigation, changing room, dialogs and 2D fallback against a WCAG 2.2 AA target; document actual keyboard and screen-reader findings without claiming certification.
- [ ] Ensure a discoverable keyboard and screen-reader route to project information without spatial navigation, as well as an operable computer flow. Fix key conflicts, semantics, focus visibility/order/restoration, modal behavior, announcements, contrast, zoom and reduced motion.
- [ ] Any split-letter animation retains one readable heading and hides decorative fragments. Verify with automated checks, keyboard flows, manual screen-reader testing where available, standard project checks and documented coverage; obtain approval.

### Phase 6 — Portfolio content beyond the résumé (`feat/phase-6-portfolio-story`)
- [ ] Inventory current content and agree on audience journeys and selected projects. Collect verified facts, screenshots, demos, outcomes and personal narrative from the user.
- [ ] Develop case studies covering problem, constraints, role, decisions, implementation, evidence and lessons; optionally add authentic experiments, build notes and current interests. Never invent claims.
- [ ] Deliver consistent accessible content across enhanced, classic and 2D experiences while retaining the separate résumé. Validate content with the user, test navigation and links where feasible, run standard checks and obtain approval.

### Phase 7 — Integration and release readiness (`feat/phase-7-release-readiness`)
- [ ] Run end-to-end regression across enhanced, classic and 2D, including keyboard/screen reader, reduced motion, browser/device, performance, loading and failure recovery. Review content and asset rights.
- [ ] Document setup, quality settings, fallback, maintenance, known limitations and test evidence. Resolve failures and warnings, commit, obtain phase approval and separately await explicit approval to merge. Review GitHub Pages deployment consequences first.

## Inputs and decisions still needed

- Refine visual direction within cinematic stylized realism: agree interior personality, window-view composition, day/night lighting and any visual reference images. Mumbai is visible through windows only; outdoor exploration and weather cycles are deferred.
- Identify representative desktop and mobile devices/browsers and measurable quality/load expectations. All assets must be free and appropriately licensed; tools must be open source.
- Map every existing feature and interaction to the redesigned layout, retaining behavior. First-person is the default; use third-person for the changing room and other interactions only when needed. Character remains visible in the changing room; zoom and pan are in scope, extra poses/animations deferred.
- Character likeness: the current `src/world.js` explicitly describes a procedural character based on prior reference photos. The inspected source/image inventory did not identify a standalone 3D character asset or the original photos; availability and adequacy of the photos must be checked before requesting more. Decide a free-asset/open-source model production method, initial outfit and preferred likeness style.
- Full implementation and phase order authorized on 2026-11-12. Phase 1 palette/layout and performance proposals still need acceptance; automatic and explicit classic fallback are already agreed. The historical linked example was inaccessible to the research tool; its implementation has not been assessed.
- Choose case studies and supply project evidence when content work becomes the active phase.

## Verification log

- Saved verified Phase 1 deliverables in commit `148c47e` on `feat/phase-1-art-direction`. No merge, push or deployment performed. User acceptance remains the next required action; the full seven-phase goal remains active. Read `docs/phase-1-spec.md` and open `docs/phase-1-board.svg` for review, then branch Phase 2 from this branch only after approval.
- Final mobile coverage check passed: explicit visible `.touch-controls` and coarse-pointer media assertions before capture. Repeated production baseline exited 0; latest tracked navigation load events 42.6/8.6 ms, stationary p95 intervals 33.4/16.8 ms, desktop traversal p95 50 ms. No page errors or overflow. Screenshot review raised a touch-control visibility concern; harness now waits explicitly and asserts coarse-pointer media before capture. Latest reports/screenshots copied to `docs/phase-1-baseline/`. SVG XML, both script syntax checks and whitespace validation passed.
- Phase 1 final verification: `npm run check` exit 0, 0 errors/0 warnings; `npm run build` exit 0, no warnings after separating Three core/WebGL at module boundaries in `vite.config.ts`. Page entry 145.49 kB (45.08 kB gzip), Three chunks 365.20/383.44 kB; warning threshold unchanged. `git diff --check`, `node --check` on both new baseline scripts and `xmllint --noout docs/phase-1-board.svg` passed.
- Production baseline at port 4173 passed desktop/mobile direct-menu and 2D checks with no overflow/page errors. Navigation load events 40.1/11.4 ms on local unthrottled host; stationary p95 frame intervals 33.4/16.7 ms. Ten-second D/A/S/W traversal p95 50 ms: baseline misses proposed 33.4 ms target; do not claim budget achieved. First movement harness attempt failed because events targeted Window rather than the focused element; corrected bubbling event target and intermediate position sampling; retest passed. No application input changes.
- Spatial/lighting retest at port 5174 exited 0: all six spatial targets, PC detail/back, PDF canvas, skills, awards, both TV controls, graphics presets, map and phone. Day/night colors differ; reduced-motion cycle remains static. Zero page errors. Inventory: 321 meshes, 7,562 triangles, 21 colliders. Tracked evidence in `docs/phase-1-baseline/`; full generated captures remain ignored in `test-results/`. Phase 2 approval requested asynchronously; no response received yet.
- Phase 1 browser baseline: `PORTFOLIO_URL=http://127.0.0.1:5174 node scripts/revamp-baseline.mjs` exited 0. Desktop 1440×900 and emulated touch/reduced-motion mobile 390×844: six portfolio sections opened, 2D HTTP 200, no page errors or horizontal overflow. Stationary frame interval p95: desktop 33.4 ms, mobile 16.7 ms (180 samples each). Development/headless measurements do not establish production cold-load or physical-device performance. Screenshots and JSON: ignored `test-results/revamp-baseline/`. Original review illustration: `docs/phase-1-board.svg`.
- Baseline harness failures: first attempted port 5173 refused connection; preview actually served port 5174. First spatial interaction run failed mirror prompt assertion because pagehide overwrote the test's seeded session before reload. Corrected harness to seed each fresh page before startup; application source unchanged. Spatial retest pending.
- Phase 1 startup, 2026-11-12: `npm run check` exited 0 with 0 errors and 0 warnings. `npm run build` exited 0 and generated static output, with an existing chunk-size warning (888.22 kB client entry, 232.22 kB gzip); warning resolution remains outstanding. Draft interaction mapping, layout, palette, architecture and budgets are in `docs/phase-1-spec.md`. Local preview running on 127.0.0.1:5173. Sandboxed Chromium launch failed with a macOS Mach-port permission error; retry requested outside sandbox. Browser baseline remains pending.
- Account-swap context restored on 2026-11-12: read `AGENTS.md`, `PLAN.md`, `handoff.md`, `todo.md`, and `package.json`; confirmed clean working tree on `docs/project-handoff` at `fc86538` before this log update. No feature phase is approved; next action remains user review of the full plan. No application tests were run for this context-only task.
- Documentation handoff verification: `git diff --check --cached` and a CLI check of required handoff files and plan gates are recorded in `handoff.md`; no application tests were run for documentation-only changes.
- Initial inspection: `git status --short --branch`, `git branch -avv`, `git log --all --graph --decorate --oneline -40`, and branch divergence checks completed successfully. No application tests have been run; no feature implementation has started.

## Handoff notes

The user authorized full implementation and a persistent completion goal on 2026-11-12, while retaining the Markdown workflow rules and phase acceptance gates. Phase 1 deliverables are in `docs/phase-1-spec.md`, `docs/phase-1-board.svg` and `docs/phase-1-baseline/`; no enhanced scene exists yet. Await user acceptance before branching into Phase 2. The original cinematic stylized studio, Mumbai window views, existing interactions, changing room, classic/2D fallback, accessibility and richer content remain the full objective. Do not mark the goal complete at this review boundary. Current local `main` is stale relative to recorded remote; do not use it as the implementation base or alter historical refs. Git ref changes may require environment approval. Keep portfolio facts grounded in `src/content.js` and user-supplied evidence.
