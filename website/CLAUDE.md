# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start development server (Turbopack)
pnpm lint       # Lint + type-check (use this to verify changes, not pnpm build)
pnpm build      # Production build (only when explicitly needed)
```

Run all commands from the `website/` directory. Also run `npx tsc --noEmit` to catch type errors ESLint misses.

## Architecture

Next.js 16 (App Router) portfolio, React 19, TypeScript (strict), Tailwind CSS v4, pnpm. React Compiler is enabled (`reactCompiler: true`) — note the `react-hooks/immutability` and `react-hooks/set-state-in-effect` lint rules it adds (subscribe to media queries via `useSyncExternalStore`, mutate shared refs only in their owning component).

The site is an **editorial "newspaper-of-record"** redesign with three page types and a dark/light theme.

### Routes (`src/app/`)
- `/` — Home: masthead (fig.1 band canvas), `01 The Chapters`, `02 Selected Work`, `03 The Person`.
- `/record` — **The Record**: one filterable timeline of everything (73 entries), with the year-gutter constellation canvas + per-year "consensus" confirm animation. (Route lives at `src/app/record/`; the client lives at `components/work/record-client.tsx` — that component dir keeps its name.)
- `/record/[slug]` — **Case study** template. `generateStaticParams()` prerenders every case (3 authored + all `data.ts` projects); per-case `generateMetadata()`.
- `/api/resume`, `/api/cover-letter` — redirect routes (unchanged).
- `next.config.ts` `redirects()`: `/projects`, `/projects/:slug`, `/experiences` → `/record` (301). The old projects/experiences pages were removed. (The route was renamed from `/work` → `/record`; record-entry `url`s point at `/record/[slug]`.)

### Theme & tokens
- **`next-themes`** (`components/shared/theme-provider.tsx`): `attribute="data-theme"`, `storageKey="jagnani73-mode"`, `defaultTheme="system"` + `enableSystem` (follows the OS scheme; `light` paper is the fallback), themes `dark` (cyan) / `light` (paper), no-flash.
- Tokens are CSS custom properties in `src/app/globals.css`, defined per `[data-theme]` and mapped into Tailwind v4 via `@theme inline` → use utilities `bg-bg text-tx border-rule text-pri text-sig text-acc bg-pri-a18` etc. **Do not add unlayered element rules** (e.g. a bare `a {}`) — they override `@layer utilities` and break `text-*` on links. Keyboard focus shows a `:focus-visible` ring (`--sig`); the bare `outline: none` is paired with a `:focus-visible` override, never left standalone.
- Canvas/JS color access: `lib/theme-tokens.ts` (typed token objects) + `hooks/use-theme-tokens.ts` (replaces the prototype's `window.PAGE_THEME`).
- Single breakpoint **1201px** via `@theme { --breakpoint-rail }` → `rail:` (≥1201 desktop) / `max-rail:` (≤1200 compact) variants. Prefer CSS variants over JS; `hooks/use-is-mobile.ts` only where JS needs the boolean.
- Fonts (`app/layout.tsx`, `next/font`): **Anton** (`font-display`), **Instrument Serif** (`font-serif`), **JetBrains Mono** (`font-mono`), **DM Sans** (`font-sans`).

### Content (`src/content/`) — typed, build-static
- `record.ts` — the 73-entry record + `getRecordCounts()` (computed at build, never hardcoded).
- `home.ts` — chapters / person / deck (Selected Work is **derived**, not stored here).
- `case-types.ts` — `CaseData` + section unions; `cases/*.tsx` are the authored cases, keyed in the `AUTHORED` map in `cases/index.ts` (the registry: `getCase`, `getAllCaseSlugs`, `getCaseTitle`).
- `metrics.ts` — hardcoded metric fallbacks.

### Selected Work (home `02`) — derived, never curated
`lib/selected-work.ts` `getSelectedWork(n=6)` returns the **latest N case studies, newest-first**, walking `RECORD` (internal `isCase` entries, already chronological). Cases **without an `ogImage` are skipped** so every row shows a real thumbnail (e.g. `solana-ml-dsa-44` is image-less → it falls through and the next case down is pulled in). Per row: title/image/tag come from the case registry (`getCase`) — `img` = the case `ogImage`; `tag` = the first `·`-segment of the case `badge`, lowercased, **except** `agent-sdk`/`goldrush-kit` whose tag is a live metric (`METRIC_BY_SLUG`). Adding an image-backed case to the record surfaces it here automatically.

### Data-driven case template
Every project gets a `/record/[slug]` page. Authored cases (the `AUTHORED` map in `cases/index.ts`) are exemplars; `lib/project-to-case.ts` derives a baseline `CaseData` (markdown overview + image plates) from any `data.ts` project so the rest render too. `data.ts` slug `ai-agent-sdk` aliases to the authored `agent-sdk` (no duplicate page). Authored cases override derived ones. Each authored case's roster index (`idx`) and size (`rosterSize`) are **computed from the `AUTHORED` order in `getCase` — never hardcoded per file**.

### Live metrics (ISR)
`lib/fetch-metrics.ts` `getMetrics()` fetches GitHub stars/forks + npm version count at build (`revalidate: 86400`), falling back to `content/metrics.ts` — **Server Components only**, never client-side, never renders a blank/spinner.

### SEO
`lib/seo.ts` is the single source of truth: `SITE_URL`/`SITE_NAME`/`SITE_DESCRIPTION` (imported by `layout.tsx` — don't redeclare) + JSON-LD builders (`personLd`, `websiteLd`, `caseLd`, `collectionPageLd`, `breadcrumbLd`). `components/shared/json-ld.tsx` renders blobs into `<script type="application/ld+json">` (escapes `<` → `<`). **Where JSON-LD lives:** home (`page.tsx`) → `Person` + `WebSite`; `/record` → `CollectionPage` + `BreadcrumbList`; each case → `CreativeWork` + `BreadcrumbList` (refs the Person by `@id`). `app/sitemap.ts` + `app/robots.ts` are file-convention routes (sitemap walks `getAllCaseSlugs()`; robots disallows `/api/`). Root `layout.tsx` sets a title **template** `"%s — Yashvardhan Jagnani"` and `alternates.canonical` — so page-level `title`s are the **bare** page name (no manual suffix) and each page sets its own `canonical`. **Case descriptions:** authored cases' `deck` is JSX, so each authored case carries a plain-text `seoDescription` (~150 chars) on `CaseData`; `generateMetadata` prefers it, then a string `deck` (derived cases), then a generic fallback. Add `seoDescription` whenever you add an authored case.

### Canvas islands (`src/components/canvas/`, all `"use client"`)
`band-canvas.tsx` (home contours), `time-constellation.tsx` (`/work` mesh), `figs/{fig-score,fig-agent-graph,fig-wager}.tsx` (case fig.1). All gate on `hooks/use-reduced-motion.ts` (static end-state) and pause when offscreen (`IntersectionObserver` / `hooks/use-in-view.ts`). Year-confirm lives in `components/work/{year-mark,consensus-block}.tsx`. Lightbox in `components/case/plate-viewer.tsx` (focus-trapped `role="dialog"`). Shared fig "card" surface: `figs/fig-style.ts` (`figPanel(t)`); each fig.1 is wrapped `role="img"` with a `FIG_LABELS` description in `case-fig.tsx`.

### Component layout (`src/components/`)
`shared/` (theme-provider, site-rail, page-shell, page-footer, back-to-top), `home/`, `work/`, `case/`, `canvas/`.

### Flat `data.ts`
`src/utils/constants/data.ts` holds **only** `projects` (drives the derived `/record/[slug]` case pages), `resumes`, and `coverLetter` (API routes). The `experiences`/`hackathons`/`certifications`/`researchPapers` exports (superseded by `record.ts`) were removed, along with their now-dead types/enums. Types in `src/utils/types/` are now just `ProjectType` + `ResumeType`; enums in `shared-constants.tsx` are `STACK_NAMES` + `LINKS_NAMES`; `stripMarkdown` in `functions/`.

**Images:** Cloudinary (`res.cloudinary.com/jagnani73/**`) + GitHub via `next/image` (`next.config.ts` remotePatterns). **Path alias:** `@/*` → `./src/*`.

## Adding/Updating Content
- Record rows: `src/content/record.ts` (counts recompute automatically).
- A new full case study: add `src/content/cases/<slug>.tsx` and register it in the `AUTHORED` map in `cases/index.ts` (position in that map sets its roster index). Set a plain-text `seoDescription` (~150 chars) — the JSX `deck` can't be used as a meta description. A bespoke `fig` is a new `FigKind` in `case-types.ts` + component registered in `components/case/case-fig.tsx`; **don't set `idx`/`rosterSize`** — they're derived. Any project in `data.ts` already has a baseline page (its `/record/[slug]` is auto-added to `sitemap.xml`).
- Home sections: `src/content/home.ts` (chapters / person / deck). Selected Work isn't edited here — it auto-tracks the latest case studies in `record.ts` via `lib/selected-work.ts`. Metric numbers/fallbacks: `src/content/metrics.ts`.
