---
phase: 01-foundation-design-system
plan: 03
subsystem: ui
tags: [astro, content-collections, comparison-table, detail-card, stat-pill, responsive, yaml]

requires:
  - phase: 01-foundation-design-system/01-01
    provides: Astro project, content collections, BaseLayout, Navbar, ONI theme colors
provides:
  - StatPill component for highlighted numeric values
  - ComparisonTable component with desktop grid and mobile cards
  - DetailCard component with native expand/collapse
  - Hatches proof-of-concept page at /ranching/hatches/
  - Proven YAML-to-page data pipeline
affects: [02-01-PLAN, 02-02-PLAN, all-content-pages]

tech-stack:
  added: []
  patterns: [content-collection-to-page-pipeline, responsive-table-to-cards, native-details-expand]

key-files:
  created:
    - src/components/StatPill.astro
    - src/components/ComparisonTable.astro
    - src/components/DetailCard.astro
    - src/pages/ranching/hatches.astro
  modified:
    - src/components/Navbar.astro
    - src/layouts/BaseLayout.astro
    - src/styles/global.css

key-decisions:
  - "Removed dark/light theme toggle per user feedback -- site is dark-mode-only"
  - "Used native HTML details/summary for expand/collapse (no JS needed)"
  - "ComparisonTable renders grid on desktop, stacked cards on mobile"

patterns-established:
  - "Data pages: getCollection query in frontmatter, pass entries to table + detail components"
  - "Stat display: StatPill for all numeric values with unit support"
  - "Responsive tables: hidden md:block grid for desktop, md:hidden cards for mobile"
  - "Dark-only theme: no toggle, no localStorage, html always has class=dark"

requirements-completed: [INFR-01, INFR-02, INFR-04, INFR-05, DSGN-03]

duration: 14min
completed: 2026-03-08
---

# Phase 1 Plan 3: Hatches PoC Summary

**Hatches proof-of-concept page with comparison table, expandable detail cards, and stat pills proving YAML-to-rendered-page pipeline**

## Performance

- **Duration:** 14 min
- **Started:** 2026-03-08T19:13:00Z
- **Completed:** 2026-03-08T19:27:44Z
- **Tasks:** 3
- **Files modified:** 7

## Accomplishments
- Three reusable data display components: StatPill, ComparisonTable, DetailCard
- Hatches page renders all 4 variants from YAML content collection with comparison overview and expandable detail cards
- Full data pipeline proven: YAML -> Zod validation -> Content Collection -> Astro page -> rendered HTML
- Removed dark/light theme toggle per user feedback; site is permanently dark-mode-only

## Task Commits

Each task was committed atomically:

1. **Task 1: Create StatPill, ComparisonTable, and DetailCard components** - `19906ea` (feat)
2. **Task 2: Create Hatches page wiring data to components** - `88dc63d` (feat)
3. **Task 3: Remove theme toggle (user feedback)** - `bf9940d` (fix)

## Files Created/Modified
- `src/components/StatPill.astro` - Inline stat value highlight with font-mono and unit support
- `src/components/ComparisonTable.astro` - Side-by-side grid on desktop, stacked cards on mobile
- `src/components/DetailCard.astro` - Expandable detail card using native details/summary element
- `src/pages/ranching/hatches.astro` - Hatches page querying content collection, rendering all 4 variants
- `src/components/Navbar.astro` - Removed ThemeToggle import and usage (desktop + mobile)
- `src/layouts/BaseLayout.astro` - Removed theme detection inline script
- `src/styles/global.css` - Removed light mode overrides and @custom-variant dark
- `src/components/ThemeToggle.astro` - Deleted

## Decisions Made
- Removed dark/light theme toggle entirely per user feedback during checkpoint verification. The site is now dark-mode-only with no localStorage theme persistence and no theme detection script. This simplifies the codebase and matches the ONI game aesthetic.
- Used native HTML details/summary for DetailCard expand/collapse -- accessible, no JS required

## Deviations from Plan

### User-Requested Changes

**1. Removed ThemeToggle per user feedback at Task 3 checkpoint**
- **Found during:** Task 3 (human-verify checkpoint)
- **Issue:** User reported dark/light toggle did not work and requested removal
- **Fix:** Deleted ThemeToggle.astro, removed all references from Navbar and BaseLayout, removed light mode CSS overrides, kept html class="dark" permanently
- **Files modified:** src/components/ThemeToggle.astro (deleted), src/components/Navbar.astro, src/layouts/BaseLayout.astro, src/styles/global.css
- **Verification:** Build succeeds with zero errors
- **Committed in:** bf9940d

---

**Total deviations:** 1 user-requested change
**Impact on plan:** Simplifies theming approach. No scope creep -- reduces complexity.

## Issues Encountered
None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Foundation complete: Astro project with navigation, dark theme, content collections, and proven data pipeline
- Reusable components (StatPill, ComparisonTable, DetailCard) ready for Phase 2 content pages
- Phase 2 can expand critter data and room reference using established patterns

## Self-Check: PASSED

- All 7 key files verified present on disk
- ThemeToggle.astro confirmed deleted
- All 3 task commits (19906ea, 88dc63d, bf9940d) verified in git log

---
*Phase: 01-foundation-design-system*
*Completed: 2026-03-08*
