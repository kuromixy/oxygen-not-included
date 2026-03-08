# Domain Pitfalls

**Domain:** Static game reference / fanpage (Oxygen Not Included)
**Researched:** 2026-03-08

## Critical Pitfalls

Mistakes that cause rewrites or major issues.

### Pitfall 1: Hardcoding Game Data into HTML Templates

**What goes wrong:** Game stats (critter counts, temperatures, wattages, pipe throughput) get embedded directly into HTML markup. When Klei releases a patch or DLC update that changes values, you have to hunt through dozens of HTML files to find and update every instance of a number. You miss some, and now your "quick reference" is telling players the wrong stable size or the wrong calorie output.

**Why it happens:** It feels faster to just type `<td>96 tiles</td>` than to set up a data layer. For a "small static site" it seems like overkill to separate data from presentation.

**Consequences:** Data rot. Players lose trust after finding one wrong number. Updating becomes a dreaded chore instead of a quick edit. Eventually the site falls out of date and gets abandoned -- the number one killer of fan sites.

**Prevention:**
- Store ALL game data in structured JSON/YAML files, separate from templates
- Templates pull from data files at build time
- One source of truth per data domain (e.g., `critters.json`, `crops.json`, `power.json`)
- Include a `gameVersion` field in data files so you know what patch they reflect

**Detection:** If you find yourself typing a game number directly into an HTML file, stop. That number belongs in a data file.

**Phase:** Must be established in Phase 1 (foundation). Retrofitting a data layer onto hardcoded HTML is a near-complete rewrite.

---

### Pitfall 2: Building a Wiki Instead of a Cheat Sheet

**What goes wrong:** Scope creep turns a quick-reference into a comprehensive wiki. You start adding explanations, tutorials, edge cases, history of changes, alternative strategies -- and suddenly the "glanceable" reference requires scrolling through paragraphs to find the one number the player needs.

**Why it happens:** When you know a game well, you want to share ALL the knowledge. "I should mention that this only works in the base game" becomes a paragraph about DLC differences, which becomes a comparison table, which becomes a full guide.

**Consequences:** The core value proposition (instant lookup mid-game) is destroyed. Players go back to the wiki because your site is now just a worse wiki. Development time balloons. Content never feels "done."

**Prevention:**
- Define a strict content template per category: Name, Key Numbers, Diagram, Done
- Hard rule: if a section has more than 3-4 sentences of prose, it belongs on the wiki, not here
- Each reference card should be answerable in under 5 seconds of scanning
- Use a "See also: [wiki link]" pattern to redirect depth-seekers elsewhere
- Review every content addition against the question: "Would a player Alt-Tab to read this?"

**Detection:** Any page that requires scrolling to find the key stat. Any content review where you say "well, it depends on..." -- that nuance belongs elsewhere.

**Phase:** Content guidelines must be defined in Phase 1. Enforce during every content phase.

---

### Pitfall 3: Image-First Design Without Image Fallback Strategy

**What goes wrong:** The design looks great with placeholder boxes, but when it comes time to add real screenshots/diagrams, the images are inconsistent sizes, the layout breaks, screenshots become outdated with game updates, and image-heavy pages load slowly on GitHub Pages (no CDN optimization, no image processing pipeline).

**Why it happens:** "Placeholder images initially, real screenshots later" sounds simple, but nobody plans the pipeline for creating, sizing, compressing, and maintaining images consistently.

**Consequences:** The site either stays permanently in "placeholder" state, or images get added ad-hoc with inconsistent quality. Large unoptimized PNGs make the site slow. Screenshots from different game versions look inconsistent.

**Prevention:**
- Define exact image dimensions per context (card thumbnail: 300x200, diagram: 600x400, etc.)
- Create a simple image pipeline: source images in one folder, build step optimizes/resizes to WebP
- Design the layout so it works WITHOUT images (images enhance, not define, the layout)
- Use CSS aspect-ratio boxes so layout never shifts when images load
- For diagrams, prefer simple SVG/CSS illustrations over screenshots where possible -- they never go out of date

**Detection:** If removing all images from a page makes it useless, the design is too image-dependent. If you have no documented image dimensions, every contributor will guess differently.

**Phase:** Image strategy in Phase 1 (design system). Image pipeline in Phase 2 (build tooling). Actual image creation can be later phases.

---

### Pitfall 4: No Content Versioning Strategy for Game Updates

**What goes wrong:** ONI has the base game AND the Spaced Out! DLC, which change fundamental mechanics (e.g., different asteroid types, rocketry overhaul, radiation). The site either ignores DLC differences (wrong for DLC players), duplicates everything (maintenance nightmare), or tries an awkward toggle that breaks constantly.

**Why it happens:** It is tempting to treat ONI as one game with one set of numbers. But Spaced Out! changed enough core mechanics that some reference data differs between base game and DLC.

**Consequences:** Players on base game get DLC-specific advice. DLC players miss DLC-specific content. Or worse, data is ambiguous about which version it applies to.

**Prevention:**
- In data files, tag entries with `appliesTo: ["base", "spaced_out"]` or similar
- Default to showing Spaced Out! data (most active players use DLC) with a small badge/note when base-game differs
- Do NOT build two parallel sites -- use conditional rendering or badges within a single layout
- Keep a list of mechanics that differ between base and DLC to audit against

**Detection:** If you cannot answer "does this number apply to base game, DLC, or both?" for every data point, this pitfall is active.

**Phase:** Data schema must support this from Phase 1. Visual treatment (badges/toggles) in the design phase.

## Moderate Pitfalls

### Pitfall 5: Over-Engineering the Static Site Generator Choice

**What goes wrong:** Weeks spent evaluating Astro vs Hugo vs 11ty vs Next.js export vs hand-rolled HTML. Analysis paralysis on tooling when the site's actual complexity is modest -- it is structured data rendered into themed HTML pages.

**Why it happens:** Developer instinct to pick the "right" tool. The static site generator market is crowded and everyone has opinions.

**Prevention:**
- This is a data-driven reference site, not a blog or web app. Pick a generator that excels at "take JSON, produce pages" and move on
- Decision should take less than a day. If it has a template engine, can read JSON data files, and deploys to GitHub Pages, it works
- Avoid frameworks that require a JavaScript runtime on the client (React/Next.js) -- this is static content, not an app

**Detection:** If you have been evaluating tools for more than 2 days, just pick one and start building.

**Phase:** Resolved in Phase 1 (project setup). Do not revisit.

---

### Pitfall 6: Neglecting Search and Navigation for Reference Content

**What goes wrong:** The site has great content but players cannot find what they need quickly. A player wants to know "how many Hatches fit in a stable" and has to click through Home > Ranching > Critters > Hatches > Stable Setup to find it. That is four clicks for one number -- worse than the wiki.

**Why it happens:** Organizing content hierarchically feels natural to the author. But reference lookups are not hierarchical -- they are search-oriented. Players think in questions, not categories.

**Prevention:**
- Add client-side search early (a lightweight library like Pagefind or Lunr indexes static content at build time -- no server needed)
- Design navigation around lookup patterns, not content taxonomy: "What fits in a 96-tile room?" not "Ranching > Critters > Hatches"
- Cross-link aggressively: a power page should link to the generators that pair with it
- Consider a single-page "cheat sheet" mode that puts the most-referenced numbers all on one scrollable page

**Detection:** Time yourself looking up a specific fact. If it takes more than 2 clicks or 5 seconds, navigation needs work.

**Phase:** Navigation structure in Phase 1 (information architecture). Search implementation in Phase 2 or 3.

---

### Pitfall 7: Ignoring Mobile Viewport for a "Desktop Game" Site

**What goes wrong:** Because ONI is a PC game, the developer assumes everyone will view the reference site on a desktop monitor. Tables and diagrams are designed for wide screens. But many players use a phone or tablet as a "second screen" reference while playing on their PC.

**Why it happens:** The assumption that PC game = PC browser. In reality, having the reference on a second device (phone propped up next to the monitor) is extremely common.

**Prevention:**
- Design mobile-first or at least mobile-aware from the start
- Tables must be responsive (horizontal scroll or card-based layout on narrow screens)
- Test at 375px width throughout development
- Diagrams should have a mobile-readable version or be zoomable

**Detection:** Open any page at 375px width. If data is cut off or requires pinch-zooming, this pitfall is active.

**Phase:** Must be part of the design system in Phase 1. Much harder to retrofit responsive design.

---

### Pitfall 8: GitHub Pages Deployment Friction Killing Updates

**What goes wrong:** The build/deploy process is complex enough that updating a single number feels like a chore. You have to clone the repo, set up the build environment, make the change, build, test, push, wait for GitHub Actions. For a one-number fix, this is absurd friction.

**Why it happens:** Build tooling optimized for initial development, not for ongoing maintenance (which is 90% of a reference site's life).

**Prevention:**
- Keep the build simple: install dependencies, run build, done. No Docker, no complex CI pipelines
- Structure data files so they can be edited directly on GitHub's web interface (JSON/YAML in a `/data` folder)
- Set up GitHub Actions so pushing to main auto-deploys -- no manual steps
- Document the "update one number" workflow: edit file on GitHub.com, commit, auto-deploys in 2 minutes

**Detection:** If updating a single game stat takes more than 5 minutes end-to-end, the process is too heavy.

**Phase:** CI/CD setup in Phase 1. Optimize the edit workflow before adding content.

## Minor Pitfalls

### Pitfall 9: Inconsistent Data Accuracy Across Sections

**What goes wrong:** Some sections are meticulously verified against the game, others are copied from outdated Reddit posts or the wiki without verification. Players find one wrong number and distrust the entire site.

**Prevention:**
- Add a `verified: true/false` and `lastVerified: date` field to data entries
- Display a small "verified for [game version]" badge on each reference card
- Prioritize verifying the most-used data first rather than trying to verify everything at once

**Phase:** Data schema supports this from Phase 1. Verification is ongoing throughout content phases.

---

### Pitfall 10: Theming That Hurts Readability

**What goes wrong:** The ONI-themed playful design uses game-like fonts, dark backgrounds with colored text, and decorative elements that make the actual reference data harder to read quickly. Fun aesthetics fight the core purpose (instant lookups).

**Prevention:**
- Numbers and key stats must have maximum contrast and readability -- no decorative fonts on data
- Theme the chrome (headers, backgrounds, navigation) but keep data presentation clean and scannable
- Test with the "squint test" -- squint at the page; the numbers/key data should still be the most visible elements
- Use the ONI color palette for accents, not for body text or data cells

**Detection:** If a friend who does not play ONI cannot quickly find the "main number" on a reference card, the design is too themed.

**Phase:** Design system in Phase 1. Visual QA checkpoint in each content phase.

---

### Pitfall 11: Not Planning for Content that Does Not Exist Yet

**What goes wrong:** The site launches with 3 of 8 planned sections complete. The empty sections show broken links, "coming soon" pages, or are simply missing from navigation. The site feels abandoned before it starts.

**Prevention:**
- Only expose sections in navigation that have content
- Use feature flags or a simple `published: true/false` in data to control what appears
- Design the landing page to showcase what IS available, not what will be
- Launch with one excellent, complete section rather than eight incomplete ones

**Detection:** Any "coming soon" text on the live site is a red flag.

**Phase:** Content publishing controls in Phase 1 (template logic). Content prioritization in roadmap planning.

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Foundation / Setup | Over-engineering tooling choice (#5) | Time-box to 1 day. Pick what handles JSON-to-HTML well |
| Data Architecture | Hardcoding data into HTML (#1) | Enforce JSON/YAML data layer from day one |
| Data Architecture | No version/DLC tagging (#4) | Schema must include `appliesTo` and `gameVersion` fields |
| Design System | Theme hurting readability (#10) | Data readability > aesthetics. Squint test everything |
| Design System | Ignoring mobile (#7) | Mobile-first or mobile-aware from the start |
| Content Creation | Scope creep to wiki (#2) | Strict content templates: Name, Numbers, Diagram, Done |
| Content Creation | Inconsistent accuracy (#9) | Verification fields in data, badge on rendered cards |
| Image / Visual | No image pipeline (#3) | Define dimensions, use CSS aspect-ratio, prefer SVG |
| Deployment | Update friction (#8) | GitHub web-editable data files, auto-deploy on push |
| Launch | Empty sections visible (#11) | Only ship sections with complete content |

## Sources

- Domain knowledge: patterns observed across game wiki/reference projects (Factorio cheat sheets, Satisfactory reference tools, ONI community tools, Stardew Valley reference sites)
- GitHub Pages deployment constraints: static-only hosting, GitHub Actions for build
- ONI-specific: base game vs Spaced Out! DLC mechanical differences are well-documented in the community
- Confidence: MEDIUM (based on established patterns in the game reference site domain; no live web verification performed for this session)
