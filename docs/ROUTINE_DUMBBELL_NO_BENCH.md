# Dumbbell (No Bench) Starter Plan

Original routine authored per [docs/ROUTINE_AUTHORING_GUIDE.md](ROUTINE_AUTHORING_GUIDE.md), filling a
gap the catalog still had after Bodyweight shipped: nothing between "zero equipment" and "full gym."
This plan assumes a pair of dumbbells and nothing else — no gym, no bench, no barbell.

## 1. Routine brief

| Field | Decision |
| --- | --- |
| Name | Dumbbell |
| Audience | Absolute beginners with no prior structured resistance training. |
| Goal | Build a consistent full-body training habit with the minimum viable home equipment. |
| Setting | Home, no gym access assumed. |
| Equipment | A pair of adjustable dumbbells only — no bench, no barbell, no rack. One bodyweight
  exception (see the exercise audit) because the catalog has no dumbbell floor press. |
| Frequency | 2 sessions/week, non-consecutive — Monday/Thursday. |
| Duration | Full-body per session, 5 exercises, 3 sets each. |
| Progression | Weight starts at 0 for every exercise, same convention as the other five starter
  plans — none of them set a custom `prog` policy either. |
| Safety boundary | General fitness only. Does not diagnose, treat, or rehabilitate any condition.
  Pain (not soreness) or an existing injury needs individualized guidance before starting. |

Two decisions worth stating explicitly, since they depart from the catalog's existing pattern:

- **Frequency is 2×/week, not 3×.** Every other starter plan trains 3-4×/week. This one is
  deliberately lower-frequency, matched to its audience — see the evidence source below.
- **The same three primary lifts (squat, hinge, press) repeat unchanged on both days**, instead
  of varying like Full Body's A/B/C rotation. At only 2 sessions/week, repetition on the
  highest-skill-demand lifts trades novelty for faster motor learning — a defensible tradeoff for
  absolute beginners specifically, not a general recommendation. Only the row and the push vary.

## 2. Sources consulted

Per [Routine research sources](ROUTINE_RESEARCH_SOURCES.md): one evidence source, one
routine-design reference — both newly added to that register by this routine.

```text
Source: Weekly Training Frequency Effects on Strength Gain: A Meta-Analysis (PMC6081873)
Retrieved: 2026-09-16
License: public research article — evidence, not reusable text
What was learned: an RT frequency of 2-3 days/week for previously untrained individuals produces
  optimum strength gains; higher frequency is not a strict upgrade for beginners specifically. This
  directly supports the brief's frequency choice rather than defaulting to the catalog's usual 3×.
What was authored originally: the exercise selection, sets/reps, exact schedule, and the
  "repeat the primary lifts" design decision below — none of that is from the source, only the
  frequency justification is.
Open questions: none blocking this plan.

Source: Dumbbell Only Home Or Gym Full Body Workout — Muscle & Strength
Retrieved: 2026-09-16
License: none granted for reuse — reference only
What was learned: real-world dumbbell-only, no-bench programs commonly solve the "no bench chest
  press" problem with a dumbbell floor press — confirming this is a known, common constraint, not
  an edge case unique to this catalog.
What was authored originally: everything encoded in the plan. The source confirmed the floor-press
  gap is real-world common; it did not resolve it, since openGym's catalog has no dumbbell floor
  press entry at all (see the audit below) — the substitution decision here is this routine's own.
Open questions: none blocking this plan.
```

## 3. Exercise audit

All ids below are verified present in `EXDB` (`frontend/src/lib/exercises-data.js`) with the
listed equipment.

| Catalog ID | Name | Movement pattern | Equipment | Substitution | Review status |
| --- | --- | --- | --- | --- | --- |
| `1760` | dumbbell goblet squat | Squat | dumbbell | None needed. | Reviewed (structural fit only). |
| `1459` | dumbbell romanian deadlift | Hinge / hamstrings | dumbbell | None needed. | Reviewed. |
| `0293` | dumbbell bent over row | Horizontal pull (bilateral) | dumbbell | Day B swaps to `0292` for a unilateral variant. | Reviewed. |
| `0292` | dumbbell one arm bent-over row | Horizontal pull (unilateral) | dumbbell | Day A uses `0293` instead. | Reviewed. |
| `0426` | dumbbell standing overhead press | Vertical push | dumbbell | None needed. | Reviewed. |
| `0662` | push-up | Horizontal push | body weight | **The plan's one non-dumbbell exercise.** The catalog has no dumbbell floor press (only `0065` barbell and `1298` kettlebell floor-press variants exist — verified by search, neither usable here). A push-up needs *less* equipment than a dumbbell, not a different kind of access, so it doesn't reintroduce a real-world barrier. If a dumbbell floor press is ever added as a reviewed catalog entry, this is a direct swap candidate. | Reviewed (structural fit only). |
| `1311` | wide hand push up | Horizontal push (chest emphasis) | body weight | Day A uses `0662` instead; same equipment exception. | Reviewed. |

## 4-5. Design, validation, and compatibility

- Goal/audience/equipment/schedule agree with the brief above.
- All 7 distinct exercise IDs resolve in `EXIDX` (verified — see `starter.test.js`).
- Movement-pattern coverage per session: squat, hinge, horizontal pull, vertical push, horizontal
  push — every day hits all five; only the pull and the push exercise differ between Day A and Day B.
- No new program-model feature needed: fixed weekly schedule (Monday/Thursday), static routines,
  weight starts at 0 — fully within `frontend/src/lib/starter.js`'s existing `PLANS`/`build` shape.
  This is the first starter plan with a 2-day schedule; `starterPlanOptions`' day count is read off
  `schedule.length` already, so it needed no code change to report "2 days per week" correctly.
- Health-limitation boundary: no diagnostic or treatment claim is made anywhere in the plan.

## Result

**Implemented.** `frontend/src/lib/starter.js` gained a `dumbbell` entry in `PLANS` (routines
`db-a`/`db-b`, Monday/Thursday); `frontend/src/sheets.jsx`'s `PLAN_COPY` gained the matching
translatable name/description, with the Spanish translation added to `frontend/src/locales/es.js`
in the same change (not a follow-up fix, unlike Bodyweight's — see
[the authoring guide's 2026-09-16 note](ROUTINE_AUTHORING_GUIDE.md)). `starter.test.js` and
`sheets.starter.test.jsx` were extended to cover it. Full frontend test suite (1338 tests) passes.

One open item for a future audit, not a blocker for this plan: the catalog has no dumbbell floor
press. If one is added later as a reviewed entry, this plan's `0662`/`1311` push-up picks on both
days should be revisited as a direct swap back to an all-dumbbell exercise selection.
