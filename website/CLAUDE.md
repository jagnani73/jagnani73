# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start development server
pnpm lint       # Lint + type-check (use this to verify changes, not pnpm build)
pnpm build      # Production build (only when explicitly needed)
```

All commands should be run from the `website/` directory.

## Architecture

This is a Next.js 16 (App Router) portfolio site using React 19, TypeScript (strict), and Tailwind CSS v4.

**Key architectural decisions:**
- **No backend/database** — all content is hardcoded in a single file: `src/utils/constants/data.ts` (65KB). This is the source of truth for all experiences, projects, hackathons, certifications, resumes, and research papers.
- **Static generation** — `/projects/[slug]` uses `generateStaticParams()` + `generateMetadata()` for SSG and per-page OG tags.
- **No state management** — React `useState`/`useEffect` only in `Navbar` for scroll detection and mobile menu.

**Directory layout:**
```
src/
├── app/                  # Next.js App Router pages and API routes
│   ├── layout.tsx        # Root layout: metadata, GA, Navbar, Footer
│   ├── page.tsx          # Home page (composes all home/ section components)
│   ├── experiences/      # Full experiences listing
│   ├── projects/         # Projects listing + [slug] dynamic route
│   └── api/              # resume + cover-letter redirect routes
├── components/
│   ├── home/             # One component per home page section
│   ├── experiences/      # Experiences page component
│   ├── projects/         # Projects page component
│   └── shared/           # Navbar, Footer, Experience/Project cards, icon wrappers
└── utils/
    ├── constants/
    │   ├── data.ts           # ALL portfolio content lives here
    │   ├── home-constants.tsx # STACK array with tech logos
    │   └── shared-constants.tsx # ROUTES, enums for stack/link/social names
    ├── types/                # TypeScript interfaces per domain
    ├── icons/                # SVG icon components
    └── logos/                # Tech stack logo components
```

**Styling:** Tailwind v4 with CSS-based config. Custom theme colors (`eerie-black`, `jet`, `cultured`, `steel-blue`) are defined in `src/app/globals.css` via `@theme`.

**Images:** Hosted on Cloudinary (`jagnani73` account) + GitHub. `next.config.ts` has remote patterns configured for both.

**Path alias:** `@/*` maps to `./src/*`.

## Adding/Updating Content

All content changes go in `src/utils/constants/data.ts`. The home page slices from these arrays:
- Featured experiences: first 3
- Featured projects: first 4
