# Project rules and context

## User's project workflow rules

### 1. Project Memory & Account-Swap Handoff Protocol
- Local Markdown files are the single source of truth when switching accounts. Keep this file current with workflow rules, architecture decisions, environment setup commands, and coding conventions.
- Maintain `PLAN.md` as a detailed checklist of phases, tasks, current Git branch names, and handoff notes. Update it after every completed task or test run.
- Before stopping at the end of a phase or on an account swap, save all work, record the exact progress in `PLAN.md`, and provide a crisp three-bullet handoff summary.

### 2. Planning First & Phased Execution
- Inspect the directory, then propose a complete step-by-step implementation plan in `PLAN.md`. Do not write feature code until the user reviews and approves the plan.
- Work on one phase at a time. Latest user authorization allows the visual/aesthetic revamp to advance automatically after each phase is built, tested, verified and committed. Intermediate user approvals are waived for visual work. Preserve existing behavior and accessible routes; standalone accessibility/content features are deferred. Separate merge approval remains required.

### 3. Testing & Verification Standards
- Verify every phase with automated unit or integration tests, linters, or CLI verification scripts; do not assume code works because it compiles.
- Debug and resolve failures and warnings before marking a phase ready for review. Show the user test output as proof; never fabricate results or skip failing checks.

### 4. Git Branching & Merge Rules
- Never commit directly to `main` or `master`. Before writing code for a new phase or feature, create and check out a dedicated descriptive branch.
- Commit verified work cleanly to its feature branch. Never merge into `main` or `master` without the user's explicit approval to merge.
- Preserve older project versions and their existing branch references. Consult `PLAN.md` for the branch inventory; do not rename, delete, reset, or overwrite history casually.

### 5. Professional Engineering Ethics & Code Quality
- Write readable, maintainable, well-documented, modular code, following DRY and SOLID. Avoid hacks, hardcoded secrets, and temporary workarounds.
- Never commit API keys, credentials, or `.env` files; check `.gitignore` before committing.
- Ask the user when requirements are unclear or there is a major architectural trade-off.

## Current architecture and environment

- Current version: interactive 3D portfolio house with a 2D fallback, built with SvelteKit 2, Svelte 5, Vite, TypeScript/JavaScript, Three.js and GSAP. Portfolio data is centralized in `src/content.js`.
- Node.js 24 and npm: `npm ci`, `npm run dev`. Verification commands: `npm run check` and `npm run build`; preview with `npm run preview`.
- `predev` and `prebuild` prepare `.generated-static`; production output is `build/`. GitHub Pages deploys on `main` or manual dispatch; review deployment implications before any merge or deployment.
- Run `npm run check` and `npm run build` sequentially: both synchronize SvelteKit-generated state. Restart an owned Vite preview after rebuilding so its server/client manifest matches the new hashed assets; production browser verification is required.
- Follow existing project conventions and keep changes scoped to the approved phase. Architecture changes require an explicit decision when trade-offs are material.
- Project handoff: consult `PLAN.md`, `todo.md`, and `handoff.md` at session start. Phase 2 is verified/committed at `b89cd23`; Phase 3 is active on `feat/phase-3-stylized-house`. Scope is visual/aesthetic revamp only, with automatic advancement after checks and commits. Separate merge/deployment approval remains required.
- These describe the existing project, not approval of future feature requirements or architecture changes.
