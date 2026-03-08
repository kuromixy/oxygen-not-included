# Phase 1: Foundation & Design System - Context

**Gathered:** 2026-03-08
**Status:** Ready for planning

<domain>
## Phase Boundary

Set up the Astro project with structured data schemas, navigation shell, dark mode with toggle, GitHub Actions deploy pipeline, and one proof-of-concept critter page (Hatches). Users can visit the deployed site and see a styled, responsive page with ONI-themed navigation across four content categories.

</domain>

<decisions>
## Implementation Decisions

### Visual style & theme
- Subtle ONI nods — clean modern reference site with ONI colors (teal/orange) as accents, not full cartoony theming
- Deep space dark mode aesthetic — very dark backgrounds (#0a0a0f range) with ONI teal accents, high contrast for readability
- System font stack — no custom web fonts, fastest load
- Key stat numbers get highlighted inline treatment (accent color or background pill) so they pop out of surrounding text

### Navigation & layout
- Top navbar with category links (Ranching, Farming, Power/Plumbing, Base Layouts), collapses to hamburger on mobile
- Category landing pages with links to sub-pages (e.g., Ranching landing lists critter families, each links to detail page)
- Simple home/landing page with 4 category cards as entry points
- Mobile: stack vertically — tables become stacked cards, multi-column goes single-column

### Proof-of-concept page
- Hatches critter family as the PoC content domain (4 variants: Hatch, Sage, Stone, Smooth)
- Hybrid data presentation: overview comparison table at top for quick side-by-side, expandable detail cards below per variant
- Stats to display: diet, output product, calorie/resource rates, stable capacity, grooming requirements

### Data schema design
- YAML format for game data files
- One file per critter family (e.g., `hatches.yaml` with all variants inside)
- DLC tagging via tags array: `dlc: ["base"]` or `dlc: ["base", "spaced_out"]` or `dlc: ["frosty_planet"]` — supports multiple DLCs, future-proof
- Units stored in data alongside values (e.g., `temperature: { min: -10, max: 70, unit: "C" }`) — self-documenting
- No game version tracking in Phase 1 — add later when data stabilizes

### Claude's Discretion
- Whether to include placeholder image slots on the PoC page
- Whether data entries include optional notes/tips field alongside raw stats
- Dark mode color exact values within the deep space dark direction
- Loading states, error handling, exact spacing and typography details

</decisions>

<specifics>
## Specific Ideas

- DLC support must be multi-DLC aware from day one — ONI has Spaced Out!, Frosty Planet Pack, and potentially future DLCs. Not just a base/DLC boolean.
- Hybrid table+cards pattern: overview table for at-a-glance comparison (like a spreadsheet), detail cards for when you want to drill into one variant.

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- No existing codebase — greenfield project

### Established Patterns
- No patterns yet — this phase establishes them

### Integration Points
- GitHub Pages deployment target
- GitHub Actions for CI/CD pipeline

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation-design-system*
*Context gathered: 2026-03-08*
