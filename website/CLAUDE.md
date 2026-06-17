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
- `/record` — **The Record**: one filterable timeline of everything (73 entries), with the year-gutter constellation canvas + per-year "consensus" confirm animation. (Route lives at `src/app/record/`; the client lives at `components/record/record-client.tsx`.)
- `/record/[slug]` — **Case study** template. `generateStaticParams()` prerenders the **authored** cases (the record rows that carry a `case` detail); per-case `generateMetadata()`. Non-case projects have **no** detail page — they live in the record as plain timeline rows with external links.
- `/api/resume`, `/api/cover-letter` — redirect routes (unchanged).
- `next.config.ts` `redirects()`: `/projects`, `/projects/:slug`, `/experiences` → `/record` (301). The old projects/experiences pages were removed. (The route was renamed from `/work` → `/record`; a record entry's `slug` maps to `/record/[slug]`.)

### Theme & tokens
- **`next-themes`** (`components/shared/theme-provider.tsx`): `attribute="data-theme"`, `storageKey="jagnani73-mode"`, `defaultTheme="system"` + `enableSystem` (follows the OS scheme; `light` paper is the fallback), themes `dark` (cyan) / `light` (paper), no-flash.
- Tokens are CSS custom properties in `src/app/globals.css`, defined per `[data-theme]` and mapped into Tailwind v4 via `@theme inline` → use utilities `bg-bg text-tx border-rule text-pri text-sig text-acc bg-pri-a18` etc. **Do not add unlayered element rules** (e.g. a bare `a {}`) — they override `@layer utilities` and break `text-*` on links. Keyboard focus shows a `:focus-visible` ring (`--sig`); the bare `outline: none` is paired with a `:focus-visible` override, never left standalone.
- Canvas/JS color access: `utils/constants/theme-tokens.ts` (typed token objects) + `hooks/use-theme-tokens.ts` (replaces the prototype's `window.PAGE_THEME`).
- Single breakpoint **1201px** via `@theme { --breakpoint-rail }` → `rail:` (≥1201 desktop) / `max-rail:` (≤1200 compact) variants. Prefer CSS variants over JS; `hooks/use-is-mobile.ts` only where JS needs the boolean.
- Fonts (`app/layout.tsx`, `next/font`): **Anton** (`font-display`), **Instrument Serif** (`font-serif`), **JetBrains Mono** (`font-mono`), **DM Sans** (`font-sans`).

### Content (`src/content/`) — typed, build-static
- `record.ts` — the single source: the 73-entry record + `getRecordCounts()` (built, never hardcoded). Case rows carry a `case: CaseDetail` (imported from `cases/*.tsx`), so **this module pulls all case bodies** — keep it **server-only**.
- `record-lib.ts` — **client-safe** record helpers/config (`FILTERS`, `kindColor`, `sequenceYear`, `yearHash`, `isCase`, `rowKey`), imports no case content. The interactive timeline imports from here; the heavy `RECORD` reaches the client only as case-stripped rows passed by `record/page.tsx`.
- `home.ts` — chapters / person / deck (Selected Work is **derived**, not stored here).
- `cases/*.tsx` — each authored case's `CaseDetail` (the `/record/[slug]` content), imported into its `record.ts` row. `cases/index.ts` derives the registry (`getCase`/`getAllCaseSlugs`/`getCaseTitle`/`getNextSlug`/`getCaseImage`/`orderedSections`) from `RECORD` — there is **no `AUTHORED` map**.
- `metrics.ts` — hardcoded metric fallbacks.

### Types (`src/utils/types/`)
**Every** type lives here, one file per domain — `case.types.ts` (`CaseDetail` = the **authored** detail; `ResolvedCase` = what `getCase` returns, with the row-derived fields required; `CaseFigure` = the `fig` pair `{ component, alt }`; `Fig`; the `CaseSections` object + `CaseSection` render union), `record.types.ts` (`RecordEntry` — including `case?: CaseDetail` — `Kind`/`FilterId`), `theme.types.ts` (`ThemeTokens`/`ThemeName`), `home.types.ts` (`Chapter`/`SelectedWorkItem`), `metrics.types.ts` (`Metrics`), `component.types.ts` (the `*Props` + `MarkMode`), `fig.types.ts` (`AgNode`/`NodeKind`/`FigAccent`/`JournalColor` — figs import the color keys `as C`). Modules/components import their shapes from here — **define new types in `utils/types/`, never inline.** Sole exception: `MarqueeProps` stays in `fig-marquee.tsx` (vendored verbatim from react-easy-marquee).

### Selected Work (home `02`) — derived, never curated
`utils/functions/selected-work.ts` `getSelectedWork(n=6)` returns the **latest N case studies, newest-first**, walking `RECORD` (internal `isCase` entries, already chronological). The thumbnail is the case's **first img plate** (`getCaseImage` in `cases/index.ts`); cases with **no img plate are skipped** so every row shows a real thumbnail (e.g. `solana-ml-dsa-44` has only code plates → it falls through and the next case down is pulled in). Per row: title/tag come from the case registry (`getCase`) — `tag` = the first `·`-segment of the case `badge`, lowercased, **except** `agent-sdk`/`goldrush-kit` whose tag is a live metric (`METRIC_BY_SLUG`). Adding an image-backed case to the record surfaces it here automatically.

### Case studies — rows of the record
**The record is the single source.** An authored case is a `record.ts` row with a `case: CaseDetail` attached; `CaseDetail` holds only the detail (`badge`, `deck`, `fig` (a `CaseFigure` = `{ component, alt }`), `sections`, `seoDescription`, optional `displayTitle`/`docName`) — **not** `slug`, `title`, or roster position, which come from the row (the authored type no longer includes them, so it's compiler-enforced). `getCase(slug)` merges them and returns a **`ResolvedCase`**: the detail with `title` (`= case.displayTitle ?? row.title`), the derived `docTitle` (`` `${docName ?? title} — Case Study` ``), `slug`, and `idx`/`rosterSize` all required — **never authored**. The **roster is record order**: `cases/index.ts` filters `RECORD` to rows with a `case`, in array order → that drives `idx`, `rosterSize`, and `getNextSlug` (footer cycling, wraps). Set `displayTitle` only when the masthead name differs from the timeline title (e.g. row "Solana ML-DSA-44 fork" → `displayTitle: "ML-DSA-44"`; "BharatBeacon" → "Bharat Beacon"); the H1 is uppercased via CSS. Each case carries its **fig.1 directly** — `fig: { component: FigDao, alt }` (the component imported in the case file, paired with its screen-reader label as a `CaseFigure`) — so the masthead renders `c.fig`; there is **no fig registry or `FigKind` enum**. **`sections` is an object keyed by type** (`split`/`arch`/`cards`/`stats`/`plates`, each at most once) — **insertion order = render order**; `orderedSections` tags each entry into the `CaseSection` render union. `SLUG_ALIASES` maps `ai-agent-sdk` → `agent-sdk` so the legacy URL still resolves. **Every non-case project is just a timeline row** (external `url`, no `case`).

### Live metrics (ISR)
`utils/functions/fetch-metrics.ts` `getMetrics()` fetches GitHub stars/forks + npm version count at build (`revalidate: 86400`), falling back to `content/metrics.ts` — **Server Components only**, never client-side, never renders a blank/spinner.

### SEO
`utils/functions/seo.ts` is the single source of truth: `SITE_URL`/`SITE_NAME`/`SITE_DESCRIPTION` (imported by `layout.tsx` — don't redeclare) + JSON-LD builders (`personLd`, `websiteLd`, `caseLd`, `collectionPageLd`, `breadcrumbLd`). `components/shared/json-ld.tsx` renders blobs into `<script type="application/ld+json">` (escapes `<` → `<`). **Where JSON-LD lives:** home (`page.tsx`) → `Person` + `WebSite`; `/record` → `CollectionPage` + `BreadcrumbList`; each case → `CreativeWork` + `BreadcrumbList` (refs the Person by `@id`). `app/sitemap.ts` + `app/robots.ts` are file-convention routes (sitemap walks `getAllCaseSlugs()`; robots disallows `/api/`). Root `layout.tsx` sets a title **template** `"%s — Yashvardhan Jagnani"` and `alternates.canonical` — so page-level `title`s are the **bare** page name (no manual suffix) and each page sets its own `canonical`. **Case descriptions:** authored cases' `deck` is JSX, so each authored case carries a plain-text `seoDescription` (~150 chars); `generateMetadata` prefers it, then a string `deck`, then a generic fallback. Add `seoDescription` whenever you add an authored case. **OG images:** there are **no per-case OG overrides** — the file-convention `app/opengraph-image.tsx` (one branded card) is applied by Next to every route. Its contour backdrop is generated from the shared `utils/functions/contours.ts` and its `STATUS` line from `site.ts`, so the card stays in lockstep with the live masthead; remote fonts are fetched with an `res.ok` check that logs CDN failures. The case `CreativeWork` JSON-LD still gets an `image`, derived from the case's first img plate (`getCaseImage`).

### Canvas islands (`src/components/canvas/`, all `"use client"`)
`band-canvas.tsx` (home contours), `time-constellation.tsx` (`/record` mesh), `figs/{fig-score,fig-agent-graph,fig-wager}.tsx` (case fig.1). All gate on `hooks/use-reduced-motion.ts` (static end-state) and pause when offscreen (`IntersectionObserver` / `hooks/use-in-view.ts`). The two true `<canvas>` islands (`band-canvas`, `time-constellation`) share their whole lifecycle — element/DPR/resize/rAF/offscreen-pause/teardown — via **`hooks/use-canvas-scene.ts`** (each supplies a `setup → draw(frame)`); the marching-squares contour geometry comes from **`utils/functions/contours.ts`** (shared with the OG card so the two can't drift), and small DPR/`rgba` helpers from `utils/functions/canvas.ts`. Year-confirm lives in `components/record/{year-mark,consensus-block}.tsx`. Lightbox in `components/case/plate-viewer.tsx` (focus-trapped `role="dialog"`). Shared fig "card" surface: `figs/fig-style.ts` (`figPanel(t)`); each case passes its `fig` (a `CaseFigure` — component + `alt`) directly via the case data, and `case-fig.tsx` wraps it `role="img"` with that label.

### Component layout (`src/components/`)
`shared/` (theme-provider, site-rail, page-shell, page-footer, back-to-top), `home/`, `record/`, `case/`, `canvas/`.

### Site constants & redirects
Cross-cutting constants live in **`src/utils/constants/site.ts`** (types in `src/utils/types/`): `EMAIL`, `TWITTER_HANDLE`, `GITHUB_URL`/`LINKEDIN_URL`/`TWITTER_URL` (profile links — the single source for the person section + JSON-LD `sameAs` + the Twitter meta), `RESUME`/`COVER_LETTER` (the `/api/resume` & `/api/cover-letter` redirect targets), `STATUS`/`COPYRIGHT` (the masthead-bar status line + footer copyright — shared across home/record/case and the OG card), and `ASTRO_FACTS` (the masthead "anton line"). There is **no `data.ts`** — the old derived-project machinery (`constants/data.ts` `projects`, `lib/project-to-case.ts`, `ProjectType`, `STACK_NAMES`/`LINKS_NAMES`, `stripMarkdown`) was deleted when projects stopped generating baseline case pages.

**Images:** Cloudinary (`res.cloudinary.com/jagnani73/**`) + GitHub via `next/image` (`next.config.ts` remotePatterns). **Path alias:** `@/*` → `./src/*`.

## Adding/Updating Content
- Record rows: `src/content/record.ts` (counts recompute automatically).
- A new full case study (**2 edits**): (1) add `src/content/cases/<slug>.tsx` exporting a `CaseDetail`, and (2) add its `record.ts` row with `slug` + `case: <import>`. The row's position in `RECORD` sets the roster index; the row owns `title`/`meta`. Set a plain-text `seoDescription` (~150 chars) — the JSX `deck` can't be used as a meta description. Set `displayTitle` only if the masthead name differs from the row title; `docName` only if the SEO name differs again. Author `sections` as a keyed object (`split`/`arch`/`cards`/`stats`/`plates`, in display order); every plate needs a `cap`. For a fig.1, write the component in `components/canvas/figs/`, then `import` it into the case file and set `fig: { component, alt }` (the `CaseFigure` pair — the component + its screen-reader label). **Don't put `slug`/`title`/`idx`/`rosterSize`/`docTitle`/`next` on the detail** — they come from the row or are derived in `getCase`/`getNextSlug` (the authored `CaseDetail` type omits them, so TypeScript enforces this). Non-case projects get **no** detail page — add them as rows with an external `url` and no `case` (only authored cases appear in `sitemap.xml`).
- Home sections: `src/content/home.ts` (chapters / person / deck). Selected Work isn't edited here — it auto-tracks the latest case studies in `record.ts` via `utils/functions/selected-work.ts`. Metric numbers/fallbacks: `src/content/metrics.ts`.
