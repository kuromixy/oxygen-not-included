# Phase 2: Rooms & Ranching - Research

**Researched:** 2026-03-09
**Domain:** ONI game data (rooms, critters), Astro content collections, static site component architecture
**Confidence:** HIGH

## Summary

Phase 2 adds two content types to the existing Astro static site: a rooms reference page and five new critter ranching pages (plus updating the existing Hatches page). The project already has a working foundation from Phase 1 -- Astro 5.17.1, Tailwind 4.2.1, YAML data files with Zod validation, and proven component patterns (DetailCard, StatPill, ComparisonTable).

The primary technical challenges are: (1) restructuring the content config to support multiple YAML data files (one per critter family) instead of the current single-file loader, (2) building a new critter page template that replaces the ComparisonTable-first layout with a Ranch Build Layout + Variant Cards structure with tab switching, (3) creating a rooms data model and page component, and (4) adding a simple client-side calculator for critter resource rates.

**Primary recommendation:** Use Astro's `glob()` loader (or multiple `file()` loaders) to handle per-family YAML files, build a reusable critter page template component, create a CSS-only tab switcher for ranch build views, and implement the calculator as a minimal Astro island with vanilla JS.

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions
- Remove ComparisonTable from top of critter pages -- not useful enough
- New critter page structure: Ranch Build Layout (top) -> Variant cards with resource stats (below)
- Ranch build layout is shared across variants (same stable setup for a critter family)
- Ranch build layout uses a tab switcher for multiple views: [Overview] [Automation] [Power] [Plumbing]
- Placeholder image slots per tab view (filled with real diagrams later)
- Each variant gets its own card with per-variant placeholder image slot
- Default resource display shows stats at max stable capacity (capacity varies per critter type)
- Include a simple calculator: user can input critter count -> shows total input/output per cycle
- Calculator defaults to max capacity for that specific critter type
- Ranched stats only -- no taming/trapping info
- Critter families to add: Dreckos, Pacus, Pips, Slicksters, Shine Bugs (5 families)
- All follow the same revised template as Hatches; Hatches page should also be updated
- Per-variant placeholder image slots for future variant sprites
- Room page: Single page with all standard room types, no sub-pages
- One scrollable page, easy to Ctrl+F
- Each room entry: tile dimensions (min/max), required buildings list, room bonus effect, optimal layout tip text, placeholder slot for visual tile layout diagram
- Show upgrade paths between rooms
- YAML data file for rooms following established patterns
- Room data includes: dimensions, required_buildings, bonus, upgrade_from/upgrade_to, layout_tip, diagram_slot

### Claude's Discretion
- Exact room card/entry component design
- How to visually represent upgrade chains (arrows, badges, grouped entries)
- Tab switcher implementation (CSS-only or minimal JS)
- Calculator implementation approach (client-side JS)
- Whether to update Hatches page in this phase or build new pages with revised template first

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope

</user_constraints>

<phase_requirements>

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| ROOM-01 | User can look up room types with min/max tile dimensions | Room data model with dimensions field; complete room data from wiki verified |
| ROOM-02 | User can see required buildings for each room type | Room data model includes required_buildings array; all 18 room types documented |
| ROOM-03 | User can see optimal room sizes and common layout patterns | Room data model includes layout_tip and diagram_slot; upgrade paths documented |
| RNCH-01 | User can look up critter types with diet, output product, and calorie/resource rates | Per-family YAML data files with diet, output, metabolism fields; all 6 families researched |
| RNCH-02 | User can see stable capacity limits per critter type | Stable capacity varies per critter (6-24 per stable); stored per-critter in data |
| RNCH-03 | User can see grooming station requirements and grooming cycle times | Grooming data field exists in schema; all critters use Grooming Station |
| RNCH-04 | User can see critter variants with differences highlighted | Variant card component with per-variant stats; shared family page layout |

</phase_requirements>

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 5.17.1 | Static site generator | Already in use, content collections for YAML |
| Tailwind CSS | 4.2.1 | Utility-first styling | Already in use, dark theme tokens defined |

### No New Dependencies Needed
This phase requires NO new npm packages. The tab switcher and calculator use vanilla JS (Astro islands or inline scripts). All data handling uses Astro's built-in content collections with Zod validation.

## Architecture Patterns

### Recommended Project Structure
```
src/
  data/
    hatches.yaml          # Updated with revised schema
    dreckos.yaml           # New
    pacus.yaml             # New
    pips.yaml              # New
    slicksters.yaml        # New
    shine-bugs.yaml        # New
    rooms.yaml             # New
  components/
    StatPill.astro         # Existing -- reuse
    DetailCard.astro       # Existing -- keep for backward compat
    CritterVariantCard.astro  # New -- per-variant card with image slot
    RanchBuildTabs.astro   # New -- tab switcher for ranch build views
    RoomEntry.astro        # New -- single room type display
    RoomUpgradeChain.astro # New -- visual upgrade path indicator
    CritterCalculator.astro # New -- Astro island with client JS
  pages/
    ranching/
      hatches.astro        # Updated to new layout
      dreckos.astro        # New
      pacus.astro          # New
      pips.astro           # New
      slicksters.astro     # New
      shine-bugs.astro     # New
    base-layouts/
      index.astro          # Updated from stub to rooms page
  content.config.ts        # Updated with rooms collection + multi-file critter loading
```

### Pattern 1: Multiple YAML Files in Content Collections

The current `content.config.ts` uses `file('src/data/hatches.yaml')` for a single critter collection. For Phase 2, there are two clean approaches:

**Option A: Separate collections per family** (Recommended)
```typescript
// content.config.ts
import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const critterSchema = z.object({
  id: z.string(),
  name: z.string(),
  family: z.string(),            // e.g., "Hatch", "Drecko"
  dlc: z.array(z.string()),
  diet: z.array(z.string()),
  output: z.object({
    product: z.string(),
    rate: unitValue,
  }),
  calories: z.object({
    metabolism: unitValue,
  }),
  stable_capacity: z.number(),
  temperature: z.object({
    min: unitValue,
    max: unitValue,
  }),
  grooming: z.object({
    station: z.string(),
    cycle_time: unitValue,
  }),
  image_slot: z.boolean().default(true),
  notes: z.string().optional(),
});

const hatches = defineCollection({ loader: file('src/data/hatches.yaml'), schema: critterSchema });
const dreckos = defineCollection({ loader: file('src/data/dreckos.yaml'), schema: critterSchema });
// ... etc for each family

const roomSchema = z.object({
  id: z.string(),
  name: z.string(),
  dimensions: z.object({ min: z.number(), max: z.number() }),
  required_buildings: z.array(z.string()),
  bonus: z.string(),
  upgrade_from: z.string().nullable(),
  upgrade_to: z.string().nullable(),
  layout_tip: z.string(),
  diagram_slot: z.boolean().default(true),
  dlc: z.array(z.string()),
});

const rooms = defineCollection({ loader: file('src/data/rooms.yaml'), schema: roomSchema });
```

**Option B: Use glob loader for critters directory**
```typescript
// Requires one YAML file per variant or restructuring
// Less natural for the "array of variants per file" pattern
// Not recommended since file() already works well
```

**Recommendation:** Option A -- separate `file()` loaders per family. Each page imports its own collection. This matches the existing pattern and keeps data files cleanly separated.

### Pattern 2: Critter Page Template (Revised Layout)

Each critter page follows the same structure. Rather than a shared Astro layout component (which adds complexity), each page file follows the same template pattern:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import RanchBuildTabs from '../../components/RanchBuildTabs.astro';
import CritterVariantCard from '../../components/CritterVariantCard.astro';
import CritterCalculator from '../../components/CritterCalculator.astro';
import { getCollection } from 'astro:content';

const variants = await getCollection('hatches');
const familyName = 'Hatches';
const familyDescription = 'The Hatch family eats minerals and produces coal or refined metals.';
---

<BaseLayout title={`${familyName} -- ONI Reference`}>
  <!-- Breadcrumb -->
  <!-- Page heading -->
  <!-- Ranch Build Layout with tabs -->
  <RanchBuildTabs family={familyName} />
  <!-- Variant Cards -->
  {variants.map(v => <CritterVariantCard entry={v} />)}
  <!-- Calculator -->
  <CritterCalculator variants={variants} />
</BaseLayout>
```

### Pattern 3: CSS-Only Tab Switcher

Use radio buttons + CSS `:checked` selector for zero-JS tab switching:

```astro
---
// RanchBuildTabs.astro
interface Props { family: string; }
const { family } = Astro.props;
const tabId = family.toLowerCase().replace(/\s/g, '-');
const tabs = ['Overview', 'Automation', 'Power', 'Plumbing'];
---

<div class="ranch-build-tabs">
  {tabs.map((tab, i) => (
    <>
      <input
        type="radio"
        name={`tab-${tabId}`}
        id={`tab-${tabId}-${i}`}
        class="hidden peer"
        checked={i === 0}
      />
      <label for={`tab-${tabId}-${i}`} class="tab-label">{tab}</label>
    </>
  ))}
  {tabs.map((tab, i) => (
    <div class="tab-panel" id={`panel-${tabId}-${i}`}>
      <!-- Placeholder image slot -->
      <div class="aspect-video bg-oni-bg-elevated rounded-lg flex items-center justify-center">
        <span class="text-oni-text-muted">{tab} diagram placeholder</span>
      </div>
    </div>
  ))}
</div>
```

**Note:** CSS-only tabs using `:checked` + sibling selectors work but can be fragile with complex DOM. A minimal JS approach (event listener on tab clicks, toggle class) is equally valid and may be cleaner. Claude's discretion per CONTEXT.md.

### Pattern 4: Calculator as Inline Script

The calculator is simple enough to avoid framework overhead. Use an inline `<script>` tag in the Astro component:

```astro
---
// CritterCalculator.astro
interface Props {
  variants: Array<{data: {name: string; stable_capacity: number; output: {product: string; rate: {value: number; unit: string}}}}>;
}
const { variants } = Astro.props;
---

<div class="calculator" data-variants={JSON.stringify(variants.map(v => v.data))}>
  <label for="critter-count">Critter count:</label>
  <input type="number" id="critter-count" min="1" max="50" />
  <div id="calc-results"></div>
</div>

<script>
  // Vanilla JS: read data-variants, listen to input changes, update results
</script>
```

### Anti-Patterns to Avoid
- **Shared layout component with too many props:** Each critter page is simple enough to follow the template pattern directly. A `CritterPageLayout.astro` that takes 10 props is harder to maintain than 6 straightforward page files.
- **Overcomplicating the calculator:** This is a simple multiply operation (count * rate). No need for state management libraries or complex UI.
- **Using client:load for static content:** The tab switcher and variant cards are static HTML. Only the calculator input needs interactivity.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Data validation | Custom type checking | Zod schemas in content.config.ts | Already established pattern, catches errors at build time |
| Responsive grid | Custom media queries | Tailwind responsive prefixes (md:, sm:) | Already used throughout project |
| Expand/collapse | Custom JS accordion | HTML `<details>/<summary>` | Already proven in DetailCard.astro |

## Common Pitfalls

### Pitfall 1: Content Collection ID Conflicts
**What goes wrong:** If two YAML files in the same collection have entries with the same `id`, Astro will silently overwrite one.
**Why it happens:** Using a single collection for all critters with `glob()` loader.
**How to avoid:** Use separate collections per family (hatches, dreckos, etc.) so IDs only need to be unique within a family.
**Warning signs:** Missing variants on rendered pages.

### Pitfall 2: Hardcoding Stable Capacity as 8
**What goes wrong:** Not all critters have capacity 8. Shine Bugs have 16, Cuddle Pips have 24, Pacus have ~10.
**Why it happens:** The Hatches PoC used 8 for all variants, creating a mental model that it's always 8.
**How to avoid:** Always read `stable_capacity` from the data file. The calculator must use per-variant capacity as default.
**Warning signs:** Calculator showing wrong defaults.

### Pitfall 3: CSS Tab Switcher Sibling Selector Breakage
**What goes wrong:** CSS `:checked ~ .tab-panel` stops working if DOM structure changes.
**Why it happens:** Sibling selectors require specific DOM ordering.
**How to avoid:** Keep tab inputs and panels as direct siblings in a flat container, or use a minimal JS approach instead.
**Warning signs:** Tabs don't switch on click.

### Pitfall 4: Forgetting Base Path in Links
**What goes wrong:** Links to new critter pages 404 on GitHub Pages.
**Why it happens:** GitHub Pages serves from `/oni-fanpage/` base path. Forgetting this prefix breaks navigation.
**How to avoid:** Always use `/oni-fanpage/ranching/dreckos/` format, matching existing pattern from Phase 1.
**Warning signs:** 404 errors on deployed site.

### Pitfall 5: Inconsistent Data Schema Between Critter Families
**What goes wrong:** Dreckos produce via shearing (not direct output), Shine Bugs produce light/decor (not materials), Pacus use Fish Feeder (not Grooming Station). A single rigid schema may not fit all.
**Why it happens:** Each critter family has unique mechanics.
**How to avoid:** Design the schema to be flexible enough to handle variations. Use optional fields for special mechanics (shearing, light output). The `output` field can represent the primary ranching product regardless of mechanic. Add a `special_notes` or `mechanic` field for unique behaviors.
**Warning signs:** Forced to put misleading data into fields that don't match semantics.

## Code Examples

### YAML Data File: Rooms
```yaml
# src/data/rooms.yaml
- id: latrine
  name: Latrine
  dimensions:
    min: 12
    max: 64
  required_buildings:
    - Outhouse
    - Wash Basin
  bonus: "+1 Morale"
  upgrade_from: null
  upgrade_to: washroom
  layout_tip: "A simple 4x3 room works. Place wash basin near the exit so dupes wash on the way out."
  diagram_slot: true
  dlc:
    - base

- id: washroom
  name: Washroom
  dimensions:
    min: 12
    max: 64
  required_buildings:
    - Lavatory
    - Sink
  bonus: "+2 Morale"
  upgrade_from: latrine
  upgrade_to: null
  layout_tip: "Same footprint as Latrine. Requires plumbing -- plan water/sewage lines early."
  diagram_slot: true
  dlc:
    - base
```

### YAML Data File: Critter Family (Dreckos Example)
```yaml
# src/data/dreckos.yaml
- id: drecko
  name: Drecko
  family: Drecko
  dlc:
    - base
  diet:
    - balm_lily
    - pincha_pepperplant
    - mealwood
  output:
    product: reed_fiber
    rate:
      value: 0.25
      unit: kg/cycle
  calories:
    metabolism:
      value: 2000
      unit: kcal/cycle
  stable_capacity: 8
  temperature:
    min:
      value: -30
      unit: C
    max:
      value: 100
      unit: C
  grooming:
    station: grooming_station
    cycle_time:
      value: 1
      unit: cycle
  notes: "Requires hydrogen atmosphere for scale growth. Shear scales for Reed Fiber. 3 plants per 4 Dreckos."

- id: glossy_drecko
  name: Glossy Drecko
  family: Drecko
  dlc:
    - base
  diet:
    - mealwood
    - bristle_blossom
  output:
    product: plastic
    rate:
      value: 50
      unit: kg/cycle
  calories:
    metabolism:
      value: 2000
      unit: kcal/cycle
  stable_capacity: 8
  temperature:
    min:
      value: -30
      unit: C
    max:
      value: 100
      unit: C
  grooming:
    station: grooming_station
    cycle_time:
      value: 1
      unit: cycle
  notes: "Requires hydrogen atmosphere. Shear for Plastic. 1 plant per 1 Glossy Drecko."
```

### Room Entry Component Pattern
```astro
---
// RoomEntry.astro
import StatPill from './StatPill.astro';

interface Props {
  room: {
    data: {
      name: string;
      dimensions: { min: number; max: number };
      required_buildings: string[];
      bonus: string;
      upgrade_to: string | null;
      upgrade_from: string | null;
      layout_tip: string;
      diagram_slot: boolean;
    };
  };
}

const { room } = Astro.props;
const d = room.data;
---

<div id={d.name.toLowerCase().replace(/\s/g, '-')} class="border border-oni-bg-elevated rounded-xl p-5 mb-4">
  <div class="flex items-start justify-between mb-3">
    <h3 class="text-xl font-bold text-oni-text-primary">{d.name}</h3>
    <span class="text-sm px-2 py-1 rounded bg-oni-bg-elevated text-oni-teal">{d.bonus}</span>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <h4 class="text-xs text-oni-text-muted uppercase tracking-wider mb-1">Dimensions</h4>
      <p class="text-oni-text-secondary">
        <StatPill value={d.dimensions.min} unit="tiles" /> to <StatPill value={d.dimensions.max} unit="tiles" />
      </p>
    </div>
    <div>
      <h4 class="text-xs text-oni-text-muted uppercase tracking-wider mb-1">Required Buildings</h4>
      <div class="flex flex-wrap gap-1.5">
        {d.required_buildings.map(b => (
          <span class="text-xs px-2 py-1 rounded-md bg-oni-bg-elevated text-oni-text-secondary">{b}</span>
        ))}
      </div>
    </div>
  </div>

  {d.layout_tip && (
    <p class="mt-3 text-sm text-oni-text-secondary italic">{d.layout_tip}</p>
  )}

  {d.diagram_slot && (
    <div class="mt-3 aspect-video bg-oni-bg-elevated rounded-lg flex items-center justify-center">
      <span class="text-oni-text-muted text-sm">Layout diagram placeholder</span>
    </div>
  )}
</div>
```

## Game Data Reference

### Complete Room Types (18 rooms)

| Room | Min | Max | Required Buildings | Bonus | Upgrades To |
|------|-----|-----|--------------------|-------|-------------|
| Latrine | 12 | 64 | Outhouse, Wash Basin | +1 Morale | Washroom |
| Washroom | 12 | 64 | Lavatory, Sink | +2 Morale | -- |
| Barracks | 12 | 64 | Bed (any) | +1 Morale | Luxury Barracks |
| Luxury Barracks | 12 | 64 | Comfy Bed, Decor item | +2 Morale | Private Bedroom |
| Private Bedroom | 24 | 64 | 1 Comfy Bed, 2 Decor items, Backwall | +3 Morale | -- |
| Mess Hall | 12 | 64 | Mess Table | +3 Morale | Great Hall |
| Great Hall | 32 | 120 | Mess Table, 20+ Decor, Recreation building | +4 Morale | Banquet Hall |
| Banquet Hall | 32 | 120 | Communal Table, Decor, Recreation, Ornament | +6 Morale | -- |
| Kitchen | 12 | 96 | Spice Grinder, Cooking Station, Refrigerator | Enables spices | -- |
| Massage Clinic | 12 | 64 | Massage Table, Decor item | +100% Massage efficiency | -- |
| Hospital | 12 | 96 | Medical equipment, Toilet, Mess Table | Disease containment | -- |
| Power Plant | 12 | 96 | Heavy-Watt Generator, 2 Power buildings | +50% power output | -- |
| Greenhouse | 12 | 96 | Farm Station | Enables fertilizer | -- |
| Stable | 12 | 96 | Ranching building (Grooming Station) | Enables grooming | -- |
| Laboratory | 32 | 120 | 2 Science buildings | +10% efficiency | -- |
| Recreation Room | 12 | 96 | Recreation building, Decor item | Downtime benefits | -- |
| Park | 12 | 64 | Park Sign, 2 Wild plants | +3 Morale | Nature Reserve |
| Nature Reserve | 32 | 120 | Park Sign, 4 Wild plants | +6 Morale | -- |

**Upgrade Chains:**
- Latrine -> Washroom
- Barracks -> Luxury Barracks -> Private Bedroom
- Mess Hall -> Great Hall -> Banquet Hall
- Park -> Nature Reserve

### Critter Families Summary (for YAML data accuracy)

| Family | Variants | Stable Cap | Grooming | Key Output |
|--------|----------|-----------|----------|------------|
| Hatch | Hatch, Sage, Stone, Smooth | 8 | Grooming Station | Coal, Refined Metal |
| Drecko | Drecko, Glossy | 8 | Grooming Station | Reed Fiber, Plastic |
| Pacu | Pacu, Tropical, Gulp Fish | ~10 | Fish Feeder (not Grooming Station) | Pacu Fillet (on death) |
| Pip | Pip, Cuddle Pip | 8 (Pip), 24 (Cuddle) | Grooming Station | Dirt |
| Slickster | Slickster, Molten, Longhair | 8 | Grooming Station | Crude Oil, Petroleum, Decor |
| Shine Bug | Shine Bug, Sun, Royal, Coral, Azure, Abyss, Radiant | 16 | Grooming Station | Light, Decor |

**Special cases to handle in data model:**
- **Pacus**: Use Fish Feeder, not Grooming Station. Also live in liquid, not standard stables.
- **Shine Bugs**: Output is light/decor, not a material product. 7 variants (most of any family).
- **Dreckos**: Output via shearing, requires hydrogen atmosphere. Rate depends on scale growth.
- **Slicksters**: Longhair variant produces no material -- decor only.
- **Cuddle Pips**: Unique space requirement (4 tiles vs 12), capacity 24 vs 8.

### Schema Flexibility for Special Cases

The critter schema should handle these variations:
```typescript
// Extended schema to handle edge cases
const critterSchema = z.object({
  id: z.string(),
  name: z.string(),
  family: z.string(),
  dlc: z.array(z.string()),
  diet: z.array(z.string()),
  output: z.object({
    product: z.string(),       // "crude_oil", "light", "reed_fiber", "none"
    rate: unitValue,
    method: z.string().optional(), // "excretion", "shearing", "ambient", "on_death"
  }),
  calories: z.object({
    metabolism: unitValue,
  }),
  stable_capacity: z.number(),
  space_per_critter: z.number().optional(), // tiles per critter (default 12, but Shine Bugs=6, Cuddle Pips=4)
  temperature: z.object({
    min: unitValue,
    max: unitValue,
  }),
  grooming: z.object({
    station: z.string(),       // "grooming_station" or "fish_feeder"
    cycle_time: unitValue,
  }),
  image_slot: z.boolean().default(true),
  notes: z.string().optional(),
});
```

## State of the Art

| Old Approach (Phase 1) | Current Approach (Phase 2) | Impact |
|-------------------------|---------------------------|--------|
| Single `file()` loader for one YAML | Multiple `file()` loaders, one per family | Each page imports its own collection |
| ComparisonTable at top of critter pages | Ranch Build Layout (tabs) at top | Better matches player workflow |
| Static stats display only | Calculator with critter count input | Interactive reference value |
| No rooms content | Full rooms reference page | Completes ROOM-01/02/03 requirements |

## Open Questions

1. **Drecko/Slickster output rates are hard to pin down exactly**
   - What we know: Dreckos produce via shearing on a multi-cycle timer (not kg/cycle directly). Slicksters consume CO2 and output 50% mass as oil.
   - What's unclear: Exact per-cycle equivalent rates for shearing-based output vary by hydrogen exposure time.
   - Recommendation: Use approximate per-cycle rates from wiki data with a note. The data is for quick reference, not simulation accuracy.

2. **Pacu ranching is mechanically different**
   - What we know: Pacus live in liquid, use Fish Feeder not Grooming Station, and their main output is meat (on death).
   - What's unclear: Whether to show "Pacu Fillet" as output (since it requires the critter to die) or just show the polluted dirt excretion.
   - Recommendation: Show both -- primary output (Pacu Fillet, on death) and continuous output (Polluted Dirt). The notes field can explain the death mechanic.

3. **Hatches page update timing**
   - What we know: Hatches page exists with ComparisonTable layout; needs revision to match new template.
   - What's unclear: Whether to update Hatches first (to establish the template) or build a new family first.
   - Recommendation: Update Hatches first as part of establishing the new template. This validates the new layout before replicating it 5 times.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Astro build (static site -- build success = pages render) |
| Config file | astro.config.mjs |
| Quick run command | `npm run build` |
| Full suite command | `npm run build && npx astro preview` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| ROOM-01 | Room dimensions visible | smoke (build) | `npm run build` | Wave 0 (rooms.yaml + page) |
| ROOM-02 | Required buildings listed | smoke (build) | `npm run build` | Wave 0 |
| ROOM-03 | Optimal layouts shown | smoke (build) | `npm run build` | Wave 0 |
| RNCH-01 | Critter diet/output/rates | smoke (build) | `npm run build` | Wave 0 (new YAML files) |
| RNCH-02 | Stable capacity per critter | smoke (build) | `npm run build` | Wave 0 |
| RNCH-03 | Grooming station requirements | smoke (build) | `npm run build` | Wave 0 |
| RNCH-04 | Variant differences shown | smoke (build) | `npm run build` | Wave 0 |

### Sampling Rate
- **Per task commit:** `npm run build` (validates all pages render)
- **Per wave merge:** `npm run build && npx astro preview` (visual spot-check)
- **Phase gate:** Full build green + manual page review

### Wave 0 Gaps
- [ ] `src/data/rooms.yaml` -- room data file (covers ROOM-01/02/03)
- [ ] `src/data/dreckos.yaml` -- critter data (covers RNCH-01/02/03/04)
- [ ] `src/data/pacus.yaml` -- critter data
- [ ] `src/data/pips.yaml` -- critter data
- [ ] `src/data/slicksters.yaml` -- critter data
- [ ] `src/data/shine-bugs.yaml` -- critter data
- [ ] `src/content.config.ts` update -- register new collections

## Sources

### Primary (HIGH confidence)
- [oxygennotincluded.wiki.gg/wiki/Room_Overlay](https://oxygennotincluded.wiki.gg/wiki/Room_Overlay) -- Complete room types, dimensions, requirements, bonuses
- [oxygennotincluded.wiki.gg/wiki/Critter](https://oxygennotincluded.wiki.gg/wiki/Critter) -- Critter families, variants, stable capacities
- [oxygennotincluded.wiki.gg/wiki/Drecko](https://oxygennotincluded.wiki.gg/wiki/Drecko) -- Drecko/Glossy diet, output, temperature
- [oxygennotincluded.wiki.gg/wiki/Slickster](https://oxygennotincluded.wiki.gg/wiki/Slickster) -- Slickster variants, CO2 consumption, oil output
- [oxygennotincluded.wiki.gg/wiki/Pip](https://oxygennotincluded.wiki.gg/wiki/Pip) -- Pip/Cuddle Pip details
- [oxygennotincluded.wiki.gg/wiki/Pacu](https://oxygennotincluded.wiki.gg/wiki/Pacu) -- Pacu variants, fish feeder mechanic
- [oxygennotincluded.wiki.gg/wiki/Shine_Bug](https://oxygennotincluded.wiki.gg/wiki/Shine_Bug) -- All 7 Shine Bug variants
- Existing codebase -- content.config.ts, hatches.yaml, component patterns

### Secondary (MEDIUM confidence)
- [docs.astro.build/en/guides/content-collections/](https://docs.astro.build/en/guides/content-collections/) -- Astro content collections, file() and glob() loaders

### Tertiary (LOW confidence)
- Exact output rates for shearing-based critters (Dreckos) -- varies by hydrogen exposure time, approximated from wiki

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- no new dependencies, extending established patterns
- Architecture: HIGH -- follows Phase 1 patterns with well-understood Astro features
- Game data (rooms): HIGH -- verified against official wiki, complete room list
- Game data (critters): MEDIUM -- most data verified, some output rates are approximations
- Pitfalls: HIGH -- based on actual codebase analysis and Astro content collection behavior

**Research date:** 2026-03-09
**Valid until:** 2026-04-09 (stable -- game data and Astro APIs unlikely to change)
