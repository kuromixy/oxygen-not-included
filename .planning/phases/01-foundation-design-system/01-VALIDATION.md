---
phase: 1
slug: foundation-design-system
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-08
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Astro build-time validation (Zod schemas) + astro check |
| **Config file** | astro.config.mjs (built-in) |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npx astro check` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npx astro check`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | INFR-01 | build | `npm run build` | N/A — build pipeline | ⬜ pending |
| 01-01-02 | 01 | 1 | INFR-02 | build | `npm run build` | N/A — build pipeline | ⬜ pending |
| 01-01-03 | 01 | 1 | DSGN-03 | build | `npm run build` | N/A — build pipeline | ⬜ pending |
| 01-02-01 | 02 | 1 | DSGN-01 | manual-only | Visual check | N/A — manual | ⬜ pending |
| 01-02-02 | 02 | 1 | NAV-01 | build | `npm run build` | N/A — build pipeline | ⬜ pending |
| 01-02-03 | 02 | 1 | INFR-05 | manual-only | Browser devtools responsive mode | N/A — manual | ⬜ pending |
| 01-03-01 | 03 | 2 | INFR-03 | smoke | Push to main, verify deployment | N/A — CI/CD | ⬜ pending |
| 01-03-02 | 03 | 2 | INFR-04 | manual-only | Lighthouse audit | N/A — manual | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `npm run build` — verify it runs cleanly after scaffolding
- [ ] `npx astro check` — TypeScript validation for Astro components
- [ ] No unit test framework needed — Astro's build-time Zod schema validation serves as the test infrastructure

*Note: For a static site with YAML data validated by Zod at build time, the build itself IS the test suite.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Dark mode default + toggle | DSGN-01 | Visual behavior, localStorage interaction | 1. Load page — should be dark. 2. Click toggle — should go light. 3. Reload — should persist choice. 4. Clear localStorage — should follow OS pref. |
| Responsive mobile layout | INFR-05 | Visual layout, touch targets | 1. Open devtools responsive mode at 375px. 2. Verify no horizontal scroll. 3. Verify hamburger menu works. 4. Verify tables become stacked cards. |
| Page load under 2s | INFR-04 | Network-dependent performance | Run Lighthouse on deployed URL. Performance score should be 90+. |
| GitHub Pages deployment | INFR-03 | CI/CD + live URL | Push to main, wait for Actions, verify live URL loads correctly. |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
