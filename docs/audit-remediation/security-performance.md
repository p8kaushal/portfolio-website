# Security, performance and asset review

Reviewed on the local `chore/security-performance-audit` branch. This is a scoped engineering review, not a security certification.

## Dependency advisories

`npm audit --omit=dev` reported zero advisories. The full audit reported six low-severity entries and zero moderate, high or critical entries. The six include propagated dependency entries and do not represent six separately demonstrated exploits.

- SvelteKit is present as a development/build dependency; the site is prerendered and deployed as static output. The reported enhanced-form redirection and prerendered cache-header advisories require conditions not established in the current application. Do not treat that observation as proof of immunity.
- The reported `cookie` advisory enters through SvelteKit; no application cookie handling was found in the active routes during the targeted search.
- `deepmerge` enters through the Svelte Vite plugin and the audit reports no patched 4.x release at the time of review. It is a build tool dependency. The registry-recommended framework upgrade includes major-version changes and needs separate compatibility evaluation; it was not forced.
- ESLint's dependency tree initially added moderate minimatch advisories. Scoped overrides select minimatch 11.0.8 for ESLint and its config-array dependency. Lint and tests passed, but this crosses a transitive major version and should be revisited when upstream versions no longer need the override.

## Secret scan

`detect-secrets` 1.5.0, installed outside the repository, scanned tracked files with verification disabled and reported zero candidates. It also scanned a text patch generated from `git log --all -p` and reported zero candidates. Binary files, unreachable/deleted Git objects, remote refs not fetched locally and service-side secrets are outside that scan. No candidate was printed. These results do not prove the absence of secrets.

## Assets and performance

The repository retains approximately 376 MB of `static/` assets, much of it from prior portfolio versions. The generated production build is approximately 3.2 MB; `scripts/prepare-v3-assets.mjs` limits deployed static files to the current résumé, favicon, social card and generated 2D experience. Legacy components reference older media, so deletion requires a separate inventory and approval. The PDF worker is approximately 1.27 MB in the build and loads for PDF rendering; the share card is approximately 33 KB.

The enforced local Chromium traversal test after SSR and accessibility changes passed at 16.8 ms desktop p95 (threshold 33.4 ms) with 281,990 initial encoded response bytes. Emulated mobile selected classic and loaded 275,139 encoded bytes. These figures are one local headless run, not physical-device benchmarks; past samples were variable. GPU ReadPixels warnings were observed in headless Chromium and remain to be assessed on actual devices.
