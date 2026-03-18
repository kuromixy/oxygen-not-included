# Phase 4: Site Search - Context

**Gathered:** 2026-03-18
**Status:** Ready for planning

<domain>
## Phase Boundary

Client-side search across all site content using Pagefind. Users can type a query and find matching pages with relevant context. This is the final MVP phase — search completes the site's navigation story.

</domain>

<decisions>
## Implementation Decisions

### Search bar placement
- Search input lives in the navbar on desktop, alongside existing category links
- On mobile: magnifying glass icon in the header that expands to a full-width input when tapped
- No keyboard shortcut (no Ctrl+K or / key binding)

### Results presentation
- Dropdown overlay below the search input, overlaying the page content (not a full page or modal)
- Each result shows: page title + category badge (e.g., "Ranching", "Farming") — no text snippets
- Maximum 5 results visible before scrolling
- Clicking outside or pressing Escape closes the dropdown but keeps the query text in the input

### Search behavior
- As-you-type search with debounce (~200ms)
- Minimum 3 characters before search triggers
- Flat list ranked by relevance — no grouping or category filters
- Simple "No results found" text on empty results (no browse suggestions)
- Index covers rendered page text only — no special handling for YAML stat values

### Claude's Discretion
- Search bar visual styling (should fit existing navbar aesthetic)
- Pagefind configuration details (index settings, weight tuning)
- Exact debounce timing
- Dropdown animation/transition
- Loading state while Pagefind initializes
- Category badge color mapping

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard Pagefind integration approaches.

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Navbar.astro**: Desktop flex row with gap-6 has room for a search input. Mobile section has hamburger toggle — search icon would sit alongside it.
- **BaseLayout.astro**: All pages use this layout, so Navbar changes propagate everywhere automatically.

### Established Patterns
- Inline `<script is:inline>` for client-side interactivity (used in Navbar hamburger toggle, RanchBuildTabs)
- Tailwind utility classes for all styling — no separate CSS files for components
- Dark-mode-only design with oni-bg-surface, oni-bg-elevated, oni-teal, oni-text-muted color tokens

### Integration Points
- Navbar.astro is the single place to add search UI (both desktop and mobile)
- Pagefind needs to be added to the Astro build pipeline (astro.config.mjs or postbuild)
- GitHub Actions deploy workflow may need a Pagefind build step

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-site-search*
*Context gathered: 2026-03-18*
