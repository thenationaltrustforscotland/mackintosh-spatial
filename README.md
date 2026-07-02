# Mackintosh Illuminated — Spatial collection prototype

An interactive spike exploring how whole interiors can be presented as part of a
digitised collection: a room photo with clickable hotspots that open object
details in place, showing how objects relate to one another within a space.

Built for the National Trust for Scotland's _Mackintosh Illuminated_ project
(National Lottery Heritage Fund), building towards the 2028 centenary of Charles
Rennie Mackintosh. This is a throwaway prototype with mock data, not production
code.

## What it does

- Four Hill House interiors (Hall, Main Bedroom, Drawing Room, Window Seat Alcove)
- Clickable hotspots placed over objects in each room
- Slide-in detail panel per object (image, maker, description, accession, credit,
  licence) with a call-to-action linking to the full object record
- Room switcher, keyboard accessible, WCAG AA contrast

## Stack

Vite · React 19 · TypeScript · Tailwind CSS v4 · Biome

## Running locally

```sh
npm install
npm run dev
```

Other scripts:

```sh
npm run build       # type-check + production build
npm run typecheck   # tsc --noEmit
npm run lint        # biome check
npm run lint:fix    # biome check --write
npm run blurhashes  # regenerate room-image blurhashes (paste into rooms.ts)
```

## Hosting

Deployed to GitHub Pages on every push to `main` via
`.github/workflows/deploy.yml`. The Vite `base` path is set to the repo name in
`vite.config.ts` so assets resolve on the project Pages URL.

## Notes and caveats

- **Records are placeholder text**, not real CIIM/Axiell data.
- **Object images are placeholders** (an SVG rose); room photos are real Hill
  House interiors, © National Trust for Scotland.
- **Hotspot coordinates are eyeballed** as percentages in `src/data/rooms.ts` and
  will need nudging against the final images.
- **soleil** (the NTS primary typeface) is loaded via Adobe Typekit and may not
  render on domains outside the NTS kit's allow-list.

## Layout

| Path                         | Purpose                               |
| ---------------------------- | ------------------------------------- |
| `src/App.tsx`                | Room switcher, header, footer, layout |
| `src/components/RoomView`    | Room image + blurhash + hotspot overlay |
| `src/components/Hotspot`     | A single clickable marker             |
| `src/components/ObjectPanel` | Slide-in object detail panel          |
| `src/data/rooms.ts`          | Mock room + object fixtures           |
| `src/data/types.ts`          | `Room` / `CollectionObject` shapes    |
| `src/assets/rooms/`          | Hill House interior photos            |
