# Project Research Summary

**Project:** ONI Fanpage (Oxygen Not Included quick-reference site)
**Domain:** Static game reference / cheat-sheet fanpage
**Researched:** 2026-03-08
**Confidence:** MEDIUM

## Executive Summary

This project is a **content-driven static reference site** for the game Oxygen Not Included -- a curated cheat sheet, not a wiki. The expert approach for this type of site is to separate structured game data (JSON/YAML) from presentation templates, build everything at compile time into zero-JavaScript static HTML, and deploy to GitHub Pages. Astro is the clear SSG choice: its content collections with Zod schemas provide typed, validated game data; its zero-JS-by-default philosophy matches the "instant alt-tab lookup" use case perfectly; and it has first-class GitHub Pages deployment support.

The recommended approach is to build an ONI-themed design system first (the primary differentiator over the utilitarian wiki), establish the data schema with DLC/version tagging from day one, then prove the full pipeline end-to-end with a single content domain (room sizes / ranching) before expanding. Tailwind CSS handles layout utilities while custom CSS properties carry the ONI visual identity. Content lives in version-controlled YAML/JSON files editable directly on GitHub, with auto-deploy on push -- keeping the "update one number" workflow under 5 minutes.

The top risks are: (1) hardcoding game data into HTML instead of structured data files, which makes updates painful and leads to site abandonment; (2) scope creep from cheat sheet into wiki territory, destroying the core "glanceable" value proposition; and (3) designing for images that do not exist yet, creating a permanently "placeholder" site. All three are prevented by strict architectural decisions in Phase 1 -- data layer separation, content templates with a "Name, Numbers, Diagram, Done" rule, and progressive image enhancement where layouts work without images.

## Key Findings

### Recommended Stack

Astro 5.x as the static site generator, chosen for its content collections (typed schemas via Zod), zero client-side JavaScript by default, and built-in image optimization. Tailwind CSS 4.x for utility-first layout with CSS-first configuration. All game data stored as JSON/YAML in content collections, validated at build time.

**Core technologies:**
- **Astro 5.x**: Static site generator -- zero-JS output, content collections with Zod schemas, built-in image optimization, official GitHub Pages adapter
- **Tailwind CSS 4.x**: Utility CSS -- rapid card/table layout prototyping, automatic CSS purging, CSS-first config (no JS config file)
- **Pagefind 1.x** (Phase 2+): Static search -- build-time index generation, no server needed, loads only relevant chunks
- **GitHub Actions + GitHub Pages**: CI/CD and hosting -- free, auto-deploys on push to main, zero operational overhead
- **TypeScript 5.x**: Type safety for content schemas -- lightweight usage via Zod inference, no complex app logic

**What NOT to use:** React/Next.js/Vue/Nuxt (unnecessary runtime), Jekyll/Hugo (inferior content model), any CMS (overkill for developer-managed game data), Bootstrap (fights custom theming).

### Expected Features

**Must have (table stakes):**
- Organized topic navigation (Ranching, Farming, Power, Plumbing, Base Layouts)
- Key numbers front and center in scannable stat cards, not prose
- Room size / dimension reference (most universally looked up)
- Critter ranching quick-reference tables
- Crop / farming data tables
- Visual diagram slots (placeholder-first, real images later)
- Mobile-friendly responsive layout
- Fast page load (static HTML/CSS, no framework runtime)
- Accurate data with game version notation

**Should have (differentiators):**
- ONI-themed playful design (teal/orange palette, rounded corners, cartoony feel) -- the #1 differentiator
- Dark mode (low effort, high impact for late-night gaming sessions)
- At-a-glance build blueprints with dimensions overlaid
- Power/plumbing circuit diagrams (schematic style, not screenshots)
- Cross-reference links between related data
- Client-side search via Pagefind
- DLC toggle (base game vs Spaced Out!)

**Defer (v2+):**
- "What feeds what" production chain view (high complexity, niche value)
- Print-friendly stylesheet
- Keyboard navigation shortcuts
- Interactive calculators (link to existing community tools instead)

**Anti-features (never build):** Full wiki, user accounts, comments/forums, build sharing, mod support, SEO blog content, complex animations.

### Architecture Approach

A content-driven static architecture with three clean layers: structured data files (JSON/YAML per game domain), layout templates (stat cards, comparison tables, diagram layouts), and a design system (ONI-themed CSS tokens). The SSG combines data and templates at build time into static HTML deployed to GitHub Pages. This separation means updating a game stat is a single JSON edit, redesigning cards is a single template edit, and adding a new critter is one data entry -- no code changes touch multiple concerns.

**Major components:**
1. **Content Data Layer** -- JSON/YAML files per domain (ranching, farming, power, plumbing, rooms) with Zod-validated schemas including DLC tags and version fields
2. **Layout Templates** -- Three core types: Stat Card (single item), Comparison Table (side-by-side), Diagram (full-width visual build)
3. **Design System** -- ONI color tokens, card components, responsive grid, typography scale; theme the chrome, keep data presentation clean
4. **Navigation Shell** -- Header, category nav, sub-topic nav, search bar, footer with version/credits
5. **Build/Deploy Pipeline** -- GitHub Actions: install, build, deploy to Pages on push to main

### Critical Pitfalls

1. **Hardcoding game data into HTML** -- Store ALL numbers in JSON/YAML data files, never in templates. One source of truth per domain. Include `gameVersion` field. Must be established in Phase 1; retrofitting is a near-complete rewrite.
2. **Scope creep into wiki territory** -- Enforce strict content templates: Name, Key Numbers, Diagram, Done. If a section has more than 3-4 sentences of prose, it belongs on the wiki. Review every addition against "would a player alt-tab to read this?"
3. **Image-dependent design without images** -- Design layouts that work WITHOUT images. Use CSS aspect-ratio boxes, define exact dimensions per context, prefer SVG diagrams over screenshots. Images enhance, never define, the layout.
4. **No DLC/version tagging in data** -- Tag every entry with `appliesTo: ["base", "spaced_out"]` from the start. Default to showing Spaced Out! data with badges where base game differs. Schema must support this from Phase 1.
5. **Deployment friction killing updates** -- Keep build simple, structure data for GitHub web editing, auto-deploy on push. The "update one number" workflow must take under 5 minutes.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation and Design System
**Rationale:** Everything depends on three decisions made correctly upfront: data schema design, build system setup, and the ONI-themed design system. Getting these wrong means rewriting later. The design system IS the differentiator -- it must be baked in from the start, not bolted on.
**Delivers:** Astro project scaffolded with content collections, Zod schemas for all data domains (with DLC/version tags), ONI-themed CSS design system (color tokens, stat card component, responsive grid), base layout with navigation shell, GitHub Actions auto-deploy pipeline, one placeholder page proving the full pipeline end-to-end.
**Addresses:** Organized topic navigation, fast page load, mobile-friendly layout, ONI-themed design, dark mode
**Avoids:** Hardcoding data (#1), over-engineering tooling (#5), ignoring mobile (#7), theme hurting readability (#10), deployment friction (#8)

### Phase 2: First Content Domain (Rooms and Ranching)
**Rationale:** Room sizes are the most universally looked-up data and the simplest to compile. Ranching is the second most looked-up and exercises the full stat card + comparison table template patterns. Completing one domain end-to-end proves the architecture before scaling to more content.
**Delivers:** Complete room size reference (all room types, dimensions, required buildings), complete critter ranching reference (all critter families with variants, diet, output, stable requirements), placeholder diagram slots with SVG illustrations, "verified for [game version]" badges.
**Addresses:** Room size reference, critter ranching quick-ref, key numbers front and center, visual diagram placeholders, accurate versioned data
**Avoids:** Wiki-style prose (#2), inconsistent accuracy (#9), empty sections visible (#11)

### Phase 3: Expanded Content (Farming, Power, Plumbing)
**Rationale:** With templates proven in Phase 2, remaining content domains reuse existing patterns. These can be developed in parallel. Farming, power, and plumbing are the next tier of lookup frequency.
**Delivers:** Crop/farming data tables, power generator/battery reference, plumbing reference, base layout reference with room overlay data. All using established stat card and table templates.
**Addresses:** Crop/farming data, power/plumbing reference, base layout reference
**Avoids:** Scope creep (#2), data inconsistency (#9)

### Phase 4: Visual Enhancement and Search
**Rationale:** Search becomes justified once there is enough content to search (50+ items). Build blueprints and circuit diagrams are the "hero differentiator" content but require the data pages to exist first as context. DLC toggle requires all data to be tagged (done in Phase 1 schema).
**Delivers:** Pagefind client-side search, at-a-glance build blueprint diagrams (CSS grid or SVG), power/plumbing circuit diagrams, cross-reference links between sections, DLC content toggle.
**Addresses:** Search/quick-find, build blueprints, circuit diagrams, cross-reference tooltips/links, DLC toggle
**Avoids:** Image-first design without fallback (#3)

### Phase 5: Polish and Progressive Enhancement
**Rationale:** These features are low-priority enhancements that only matter once the core experience is solid.
**Delivers:** Real screenshot replacement for placeholders, print-friendly stylesheet, keyboard navigation, patch update banner, performance optimization.
**Addresses:** Remaining differentiators and nice-to-haves
**Avoids:** Complex animations (anti-feature)

### Phase Ordering Rationale

- **Data schema and design system first** because both are nearly impossible to retrofit. Every research file independently identified "get the data layer right from Phase 1" as critical.
- **One complete domain before expanding** because it validates the full pipeline (data -> schema -> template -> build -> deploy) with minimal content investment. If the architecture is wrong, you find out with 10 data entries, not 100.
- **Content expansion before visual enhancement** because the site's value is in the numbers, not the pictures. A complete text reference with placeholder images is useful; a beautiful site with incomplete data is not.
- **Search after content exists** because Pagefind indexes at build time -- it needs content to index. Adding search to a half-empty site creates a bad first impression.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 1 (Foundation):** Verify Astro 5.x and Tailwind 4.x current versions and integration APIs. Version numbers are from May 2025 training data. Also research Astro content collection config patterns for the specific schema needs (DLC tagging, nested variant data).
- **Phase 4 (Visual Enhancement):** Research Pagefind integration with Astro specifically. Research SVG diagram approaches for build blueprints -- whether to hand-draw, use a diagramming library, or use CSS grid overlays.

Phases with standard patterns (skip research-phase):
- **Phase 2 (First Content Domain):** Well-established patterns. Just compile game data and apply templates.
- **Phase 3 (Expanded Content):** Direct reuse of Phase 2 patterns with different data.
- **Phase 5 (Polish):** Standard CSS and progressive enhancement techniques.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | MEDIUM | Astro + Tailwind recommendation is architecturally sound (HIGH) but specific version numbers need verification (MEDIUM). No web search was available during research. |
| Features | MEDIUM-HIGH | Table stakes and anti-features are HIGH confidence based on established game reference site patterns. Differentiator prioritization is MEDIUM -- based on ONI community patterns from training data. |
| Architecture | HIGH | Content-driven static site with data separation is a well-established, battle-tested pattern. Component boundaries are clear and standard. |
| Pitfalls | MEDIUM-HIGH | All pitfalls identified are common failure modes in fan site / game reference projects. The ONI-specific pitfalls (DLC tagging, data accuracy) are well-grounded in the game's community history. |

**Overall confidence:** MEDIUM

The architectural approach and feature priorities are solid. The main uncertainty is in specific tool versions and integration details, which are straightforward to verify at project start.

### Gaps to Address

- **Version verification:** Astro, Tailwind, Pagefind versions need checking against current releases before scaffolding. Claimed versions are from May 2025 training data.
- **ONI data accuracy:** Game stat numbers need to be verified against the current game version during content phases. Research identified the patterns and schemas but not the actual data values.
- **Image/diagram approach:** The specific technique for build blueprint diagrams (pure CSS grid, SVG, or a library) was not deeply researched. Needs investigation in Phase 4 planning.
- **Astro content collection specifics:** The exact configuration for nested schemas (critter variants, DLC conditional fields) should be prototyped early in Phase 1.

## Sources

### Primary (HIGH confidence)
- PROJECT.md constraints and scope definition
- Astro documentation patterns (astro.build/docs) -- training data through May 2025
- GitHub Pages deployment documentation (docs.github.com/en/pages)
- Established static site architecture patterns across SSG ecosystem

### Secondary (MEDIUM confidence)
- ONI community ecosystem: ONI Wiki, ONI Assistant, Reddit r/Oxygennotincluded, Klei Forums, Steam Community Guides -- known from training data
- Game reference site patterns from adjacent domains: Factorio cheat sheets, Satisfactory reference tools, Stardew Valley reference sites
- Tailwind CSS v4 documentation -- training data
- Pagefind documentation (pagefind.app) -- training data

### Tertiary (LOW confidence)
- Specific version numbers for all packages -- need live verification before use

---
*Research completed: 2026-03-08*
*Ready for roadmap: yes*
