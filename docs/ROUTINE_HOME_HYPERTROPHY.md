# Home Hypertrophy Starter Plan

Original routine authored per [docs/ROUTINE_AUTHORING_GUIDE.md](ROUTINE_AUTHORING_GUIDE.md), task #3
of [the routine roadmap](task-rutinas.md): the first hypertrophy plan outside the gym, on the
combined E3 + E1 tier (dumbbells + pull-up bar).

## 1. Routine brief

| Field | Decision |
| --- | --- |
| Name | Home Hypertrophy |
| Audience | People with a training base — graduates of [Dumbbell](ROUTINE_DUMBBELL_NO_BENCH.md) or [Pull-up Bar](ROUTINE_PULL_UP_BAR.md). Not absolute beginners: it assumes a few strict pull-ups and chin-ups. |
| Goal | Hypertrophy. |
| Setting | Home, no gym access assumed. |
| Equipment | A pair of dumbbells and a pull-up bar. No bench. |
| Frequency | 3 sessions/week — Monday/Wednesday/Friday, full-body routines A/B/C. |
| Duration | 6 exercises × 3 sets per session: squat, hinge, push, pull, plus two isolation or core slots. |
| Progression | Weight starts at 0, same convention as every other starter plan. |
| Safety boundary | General fitness only. Does not diagnose, treat, or rehabilitate any condition. Pain (not soreness) or an existing injury needs individualized guidance before starting. |

Brief confirmed with the user on 2026-09-26.

Decisions worth stating explicitly:

- **Full body 3×/week, not upper/lower.** Keeps it distinct from projection P2 (Home Upper/Lower,
  4 days, intermediate) in the roadmap, and hits every major muscle group three times a week.
- **Horizontal push stays a push-up.** No bench, and the catalog has no dumbbell floor press, so
  chest work is `1274` deep push-up (dumbbells as handles, extra range) and `1311` wide push-up.
  They progress by reps and harder variants, not load. A loaded horizontal press is task #4
  (Dumbbell + Bench).
- **Pull-ups at 6 reps, everything else 10–12.** Vertical pulls are the one bodyweight lift that
  cannot be lightened with this equipment; 3×6 is a step up from Pull-up Bar's 3×5. Anyone who
  can't reach 6 yet uses `0688` scapular pull-up or fewer reps until ready.
- **Isolation is included on purpose.** Lateral raises, curls, and triceps extensions add arm and
  shoulder volume that compound lifts alone underfeed at home.

## 2. Sources consulted

```text
Source: Dose-response relationship between weekly resistance training volume and increases in
  muscle mass: A systematic review and meta-analysis (Schoenfeld, Ogborn, Krieger — J Sports Sci,
  2017;35(11):1073-1082)
URL: https://pubmed.ncbi.nlm.nih.gov/27433992/
Retrieved: 2026-09-26 (abstract, via NCBI E-utilities)
License: published research article — evidence, not reusable text
What was learned: graded dose-response between weekly sets and muscle growth (15 studies,
  34 groups); categories <5, 5–9, and 10+ sets per muscle per week. Supports a volume target of
  roughly 9–12 weekly sets for the major groups rather than a minimal plan.
What was authored originally: exercise selection, sets/reps, schedule, and the per-muscle volume
  split.
Open questions: the 3-level categorical effect was only a trend (P = 0.074); treated as guidance.

Source: Strength and Hypertrophy Adaptations Between Low- vs. High-Load Resistance Training:
  A Systematic Review and Meta-analysis (Schoenfeld, Grgic, Ogborn, Krieger — J Strength Cond Res,
  2017;31(12):3508-3523)
URL: https://pubmed.ncbi.nlm.nih.gov/28834797/
Retrieved: 2026-09-26 (abstract, via NCBI E-utilities)
License: published research article — evidence, not reusable text
What was learned: with sets taken to momentary failure, hypertrophy was similar between low loads
  (≤60% 1RM) and high loads (21 studies). Justifies push-ups and light home dumbbells as a
  legitimate hypertrophy stimulus when sets are taken close to failure.
What was authored originally: the push-up-for-chest decision and the rep targets.
Open questions: the included studies trained to failure; the plan records sets × reps only and
  cannot enforce proximity to failure.
```

## 3. Exercise audit

All ids verified present in `EXDB` (`frontend/src/lib/exercises-data.js`). Setup read from each
entry's own instructions; bench-based entries (`0308` fly, `0375` pullover) were rejected because
their instructions start "Lie flat on a bench".

| Catalog ID | Name | Equipment | Pattern | Review status |
| --- | --- | --- | --- | --- |
| `1760` | dumbbell goblet squat | dumbbell | Squat | Reviewed (structural fit only). |
| `0410` | dumbbell single leg split squat | dumbbell | Squat (unilateral) | Reviewed. |
| `1459` | dumbbell romanian deadlift | dumbbell | Hinge | Reviewed. |
| `1757` | dumbbell single leg deadlift | dumbbell | Hinge (unilateral) | Reviewed. |
| `1274` | deep push up | dumbbell (as handles) | Horizontal push | Reviewed. |
| `1311` | wide hand push up | body weight | Horizontal push | Reviewed. |
| `0426` | dumbbell standing overhead press | dumbbell | Vertical push | Reviewed. |
| `0652` | pull-up | body weight (bar) | Vertical pull | Reviewed. |
| `1326` | chin-up | body weight (bar) | Vertical pull | Reviewed. |
| `0651` | pull up (neutral grip) | body weight (bar) | Vertical pull | Reviewed. |
| `0292` | dumbbell one arm bent-over row | dumbbell | Horizontal pull | Reviewed. |
| `0334` | dumbbell lateral raise | dumbbell | Shoulder isolation | Reviewed. |
| `0313` | dumbbell hammer curl | dumbbell | Arm isolation (biceps) | Reviewed. |
| `0294` | dumbbell biceps curl | dumbbell | Arm isolation (biceps) | Reviewed. |
| `0430` | dumbbell standing triceps extension | dumbbell | Arm isolation (triceps) | Reviewed. |
| `0333` | dumbbell kickback | dumbbell | Arm isolation (triceps) | Reviewed. |
| `0472` | hanging leg raise | body weight (bar) | Core | Reviewed. |

Substitution: `0688` scapular pull-up for any pull-up/chin-up the user can't yet do for 6.

## 4. Sessions

| Day | Squat | Pull | Push | Hinge / pull | Slot 5 | Slot 6 |
| --- | --- | --- | --- | --- | --- | --- |
| A (Mon) | `1760` 3×10 | `0652` 3×6 | `1274` 3×10 | `1459` 3×10 | `0334` 3×12 | `0313` 3×12 |
| B (Wed) | `0410` 3×10 | `0292` 3×10 | `0426` 3×10 | `1326` 3×6 | `0430` 3×12 | `0472` 3×10 |
| C (Fri) | `1760` 3×12 | `0651` 3×6 | `1311` 3×10 | `1757` 3×10 | `0294` 3×12 | `0333` 3×12 |

Approximate direct weekly sets: back 12 (9 vertical + 3 horizontal), quads 9, chest 6 (push-ups,
plus overhead press assistance), hamstrings/glutes 6 (plus squats), biceps 6 (plus pulls), triceps
6 (plus pushes), shoulders 6. Chest is the lowest — the known cost of having no bench.

## 5. Validation and compatibility

- Every session covers squat, a vertical pull, a push, and a hinge or second pull.
- No program-model change: fixed weekly schedule, static routines, weight 0 — the existing
  `PLANS`/`build` shape in `frontend/src/lib/starter.js`.
- No diagnostic or treatment claim anywhere in the plan.

## Result

**Implemented.** `frontend/src/lib/starter.js` gained `home-hypertrophy` in `PLANS` (routines
`hh-a`/`hh-b`/`hh-c`, Mon/Wed/Fri); `frontend/src/sheets.jsx`'s `PLAN_COPY` gained the translatable
name/description, with the Spanish translation ("Hipertrofia en casa") in
`frontend/src/locales/es.js`. `starter.test.js` (written first, seen failing) and
`sheets.starter.test.jsx` cover it. Full frontend suite: 1354 tests pass. Other locales fall back
to English, same as the previous starter plans.
