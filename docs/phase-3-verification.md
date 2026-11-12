# Phase 3 — full enhanced house

The enhanced world now includes shared architectural shell and flooring, a bedroom/wardrobe alcove, living gallery and studio, with the same footprint, collision dimensions and six interaction anchors as classic. All portfolio data and original interactions remain shared. No accessibility/content-expansion features were added.

New art is original procedural code: oak grain, subtle plaster variation, woven textiles, rounded upholstery, cabinetry, books, plants, lathed trophies, TV/monitor artwork and layered Mumbai-inspired window panoramas. Warm daylight and cool city nights follow the existing cycle/day/night controls; live reduced-motion changes keep all windows and room lighting synchronized. No outdoor traversal, weather system or paid/external asset pipeline was added.

The enhanced frame, sidebar, menus and existing panels use the same warm plaster/forest/brass palette. Scoped CSS leaves classic presentation available. Existing keyboard/touch, map, phone, PDF, project and portfolio navigation behavior is retained.

## Lighting and quality decision

Shared materials and static surface batching reduce draw submissions. High adds a selective directional shadow map to ground furniture; floors, rugs and worktops receive shadows while structural shells do not cast this approximation of window daylight. The 1024² map bakes at startup/quality changes, not every animation frame. Balanced and Low use generated contact shading without shadow mapping. Three r187's `BasicShadowMap` gives a restrained sun shadow. The removed `PCFSoftShadowMap` option was corrected; both filtered and basic shadow prototypes missed the default performance budget at High. Automatic therefore conservatively chooses Balanced (80% resolution, no shadow-map sampling), or Low on limited hardware hints. Explicit High remains available at 100% with shadows; its measured p95 of 66.6 ms is a documented quality/performance tradeoff, not a passing budget claim.

This is deliberately selective game-style lighting, not physically complete indoor light transport. No renderer migration, post-processing framework or external HDR texture was introduced. Geometry, textures, materials and shadow render targets are disposed when scenes change.

## Verification

- Sequential `npm run check`: 0 errors and 0 warnings. `npm run build`: exit 0, no warnings. Both synchronize SvelteKit state, so do not run them concurrently.
- Node loader/resource suite: 7 passed, 0 failed, including shared GPU resource and shadow-target disposal.
- Source enhanced regression: all six spatial targets, exact classic/enhanced collision/target parity, project detail/back, PDF canvas, skills, awards, TV, presets, map and phone passed with no page errors. Live reduced-motion cycle transitions are exercised against the actual enhanced lighting loop.
- Production room captures: living, bedroom, studio and wardrobe day/night pairs visibly differ under reduced motion and have no horizontal overflow, page errors or application console warnings/errors. Selected captures and the room report are retained in `docs/phase-3-evidence/`.
- Production recovery suite passed eight groups: switching both ways, enhanced load failure, context loss, unavailable WebGL, automatic mobile selection, corrupt preferences and denied storage. No page errors. Both enhanced and classic source interaction suites passed all six targets, settings, lighting, map and phone without errors.
- Enforced automatic enhanced budget passed in local headless Chromium: ten-second desktop traversal p95 33.4 ms; initial encoded document and resources 276,053 bytes; desktop and emulated mobile had no page errors or overflow. The retained performance report records the complete measurement.
- An initial production startup capture found a Svelte payload error before app mount. A sequential rebuild and preview restart resolved it; subsequent fresh-build room checks passed. The original mismatch was not independently isolated. Restart the owned preview after each build.

The enforced target is p95 ≤33.4 ms for the existing ten-second desktop traversal, and initial encoded document/resources <3 MB. Emulated mobile remains an operability check, not physical-device certification. Manual screen-reader and physical Safari/Firefox/mobile results are not claimed.

Phase 4 still needs to replace the enhanced wardrobe's existing mirror close-up with its dedicated character/large-mirror experience. This document does not claim that work complete.
