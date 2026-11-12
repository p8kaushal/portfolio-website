# Account-swap handoff

## Live continuation — 2026-11-12

Goal resumed. Phase 3 passed fresh check/build, 7 unit tests, enforced automatic performance budget, production room and fallback suites, and enhanced/classic source interaction suites, and was committed at `7857de1`. Selected evidence is retained in `docs/phase-3-evidence/`. Phase 4 is active on `feat/phase-4-changing-room`; existing mirror uses a CSS portrait and About content, while the world contains a procedural 3D character. Likeness review remains required before finalizing. Separate merge/deployment approval remains required.

Phase 4 prototype now displays the existing 3D character in a framed, static-backdrop mirror view with pointer pan and button pan/zoom/reset; classic retains its CSS portrait and About content is shared. Fresh check/build and desktop/emulated-touch interaction test passed, including keyboard activation, pointer drag, forced mirror context loss and reopening. The user was asked to review the likeness. A 512² live house reflection feasibility test had 100.1 ms p95 intervals vs 66.7 ms without reflection in the same local headless stationary test; this supports the cheaper on-demand view. The production portrait's stationary open-dialog p95 was 33.4 ms desktop and 16.8 ms emulated mobile; physical-device performance is unverified. Production scene-switch/recovery suite passed; likeness review and full regression work remain before a Phase 4 commit. See latest `PLAN.md` verification entries.

Latest Phase 4 regression additionally passed emulated touch drag, initialization failure and both classic/enhanced source interactions. Save a prototype checkpoint commit; it is not Phase 4 completion. Likeness review is still pending, and release integration checks remain.

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
