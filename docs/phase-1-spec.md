# Phase 1 — visual specification and acceptance proposal

Status: draft for review, 2026-11-12. Implementation authorized by the user; phase acceptance is still required by the project workflow.

Visual review: [original concept board](phase-1-board.svg). This schematic illustrates palette, material relationships, window depth, day/night contrast and room circulation; it is not a production render or a claim of achieved fidelity.

## Art direction

An original Mumbai creative studio: warm lime plaster, honey oak, woven textiles, muted indigo upholstery, terracotta planters and brushed dark metal. Broad rounded furniture edges and deliberate silhouettes provide selective stylization; varied roughness, contact shadows and layered daylight provide depth. Avoid copying Fortnite characters, buildings, logos or assets.

Palette: plaster `#e9dfcf`, oak `#b88453`, indigo `#344e68`, terracotta `#ba7058`, leaf `#617d67`, brass `#d4ad69`, evening sky `#647c9e`. Day uses warm indirect light and cool window fill; night uses restrained amber practical lighting, blue exterior light and readable navigation. Retain cycle/day/night controls and reduced-motion behavior.

Window composition: layered residential towers, balconies, rooftop water tanks and distant coastal haze; an imagined Mumbai-inspired neighborhood, without claiming a real address. Windows remain visual scenery, with no outdoor traversal or weather simulation.

## Layout and interaction mapping

Retain the existing 28 by 18 world footprint initially. Keeping divider openings, spawn, collision boundaries and interaction anchors makes a complete regression comparison possible. Revisit geometry only with corresponding map and collision updates.

```text
                    NORTH / CITY WINDOWS
┌────────────────┬──────────────────┬─────────────────┐
│ Bedroom        │ Living gallery   │ Creative studio │
│ bed + reading  │ TV + awards      │ PC + résumé     │
│ Changing area  ⇄ open circulation ⇄ skills / work   │
│ mirror/figure  │ sofa / arrival   │ shelving        │
└────────────────┴──────────────────┴─────────────────┘
                     SOUTH / ARRIVAL
```

| Existing behavior | Retained destination | Verification |
| --- | --- | --- |
| PC, pinned/public projects, project details | Studio monitor | Open, navigate, follow verified links, exit and restore position |
| Résumé preview/download and skills | Studio file and direct menu | Tabs, PDF success/failure, download, keyboard exit |
| About and mirror | Bedroom / changing area | About content parity; continuously visible character, zoom/pan/reset |
| Experience TV and sofa interaction | Living gallery | Both targets, chapter selection, previous/next, play/pause, exit |
| Achievements and trophy details | Living gallery | All records, detail actions and return |
| Contact and phone notification | Phone and portfolio menu | Links, notification timing, dismiss and return |
| Portfolio menu | Always available outside spatial navigation | About/projects/skills/experience/achievements/contact and résumé |
| House maps and markers | Existing navigation | Alignment with geometry, current location, map exit |
| Movement and camera | First person | WASD/arrows, sprint, jump, crouch, pointer lock, collision |
| Touch and orientation | All spatial paths | Joystick, look, tap interaction, portrait override, landscape |
| Session and introduction | Arrival | Enter/skip/resume, visibility return and saved camera |
| Graphics, fullscreen and help | Game menu | Presets, resolution, time, persistence, reset, fullscreen fallback |
| Reduced motion and 2D | All entry paths | Static light cycle, instant transitions, content parity |

## Technical proposal

Keep SvelteKit, Three.js WebGLRenderer and the current module boundaries. Preserve `src/world.js` as classic; create a separate enhanced scene using the same world contract: scene, colliders, spawn, computer, targets, character, update and lighting controls. Share interaction data rather than fork portfolio content. Do not migrate renderer before vertical-slice evidence warrants it.

Enhanced selection must be explicit and saved, with automatic capability selection as a starting heuristic. Classic remains selectable. Failed enhanced scene creation must clean resources and retry classic; unavailable/lost WebGL must offer the 2D route and useful portfolio access. Asset-loading errors must resolve to an operable state. Test denied storage, corrupt preference, context loss and reload recovery.

Original procedural modeling is the first asset pipeline: no new binary dependencies, external texture hosts or attribution obligations. Use existing Three.js tooling and optionally Blender for authored mesh/rig work. Any external asset requires recorded author, exact source URL, license text/version, redistribution permission and attribution before inclusion. No external asset is approved by this proposal. Character photos are absent from the inspected source inventory; do not invent a likeness or substitute a third-party character. Review the existing procedural character first.

### Asset and tooling inventory

| Item | Current source / license evidence | Production decision |
| --- | --- | --- |
| House, furniture, plants, markers and character | `src/world.js`; project `LICENSE` (MIT, Parth Kaushal) | Original procedural assets; preserve classic source and create modular enhanced geometry |
| About portrait, trophy and project artwork | `src/house-interactions.js`, `src/pc-desktop.js`; project MIT | Existing CSS/SVG originals; upgraded scene uses original geometry, not copied game assets |
| Résumé | `static/resume.pdf`, 232,172 bytes; user portfolio document | Preserve as portfolio content; distribute only in its existing intended portfolio context |
| Favicon and 2D template | `static/favicon.svg`, `static/2d/index.html`; project MIT | Preserve; generated 2D content remains sourced from `src/content.js` |
| Legacy raster/video files | `static/bg-*.jpg`, `static/presenter-home.webm` | Excluded by `scripts/prepare-v3-assets.mjs`; do not reuse without separate rights review |
| Three.js | Installed `node_modules/three/LICENSE`, MIT | Retain notices; existing rendering dependency, no new service |
| Svelte/SvelteKit/Vite | Installed package license fields: MIT | Existing open-source build/runtime stack |
| Playwright, PDF.js | Installed license fields: Apache-2.0 | Existing verification and PDF tooling |
| GSAP | Installed package reports its own standard no-charge license | Legacy dependency; not an open-source license claim. No new usage in the revamp; active house imports do not use it |
| Standalone mesh / original reference photos | No `.glb`, `.gltf`, `.fbx` or original photo reference found in source inventory | No third-party model or photograph approved for inclusion |

Character pipeline options: procedural geometry offers the smallest integration risk and direct control of quality tiers, but limits facial fidelity; an original Blender-authored model can provide better proportions and likeness but adds modeling, rig/export and licensing-review work. Recommend evaluating a smoother procedural portrait in the slice, then deciding with the user whether an authored model is necessary. Preserve the existing glasses, hair, skin palette and outfit as a starting reference, subject to likeness approval. No pose library or outfit system is part of this release.

Relative scope: baseline and architecture are small; polished single-room slice and failure recovery are medium; whole-house art production and likeness modeling are the largest uncertain work; accessibility/content depend on manual validation and user evidence. Do not mass-produce rooms until the slice demonstrates acceptable quality and runtime cost. No new renderer, purchased asset or external hosted API is justified at this stage.

## Proposed budgets and verification limits

These are acceptance proposals, not measured guarantees. Desktop target: p95 animation frame interval at most 33.4 ms over a repeatable 10-second walk at 1440×900 on the available machine. Mobile target: operable classic/2D at 390×844; emulate touch and reduced motion, and report real-device coverage separately. Enhanced initial transfer target: at most 3 MB compressed excluding on-demand PDF; no renderer chunk warning; no unhandled page errors. Measure production cold navigation separately from development module loading. Keep resolution override and low quality available.

Vertical slice must show studio materials, window composition, day/night lighting and a usable PC interaction, with comparable classic/enhanced screenshots. Full-house acceptance requires every row above in classic and enhanced, keyboard direct access, viewport overflow checks and failure recovery. Character acceptance requires user likeness review. Content acceptance requires verified user facts and project evidence. Screen-reader and representative physical-device testing cannot be claimed from browser emulation.

## Baseline evidence

- Node v24.6.0; npm 11.6.4.
- `npm run check`: exit 0; “svelte-check found 0 errors and 0 warnings”.
- Initial `npm run build`: exit 0 with existing 888.22 kB client entry warning. Resolved by splitting Three.js core and WebGL renderer at their module boundaries in `vite.config.ts`; final build exit 0 with no warnings. Page entry is now 145.49 kB / 45.08 kB gzip, Three chunks 365.20 kB and 383.44 kB. Warning threshold is unchanged. No application logic or visible scene changed.
- Final production Chromium run: desktop local navigation load event 42.6 ms; emulated mobile 8.6 ms. These are unthrottled local measurements, not a WAN loading promise. Desktop stationary p95 frame interval 33.4 ms; mobile stationary 16.8 ms. Ten-second desktop traversal p95 **50 ms**, above the proposed 33.4 ms target. This is baseline evidence, not a passed enhanced-scene performance acceptance test. Mobile coarse-pointer media and visible touch controls were explicitly asserted before capture.
- All six spatial targets, PC project detail/back, résumé PDF rendering, skills, award navigation, both TV approaches/controls, four graphics presets, day/night/cycle selection, map and phone passed. World lighting assertions verified day `c8b49a`, night `384451` and a static day cycle under reduced motion. No page errors. Six direct portfolio sections and 2D HTTP 200 passed at both viewports, with no horizontal overflow.
- Client JavaScript artifact inventory: 394,913 bytes summed gzip across all client JS (including optional PDF code); not a measured initial transfer. PDF worker and résumé are separate assets; full initial transfer budget remains for the slice.
- Tracked reports, environment and selected screenshots: [baseline directory](phase-1-baseline/). [Classic desktop](phase-1-baseline/desktop.png), [mobile](phase-1-baseline/mobile.png), [computer](phase-1-baseline/computer.png), [mirror](phase-1-baseline/mirror-1.png). No physical mobile or screen-reader verification recorded.

### Test matrix

| Environment | Coverage | Limits |
| --- | --- | --- |
| Local Chromium 1440×900 | Production entry, six direct portfolio sections, 2D response, layout overflow, stationary frame samples and ten-second D/A/S/W traversal | Local network, synthetic keyboard events; collision remains active |
| Emulated Chromium 390×844 touch/reduced motion | Entry, portrait override, navigation, 2D response, overflow and frame samples | Does not establish real-phone GPU, thermal or Safari behavior |
| Desktop development runtime | All six spatial targets, project detail/back, PDF canvas, skills, awards, TV controls, settings, map and phone | Session resume positions visitor at legal target approaches; does not prove every possible route |
| Physical desktop/mobile and screen reader | User/manual review required | No physical mobile, Safari, Firefox, VoiceOver or NVDA result claimed |

Interaction counts from the classic world: 321 meshes, 7,562 triangles, 21 colliders and six spatial targets (PC plus mirror, file, awards and two TV approaches). Baseline scripts record the exact legal approach positions. Animation-frame intervals include browser scheduling and are not GPU timings. Production transfer must be evaluated with a separately stated cache/network profile; summed gzip artifact sizes are inventory data rather than a measured transfer.

## Review decisions

Approve palette/layout and proposed budgets before Phase 2. The current traversal result misses the proposed target; the slice must demonstrate improvement or prompt an explicit budget decision before production. Review the existing character before deciding whether new photo references or an authored model are required. Supply case-study evidence when Phase 6 begins. Phase 1 deliverables and automated verification are complete; acceptance review is pending.
