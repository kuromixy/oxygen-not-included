# Phase 2: Rooms & Ranching - Context

**Gathered:** 2026-03-08
**Status:** Ready for planning

<domain>
## Phase Boundary

Complete the room reference page and all remaining critter ranching pages. Rooms are a new content type; critter pages extend the Hatches proof-of-concept from Phase 1 with a revised layout. Users can look up any standard room type or critter family and immediately find dimensions, requirements, stats, and ranch build layouts.

</domain>

<decisions>
## Implementation Decisions

### Critter page layout (revised from Phase 1 PoC)
- Remove the ComparisonTable from the top of critter pages — not useful enough
- New page structure: Ranch Build Layout (top) → Variant cards with resource stats (below)
- Ranch build layout is shared across variants (same stable setup for a critter family)
- Ranch build layout uses a tab switcher for multiple views: [Overview] [Automation] [Power] [Plumbing]
- Placeholder image slots per tab view (filled with real diagrams later)

### Critter variant display & calculator
- Each variant gets its own card with per-variant placeholder image slot
- Default resource display shows stats at max stable capacity (capacity varies per critter type, not always 8)
- Include a simple calculator: user can input critter count → shows total input/output per cycle
- Calculator defaults to max capacity for that specific critter type
- Ranched stats only — no taming/trapping info (one-time action, not useful as reference)

### Critter families to add
- Dreckos, Pacus, Pips, Slicksters, Shine Bugs (5 families, each with variants)
- All follow the same revised template as Hatches (Hatches page should also be updated to match)
- Per-variant placeholder image slots for future variant sprites

### Room page structure
- Single page with all standard room types (every room the game recognizes with bonuses)
- No sub-pages or category grouping — one scrollable page, easy to Ctrl+F
- Each room entry shows: tile dimensions (min/max), required buildings list, room bonus effect, optimal layout tip text, and a placeholder slot for a visual tile layout diagram
- Show upgrade paths between rooms (Barracks → Bedroom, Latrine → Washroom, Mess Hall → Great Hall, etc.)

### Room data model
- YAML data file for rooms following established data patterns from Phase 1
- Include: dimensions, required_buildings, bonus, upgrade_from/upgrade_to, layout_tip, diagram_slot

### Claude's Discretion
- Exact room card/entry component design (can differ from critter DetailCard since rooms have different attributes)
- How to visually represent upgrade chains (arrows, badges, grouped entries, etc.)
- Tab switcher implementation for ranch build views (CSS-only or minimal JS)
- Calculator implementation approach (client-side JS)
- Whether to update the Hatches page in this phase or just build new pages with the revised template

</decisions>

<specifics>
## Specific Ideas

- Ranch builds are typically run at max capacity (96-tile stable, max critters for the type), so default stats should reflect that real-world usage
- Multiple ranch build views (automation, power, plumbing overlays) are important — players need to see how systems connect
- Max critter capacity varies per critter type — data must store this per-critter, not use a global constant

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- **DetailCard.astro**: Expandable details component, currently shows critter stats in 2-column grid. May need adaptation for ranch build section.
- **CategoryCard.astro**: Used on hub pages for linking to sub-pages. Reusable for room categories if needed.
- **StatPill.astro**: Value+unit display component. Reusable for room dimensions and critter stats.
- **Navbar.astro**: Full responsive nav, already links to all sections including Base Layouts.
- **BaseLayout.astro**: Master layout with dark theme, footer, max-width constraint.

### Established Patterns
- YAML data files in `src/data/`, one per critter family
- Zod schema validation via `content.config.ts`
- Deep space dark mode with ONI teal/orange accents
- Mobile: multi-column → single-column, tables → stacked cards
- System font stack, no custom web fonts

### Integration Points
- Ranching hub (`/ranching/index.astro`) has placeholder links for all 5 new critter families
- Base Layouts hub (`/base-layouts/index.astro`) exists as stub — needs room content
- Hatches page (`/ranching/hatches.astro`) is the existing PoC to potentially update

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-rooms-ranching*
*Context gathered: 2026-03-08*
