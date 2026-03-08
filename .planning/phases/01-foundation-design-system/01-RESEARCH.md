# Phase 1: Foundation & Design System - Research

**Researched:** 2026-03-08
**Domain:** Astro SSG, Tailwind CSS v4, GitHub Pages deployment, structured YAML data
**Confidence:** HIGH

## Summary

This phase establishes a greenfield Astro 5.x static site with Tailwind CSS v4, structured YAML game data via content collections, dark mode with toggle, responsive navigation, and automated GitHub Pages deployment. The stack is mature and well-documented -- Astro 5.x (currently 5.18.0) has stable content collection APIs with native YAML support, and Tailwind CSS v4 (currently 4.1.x) uses a CSS-first configuration model that eliminates the old JavaScript config file.

The biggest shifts from older patterns: Tailwind v4 replaces `tailwind.config.js` with CSS-native `@theme` and `@custom-variant` directives. Astro 5 moved content config from `src/content/config.ts` to `src/content.config.ts` and uses loader-based collections (`file()`, `glob()`) instead of the legacy `type: 'content'` syntax. Dark mode in Tailwind v4 uses `@custom-variant dark` instead of `darkMode: 'selector'` in config.

**Primary recommendation:** Use `npm create astro@latest`, add Tailwind via `@tailwindcss/vite` plugin, define game data as YAML with `file()` loader and Zod schemas, implement dark mode with `@custom-variant` + inline script for FOUC prevention, deploy via `withastro/action@v5`.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Subtle ONI nods -- clean modern reference site with ONI colors (teal/orange) as accents, not full cartoony theming
- Deep space dark mode aesthetic -- very dark backgrounds (#0a0a0f range) with ONI teal accents, high contrast for readability
- System font stack -- no custom web fonts, fastest load
- Key stat numbers get highlighted inline treatment (accent color or background pill)
- Top navbar with category links (Ranching, Farming, Power/Plumbing, Base Layouts), collapses to hamburger on mobile
- Category landing pages with links to sub-pages; simple home page with 4 category cards
- Mobile: stack vertically -- tables become stacked cards, multi-column goes single-column
- Hatches critter family as PoC content domain (4 variants: Hatch, Sage, Stone, Smooth)
- Hybrid data presentation: overview comparison table + expandable detail cards per variant
- YAML format for game data files, one file per critter family
- DLC tagging via tags array: `dlc: ["base"]` or `dlc: ["base", "spaced_out"]` etc.
- Units stored in data alongside values (e.g., `temperature: { min: -10, max: 70, unit: "C" }`)
- No game version tracking in Phase 1

### Claude's Discretion
- Whether to include placeholder image slots on the PoC page
- Whether data entries include optional notes/tips field alongside raw stats
- Dark mode color exact values within the deep space dark direction
- Loading states, error handling, exact spacing and typography details

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| INFR-01 | Site built with Astro as SSG with structured content collections | Astro 5.x Content Layer API with file() loader, Zod schemas, src/content.config.ts |
| INFR-02 | Game data stored as structured YAML files, separate from templates | file() loader parses YAML natively; data lives in src/data/, templates in src/layouts/ and src/pages/ |
| INFR-03 | Site deploys automatically to GitHub Pages via GitHub Actions on push | withastro/action@v5 workflow, site/base config in astro.config.mjs |
| INFR-04 | Site loads in under 2 seconds on typical connections | Astro ships zero JS by default; system fonts + no framework JS = fast; inline dark mode script is tiny |
| INFR-05 | Site is responsive and usable on mobile devices | Tailwind responsive utilities (sm:/md:/lg:), hamburger nav pattern, stacked cards on mobile |
| NAV-01 | User can navigate between content categories via top-level navigation | Top navbar component with category links, hamburger toggle on mobile |
| DSGN-01 | Dark mode by default, system preference respected, manual toggle | @custom-variant dark + inline script checking localStorage/prefers-color-scheme + toggle button |
| DSGN-03 | All data tagged with base game vs DLC applicability | Zod schema with dlc field as z.array(z.string()), stored in YAML data files |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| astro | ^5.18 | Static site generator | Content-focused SSG, zero JS by default, native YAML/content collections |
| tailwindcss | ^4.1 | Utility-first CSS | CSS-first config in v4, responsive utilities, dark mode variant built-in |
| @tailwindcss/vite | ^4.1 | Tailwind Vite integration | Official way to use Tailwind v4 with Astro (replaces @astrojs/tailwind) |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| astro/zod (built-in) | (bundled) | Schema validation | Define and validate YAML data schemas in content collections |
| withastro/action | v5 | GitHub Actions deploy | CI/CD pipeline for GitHub Pages deployment |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @tailwindcss/vite | @astrojs/tailwind | @astrojs/tailwind is deprecated for Tailwind v4; do NOT use it |
| file() loader | glob() loader | glob() is for directories of Markdown files; file() is correct for single YAML data files |
| CSS-only hamburger | astro-navbar package | CSS-only keeps zero JS; package adds dependency for minimal gain |

**Installation:**
```bash
npm create astro@latest oni-fanpage -- --template minimal
cd oni-fanpage
npm install tailwindcss @tailwindcss/vite
```

## Architecture Patterns

### Recommended Project Structure
```
oni-fanpage/
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions deployment
├── src/
│   ├── content.config.ts        # Content collection schemas (Astro 5 location)
│   ├── data/
│   │   └── hatches.yaml         # Game data: one file per critter family
│   ├── layouts/
│   │   └── BaseLayout.astro     # Base HTML shell with dark mode, nav, global CSS
│   ├── components/
│   │   ├── Navbar.astro         # Top nav with hamburger
│   │   ├── ThemeToggle.astro    # Dark/light mode toggle button
│   │   ├── CategoryCard.astro   # Home page category entry card
│   │   ├── ComparisonTable.astro # Side-by-side data table
│   │   └── DetailCard.astro     # Expandable critter variant card
│   ├── pages/
│   │   ├── index.astro          # Home: 4 category cards
│   │   ├── ranching/
│   │   │   ├── index.astro      # Ranching landing page
│   │   │   └── hatches.astro    # Hatches PoC detail page
│   │   ├── farming/
│   │   │   └── index.astro      # Placeholder landing
│   │   ├── power-plumbing/
│   │   │   └── index.astro      # Placeholder landing
│   │   └── base-layouts/
│   │       └── index.astro      # Placeholder landing
│   └── styles/
│       └── global.css           # Tailwind import + @theme + @custom-variant
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

### Pattern 1: Content Collection with file() Loader for YAML Data
**What:** Define game data as YAML files loaded via Astro's file() loader with Zod schema validation
**When to use:** All structured game data (critters, crops, buildings, etc.)
**Example:**

```yaml
# src/data/hatches.yaml
- id: hatch
  name: Hatch
  dlc: ["base"]
  diet: ["sedimentary_rock", "sandstone", "igneous_rock", "obsidian"]
  output:
    product: coal
    rate: { value: 10, unit: "kg/cycle" }
  calories:
    metabolism: { value: 1000000, unit: "kcal/cycle" }
  stable_capacity: 8
  temperature:
    min: { value: -30, unit: "C" }
    max: { value: 70, unit: "C" }
  grooming:
    station: grooming_station
    cycle_time: { value: 1, unit: "cycles" }

- id: sage_hatch
  name: Sage Hatch
  dlc: ["base"]
  diet: ["sedimentary_rock", "sandstone"]
  output:
    product: coal
    rate: { value: 10, unit: "kg/cycle" }
  # ... etc
```

```typescript
// src/content.config.ts
import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const unitValue = z.object({
  value: z.number(),
  unit: z.string(),
});

const critters = defineCollection({
  loader: file("src/data/hatches.yaml"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
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
    notes: z.string().optional(),  // Optional tips field
  }),
});

export const collections = { critters };
```

### Pattern 2: Dark Mode with System Preference + Manual Toggle
**What:** Respect OS preference by default, allow manual override, persist choice
**When to use:** DSGN-01 requirement
**Example:**

```css
/* src/styles/global.css */
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-oni-bg-deep: #0a0a0f;
  --color-oni-bg-surface: #141420;
  --color-oni-bg-elevated: #1e1e2e;
  --color-oni-teal: #2dd4bf;
  --color-oni-teal-dim: #1a8a7a;
  --color-oni-orange: #f59e0b;
  --color-oni-text-primary: #e2e8f0;
  --color-oni-text-secondary: #94a3b8;
  --color-oni-text-muted: #64748b;
  --color-oni-stat-pill-bg: #1e293b;
  --color-oni-stat-pill-text: #2dd4bf;
}
```

```html
<!-- In BaseLayout.astro <head>, BEFORE any stylesheet -->
<script is:inline>
  const theme = (() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  })();
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
</script>
```

### Pattern 3: Responsive Hamburger Nav (Minimal JS)
**What:** Top navbar that collapses to hamburger on mobile with minimal vanilla JS
**When to use:** NAV-01 requirement
**Example:**

```astro
<!-- src/components/Navbar.astro -->
<nav class="bg-oni-bg-surface border-b border-oni-bg-elevated">
  <div class="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
    <a href="/" class="text-oni-teal font-bold text-lg">ONI Reference</a>

    <!-- Desktop links -->
    <div class="hidden md:flex gap-6">
      <a href="/ranching/" class="text-oni-text-secondary hover:text-oni-teal">Ranching</a>
      <a href="/farming/" class="text-oni-text-secondary hover:text-oni-teal">Farming</a>
      <a href="/power-plumbing/" class="text-oni-text-secondary hover:text-oni-teal">Power/Plumbing</a>
      <a href="/base-layouts/" class="text-oni-text-secondary hover:text-oni-teal">Base Layouts</a>
    </div>

    <!-- Mobile hamburger button -->
    <button id="menu-toggle" class="md:hidden text-oni-text-primary" aria-label="Toggle menu">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>
  </div>

  <!-- Mobile menu (hidden by default) -->
  <div id="mobile-menu" class="hidden md:hidden border-t border-oni-bg-elevated">
    <a href="/ranching/" class="block px-4 py-3 text-oni-text-secondary hover:text-oni-teal">Ranching</a>
    <a href="/farming/" class="block px-4 py-3 text-oni-text-secondary hover:text-oni-teal">Farming</a>
    <a href="/power-plumbing/" class="block px-4 py-3 text-oni-text-secondary hover:text-oni-teal">Power/Plumbing</a>
    <a href="/base-layouts/" class="block px-4 py-3 text-oni-text-secondary hover:text-oni-teal">Base Layouts</a>
  </div>
</nav>

<script is:inline>
  document.getElementById('menu-toggle')?.addEventListener('click', () => {
    document.getElementById('mobile-menu')?.classList.toggle('hidden');
  });
</script>
```

### Pattern 4: Stat Pill Highlight
**What:** Inline treatment for key numbers to make them pop
**When to use:** Any numeric game data displayed in text context
**Example:**

```html
<span class="inline-flex items-center px-2 py-0.5 rounded text-sm font-mono
             bg-oni-stat-pill-bg text-oni-stat-pill-text">
  10 kg/cycle
</span>
```

### Anti-Patterns to Avoid
- **Using @astrojs/tailwind integration:** Deprecated for Tailwind v4. Use @tailwindcss/vite directly.
- **Using tailwind.config.js:** Tailwind v4 is CSS-first. Use @theme and @custom-variant in global.css.
- **Putting dark mode script after stylesheets:** Causes flash of light mode (FOUC). Must be inline in `<head>` before CSS.
- **Using `src/content/config.ts`:** Astro 5 moved this to `src/content.config.ts` (root of src, not inside content/).
- **Hardcoding DLC as boolean:** Use array of strings for multi-DLC support as specified.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| YAML parsing | Custom YAML parser | Astro file() loader | Built-in, type-safe, integrated with build |
| Schema validation | Manual type checks | Zod via astro/zod | Compile-time errors, auto TypeScript types |
| Responsive breakpoints | Custom media queries | Tailwind responsive prefixes (sm:/md:/lg:) | Consistent, well-tested breakpoint system |
| Dark mode system preference detection | Custom matchMedia logic | Pattern from Tailwind docs (see above) | Battle-tested, handles localStorage + OS pref |
| GitHub Pages deployment | Custom build scripts | withastro/action@v5 | Handles node install, build, artifact upload |
| CSS utility system | Custom utility classes | Tailwind v4 | Massive ecosystem, consistent API |

**Key insight:** Astro + Tailwind v4 handle 95% of this phase's complexity out of the box. The main custom code is the YAML data structure design, the comparison table component, and the dark mode toggle UI.

## Common Pitfalls

### Pitfall 1: Flash of Unstyled Content (FOUC) on Dark Mode
**What goes wrong:** Page flashes white before dark mode applies
**Why it happens:** Dark mode script runs after CSS loads, or is in a deferred script
**How to avoid:** Use `<script is:inline>` in `<head>` BEFORE any `<link>` or `<style>` tags. This script must be synchronous and blocking.
**Warning signs:** Any visible flash when loading pages, especially on slow connections

### Pitfall 2: Wrong Content Config Location (Astro 5)
**What goes wrong:** Content collections silently fail to load
**Why it happens:** Astro 5 moved config from `src/content/config.ts` to `src/content.config.ts`
**How to avoid:** Always use `src/content.config.ts` (at src root, not in a content/ subfolder)
**Warning signs:** Empty collections, no TypeScript types generated for content

### Pitfall 3: Using Deprecated @astrojs/tailwind
**What goes wrong:** Tailwind v4 features don't work, or build fails
**Why it happens:** @astrojs/tailwind was for Tailwind v3. Tailwind v4 uses @tailwindcss/vite
**How to avoid:** Install `tailwindcss` and `@tailwindcss/vite`, configure in astro.config.mjs vite.plugins
**Warning signs:** Error messages about missing config, @tailwind directives not working

### Pitfall 4: GitHub Pages Base Path
**What goes wrong:** Assets return 404, links break on deployed site
**Why it happens:** Repository-based GitHub Pages serves from `/repo-name/` not `/`
**How to avoid:** Set `base: '/oni-fanpage'` in astro.config.mjs (adjust to actual repo name). Use Astro's built-in asset handling.
**Warning signs:** Works locally but broken on GitHub Pages; images and CSS 404

### Pitfall 5: YAML file() Loader Requires id Field
**What goes wrong:** Content collection fails to parse YAML entries
**Why it happens:** file() loader requires each entry to have a unique `id` property
**How to avoid:** Every YAML array entry must include an `id` field. Define it in the Zod schema.
**Warning signs:** Build errors about missing id, or entries not appearing in queries

### Pitfall 6: Tailwind v4 Dark Mode Config Syntax
**What goes wrong:** `dark:` utilities don't respond to class toggle
**Why it happens:** Using old Tailwind v3 `darkMode: 'selector'` syntax instead of v4's `@custom-variant`
**How to avoid:** In global.css, use `@custom-variant dark (&:where(.dark, .dark *));`
**Warning signs:** Dark mode only works with OS preference, not manual toggle

## Code Examples

### Querying YAML Data in Astro Pages
```astro
---
// src/pages/ranching/hatches.astro
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import ComparisonTable from '../../components/ComparisonTable.astro';
import DetailCard from '../../components/DetailCard.astro';

const hatches = await getCollection('critters');
---
<BaseLayout title="Hatches - ONI Reference">
  <h1 class="text-2xl font-bold text-oni-text-primary mb-6">Hatches</h1>

  <!-- Overview comparison table -->
  <ComparisonTable entries={hatches} />

  <!-- Detail cards per variant -->
  {hatches.map(hatch => (
    <DetailCard entry={hatch} />
  ))}
</BaseLayout>
```

### Theme Toggle Component
```astro
---
// src/components/ThemeToggle.astro
---
<button
  id="theme-toggle"
  class="p-2 rounded-lg text-oni-text-secondary hover:text-oni-teal
         hover:bg-oni-bg-elevated transition-colors"
  aria-label="Toggle dark mode"
>
  <!-- Sun icon (shown in dark mode) -->
  <svg id="icon-sun" class="w-5 h-5 hidden" fill="currentColor" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
  </svg>
  <!-- Moon icon (shown in light mode) -->
  <svg id="icon-moon" class="w-5 h-5 hidden" fill="currentColor" viewBox="0 0 20 20">
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
  </svg>
</button>

<script is:inline>
  const toggle = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('icon-sun');
  const moonIcon = document.getElementById('icon-moon');

  function updateIcons() {
    const isDark = document.documentElement.classList.contains('dark');
    sunIcon?.classList.toggle('hidden', !isDark);
    moonIcon?.classList.toggle('hidden', isDark);
  }

  toggle?.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateIcons();
  });

  updateIcons();
</script>
```

### Responsive Table-to-Cards Pattern
```html
<!-- Desktop: table row / Mobile: stacked card -->
<div class="hidden md:grid md:grid-cols-5 gap-4 p-3 border-b border-oni-bg-elevated">
  <div class="font-medium text-oni-text-primary">Hatch</div>
  <div class="text-oni-text-secondary">Sedimentary Rock</div>
  <div><span class="px-2 py-0.5 rounded bg-oni-stat-pill-bg text-oni-stat-pill-text font-mono text-sm">10 kg/cycle</span></div>
  <div class="text-oni-text-secondary">Coal</div>
  <div class="text-oni-text-secondary">8</div>
</div>

<!-- Mobile card version -->
<div class="md:hidden p-4 mb-3 rounded-lg bg-oni-bg-surface border border-oni-bg-elevated">
  <h3 class="font-medium text-oni-text-primary mb-2">Hatch</h3>
  <dl class="grid grid-cols-2 gap-2 text-sm">
    <dt class="text-oni-text-muted">Diet</dt>
    <dd class="text-oni-text-secondary">Sedimentary Rock</dd>
    <dt class="text-oni-text-muted">Output</dt>
    <dd><span class="px-2 py-0.5 rounded bg-oni-stat-pill-bg text-oni-stat-pill-text font-mono">10 kg/cycle</span></dd>
  </dl>
</div>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| tailwind.config.js | CSS @theme + @custom-variant | Tailwind v4 (Jan 2025) | No JS config file, CSS-native theming |
| @astrojs/tailwind integration | @tailwindcss/vite plugin | Tailwind v4 / Astro 5.2 | Different install and config path |
| src/content/config.ts | src/content.config.ts | Astro 5.0 (Dec 2024) | File moved to src root |
| type: 'content' / type: 'data' | file() / glob() loaders | Astro 5.0 | Content Layer API replaces legacy |
| darkMode: 'class' in config | @custom-variant dark in CSS | Tailwind v4 | CSS-first dark mode config |
| @tailwind base/components/utilities | @import "tailwindcss" | Tailwind v4 | Single import replaces three directives |

**Deprecated/outdated:**
- `@astrojs/tailwind`: Do not use with Tailwind v4. Use @tailwindcss/vite instead.
- `tailwind.config.js` / `tailwind.config.mjs`: Tailwind v4 is CSS-first. No config file needed.
- `src/content/config.ts`: Astro 5 moved this to `src/content.config.ts`.

## Open Questions

1. **Exact repository name for GitHub Pages base path**
   - What we know: GitHub Pages for project repos serves from `/repo-name/`
   - What's unclear: Whether the repo will be `oni-fanpage` or something else
   - Recommendation: Use `oni-fanpage` as default, document how to change it

2. **Multiple YAML files vs single collection**
   - What we know: Phase 1 only needs hatches.yaml. Future phases add more critter families, crops, buildings.
   - What's unclear: Whether to register one collection per file or use glob() for a directory
   - Recommendation: Start with one `critters` collection using file("src/data/hatches.yaml"). In Phase 2, refactor to glob() or multiple file() loaders as needed. Don't over-engineer now.

3. **Placeholder images for PoC**
   - What we know: User left this to Claude's discretion
   - Recommendation: Include placeholder image slots with a simple colored rectangle and alt text. This proves the layout without requiring actual game assets. Use a CSS-only placeholder (background color + icon) rather than placeholder image files.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected -- greenfield project |
| Config file | None -- see Wave 0 |
| Quick run command | `npm run build` (Astro build validates content schemas) |
| Full suite command | `npm run build && npx astro check` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| INFR-01 | Astro builds successfully with content collections | build | `npm run build` | N/A -- build pipeline |
| INFR-02 | YAML data validates against Zod schema | build | `npm run build` (schema validation at build time) | N/A -- build pipeline |
| INFR-03 | GitHub Actions deploys to Pages | smoke | Manual: push to main, verify deployment | N/A -- CI/CD |
| INFR-04 | Page loads under 2 seconds | manual-only | Lighthouse audit on deployed URL | N/A -- manual |
| INFR-05 | Responsive on mobile | manual-only | Browser devtools responsive mode | N/A -- manual |
| NAV-01 | Navigation links work across categories | smoke | `npm run build` (validates all page routes exist) | N/A -- build pipeline |
| DSGN-01 | Dark mode default + toggle works | manual-only | Visual check: toggle button, localStorage | N/A -- manual |
| DSGN-03 | DLC tags present in data | build | `npm run build` (Zod validates dlc field) | N/A -- build pipeline |

### Sampling Rate
- **Per task commit:** `npm run build`
- **Per wave merge:** `npm run build && npx astro check`
- **Phase gate:** Full build green + manual checks on deployed site

### Wave 0 Gaps
- [ ] `npm run build` -- verify it runs cleanly after scaffolding (Astro build is the primary validator)
- [ ] `npx astro check` -- TypeScript validation for Astro components (installed with Astro)
- [ ] No unit test framework needed for Phase 1 -- Astro's build-time schema validation and type checking serve as the test infrastructure. Content schema errors fail the build.

*(Note: For a static site with YAML data validated by Zod at build time, the build itself IS the test suite. Schema violations, missing files, broken imports, and invalid routes all cause build failures.)*

## Sources

### Primary (HIGH confidence)
- [Tailwind CSS v4 Astro Installation](https://tailwindcss.com/docs/installation/framework-guides/astro) - exact install steps, @tailwindcss/vite config
- [Tailwind CSS v4 Dark Mode](https://tailwindcss.com/docs/dark-mode) - @custom-variant syntax, system pref + manual toggle
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) - file() loader, Zod schemas, YAML support
- [Astro GitHub Pages Deployment](https://docs.astro.build/en/guides/deploy/github/) - withastro/action@v5 workflow, site/base config

### Secondary (MEDIUM confidence)
- [Astro npm package](https://www.npmjs.com/package/astro) - current version 5.18.0
- [Tailwind CSS releases](https://github.com/tailwindlabs/tailwindcss/releases) - v4.1.x current stable
- [withastro/action GitHub](https://github.com/withastro/action) - v5 is current, Node 22 default

### Tertiary (LOW confidence)
- Dark mode exact color values (#0a0a0f etc.) -- user provided direction but exact values need visual testing

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - verified against official docs and npm
- Architecture: HIGH - patterns from official Astro and Tailwind documentation
- Pitfalls: HIGH - documented in official migration guides and community reports
- Dark mode implementation: HIGH - exact code from Tailwind v4 official docs
- YAML data schema: MEDIUM - Zod schema design is custom but loader pattern is documented

**Research date:** 2026-03-08
**Valid until:** 2026-04-08 (stable stack, unlikely to change significantly)
