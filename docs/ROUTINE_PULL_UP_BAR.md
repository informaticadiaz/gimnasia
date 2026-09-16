# Pull-up Bar Starter Plan

Original routine authored per [docs/ROUTINE_AUTHORING_GUIDE.md](ROUTINE_AUTHORING_GUIDE.md). The
next step up from [Bodyweight](ROUTINE_BODYWEIGHT_NO_EQUIPMENT.md): the same home, no-gym setting,
plus exactly one piece of equipment — a pull-up bar — which unlocks a real vertical pull instead
of Bodyweight's inverted-row/standing-row substitutes, plus hanging core work.

## 1. Routine brief

| Field | Decision |
| --- | --- |
| Name | Pull-up Bar |
| Audience | General fitness, comfortable with basic bodyweight training already — not a
  day-one program. Anyone who cannot yet do a full pull-up/chin-up should substitute per the
  exercise audit below rather than treat this as inaccessible. |
| Goal | Build toward a real vertical pull (pull-up/chin-up) while keeping full-body coverage. |
| Setting | Home, no gym access assumed. |
| Equipment | A doorframe or wall-mounted pull-up bar, plus body weight — nothing else. Safe
  installation/anchoring of the bar itself is the user's responsibility; openGym has no way to
  verify it. |
| Frequency | 3 sessions/week — Monday/Wednesday/Friday, matching most of the catalog. |
| Duration | Full-body per session, 5 exercises, 3 sets each — same shape as Bodyweight. |
| Progression | Weight starts at 0, same convention as every other starter plan. No custom `prog`
  policy — see the substitution note below for how a beginner adapts the plan instead. |
| Safety boundary | General fitness only. Does not diagnose, treat, or rehabilitate any condition.
  Pain (not soreness) or an existing injury needs individualized guidance before starting. |

## 2. Sources consulted

Per [Routine research sources](ROUTINE_RESEARCH_SOURCES.md): one new reference, plus the
already-registered Bodyweight Fitness reference (calisthenics progressions).

```text
Source: The Ultimate Pull Up Progression Plan for Beginners — SET FOR SET
Retrieved: 2026-09-16
License: none granted for reuse — reference only
What was learned: the standard regression ladder for someone who cannot do a full pull-up is
  dead hang -> scapular pull -> row -> negative pull-up -> band-assisted -> first pull-up. This
  validates prescribing a full pull-up/chin-up as the default while documenting `0688` scapular
  pull-up and Bodyweight's `0499` inverted row as the substitution path, instead of writing a
  separate beginner routine.
What was authored originally: the exercise selection, sets/reps, exact schedule, and the choice
  of which two regression rungs to point to. The source's five-step ladder is not encoded in the
  app anywhere — openGym has no exercise-substitution feature, so this is documentation guidance
  for the user, not a program feature.
Open questions: none blocking this plan.
```

## 3. Exercise audit

All ids below are verified present in `EXDB` (`frontend/src/lib/exercises-data.js`), all tagged
`eq: "body weight"`.

| Catalog ID | Name | Movement pattern | Substitution | Review status |
| --- | --- | --- | --- | --- |
| `2368` | split squats | Squat (unilateral) | Same catalog gap as Bodyweight — no plain two-leg squat exists; reused verbatim, see [its own audit](ROUTINE_BODYWEIGHT_NO_EQUIPMENT.md). | Reviewed (structural fit only, per prior audit). |
| `0652` | pull-up | Vertical pull | **If a full pull-up isn't yet possible:** `0688` scapular pull-up (the first regression rung) or `0499` inverted row (needs a waist-high edge instead of the bar — Bodyweight's own soft-equipment exception). | Reviewed. |
| `1326` | chin-up | Vertical pull (supinated grip) | Same substitution path as `0652`. | Reviewed. |
| `0651` | pull up (neutral grip) | Vertical pull (neutral grip) | Same substitution path as `0652`. | Reviewed. |
| `0662` | push-up | Horizontal push | `0659` push-up (wall), per Bodyweight's own audit. | Reviewed. |
| `1311` | wide hand push up | Horizontal push (chest emphasis) | Regress to `0662`. | Reviewed. |
| `0283` | diamond push-up | Horizontal push (triceps emphasis) | Regress to `0662`. | Reviewed. |
| `3013` | low glute bridge on floor | Hinge / glute | None needed — floor-only. Reused on both Day A and Day C: the catalog has only two clean no-equipment glute-bridge variants (see next row), same limitation Bodyweight hit with its squat pattern. | Reviewed. |
| `3561` | glute bridge march | Hinge / glute (dynamic) | Regress to `3013`. | Reviewed. |
| `0472` | hanging leg raise | Core (hanging, flexion) | New pattern Bodyweight couldn't offer without a bar. Regress by bending the knees more (a hanging knee raise) if a straight-leg raise is too hard. | Reviewed. |
| `1761` | hanging oblique knee raise | Core (hanging, rotational) | Regress to `0472` with less rotation. | Reviewed. |
| `0475` | hanging straight leg raise | Core (hanging, flexion, harder) | Regress to `0472`. | Reviewed. |

## 4-5. Design, validation, and compatibility

- Goal/audience/equipment/schedule agree with the brief above.
- All 12 distinct exercise IDs resolve in `EXIDX` (verified — see `starter.test.js`).
- Movement-pattern coverage per session: squat, vertical pull, horizontal push, hinge/glute, core —
  every day hits all five; the pull, push, and hanging-core exercises rotate across days A/B/C for
  variety, the same pattern Bodyweight and Full Body already use. Squat and the day-A/C hinge pick
  repeat verbatim, for the same catalog-coverage reason Bodyweight's squat pattern does.
- No new program-model feature needed: fixed weekly schedule (Monday/Wednesday/Friday), static
  routines, weight starts at 0 — fully within the existing `PLANS`/`build` shape.
- The substitution ladder (scapular pull-up / inverted row) is documentation only — openGym has no
  in-app exercise-substitution mechanism. A user who needs the regression edits the routine
  themselves after loading the plan.
- Health-limitation boundary: no diagnostic or treatment claim is made anywhere in the plan.
  Pull-up bar mounting safety is explicitly out of scope (see the brief's Equipment field).

## Result

**Implemented.** `frontend/src/lib/starter.js` gained a `pull-up-bar` entry in `PLANS` (routines
`pb-a`/`pb-b`/`pb-c`, Monday/Wednesday/Friday); `frontend/src/sheets.jsx`'s `PLAN_COPY` gained the
matching translatable name/description, with the Spanish translation added to
`frontend/src/locales/es.js` in the same change. `starter.test.js` and `sheets.starter.test.jsx`
were extended to cover it. Full frontend test suite (1342 tests) passes.

The catalog now has seven starter plans, three of them home/no-gym (Bodyweight, Dumbbell,
Pull-up Bar), each assuming a different, minimal piece of equipment.
