---
phase: 01-foundation-design-system
plan: 01
subsystem: infra
tags: [astro, tailwindcss, tailwind-v4, yaml, zod, github-pages, dark-mode]

requires:
  - phase: none
    provides: greenfield project
provides:
  - Astro project scaffold with Tailwind v4
  - Content collection schema with Zod validation
  - Hatches YAML data (4 variants with DLC tags and units)
  - ONI-themed color system (dark/light mode)
  - BaseLayout with FOUC-free dark mode
  - Navbar with 4 category links and mobile hamburger
  - ThemeToggle with localStorage persistence
  - GitHub Actions deploy workflow for GitHub Pages
affects: [01-02-PLAN, 01-03-PLAN, all-future-plans]

tech-stack:
  added: [astro@5, tailwindcss@4, "@tailwindcss/vite"]
  patterns: [content-collections-with-yaml, class-based-dark-mode, inline-script-before-css]

key-files:
  created:
    - astro.config.mjs
    - src/content.config.ts
    - src/data/hatches.yaml
    - src/styles/global.css
    - src/layouts/BaseLayout.astro
    - src/components/Navbar.astro
    - src/components/ThemeToggle.astro
    - .github/workflows/deploy.yml
  modified:
    - package.json
    - src/pages/index.astro

key-decisions:
  - "Used class-based selectors (querySelectorAll) for ThemeToggle to support multiple instances (desktop + mobile nav)"
  - "CSS import in frontmatter rather than style tag for Astro global CSS pattern"
  - "Light mode overrides via html:not(.dark) selector in global.css"

patterns-established:
  - "Content collections: YAML data files in src/data/, schema in src/content.config.ts with Zod"
  - "Color tokens: ONI theme colors as CSS custom properties via @theme block"
  - "Dark mode: class-based with inline script in head before CSS to prevent FOUC"
  - "Layout: BaseLayout.astro wraps all pages with Navbar, main content slot, footer"
  - "Navigation: base path /oni-fanpage/ prefix on all internal links for GitHub Pages"

requirements-completed: [INFR-01, INFR-02, INFR-03, INFR-04, DSGN-01, DSGN-03]

duration: 4min
completed: 2026-03-08
---

# Phase 1 Plan 1: Scaffold Summary

**Astro 5 project with Tailwind v4, YAML content collections, ONI dark/light theme, navigation shell, and GitHub Pages deploy pipeline**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-08T18:39:40Z
- **Completed:** 2026-03-08T18:43:45Z
- **Tasks:** 2
- **Files modified:** 14

## Accomplishments
- Astro project scaffolded with Tailwind v4 via @tailwindcss/vite plugin, builds to static HTML
- Content collection schema validates 4 hatch variants from YAML with DLC tags and unit values
- ONI-themed color system with deep space dark mode default and light mode overrides
- BaseLayout, Navbar (desktop + mobile), and ThemeToggle components with no FOUC

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold Astro project with Tailwind v4, content schema, and data** - `b8126f2` (feat)
2. **Task 2: Create BaseLayout, Navbar, and ThemeToggle components** - `24c93b1` (feat)

## Files Created/Modified
- `package.json` - Project dependencies: astro, tailwindcss, @tailwindcss/vite
- `astro.config.mjs` - Astro config with Tailwind vite plugin, GitHub Pages site/base
- `tsconfig.json` - TypeScript strict config extending Astro
- `src/content.config.ts` - Content collection schema with Zod validation for critter data
- `src/data/hatches.yaml` - Hatches critter family data with 4 variants
- `src/styles/global.css` - Tailwind import, @theme with ONI colors, @custom-variant dark
- `src/layouts/BaseLayout.astro` - HTML shell with dark mode inline script, nav, global CSS
- `src/components/Navbar.astro` - Top navbar with 4 category links, hamburger on mobile
- `src/components/ThemeToggle.astro` - Dark/light toggle with sun/moon icons, localStorage
- `src/pages/index.astro` - Placeholder index page using BaseLayout
- `.github/workflows/deploy.yml` - GitHub Actions workflow for GitHub Pages deployment

## Decisions Made
- Used class-based selectors (querySelectorAll) for ThemeToggle instead of IDs, since the component is rendered twice (desktop nav + mobile menu) and duplicate IDs would break functionality
- CSS imported in Astro frontmatter for proper global style injection
- Light mode overrides use html:not(.dark) selector in global.css for clean dark-first approach

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed duplicate ThemeToggle ID conflict**
- **Found during:** Task 2 (ThemeToggle component)
- **Issue:** ThemeToggle used id="theme-toggle" and id="icon-sun"/id="icon-moon", but component is rendered twice (desktop + mobile nav), creating duplicate IDs
- **Fix:** Changed to class-based selectors (.theme-toggle, .icon-sun, .icon-moon) with querySelectorAll
- **Files modified:** src/components/ThemeToggle.astro
- **Verification:** Build succeeds, both toggle instances functional
- **Committed in:** 24c93b1 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug fix)
**Impact on plan:** Essential fix for correct behavior with multiple toggle instances. No scope creep.

## Issues Encountered
- Astro CLI `npm create astro` does not work in non-empty directories -- scaffolded in temp directory and copied files over

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Foundation complete: Astro builds, Tailwind renders, content collections validate, dark mode works
- Ready for Plan 02: Home page with category cards and category landing pages
- Ready for Plan 03: Hatches proof-of-concept page using content collection data

## Self-Check: PASSED

- All 11 created files verified present on disk
- Both task commits (b8126f2, 24c93b1) verified in git log

---
*Phase: 01-foundation-design-system*
*Completed: 2026-03-08*
