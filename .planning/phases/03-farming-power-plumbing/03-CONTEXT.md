# Phase 3: Farming, Power & Plumbing - Context

**Gathered:** 2026-03-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Crop reference pages, generator setup pages, and geyser taming pages. Users can look up any crop for key stats, compare crops side-by-side on the farming hub, and find generator/geyser build setups with the same build-tabs + stat-cards pattern used for critters. Raw pipe/pump stat tables are NOT in scope — power/plumbing focuses on practical build guides.

</domain>

<decisions>
## Implementation Decisions

### Farming page structure
- Individual pages per crop off the Farming hub (like critter families off the Ranching hub)
- Each crop page follows the critter page pattern: build tabs at top (overview/automation/power/plumbing views) + stat cards below
- Farming hub page includes a comparison table showing all crops side-by-side

### Crop comparison table
- Lives on the Farming hub/landing page for quick scanning
- Core stat columns: crop name, growth time, calories/cycle, water needs, temperature range, fertilizer requirement
- Each row links to the individual crop page for full detail

### Power & Plumbing pivot
- Skip raw stat lookup tables for generators, batteries, pipes, pumps
- Focus on generator setup pages (coal generator room, natural gas room, hydrogen room, etc.) — each as its own page
- Focus on geyser taming pages — each geyser type gets its own page (similar to critter families with stats and build setups)
- Plumbing/cooling loops and late-game builds (magma power, petroleum boiler, aquatuner loops) deferred to a future phase

### Build page pattern
- Generator and geyser pages reuse the critter page layout: RanchBuildTabs at top (overview/automation/power/plumbing views) with placeholder image slots, stat cards below
- Consistent with existing site patterns — proven layout

### Claude's Discretion
- Whether the crop comparison table is sortable (click column headers) or static order
- Hub page card layouts for farming and power/plumbing categories
- Exact YAML data schema for crops, generators, and geysers (follow established patterns)
- Which specific geyser types and generator setups to include (cover the most commonly referenced ones)

</decisions>

<specifics>
## Specific Ideas

- Geysers are conceptually similar to critter families — each type has its own stats and taming setup, making them a natural fit for the critter page pattern
- Power setups should cover different generator types as individual builds, not just raw wattage tables
- Plumbing is primarily about specific build patterns (infinite water storage, geyser taming) rather than pipe stat reference
- Late-game setups (steam turbine, magma power, petroleum boiler, aquatuner cooling loops) are explicitly deferred

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- **RanchBuildTabs.astro**: Tab switcher for build views (overview/automation/power/plumbing). Directly reusable for generator and geyser pages.
- **CritterVariantCard.astro**: Stat card component with variant display. Adaptable for crop variants, generator types, geyser types.
- **CritterCalculator.astro**: Interactive calculator with critter count → total I/O. Could be adapted for crop yield calculations if needed.
- **StatPill.astro**: Value+unit display pill. Reusable for all stat displays.
- **CategoryCard.astro**: Hub page linking cards. Reusable for farming and power/plumbing hubs.
- **RoomEntry.astro**: Single-page section entry component. Pattern reference for comparison table rows.

### Established Patterns
- YAML data files in `src/data/`, one per content domain
- Zod schema validation via `content.config.ts`
- Critter page layout: breadcrumb → heading → RanchBuildTabs → variant cards → calculator
- Hub pages use CategoryCard grid to link to sub-pages
- Deep space dark mode with ONI teal/orange accents

### Integration Points
- Farming hub (`/farming/index.astro`) exists as stub — needs crop comparison table + crop page links
- Power/Plumbing hub (`/power-plumbing/index.astro`) exists as stub — needs generator/geyser category links
- Navbar already links to Farming and Power/Plumbing sections

</code_context>

<deferred>
## Deferred Ideas

- Late-game power setups (steam turbine, magma power, petroleum boiler) — future phase
- Aquatuner cooling loops — future phase
- Raw pipe/pump stat reference tables (throughput, temperature limits) — future phase or may not be needed
- Plumbing builds (infinite water storage) — future phase
- Crop efficiency metrics (kcal per kg water, kcal per tile, plants per dupe) — could add later

</deferred>

---

*Phase: 03-farming-power-plumbing*
*Context gathered: 2026-03-09*
