# Dumbbell + Bench Starter Plan

Original routine authored per [docs/ROUTINE_AUTHORING_GUIDE.md](ROUTINE_AUTHORING_GUIDE.md), task #4
of [the routine roadmap](task-rutinas.md): the first strength plan at home with free weights, on the
E5 tier (dumbbells + flat bench). It closes the missing loaded horizontal press of
[Dumbbell](ROUTINE_DUMBBELL_NO_BENCH.md) and [Home Hypertrophy](ROUTINE_HOME_HYPERTROPHY.md).

## 1. Routine brief

| Field | Decision |
| --- | --- |
| Name | Dumbbell + Bench |
| Audience | Graduates of [Dumbbell](ROUTINE_DUMBBELL_NO_BENCH.md): past the first beginner stage, comfortable with the goblet squat, Romanian deadlift, and one-arm row. |
| Goal | Strength. |
| Setting | Home, no gym access assumed. |
| Equipment | A pair of dumbbells and a **flat** bench. Chosen with the user on 2026-09-26 over an adjustable bench: cheaper and more common, at the cost of incline presses and chest-supported rows. |
| Frequency | 3 sessions/week — Monday/Wednesday/Friday, full-body routines A/B/C. |
| Duration | 5 exercises per session: squat, hinge, press, row, one accessory. Main lifts 4×6, the rest 3×8–10. |
| Progression | Weight starts at 0, same convention as every other starter plan. |
| Safety boundary | General fitness only. Does not diagnose, treat, or rehabilitate any condition. Pain (not soreness) or an existing injury needs individualized guidance before starting. |

Brief confirmed with the user on 2026-09-26.

Decisions worth stating explicitly:

- **Lower reps than Home Hypertrophy.** Heavy loads favour 1RM strength (see sources), so the press
  and deadlift sit at 4×6. Dumbbells cap how heavy a squat can get, so squats stay at 3–4×8.
- **Same row every day.** With a flat bench the catalog's only practical row is `0292` one-arm
  bent-over row; incline chest-supported rows (`0327`, `1331`) need an adjustable bench.
- **The bench works for the legs too.** `0431` step-up uses it as the step, and `0410` split
  squat can use it as a rear-foot support.
- **No vertical pull.** Same limit as Dumbbell; a pull-up bar belongs to Home Hypertrophy.

## 2. Sources consulted

```text
Source: Effect of Resistance Training Frequency on Gains in Muscular Strength: A Systematic
  Review and Meta-Analysis (Grgic, Schoenfeld, Davies, Lazinica, Krieger, Pedisic — Sports Med,
  2018;48(5):1207-1220)
URL: https://pubmed.ncbi.nlm.nih.gov/29470825/
Retrieved: 2026-09-26 (abstract, via NCBI E-utilities)
License: published research article — evidence, not reusable text
What was learned: strength gains rose with frequency (ES 0.74 / 0.82 / 0.93 / 1.08 for
  1 / 2 / 3 / 4+ sessions a week, 22 studies), mainly through the extra volume; frequency mattered
  most for multi-joint upper-body lifts. Supports 3 sessions a week with a press every session.
What was authored originally: exercise selection, sets/reps, and schedule.
Open questions: with volume equated, frequency alone had no significant effect.

Source: Strength and Hypertrophy Adaptations Between Low- vs. High-Load Resistance Training
  (Schoenfeld, Grgic, Ogborn, Krieger — J Strength Cond Res, 2017)
URL: https://pubmed.ncbi.nlm.nih.gov/28834797/
Retrieved: 2026-09-26 (already recorded for Home Hypertrophy)
What was learned: 1RM strength gains favour high loads (>60% 1RM). Supports the 4×6 main lifts.
```

## 3. Exercise audit

All ids verified present in `EXDB` (`frontend/src/lib/exercises-data.js`) with `eq: "dumbbell"`.
Setup read from each entry's own instructions.

| Catalog ID | Name | Pattern | Setup | Review status |
| --- | --- | --- | --- | --- |
| `1760` | dumbbell goblet squat | Squat | One dumbbell at the chest. | Reviewed (structural fit only). |
| `0431` | dumbbell step-up | Squat (unilateral) | Pair; steps onto the bench. | Reviewed. |
| `0410` | dumbbell single leg split squat | Squat (unilateral) | Pair; bench optional as rear-foot support. | Reviewed. |
| `1459` | dumbbell romanian deadlift | Hinge | Pair. | Reviewed. |
| `0300` | dumbbell deadlift | Hinge | Pair. | Reviewed. |
| `0289` | dumbbell bench press | Horizontal push | Pair; lying flat on the bench. | Reviewed. |
| `0352` | dumbbell neutral grip bench press | Horizontal push | Pair; lying flat, palms facing. | Reviewed. |
| `0405` | dumbbell seated shoulder press | Vertical push | Pair; seated on the bench. | Reviewed. |
| `0292` | dumbbell one arm bent-over row | Horizontal pull | One dumbbell; catalog text is standing, bench support optional. | Reviewed. |
| `0351` | dumbbell lying triceps extension | Accessory (triceps) | Pair; lying flat on the bench. | Reviewed. |
| `0375` | dumbbell pullover | Accessory (chest/lats) | One dumbbell; lying flat on the bench. | Reviewed. |
| `0294` | dumbbell biceps curl | Accessory (biceps) | Pair. | Reviewed. |

Not used: incline presses and rows (`0314`, `0327`, `1331`) — need an adjustable bench; preacher
curls (`0372`) — need a preacher pad; `0291` bench squat — only a box-depth goblet squat.

## 4. Sessions

| Day | Squat | Hinge | Press | Row | Accessory |
| --- | --- | --- | --- | --- | --- |
| A (Mon) | `1760` 4×8 | `1459` 3×8 | `0289` 4×6 | `0292` 4×8 | `0351` 3×10 |
| B (Wed) | `0431` 3×8 | `0300` 4×6 | `0405` 4×6 | `0292` 4×8 | `0375` 3×10 |
| C (Fri) | `0410` 3×8 | `1459` 3×8 | `0352` 4×6 | `0292` 4×8 | `0294` 3×10 |

## 5. Validation and compatibility

- Every session covers squat, hinge, a press, and a row.
- No program-model change: fixed weekly schedule, static routines, weight 0 — the existing
  `PLANS`/`build` shape in `frontend/src/lib/starter.js`.
- No diagnostic or treatment claim anywhere in the plan.

## Result

**Implemented.** `frontend/src/lib/starter.js` gained `dumbbell-bench` in `PLANS` (routines
`dbb-a`/`dbb-b`/`dbb-c`, Mon/Wed/Fri); `frontend/src/sheets.jsx`'s `PLAN_COPY` gained the
translatable name/description, with the Spanish translation ("Mancuernas + banco") in
`frontend/src/locales/es.js`. `starter.test.js` (written first, seen failing) and
`sheets.starter.test.jsx` cover it. Full frontend suite: 1358 tests pass. Other locales fall back
to English, same as the previous starter plans.
