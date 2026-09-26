# Resistance Band Starter Plan

Original routine authored per [docs/ROUTINE_AUTHORING_GUIDE.md](ROUTINE_AUTHORING_GUIDE.md), task #1
of [the routine roadmap](task-rutinas.md): the cheapest home equipment tier (E2) after
[Bodyweight](ROUTINE_BODYWEIGHT_NO_EQUIPMENT.md) and [Pull-up Bar](ROUTINE_PULL_UP_BAR.md).

## 1. Routine brief

| Field | Decision |
| --- | --- |
| Name | Resistance Band |
| Audience | Beginners with no prior structured resistance training. |
| Goal | General fitness, full body every session. |
| Setting | Home, no gym access assumed. |
| Equipment | A tube-band set with handles plus a door anchor. No mini loop band. One bodyweight exception (see the audit). |
| Frequency | 3 sessions/week — Monday/Wednesday/Friday, routines A/B/C. |
| Duration | 5 exercises × 3 sets per session: squat, hinge, push, pull, core. |
| Progression | Weight starts at 0, same convention as every other starter plan. In practice a band is progressed by moving to a heavier band or adding reps. |
| Safety boundary | General fitness only. Does not diagnose, treat, or rehabilitate any condition. Check the band and the door anchor for wear before each session; pain (not soreness) or an existing injury needs individualized guidance before starting. |

Two decisions worth stating explicitly:

- **Door anchor is required.** Chosen with the user on 2026-09-26. Without it the plan has no
  vertical pull (every band pulldown needs a high anchor) and no anti-rotation core (Pallof press
  needs a waist-height anchor). One cheap accessory buys a complete movement-pattern set.
- **No mini loop band.** The catalog's only plain band squat (`1004`) needs a loop above the knees.
  Rather than add a third piece of equipment, A/C squat through `1003` band squat row (anchored)
  and B reuses Bodyweight's `2368` split squats. If a loop band is ever added to the brief, `1004`
  band squat and `1408` band hip lift are direct swap candidates.

## 2. Sources consulted

```text
Source: Effects of training with elastic resistance versus conventional resistance on muscular
  strength: a systematic review and meta-analysis (Lopes et al., SAGE Open Medicine, 2019)
URL: https://journals.sagepub.com/doi/10.1177/2050312119831116
Retrieved: 2026-09-26
License: public research article — evidence, not reusable text
What was learned: no significant difference between elastic and conventional resistance training
  for upper- or lower-limb strength, across varied populations and protocols. Supports offering a
  band-only plan as a legitimate option, not a lesser substitute.
What was authored originally: the exercise selection, sets/reps, schedule, and the anchor/no-loop
  equipment decisions — none of that comes from the source.
Open questions: none blocking this plan.
```

Frequency (3×/week for beginners) follows the existing PMC6081873 frequency meta-analysis already
in [Routine research sources](ROUTINE_RESEARCH_SOURCES.md).

## 3. Exercise audit

All ids verified present in `EXDB` (`frontend/src/lib/exercises-data.js`) with the listed
equipment. Setup column is read from each entry's own instructions.

| Catalog ID | Name | Pattern | Equipment | Setup | Review status |
| --- | --- | --- | --- | --- | --- |
| `1003` | band squat row | Squat + horizontal pull | band | Anchor at waist height. | Reviewed (structural fit only). |
| `2368` | split squats | Squat (unilateral) | body weight | None. **The plan's one non-band exercise** — see brief. | Reviewed. |
| `1010` | band straight leg deadlift | Hinge | band | Band under the feet. | Reviewed. |
| `0991` | band pull through | Hinge / glute | band | Anchor at ground level. | Reviewed. |
| `3124` | resistance band seated chest press | Horizontal push | resistance band | Chair. The catalog text names no anchor; band around the back or anchored behind at chest height. | Reviewed. |
| `0989` | band one arm twisting chest press | Horizontal push (unilateral) | band | Anchor at chest height. | Reviewed. |
| `0997` | band shoulder press | Vertical push | band | Band under the feet. | Reviewed. |
| `3116` | band fixed back underhand pulldown | Vertical pull | band | Anchor overhead. | Reviewed. |
| `0974` | band close-grip pulldown | Vertical pull | band | Anchor overhead. | Reviewed. |
| `3144` | resistance band seated straight back row | Horizontal pull | resistance band | Seated, band around the feet. | Reviewed. |
| `0979` | band horizontal pallof press | Core (anti-rotation) | band | Anchor at waist height. | Reviewed. |
| `1015` | band vertical pallof press | Core (anti-rotation) | band | Anchor at chest height. | Reviewed. |
| `1005` | band standing crunch | Core (flexion) | band | Anchor at waist height. | Reviewed. |

Rejected: `0987` band one arm single leg split squat — also needs a bench and an ankle band.
`1004`/`1408`/`1008` — need a mini loop band, excluded by the brief.

## 4. Sessions

| Day | Squat | Hinge | Push | Pull | Core |
| --- | --- | --- | --- | --- | --- |
| A (Mon) | `1003` 3×12 | `1010` 3×12 | `3124` 3×12 | `3116` 3×12 | `0979` 3×10 |
| B (Wed) | `2368` 3×10 | `0991` 3×12 | `0997` 3×12 | `3144` 3×12 | `1015` 3×10 |
| C (Fri) | `1003` 3×12 | `1010` 3×12 | `0989` 3×10 | `0974` 3×12 | `1005` 3×12 |

## 5. Validation and compatibility

- Every session covers squat, hinge, push, pull, and core; across the week both horizontal and
  vertical push and pull appear.
- No program-model change: fixed weekly schedule, static routines, weight 0 — the existing
  `PLANS`/`build` shape in `frontend/src/lib/starter.js`.
- No diagnostic or treatment claim anywhere in the plan.

## Result

**Implemented.** `frontend/src/lib/starter.js` gained `resistance-band` in `PLANS` (routines
`rb-a`/`rb-b`/`rb-c`, Mon/Wed/Fri); `frontend/src/sheets.jsx`'s `PLAN_COPY` gained the translatable
name/description, with the Spanish translation in `frontend/src/locales/es.js` in the same change.
`starter.test.js` (written first, seen failing) and `sheets.starter.test.jsx` cover it. Full
frontend suite: 1346 tests pass. Other locales fall back to English, same as the previous starter
plans (pre-existing `check-locales.mjs` debt, not introduced here).
