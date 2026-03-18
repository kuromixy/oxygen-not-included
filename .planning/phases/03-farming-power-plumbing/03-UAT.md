---
status: complete
phase: 03-farming-power-plumbing
source: 03-01-SUMMARY.md, 03-02-SUMMARY.md
started: 2026-03-17T12:00:00Z
updated: 2026-03-18T00:00:00Z
---

## Tests

### 1. Farming Hub Comparison Table
expected: Navigate to /oni-fanpage/farming/. Comparison table with 7 crops, columns for growth time, calories/cycle, water needs, temperature range, and fertilizer.
result: PASS — All 7 crops present with correct columns.

### 2. Crop Page Links from Table
expected: Each crop name in the farming comparison table should link to its individual page.
result: PASS — All 7 crops have working links.

### 3. Individual Crop Page Layout
expected: Visit /oni-fanpage/farming/sleet-wheat/. Breadcrumb, heading, stat card with temperature range, growth time, calories/cycle, irrigation, fertilizer.
result: PASS — All fields present and correct.

### 4. Nullable Field Rendering
expected: Visit /oni-fanpage/farming/mealwood/. No "null" text for missing irrigation field.
result: PASS — Shows "None required" for fertilizer, "10 kg Dirt" for irrigation.

### 5. Power Hub Two Sections
expected: Navigate to /oni-fanpage/power-plumbing/. Generators section (4 items with links) and Batteries section (3 inline stat cards). Geysers moved to /geysers-volcanoes/.
result: PASS — Generators and Batteries sections correct. No geysers section (correctly relocated).

### 6. Generator Page Stats
expected: Visit /oni-fanpage/power-plumbing/coal-generator/. Wattage (600W), fuel type (Coal), consumption rate, heat output, breadcrumbs.
result: PASS — All fields present.

### 7. Battery Stats Inline on Hub
expected: On the power hub, Batteries section shows 3 stat cards inline (10kJ/20kJ/40kJ) with leak rate, heat output, dimensions.
result: PASS — All 3 battery cards rendered inline.

### 8. Geyser Page with Taming Info
expected: Visit /oni-fanpage/geysers-volcanoes/cool-steam-vent/. Output material, average output, temperature, biome, taming complexity badge, taming method.
result: PASS — All fields present including Medium (yellow) badge.

### 9. Taming Complexity Color Badges
expected: Different geyser pages show different colored badges: Low=green, Medium=yellow, High=red.
result: PASS — Verified: Cool Slush (green/Low), Cool Steam Vent (yellow/Medium), Hydrogen Vent (red/High).

### 10. Natural Gas Geyser Power Output
expected: Visit /oni-fanpage/geysers-volcanoes/natural-gas-geyser/. Shows "Net Power Output: 659W". Water geyser should NOT show this field.
result: PASS — Natural Gas shows 659W, Water Geyser correctly omits field.

## Summary

total: 10
passed: 10
issues: 0
pending: 0
skipped: 0

## Gaps

[none]
