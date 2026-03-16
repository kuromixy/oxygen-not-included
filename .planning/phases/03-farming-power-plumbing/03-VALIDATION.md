---
phase: 3
slug: farming-power-plumbing
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-16
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Astro build (static site — build success validates all pages render) |
| **Config file** | astro.config.mjs |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npx astro preview` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npx astro preview`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | FARM-01 | smoke (build) | `npm run build` | ❌ W0 | ⬜ pending |
| 03-01-02 | 01 | 1 | FARM-02 | smoke (build) | `npm run build` | ❌ W0 | ⬜ pending |
| 03-01-03 | 01 | 1 | FARM-03 | smoke (build) | `npm run build` | ❌ W0 | ⬜ pending |
| 03-02-01 | 02 | 1 | POWR-01 | smoke (build) | `npm run build` | ❌ W0 | ⬜ pending |
| 03-02-02 | 02 | 1 | POWR-02 | smoke (build) | `npm run build` | ❌ W0 | ⬜ pending |
| 03-xx-xx | — | — | POWR-03 | n/a (deferred) | n/a | n/a | n/a |
| 03-xx-xx | — | — | POWR-04 | n/a (deferred) | n/a | n/a | n/a |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/data/crops.yaml` — crop data (covers FARM-01/02/03)
- [ ] `src/data/generators.yaml` — generator data (covers POWR-01)
- [ ] `src/data/batteries.yaml` — battery data (covers POWR-02)
- [ ] `src/data/geysers.yaml` — geyser data (power/plumbing hub content)
- [ ] `src/content.config.ts` update — register crops, generators, batteries, geysers collections

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Crop comparison table sortable | FARM-03 | Interactive JS behavior | Click each column header, verify sort order toggles |
| Generator page build tab switching | POWR-01 | Interactive JS behavior | Click each tab, verify content swaps |
| Geyser page taming setup display | — | Visual layout check | Verify taming guide renders with stat cards |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
