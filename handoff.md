# Account-swap handoff

## Active handoff — early-3D interactables redesign

- Current base: `feat/cohesive-interactions` at `462da7e`, clean before this request. The previous integrated visual and audit work is preserved. User explicitly rejected the unified green studio UI and wants a warm, grounded, older GTA: San Andreas-era game aesthetic, with each prop visibly recognizable as its real-life counterpart.
- Scope approved: all in-world props and their interaction views, plus fitting restrained sound effects for movement and tactile device use. Preserve gameplay/controls, content/routes, classic/enhanced/2D fallbacks, accepted character, outer page and favicon. User will test the complete branch before deciding; do not merge or deploy without explicit separate approval.
- Branch: `feat/gta-era-interactables`, created from `feat/cohesive-interactions` at `462da7e`; the original redesign and current verified follow-up are on this unified branch.
- Baseline findings: current enhanced TV is essentially a thin flat box; enhanced desk monitor is a slim panel; existing interaction panels were globally softened/green by `src/house-ui-theme.css`. Classic fallback duplicates some props in `src/world.js`. `src/lib/utils/soundEngine.ts` only supports two legacy Svelte sounds and honors `isMuted`; the active house runtime is vanilla JS in `src/v3-app.js`. Integrate sound where the active runtime can use it rather than assuming the legacy Svelte helper covers it.
- Status: original redesign and follow-up are verified. Settings bottom options are visible at desktop and have a scroll cue on short screens; the idle TV shows original CRT-era art in enhanced/classic/2D; the full left mirror preview supports drag rotation, Shift-drag pan, wheel zoom and buttons. The latest readability sweep fixed low-contrast Skills headings/labels/tags and direct portfolio dialog text/links, added a short-screen Skills scroll cue, and keeps section headings visible below sticky navigation. Latest sequential lint, 7 unit tests, check (0 errors/warnings), build, fresh-production browser suite (3/3), visibility suite (15 checks), and GTA-era suite (15 checks, no page errors) passed. Latest production preview is `http://127.0.0.1:4195`; an older preview may still be running at `4194`. Full output and scope limits are in `PLAN.md`. Representative contrast assertions passed; physical-device, screen-reader, and real browser zoom checks remain unverified. User visual/audio review remains pending. Do not merge/deploy pending separate explicit approval. Never commit GTA assets, logos or other proprietary material.
- Three-bullet account-swap summary:
  1. User wants grounded early-2000s game art, recognizable interactable props, and a large interactive character preview; green unified theme was rejected.
  2. Visual/audio changes and the settings/TV/mirror visibility follow-up are implemented and verified on `feat/gta-era-interactables`; retain it as the unified user testing branch.
  3. User will review and test before deciding; no merge/deployment without separate explicit approval.

## Current interaction cohesion handoff — authoritative

Branch `feat/cohesive-interactions` contains commit `9e80d7a` and the full integrated visual/audit history plus the requested shared studio styling for computer/project/PDF/browser, mirror, file/skills, awards, TV, phone, map, help, settings, direct portfolio and 2D interaction overlays. Computer icons are vectors; classic mirror outfit matches the accepted character. Verified lint, 7 unit tests, sequential check/build, 3 browser tests, 8 scene/recovery checks, both dev interaction suites and production desktop/mobile computer flows. Final traversal passed 33.3 ms p95 after several 50 ms failures under a competing unrelated GPU workload; baseline also varied. Axe has incomplete items; no physical-device or screen-reader claim. See `PLAN.md` and `docs/audit-remediation/release-review.md` for remaining work. Preview port 4193 while running. Separate approval required for merge/deployment. The prior local `feat/portfolio-integrated-review` ref was safely deleted after verification; its commits remain in this branch. Earlier branch statuses below are historical.


## Current integrated review branch — authoritative

Branch `feat/portfolio-integrated-review` contains all completed visual, character and audit-remediation work through `6a0d351`. Eleven obsolete local phase/intermediate branches were removed after ancestry checks; named version branches, main and remote refs remain. Fresh lint, 7 unit tests, sequential check/build and 3 production browser tests passed. Preview: `http://127.0.0.1:4192` while its server remains running. See `docs/audit-remediation/release-review.md` for exact limitations. User accepted the character, chose current outside-playground interfaces, and deferred optional case studies. Screen-reader/physical-device and real zoom verification, incomplete axe checks, six low dev-tree advisories, limited lint coverage and external social verification remain open. Separate approval required for merge/deployment. Earlier handoffs below are historical.


## Current remediation review

Current branch `chore/final-release-review`, based on `4a2aa2b`, contains the accepted character, accessibility fixes, check tooling, no-JavaScript fallback, share metadata, security review and dependency cleanup. Final checks and limitations are in `docs/audit-remediation/release-review.md`. User opted to defer case studies; screen-reader/physical-device coverage and external social preview remain unverified. Remote main was read-only checked at `b867cfd`; pushing a merge to main triggers GitHub Pages. Separate user approval is required before any merge or deployment.


## Active audit remediation

User approved goal-based execution, accepted the current character, and chose to retain current menu, house dialog styling and home links. Project case studies are deferred and optional pending a later affirmative decision. On `fix/2d-accessibility-remediation`, completed and committed multiple verified 2D focus/contrast and interface accessibility fixes through `854eecc`. Production preview is at port 4191. Axe checks found no detected violations in tested states; some checks remain incomplete and physical screen-reader/device testing is unverified. Continue the approved plan, preserving separate merge/deployment approval.


## Branch cleanup

Current branch `fix/preview-asset-consistency`. User authorized deleting obsolete local branches; 14 phase/intermediate refs fully contained in the current branch were deleted. Their commits remain in history; main, named version branches, and all remote refs are preserved.


## Preview consistency fix

On `fix/preview-asset-consistency`, preview explicitly serves `build/`: stale ignored `dist/` previously overrode the favicon and could expose unrelated assets. Check/build, byte comparisons, stale asset checks and production scene/fallback suite passed. Preview port 4181 serves the corrected output.


## Latest character realism revision

Branch `feat/character-realism`: user requested more realism after accepting the simpler professional direction. Refined facial details, arm and clothing proportions and trouser silhouette; still a stylized procedural model. Check, build, production locker controls and recovery passed. Capture: `docs/character-realism-evidence/desktop.png`; user review pending. Merge/deployment remain separately gated.


## Latest professional character revision

Branch `feat/professional-character`: user requested a simpler professional character. Replaced jersey and tactical gear with a collared shirt and simplified trousers while retaining likeness. Check/build and production locker controls/recovery passed; capture at `docs/professional-character-evidence/desktop.png`. Await visual feedback; merge/deployment require separate approval.


## Continuation verification — latest

- Current branch `feat/character-reference-refinement`; verified character checkpoint `a06b8b5`. Restored handoff and verified saved batching: check 0 errors/0 warnings, production build passed, scene-mode 7/7 passed, quality-layer smoke passed. Production locker desktop and emulated mobile portrait/landscape controls and recovery passed without page errors. Enforced automatic-enhanced traversal passed at 33.4 ms p95; prior failed runs remain in PLAN.md.
- Fresh inspected likeness capture and reports: `docs/character-refinement-evidence/`. Stationary desktop locker p95 was 33.5 ms; emulated mobile 16.7/16.8 ms. Procedural quality remains an approximation; user likeness acceptance is required before finalizing. Physical-device and screen-reader testing are unclaimed.
- Next: obtain likeness feedback, refine if requested, then integration regression on a dedicated branch. Preserve historical/version refs; exact branch deletions and merge/deployment need separate approval. Owned production preview session runs at port 4173.

## Active account-swap handoff — 2026-11-12 (authoritative)

- **Branch and working tree:** `feat/character-reference-refinement`, HEAD `a09dddb`. Uncommitted work is intentionally saved in `src/world.js`, new `src/stylized-character.js`, and `PLAN.md`; this handoff also updates `todo.md` and `handoff.md`. Do not discard or commit the unverified character as complete. The persistent goal tracker currently reports **blocked** from the earlier likeness-review gate; the user later requested and authorized further implementation. User-controlled goal resume may be needed, but the work itself may continue under their latest directions.
- **Latest user intent:** Restore the outer UI to the version currently on `parthkaushal.in`/main, offer a direct no-filler portfolio menu, and make all house interactions share a cohesive theme. User supplied a high-detail stylized reference at `/Users/parthkaushal/Downloads/fortnite_me.png` plus actual photos `/Users/parthkaushal/Downloads/me_full.jpeg` and `/Users/parthkaushal/Downloads/me_front.jpeg`; create an original game-style likeness that actually resembles them. These files are reference-only and must not be committed. The user wants the reference's more natural proportions, face, curls, glasses, red number-two jersey, and tactical details; the current procedural model is still an approximation and must not be represented as matching its fidelity.
- **Committed work:** `c737771` adds 2D title home link; `c02c063` delivers continuous portfolio sections with résumé, project and contact links; `a09dddb` unifies PC, TV, mirror, file, awards, phone, map, help and settings styling and restores the live dark outer layout. The new house-style selector was moved into welcome and settings. Main/live comparison was read-only; no deployment occurred.
- **Current character work:** extracted original procedural model into `src/stylized-character.js`, with face, glasses, curls, jersey, straps, cargo details and shoes, wired from `src/world.js`. The first capture had an exaggerated jaw; an overlapping jaw mesh was removed. The unbatched version passed production locker interactions/recovery on desktop and emulated mobile; latest capture before batching is `test-results/changing-room/desktop.png` (ignored, not permanent). Desktop locker stationary p95 ranged 33.4–50.1 ms. The reference likeness remains unreviewed.
- **Critical verification:** unbatched enforced automatic-enhanced traversal failed three times: desktop p95 **50 ms, 33.5 ms, 50 ms** against the **33.4 ms** target. Do not claim a pass or relax the budget silently. Most recently added batching by material within each character quality layer to reduce meshes/draw calls, with shared material ownership; only `npm run check` has run since this change and it passed 0 errors/0 warnings. Build, visual parity, quality-layer behavior, disposal, locker/fallback and traversal tests must be run next. A previously owned preview server was stopped; rebuild and start a fresh preview before browser checks. Existing unowned port 5173 may be in use.
- **Next steps:** inspect uncommitted diff, run `npm run check` then `npm run build` sequentially, restart preview, test batching output/quality/disposal and production locker, run `PORTFOLIO_URL=http://127.0.0.1:4173 PORTFOLIO_ENFORCE_BUDGET=1 node scripts/revamp-baseline.mjs`, diagnose/fix failures, capture and inspect likeness. Record all test output in `PLAN.md`. Commit only verified work on the current branch, request likeness review, then run final visual integration on a dedicated branch. The seven-branch local cleanup proposal remains pending exact user approval; preserve version and remote refs. Merge/deployment separately requires explicit approval.
- **Recent verification before current character edits:** unified interfaces passed Classic and Enhanced interaction suites; production scene-switch/recovery passed eight checks; mobile welcome clipping was fixed and checked; direct portfolio desktop/mobile section, links, focus and close checks passed. Emulated device/headless timings are not physical-device certification. No screen-reader verification claimed.


## Historical continuation — revised visual plan (superseded above)

- Current branch `fix/2d-home-title`, based on `feat/phase-c-cutaway-character` at `214b38d`; the 2D title now links home and has passed production keyboard navigation verification. Cutaway/character checkpoint `e42d46e`. Presentation phase `bea987f` restores outer styling, adds the home link and menu treatment; locker phase `97ac23c` adds wheel zoom. The checkpoint opens the enhanced ceiling with beams and day/night sky and refines the procedural character using supplied photos. Photos stay outside the repository.
- User likeness review is pending: `docs/revision-evidence/character.png`. Phase C is a review checkpoint, not final acceptance. Apply feedback and reverify as needed; then complete visual integration on a dedicated branch.
- Latest checks: 0-error/0-warning type check, production build, four-room day/night, changing-room controls/recovery, scene switch/fallback, both classic/enhanced source interaction regressions and 7 scene-mode tests passed. Desktop automatic-enhanced traversal p95 33.4 ms and 278,247 initial encoded bytes locally; no claim of physical-device or screen-reader testing. See `PLAN.md` and `docs/revision-evidence/`.
- Cleanup proposal in `PLAN.md` lists seven local ancestor refs as candidates; user must approve exact deletion list. Keep named version refs, current branch and remote refs. No merge or deployment without separate approval.

## Historical account-swap handoff — 2026-11-12 (superseded above)

- **Branch and goal:** `feat/phase-4-changing-room`, HEAD `9b04f38` before this documentation handoff. The tree was clean before these handoff edits. The persistent goal is **blocked** pending the user's likeness review; a new account should restore/resume it only after the user answers or otherwise provides the missing decision. Do not infer approval from elapsed time. No merge, push or deployment has been performed.
- **Completed:** Phase 2 was committed at `b89cd23` and Phase 3 at `7857de1`. Phase 4 has a committed prototype (`7553611`), continuous-visibility fix (`7b46d65`), usage documentation (`7f88ec7`), wardrobe refinement (`bce8656`) and performance evidence (`9b04f38`). Enhanced mirror opens a pan/zoom/reset character view with shared About content; classic and graphics-failure fallback use the illustrated mirror. Its backdrop is static, not a live house reflection.
- **Next:** ask the user to review `docs/phase-4-evidence/desktop.png` and decide whether to use the current procedural character or provide references for a closer likeness. Original reference photos were not found in the inspected project inventory. After the decision, make any needed changes, verify and commit Phase 4, then proceed to visual integration/release verification on a dedicated branch. Preserve existing features, accessibility and classic/2D routes. Standalone accessibility and content expansion are deferred. Merge/deployment needs separate explicit approval.
- **Evidence and limits:** `docs/phase-4-verification.md`, `docs/phase-4-evidence/` and the latest `PLAN.md` log describe the checks. Latest fresh sequential `npm run check` and `npm run build` passed; production room, changing-room, recovery and classic/enhanced interaction checks passed. Automatic enhanced desktop traversal p95 was 33.4 ms locally; emulated devices are not physical-device certification. Screen-reader and physical browser/device testing were not claimed. A live reflection prototype had 100.1 ms p95 vs 66.7 ms without it in a separate stationary headless comparison; the current view is the lower-cost alternative.
- **Run locally:** Node 24; `npm ci`, `npm run dev`, then open Vite's printed URL. Select Enhanced, enter/skip intro, approach the bedroom wardrobe and use the mirror. Test pointer/touch pan, zoom/reset, About scrolling and exit; switch Classic and try the 2D link. `npm run check` and `npm run build` must run sequentially; restart an owned production preview after rebuilding before browser verification.

## Historical continuation notes (superseded by the current handoff above)

Goal resumed. Phase 3 passed fresh check/build, 7 unit tests, enforced automatic performance budget, production room and fallback suites, and enhanced/classic source interaction suites, and was committed at `7857de1`. Selected evidence is retained in `docs/phase-3-evidence/`. Phase 4 is active on `feat/phase-4-changing-room`; existing mirror uses a CSS portrait and About content, while the world contains a procedural 3D character. Likeness review remains required before finalizing. Separate merge/deployment approval remains required.

Phase 4 prototype now displays the existing 3D character in a framed, static-backdrop mirror view with pointer pan and button pan/zoom/reset; classic retains its CSS portrait and About content is shared. Fresh check/build and desktop/emulated-touch interaction test passed, including keyboard activation, pointer drag, forced mirror context loss and reopening. The user was asked to review the likeness. A 512² live house reflection feasibility test had 100.1 ms p95 intervals vs 66.7 ms without reflection in the same local headless stationary test; this supports the cheaper on-demand view. The production portrait's stationary open-dialog p95 was 33.4 ms desktop and 16.8 ms emulated mobile; physical-device performance is unverified. Production scene-switch/recovery suite passed; likeness review and full regression work remain before a Phase 4 commit. See latest `PLAN.md` verification entries.

Latest Phase 4 regression additionally passed emulated touch drag, initialization failure and both classic/enhanced source interactions. Save a prototype checkpoint commit; it is not Phase 4 completion. Likeness review is still pending, and release integration checks remain.

Checkpoint `7553611` saved the prototype. A follow-up keeps the character visible while About scrolls independently; fresh check/build and desktop, emulated mobile portrait/landscape and classic mobile production checks passed. Record and commit that follow-up before continuing. Likeness review remains pending.

Visibility follow-up was committed at `7b46d65`. README now describes the mirror controls, fixed-backdrop limitation and recovery. User likeness review remains pending; do not mark Phase 4 complete without it.

The wardrobe approach was refined with a runner, vertical light details and brass trim; no collision bounds were added. Fresh check/build and production room and changing-room suites passed. Commit this verified refinement; user likeness review remains pending.

Wardrobe refinement was committed at `bce8656`. Its subsequent production automatic-enhanced traversal retest met the 33.4 ms p95 budget and is recorded in `docs/phase-4-evidence/house-performance.json`. Likeness review remains pending.

Phase 2 is verified and committed at `b89cd23`. Current branch `feat/phase-3-stylized-house`; building the full enhanced interior and scoped visual presentation next. Classic and enhanced spatial regressions, unit tests, recovery/storage suite, warning-free build/type check and enforced 33.4 ms traversal budget passed. See `docs/phase-2-verification.md` and `docs/phase-2-evidence/`. Proceed automatically through visual phases; no further user approval needed for stage transitions.

Latest instruction supersedes the old review blocker: user approved continuation and waived all intermediate visual-phase approvals when testing/verification succeeds; ensure commits. Scope narrowed to visual/aesthetic work only. Phase 2 active on `feat/phase-2-visual-slice` from `341aa1a`; proceed through visual house/changing-room work and integration verification. Defer standalone accessibility and content-expansion phases; keep regression coverage. Do not merge/deploy without separate explicit authorization. The original goal text predates this scope update; latest user direction governs.

The user authorized full implementation, requested a persistent goal through completion/testing/verification, and reiterated use of a new branch and all Markdown instructions. Goal is active. Branch `feat/phase-1-art-direction` was created from `docs/project-handoff` at `fc86538`. Phase 1 specification, concept board, asset/tooling inventory and baseline reports/screenshots are in `docs/`. `npm run check` passed with zero errors/warnings; build now passes without warnings after Three.js chunk splitting in `vite.config.ts` (page entry 888→145 kB). Application logic and scene are unchanged. Browser direct-menu, spatial interactions, PDF, settings, phone, map and reduced-motion lighting checks passed. Production traversal p95 50 ms misses the proposed 33.4 ms target; this is recorded as baseline, not acceptance. Final mobile coarse-pointer and touch-control visibility assertions passed; latest production evidence is tracked in docs/phase-1-baseline/. Obtain Phase 1 palette/layout/budget acceptance before Phase 2; asynchronous review question already sent. Preserve phase review gates and separate explicit merge approval. The historical handoff below describes the pre-authorization state and is retained as history, not the current approval status.

## Historical state before implementation authorization

This is a documentation-only handoff. No application code has been changed and no implementation phase has started. The user requested planning before implementation; the phased plan in `PLAN.md` has **not received explicit approval**. The user's request to commit and switch accounts is not approval of the plan. Ask for plan approval before feature code.

Current branch: `docs/project-handoff`, based on `v3-portfolio-house` commit `b867cfd`. This branch contains the handoff commit; use `git log -1` to see its hash. The existing `v1-3d-space`, `v2-keynote`, and `v3-portfolio-house` branches remain preserved. Local `main` is at `649e5bb`, 14 commits behind the locally recorded `origin/main` at `b867cfd`; no remote fetch was performed. Do not base the new work on stale local `main`, and do not rename, reset, delete, merge or push existing refs without appropriate authorization. The user wants implementation on a new branch; once the plan is approved, branch from this documentation branch so the handoff is retained.

## Agreed product direction

- Audience includes everyone interested in Parth, especially recruiters and collaborators.
- Prioritize a cinematic, realistic-leaning stylized aesthetic inspired by Fortnite, with an original cozy creative studio and Mumbai-inspired views through windows. Redesign the interior if useful. No outdoor exploration for now.
- Keep every current feature and interaction intact. Preserve day/night cycling and pleasant weather; weather changes are future work.
- Desktop first. First-person navigation by default; third-person for the new GTA-inspired changing room or other interactions when needed. The character remains visible in the changing room, with zoom/pan and a large mirror; extra poses and animations are deferred.
- Use only free assets and open-source tools; verify asset licenses and attribution. Preserve classic v3 as both a selectable and automatic fallback, plus the existing 2D route.
- Accessibility, especially keyboard and screen-reader access to projects and the computer, and richer portfolio content beyond the résumé remain explicit follow-up phases. Avoid accessibility regressions throughout.
- Existing character is procedural (`src/world.js`) and comments say it was based on photos previously supplied by the user. Original photos and a standalone 3D model were not found in the inspected source/image inventory; check availability before asking for more.

## Historical next-session instructions (superseded by live continuation above)

1. Read `AGENTS.md`, `PLAN.md`, and `todo.md`; check `git status --short --branch` and `git log -1`.
2. Ask the user to approve or revise the full plan before writing feature code. Do not infer approval from the account-swap request.
3. After approval, create a dedicated Phase 1 branch from `docs/project-handoff` and carry out only Phase 1. Capture the complete interaction baseline, visual specification, asset/license and tooling options, and measurable performance targets. Ask about major unresolved trade-offs.
4. Run phase-appropriate automated and manual verification, record actual output in `PLAN.md`, commit verified work, and wait for user approval before the next phase. Never merge to main/master without separate explicit approval.

## Verification

The documentation handoff is checked with a CLI assertion of the required files and key plan gates, plus `git diff --check --cached` before committing. No application tests or builds were run: this handoff contains documentation only. The linked example site mentioned by the user could not be accessed through the research tool, so its implementation was not assessed.
