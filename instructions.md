```markdown
# Antigravity Orchestration Guide: Keynote-Style Portfolio Build

This document contains step-by-step instructions, subagent prompt templates, model routing strategies, and token-optimization guidelines for building the **Apple Keynote / Game-Inspired Interactive Portfolio** using **Google Antigravity Pro**.

---

## 1. Antigravity Subagent System Architecture & Model Selection

To optimize token usage, execute multi-step software build workflows efficiently, and prevent context window degradation, divide the project across three specialized subagent personas:


```

┌──────────────────────────────────────────────────────────────────────────┐
│                         MASTER ORCHESTRATOR                              │
│                Model: Gemini 2.5 Flash / Standard                        │
│            (Manages state, routing, and task execution)                  │
└───────────────┬──────────────────┬───────────────────┬───────────────────┘
│                  │                   │
▼                  ▼                   ▼
┌─────────────────────────┐┌───────────────────┐┌─────────────────────────┐
│     UI_STYLING_AGENT    ││  GSAP_ANIM_AGENT  ││   ASSET_COMP_AGENT      │
│  Model: Gemini 2.5 Flash││ Model: Gemini Pro ││  Model: Gemini 2.5 Flash│
│ (Nav, Cards, Modals)    ││ (3D Transforms,   ││ (4-Layer Canvas Stack,  │
│                         ││  Camera Pans)     ││  Video Keying, Assets)  │
└─────────────────────────┘└───────────────────┘└─────────────────────────┘

```

### Model Selection & Cost Efficiency Strategy
* **Gemini 2.5 Flash:** Use for repetitive UI components, Tailwind CSS styling, icon wiring, and SvelteKit page boilerplate. Flash handles HTML/CSS/Svelte syntax rapidly while consuming minimal token budget.
* **Gemini Pro:** Use **exclusively** for complex logic generation, specifically **GSAP timeline choreographies**, multi-directional camera pan mathematical interpolations, and CSS 3D perspective transforms.

---

## 2. Token-Saving Rules for Antigravity Workspace

1. **Strict Context Isolation:** Do not feed the entire project history or all `.svelte` files into a single prompt. Pass only the targeted file and component contracts.
2. **Component File Scaffolding:** Force subagents to output complete, self-contained single-file components (`.svelte`) into `src/lib/components/` rather than streaming inline explanations.
3. **Deterministic Instructions:** Instruct subagents to omit pleasantries, explanations, and meta-commentary, returning only pure code blocks or bash commands.

---

## 3. Subagent Execution Instructions & Prompt Templates

---

### STAGE 1: UI & Styling Subagent (Nav, Glassmorphic Overlays & Mobile Tablet)
* **Assigned Subagent:** `UI_STYLING_AGENT`
* **Target Model:** `Gemini 2.5 Flash`
* **Target Files:** `src/lib/components/Navbar.svelte`, `src/lib/components/MobileTablet.svelte`, `src/lib/stores/navStore.ts`

```markdown
### SYSTEM PROMPT: UI_STYLING_AGENT
You are an expert SvelteKit and Tailwind CSS UI Engineer. Your task is to generate responsive, high-performance glassmorphism UI components. Output pure code only with zero conversational text.

#### Task 1.1: Navigation Store
Create `src/lib/stores/navStore.ts`:
- Define current active tab state (`home`, `about`, `experience`, `projects`, `skills`, `resume`, `achievements`, `contact`).
- Define global audio state (`isMuted: boolean`, default `true`).
- Export tab switching and audio toggle methods.

#### Task 1.2: Fortnite / Apple-Style Navbar
Create `src/lib/components/Navbar.svelte`:
- Fixed top-center positioning (`fixed top-4 left-1/2 -translate-x-1/2 z-50`).
- Glassmorphism styling (`backdrop-blur-md bg-neutral-900/70 border border-white/10 rounded-full px-6 py-2 shadow-2xl`).
- Horizontal flex list of tabs: Home, About, Experience, Projects, Skills, Resume, Achievements, Contact.
- Dynamic active indicator line using CSS transitions (`border-b-2 border-sky-400`).
- Far-right edge: Mute/Unmute button using `lucide-svelte` icons (`Volume2`, `VolumeX`).
- Dispatch tab change events and sync with `navStore.ts`.

#### Task 1.3: Mobile Handheld Glass Tablet UI
Create `src/lib/components/MobileTablet.svelte`:
- Displayed ONLY on viewports < 768px (`md:hidden`).
- Centered glassmorphic card container hosting all section views cleanly without desktop camera zooms.
- Render smooth tab sliding transitions within the tablet frame.

```

---

### STAGE 2: Layered Asset Composition Subagent

* **Assigned Subagent:** `ASSET_COMP_AGENT`
* **Target Model:** `Gemini 2.5 Flash`
* **Target Files:** `src/routes/+page.svelte`, `src/lib/components/PresenterStage.svelte`

```markdown
### SYSTEM PROMPT: ASSET_COMP_AGENT
You are a Web Composition Specialist focusing on DOM layering, CSS grid stacking, and HTML5 video rendering. Output pure code only.

#### Task 2.1: 4-Layer Stage Composition Container
Create `src/lib/components/PresenterStage.svelte` using a 4-layer stacking model:
- Layer 1 (Z-index 0): Background image (`static/bg-office.jpg`) stretched `object-cover w-full h-full`.
- Layer 2 (Z-index 10): Transparent video loop (`static/presenter-home.webm`) or high-res WebP cutout with mouse-follow parallax offsets.
- Layer 3 (Z-index 20): Object PNG cutouts (Studio TV, Laptop Base & Lid, Folder/Clipboard, Smartphone).
- Layer 4 (Z-index 30): HTML/Tailwind interactive overlays (Timeline nodes, Project library grid, Skill chips, Resume sheet, GTA Phone app tiles).

#### Task 2.2: Video Keying & Fallback
- Render green-screen keyed WebM transparent presenter video.
- Fallback gracefully to WebP static photo cutout if video decoding is delayed or unsupported on low-power devices.

```

---

### STAGE 3: GSAP Motion & Camera Choreographer Subagent

* **Assigned Subagent:** `GSAP_ANIM_AGENT`
* **Target Model:** `Gemini Pro`
* **Target Files:** `src/lib/animations/cameraChoreography.ts`

```markdown
### SYSTEM PROMPT: GSAP_ANIM_AGENT
You are a Senior GSAP Motion Graphic Engineer specializing in camera pan simulations, 3D CSS interpolations, and high-fps spatial transitions. Output pure TypeScript code only.

#### Task 3.1: GSAP Spatial Camera Timeline
Create `src/lib/animations/cameraChoreography.ts`:
- Import GSAP (`import { gsap } from 'gsap'`).
- Define multi-directional camera pan and scale timeline sequences when switching tabs:
  1. `HOME -> ABOUT`: Scale background `1.15`, translate `x: -120px`, slide bio card in from `x: +200px`.
  2. `ABOUT -> EXPERIENCE`: Pan camera left, zoom into TV frame (`scale: 1.4`), trigger CSS power-on flicker effect (`opacity: [0, 1, 0.8, 1]`).
  3. `EXPERIENCE -> PROJECTS`: Tilt camera down toward desk, open laptop lid (`rotateX(0deg)` from `-90deg`).
  4. `PROJECTS -> SKILLS/RESUME`: Slide camera laterally to desk paper, apply subtle paper rustle float (`y: -10px`).
  5. `ANY -> CONTACT`: Apply `backdrop-filter: blur(12px)` to background layers, animate smartphone slide-up from bottom (`y: '100%' -> '0%'`) with spring easing (`cubic-bezier(0.175, 0.885, 0.32, 1.275)`).
- Include brief motion blur CSS filter passes during camera movements (`filter: blur(4px)` -> `blur(0px)`).

```

---

### STAGE 4: Orchestrator Integration & Sound Engine

* **Assigned Subagent:** `MASTER_ORCHESTRATOR`
* **Target Model:** `Gemini 2.5 Flash`
* **Target Files:** `src/lib/utils/soundEngine.ts`, `src/routes/+page.svelte`

```markdown
### SYSTEM PROMPT: MASTER_ORCHESTRATOR
Integrate all components into `src/routes/+page.svelte` and implement a lightweight audio engine.

#### Task 4.1: Minimal UI Sound Engine
Create `src/lib/utils/soundEngine.ts`:
- Preload short, crisp audio samples from `static/sounds/`:
  - `click.mp3` (Phone app tile cycling / award selection)
  - `tv-on.mp3` (Experience TV activation)
- Check `navStore.isMuted` before playing any audio.
- Never trigger sound automatically on page load (comply with browser autoplay policies).

#### Task 4.2: Main Page Integration
In `src/routes/+page.svelte`:
- Import `Navbar.svelte`, `PresenterStage.svelte`, `MobileTablet.svelte`, `cameraChoreography.ts`, and `soundEngine.ts`.
- Wire `navStore` tab subscriptions to trigger GSAP camera transitions and minimal UI sounds.
- Verify sub-second render readiness and clean desktop/mobile responsive switching.

```

---

## 4. Execution Order Checklist for Antigravity

1. [ ] **Run Prompt Stage 1:** Generate `navStore.ts`, `Navbar.svelte`, and `MobileTablet.svelte` using `UI_STYLING_AGENT` (`Gemini 2.5 Flash`).
2. [ ] **Run Prompt Stage 2:** Construct `PresenterStage.svelte` using `ASSET_COMP_AGENT` (`Gemini 2.5 Flash`).
3. [ ] **Run Prompt Stage 3:** Build `cameraChoreography.ts` using `GSAP_ANIM_AGENT` (`Gemini Pro`).
4. [ ] **Run Prompt Stage 4:** Assemble `+page.svelte` and `soundEngine.ts` using `MASTER_ORCHESTRATOR`.
5. [ ] **Testing & Verification:** Run `npm run dev` in the terminal to preview camera pans, tab switches, and responsive handheld tablet view on mobile.

```

```