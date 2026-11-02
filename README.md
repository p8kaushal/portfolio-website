# Parth Kaushal — Portfolio House

An interactive, code-built portfolio: explore the house in first person or use the portfolio menu for direct access to projects, experience, skills, achievements and contact details. A 2D version is available as a fallback.

## Local development

Use Node.js 24 and npm:

```sh
npm ci
npm run dev
```

The predev and prebuild scripts prepare a minimal `.generated-static` directory from the résumé and 2D source. They also generate the 2D portfolio content from `src/content.js`, so the two experiences use the same projects, experience, skills and achievements.

```sh
npm run check
npm run build
npm run preview
```

The static production output is `build/`. Only the files required for v3 are copied into that output; legacy media in `static/` is not included.

## Updating content

Edit `src/content.js` for the portfolio, and replace `static/resume.pdf` when the résumé changes. Pinned projects are a snapshot of the GitHub profile; the PC also fetches other public repositories when GitHub is available. Project links should only be added when confirmed.

The 3D world, character, furniture and visual effects are generated in code. Time of day and graphics settings are available from the in-game menu. The experience includes keyboard and touch controls, a quick portfolio menu, a house map and a 2D fallback.

## Deployment

The GitHub Pages workflow builds with Node 24 and uploads `build/`. It is configured for the existing `parthkaushal.in` root domain and runs on `main` or manual dispatch; work on another branch does not deploy automatically. Review the destination and changes before merging or deploying. Root-relative URLs assume the site is hosted at the domain root.
