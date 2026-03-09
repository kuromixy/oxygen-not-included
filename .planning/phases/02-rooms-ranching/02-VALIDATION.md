---
phase: 2
slug: rooms-ranching
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-09
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Astro build (static site — build success = pages render) |
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
| 02-01-01 | 01 | 1 | ROOM-01 | smoke (build) | `npm run build` | ❌ W0 | ⬜ pending |
| 02-01-02 | 01 | 1 | ROOM-02 | smoke (build) | `npm run build` | ❌ W0 | ⬜ pending |
| 02-01-03 | 01 | 1 | ROOM-03 | smoke (build) | `npm run build` | ❌ W0 | ⬜ pending |
| 02-02-01 | 02 | 1 | RNCH-01 | smoke (build) | `npm run build` | ❌ W0 | ⬜ pending |
| 02-02-02 | 02 | 1 | RNCH-02 | smoke (build) | `npm run build` | ❌ W0 | ⬜ pending |
| 02-02-03 | 02 | 1 | RNCH-03 | smoke (build) | `npm run build` | ❌ W0 | ⬜ pending |
| 02-02-04 | 02 | 1 | RNCH-04 | smoke (build) | `npm run build` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/data/rooms.yaml` — room data file (covers ROOM-01/02/03)
- [ ] `src/data/dreckos.yaml` — critter data (covers RNCH-01/02/03/04)
- [ ] `src/data/pacus.yaml` — critter data
- [ ] `src/data/pips.yaml` — critter data
- [ ] `src/data/slicksters.yaml` — critter data
- [ ] `src/data/shine-bugs.yaml` — critter data
- [ ] `src/content.config.ts` update — register new collections

*All data files are created during plan execution, not pre-existing.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Room layout diagrams readable | ROOM-03 | Visual layout check | Open rooms page, verify each room shows clear dimension diagram |
| Critter variant differences clear | RNCH-04 | Visual comparison | Open each critter page, confirm variants are distinguishable at a glance |
| Tab switching works | RNCH-01 | Client-side JS interaction | Click each tab on ranch build layout, verify content switches |
| Calculator produces correct values | RNCH-01 | Interactive JS | Enter custom critter count, verify output matches expected rates |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
