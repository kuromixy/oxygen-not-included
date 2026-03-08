# Feature Landscape

**Domain:** Game reference / cheat sheet fanpage (Oxygen Not Included)
**Researched:** 2026-03-08
**Confidence:** MEDIUM (based on domain knowledge of game reference sites and the ONI community ecosystem; web search unavailable for live verification)

## Table Stakes

Features users expect from a game reference/cheat sheet site. Missing any of these and visitors bounce back to the wiki.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Organized topic navigation** | Players come for ONE thing — they need to find it in seconds. Category nav (Ranching, Farming, Power, Plumbing, Base Layout) is the minimum. | Low | Top-level nav with clear section labels. Anchor links or single-page sections both work. |
| **Key numbers front and center** | The entire value prop. Stable size: 96 tiles. Hatch calories: 140 kcal/cycle. These numbers must be scannable, not buried in prose. | Low | Use bold/highlighted stat blocks, not paragraph text. Think "data card" not "article." |
| **Room size / dimension reference** | ONI rooms have minimum/maximum tile requirements. Every player looks this up repeatedly. | Low | Table or card format: room type, min tiles, max tiles, required buildings. |
| **Critter ranching quick-ref** | Ranching is one of the most complex and looked-up systems. Critter type, diet, output, stable capacity, grooming needs. | Med | One table per critter family (Hatch, Drecko, Pacu, etc.) with variants. |
| **Crop / farming data** | Temperature ranges, irrigation needs, fertilizer, growth time, calories produced. Players cross-reference constantly. | Med | Compact table format. Must include DLC crops (Spindly Grubfruit, etc.). |
| **Visual diagrams / build layouts** | A reference without visuals is just a spreadsheet. Players need to see the build, not just read dimensions. | Med | Placeholder-first is fine, but the layout MUST reserve space for images. Image slots are table stakes even if content comes later. |
| **Mobile-friendly / responsive layout** | Players look things up on a phone next to their PC, or on a second monitor at odd sizes. | Med | Responsive CSS. Not a mobile app, but must not break on phone screens. |
| **Search or quick-find** | With 50+ data points across topics, scrolling is not enough. At minimum: Ctrl+F friendly structure. Better: a simple client-side search/filter. | Med | Start with well-structured headings (Ctrl+F works). Client-side search is a strong phase-2 add. |
| **Accurate, versioned data** | Wrong numbers destroy trust instantly. Must reflect current game version including Spaced Out! DLC. | Low | Display a "Last verified: [game version]" note. Data accuracy is editorial, not technical. |
| **Fast page load** | Static reference site that takes 3 seconds to load is a failure. Users are alt-tabbing from the game. | Low | Static HTML/CSS. No heavy JS frameworks. Lighthouse score matters. |

## Differentiators

Features that set this site apart from the ONI Wiki, Reddit posts, and Steam guides. Not expected, but create "bookmark this" moments.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **ONI-themed playful design** | The wiki is utilitarian. Steam guides are plain text. A site that FEELS like ONI (color palette, dupes, cartoony style) creates emotional connection and memorability. | Med | Use ONI's teal/orange/warm palette. Rounded corners, playful typography. This is the #1 differentiator per PROJECT.md. |
| **At-a-glance build blueprints** | Not just "stable is 96 tiles" but a visual grid showing exactly how to lay it out with the critter drop, grooming station placement, auto-sweeper range. | High | These are the "hero content" pieces. Start with simple grid diagrams (CSS grid or SVG), upgrade to screenshots later. |
| **Power/plumbing circuit diagrams** | Show the wiring and piping, not just the numbers. "Here's how to wire a SPOM" as a clean diagram. | High | Simplified schematic-style diagrams. Not game screenshots — cleaner, labeled diagrams. |
| **Cross-reference tooltips/links** | Hover over "Bristle Blossom" in a farming table and see its water needs, or click to jump to the irrigation section. Interconnected data. | Med | Progressively enhance. Start with internal anchor links, add tooltips later. |
| **Dark mode** | Players gaming late at night. Alt-tab to a blinding white site? No thanks. | Low | CSS custom properties make this trivial. Default to dark or respect system preference. |
| **Print-friendly / offline view** | Some players want to print a cheat sheet or save as PDF. A print stylesheet that strips nav and formats tables cleanly. | Low | @media print CSS. Low effort, high delight for the subset who want it. |
| **Keyboard navigation** | Power users want to jump between sections with keyboard shortcuts (j/k or number keys). | Low | Nice-to-have. Progressive enhancement with minimal JS. |
| **"What feeds what" food chain view** | Show the full production chain: Mealwood -> Liceloaf -> Duplicant. Or: Hatch eats Sedimentary Rock -> produces Coal -> Coal Generator -> Power. | High | This is genuinely novel for a reference site. Could be a simple flowchart or Sankey-style diagram. Phase 3+ feature. |
| **DLC toggle** | Let users show/hide Spaced Out! DLC content so base-game-only players aren't confused. | Med | Filter toggle that shows/hides DLC-tagged items. Requires data tagging. |
| **Seasonal/patch update banner** | When a major patch drops, a small banner saying "Updated for [patch]" builds trust. | Low | Simple HTML banner, manually updated. |

## Anti-Features

Features to explicitly NOT build. These are scope traps that would turn a cheat sheet into a wiki or a web app.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Full wiki / exhaustive database** | PROJECT.md explicitly scopes this out. A wiki needs hundreds of pages, community editors, and constant maintenance. The value here is curation, not comprehensiveness. | Curate the 20% of data that covers 80% of player lookups. Link to the wiki for deep dives. |
| **Interactive calculators** | Calorie calculators, power grid simulators, etc. are cool but are a separate product. They require significant JS, testing, and maintenance when game mechanics change. | Link out to existing community tools (e.g., ONI Assistant, Duplicity). Focus on static reference. |
| **User accounts / authentication** | Static site. No backend. Adding auth means adding a backend. | Not needed. No personalization features that require it. |
| **Comments / forums / community** | Community features require moderation, spam prevention, a database. Completely different product. | Link to Reddit r/Oxygennotincluded and Klei forums for discussion. |
| **Build sharing / uploading** | User-generated content needs storage, moderation, abuse prevention. | Link to existing build-sharing communities. |
| **Patch notes / news tracking** | Becomes stale immediately if not maintained. Different content cadence than reference data. | Link to Klei's official patch notes. |
| **Mod support / mod data** | Mods change constantly. Supporting mod data multiplies maintenance by 10x+ with no clear boundary. | Base game + official DLC only. State this clearly. |
| **Complex animations / transitions** | Slow down the page. Distract from the reference purpose. Fight the "fast glanceable" requirement. | Subtle CSS transitions at most. No scroll-jacking, parallax, or animated backgrounds. |
| **SEO-driven blog content** | "Top 10 ONI tips" articles are a different content strategy. They dilute the reference focus and require ongoing writing. | Pure reference content. Let the data be the SEO draw. |

## Feature Dependencies

```
Organized topic navigation ─── (required by all content features)
    ├── Room size reference
    ├── Critter ranching quick-ref
    ├── Crop / farming data
    ├── Power / plumbing reference
    └── Base layout reference

Key numbers front and center ─── (design pattern, not a "feature" to build)
    └── Applies to ALL data sections

Visual diagrams ─── (requires content sections to exist first)
    ├── At-a-glance build blueprints (extends diagrams)
    └── Power/plumbing circuit diagrams (extends diagrams)

Dark mode ─── (independent, can ship anytime)

DLC toggle ─── (requires data tagging in ALL content sections)
    └── Must be planned from day 1 even if shipped later

Cross-reference tooltips ─── (requires all data sections to exist)
    └── "What feeds what" chain view (extends cross-references)

Search/filter ─── (requires well-structured content with consistent markup)

Mobile-friendly layout ─── (must be built INTO the design, not bolted on)
```

## MVP Recommendation

**Phase 1 — Ship the core cheat sheet:**

1. **Organized topic navigation** — site skeleton with clear sections
2. **Room size / dimension reference** — most universally looked up, easiest data to compile
3. **Key numbers front and center** — design pattern applied to room data
4. **ONI-themed playful design** — the differentiator, build it in from day 1
5. **Fast page load / responsive layout** — static HTML/CSS, mobile-friendly from the start
6. **Dark mode** — low effort, high impact, ship with v1

**Phase 2 — Expand data coverage:**

7. **Critter ranching quick-ref** — second most looked-up topic
8. **Crop / farming data** — third most looked-up topic
9. **Visual diagram placeholders** — reserve image slots with placeholder content
10. **Accurate version note** — "Data verified for [version]" footer

**Phase 3 — Enhance with visuals and interactivity:**

11. **At-a-glance build blueprints** — hero differentiator content
12. **Power/plumbing reference + circuit diagrams** — complex but high-value
13. **Client-side search/filter** — justified once there's enough content to search
14. **Cross-reference links** — internal linking between sections
15. **DLC toggle** — requires all data to be tagged

**Defer indefinitely:**

- **"What feeds what" chain view**: High complexity, niche value. Only if the site gains traction and someone is passionate about building it.
- **Print-friendly view**: Nice-to-have after core is solid.
- **Keyboard navigation**: Progressive enhancement, last priority.

## Confidence Notes

- Table stakes assessment: HIGH confidence. These patterns are universal across game reference sites (wiki-style sites, cheat sheet PDFs, Steam guides). The ONI community specifically values quick-lookup data.
- Differentiators: MEDIUM confidence. The "playful ONI-themed design" differentiator is strong based on the gap between existing utilitarian resources and what players would enjoy. Build blueprints and circuit diagrams are validated by the popularity of build-sharing on Reddit/Discord.
- Anti-features: HIGH confidence. These boundaries are clearly defined in PROJECT.md and align with static-site constraints.
- Feature dependencies and phasing: MEDIUM confidence. Ordering is based on lookup frequency patterns in the ONI community (rooms > ranching > farming > power) but could be adjusted based on the author's content expertise.

## Sources

- Domain knowledge of game reference site patterns (confidence: MEDIUM — not live-verified)
- ONI community ecosystem: ONI Wiki, ONI Assistant, Reddit r/Oxygennotincluded, Klei Forums, Steam Community Guides (confidence: MEDIUM — known from training data, not live-verified)
- PROJECT.md constraints and scope definition (confidence: HIGH — primary source)
- Note: Web search was unavailable during this research session. Findings should be spot-checked against current ONI community sites.
