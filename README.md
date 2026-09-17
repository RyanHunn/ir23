# Infanterie-Regiment 23

Recruiting site for IR23, a WWI German infantry living-history unit at the Great War Association (Newville, PA).

## Contents

- `site/` — the live static site (`index.html`, `styles.css`, `script.js`, `photos/`). Deployed to GitHub Pages via `.github/workflows/pages.yml` on every push to `main` that touches `site/`.
- `project/` — the original Claude Design source (`IR23 Website.dc.html` and related font-option files, photos, copy doc, `support.js`) that `site/` was implemented from. Keep this in sync if the design is revised there.

## Editing

For copy or layout tweaks, edit `site/` directly. For structural design changes, update the source in `project/` first, then carry the change into `site/`.
