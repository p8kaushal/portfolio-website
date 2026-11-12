# Project rules and context

## User's project workflow rules

### 1. Project Memory & Account-Swap Handoff Protocol
- Local Markdown files are the single source of truth when switching accounts. Keep this file current with workflow rules, architecture decisions, environment setup commands, and coding conventions.
- Maintain `PLAN.md` as a detailed checklist of phases, tasks, current Git branch names, and handoff notes. Update it after every completed task or test run.
- Before stopping at the end of a phase or on an account swap, save all work, record the exact progress in `PLAN.md`, and provide a crisp three-bullet handoff summary.

### 2. Planning First & Phased Execution
- Inspect the directory, then propose a complete step-by-step implementation plan in `PLAN.md`. Do not write feature code until the user reviews and approves the plan.
- Work on one phase at a time. Do not begin the next phase until the current one is built, tested, verified, and approved by the user.

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
- Follow existing project conventions and keep changes scoped to the approved phase. Architecture changes require an explicit decision when trade-offs are material.
- Project handoff: consult `PLAN.md`, `todo.md`, and `handoff.md` at the start of a new session. The visual revamp plan is not yet approved; see those files for current scope and gates.
- These describe the existing project, not approval of future feature requirements or architecture changes.
