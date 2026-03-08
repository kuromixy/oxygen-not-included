# Technology Stack

**Project:** ONI Fanpage (Oxygen Not Included quick-reference site)
**Researched:** 2026-03-08
**Overall confidence:** MEDIUM (web verification tools unavailable; versions based on training data up to May 2025 -- verify before installing)

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Astro | ^5.x | Static site generator | Ships zero JS by default, perfect for a content-heavy reference site. Content collections provide typed, structured data. Built-in Markdown/MDX support. First-class GitHub Pages deployment via official adapter. Fastest build times among modern SSGs. | MEDIUM |

**Why Astro over alternatives:**
- This is a **content site, not an app**. Astro's "zero JS by default" philosophy means pages load instantly -- critical for mid-game lookups.
- Content Collections let you define typed schemas for ranching data, farming data, etc. and query them at build time. This is exactly the structured reference data pattern the project needs.
- `.astro` components are simple HTML-like templates with frontmatter -- low learning curve, no framework lock-in.
- Unlike Next.js or Nuxt, Astro does not ship a client-side router or framework runtime. For a static reference site, that overhead is waste.

### Styling

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Tailwind CSS | ^4.x | Utility-first CSS | Rapid prototyping of card-based layouts and reference tables. Purges unused CSS at build time so bundle stays tiny. Works seamlessly with Astro via official integration. | MEDIUM |
| Custom CSS (via Astro scoped styles) | N/A | ONI-themed design tokens | Define the ONI color palette, fonts, and card styles as CSS custom properties. Tailwind handles layout utilities; custom properties handle the game's visual identity. | HIGH |

**Why Tailwind and not plain CSS:**
- The project has many repeating patterns (stat cards, data tables, section headers). Tailwind's utility classes make these consistent without writing bespoke CSS for each.
- Tailwind v4 uses a CSS-first configuration (no `tailwind.config.js`), which simplifies setup.
- For the ONI-themed personality, define CSS custom properties (`--oni-blue`, `--oni-orange`, etc.) and reference them in Tailwind's theme via `@theme`.

### Content Management

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Astro Content Collections | Built-in | Structured game data | Define schemas for each data category (ranching, farming, power, layouts). Type-safe, validated at build time. No external CMS needed. | MEDIUM |
| Markdown / MDX | Built-in | Page content with embedded components | Write reference content in Markdown. Use MDX only where you need interactive diagrams or custom stat display components. | HIGH |

**Data structure approach:**
- Store game data as structured YAML/JSON in `src/content/` directories (e.g., `critters/`, `crops/`, `rooms/`).
- Define Zod schemas via Astro's content config to validate data shape.
- Pages query collections at build time and render static HTML.
- This makes it trivial to update stats when game patches drop -- edit a YAML file, rebuild.

### Image Handling

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Astro Image (`astro:assets`) | Built-in | Image optimization | Automatic WebP/AVIF conversion, responsive srcsets, lazy loading. Handles the placeholder-to-real-screenshot migration cleanly. | MEDIUM |

### Search (Phase 2+)

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Pagefind | ^1.x | Static search | Runs at build time, generates a tiny search index. No server needed. Works perfectly with GitHub Pages. Players can search for "hatch" or "electrolyzer" and jump to the right card. | MEDIUM |

### Deployment

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| GitHub Actions | N/A | CI/CD | Astro has an official GitHub Pages deployment guide. One workflow file, auto-deploys on push to main. | HIGH |
| GitHub Pages | N/A | Hosting | Free, reliable, custom domain support. Static-only constraint matches perfectly. | HIGH |

### Dev Tooling

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| TypeScript | ^5.x | Type safety for content schemas | Astro has first-class TS support. Content collection schemas use Zod which gives type inference. Lightweight usage -- no complex app logic to type. | MEDIUM |
| Prettier | ^3.x | Code formatting | Consistent formatting across .astro, .md, .ts files. Use with `prettier-plugin-astro`. | MEDIUM |

## What NOT to Use

| Technology | Why Not |
|------------|---------|
| Next.js / Nuxt / SvelteKit | App frameworks with SSR runtimes. This is a static content site -- shipping React/Vue/Svelte runtime is unnecessary weight. Astro can use these as "islands" if needed later, but the base should be zero-JS. |
| Jekyll | GitHub Pages' legacy default. Ruby-based, slow builds, limited templating, poor TypeScript/modern tooling support. Astro supersedes it for new projects. |
| Hugo | Fast builds but Go templates are awkward. No content collections with type safety. Worse component model than Astro. |
| Vitepress | Designed for documentation, not reference/fanpage layouts. Too opinionated about sidebar navigation structure. |
| Bootstrap / Bulma | Heavy CSS frameworks with opinions that fight custom theming. Tailwind gives more control for a custom ONI aesthetic. |
| Any CMS (Contentful, Sanity, etc.) | Overkill. Game data is developer-managed, changes infrequently (on game patches), and fits naturally in version-controlled files. |
| React/Vue/Svelte (as primary) | No interactivity needed for a reference site. If a future interactive calculator is needed, Astro Islands can add a single component without framework commitment site-wide. |

## Alternatives Considered

| Category | Recommended | Alternative | Why Not Alternative |
|----------|-------------|-------------|---------------------|
| SSG | Astro | 11ty (Eleventy) | 11ty is solid and simpler, but lacks content collections with Zod schemas, built-in image optimization, and the component model. For structured game data with many categories, Astro's content layer is a significant advantage. 11ty would be the fallback if Astro proves problematic. |
| Styling | Tailwind CSS | Plain CSS | Plain CSS is viable for this project's size, but Tailwind accelerates building consistent card/table layouts and responsive design. The ONI theme layer will use CSS custom properties regardless. |
| Search | Pagefind | Lunr.js / Fuse.js | Pagefind generates the index at build time and loads only relevant chunks. Lunr/Fuse require loading the full index client-side. For a static site, Pagefind is purpose-built. |

## Project Structure

```
oni-fanpage/
  src/
    content/
      config.ts          # Zod schemas for all content types
      ranching/           # Critter data (YAML/JSON)
      farming/            # Crop data
      power/              # Generator/battery data
      plumbing/           # Pipe/liquid data
      rooms/              # Room overlay data
    layouts/
      Base.astro          # HTML shell, nav, footer
      Reference.astro     # Card grid layout for data pages
    components/
      StatCard.astro      # Reusable stat display card
      DataTable.astro     # Reusable data table
      Diagram.astro       # Image with caption/overlay
      Nav.astro           # Site navigation
    pages/
      index.astro         # Landing page
      ranching/
      farming/
      power/
      plumbing/
      rooms/
    styles/
      theme.css           # ONI color palette, fonts, custom properties
  public/
    images/
      placeholders/       # Placeholder diagrams
      screenshots/        # Real screenshots (added later)
    favicon.svg
  astro.config.mjs
  package.json
```

## Installation

```bash
# Scaffold project
npm create astro@latest oni-fanpage -- --template minimal

# Add integrations
npx astro add tailwind
npx astro add mdx        # Only if MDX is needed for interactive content

# Add search (Phase 2+)
npm install pagefind

# Dev dependencies
npm install -D prettier prettier-plugin-astro
```

## GitHub Actions Deployment

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## Version Verification Needed

Since web research tools were unavailable during this research, the following versions should be verified before project initialization:

| Package | Claimed Version | Verify At |
|---------|----------------|-----------|
| Astro | ^5.x | https://github.com/withastro/astro/releases |
| Tailwind CSS | ^4.x | https://github.com/tailwindlabs/tailwindcss/releases |
| Pagefind | ^1.x | https://github.com/CloudCannon/pagefind/releases |
| TypeScript | ^5.x | https://github.com/microsoft/TypeScript/releases |
| Node.js | 22 LTS | https://nodejs.org |

Astro 5.0 was released in December 2024 and Tailwind CSS v4 in early 2025. These were current as of my training cutoff (May 2025). Newer major versions may exist -- check before scaffolding.

## Sources

- Astro documentation (astro.build/docs) -- training data, not live-verified
- Tailwind CSS documentation (tailwindcss.com/docs) -- training data, not live-verified
- Pagefind documentation (pagefind.app) -- training data, not live-verified
- GitHub Pages documentation (docs.github.com/en/pages) -- training data, not live-verified

**Confidence note:** All recommendations are based on training data through May 2025. The architectural reasoning (zero-JS static site, content collections, utility CSS) is HIGH confidence regardless of specific version numbers. The specific version numbers are MEDIUM confidence and should be verified.
