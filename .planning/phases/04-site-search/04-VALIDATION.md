---
phase: 4
slug: site-search
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-18
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — project has no test framework |
| **Config file** | None — Wave 0 gap |
| **Quick run command** | `astro build && test -d dist/pagefind && echo PASS` |
| **Full suite command** | `astro build && astro preview` (manual smoke test) |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `astro build && test -d dist/pagefind && echo PASS`
- **After every plan wave:** Run `astro build && astro preview` + manual walkthrough
- **Before `/gsd:verify-work`:** Full manual smoke test of all NAV-02 criteria
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-01-01 | 01 | 1 | NAV-02 | smoke | `astro build && test -d dist/pagefind` | ❌ W0 | ⬜ pending |
| 04-01-02 | 01 | 1 | NAV-02 | manual-only | N/A — visual/DOM verification | N/A | ⬜ pending |
| 04-01-03 | 01 | 1 | NAV-02 | manual-only | N/A — browser interaction | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements — no test framework needed. All NAV-02 criteria require browser interaction (Pagefind only works after build). Validation is manual-only with one smoke check for pagefind index existence.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Search input visible in navbar | NAV-02 | Visual verification | Open site, confirm search bar in desktop nav |
| Typing 3+ chars shows results | NAV-02 | Requires built pagefind index + browser | Build site, preview, type "hatch" in search |
| Results show title + category | NAV-02 | Visual verification of result data | Search for known term, verify result format |
| Max 5 results visible | NAV-02 | Visual verification | Search broad term, verify scrollable limit |
| Escape closes dropdown | NAV-02 | DOM interaction test | Focus search, type query, press Escape |
| Click outside closes dropdown | NAV-02 | DOM interaction test | Open results, click page body |
| Mobile: icon expands to input | NAV-02 | Requires mobile viewport | Resize to mobile, tap magnifying glass |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
