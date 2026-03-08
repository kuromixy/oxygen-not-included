# Roadmap: ONI Fanpage

## Overview

This roadmap delivers an Oxygen Not Included quick-reference fanpage from zero to a complete, searchable static site on GitHub Pages. The approach is foundation-first: establish the Astro project with structured data schemas and a working deploy pipeline, prove the architecture with the two most commonly looked-up content domains (rooms and ranching), expand to remaining content (farming, power, plumbing), then layer on cross-cutting features (search and DLC toggle) that require content to exist first.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation & Design System** - Astro project with data schemas, nav shell, dark mode, deploy pipeline, and one proof-of-concept page
- [ ] **Phase 2: Rooms & Ranching** - Complete room reference and critter ranching data using established templates
- [ ] **Phase 3: Farming, Power & Plumbing** - Remaining content domains reusing Phase 2 patterns
- [ ] **Phase 4: Search & DLC Toggle** - Client-side search and base game vs DLC content filtering

## Phase Details

### Phase 1: Foundation & Design System
**Goal**: Users can visit a deployed site with working navigation, dark mode, and a responsive layout that proves the full data-to-deploy pipeline end-to-end
**Depends on**: Nothing (first phase)
**Requirements**: INFR-01, INFR-02, INFR-03, INFR-04, INFR-05, NAV-01, DSGN-01, DSGN-03
**Success Criteria** (what must be TRUE):
  1. User can visit the live GitHub Pages URL and see a styled page with ONI-themed navigation across four content categories (Ranching, Farming, Power/Plumbing, Base Layouts)
  2. Site renders in dark mode by default, respects system preference, and user can toggle between dark and light mode
  3. Site is responsive and usable on mobile screen sizes (no horizontal scroll, readable text, tappable nav)
  4. Site loads in under 2 seconds on a typical connection (static HTML, no client JS framework)
  5. Game data for at least one proof-of-concept entry is stored in a structured JSON/YAML file with DLC tagging, separate from templates
**Plans**: 3 plans

Plans:
- [x] 01-01-PLAN.md -- Scaffold Astro project with Tailwind v4, content schema, data layer, dark mode, and deploy pipeline
- [ ] 01-02-PLAN.md -- Home page with category cards and category landing pages
- [ ] 01-03-PLAN.md -- Hatches proof-of-concept page with comparison table and detail cards

### Phase 2: Rooms & Ranching
**Goal**: Users can look up any room type or critter and immediately find the dimensions, requirements, and key stats they need
**Depends on**: Phase 1
**Requirements**: ROOM-01, ROOM-02, ROOM-03, RNCH-01, RNCH-02, RNCH-03, RNCH-04
**Success Criteria** (what must be TRUE):
  1. User can find any standard room type and see its minimum/maximum tile dimensions, required buildings, and optimal layout pattern
  2. User can look up any critter family (Hatch, Drecko, Pacu, etc.) and see diet, output product, and calorie/resource rates
  3. User can see stable capacity limits and grooming station requirements for each critter type
  4. User can see critter variants (e.g., Hatch vs Sage Hatch vs Stone Hatch) with differences clearly highlighted on the same page
**Plans**: TBD

Plans:
- [ ] 02-01: TBD
- [ ] 02-02: TBD

### Phase 3: Farming, Power & Plumbing
**Goal**: Users can look up any crop, generator, battery, pipe, or pump and find the key stats at a glance
**Depends on**: Phase 2
**Requirements**: FARM-01, FARM-02, FARM-03, POWR-01, POWR-02, POWR-03, POWR-04
**Success Criteria** (what must be TRUE):
  1. User can look up any crop and see temperature range, irrigation needs, fertilizer requirements, growth time, and calorie/resource output
  2. User can compare crops side-by-side to choose the optimal food source for their colony situation
  3. User can look up generators and batteries with wattage, fuel type, consumption rate, capacity, and heat output
  4. User can look up pipe types and pumps with throughput, temperature limits, flow rates, and power consumption
**Plans**: TBD

Plans:
- [ ] 03-01: TBD
- [ ] 03-02: TBD

### Phase 4: Search & DLC Toggle
**Goal**: Users can instantly find any data point via search and filter content by base game vs Spaced Out! DLC
**Depends on**: Phase 3
**Requirements**: NAV-02, DSGN-02
**Success Criteria** (what must be TRUE):
  1. User can type a search query and see matching results across all site content without a page reload
  2. User can toggle a DLC filter to show or hide Spaced Out! DLC-specific content, and the preference persists across pages
**Plans**: TBD

Plans:
- [ ] 04-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Design System | 2/3 | In Progress|  |
| 2. Rooms & Ranching | 0/2 | Not started | - |
| 3. Farming, Power & Plumbing | 0/2 | Not started | - |
| 4. Search & DLC Toggle | 0/1 | Not started | - |
