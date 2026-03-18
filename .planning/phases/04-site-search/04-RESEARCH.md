# Phase 4: Site Search - Research

**Researched:** 2026-03-18
**Domain:** Pagefind static site search + Astro integration + custom dropdown UI
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- Search input lives in the navbar on desktop, alongside existing category links
- On mobile: magnifying glass icon in the header that expands to a full-width input when tapped
- No keyboard shortcut (no Ctrl+K or / key binding)
- Results display as a dropdown overlay below the search input, overlaying the page content (not a full page or modal)
- Each result shows: page title + category badge (e.g., "Ranching", "Farming") — no text snippets
- Maximum 5 results visible before scrolling
- Clicking outside or pressing Escape closes the dropdown but keeps the query text in the input
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

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| NAV-02 | User can search across all site content and find matching results via client-side search (Pagefind) | Pagefind JS API enables as-you-type search with `debouncedSearch()`; custom dropdown UI built with `<script is:inline>`; `data-pagefind-meta` supplies category badges; base path handled via `import.meta.env.BASE_URL` |
</phase_requirements>

---

## Summary

Pagefind is a static binary search tool that runs after Astro builds, indexing generated HTML files and producing a lightweight, chunked search bundle hosted alongside the site. Because it works at the HTML level (post-build), it integrates cleanly with Astro static output and GitHub Pages — no server required.

The user's decisions mandate a **custom dropdown UI** rather than Pagefind's built-in UI widget. That is fully supported via the Pagefind JavaScript API: dynamically import `/pagefind/pagefind.js`, call `pagefind.debouncedSearch(query)`, and render results in hand-rolled HTML. Each result object exposes `meta.title`, `url`, and custom metadata fields (category, set via `data-pagefind-meta` in page markup). The built-in UI (`@pagefind/default-ui`) should NOT be used here — the custom API path is the correct choice.

The single integration challenge unique to this project is the **GitHub Pages subpath** (`/oxygen-not-included`). Pagefind's JS API loads from `/pagefind/pagefind.js` relative to the page origin, which would be wrong under a subpath. The correct solution is to construct the import path using `import.meta.env.BASE_URL`, which Astro injects from `astro.config.mjs`'s `base` option. Alternatively, the `astro-pagefind` npm package handles this automatically.

**Primary recommendation:** Use `astro-pagefind` npm package (handles build integration + base path) + Pagefind JS API (for the custom dropdown). Add `data-pagefind-body` to `BaseLayout.astro`'s `<main>` and `data-pagefind-meta="category:..."` to each section page. Build the dropdown in `Navbar.astro` with `<script is:inline>`.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| pagefind | latest (via npx) | Post-build indexer — crawls dist/, writes pagefind/ bundle | The locked technology decision; purpose-built for static sites |
| astro-pagefind | latest | Astro integration — triggers pagefind after `astro build`, handles base path | Removes need for custom postbuild script; supports Astro's `base` config |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @pagefind/default-ui | bundled with pagefind | Prebuilt search widget | NOT used here — custom dropdown required per user decisions |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| astro-pagefind npm package | Custom `astro:build:done` hook using pagefind Node API | Package is simpler; Node API is needed only if custom indexing logic is required (not the case here) |
| astro-pagefind npm package | `"build": "astro build && npx pagefind --site dist"` in package.json | Script approach is simpler but doesn't handle GitHub Actions' `withastro/action` build, which runs `astro build` internally — the postbuild script won't fire |
| Pagefind JS API (custom dropdown) | Pagefind default UI widget | Default UI is a full widget incompatible with the custom dropdown/inline-in-navbar design |

**Installation:**

```bash
npm install astro-pagefind
```

---

## Architecture Patterns

### Recommended Project Structure

No new directories needed. Changes are:

```
src/
├── components/
│   └── Navbar.astro          # Add search input + dropdown + <script is:inline>
├── layouts/
│   └── BaseLayout.astro      # Add data-pagefind-body to <main>
└── pages/
    ├── ranching/
    │   └── *.astro            # Add data-pagefind-meta="category:Ranching" to <main> or <h1>
    ├── farming/
    │   └── *.astro            # Add data-pagefind-meta="category:Farming"
    ├── power-plumbing/
    │   └── *.astro            # Add data-pagefind-meta="category:Power & Plumbing"
    ├── geysers-volcanoes/
    │   └── *.astro            # Add data-pagefind-meta="category:Geysers"
    └── base-layouts/
        └── *.astro            # Add data-pagefind-meta="category:Base Layouts"
astro.config.mjs               # Add pagefind() to integrations[]
```

### Pattern 1: Astro Integration via astro-pagefind

**What:** Register `pagefind` integration in `astro.config.mjs`. It hooks into `astro:build:done` and runs the Pagefind indexer against the Astro output directory. Respects the `base` config automatically.

**When to use:** Always — this is the build pipeline integration.

```typescript
// Source: https://github.com/shishkin/astro-pagefind
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import pagefind from 'astro-pagefind';

export default defineConfig({
  site: 'https://kuromixy.github.io',
  base: '/oxygen-not-included',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [pagefind()],  // MUST be last integration
});
```

### Pattern 2: data-pagefind-body for Selective Indexing

**What:** Adding `data-pagefind-body` to the `<main>` element in `BaseLayout.astro` tells Pagefind to only index content inside `<main>`. Pages without `data-pagefind-body` are excluded once ANY page has it. This keeps the navbar, footer, and navigation links out of the index.

**When to use:** Always — prevents navbar link text from polluting search results.

```astro
<!-- Source: https://pagefind.app/docs/indexing/ -->
<!-- In BaseLayout.astro -->
<main data-pagefind-body class="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">
  <slot />
</main>
```

Pagefind automatically skips `<nav>`, `<footer>`, `<script>`, and `<form>` elements even without `data-pagefind-ignore`, but using `data-pagefind-body` on `<main>` is the explicit, reliable approach.

### Pattern 3: Category Metadata via data-pagefind-meta

**What:** Add a hidden metadata element (or use the inline value syntax on an existing element) on each category's pages so Pagefind stores the category string and returns it with results.

**When to use:** On every page that should show a category badge in search results.

```astro
<!-- Source: https://pagefind.app/docs/metadata/ -->
<!-- In ranching/hatches.astro, for example -->
<span data-pagefind-meta="category:Ranching" class="sr-only">Ranching</span>

<!-- Or on an existing element — no extra element needed: -->
<h1 data-pagefind-meta="category:Ranching">Hatches</h1>
```

The metadata is accessed in the JS API as `result.meta.category`.

### Pattern 4: Custom Dropdown via Pagefind JS API

**What:** Use Pagefind's JavaScript API directly — no default UI widget. Dynamically import pagefind.js, call `debouncedSearch()`, render result list manually. All UI is Tailwind-styled HTML manipulated with vanilla JS in a `<script is:inline>` block.

**When to use:** Whenever the user's design requires a custom search UI (dropdown in navbar, controlled styling, no external CSS).

```javascript
// Source: https://pagefind.app/docs/api/
// Inside <script is:inline> in Navbar.astro

// Load pagefind once, lazily on first keypress
let pagefind;
async function loadPagefind() {
  if (!pagefind) {
    // import.meta.env.BASE_URL resolves to '/oxygen-not-included/' at build time
    pagefind = await import(import.meta.env.BASE_URL + 'pagefind/pagefind.js');
    await pagefind.init();
  }
  return pagefind;
}

// Debounced search handler
let debounceTimer;
async function onInput(event) {
  const query = event.target.value.trim();
  clearTimeout(debounceTimer);
  if (query.length < 3) {
    closeDropdown();
    return;
  }
  debounceTimer = setTimeout(async () => {
    const pf = await loadPagefind();
    const search = await pf.debouncedSearch(query);
    if (!search) return; // superseded by newer search
    const top5 = search.results.slice(0, 5);
    const data = await Promise.all(top5.map(r => r.data()));
    renderResults(data);
  }, 200);
}

// Each result: { url, meta: { title, category }, ... }
function renderResults(results) { /* build dropdown HTML */ }
```

**Critical note on `import.meta.env.BASE_URL`:** This is a Vite/Astro build-time constant. In `<script is:inline>` it is NOT replaced at build time — it stays as the literal string `import.meta.env.BASE_URL`. To work around this, either:
- Use a `<script>` tag (without `is:inline`) and let Astro process it, OR
- Pass `BASE_URL` from Astro to the inline script via a `data-` attribute on the element, OR
- Hardcode the base path `/oxygen-not-included/pagefind/pagefind.js`

Recommended: use `<script>` (Astro-processed) rather than `<script is:inline>` for the search script, since Vite will handle the dynamic import correctly. The project's existing inline scripts (hamburger toggle) are simple enough to not need Astro processing — but the pagefind dynamic import does.

### Pattern 5: Escape / Click-Outside to Close

**What:** Listen for `keydown` (Escape) and `click` on `document` (filtered to outside the dropdown container) to close the results dropdown while keeping the query text.

```javascript
// Source: standard DOM pattern
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeDropdown();
});
document.addEventListener('click', (e) => {
  if (!searchContainer.contains(e.target)) closeDropdown();
});
```

### Anti-Patterns to Avoid

- **Using `<script is:inline>` with `import.meta.env.BASE_URL`:** Build-time env vars are NOT substituted in inline scripts. Use a regular `<script>` tag so Astro/Vite processes it.
- **Loading pagefind.js on page load:** Pagefind is ~50KB+ of JS. Load lazily on first keypress, not eagerly in `<head>`.
- **Using the Pagefind default UI (`@pagefind/default-ui`):** Brings its own CSS and HTML structure that conflicts with the custom dropdown design requirement.
- **Relying on the pagefind/ directory in dev mode:** `astro dev` does not run the post-build step. Search only works after `astro build`. Testing search requires `astro build && astro preview`.
- **Putting `data-pagefind-body` on `<body>` or `<html>`:** This defeats the purpose — use it specifically on `<main>` to exclude navbar and footer.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Post-build index generation | Custom Node.js script to run pagefind CLI | `astro-pagefind` integration | Handles `astro:build:done` hook, output dir detection, base path |
| Relevance ranking | Custom text matching / word counting | Pagefind's built-in ranking | Pagefind uses BM25 ranking with chunked index; impossible to replicate without same infrastructure |
| Index chunking / lazy loading | Custom AJAX search endpoints | Pagefind bundle | Pagefind splits index into small chunks — only loads what's needed for a given query |
| Multilingual tokenization | Custom tokenizer | Pagefind (extended binary for CJK) | Not needed here but the point stands — text chunking is non-trivial |

**Key insight:** Search indexing and relevance ranking are deceptively complex. Pagefind's value is that the hard parts (BM25, chunked index, lazy loading) are solved at build time in Rust. The custom work here is only the UI layer.

---

## Common Pitfalls

### Pitfall 1: import.meta.env.BASE_URL in is:inline Scripts

**What goes wrong:** Developer uses `<script is:inline>` (as the project pattern does for hamburger toggle) and writes `import(import.meta.env.BASE_URL + 'pagefind/pagefind.js')`. At runtime, `import.meta.env.BASE_URL` is undefined or the literal string, so the import fails with a 404.

**Why it happens:** `is:inline` scripts bypass Astro/Vite processing. Env variable substitution only happens in Vite-processed scripts.

**How to avoid:** Use a regular `<script>` tag (no `is:inline`) for the pagefind-loading code. Astro bundles it with Vite, which substitutes `import.meta.env.BASE_URL` with the actual value (`/oxygen-not-included/`).

**Warning signs:** Console error "Failed to fetch /pagefind/pagefind.js" or "import.meta is not defined".

### Pitfall 2: Search Doesn't Work in Dev Mode

**What goes wrong:** Developer runs `astro dev`, types in the search box, and gets no results (or 404 on pagefind.js).

**Why it happens:** `astro dev` does NOT run the post-build Pagefind step. The `pagefind/` directory only exists after `astro build`.

**How to avoid:** Test search functionality with `astro build && astro preview`. For local dev iteration, run `astro build` once to generate the index, then copy `dist/pagefind/` to `public/pagefind/` — this makes the index available during subsequent `astro dev` sessions (stale but functional for UI development).

**Warning signs:** 404 on `/oxygen-not-included/pagefind/pagefind.js` in dev mode.

### Pitfall 3: Navbar Content Appears in Search Results

**What goes wrong:** Search results show "Ranching", "Farming", etc. as navigation link matches — every page has the same nav links, so they all match navigation queries.

**Why it happens:** Without `data-pagefind-body` scoping, Pagefind indexes the entire page including the Navbar.

**How to avoid:** Add `data-pagefind-body` to `<main>` in `BaseLayout.astro`. Pagefind's auto-exclusion of `<nav>` elements only applies if they are semantic `<nav>` elements, which the current Navbar does use — but explicit scoping is more reliable.

**Warning signs:** Search results for "ranching" return every single page on the site.

### Pitfall 4: GitHub Actions Deploy Misses Pagefind Index

**What goes wrong:** The site deploys but search returns no results in production. The `pagefind/` directory is missing from the deployed site.

**Why it happens:** The deploy workflow uses `withastro/action@v5` which calls `astro build` internally. If `astro-pagefind` is registered as an Astro integration, it fires `astro:build:done` and generates the index inside the dist/ directory — this DOES work with `withastro/action`. But if using the `package.json` script approach (`astro build && npx pagefind --site dist`) the action's internal build won't run the second command.

**How to avoid:** Use the `astro-pagefind` integration (not the package.json script approach). The integration fires inside Astro's build lifecycle, which `withastro/action` fully respects.

**Warning signs:** Search works locally after `astro build` but not on GitHub Pages.

### Pitfall 5: Result URLs Break with Base Path

**What goes wrong:** Pagefind result `url` fields are absolute paths (e.g., `/oxygen-not-included/ranching/hatches/`) but clicking them navigates incorrectly.

**Why it happens:** If the pagefind JS is loaded from the wrong path, the index bundle itself won't load. Separately, if result URLs are rendered as relative hrefs without the full base, navigation breaks.

**How to avoid:** `astro-pagefind` handles base path in the index. When rendering results, use `result.url` directly as the `href` — Pagefind already includes the full path from the site root (including base) in the indexed URLs.

---

## Code Examples

Verified patterns from official sources:

### astro.config.mjs Integration Registration

```typescript
// Source: https://github.com/shishkin/astro-pagefind README
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import pagefind from 'astro-pagefind';

export default defineConfig({
  site: 'https://kuromixy.github.io',
  base: '/oxygen-not-included',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [pagefind()],
});
```

### BaseLayout.astro — Scope Indexing to Main Content

```astro
<!-- Source: https://pagefind.app/docs/indexing/ -->
<main data-pagefind-body class="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">
  <slot />
</main>
```

### Page-Level Category Metadata

```astro
<!-- Source: https://pagefind.app/docs/metadata/ -->
<!-- Place in each content page's main heading or as a hidden span -->
<h1 data-pagefind-meta="category:Ranching">Hatches</h1>
```

### Pagefind JS API — Search and Result Shape

```javascript
// Source: https://pagefind.app/docs/api/
const pagefind = await import('/oxygen-not-included/pagefind/pagefind.js');
await pagefind.init();

const search = await pagefind.debouncedSearch('hatch');
// search.results is an array of lightweight result handles
const data = await search.results[0].data();
// data shape:
// {
//   url: '/oxygen-not-included/ranching/hatches/',
//   meta: { title: 'Hatches', category: 'Ranching' },
//   excerpt: '... highlighted text ...',
//   sub_results: [ ... ]
// }
```

### Navbar.astro — Search Script Structure (Skeleton)

```astro
<!-- In Navbar.astro — use <script> not <script is:inline> for pagefind -->
<script>
  const BASE = import.meta.env.BASE_URL;  // '/oxygen-not-included/'
  let pagefind: any;

  async function loadPagefind() {
    if (!pagefind) {
      pagefind = await import(/* @vite-ignore */ BASE + 'pagefind/pagefind.js');
      await pagefind.init();
    }
    return pagefind;
  }

  let debounce: ReturnType<typeof setTimeout>;

  const input = document.getElementById('search-input') as HTMLInputElement;
  const dropdown = document.getElementById('search-dropdown') as HTMLElement;

  input?.addEventListener('input', () => {
    const q = input.value.trim();
    clearTimeout(debounce);
    if (q.length < 3) {
      dropdown.innerHTML = '';
      dropdown.classList.add('hidden');
      return;
    }
    debounce = setTimeout(async () => {
      const pf = await loadPagefind();
      const result = await pf.debouncedSearch(q);
      if (!result) return;
      const top5 = await Promise.all(result.results.slice(0, 5).map((r: any) => r.data()));
      renderDropdown(top5);
    }, 200);
  });

  function renderDropdown(results: any[]) {
    if (results.length === 0) {
      dropdown.innerHTML = '<p class="p-3 text-oni-text-muted text-sm">No results found</p>';
    } else {
      dropdown.innerHTML = results.map(r => `
        <a href="${r.url}" class="flex items-center justify-between gap-3 px-3 py-2 hover:bg-oni-bg-elevated transition-colors">
          <span class="text-oni-text-primary text-sm truncate">${r.meta.title}</span>
          ${r.meta.category ? `<span class="text-xs px-2 py-0.5 rounded bg-oni-teal/10 text-oni-teal whitespace-nowrap">${r.meta.category}</span>` : ''}
        </a>
      `).join('');
    }
    dropdown.classList.remove('hidden');
  }

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') dropdown.classList.add('hidden');
  });

  // Close on click outside
  document.addEventListener('click', (e) => {
    const container = document.getElementById('search-container');
    if (container && !container.contains(e.target as Node)) {
      dropdown.classList.add('hidden');
    }
  });
</script>
```

**Note on `/* @vite-ignore */`:** Dynamic imports with non-static paths generate Vite warnings. The comment suppresses the warning. This is the documented Vite approach for intentional dynamic base-path imports.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Algolia / Lunr.js client-side search | Pagefind (Rust-compiled, post-build indexer) | ~2022 onward | No API key, no index limit, works offline, zero runtime cost |
| Full-page search results page | Inline dropdown (as-you-type) | Common UX pattern since ~2020 | Faster feedback loop, no navigation required |
| Copying pagefind/ to public/ for dev | astro-pagefind integration auto-detects dist/ | astro-pagefind package | One fewer manual step; build-hook approach is canonical |

**Deprecated/outdated:**
- Manual `package.json` script approach (`"build": "astro build && npx pagefind --site dist"`): Works locally but fails with `withastro/action` CI. Prefer the Astro integration.
- Using `@pagefind/default-ui` CSS import with custom override: Brittle — Pagefind's default UI CSS uses `!important` in places. Since a fully custom dropdown is being built, do not import the default UI CSS at all.

---

## Open Questions

1. **`<script>` vs `<script is:inline>` for Navbar interactivity**
   - What we know: Project currently uses `is:inline` for the hamburger toggle (simple DOM manipulation). Pagefind requires a processed `<script>` for `import.meta.env.BASE_URL` substitution.
   - What's unclear: Whether mixing `is:inline` (hamburger) and processed `<script>` (search) in the same component file causes ordering issues.
   - Recommendation: Keep hamburger as `is:inline`. Add a separate `<script>` (Astro-processed) for the pagefind logic. They can coexist in the same `.astro` file.

2. **Category badge color mapping**
   - What we know: CONTEXT.md leaves badge color to Claude's discretion. ONI color tokens include `oni-teal`, `oni-orange`, `oni-text-muted`.
   - What's unclear: Whether uniform teal badges or per-category color mapping is preferred visually.
   - Recommendation: Use a single color (teal/10 background with oni-teal text) for all badges. Simple and consistent with the site palette. No per-category mapping needed.

3. **Mobile search expansion behavior**
   - What we know: Mobile gets magnifying glass icon that expands to full-width input on tap. The hamburger toggle already uses `id="menu-toggle"` and `id="mobile-menu"` patterns.
   - What's unclear: Whether expanding mobile search should collapse the hamburger menu if it's open.
   - Recommendation: Keep them independent. Expanding search does not close the hamburger menu. Simpler implementation, less surprising for users.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None detected — project has no test configuration files |
| Config file | None — Wave 0 gap |
| Quick run command | `astro build && astro preview` (manual smoke test) |
| Full suite command | Same — no automated tests in this project |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| NAV-02 | Search input visible in navbar on desktop | manual-only | N/A — visual verification | N/A |
| NAV-02 | Typing 3+ characters triggers search and shows results | manual-only | N/A — requires browser + built pagefind index | N/A |
| NAV-02 | Results show page title and category badge | manual-only | N/A — visual verification of result data | N/A |
| NAV-02 | Max 5 results shown (6th requires scroll) | manual-only | N/A — visual verification | N/A |
| NAV-02 | Escape closes dropdown | manual-only | N/A — DOM interaction | N/A |
| NAV-02 | Click outside closes dropdown | manual-only | N/A — DOM interaction | N/A |
| NAV-02 | Mobile: magnifying glass expands to input | manual-only | N/A — requires mobile viewport | N/A |
| NAV-02 | pagefind/ directory present in dist/ after build | smoke | `astro build && test -d dist/pagefind && echo PASS` | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** `astro build && test -d dist/pagefind && echo "Index generated: PASS"`
- **Per wave merge:** `astro build && astro preview` + manual walkthrough of all search behaviors
- **Phase gate:** Full manual smoke test of all NAV-02 criteria before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] No automated test framework — all validation is manual + build smoke test
- [ ] Smoke test script: `astro build && test -d dist/pagefind` — confirms index generation
- [ ] Manual test checklist for UAT (covered in PLAN.md verification steps)

---

## Sources

### Primary (HIGH confidence)

- https://pagefind.app/docs/indexing/ — `data-pagefind-body`, `data-pagefind-ignore`, auto-excluded elements
- https://pagefind.app/docs/metadata/ — `data-pagefind-meta` syntax and inline value format
- https://pagefind.app/docs/api/ — JS API: `import`, `init()`, `debouncedSearch()`, result shape
- https://pagefind.app/docs/ui/ — UI options including `debounceTimeoutMs`, `pageSize`, CSS variables
- https://github.com/shishkin/astro-pagefind — Integration package, base URL support, `Search` component

### Secondary (MEDIUM confidence)

- https://trost.codes/posts/adding-simple-search-to-an-astro-blog/ — `import.meta.env.BASE_URL` + pagefind bundlePath pattern; `@pagefind/default-ui` PagefindUI config
- https://minifloppy.it/posts/2024/adding-pagefind-search-astro-website/ — `astro:build:done` hook approach, dev mode limitation confirmed
- https://syntackle.com/blog/pagefind-search-in-astro-site/ — `is:inline` caveat, Vite external dep declaration, build-then-copy dev workflow

### Tertiary (LOW confidence)

- https://www.thomasledoux.be/blog/search-static-astro-website — PagefindUI pattern; `astro-pagefind` must be last integration (single source, unverified whether truly required)

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — Pagefind is the locked choice; astro-pagefind integration well-documented
- Architecture: HIGH — Pagefind JS API result shape and `data-pagefind-meta` confirmed from official docs
- Pitfalls: HIGH for is:inline/BASE_URL and dev mode; MEDIUM for withastro/action interaction (confirmed by pattern analysis, not direct test)
- Validation: HIGH — no test framework exists in this project; manual-only is correct call

**Research date:** 2026-03-18
**Valid until:** 2026-09-18 (Pagefind is stable; astro-pagefind tracks Astro releases — verify if Astro major version changes)
