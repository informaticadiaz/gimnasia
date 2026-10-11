# Bodyweight Conditioning Starter Plan

Original routine authored per [docs/ROUTINE_AUTHORING_GUIDE.md](ROUTINE_AUTHORING_GUIDE.md), task #5
of [the routine roadmap](task-rutinas.md): the first dedicated conditioning plan, and the first
starter plan that is timed rather than counted in reps.

## 1. Routine brief

| Field | Decision |
| --- | --- |
| Name | Bodyweight Conditioning |
| Audience | People with a training base — graduates of [Bodyweight](ROUTINE_BODYWEIGHT_NO_EQUIPMENT.md). **Not** a first plan: jumps and burpees make it high-impact. |
| Goal | Conditioning. |
| Setting | Home or anywhere with floor space and a wall. |
| Equipment | None. |
| Frequency | 3 sessions/week — Monday/Wednesday/Friday, routines A/B/C. |
| Duration | One circuit of 5 exercises: 30 s each, 3 rounds, 60 s rest between rounds — about 9:30 before transitions and warm-up. |
| Progression | `time` policy: every set held for the full duration adds 5 s next session; 3 short sessions in a row back off. |
| Safety boundary | General fitness only. Does not diagnose, treat, or rehabilitate any condition. Joint pain on landing, or any existing heart or joint condition, needs individualized guidance before starting. |

Brief confirmed with the user on 2026-09-26.

Decisions worth stating explicitly:

- **Timed circuit, not intervals with a clock.** The app has no session time cap, AMRAP, or EMOM
  (verified in the roadmap's supporting task). A circuit of timed sets inside one superset group,
  with rest only after each round, is the closest faithful shape.
- **The progression policy is set on each exercise.** Time mode defaults to no progression, so
  every exercise carries `prog: 'time'`.
- **Push-ups are timed too.** Every station is 30 s, including `0662` and `1311` — quality reps
  for the full window, rather than a rep target that would break the circuit's rhythm.

## 2. Sources consulted

```text
Source: Extremely low volume, whole-body aerobic-resistance training improves aerobic fitness and
  muscular endurance in females (McRae et al. — Appl Physiol Nutr Metab, 2012;37(6):1124-31)
URL: https://pubmed.ncbi.nlm.nih.gov/22994393/
Retrieved: 2026-09-26 (abstract, via NCBI E-utilities)
License: published research article — evidence, not reusable text
What was learned: 4 weeks, 4×/week of 8 × 20 s whole-body bodyweight intervals (burpees, jumping
  jacks, mountain climbers, squat thrusts) raised VO2peak about as much as 30 min of treadmill
  running (~8% vs ~7%) and improved muscular endurance (push-ups +135%). Supports bodyweight
  circuits as real conditioning, with the same kind of exercises this plan uses.
What was authored originally: the circuit format, exercise selection, 30 s / 60 s timing, rounds,
  and schedule.
Open questions: small groups (n = 7), young recreationally active women, only 4 weeks; supporting
  evidence, not a prescription.
```

## 3. Exercise audit

All ids verified present in `EXDB` (`frontend/src/lib/exercises-data.js`) with
`eq: "body weight"`. The catalog has no plain front plank or jumping jack; `0464` plank with twist
and `3223` star jump stand in.

| Catalog ID | Name | Role in the circuit | Review status |
| --- | --- | --- | --- |
| `0514` | jump squat | Lower body, plyometric | Reviewed (structural fit only). |
| `3361` | skater hops | Lower body, lateral plyometric | Reviewed. |
| `3223` | star jump | Whole body, plyometric | Reviewed. |
| `2368` | split squats | Lower body, low impact | Reviewed. |
| `3655` | walking high knees lunge | Lower body + cardio | Reviewed. |
| `3561` | glute bridge march | Hinge / glutes, low impact | Reviewed. |
| `0662` | push-up | Upper body push | Reviewed. |
| `1311` | wide hand push up | Upper body push | Reviewed. |
| `1471` | inchworm | Whole body, hamstrings + core | Reviewed. |
| `0630` | mountain climber | Core + cardio | Reviewed. |
| `3636` | high knee against wall | Cardio, lower impact than running | Reviewed. |
| `3360` | bear crawl | Whole body, core | Reviewed. |
| `0464` | front plank with twist | Core | Reviewed. |
| `1160` | burpee | Whole body finisher | Reviewed. |
| `0501` | jack burpee | Whole body finisher | Reviewed. |

Each circuit alternates high- and low-impact stations and ends on the hardest one.

## 4. Sessions

Every station 30 s × 3 rounds, 60 s rest after each round.

| Day | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- |
| A (Mon) | `0514` jump squat | `0662` push-up | `0630` mountain climber | `3561` glute bridge march | `1160` burpee |
| B (Wed) | `3361` skater hops | `1471` inchworm | `3636` high knee against wall | `2368` split squats | `0464` plank with twist |
| C (Fri) | `3223` star jump | `1311` wide push-up | `3360` bear crawl | `3655` walking high knees lunge | `0501` jack burpee |

## 5. Validation and compatibility

- Each session is one superset unit (shared `sg`), so the workout moves station to station and
  rests only after a full round (`restSec: 60`).
- `build()` in `frontend/src/lib/starter.js` was extended: an exercise may carry a fourth element
  of extra fields, merged in as-is. Rep-based plans are unchanged (a test pins their exact keys).
- A test builds a real session from the plan and checks it starts as a timed circuit under the
  `time` policy, not as rep sets.
- No diagnostic or treatment claim anywhere in the plan.

## Result

**Implemented.** `frontend/src/lib/starter.js` gained `bodyweight-conditioning` in `PLANS`
(routines `bc-a`/`bc-b`/`bc-c`, Mon/Wed/Fri, goal `conditioning`) and a `circuit` helper;
`frontend/src/sheets.jsx` gained the plan copy and a "Conditioning" chooser section, with Spanish
translations in `frontend/src/locales/es.js`. Tests were written first and seen failing. Full
frontend suite passes. Other locales fall back to English, same as the previous starter plans.
