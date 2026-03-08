# Architecture Patterns

**Domain:** Static game reference / cheat-sheet site (Oxygen Not Included)
**Researched:** 2026-03-08

## Recommended Architecture

A **content-driven static site** with structured data files feeding templated pages. The key insight: separate game data from presentation so data can be corrected/updated without touching layout code, and layouts can be redesigned without touching data.

```
+------------------+      +------------------+      +------------------+
|   Content Data   | ---> |   Build System   | ---> |   Static HTML    |
|  (JSON/YAML)     |      | (SSG templates)  |      |  (GitHub Pages)  |
+------------------+      +------------------+      +------------------+
        |                         |                         |
  Game stats,              Astro/11ty builds          Deployed to
  dimensions,              pages from data +          gh-pages branch
  critter info             layout templates
```

### Why This Over Plain HTML

A site with 4+ content domains (ranching, farming, power, base layouts), each with multiple sub-topics, will have **20-40 pages of similar structure**. Hand-writing each HTML page means:
- Updating a stat requires finding the right HTML file and editing inline
- Changing the card layout means editing every single page
- Adding a new section means copying boilerplate

With data files + templates, adding a new critter is one JSON entry. Changing the card layout is one template edit.

## Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| **Content Data Layer** | Stores all game reference data as structured JSON/YAML files | Read by Build System |
| **Layout Templates** | Define how reference cards, stat tables, and diagrams render | Consume data via Build System |
| **Design System** | ONI-themed CSS: color palette, typography, card styles, spacing | Imported by Layout Templates |
| **Navigation Shell** | Top-level site chrome: header, sidebar/nav, search, footer | Wraps all pages |
| **Image Assets** | Diagrams, screenshots, placeholder SVGs | Referenced by Layout Templates |
| **Build System** | SSG that combines data + templates into static HTML | Reads data, applies templates, outputs HTML |
| **Deploy Pipeline** | GitHub Actions workflow pushing to GitHub Pages | Triggered by commits to main |

### Component Detail

#### 1. Content Data Layer

The heart of the site. Each content domain gets its own data directory.

```
src/data/
  ranching/
    critters.json        # Hatch, Drecko, Pacu, etc.
    stables.json         # Room sizes, requirements
  farming/
    crops.json           # Growth times, temps, irrigation
    layouts.json         # Optimal farm designs
  power/
    generators.json      # Wattage, fuel, heat output
    batteries.json       # Capacity, runoff
    circuits.json        # Common circuit designs
  plumbing/
    pipes.json           # Capacity, materials, temps
    setups.json          # SPOM, cooling loops, etc.
  base-layouts/
    rooms.json           # Room types, size bonuses
    industrial.json      # Industrial brick designs
```

Each JSON file follows a consistent schema per domain. Example critter entry:

```json
{
  "id": "hatch",
  "name": "Hatch",
  "diet": ["Sedimentary Rock", "Sandstone"],
  "calories_per_cycle": 140000,
  "stable_size": { "min_tiles": 12, "max_critters": 8 },
  "outputs": [{ "item": "Coal", "rate_per_cycle": 75 }],
  "variants": ["Stone Hatch", "Sage Hatch", "Smooth Hatch"],
  "image": "hatch.png",
  "tags": ["ranching", "coal", "food"]
}
```

#### 2. Layout Templates

Page templates that render data into glanceable reference cards. Three core template types:

- **Stat Card Template** -- Renders a single item (critter, crop, generator) as a compact card with key numbers prominent
- **Comparison Table Template** -- Side-by-side table for comparing related items (all generators, all crops)
- **Diagram Template** -- Full-width layout for visual build designs with dimensions overlaid

#### 3. Design System

A small, custom CSS system (no heavy framework needed). Components:

- Color tokens derived from ONI palette (dusky blues, warm oranges, industrial grays)
- Card component with stat-highlight slots
- Responsive grid for card layouts
- Table styles for comparison views
- Typography scale (playful but readable)

#### 4. Navigation Shell

- **Header**: Site logo/name, ONI-themed branding
- **Primary Nav**: Content domains (Ranching, Farming, Power/Plumbing, Base Layouts)
- **Secondary Nav**: Sub-topics within each domain
- **Search** (client-side): Fuzzy search over all reference data using a pre-built index (e.g., Pagefind or Fuse.js)
- **Footer**: Credits, game version, last-updated date

#### 5. Image Assets

```
src/assets/images/
  placeholders/          # SVG placeholders per category
  critters/              # Critter portraits (added later)
  diagrams/              # Build layout diagrams (added later)
  icons/                 # UI icons (ONI-themed)
```

Placeholder strategy: Use simple SVG illustrations or silhouettes initially. Directory structure mirrors final image paths so swapping in real images is a file replacement, no code changes.

## Data Flow

```
Author edits JSON/YAML data files
        |
        v
Git commit triggers GitHub Actions
        |
        v
SSG build reads data files + templates
        |
        v
Generates static HTML + CSS + JS bundle
        |
        v
Deploys to GitHub Pages (gh-pages branch)
        |
        v
User visits site -> browser loads static HTML
        |
        v
Client-side search index enables instant lookup
```

**Key data flows during user interaction:**

1. **Browse flow**: User clicks nav category -> lands on category page -> sees all items as stat cards -> clicks one for detail
2. **Search flow**: User types in search bar -> client-side fuzzy match against pre-built JSON index -> shows matching items inline -> click navigates to item
3. **Quick-reference flow**: User lands on a specific page (bookmarked or linked) -> immediately sees the stat they need front-and-center

## Patterns to Follow

### Pattern 1: Content Collections

**What:** Define typed content collections where each domain (ranching, farming, etc.) has a schema that validates data at build time.
**When:** Always -- this is the core data management strategy.
**Why:** Catches data errors before deploy. Makes data shape predictable for templates.

```
// Astro content collection example
const critterSchema = z.object({
  name: z.string(),
  diet: z.array(z.string()),
  calories_per_cycle: z.number(),
  stable_size: z.object({
    min_tiles: z.number(),
    max_critters: z.number(),
  }),
  outputs: z.array(z.object({
    item: z.string(),
    rate_per_cycle: z.number(),
  })),
});
```

### Pattern 2: Stat-First Card Design

**What:** Every reference card leads with the 1-2 most-looked-up numbers in large, prominent typography. Supporting details are secondary.
**When:** All stat cards.
**Why:** The entire value proposition is "glance and get the number." If the key stat is buried in a paragraph, the site fails its purpose.

```
+----------------------------------+
| [icon]  HATCH                    |
|                                  |
|   Stable: 96 tiles (12x8)       |  <-- THE number, big and bold
|   Max: 8 critters                |
|                                  |
|   Diet: Sedimentary Rock         |  <-- Supporting details
|   Output: 75kg Coal/cycle        |
|   Calories: 140 kcal/cycle       |
+----------------------------------+
```

### Pattern 3: Progressive Enhancement for Images

**What:** All image slots have meaningful alt text and a styled placeholder. Real images enhance but are not required.
**When:** Every image reference.
**Why:** Site must be useful from day one with placeholders. Images come later.

### Pattern 4: Pre-built Search Index

**What:** At build time, generate a search index (JSON) from all content data. Client-side JavaScript loads this index and provides instant fuzzy search.
**When:** Once there are more than ~10 reference items.
**Why:** Players need to find "how many tiles for a great hall" without knowing which category it falls under.

## Anti-Patterns to Avoid

### Anti-Pattern 1: Data in HTML

**What:** Putting game stats directly in HTML template files.
**Why bad:** Every stat update requires finding and editing HTML. Risk of inconsistency when the same number appears on multiple pages. No validation.
**Instead:** All game data in JSON/YAML data files. Templates reference data by key.

### Anti-Pattern 2: One Mega Page

**What:** Putting all reference data on a single long page.
**Why bad:** Slow to load, impossible to bookmark specific sections, overwhelming to scan.
**Instead:** One page per domain, with anchor links for sub-sections. Individual item pages for detail views.

### Anti-Pattern 3: Wiki-Style Prose

**What:** Writing reference content as paragraphs of text.
**Why bad:** Defeats the "glanceable cheat sheet" purpose. Players will go to the wiki if they want to read paragraphs.
**Instead:** Structured data rendered as cards, tables, and annotated diagrams. Minimal prose.

### Anti-Pattern 4: Complex Client-Side State

**What:** Building SPA-like features (filters, sorting, state management).
**Why bad:** Overcomplicates a reference site. Adds bundle size, breaks deep linking, introduces bugs.
**Instead:** Generate all views at build time. Use simple client-side JS only for search and minor UI interactions (e.g., expand/collapse).

## Page Architecture

```
/                           # Landing page: "What do you need?" quick links
/ranching/                  # Ranching overview: all critter cards + stable info
/ranching/[critter]/        # Individual critter detail
/farming/                   # Farming overview: crop cards + layout diagrams
/farming/[crop]/            # Individual crop detail
/power/                     # Power overview: generators, batteries, circuits
/power/[setup]/             # Individual power setup detail
/plumbing/                  # Plumbing overview: pipes, common setups
/plumbing/[setup]/          # Individual plumbing setup detail
/base-layouts/              # Base layout overview: rooms, industrial designs
/base-layouts/[layout]/     # Individual layout detail with diagram
```

Each category index page is the primary reference -- most users will get what they need from the overview cards without clicking into detail pages.

## Scalability Considerations

| Concern | At launch (~30 items) | At 100+ items | At 500+ items |
|---------|----------------------|---------------|---------------|
| Build time | Seconds | Seconds | Under 30s (static gen scales well) |
| Page load | Trivial, <100KB | Fine, pages are independent | Fine, no change per page |
| Search index | <50KB JSON | <200KB JSON, still fast | Consider Pagefind for larger index |
| Navigation | Simple flat nav | Add sub-category grouping | Add search prominence, possibly tagging |
| Data management | Single author, manual JSON | Consider YAML for readability | Consider a simple CMS or spreadsheet-to-JSON pipeline |

## Suggested Build Order

Dependencies flow top-to-bottom. Each layer requires the one above it.

```
Phase 1: Foundation
  [Data schema design] + [Build system setup] + [Deploy pipeline]
  These are independent of each other but everything else depends on them.

Phase 2: Core Rendering
  [Design system / CSS] + [Navigation shell]
  Requires build system. Can be done in parallel.

Phase 3: First Content Domain
  [One complete domain (e.g., Ranching)] with data + templates + cards
  Proves the full pipeline end-to-end.

Phase 4: Remaining Content Domains
  [Farming] + [Power/Plumbing] + [Base Layouts]
  Reuse templates from Phase 3. Can be done in parallel.

Phase 5: Polish
  [Client-side search] + [Image replacement] + [Responsive tuning]
  Requires content to exist to be meaningful.
```

**Critical path:** Data schema -> Build system -> One template -> One domain end-to-end. Everything else parallelizes after that.

## Sources

- Architecture patterns based on established static site generator conventions (Astro, Eleventy, Hugo documentation patterns) -- MEDIUM confidence (training data, well-established patterns)
- ONI game data structure based on domain knowledge of Oxygen Not Included mechanics -- HIGH confidence (stable game mechanics well-documented across community)
- GitHub Pages deployment patterns -- HIGH confidence (stable, well-documented platform)
- Note: Web research tools were unavailable during this research session. Patterns described are standard and stable but specific tool versions should be verified during implementation.
