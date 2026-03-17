---
phase: 03-farming-power-plumbing
plan: 01
subsystem: farming
tags: [content-collection, yaml-data, crop-pages, comparison-table]
dependency_graph:
  requires: []
  provides: [crops-collection, CropComparisonTable, CropStatCard, farming-hub, 7-crop-pages]
  affects: [src/content.config.ts, src/pages/farming/]
tech_stack:
  added: []
  patterns: [astro-content-collection, yaml-data-layer, static-comparison-table, critter-page-template]
key_files:
  created:
    - src/data/crops.yaml
    - src/components/CropComparisonTable.astro
    - src/components/CropStatCard.astro
    - src/pages/farming/mealwood.astro
    - src/pages/farming/bristle-blossom.astro
    - src/pages/farming/sleet-wheat.astro
    - src/pages/farming/dusk-cap.astro
    - src/pages/farming/pincha-pepper.astro
    - src/pages/farming/waterweed.astro
    - src/pages/farming/nosh-sprout.astro
  modified:
    - src/content.config.ts
    - src/pages/farming/index.astro
decisions:
  - "Dusk Cap growth_cycles stored as 7.5 (exact) per PLAN requirement -- kcal_per_cycle rounded to 613"
  - "Static comparison table row order (no JS sort): Mealwood, Bristle Blossom, Dusk Cap, Pincha Pepper, Sleet Wheat, Waterweed, Nosh Sprout"
  - "Null guard pattern for irrigation fields: conditional rendering prevents 'null' text"
metrics:
  duration: 3 min
  completed_date: "2026-03-17"
  tasks_completed: 3
  files_created: 10
  files_modified: 2
---

# Phase 03 Plan 01: Farming Domain Summary

**One-liner:** Crop data layer with Zod schema, 7-entry YAML, CropComparisonTable with desktop grid + mobile cards, and 7 individual crop pages using the established critter page pattern.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Crop data layer -- schema, YAML, and content collection | befd494 | src/content.config.ts, src/data/crops.yaml |
| 2 | Farming hub with comparison table and crop stat card component | 48295b0 | src/components/CropComparisonTable.astro, src/components/CropStatCard.astro, src/pages/farming/index.astro |
| 3 | Individual crop pages (7 pages following critter page template) | adc900a | src/pages/farming/mealwood.astro + 6 other crop pages |

## Verification

- `npm run build` completed with zero errors: 18 pages built (11 existing + 7 new crop pages)
- Farming hub at /farming/ renders comparison table with all 7 crops
- Each crop row in comparison table links to individual crop page via `/oni-fanpage/farming/{slug}/`
- Each crop page shows breadcrumb, heading, RanchBuildTabs, CropStatCard with all stats
- Nullable irrigation fields (e.g., Mealwood liquid) render cleanly without "null" text

## Deviations from Plan

None - plan executed exactly as written.

## Decisions Made

1. **Dusk Cap growth_cycles = 7.5** (exact wiki value) -- kcal_per_cycle stored as 613 (rounded from 613.3). Added note in YAML entry.
2. **Static comparison table order** -- No JS sorting. Static order chosen per research recommendation: early-game accessibility first.
3. **Null guard pattern** -- All irrigation nullable fields guarded with `{field && ...}` conditional rendering. TypeScript `string | null` types surface any missing guards at build time.

## Self-Check: PASSED

All created files verified on disk. All 3 task commits confirmed in git log (befd494, 48295b0, adc900a).
