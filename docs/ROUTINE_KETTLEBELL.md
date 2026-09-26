# Kettlebell Starter Plan

Original routine authored per [docs/ROUTINE_AUTHORING_GUIDE.md](ROUTINE_AUTHORING_GUIDE.md), task #2
of [the routine roadmap](task-rutinas.md): the first plan whose goal includes conditioning, on the
E4 kettlebell tier.

## 1. Routine brief

| Field | Decision |
| --- | --- |
| Name | Kettlebell |
| Audience | People with a training base — e.g. after [Bodyweight](ROUTINE_BODYWEIGHT_NO_EQUIPMENT.md) or [Dumbbell](ROUTINE_DUMBBELL_NO_BENCH.md). **Not** absolute beginners: the swing is ballistic and technical. |
| Goal | Strength and conditioning. |
| Setting | Home, no gym access assumed. |
| Equipment | A matched pair of kettlebells (same weight). Chosen with the user on 2026-09-26 over a single kettlebell: roughly half the catalog's kettlebell entries need two. |
| Frequency | 3 sessions/week — Monday/Wednesday/Friday, routines A/B/C. |
| Duration | 5 exercises × 3 sets: squat, hinge, push, pull, and a core or conditioning slot. |
| Progression | Weight starts at 0, same convention as every other starter plan. |
| Safety boundary | General fitness only. Does not diagnose, treat, or rehabilitate any condition. Learn the swing and clean with a light weight first; pain (not soreness) or an existing injury needs individualized guidance before starting. |

Decisions worth stating explicitly:

- **The swing appears on A and C.** The catalog has no kettlebell deadlift (only dumbbell
  deadlift variants exist), so `0549` swing is the only pure kettlebell hinge. B hinges through
  `0552` two-arm clean instead.
- **Conditioning is volume-based, not timed.** The evidence source used a 30:30 s work:rest
  interval protocol; a starter plan only records sets × reps, so conditioning here comes from
  higher-rep ballistic sets (swing ×15/×20, sumo high pull ×12). Timed intervals are out of scope
  until the time-based progression check in the roadmap is done.
- **No vertical pull.** Same limit as Dumbbell; pairing kettlebells with a pull-up bar belongs to a
  future combined-equipment plan, not this one.

## 2. Sources consulted

```text
Source: Implementation and Evaluation of a 10-Week Kettlebell Training Load Distribution on
  Strength and Aerobic Capacity in Recreationally Trained Women (Zimerer et al., Journal of
  Chiropractic Medicine, 2024)
URL: https://pmc.ncbi.nlm.nih.gov/articles/PMC11701850/
Retrieved: 2026-09-26
License: public research article — evidence, not reusable text
What was learned: 3 sessions/week of kettlebell training for 10 weeks (30:30 s work:rest) raised
  1RM leg press by 23.7% and VO2max by 9.6% in recreationally active women (n=11). Supports both
  halves of the goal (strength + conditioning) and the 3×/week frequency, for a trained-base
  audience — matching this brief's audience choice.
What was authored originally: the exercise selection, sets/reps, schedule, and the
  volume-instead-of-intervals decision — none of that comes from the source.
Open questions: small sample, one population (young women); treated as supporting evidence, not
  a prescription.
```

## 3. Exercise audit

All ids verified present in `EXDB` (`frontend/src/lib/exercises-data.js`) with `eq: "kettlebell"`.
Setup read from each entry's own instructions.

| Catalog ID | Name | Pattern | Setup | Review status |
| --- | --- | --- | --- | --- |
| `0534` | kettlebell goblet squat | Squat | One bell held at the chest. | Reviewed (structural fit only). |
| `0536` | kettlebell lunge pass through | Squat (unilateral) | One bell passed under the front leg. | Reviewed. |
| `0533` | kettlebell front squat | Squat | One bell held at the chest with both hands (catalog text). | Reviewed. |
| `0549` | kettlebell swing | Hinge (ballistic) | One bell, both hands. | Reviewed. |
| `0552` | kettlebell two arm clean | Hinge → rack | Catalog text describes one bell, both hands. | Reviewed. |
| `0553` | kettlebell two arm military press | Vertical push | Pair. | Reviewed. |
| `0519` | kettlebell alternating press on floor | Horizontal push | Pair, lying on the floor. | Reviewed. |
| `0520` | kettlebell alternating press | Vertical push | Pair. | Reviewed. |
| `1345` | kettlebell two arm row | Horizontal pull | Pair. | Reviewed. |
| `0521` | kettlebell alternating renegade row | Horizontal pull + anti-rotation | Pair, high plank on the handles. | Reviewed. |
| `0522` | kettlebell alternating row | Horizontal pull | Pair. | Reviewed. |
| `0554` | kettlebell windmill | Core (lateral) | One bell overhead; reps are per side. | Reviewed. |
| `0532` | kettlebell figure 8 | Core / conditioning | One bell. | Reviewed. |
| `0548` | kettlebell sumo high pull | Conditioning (hinge + pull) | One bell, both hands. | Reviewed. |

Not used: the double jerk/snatch/push press entries (`0527`–`0529`) — too technical for this
audience's first kettlebell plan; `0544` pistol squat and `0551` Turkish get-up — skill-heavy.

## 4. Sessions

| Day | Squat | Hinge | Push | Pull | Core / conditioning |
| --- | --- | --- | --- | --- | --- |
| A (Mon) | `0534` 3×10 | `0549` 3×15 | `0553` 3×8 | `1345` 3×10 | `0554` 3×6 |
| B (Wed) | `0536` 3×8 | `0552` 3×8 | `0519` 3×10 | `0521` 3×8 | `0532` 3×10 |
| C (Fri) | `0533` 3×8 | `0549` 3×20 | `0520` 3×8 | `0522` 3×10 | `0548` 3×12 |

## 5. Validation and compatibility

- Every session covers squat, hinge, push, pull, and a core/conditioning slot.
- No program-model change: fixed weekly schedule, static routines, weight 0 — the existing
  `PLANS`/`build` shape in `frontend/src/lib/starter.js`.
- No diagnostic or treatment claim anywhere in the plan.

## Result

**Implemented.** `frontend/src/lib/starter.js` gained `kettlebell` in `PLANS` (routines
`kb-a`/`kb-b`/`kb-c`, Mon/Wed/Fri); `frontend/src/sheets.jsx`'s `PLAN_COPY` gained the translatable
name/description, with the Spanish translation ("Pesas rusas") in `frontend/src/locales/es.js`.
`starter.test.js` (written first, seen failing) and `sheets.starter.test.jsx` cover it. Full
frontend suite: 1350 tests pass. Other locales fall back to English, same as the previous starter
plans.
