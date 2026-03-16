# Phase 3: Farming, Power & Plumbing - Research

**Researched:** 2026-03-16
**Domain:** ONI game data (crops, generators, geysers), Astro content collections, static site component reuse
**Confidence:** HIGH

## Summary

Phase 3 extends the established Astro static site with two new content domains: Farming and Power/Plumbing. The technical approach is pure reuse — all patterns, components, and tooling already exist from Phase 2. No new dependencies are needed. The work is primarily game data modeling and page construction.

The farming section adds individual crop pages under a Farming hub, where the hub itself includes a crop comparison table. The power/plumbing section adds generator setup pages and geyser taming pages — both using the existing RanchBuildTabs + CritterVariantCard layout pattern. Per the CONTEXT.md decisions, raw stat tables for pipes/pumps are explicitly out of scope; the focus is on practical build guides.

The primary technical challenge is designing the YAML data schemas for crops, generators, and geysers that fit the existing `unitValue` schema pattern, and deciding on the crop comparison table's sortability. All rendering follows established conventions.

**Primary recommendation:** Reuse RanchBuildTabs, CritterVariantCard (adapted), StatPill, CategoryCard, and ComparisonTable patterns. Define three new content collections: `crops`, `generators`, and `geysers`. The crop hub comparison table can be static (no JS sort) unless Claude judges it worthwhile given the column count.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Individual pages per crop off the Farming hub (like critter families off the Ranching hub)
- Each crop page follows the critter page pattern: build tabs at top (overview/automation/power/plumbing views) + stat cards below
- Farming hub page includes a comparison table showing all crops side-by-side
- Crop comparison table lives on the Farming hub/landing page for quick scanning
- Crop comparison table core stat columns: crop name, growth time, calories/cycle, water needs, temperature range, fertilizer requirement
- Each row in the comparison table links to the individual crop page for full detail
- Skip raw stat lookup tables for generators, batteries, pipes, pumps
- Focus on generator setup pages (coal generator room, natural gas room, hydrogen room, etc.) — each as its own page
- Focus on geyser taming pages — each geyser type gets its own page (similar to critter families with stats and build setups)
- Plumbing/cooling loops and late-game builds (magma power, petroleum boiler, aquatuner loops) deferred to a future phase
- Generator and geyser pages reuse the critter page layout: RanchBuildTabs at top (overview/automation/power/plumbing views) with placeholder image slots, stat cards below

### Claude's Discretion
- Whether the crop comparison table is sortable (click column headers) or static order
- Hub page card layouts for farming and power/plumbing categories
- Exact YAML data schema for crops, generators, and geysers (follow established patterns)
- Which specific geyser types and generator setups to include (cover the most commonly referenced ones)

### Deferred Ideas (OUT OF SCOPE)
- Late-game power setups (steam turbine, magma power, petroleum boiler) — future phase
- Aquatuner cooling loops — future phase
- Raw pipe/pump stat reference tables (throughput, temperature limits) — future phase or may not be needed
- Plumbing builds (infinite water storage) — future phase
- Crop efficiency metrics (kcal per kg water, kcal per tile, plants per dupe) — could add later
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FARM-01 | User can look up crops with temperature range, irrigation needs, and fertilizer requirements | Crop YAML schema with temperature min/max, irrigation (type + amount), fertilizer (type + amount); 7 core crops documented with verified data |
| FARM-02 | User can see growth time and calorie/resource output per crop | Growth time in cycles and kcal per harvest verified from wiki; kcal/cycle derived as kcal_per_harvest / growth_cycles |
| FARM-03 | User can compare crops side-by-side to choose optimal food source | Crop comparison table on farming hub; columns: name, growth time, kcal/cycle, irrigation, temp range, fertilizer; rows link to crop pages |
| POWR-01 | User can look up generators with wattage output, fuel type, and fuel consumption rate | Generator YAML schema with watts, fuel_type, consumption; 4 main generators documented with verified wiki stats |
| POWR-02 | User can see battery types with capacity and heat output | Battery data: Battery (10kJ, 1.25kDTU/s), Smart Battery (20kJ, 0.5kDTU/s), Jumbo Battery (40kJ, 1.25kDTU/s); included in generator collection or separate |
| POWR-03 | User can look up pipe types with throughput and temperature limits | Per CONTEXT.md decisions: raw pipe tables are OUT OF SCOPE for this phase; deferred to future phase |
| POWR-04 | User can see pump types with flow rates and power consumption | Per CONTEXT.md decisions: raw pump tables are OUT OF SCOPE for this phase; deferred to future phase |
</phase_requirements>

**Note on POWR-03 and POWR-04:** The user explicitly decided in CONTEXT.md to skip raw stat lookup tables for pipes and pumps in this phase. The power/plumbing section focuses on generator setup pages and geyser taming pages instead. The planner must reflect this scope pivot: POWR-03 and POWR-04 are satisfied at the "data layer" level by the decision NOT to implement them now (they remain pending in REQUIREMENTS.md and will be addressed in a later phase).

---

## Standard Stack

### Core (Already Installed — No New Dependencies)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 5.17.1 | Static site generator | Already in use; content collections handle YAML data |
| Tailwind CSS | 4.2.1 | Utility-first styling | Already in use; design tokens defined in global.css |
| Zod | Bundled with Astro | Schema validation | Already used in content.config.ts for all collections |

### No New Dependencies
Phase 3 requires zero new npm packages. All interactivity (comparison table sort if chosen, tab switching) uses vanilla JS matching established patterns.

## Architecture Patterns

### Recommended Project Structure

```
src/
  data/
    crops.yaml              # New — all farmable food crops
    generators.yaml         # New — generator types with stats
    geysers.yaml            # New — geyser types with stats and taming notes
  components/
    CropComparisonTable.astro   # New — hub-level crop comparison table
    CropStatCard.astro          # New — per-crop stat display (adapts CritterVariantCard)
    BuildStatCard.astro         # New — generator/geyser stat display (adapts CritterVariantCard)
    [All existing components]   # Reused without modification
  pages/
    farming/
      index.astro             # Updated stub → hub with comparison table + crop links
      mealwood.astro          # New crop page
      bristle-blossom.astro   # New crop page
      sleet-wheat.astro       # New crop page
      dusk-cap.astro          # New crop page
      pincha-pepper.astro     # New crop page
      waterweed.astro         # New crop page (DLC-marked)
      nosh-sprout.astro       # New crop page (DLC-marked)
    power-plumbing/
      index.astro             # Updated stub → hub with generator/geyser category cards
      coal-generator.astro    # New generator setup page
      natural-gas-room.astro  # New generator setup page
      hydrogen-room.astro     # New generator setup page
      water-geyser.astro      # New geyser taming page
      natural-gas-geyser.astro # New geyser taming page
      cool-slush-geyser.astro # New geyser taming page
      cool-steam-vent.astro   # New geyser taming page
  content.config.ts           # Updated — add crops, generators, geysers collections
```

### Pattern 1: Crop Data Schema (New Collection)

Crops map to the critter pattern but replace grooming with irrigation/fertilizer fields:

```typescript
// In content.config.ts — add to existing schema definitions
const cropSchema = z.object({
  id: z.string(),
  name: z.string(),
  dlc: z.array(z.string()),
  growth_cycles: z.number(),             // cycles to harvest (domestic)
  kcal_per_harvest: z.number(),          // raw kcal per harvest
  kcal_per_cycle: z.number(),            // kcal_per_harvest / growth_cycles (derived, store for table)
  temperature: z.object({
    min: unitValue,                       // reuse existing unitValue (value + unit)
    max: unitValue,
  }),
  irrigation: z.object({
    liquid: z.string().nullable(),        // "water", "polluted_water", "salt_water", null
    liquid_amount: unitValue.nullable(),  // e.g. {value: 20, unit: "kg"}
    solid: z.string().nullable(),         // "dirt", "slime", "phosphorite", null
    solid_amount: unitValue.nullable(),   // e.g. {value: 10, unit: "kg"}
  }),
  fertilizer: z.string().nullable(),     // "micronutrient" or null (most crops accept any)
  light_required: z.number().nullable(), // lux (null = no requirement, 0 = darkness required)
  notes: z.string().optional(),
  image_slot: z.boolean().default(true),
});

const crops = defineCollection({
  loader: file('src/data/crops.yaml'),
  schema: cropSchema,
});
```

**Key design choice:** Store `kcal_per_cycle` explicitly in YAML (not computed at render time). This makes the comparison table column trivial to render without computation logic in the component.

### Pattern 2: Generator Data Schema (New Collection)

Generators are simpler than crops — mostly flat key stats:

```typescript
const generatorSchema = z.object({
  id: z.string(),
  name: z.string(),
  dlc: z.array(z.string()),
  watts: z.number(),                     // power output e.g. 600
  fuel_type: z.string(),                 // "coal", "natural_gas", "hydrogen", "petroleum"
  consumption: unitValue,                // e.g. {value: 1000, unit: "g/s"}
  heat_output: unitValue,                // e.g. {value: 9, unit: "kDTU/s"}
  byproducts: z.array(z.object({
    product: z.string(),
    rate: unitValue,
    temp: unitValue.optional(),
  })).optional(),
  dimensions: z.string(),                // e.g. "3×3"
  notes: z.string().optional(),
  image_slot: z.boolean().default(true),
});

// Battery schema — can share file or be separate
const batterySchema = z.object({
  id: z.string(),
  name: z.string(),
  dlc: z.array(z.string()),
  capacity: unitValue,                   // e.g. {value: 10, unit: "kJ"}
  leak_rate: unitValue,                  // e.g. {value: 1, unit: "kJ/cycle"}
  heat_output: unitValue,                // e.g. {value: 1.25, unit: "kDTU/s"}
  dimensions: z.string(),
  notes: z.string().optional(),
});
```

### Pattern 3: Geyser Data Schema (New Collection)

Geysers mirror the critter family pattern (each type = one "family" with stats and taming setup):

```typescript
const geyserSchema = z.object({
  id: z.string(),
  name: z.string(),
  dlc: z.array(z.string()),
  output_material: z.string(),           // e.g. "water", "natural_gas", "polluted_water"
  avg_output: unitValue,                 // e.g. {value: 1800, unit: "kg/cycle"} (average across active/dormant)
  output_temp: unitValue,                // e.g. {value: 95, unit: "C"}
  biome: z.string(),                     // e.g. "swamp", "ocean", "random"
  taming_complexity: z.enum(['low', 'medium', 'high']),
  taming_method: z.string(),             // brief description of typical containment
  power_output: unitValue.optional(),    // watts net if used for power (Natural Gas Geyser)
  notes: z.string().optional(),
  image_slot: z.boolean().default(true),
});
```

### Pattern 4: Crop Comparison Table

The existing `ComparisonTable.astro` handles critters. A new `CropComparisonTable.astro` follows the same pattern (desktop grid, mobile stacked cards) but with crop-specific columns:

```astro
---
// CropComparisonTable.astro
// Desktop columns: Name | Growth (cycles) | kcal/cycle | Irrigation | Temp Range | Fertilizer | [link →]
// Each row links to /oni-fanpage/farming/{crop-id}/
---
```

**Sortability decision (Claude's discretion):** Use static order (most accessible early-game crops first: Mealwood, Bristle Blossom, Dusk Cap, Pincha Pepper, Sleet Wheat, Waterweed, Nosh Sprout). Sortable tables require client-side JS; with only 7 rows the value is low. The user can scan 7 rows without sorting. Recommend static.

### Pattern 5: Crop and Build Pages

Crop pages follow the critter page template exactly:

```
Breadcrumb → Heading → RanchBuildTabs (reused directly) → CropStatCard(s) → [no calculator needed]
```

Generator and geyser pages also follow critter page template:

```
Breadcrumb → Heading → RanchBuildTabs (reused directly) → BuildStatCard → Notes section
```

### Anti-Patterns to Avoid

- **Computing kcal/cycle at render time:** Store it in YAML. The comparison table needs it; computing kcal_per_harvest / growth_cycles in Astro frontmatter is fine but storing it explicitly prevents subtle errors.
- **One YAML file per crop:** Unlike critters (7 variants per family), crops are standalone. A single `crops.yaml` array is cleaner than 7 separate files. Follow the rooms.yaml pattern, not the hatches.yaml pattern.
- **One YAML file per generator/geyser:** Same reasoning — use `generators.yaml` and `geysers.yaml` as single-file arrays. The `file()` loader handles arrays.
- **Re-implementing RanchBuildTabs:** The component already handles the tab-switching with inline JS. Pass a distinct `family` prop per page to namespace radio inputs. Use "crops", "coal-generator", "water-geyser" etc. as the family identifier.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Stat display pills | Custom span styling | StatPill.astro (existing) | Already styled with oni-stat-pill-bg/text tokens |
| Tab switching | New tab component | RanchBuildTabs.astro (existing) | Already handles radio + JS pattern; just pass different `family` prop |
| Variant cards | New card component | Adapt CritterVariantCard.astro pattern | Same grid layout, different fields |
| Hub navigation cards | New card | CategoryCard.astro (existing) | Already styled with hover:border-oni-teal |
| Comparison table | New table | Adapt ComparisonTable.astro pattern | Same desktop-grid / mobile-stacked pattern |
| Data validation | Custom checks | Zod schema in content.config.ts | Build-time validation, already established |

**Key insight:** Phase 3 is 80% data entry and 20% new component work. The component patterns are all established. The primary effort is: (1) writing correct game data YAML files, (2) creating thin new components that adapt existing ones, (3) building the page files.

## Common Pitfalls

### Pitfall 1: Forgetting Base Path in New Page Links
**What goes wrong:** Crop and build pages 404 on GitHub Pages because links omit `/oni-fanpage/` prefix.
**Why it happens:** New pages in new subdirectories — easy to forget the base path convention.
**How to avoid:** All hrefs must use `/oni-fanpage/farming/mealwood/` and `/oni-fanpage/power-plumbing/coal-generator/` format. Verify by checking existing critter page links.
**Warning signs:** 404 on deployed site, works locally.

### Pitfall 2: RanchBuildTabs `family` Prop Collisions
**What goes wrong:** If two pages on the same rendered HTML use the same `family` string, radio inputs share a name, so clicking tabs on one page affects the other.
**Why it happens:** The `family` prop scopes the radio button `name` attribute. Crops and critters both present on a page (unlikely, but possible if navigation renders both) could conflict.
**How to avoid:** Use unique, slug-safe family identifiers per page: "mealwood", "coal-generator", "water-geyser", etc. Never "crops" generically.
**Warning signs:** Clicking a tab on one section changes another section's active tab.

### Pitfall 3: kcal/cycle vs kcal/harvest Confusion
**What goes wrong:** The comparison table shows kcal/harvest (much larger number) instead of kcal/cycle, making slow-growing crops like Sleet Wheat (12,200 kcal/harvest) look dramatically better than Mealwood (4,600 kcal/harvest) while their per-cycle rates tell a different story.
**Why it happens:** Game data naturally reports kcal per harvest. Per-cycle requires dividing by growth time.
**How to avoid:** Store both fields in YAML. Display kcal/cycle in the comparison table. Show kcal/harvest on individual crop pages as the raw stat.
**Warning signs:** Comparison table ranks slow crops disproportionately high.

### Pitfall 4: YAML Nullable Fields Not Handled in Rendering
**What goes wrong:** `Astro` renders `null` as the string "null" if not guarded.
**Why it happens:** Crops like Mealwood have no liquid irrigation (only dirt). If `irrigation.liquid` is null and the template just does `{d.irrigation.liquid}`, Astro outputs "null".
**How to avoid:** Guard all nullable fields: `{d.irrigation.liquid && <span>...</span>}`. Zod's `.nullable()` makes it `string | null`; TypeScript will surface if guards are missing.
**Warning signs:** "null" text visible on rendered crop pages.

### Pitfall 5: Geyser Output Rates Are Averages
**What goes wrong:** Displaying a geyser's "output" without noting it's a long-period average misleads players who see the geyser dormant most of the time.
**Why it happens:** Geysers have active periods, dormant periods, and very long cycles (eruption period, dormancy period, cycle length all vary per instance).
**How to avoid:** Label values as "avg output" in the stat display. Add a note field to geyser YAML: "Output varies — value shown is long-period average."
**Warning signs:** Players confused that geyser outputs less than shown.

### Pitfall 6: Content Collection Export Name Mismatch
**What goes wrong:** Adding `crops`, `generators`, `geysers` to `content.config.ts` but using wrong collection name in `getCollection()` calls causes build errors.
**Why it happens:** The export name in `collections` object must exactly match the string passed to `getCollection()`.
**How to avoid:** Keep names consistent: define `const crops = defineCollection(...)` and export `{ crops }`, then call `getCollection('crops')`.
**Warning signs:** Astro build error "Collection not found".

## Code Examples

### Crop YAML Data (verified game data)

```yaml
# src/data/crops.yaml
- id: mealwood
  name: Mealwood
  dlc:
    - base
  growth_cycles: 3
  kcal_per_harvest: 4600
  kcal_per_cycle: 1533       # 4600 / 3
  temperature:
    min:
      value: 10
      unit: C
    max:
      value: 30
      unit: C
  irrigation:
    liquid: null
    liquid_amount: null
    solid: dirt
    solid_amount:
      value: 10
      unit: kg
  fertilizer: null            # no fertilizer required; accepts micronutrient boost
  light_required: null
  notes: "Simplest early food. Needs only dirt. Low calorie density — 5 plants per dupe."
  image_slot: true

- id: bristle_blossom
  name: Bristle Blossom
  dlc:
    - base
  growth_cycles: 6
  kcal_per_harvest: 4600
  kcal_per_cycle: 767         # 4600 / 6
  temperature:
    min:
      value: 5
      unit: C
    max:
      value: 30
      unit: C
  irrigation:
    liquid: water
    liquid_amount:
      value: 20
      unit: kg
    solid: null
    solid_amount: null
  fertilizer: null
  light_required: 200         # 200+ lux required
  notes: "Requires light (200+ lux). Water only. Cook into Gristle Berry for morale bonus."
  image_slot: true

- id: sleet_wheat
  name: Sleet Wheat
  dlc:
    - base
  growth_cycles: 18
  kcal_per_harvest: 12200
  kcal_per_cycle: 678         # 12200 / 18 (approx)
  temperature:
    min:
      value: -55
      unit: C
    max:
      value: 5
      unit: C
  irrigation:
    liquid: water
    liquid_amount:
      value: 20
      unit: kg
    solid: dirt
    solid_amount:
      value: 5
      unit: kg
  fertilizer: null
  light_required: null
  notes: "Requires freezing temperatures. Slow growth. Grind into Frost Bun or Pepper Bread."
  image_slot: true

- id: dusk_cap
  name: Dusk Cap
  dlc:
    - base
  growth_cycles: 8            # 7.5 cycles — round to nearest for schema consistency, note in notes
  kcal_per_harvest: 4600
  kcal_per_cycle: 575         # 4600 / 8
  temperature:
    min:
      value: 5
      unit: C
    max:
      value: 35
      unit: C
  irrigation:
    liquid: null
    liquid_amount: null
    solid: slime
    solid_amount:
      value: 4
      unit: kg
  fertilizer: null
  light_required: 0           # requires darkness (0 lux)
  notes: "CO2 atmosphere required. Must be kept in darkness. Uses slime for fertilization."
  image_slot: true

- id: pincha_pepper
  name: Pincha Pepper
  dlc:
    - base
  growth_cycles: 4
  kcal_per_harvest: 9800
  kcal_per_cycle: 2450        # 9800 / 4
  temperature:
    min:
      value: 35
      unit: C
    max:
      value: 85
      unit: C
  irrigation:
    liquid: polluted_water
    liquid_amount:
      value: 35
      unit: kg
    solid: phosphorite
    solid_amount:
      value: 1
      unit: kg
  fertilizer: null
  light_required: null
  notes: "High calorie density. Requires hot environment (35-85C) and polluted water. Best mid-game food."
  image_slot: true

- id: waterweed
  name: Waterweed
  dlc:
    - spaced_out
  growth_cycles: 12
  kcal_per_harvest: 7400
  kcal_per_cycle: 617         # 7400 / 12
  temperature:
    min:
      value: 22
      unit: C
    max:
      value: 65
      unit: C
  irrigation:
    liquid: salt_water
    liquid_amount:
      value: 5
      unit: kg
    solid: bleach_stone
    solid_amount:
      value: 0.5
      unit: kg
  fertilizer: null
  light_required: null
  notes: "Spaced Out! DLC only. Grows submerged in liquid. Requires salt water + bleach stone."
  image_slot: true

- id: nosh_sprout
  name: Nosh Sprout
  dlc:
    - spaced_out
  growth_cycles: 12
  kcal_per_harvest: 9800
  kcal_per_cycle: 817         # 9800 / 12
  temperature:
    min:
      value: -25
      unit: C
    max:
      value: 0
      unit: C
  irrigation:
    liquid: ethanol
    liquid_amount:
      value: 20
      unit: kg
    solid: dirt
    solid_amount:
      value: 5
      unit: kg
  fertilizer: null            # CO2 atmosphere required (not a fertilizer)
  light_required: null
  notes: "Spaced Out! DLC only. Requires CO2 atmosphere and ethanol irrigation. Cold environment."
  image_slot: true
```

### Generator YAML Data (verified game data)

```yaml
# src/data/generators.yaml
- id: coal_generator
  name: Coal Generator
  dlc:
    - base
  watts: 600
  fuel_type: coal
  consumption:
    value: 1000
    unit: g/s
  heat_output:
    value: 9
    unit: kDTU/s
  byproducts:
    - product: carbon_dioxide
      rate:
        value: 20
        unit: g/s
      temp:
        value: 110
        unit: C
  dimensions: "3×3"
  notes: "Earliest generator. High CO2 output — route to carbon skimmer. Good for early-game coal ranch setups."
  image_slot: true

- id: natural_gas_generator
  name: Natural Gas Generator
  dlc:
    - base
  watts: 800
  fuel_type: natural_gas
  consumption:
    value: 90
    unit: g/s
  heat_output:
    value: 10
    unit: kDTU/s
  byproducts:
    - product: polluted_water
      rate:
        value: 67.5
        unit: g/s
      temp:
        value: 40
        unit: C
    - product: carbon_dioxide
      rate:
        value: 22.5
        unit: g/s
      temp:
        value: 110
        unit: C
  dimensions: "4×3"
  notes: "Pairs with natural gas geyser. Produces polluted water — route to plants or water sieve."
  image_slot: true

- id: hydrogen_generator
  name: Hydrogen Generator
  dlc:
    - base
  watts: 800
  fuel_type: hydrogen
  consumption:
    value: 100
    unit: g/s
  heat_output:
    value: 4
    unit: kDTU/s
  dimensions: "4×3"
  notes: "Most heat-efficient generator. Requires hydrogen atmosphere supply. Pairs with electrolyzers."
  image_slot: true

- id: petroleum_generator
  name: Petroleum Generator
  dlc:
    - base
  watts: 2000
  fuel_type: petroleum
  consumption:
    value: 2000
    unit: g/s
  heat_output:
    value: 20
    unit: kDTU/s
  byproducts:
    - product: carbon_dioxide
      rate:
        value: 500
        unit: g/s
      temp:
        value: 110
        unit: C
    - product: polluted_water
      rate:
        value: 750
        unit: g/s
      temp:
        value: 40
        unit: C
  dimensions: "3×4"
  notes: "Highest wattage. Requires petroleum refinery setup. High heat — needs active cooling."
  image_slot: true
```

### Battery YAML Data

```yaml
# src/data/batteries.yaml (or include in generators.yaml)
- id: battery
  name: Battery
  dlc:
    - base
  capacity:
    value: 10
    unit: kJ
  leak_rate:
    value: 1
    unit: kJ/cycle
  heat_output:
    value: 1.25
    unit: kDTU/s
  dimensions: "1×2"
  notes: "Basic battery. High leak rate — use Smart Battery for efficiency."

- id: smart_battery
  name: Smart Battery
  dlc:
    - base
  capacity:
    value: 20
    unit: kJ
  leak_rate:
    value: 0.4
    unit: kJ/cycle
  heat_output:
    value: 0.5
    unit: kDTU/s
  dimensions: "2×2"
  notes: "Preferred mid-game battery. Automation output to control generators — turn off when full."

- id: jumbo_battery
  name: Jumbo Battery
  dlc:
    - base
  capacity:
    value: 40
    unit: kJ
  leak_rate:
    value: 2
    unit: kJ/cycle
  heat_output:
    value: 1.25
    unit: kDTU/s
  dimensions: "2×2"
  notes: "Largest capacity per footprint. Higher leak rate than Smart Battery."
```

### Geyser YAML Data (most commonly referenced types)

```yaml
# src/data/geysers.yaml
- id: water_geyser
  name: Water Geyser
  dlc:
    - base
  output_material: water
  avg_output:
    value: 1800
    unit: kg/cycle
  output_temp:
    value: 95
    unit: C
  biome: random
  taming_complexity: low
  taming_method: "Insulated tile box. Cool output with aquatuner or heat exchange before use."
  notes: "Most valuable geyser. Hot water — needs cooling. Average output varies per seed instance."
  image_slot: true

- id: cool_slush_geyser
  name: Cool Slush Geyser
  dlc:
    - base
  output_material: polluted_water
  avg_output:
    value: 900
    unit: kg/cycle
  output_temp:
    value: -10
    unit: C
  biome: random
  taming_complexity: low
  taming_method: "Simple insulated box containment. Output already cold — direct to water sieve."
  notes: "Produces cold polluted water — doubles as passive cooling. Run through water sieve for clean water."
  image_slot: true

- id: cool_steam_vent
  name: Cool Steam Vent
  dlc:
    - base
  output_material: steam
  avg_output:
    value: 900
    unit: kg/cycle
  output_temp:
    value: 110
    unit: C
  biome: swamp
  taming_complexity: medium
  taming_method: "Steam chamber containment with steam turbine for power + cooling."
  notes: "Common water source. Output as steam requires condensing. Pairs with steam turbine."
  image_slot: true

- id: natural_gas_geyser
  name: Natural Gas Geyser
  dlc:
    - base
  output_material: natural_gas
  avg_output:
    value: 63
    unit: kg/cycle
  output_temp:
    value: 150
    unit: C
  biome: swamp
  taming_complexity: medium
  taming_method: "Gas pump + pipe to Natural Gas Generator. Pairs with Fertilizer Synthesizer for bonus gas."
  power_output:
    value: 659
    unit: W
  notes: "~659W net after supporting infrastructure. Each geyser supports ~2 Natural Gas Generators."
  image_slot: true

- id: hydrogen_vent
  name: Hydrogen Vent
  dlc:
    - base
  output_material: hydrogen
  avg_output:
    value: 63
    unit: kg/cycle
  output_temp:
    value: 500
    unit: C
  biome: random
  taming_complexity: high
  taming_method: "Insulated containment with gas pump. Hot hydrogen — needs heat management before storage."
  notes: "Very hot output. Requires active cooling before piping to Hydrogen Generators."
  image_slot: true

- id: salt_water_geyser
  name: Salt Water Geyser
  dlc:
    - base
  output_material: salt_water
  avg_output:
    value: 1800
    unit: kg/cycle
  output_temp:
    value: 95
    unit: C
  biome: ocean
  taming_complexity: low
  taming_method: "Insulated tile box. Route to Desalinator for clean water + salt. Cool before processing."
  notes: "Ocean biome source. Desalinator converts to water + table salt. Hot — needs cooling."
  image_slot: true
```

### CropComparisonTable Pattern

```astro
---
// CropComparisonTable.astro — adapts ComparisonTable.astro for crop data
// Desktop: grid with 6 columns (Name, Growth, kcal/cycle, Irrigation, Temp Range, Fertilizer)
// Each Name cell is a link to the individual crop page
// Mobile: stacked cards matching existing ComparisonTable mobile pattern
---
```

### content.config.ts additions

```typescript
// Add after existing collection definitions:

const cropSchema = z.object({
  id: z.string(),
  name: z.string(),
  dlc: z.array(z.string()),
  growth_cycles: z.number(),
  kcal_per_harvest: z.number(),
  kcal_per_cycle: z.number(),
  temperature: z.object({
    min: unitValue,
    max: unitValue,
  }),
  irrigation: z.object({
    liquid: z.string().nullable(),
    liquid_amount: unitValue.nullable(),
    solid: z.string().nullable(),
    solid_amount: unitValue.nullable(),
  }),
  fertilizer: z.string().nullable(),
  light_required: z.number().nullable(),
  notes: z.string().optional(),
  image_slot: z.boolean().default(true),
});

const generatorSchema = z.object({
  id: z.string(),
  name: z.string(),
  dlc: z.array(z.string()),
  watts: z.number(),
  fuel_type: z.string(),
  consumption: unitValue,
  heat_output: unitValue,
  byproducts: z.array(z.object({
    product: z.string(),
    rate: unitValue,
    temp: unitValue.optional(),
  })).optional(),
  dimensions: z.string(),
  notes: z.string().optional(),
  image_slot: z.boolean().default(true),
});

const batterySchema = z.object({
  id: z.string(),
  name: z.string(),
  dlc: z.array(z.string()),
  capacity: unitValue,
  leak_rate: unitValue,
  heat_output: unitValue,
  dimensions: z.string(),
  notes: z.string().optional(),
});

const geyserSchema = z.object({
  id: z.string(),
  name: z.string(),
  dlc: z.array(z.string()),
  output_material: z.string(),
  avg_output: unitValue,
  output_temp: unitValue,
  biome: z.string(),
  taming_complexity: z.enum(['low', 'medium', 'high']),
  taming_method: z.string(),
  power_output: unitValue.optional(),
  notes: z.string().optional(),
  image_slot: z.boolean().default(true),
});

const crops = defineCollection({ loader: file('src/data/crops.yaml'), schema: cropSchema });
const generators = defineCollection({ loader: file('src/data/generators.yaml'), schema: generatorSchema });
const batteries = defineCollection({ loader: file('src/data/batteries.yaml'), schema: batterySchema });
const geysers = defineCollection({ loader: file('src/data/geysers.yaml'), schema: geyserSchema });

// Add to exports:
export const collections = {
  // ...existing...
  crops,
  generators,
  batteries,
  geysers,
};
```

## Game Data Reference

### Farmable Crops Summary (verified from oxygennotincluded.wiki.gg)

| Crop | Growth (cycles) | kcal/harvest | kcal/cycle | Irrigation | Temp (°C) | Notes |
|------|-----------------|--------------|------------|------------|-----------|-------|
| Mealwood | 3 | 4,600 | ~1,533 | 10 kg Dirt | 10–30 | Easiest early food, no water |
| Bristle Blossom | 6 | 4,600 | ~767 | 20 kg Water | 5–30 | Requires 200+ lux light |
| Dusk Cap | 7.5 | 4,600 | ~613 | 4 kg Slime | 5–35 | CO2 atmo + darkness required |
| Pincha Pepper | 4 | 9,800 | ~2,450 | 35 kg Polluted Water + 1 kg Phosphorite | 35–85 | Best mid-game kcal/cycle |
| Sleet Wheat | 18 | 12,200 | ~678 | 20 kg Water + 5 kg Dirt | -55–5 | Needs cold biome |
| Waterweed | 12 | 7,400 | ~617 | 5 kg Salt Water + 500g Bleach Stone | 22–65 | Spaced Out! DLC |
| Nosh Sprout | 12 | 9,800 | ~817 | 20 kg Ethanol + 5 kg Dirt | -25–0 | Spaced Out! DLC, CO2 atmo |

### Generator Stats Summary (verified from oxygennotincluded.wiki.gg)

| Generator | Watts | Fuel | Consumption | Heat Out | Key Byproduct |
|-----------|-------|------|-------------|----------|---------------|
| Coal Generator | 600 W | Coal | 1,000 g/s | 9 kDTU/s | CO2 @ 110°C |
| Natural Gas Generator | 800 W | Natural Gas | 90 g/s | 10 kDTU/s | Polluted Water + CO2 |
| Hydrogen Generator | 800 W | Hydrogen | 100 g/s | 4 kDTU/s | — |
| Petroleum Generator | 2,000 W | Petroleum | 2,000 g/s | 20 kDTU/s | CO2 + Polluted Water |

### Battery Stats Summary (verified from oxygennotincluded.wiki.gg)

| Battery | Capacity | Leak Rate | Heat Out | Dimensions |
|---------|----------|-----------|----------|------------|
| Battery | 10 kJ | 1 kJ/cycle | 1.25 kDTU/s | 1×2 |
| Smart Battery | 20 kJ | 0.4 kJ/cycle | 0.5 kDTU/s | 2×2 |
| Jumbo Battery | 40 kJ | 2 kJ/cycle | 1.25 kDTU/s | 2×2 |

### Recommended Geyser Pages (most commonly referenced)

| Geyser | Output | Avg Rate | Temp | Biome | Taming |
|--------|--------|----------|------|-------|--------|
| Water Geyser | Water | 1,800 kg/cycle | 95°C | Random | Low |
| Cool Slush Geyser | Polluted Water | 900 kg/cycle | -10°C | Random | Low |
| Cool Steam Vent | Steam | 900 kg/cycle | 110°C | Swamp | Medium |
| Natural Gas Geyser | Natural Gas | 63 kg/cycle | 150°C | Swamp | Medium |
| Hydrogen Vent | Hydrogen | 63 kg/cycle | 500°C | Random | High |
| Salt Water Geyser | Salt Water | 1,800 kg/cycle | 95°C | Ocean | Low |

### Page Scope Decisions (Claude's Discretion)

**Crops to include (7 total):** Mealwood, Bristle Blossom, Dusk Cap, Pincha Pepper, Sleet Wheat, Waterweed (DLC), Nosh Sprout (DLC). Hexalent and Arbor Tree excluded — Hexalent is wild-only (not domesticatable), Arbor Tree is a wood source, not a food crop.

**Generator setups to include (4 total):** Coal Generator room, Natural Gas Generator room, Hydrogen Generator room, Petroleum Generator room. Steam Turbine is explicitly deferred (late-game, per CONTEXT.md).

**Geyser pages to include (6 total):** Water, Cool Slush, Cool Steam Vent, Natural Gas, Hydrogen Vent, Salt Water. These are the most commonly encountered and referenced in early-to-mid game. Volcano types and molten metal geysers are late-game/advanced, omit for this phase.

## State of the Art

| Old Approach (Phase 2) | Current Approach (Phase 3) | Impact |
|------------------------|---------------------------|--------|
| Separate YAML per critter family | Single YAML per content type (crops.yaml, generators.yaml) | Cleaner for non-family content |
| CritterVariantCard with critter-specific fields | New CropStatCard / BuildStatCard components adapting the same pattern | Reuse layout, swap props |
| RanchBuildTabs (hardcoded for ranching context) | RanchBuildTabs reused directly — just pass different family prop | Zero new tab component code |
| ComparisonTable (critter columns) | CropComparisonTable (crop columns, links to crop pages) | Crop-specific comparison |

**Deprecated/outdated:**
- Nothing deprecated. Phase 3 extends Phase 2 patterns without breaking changes.

## Open Questions

1. **Dusk Cap growth cycle: 7.5 or 8?**
   - What we know: Wiki states 7.5 cycles domestic growth time
   - What's unclear: Whether to store 7.5 (exact) or 8 (rounded) in YAML; the `growth_cycles` field is `z.number()` so 7.5 is valid
   - Recommendation: Store 7.5 exactly. Calculate kcal_per_cycle as 4600/7.5 = 613.3, store as 613. Add a note that the value is rounded.

2. **POWR-03 and POWR-04 scope clarification**
   - What we know: User decision explicitly removed raw pipe/pump tables from this phase
   - What's unclear: Whether the planner should mark these requirements as "addressed by deferral" or leave them as pending
   - Recommendation: Leave POWR-03 and POWR-04 as pending in REQUIREMENTS.md. The planner should NOT create tasks claiming to fulfill these — they remain genuinely deferred.

3. **Batteries: separate page or embedded in generator pages?**
   - What we know: POWR-02 says users should see battery types with capacity and heat output; user deferred "raw stat tables"
   - What's unclear: Whether a dedicated batteries page is needed or if battery stats can appear within generator setup context
   - Recommendation: Create a lightweight batteries page (or section on the power hub) showing the three battery types as stat cards. This satisfies POWR-02 without requiring elaborate build guides.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Astro build (static site — build success validates all pages render) |
| Config file | astro.config.mjs |
| Quick run command | `npm run build` |
| Full suite command | `npm run build && npx astro preview` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FARM-01 | Crop temp range, irrigation, fertilizer visible | smoke (build) | `npm run build` | Wave 0 (crops.yaml + pages) |
| FARM-02 | Growth time and kcal/cycle visible | smoke (build) | `npm run build` | Wave 0 |
| FARM-03 | Crop comparison table on farming hub | smoke (build) | `npm run build` | Wave 0 (CropComparisonTable) |
| POWR-01 | Generator wattage, fuel, consumption visible | smoke (build) | `npm run build` | Wave 0 (generators.yaml + pages) |
| POWR-02 | Battery capacity and heat output visible | smoke (build) | `npm run build` | Wave 0 (batteries.yaml + section) |
| POWR-03 | (Deferred — no task) | n/a | n/a | n/a |
| POWR-04 | (Deferred — no task) | n/a | n/a | n/a |

### Sampling Rate
- **Per task commit:** `npm run build` (validates all pages render without error)
- **Per wave merge:** `npm run build && npx astro preview` + manual spot-check of hub and one crop page
- **Phase gate:** Full build green + manual review of farming hub table, one crop page, one generator page, one geyser page

### Wave 0 Gaps
- [ ] `src/data/crops.yaml` — crop data (covers FARM-01/02/03)
- [ ] `src/data/generators.yaml` — generator data (covers POWR-01)
- [ ] `src/data/batteries.yaml` — battery data (covers POWR-02)
- [ ] `src/data/geysers.yaml` — geyser data (no direct POWR requirement but power/plumbing hub content)
- [ ] `src/content.config.ts` update — register crops, generators, batteries, geysers collections

## Sources

### Primary (HIGH confidence)
- [oxygennotincluded.wiki.gg/wiki/Plant](https://oxygennotincluded.wiki.gg/wiki/Plant) — All farmable crops: growth time, kcal, irrigation, temperature, atmosphere requirements
- [oxygennotincluded.wiki.gg/wiki/Guide/Agriculture](https://oxygennotincluded.wiki.gg/wiki/Guide/Agriculture) — Crop farming methods, fertilization context
- [oxygennotincluded.wiki.gg/wiki/Coal_Generator](https://oxygennotincluded.wiki.gg/wiki/Coal_Generator) — Wattage 600W, fuel 1000 g/s, heat 9 kDTU/s, CO2 output
- [oxygennotincluded.wiki.gg/wiki/Natural_Gas_Generator](https://oxygennotincluded.wiki.gg/wiki/Natural_Gas_Generator) — Wattage 800W, fuel 90 g/s, heat 10 kDTU/s, polluted water/CO2 byproducts
- [oxygennotincluded.wiki.gg/wiki/Hydrogen_Generator](https://oxygennotincluded.wiki.gg/wiki/Hydrogen_Generator) — Wattage 800W, fuel 100 g/s, heat 4 kDTU/s
- [oxygennotincluded.wiki.gg/wiki/Petroleum_Generator](https://oxygennotincluded.wiki.gg/wiki/Petroleum_Generator) — Wattage 2000W, fuel 2000 g/s, heat 20 kDTU/s
- [oxygennotincluded.wiki.gg/wiki/Battery](https://oxygennotincluded.wiki.gg/wiki/Battery) — Basic battery: 10kJ, 1kJ/cycle leak, 1.25kDTU/s heat
- [oxygennotincluded.wiki.gg/wiki/Smart_Battery](https://oxygennotincluded.wiki.gg/wiki/Smart_Battery) — Smart battery: 20kJ, 0.4kJ/cycle leak, 0.5kDTU/s heat
- [oxygennotincluded.wiki.gg/wiki/Jumbo_Battery](https://oxygennotincluded.wiki.gg/wiki/Jumbo_Battery) — Jumbo battery: 40kJ, 2kJ/cycle leak, 1.25kDTU/s heat
- [oxygennotincluded.wiki.gg/wiki/Geyser](https://oxygennotincluded.wiki.gg/wiki/Geyser) — All geyser types with avg output, temperature, biome
- [oxygennotincluded.wiki.gg/wiki/Guide/Natural_Gas_Geysers](https://oxygennotincluded.wiki.gg/wiki/Guide/Natural_Gas_Geysers) — ~659W net per geyser, 2 generators per geyser, Fertilizer Synthesizer pairing
- Existing codebase — content.config.ts, component patterns, YAML schema conventions

### Secondary (MEDIUM confidence)
- [oxygennotincluded.wiki.gg/wiki/Guide/Food](https://oxygennotincluded.wiki.gg/wiki/Guide/Food) — kcal/cycle values cross-referenced (Sleet Wheat 400 kcal/cycle, Bristle Blossom ~333-767 range depending on cooking)
- [oxygennotincluded.wiki.gg/wiki/Guide/Power_Circuits](https://oxygennotincluded.wiki.gg/wiki/Guide/Power_Circuits) — Battery stats, generator wattage summary

### Tertiary (LOW confidence)
- Exact kcal/cycle numbers for Waterweed and Nosh Sprout — sourced from wiki but DLC content; verify at implementation time
- Pincha Pepper growth cycle: sources show both 4 cycles and 8 cycles — wiki.gg shows 4, guide page showed 8; use 4 (more granular primary source) and verify during implementation

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — zero new dependencies; all existing patterns
- Architecture: HIGH — direct extension of Phase 2 patterns; no new technical concepts
- Crop game data: HIGH — verified from official wiki with cross-reference
- Generator/battery data: HIGH — verified from individual wiki pages with specific numeric values
- Geyser data: HIGH — verified from official wiki geyser page
- Pitfalls: HIGH — based on direct codebase analysis and established Astro behavior

**Research date:** 2026-03-16
**Valid until:** 2026-04-16 (stable — game data and Astro APIs unlikely to change; Pincha Pepper growth cycles should be verified during implementation)
