# Yashvardhan Jagnani - Portfolio

An editorial, "newspaper-of-record" portfolio: Next.js 16 (App Router), React 19 (React Compiler), TypeScript (strict), Tailwind CSS v4.

## Stack

- **Framework**: Next.js 16 (App Router), React 19 + React Compiler
- **Styling**: Tailwind CSS v4 (`@theme`): dark (cyan) / light (paper) via `next-themes`
- **Analytics**: `@next/third-parties` (GA) + `@vercel/speed-insights`
- **Package manager**: pnpm

## Routes (`src/app/`)

- `/` - Home: masthead (fig.1 band canvas), `01 The Chapters`, `02 Selected Work`, `03 The Person`.
- `/record` - **The Record**: one filterable timeline of everything, with a year-gutter constellation canvas + per-year "consensus" animation.
- `/record/[slug]` - **Case-study** template for the authored cases (`generateStaticParams` prerenders the roster). Other projects are plain timeline rows, not pages.
- `/api/resume`, `/api/cover-letter` - redirect routes.
- `/sitemap.xml`, `/robots.txt` - generated. Legacy `/projects`, `/experiences` 301 → `/record`.

## Structure (`src/`)

```
app/         routes, layout, globals.css, OG image
components/   shared · home · record · case · canvas (band/constellation + figs)
content/      record.ts · home.ts · cases/ · metrics.ts
hooks/        media-query · theme-tokens · in-view · tick · …
utils/
  constants/  site.ts (links, docs, astro facts) · theme-tokens.ts (palette)
  functions/  seo.ts · selected-work.ts · fetch-metrics.ts · theme-css.ts
  types/      one *.types.ts per domain
```

## Theming

The palette is defined once in `utils/constants/theme-tokens.ts`. `utils/functions/theme-css.ts` generates the per-`[data-theme]` CSS custom properties from it (injected in `layout.tsx`); `globals.css` only maps them into Tailwind via `@theme inline`. Canvas islands and the OG image read the same tokens in JS. A single `rail` breakpoint (1201px) drives the desktop/compact split.

## Content

- **Timeline rows**: `src/content/record.ts` (counts recompute automatically).
- **Home sections**: `src/content/home.ts`.
- **A new case study**: add `src/content/cases/<slug>.tsx`, register it in the `AUTHORED` map in `cases/index.ts`, and give it a plain-text `seoDescription`.

## SEO

`utils/functions/seo.ts` is the single source for site identity (`SITE_*`) and the JSON-LD builders, rendered via `components/shared/json-ld.tsx`: home → `Person` + `WebSite`, `/record` → `CollectionPage`, each case → `CreativeWork`. Canonicals and the title template live in `layout.tsx`.

## Develop

```bash
pnpm install
pnpm dev      # dev server
pnpm lint     # ESLint (also: npx tsc --noEmit)
pnpm build    # production build
```

## Deploy

Vercel (zero-config). Live metrics (GitHub stars/forks, npm versions) are fetched at build with daily ISR, falling back to `content/metrics.ts`.
