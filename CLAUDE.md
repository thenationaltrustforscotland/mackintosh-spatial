# CLAUDE.md

Guidance for Claude Code (and other AI assistants) working in this repo.

## What this is

A throwaway prototype (spike) for the National Trust for Scotland's _Mackintosh
Illuminated_ project. It demonstrates a "spatial" way of presenting a digitised
collection: room photos with clickable hotspots that open object detail panels in
place. Mock data only. Not production code.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/vite`, config lives in `src/index.css` under
  `@theme`, not a `tailwind.config.js`)
- Biome for lint + format (not ESLint / Prettier)

## Commands

```sh
npm run dev         # dev server (the user runs this, not the assistant)
npm run build       # tsc -b && vite build
npm run typecheck   # tsc --noEmit
npm run lint        # biome check .
npm run lint:fix    # biome check . --write
```

Do not start the dev server; the user runs it. Running lint / typecheck / build to
verify changes is fine.

## Conventions

- **NTS brand palette** is defined as Tailwind theme colours in `src/index.css`
  (`ice`, `air`, `mist`, `granite`, `slate`, `charcoal`, `heather`, `berry`,
  `forest`, `gold`, `redrose`). Values come from the main NTS Craft site's
  `_variables.scss`. Use these tokens, do not hardcode hex.
- **Font**: soleil via Adobe Typekit (`index.html`). Maxwell is intentionally not
  used.
- **Accessibility is a hard requirement** (the project must meet WCAG AA).
  - Keep text contrast ≥ 4.5:1. Do not use `granite` for text on light
    backgrounds (fails AA); use `slate` instead.
  - All interactive elements need a visible `focus-visible` outline.
  - Hotspots are real `<button>`s; the detail panel is a focus-trapped
    `role="dialog"` that closes on Escape.
  - Keep the skip link and landmark structure (`nav`, `main`) intact.

## Data model

- `src/data/types.ts` — `Room` and `CollectionObject` shapes. The object fields
  (accession, maker, credit, licence) mirror what a real CIIM/Axiell export would
  provide so the mock data ports cleanly later.
- `src/data/rooms.ts` — the fixtures. `detailUrl` is derived from each object id
  (`/collections/object/{id}`), matching the intended production route.
- `hotspot: { x, y }` are **percentages** of the room image, eyeballed. Expect to
  nudge them when images change.
- Object images are placeholders (`src/data/placeholder.ts`); room photos are real
  Hill House interiors and are © National Trust for Scotland.

## Hosting

GitHub Pages, deployed by `.github/workflows/deploy.yml` on push to `main`. The
Vite `base` must stay set to the repo name in `vite.config.ts` or Pages asset URLs
break.
