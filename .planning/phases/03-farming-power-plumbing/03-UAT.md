---
status: testing
phase: 03-farming-power-plumbing
source: 03-01-SUMMARY.md, 03-02-SUMMARY.md
started: 2026-03-17T12:00:00Z
updated: 2026-03-17T12:00:00Z
---

## Current Test

number: 1
name: Farming Hub Comparison Table
expected: |
  Navigate to /oni-fanpage/farming/. You should see a comparison table listing all 7 crops (Mealwood, Bristle Blossom, Dusk Cap, Pincha Pepper, Sleet Wheat, Waterweed, Nosh Sprout) with columns for growth time, calories/cycle, water needs, temperature range, and fertilizer. On mobile, rows should stack into cards instead of a wide table.
awaiting: user response

## Tests

### 1. Farming Hub Comparison Table
expected: Navigate to /oni-fanpage/farming/. You should see a comparison table listing all 7 crops with columns for growth time, calories/cycle, water needs, temperature range, and fertilizer. On mobile, rows should stack into cards instead of a wide table.
result: [pending]

### 2. Crop Page Links from Table
expected: Each crop name in the farming comparison table should be a clickable link. Clicking any crop (e.g., Mealwood) should navigate to its individual page at /oni-fanpage/farming/mealwood/.
result: [pending]

### 3. Individual Crop Page Layout
expected: Visit /oni-fanpage/farming/sleet-wheat/. You should see a breadcrumb (Home > Farming > Sleet Wheat), a heading, tab navigation (RanchBuildTabs), and a CropStatCard showing temperature range, growth time, calories/cycle, irrigation needs, and fertilizer requirements.
result: [pending]

### 4. Nullable Field Rendering
expected: Visit /oni-fanpage/farming/mealwood/. Mealwood has no liquid irrigation requirement. The irrigation/water field should either be absent or show "None" — it should NOT display the word "null".
result: [pending]

### 5. Power Hub Three Sections
expected: Navigate to /oni-fanpage/power-plumbing/. You should see three distinct sections: Generators (4 items with links), Batteries (3 inline stat cards showing capacity, leak rate, heat output), and Geysers (6 items with links).
result: [pending]

### 6. Generator Page Stats
expected: Visit /oni-fanpage/power-plumbing/coal-generator/. You should see wattage (600W), fuel type (Coal), consumption rate, heat output, byproducts, and dimensions displayed clearly with breadcrumb navigation.
result: [pending]

### 7. Battery Stats Inline on Hub
expected: On the power hub (/oni-fanpage/power-plumbing/), the Batteries section should show 3 stat cards inline (not as separate pages). Each card shows battery name, capacity (10kJ/20kJ/40kJ), leak rate, heat output, and dimensions.
result: [pending]

### 8. Geyser Page with Taming Info
expected: Visit /oni-fanpage/power-plumbing/cool-steam-vent/. You should see output material, average output (labeled as "long-period average" or similar), temperature, biome, taming complexity with a colored badge, and taming method description.
result: [pending]

### 9. Taming Complexity Color Badges
expected: Compare geyser pages: a low-complexity geyser should show a green badge, medium shows yellow, and high shows red. Check at least two different geysers to verify the color coding.
result: [pending]

### 10. Natural Gas Geyser Power Output
expected: Visit /oni-fanpage/power-plumbing/natural-gas-geyser/. This geyser should show an additional "Net Power Output" or similar field showing 659W, since it feeds a generator. Other geysers (e.g., water geyser) should NOT show this field.
result: [pending]

## Summary

total: 10
passed: 0
issues: 0
pending: 10
skipped: 0

## Gaps

[none yet]
