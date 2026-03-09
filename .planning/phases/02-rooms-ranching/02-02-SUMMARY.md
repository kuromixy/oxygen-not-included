---
phase: 02-rooms-ranching
plan: 02
subsystem: ui
tags: [astro, components, ranching, critters, calculator, tabs]

requires:
  - phase: 02-rooms-ranching
    provides: content.config.ts with critterSchema, hatches collection, per-family YAML pattern
provides:
  - RanchBuildTabs component with 4-tab layout and placeholder image slots
  - CritterVariantCard component with full variant stats display
  - CritterCalculator interactive component with variant selector and count input
  - Revised Hatches page using the new critter page template
affects: [02-03, critter-pages, ranching]

tech-stack:
  added: []
  patterns: [critter-page-template, css-js-tabs, client-side-calculator, data-attribute-serialization]

key-files:
  created:
    - src/components/RanchBuildTabs.astro
    - src/components/CritterVariantCard.astro
    - src/components/CritterCalculator.astro
  modified:
    - src/pages/ranching/hatches.astro

key-decisions:
  - "Used inline JS for tab switching (radio inputs + JS listeners) for reliable cross-browser behavior"
  - "Calculator serializes variant data to data-attributes for client-side interactivity without framework overhead"
  - "Removed ComparisonTable and DetailCard from Hatches page per locked user decision"

patterns-established:
  - "Critter page template: RanchBuildTabs + CritterVariantCard per variant + CritterCalculator"
  - "Calculator pattern: serialize props to data-attributes, vanilla JS for interactivity"
  - "Variant card: always-expanded card (no details/summary) with formatName helper for slug display"

requirements-completed: [RNCH-01, RNCH-02, RNCH-03, RNCH-04]

duration: 3min
completed: 2026-03-09
---

# Phase 02 Plan 02: Critter Page Template & Hatches Revision Summary

**Reusable critter page template with tab-based ranch layout, variant stat cards, and interactive resource calculator applied to Hatches page**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-09T19:32:55Z
- **Completed:** 2026-03-09T19:36:06Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Created RanchBuildTabs component with 4 switchable panels (Overview, Automation, Power, Plumbing) and placeholder image slots
- Created CritterVariantCard component showing all variant stats (diet, output, metabolism, temperature, capacity, grooming, DLC, notes) in an always-expanded card
- Created CritterCalculator with variant dropdown, critter count input (defaults to stable capacity), and real-time output calculation
- Revised Hatches page to use the new template, fixing the broken 'critters' collection reference to 'hatches'

## Task Commits

Each task was committed atomically:

1. **Task 1: Create RanchBuildTabs and CritterVariantCard** - `db67238` (feat)
2. **Task 2: Create CritterCalculator and revise Hatches page** - `4bc7d1b` (feat)

## Files Created/Modified
- `src/components/RanchBuildTabs.astro` - 4-tab ranch build layout with JS tab switching and placeholder panels
- `src/components/CritterVariantCard.astro` - Per-variant stat card with diet chips, output method display, StatPill stats
- `src/components/CritterCalculator.astro` - Interactive calculator with variant selector and per-cycle output computation
- `src/pages/ranching/hatches.astro` - Rewritten with new template (RanchBuildTabs + VariantCards + Calculator), removed ComparisonTable

## Decisions Made
- Used inline JS for tab switching rather than pure CSS-only approach, since Astro's output structure makes sibling selectors unreliable for radio-based tabs
- Calculator uses data-attribute serialization to pass variant data to client-side JS, keeping the Astro island-free approach
- Removed ComparisonTable and DetailCard imports from Hatches page per locked user decision to show variants directly

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Critter page template established and validated on Hatches page
- Plan 03 can replicate this template for remaining 5 critter families (dreckos, pacus, pips, slicksters, shine bugs)
- All 3 components are importable and reusable with different family data

---
*Phase: 02-rooms-ranching*
*Completed: 2026-03-09*
