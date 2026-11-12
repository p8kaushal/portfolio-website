# Project roadmap and handoff

## Current state

- Status: requirements discussed and draft plan prepared for review; decisions and explicit plan approval are pending. No feature code has been written and no phase is approved.
- Current branch: `docs/project-handoff`, created from `v3-portfolio-house` at `b867cfd`. The documentation commit is on this branch; use `git log -1` for its hash. The recorded remote refs have not been fetched in this session.
- Documentation-only handoff: `AGENTS.md`, `PLAN.md`, `todo.md`, and `handoff.md`; no application code changed.

## Version and branch inventory

| Branch | Recorded commit | Purpose / relationship |
| --- | --- | --- |
| `v1-3d-space`, `origin/v1-3d-space` | `c1e47f6` | Preserved v1 3D space version; diverged from v2 (5 commits unique to v1, 28 unique to v2). |
| `v2-keynote`, `origin/v2-keynote` | `649e5bb` | Preserved v2 keynote version; ancestor of v3. |
| `v3-portfolio-house`, `origin/v3-portfolio-house` | `b867cfd` | Current v3 portfolio house, 14 commits ahead of v2. |
| `main` | `649e5bb` | Local main currently equals v2 and is 14 commits behind locally recorded `origin/main`. Do not assume it is the current version. |
| `origin/main` | `b867cfd` | Locally recorded remote main equals v3. |
| `origin/gh-pages` | `f5ad22a` | Existing deployment branch; preserve. |

Existing version names are descriptive; no refs have been renamed, deleted, fetched, pushed, merged, or reset. Create a descriptive feature branch from the appropriate current v3 baseline once the phase is approved. Confirm remote state before any operation that depends on it.

## Proposed roadmap — visual revamp first, awaiting review

Audience: anyone curious about Parth, especially recruiters and collaborators. Visual priority: cinematic, more realistic stylized rendering with some colorful game-like character, inspired by Fortnite; a cozy creative studio interior with an original Mumbai-inspired city view through the windows. Outdoor exploration is deferred. The house layout may be redesigned visually, but all current features, interactions and behavior must remain intact. Preserve the day/night cycle with normal, pleasant weather; a weather cycle is deferred. Desktop is the preferred experience. Use only free assets and open-source tools; no paid assets, services, or tools. The user wants the stylized visual revamp prioritized; accessibility and richer content remain explicit follow-up tasks. Existing functionality and accessible routes must not regress during visual work. The user has requested planning only: no implementation or phase is approved.

Each implementation phase begins on a descriptive feature branch based on the latest approved v3 work; perform the listed tests, fix failures and warnings, record output, commit verified work and obtain user approval before the next phase. Merging to main requires separate explicit approval. Branch names are proposals. Keep historical v1/v2/v3 refs unchanged. Preserve current v3 as both selectable and automatic fallback, and retain the 2D route.

### Phase 1 — Art direction, layout and feasibility (`feat/phase-1-art-direction`)
- [ ] Create an original art direction inspired by Fortnite's polished stylized realism: reference board, color palette, lighting, material and proportions; balance cinematic realism with selective stylization. Explore authentic Mumbai-inspired architecture and atmosphere as views through windows without assuming a specific real location; outdoor exploration is future scope. Do not copy game assets or exact designs.
- [ ] Design the full house's room layout, user journey, focal points and furniture, including the changing room, while retaining every existing feature and interaction. Inventory and map each existing interaction to its new location before approving a layout. Provide sketches/moodboards for review and plan a desktop-first experience with a viable lighter mobile path. Use first-person exploration by default and third-person views in the changing room or where an interaction needs them.
- [ ] Inventory existing features and assets; inspect how the current procedural world, interactions, loading and settings can support a separate enhanced scene. Document free asset sourcing, license and attribution requirements, open-source production tools, estimated scope and character pipeline options; verify each asset is free for the intended use and compatible with distribution.
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
- Confirm the proposed visual phase order; automatic and explicit classic fallback are already agreed. The linked example was inaccessible to the research tool; its implementation has not been assessed.
- Choose case studies and supply project evidence when content work becomes the active phase.

## Verification log

- Documentation handoff verification: `git diff --check --cached` and a CLI check of required handoff files and plan gates are recorded in `handoff.md`; no application tests were run for documentation-only changes.
- Initial inspection: `git status --short --branch`, `git branch -avv`, `git log --all --graph --decorate --oneline -40`, and branch divergence checks completed successfully. No application tests have been run; no feature implementation has started.

## Handoff notes

The user prioritizes an original cinematic, realistic Fortnite-inspired stylized upgrade, a cozy creative studio with Mumbai visible through windows, no outdoor exploration for now, an existing day/night cycle and pleasant weather. All current features and interactions must remain intact; weather changes are deferred. Desktop is primary; use only free assets and open-source tools. First-person is default, third-person in the changing room or when needed; keep the character visible continuously there, with zoom/pan now and poses/animations later. They are open to redesigning the house; accessibility and content beyond the résumé remain follow-up tasks. Recruiters and collaborators are the main audiences. They confirmed current v3 should be both selectable and automatic fallback, alongside 2D. They previously supplied photos for the current procedural character. A GTA-inspired changing room with character and large mirror remains in scope. They explicitly requested planning only. The draft phased plan and open decisions are above; await feedback and explicit approval before feature code. The existing local `main` is stale relative to the locally recorded remote; do not branch from it by accident or alter historical refs. Existing project setup is documented in `AGENTS.md` and `README.md`. Git metadata is protected by the workspace sandbox; Git ref changes may require appropriate authorization through the environment.
