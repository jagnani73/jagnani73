# Yashvardhan Jagnani — Portfolio

An editorial, "newspaper-of-record" portfolio built with Next.js 16 (App Router), React 19, TypeScript (strict), and Tailwind CSS v4.

## Tech Stack

- **Framework**: Next.js 16 (App Router), React 19, React Compiler enabled
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4 (CSS-based `@theme` config) with a dark (cyan) / light (paper) theme via `next-themes`
- **Markdown**: `react-markdown` (derived case overviews)
- **Analytics**: `@next/third-parties` (GA) + `@vercel/speed-insights`
- **Package manager**: pnpm

## Routes (`src/app/`)

- `/` — Home: masthead (animated fig.1 band canvas), `01 The Chapters`, `02 Selected Work`, `03 The Person`.
- `/record` — **The Record**: one filterable timeline of everything, with a year-gutter constellation canvas and per-year "consensus" confirm animation.
- `/record/[slug]` — **Case study** template. Every project gets a page: authored cases are exemplars; the rest are derived from `data.ts`. `generateStaticParams()` prerenders all of them.
- `/api/resume`, `/api/cover-letter` — redirect routes.
- Legacy `/projects`, `/projects/:slug`, `/experiences` 301-redirect to `/record` (`next.config.ts`).

## Project Structure

```
website/
├── src/
│   ├── app/                 # Routes, layout, globals.css, OG image routes
│   │   ├── api/             # resume + cover-letter redirect routes
│   │   └── record/          # /record and /record/[slug]
│   ├── components/
│   │   ├── shared/          # theme-provider, site-rail, page-shell, footer, back-to-top
│   │   ├── home/            # masthead, chapters, selected-work, person
│   │   ├── work/            # record-client, year-mark, consensus-block
│   │   ├── case/            # case template parts + plate-viewer lightbox
│   │   └── canvas/          # band-canvas, time-constellation, figs/ (per-case fig.1)
│   ├── content/             # typed, build-static content
│   │   ├── record.ts        # the record timeline (+ computed counts)
│   │   ├── home.ts          # chapters / selected work / person
│   │   ├── cases/           # authored cases, registered in cases/index.ts
│   │   └── case-types.ts    # CaseData + section unions
│   ├── hooks/               # in-view, is-mobile, media-query, reduced-motion, theme-tokens, tick
│   ├── lib/                 # fetch-metrics (ISR), project-to-case, theme-tokens
│   └── utils/               # data.ts (projects, resumes, coverLetter), types, enums
└── next.config.ts
```

## Theming

Tokens are CSS custom properties in `src/app/globals.css`, defined per `[data-theme]` and mapped into Tailwind v4 via `@theme inline` (e.g. `bg-bg text-tx border-rule text-sig`). Canvas/JS color access goes through `lib/theme-tokens.ts` + `hooks/use-theme-tokens.ts`. A single `rail` breakpoint (1201px) drives the desktop/compact split.

## Content

- **Record rows**: `src/content/record.ts` (counts recompute automatically).
- **Home sections**: `src/content/home.ts`.
- **A new case study**: add `src/content/cases/<slug>.tsx` and register it in the `AUTHORED` map in `cases/index.ts`. Any `data.ts` project already has a derived page.

## Development

```bash
pnpm install
pnpm dev      # development server
pnpm lint     # ESLint + type-aware rules (also run: npx tsc --noEmit)
pnpm build    # production build
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

Deployed on **Vercel** (zero-config). Live metrics (GitHub stars/forks, npm version count) are fetched at build with daily ISR and fall back to `content/metrics.ts`.

## Author

**Yashvardhan Jagnani**
- Website: [jagnani73.com](https://jagnani73.com)
- GitHub: [@jagnani73](https://github.com/jagnani73)
- Twitter: [@jagnani73](https://twitter.com/jagnani73)
- LinkedIn: [yashvardhan-jagnani](https://linkedin.com/in/yashvardhan-jagnani)
