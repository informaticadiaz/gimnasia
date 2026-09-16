# Bodyweight (No Equipment) Starter Plan

Original routine authored per [docs/ROUTINE_AUTHORING_GUIDE.md](ROUTINE_AUTHORING_GUIDE.md), filling
the one gap in the existing starter catalog (`ppl`, `upper-lower`, `full-body`, `5x5`): every one of
those requires a barbell or a rack. This plan requires nothing.

## 1. Routine brief

| Field | Decision |
| --- | --- |
| Name | Bodyweight |
| Audience | General fitness, no prior training assumed; not a rehabilitation or medical program. |
| Goal | General strength and conditioning using only body weight. |
| Setting | Home, no gym access assumed. |
| Equipment | None required. A pull-up bar is optional and only relevant as a substitution note (see below) — the default prescription never requires one. |
| Frequency | 3 sessions/week, Monday/Wednesday/Friday — matches the existing `ppl`, `full-body` and `5x5` cadence. |
| Duration | A full-body session per day, 5 exercises, 3 sets each — comparable in length to `full-body`. |
| Progression | Weight starts at 0 for every exercise, same as every other starter plan; the app's own per-user progression engine takes over from the first logged session. No custom progression policy is set, matching the convention of the four existing plans (none of them set `prog` on an exercise either). |
| Safety boundary | General fitness only. Does not diagnose, treat, or rehabilitate any condition. Anyone with pain (not soreness) or an existing injury should get individualized guidance before starting. |

## 2. Sources consulted

Per [Routine research sources](ROUTINE_RESEARCH_SOURCES.md), both are classified **reference only** —
studied for structure, never copied as text, exercise selection, or program structure.

```text
Source: Bodyweight Fitness workouts (https://bodyweight.fitness/workouts)
Retrieved: 2026-09-09
License: none granted for reuse — reference only
What was learned: a full-body-per-session structure (not a push/pull/legs split) is the common
  shape for a minimal-equipment 3x/week bodyweight program, because a single session needs to
  cover a squat, a push, and a pull pattern to be worth doing without a split.
What was authored originally: the specific exercise selection, sets/reps, and day-to-day variation
  below — none of it is copied from the source; only the "3 full-body sessions, not a split"
  structural idea was reused, which the brief above states explicitly rather than presenting as
  the source's own program.
Open questions: none blocking this plan.

Source: NHS Strength Exercises (https://www.nhs.uk/live-well/exercise/strength-exercises/)
Retrieved: 2026-09-09
License: none granted for reuse — reference only
What was learned: for a general (non-athlete) home audience, a conservative rep range with
  standard bodyweight moves (squat pattern, push-up, plank-style core work) is the accessible
  default — supports the rep ranges chosen below (8-15) over anything closer to a calisthenics-
  skill program.
What was authored originally: everything encoded in the plan; only the "keep it conservative and
  accessible" audience framing was carried over.
Open questions: none blocking this plan.
```

## 3. Exercise audit

The catalog (`frontend/src/lib/exercises-data.js`, `EXDB`) has 325 entries tagged `eq: "body weight"`.
**It has no plain two-leg "air squat" or "plank" entry at all** — searched by name, none exists under
any equipment tag. Every other movement pattern needed for a full-body session had a usable
candidate. All ids below are verified present in `EXDB` with `eq: "body weight"`.

| Catalog ID | Name | Movement pattern | Level | Substitution | Review status |
| --- | --- | --- | --- | --- | --- |
| `2368` | split squats | Squat (unilateral) | General | No plain two-leg squat exists in the catalog; split squats is the closest safe substitute. A future audited addition of a standard air squat would be a direct swap. | Reviewed (structural fit only — not a health claim). |
| `0662` | push-up | Horizontal push | General | `0659` push-up (wall) is the easier regression for someone who cannot yet do a floor push-up. | Reviewed. |
| `0283` | diamond push-up | Horizontal push (triceps emphasis) | Intermediate | Regress to `0662` push-up if elbow width is uncomfortable. | Reviewed. |
| `1311` | wide hand push-up | Horizontal push (chest emphasis) | General | Regress to `0662` push-up. | Reviewed. |
| `0499` | inverted row | Horizontal pull | General | Needs a sturdy waist-high edge (table, low bar) — not a dedicated purchase, but not literally zero setup either; flagged in the brief as the plan's one soft equipment assumption. Substitute: `0652` pull-up, for anyone who has a pull-up bar and wants a full-ROM vertical-pull alternative. | Reviewed. |
| `0497` | inverted row v. 2 | Horizontal pull | General | Same as `0499`. | Reviewed. |
| `3166` | bodyweight standing row | Horizontal pull (standing, band-free) | General | No anchor needed at all — the true zero-setup pull option if the inverted-row table/edge assumption is unwanted. | Reviewed. |
| `3013` | low glute bridge on floor | Hinge / glute | General | None needed — floor-only, no regression required. | Reviewed. |
| `3561` | glute bridge march | Hinge / glute (dynamic) | General | Regress to `3013` low glute bridge on floor. | Reviewed. |
| `0001` | 3/4 sit-up | Core (flexion) | General | None needed. | Reviewed. |
| `0003` | air bike | Core (rotational) | General | None needed. | Reviewed. |
| `0464` | front plank with twist | Core (anti-rotation, dynamic) | General | Stands in for a plain plank hold, which does not exist in the catalog. Regress by holding a static plank position instead of twisting, at the same rep count read as a time-under-tension note rather than reps, if that suits the lifter better. | Reviewed. |
| `0630` | mountain climber | Locomotion / conditioning finisher | General | None needed. | Reviewed. |

## 4-5. Design, validation, and compatibility

- Goal/audience/equipment/schedule agree with the brief above.
- All 13 exercise IDs resolve in `EXIDX` (verified — see the added test).
- Movement-pattern coverage per session: squat, horizontal push, horizontal pull, hinge/glute, core —
  every day hits all five; only the specific push/pull/core exercise rotates across days A/B/C for
  variety, the same pattern the existing `full-body` plan already uses.
- No new program-model feature needed: fixed weekly schedule (Mon/Wed/Fri), static routines, weight
  starts at 0 — fully within what `frontend/src/lib/starter.js`'s current `PLANS`/`build` shape
  already supports. No progression-policy decision was needed because none of the four existing
  plans set one either (this plan follows the same convention, not a new one).
- Health-limitation boundary: no diagnostic or treatment claim is made anywhere in the plan.

## Result

**Implemented.** `frontend/src/lib/starter.js` gained a `bodyweight` entry in `PLANS` (routines
`bw-a`/`bw-b`/`bw-c`, Monday/Wednesday/Friday); `frontend/src/sheets.jsx`'s `PLAN_COPY` gained the
matching translatable name/description; `frontend/src/lib/starter.test.js` and
`frontend/src/sheets.starter.test.jsx` were extended to cover it. Full test suite (1334 tests) and
production build both pass.

One open item for a future audit, not a blocker for this plan: the catalog has no plain two-leg
squat or plank entry at all. If either is added later as a reviewed catalog exercise, this plan's
`2368` and `0464` picks should be revisited as direct swaps.
