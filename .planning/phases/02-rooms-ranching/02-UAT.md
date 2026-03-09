---
status: complete
phase: 02-rooms-ranching
source: [02-01-SUMMARY.md, 02-02-SUMMARY.md, 02-03-SUMMARY.md]
started: 2026-03-09T20:00:00Z
updated: 2026-03-09T20:15:00Z
---

## Current Test

[testing complete]

## Tests

### 1. Rooms Reference Page
expected: Navigate to /base-layouts/. Page shows 18 room types grouped by upgrade chains (Bathroom, Bedroom, Dining, Nature, then standalone rooms). Each room card displays dimensions via StatPill, required buildings as tags, bonus description, upgrade path links, and layout tips.
result: pass

### 2. Room Anchor Links
expected: On the rooms page, each room has an anchor ID. Clicking a link like /base-layouts/#washroom scrolls directly to that room card.
result: pass

### 3. Hatches Critter Page
expected: Navigate to /ranching/hatches/. Page shows variant cards for each Hatch variant with diet, output, metabolism, temperature, capacity, and grooming stats. RanchBuildTabs component shows 4 tabs at top. CritterCalculator appears on the page.
result: issue
reported: "Diet data incomplete - normal hatch shows 1m kcal per cycle when they eat Raw Mineral 140 kg/cycle and Food 0.1 to 1.8 kg/cycle. Missing multi-diet entries, consumed mass rates, and conversion ratios. E.g. normal hatch has 50% coal conversion rate, stone hatch has Diet Raw Mineral 140 kg/cycle Metal Ore 140 kg/cycle Excrete Coal 50% (mineral) 25% (metal) consumed mass. Calculator also missing this data."
severity: major

### 4. Tab Switching on Critter Page
expected: On any critter page (e.g., /ranching/hatches/), clicking the 4 tabs (Overview, Automation, Power, Plumbing) switches the visible panel content. Active tab is visually highlighted.
result: pass

### 5. Critter Calculator Interactivity
expected: On a critter page, the calculator shows a variant dropdown and critter count input (defaults to stable capacity). Selecting a different variant and changing the count updates the output calculation in real time.
result: pass

### 6. Ranching Hub Page
expected: Navigate to /ranching/. All 6 critter families (Hatches, Dreckos, Pacus, Pips, Slicksters, Shine Bugs) are listed with active links. No "Coming soon" placeholders remain.
result: pass

### 7. All Critter Pages Load
expected: Each critter page loads without errors: /ranching/dreckos/, /ranching/pacus/, /ranching/pips/, /ranching/slicksters/, /ranching/shine-bugs/. Each shows variant cards with stats, build tabs, and calculator matching the Hatches template pattern.
result: pass

## Summary

total: 7
passed: 6
issues: 1
pending: 0
skipped: 0

## Gaps

- truth: "Each critter variant shows accurate diet (inputs with kg/cycle rates), output (products with conversion ratios), and multi-diet entries"
  status: failed
  reason: "User reported: Diet data incomplete - missing per-variant consumed mass rates, multi-diet entries, and conversion ratios. E.g. normal hatch eats Raw Mineral 140 kg/cycle + Food 0.1-1.8 kg/cycle, excretes Coal at 50% consumed mass. Stone hatch has dual diet with different conversion rates. Calculator also missing this data."
  severity: major
  test: 3
  root_cause: ""
  artifacts: []
  missing: []
  debug_session: ""
