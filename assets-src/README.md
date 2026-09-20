# assets-src

Full-resolution originals. **Nothing here is published.**

`public/` is copied verbatim into `dist/`, so keeping 19 MB of source PNGs there
meant every deploy shipped them even though the site never requested them.
They live here instead, and `scripts/optimize-images.mjs` (which runs
automatically before `npm run build`) reads from this folder and writes the
optimized WebP the site actually loads into `public/`.

Edit or add originals here, then run:

    npm run optimize:images

Do not hand-edit anything the script generates:

| generated into                 | from                     |
| ------------------------------ | ------------------------ |
| `public/backgroundd.webp`      | `backgroundd.jpg`        |
| `public/backgroundd-fallback.jpg` | `backgroundd.jpg`     |
| `public/favicon-32.png`, `favicon-180.png` | `Main-OG.png` |
| `public/assets/skills/*.webp`  | `skills/*`               |
| `public/assets/Projects/*.webp`| `Projects/*`             |
| `src/assets/images/Portfolio.webp` | `src/assets/images/Portfolio.png` |
