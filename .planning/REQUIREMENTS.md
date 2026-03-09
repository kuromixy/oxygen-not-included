# Requirements: ONI Fanpage

**Defined:** 2026-03-08
**Core Value:** Players can instantly find the exact number, dimension, or layout they need mid-game without wading through wikis or forum posts.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Navigation

- [x] **NAV-01**: User can navigate between content categories (Ranching, Farming, Power/Plumbing, Base Layouts) via clear top-level navigation
- [ ] **NAV-02**: User can search across all site content and find matching results via client-side search (Pagefind)

### Rooms & Base Layouts

- [x] **ROOM-01**: User can look up room types with minimum/maximum tile dimensions
- [x] **ROOM-02**: User can see required buildings for each room type
- [x] **ROOM-03**: User can see optimal room sizes and common layout patterns

### Ranching

- [ ] **RNCH-01**: User can look up critter types with diet, output product, and calorie/resource rates
- [ ] **RNCH-02**: User can see stable capacity limits per critter type
- [ ] **RNCH-03**: User can see grooming station requirements and taming/grooming cycle times
- [ ] **RNCH-04**: User can see critter variants (e.g., Hatch, Sage Hatch, Stone Hatch) with differences highlighted

### Farming

- [ ] **FARM-01**: User can look up crops with temperature range, irrigation needs, and fertilizer requirements
- [ ] **FARM-02**: User can see growth time and calorie/resource output per crop
- [ ] **FARM-03**: User can compare crops side-by-side to choose optimal food source

### Power & Plumbing

- [ ] **POWR-01**: User can look up generators with wattage output, fuel type, and fuel consumption rate
- [ ] **POWR-02**: User can see battery types with capacity and heat output
- [ ] **POWR-03**: User can look up pipe types with throughput and temperature limits
- [ ] **POWR-04**: User can see pump types with flow rates and power consumption

### Visual Design

- [x] **DSGN-01**: Site uses dark mode (dark-only per user decision; toggle removed)
- [ ] **DSGN-02**: Site supports DLC toggle to show/hide Spaced Out! DLC content
- [x] **DSGN-03**: All data is tagged with base game vs DLC applicability in the data layer

### Infrastructure

- [x] **INFR-01**: Site is built with Astro as a static site generator with structured content collections
- [x] **INFR-02**: Game data is stored as structured JSON/YAML files, separate from templates
- [x] **INFR-03**: Site deploys automatically to GitHub Pages via GitHub Actions on push
- [x] **INFR-04**: Site loads in under 2 seconds on typical connections
- [x] **INFR-05**: Site is responsive and usable on mobile devices

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Visual Design

- **DSGN-04**: ONI-themed playful design (teal/orange palette, cartoony feel, game-inspired typography)
- **DSGN-05**: Visual diagram placeholder slots for each reference section

### Content Enhancement

- **CONT-01**: At-a-glance build blueprints showing exact tile layouts for common builds
- **CONT-02**: Power/plumbing circuit diagrams (simplified schematics)
- **CONT-03**: Cross-reference tooltips/links between related data points
- **CONT-04**: "What feeds what" production chain flowcharts

### Navigation Enhancement

- **NAV-03**: Keyboard navigation shortcuts for power users
- **NAV-04**: Print-friendly stylesheet for offline reference

### Data Quality

- **DATA-01**: Version badge showing "Verified for [game version]" on each page

## Out of Scope

| Feature | Reason |
|---------|--------|
| Full wiki / exhaustive database | This is a curated cheat sheet, not a wiki. Link to wiki for deep dives. |
| Interactive calculators | Separate product. Link to ONI Assistant and Duplicity instead. |
| User accounts / authentication | Static site, no backend needed |
| Comments / forums / community | Requires moderation and database. Link to Reddit/Klei forums. |
| Build sharing / uploading | User-generated content needs storage and moderation |
| Patch notes / news tracking | Different content cadence. Link to Klei's official notes. |
| Mod support / mod data | Mods change constantly. Base game + official DLC only. |
| Complex animations | Fight the "fast glanceable" core value |
| SEO-driven blog content | Dilutes reference focus |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| NAV-01 | Phase 1 | Complete |
| NAV-02 | Phase 4 | Pending |
| ROOM-01 | Phase 2 | Complete |
| ROOM-02 | Phase 2 | Complete |
| ROOM-03 | Phase 2 | Complete |
| RNCH-01 | Phase 2 | Pending |
| RNCH-02 | Phase 2 | Pending |
| RNCH-03 | Phase 2 | Pending |
| RNCH-04 | Phase 2 | Pending |
| FARM-01 | Phase 3 | Pending |
| FARM-02 | Phase 3 | Pending |
| FARM-03 | Phase 3 | Pending |
| POWR-01 | Phase 3 | Pending |
| POWR-02 | Phase 3 | Pending |
| POWR-03 | Phase 3 | Pending |
| POWR-04 | Phase 3 | Pending |
| DSGN-01 | Phase 1 | Complete |
| DSGN-02 | Phase 4 | Pending |
| DSGN-03 | Phase 1 | Complete |
| INFR-01 | Phase 1 | Complete |
| INFR-02 | Phase 1 | Complete |
| INFR-03 | Phase 1 | Complete |
| INFR-04 | Phase 1 | Complete |
| INFR-05 | Phase 1 | Complete |

**Coverage:**
- v1 requirements: 24 total
- Mapped to phases: 24
- Unmapped: 0

---
*Requirements defined: 2026-03-08*
*Last updated: 2026-03-08 after roadmap creation*
