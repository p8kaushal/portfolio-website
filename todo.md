# Active to-do

## Early-3D interactables redesign (current)

- [x] Inspect active branch and document the approved GTA-era direction, scope, sequence and acceptance criteria in `PLAN.md` and `handoff.md`.
- [x] Create `feat/gta-era-interactables` from `feat/cohesive-interactions`.
- [x] Replace the glossy green interaction theme with a grounded warm CRT-era game UI across the in-game interaction surfaces.
- [x] Redesign TV, computer, phone, file, mirror and awards display props in enhanced and classic worlds.
- [x] Add synthesized Web Audio cues for footsteps/sprinting and device use; honor mute/user gesture and clean up correctly.
- [x] Run lint, unit, check/build, production browser, responsive 2D and enhanced/classic/2D fallback regressions. Details: `PLAN.md`; ignored screenshots: `test-results/gta-era-regression/`.
- [x] Commit the original redesign on this unified testing branch.
- [x] Fix settings visibility and audit primary overlays at desktop, portrait phone, and short landscape sizes.
- [x] Add warm idle CRT channel artwork in enhanced/classic 3D and 2D, and expand the character preview with mouse rotation, pan, and zoom controls.
- [x] Finish the production content-visibility regression and update handoff results.
- [x] Commit the verified follow-up on this same branch.
- [x] Fix Skills file readability, add mobile scroll cue, correct direct portfolio dialog text/link contrast, and ensure section titles clear the sticky navigation. Fresh production contrast/visibility regression passed 15 checks; full verification is recorded in `PLAN.md`.
- [x] Final pre-merge readability pass: neutralize light-green map/computer content, fix enhanced-map contrast override, enlarge and pan-enable mobile map labels, and complete fresh production verification. See `docs/final-pre-merge-review.md`.
- [x] User reviewed the final pre-merge report and explicitly authorized merge, push, and deployment (2026-11-13).
- [ ] Fast-forward `main` to the tested branch, push to `origin/main`, and verify the deployment completed.

## Current interaction cohesion

- [x] Restyle all in-house interactions, portfolio panel and 2D interaction overlays; preserve controls and content.
- [x] Verify lint, unit tests, check/build, production browser, scene recovery, locker and desktop/mobile computer flows; final local traversal passed after prior failed runs under competing workload. See `PLAN.md`.
- [ ] User visual review of updated interaction screens; physical device, screen-reader, real browser zoom and incomplete axe checks remain unverified.
- [ ] Six low development-tree audit findings, limited lint/type coverage, external LinkedIn/social preview verification, and optional case studies remain open/deferred as documented in `docs/audit-remediation/release-review.md`.
- [ ] Separate explicit approval is required before merge or deployment.


## Current integrated review

- [x] Consolidate completed visual and remediation history on `feat/portfolio-integrated-review`; remove 11 obsolete local ancestor branches, preserving named versions and remote refs.
- [x] Fresh lint, 7 unit tests, sequential type check/build and 3 production browser tests passed; preview on port 4192 while running.
- [ ] Review and address remaining limitations in `docs/audit-remediation/release-review.md`; physical device/screen-reader, actual browser zoom, incomplete automated checks, external social validation and low-severity dependency findings remain unverified or deferred.
- [ ] Optional case studies remain deferred until the user decides to include them; obtain separate approval before merging or deploying.

The account-swap entries below are historical.


Latest continuation: saved character batching passed fresh check/build, 7 scene-mode tests, quality smoke, production locker/recovery and enforced traversal (33.4 ms p95). Evidence: `docs/character-refinement-evidence/`. Likeness review remains pending. Earlier account-swap verification-pending entries below are historical.

## Current account-swap priorities (2026-11-12)

- [x] 2D name/title home link verified and committed at `c737771`.
- [x] Direct, continuous portfolio menu committed at `c02c063`; retains six sections, résumé and project links.
- [x] Unified house interface theme and restored live-domain outer layout committed at `a09dddb`. House-style selection is on the welcome screen and in settings. Live site was inspected read-only.
- [ ] Continue uncommitted character work on `feat/character-reference-refinement` (HEAD `a09dddb`): `src/world.js`, new `src/stylized-character.js`, and `PLAN.md` are modified. User supplied `/Users/parthkaushal/Downloads/fortnite_me.png` and photos `/Users/parthkaushal/Downloads/me_full.jpeg`, `/Users/parthkaushal/Downloads/me_front.jpeg`; use as references only, never commit them. The prior `docs/revision-evidence/character.png` is obsolete; latest unbatched capture is ignored `test-results/changing-room/desktop.png` and is not final.
- [ ] After new material-based character batching, run `npm run check` and `npm run build` sequentially; restart production preview and verify visual parity, quality levels, resource cleanup, locker controls/fallback and enforced traversal performance. Latest check after batching passed 0 errors/0 warnings, but build and runtime verification are pending. Before batching, traversal enforcement failed at 50 ms, 33.5 ms and 50 ms against 33.4 ms; do not claim success or commit as verified until resolved. Inspect merge geometry behavior and disposal.
- [ ] Capture the revised character for user likeness review; refine to better match the user's illustrated reference. Do not claim it matches the high-detail reference or finalize without review.
- [ ] Complete integration regression on its own branch and commit verified phases. Obtain approval for specific branch deletions and separate explicit approval for any merge/deployment. Preserve named version refs and remote branches.


- [x] Inspect the existing workspace and branch history; preserve historical version branches.
- [x] Document the proposed visual-first roadmap, current requirements and engineering workflow in `PLAN.md` and `AGENTS.md`.
- [x] Prepare the account-swap handoff and documentation-only commit on `docs/project-handoff`.
- [x] User authorized full implementation and a persistent goal on 2026-11-12; retain phase acceptance and merge gates.
- [x] Created `feat/phase-1-art-direction` from `docs/project-handoff` at `fc86538`, retaining v3 and handoff documents. Work only on Phase 1 until verified and approved.
- [x] Prepare and verify Phase 1 inventory, art direction/concept board, layout proposal, feasibility assessment, baseline measurements and acceptance criteria. See `docs/phase-1-spec.md`; desktop/mobile, spatial interactions, lighting, touch visibility, type checks and warning-free build passed.
- [x] Phase 1 accepted; Phase 2 branch created from `341aa1a`. Latest user waived intermediate visual-phase approval gates after verification and commits.
- [x] Finish enhanced studio/fallback proof, verify, document and commit Phase 2 at `b89cd23`.
- [x] Build, verify and commit the Phase 3 enhanced house at `7857de1`; branch Phase 4 from it.
- [x] Implement and checkpoint the Phase 4 mirror/character view, visibility fix and wardrobe refinement; latest implementation/evidence commits end at `9b04f38` on `feat/phase-4-changing-room`.
- [ ] Obtain the user's likeness review of the new character after completing the current reference refinement and fresh capture. The old evidence image is superseded.
- [x] Restore outer page presentation and add the home link and themed portfolio menu (`bea987f`); add wheel/trackpad locker zoom (`97ac23c`).
- [x] Create cutaway roof and revised character checkpoint (`e42d46e`); verify and record initial integration evidence (`38ade4b`).
- [ ] Obtain approval for the exact proposed local ancestor branch deletions in `PLAN.md`.
- [ ] Apply any requested character changes, verify Phase 4 and commit final verified work. Review `docs/phase-4-verification.md` and latest `PLAN.md` log for existing test coverage and limitations.
- [ ] After Phase 4 is complete, perform visual integration/release verification on its own branch, document evidence and commit. Preserve classic/2D routes, interactions and existing accessibility. Standalone accessibility and content-expansion phases remain deferred.
- [ ] Obtain separate explicit approval before any merge or deployment; review GitHub Pages consequences and current remote state first.
- [ ] Future ideas, outside current visual release: outdoor exploration, changing weather, character poses and extra animations.
