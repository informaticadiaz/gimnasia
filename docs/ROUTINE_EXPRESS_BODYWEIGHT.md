# Express Bodyweight Starter Plan

A short, no-equipment entry point authored under the
[Routine authoring guide](ROUTINE_AUTHORING_GUIDE.md). It complements, rather than replaces,
[Bodyweight](ROUTINE_BODYWEIGHT_NO_EQUIPMENT.md): this plan preserves a three-day beginner
cadence while reducing each session from 15 to 8 work sets.

## Routine brief

| Field | Decision |
| --- | --- |
| Name | Express Bodyweight |
| Audience | Beginners seeking a short general-fitness home routine; not a rehabilitation or medical program. |
| Goal | Build a consistent full-body strength-training habit with minimal session volume. |
| Setting | Home. |
| Equipment | None. |
| Frequency | Monday, Wednesday, and Friday. |
| Duration | Four exercises, two sets each (8 work sets) per session. The same prescription repeats on all three days. |
| Progression | Every exercise starts at weight 0; the existing per-user progression engine applies after the first logged session. No program-specific policy is set. |
| Safety boundary | General fitness only. Stop for pain (not ordinary effort or soreness), and seek individualized guidance for injury, medical conditions, or uncertainty about starting exercise. |

## Source boundary

The plan uses the existing reference-only sources recorded in
[Routine research sources](ROUTINE_RESEARCH_SOURCES.md): Bodyweight Fitness workouts and NHS
Strength Exercises. Their licensed material, exercise selections, and text were not copied.
The authored design choice is a four-movement, two-set full-body template that favors a repeatable
beginner session over a longer or skill-oriented program.

## Exercise audit and prescription

All exercise IDs are existing `body weight` entries in `EXDB`; the automated starter-plan test
also verifies that each resolves through `EXIDX` and starts at weight 0.

| Catalog ID | Exercise | Pattern | Prescription | Beginner note |
| --- | --- | --- | --- | --- |
| `2368` | split squats | Squat | 2 × 8 | The catalog has no plain air squat; use support for balance if needed. |
| `0659` | push-up (wall) | Horizontal push | 2 × 8 | Wall height can make the movement easier while maintaining control. |
| `3166` | bodyweight standing row | Pull | 2 × 10 | Uses the catalog's no-equipment standing pull pattern; no table or pull-up bar is required. |
| `3013` | low glute bridge on floor | Hinge / glute | 2 × 10 | Floor-only glute/hip extension. |

The four movements cover squat, push, pull, and hip-extension patterns. It intentionally omits
extra isolation and core work to keep the session short. People who want the longer five-pattern,
15-set format can use the existing Bodyweight plan instead.

## Implementation and validation

- Program id: `express-bodyweight`; goal: `general`.
- Weekly schedule: Monday/Wednesday/Friday, with the same four-movement prescription on each day.
- No timer, circuit, equipment flag, or new progression behavior is introduced.
- `starter.test.js` locks the exercise IDs, sets, reps, schedule, catalog validity, zero starting
  weight, and fresh routine-object behavior; the chooser test locks its visible placement under
  General fitness.

## Result

**Implemented.** The plan is selectable as **Express Bodyweight** and has no gym marker in the
starter-plan chooser.
