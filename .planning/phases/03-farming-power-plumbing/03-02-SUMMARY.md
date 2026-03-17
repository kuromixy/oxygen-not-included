---
phase: 03-farming-power-plumbing
plan: 02
subsystem: power-plumbing
tags: [content-collection, yaml-data, generator-pages, geyser-pages, battery-reference]
dependency_graph:
  requires: [03-01]
  provides: [generators-collection, batteries-collection, geysers-collection, BuildStatCard, power-hub, 4-generator-pages, 6-geyser-pages]
  affects: [src/content.config.ts, src/pages/power-plumbing/]
tech_stack:
  added: []
  patterns: [astro-content-collection, yaml-data-layer, critter-page-template, dual-mode-stat-card]
key_files:
  created:
    - src/data/generators.yaml
    - src/data/batteries.yaml
    - src/data/geysers.yaml
    - src/components/BuildStatCard.astro
    - src/pages/power-plumbing/coal-generator.astro
    - src/pages/power-plumbing/natural-gas-generator.astro
    - src/pages/power-plumbing/hydrogen-generator.astro
    - src/pages/power-plumbing/petroleum-generator.astro
    - src/pages/power-plumbing/water-geyser.astro
    - src/pages/power-plumbing/cool-slush-geyser.astro
    - src/pages/power-plumbing/cool-steam-vent.astro
    - src/pages/power-plumbing/natural-gas-geyser.astro
    - src/pages/power-plumbing/hydrogen-vent.astro
    - src/pages/power-plumbing/salt-water-geyser.astro
  modified:
    - src/content.config.ts
    - src/pages/power-plumbing/index.astro
decisions:
  - "BuildStatCard uses dual mode (generator/geyser) with a single component -- avoids proliferating near-identical cards"
  - "Geyser avg_output labeled as long-period average in display and notes to prevent player confusion about dormant periods"
  - "Battery stats rendered inline on power hub (not a separate page) -- satisfies POWR-02 without needing a dedicated batteries page"
  - "Taming complexity displayed as colored badge (green/yellow/red) for instant visual scan"
metrics:
  duration: 5 min
  completed_date: "2026-03-17"
  tasks_completed: 3
  files_created: 14
  files_modified: 2
---

# Phase 03 Plan 02: Power and Plumbing Domain Summary

**One-liner:** Generator/battery/geyser data layer with Zod schemas, 3 YAML files, dual-mode BuildStatCard, power hub with inline battery stats, 4 generator setup pages, and 6 geyser taming pages.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Generator, battery, and geyser data layers | e967668 | src/content.config.ts, src/data/generators.yaml, src/data/batteries.yaml, src/data/geysers.yaml |
| 2 | BuildStatCard component, power hub page, and 4 generator pages | 7c93e1e | src/components/BuildStatCard.astro, src/pages/power-plumbing/index.astro + 4 generator pages |
| 3 | 6 geyser taming pages | 6528893 | src/pages/power-plumbing/water-geyser.astro + 5 other geyser pages |

## Verification

- `npm run build` completed with zero errors: 28 pages built (22 existing + 6 new geyser pages)
- Power hub at /power-plumbing/ shows three sections: Generators (4 links), Batteries (3 stat cards inline), Geysers (6 links)
- Each generator page shows wattage, fuel type, consumption, heat output, byproducts, dimensions
- Battery stats on hub show capacity, leak rate, heat output, dimensions for all 3 types
- Each geyser page shows output material, avg output (labeled as long-period average), temperature, biome, taming complexity, taming method
- Natural Gas Geyser page shows optional net power output field (659W)
- Nullable/optional fields (byproducts, power_output) guarded to prevent "null" rendering
- POWR-03 and POWR-04 intentionally not implemented (deferred per user decision in CONTEXT.md)

## Deviations from Plan

None - plan executed exactly as written.

## Decisions Made

1. **Dual-mode BuildStatCard** -- Single component handles both generator and geyser display modes via `mode` prop. Keeps component count low while supporting distinct field sets for each domain.
2. **Geyser avg_output labeled as average** -- Both the `avg_output` stat label ("Avg Output") and notes text explicitly note "long-period average" to prevent player confusion about dormant geyser behavior.
3. **Battery stats inline on hub** -- Satisfies POWR-02 without a separate batteries page. Three compact stat cards (capacity, leak rate, heat output, dimensions) on the power hub give players the quick reference they need.
4. **Taming complexity badge colors** -- Low=green, medium=yellow, high=red using Tailwind color utilities. Gives instant visual signal when scanning geyser pages.

## Self-Check: PASSED

All 14 created files verified on disk. All 3 task commits confirmed in git log (e967668, 7c93e1e, 6528893). Build produced 28 pages with zero errors.
