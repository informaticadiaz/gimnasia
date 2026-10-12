# Routine roadmap: goals × equipment

This is the authorized work queue and status document for starter programs. The
[Starter program catalog](STARTER_PROGRAM_CATALOG.md) remains the product authority for coverage
and objectives; the [Routine authoring guide](ROUTINE_AUTHORING_GUIDE.md) defines how to create
or change one program. This roadmap cannot redefine either.

## Operational rule

Every unfinished backlog row and projection in this document is already authorized product work.
Codex may turn the next eligible item into active Codex/SDD work without requesting another
product approval. Creating its brief, prioritizing it relative to other authorized items, or
recording an SDD change is execution planning—not a new authorization gate. A technical
dependency or unresolved safety/design constraint can block or reorder work, but cannot revoke
that authorization.

## Planning axes

The following axes help prioritize authorized future work. They are not a second definition of
the product catalog.

| Axis | Examples | Current planning gaps |
| --- | --- | --- |
| Equipment | None, pull-up bar, bands, dumbbells, kettlebells, full gym | Additional combinations and access constraints. |
| Experience | Beginner, trained base, intermediate, advanced | Intermediate and advanced coverage. |
| Frequency | 2, 3, 4, 5–6 sessions / week | 5–6 sessions / week. |
| Session length | Short, standard, long | Short and long formats. |
| Setting and audience | Home, gym, outdoor, travel; general adult, older adult, returning | Outdoor, travel, older-adult, and returning contexts. |
| Progression | Existing engine policies | Explicit, program-level policies. |

## Current published portfolio

The [catalog](STARTER_PROGRAM_CATALOG.md) is the authoritative list of coverage. This roadmap
uses its program ids and links only to track documentation and future prioritization.

| Program id | Category | Document |
| --- | --- | --- |
| `ppl` | Hypertrophy | [PPL](ROUTINE_PPL.md) |
| `upper-lower` | Hypertrophy | [Upper/Lower](ROUTINE_UPPER_LOWER.md) |
| `full-body` | General fitness | [Full Body](ROUTINE_FULL_BODY.md) |
| `5x5` | Strength | [Intrvl 5×5](EXTERNAL_ROUTINE_INTRVL_STRENGTH_5X5.md) |
| `bodyweight-conditioning` | Conditioning | [Bodyweight Conditioning](ROUTINE_BODYWEIGHT_CONDITIONING.md) |
| `express-bodyweight` | General fitness | [Express Bodyweight](ROUTINE_EXPRESS_BODYWEIGHT.md) |
| `mobility` | Mobility | [Mobility](ROUTINE_MOBILITY.md) |

The remaining published programs are listed in the catalog. Their omission from this short table
is not a statement about coverage or status.

## Constraints that shape every task

- **Fixed weekly schedule.** A plan is one repeating week (`PLANS[id].schedule`); no alternating
  weeks, no multi-week blocks.
- **Prescription is sets × reps, weight starts at 0.** Timed work (holds, intervals) must fit the
  existing time-based progression rule in `lib/progression.js` — verify before promising it.
- **Catalog-limited picks.** Known holes: no plain air squat (E0), no dumbbell floor press (E3), no
  kettlebell deadlift or carry (E4).
- **UI copy lives in `sheets.jsx`** inside `t()` calls, with an `es` translation, not in `starter.js`.
- **Every plan declares a `goal`** in `PLANS` (`general`, `strength`, `hypertrophy`, `conditioning`, or `mobility`); the chooser
  groups by it. A new category needs a heading in `PLAN_GOALS` in `sheets.jsx`.
- **Every plan needs a failing test first** (`starter.test.js`) and a routine doc in `docs/`.

## Backlog

Backlog rows are prioritized, individually trackable authorized work. Status: `todo` → `brief`
(brief recorded) → `wip` → `done`. Moving a row through these states needs no additional product
approval.

| # | Plan | Goal | Tier | Why this slot | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Resistance Band | General fitness | E2 | Cheapest home upgrade after E0/E1; 61 catalog entries to audit. | done |
| 2 | Kettlebell | Strength | E4 | Matched-pair, swing-based strength program; the catalog has no kettlebell carry. | done |
| 3 | Home Hypertrophy | Hypertrophy | E3 + E1 | Next step for Dumbbell/Pull-up Bar graduates; covers vertical pull. | done |
| 4 | Dumbbell + Bench | Strength | E5 | Real horizontal press; closes the floor-press gap. | done |
| 5 | Bodyweight Conditioning | Conditioning | E0 | Circuit format — first verify time-based progression fits. | done |
| 6 | Mobility | Mobility | E0 | Gentle full-body timed holds; manual 20 s → 30 s progression. | done |
| 7 | Gym program briefs | — | E6 | Retroactive documentation for the published `ppl`, `upper-lower`, and `full-body` programs and their existing sessions; retrospective audit remains separate. | done |
| 8 | Home Upper/Lower | Hypertrophy | E3 + E1 | Intermediate home split with dumbbells and a pull-up bar; four standard sessions. | done |
| 9 | Gym Machines Starter | General fitness | E6 | Beginner gym introduction using machines and cables; three standard full-body sessions. | done |

## Authorized projections

Projections are authorized roadmap work beyond the sequenced backlog. Unlike a backlog row, a
projection is not yet individually prioritized or assigned an active-work status. Promoting one
to a backlog row or an active Codex/SDD change is an operational tracking step, not a request for
product approval. Its one-program brief remains required before implementation and records the
design decisions needed to deliver it. Each projection identifies a gap in equipment, experience,
frequency, duration, setting, audience, or progression.

**Activation path:** select the next eligible projection → create its one-program brief → record
the active Codex/SDD work item → implement under the authoring guide. Do not pause for separate
product approval.

| ID | Candidate | Goal | Equip. | Level | Days | Length | Split | Setting / audience |
| --- | --- | --- | --- | --- | ---: | --- | --- | --- | --- |
| P4 | Intermediate Strength | Strength | E6 (barbell) | Intermediate | 4 | Long | Upper/lower | Gym |
| P5 | Body-part Split | Hypertrophy | E6 | Advanced | 5 | Long | Body-part | Gym |
| P6 | Travel Kit | General fitness | E0 + E2 | Beginner | 3 | Short | Full body | Travel |
| P7 | Active Aging | General fitness | E0 + E2 | Beginner | 2 | Short | Full body | Home / older adult |
| P8 | Comeback | General fitness | E3 | Returning | 2 | Standard | Full body | Home or gym / returning |
| P9 | Outdoor Park | Conditioning | E0 + E1 | Trained base | 3 | Standard | Full body | Outdoor |
| P10 | Core & Mobility Add-on | Mobility | E0 | Any | 2 | Short | Add-on | Home |

Open questions the projections raise (resolve before the first one that needs it):

- **Add-on plans (P10).** A plan that complements another one would share weekdays with it; the
  plan model today assigns whole days. Needs a design decision before P10.
- **Explicit progression (P4, P5).** Intermediate plans only make sense with a chosen progression
  rule — depends on the explicit-progression supporting task.
- **Audience safety wording (P7, P8).** Needs a reviewed boundary text shared by every
  special-audience plan, not written per plan.
- **Chooser overload.** Ten more plans on top of nine makes the grouping task below mandatory.

## Supporting tasks

- [x] Verify the time-based progression rule can express holds and intervals (blocks #5, #6).
  Verified 2026-09-26: a routine exercise can carry `mode: 'time'` + `sec` (and `inc`), judged by
  the `time` policy (+5 s when every set is held, deload after 3 short sessions). The policy must
  be set explicitly (`prog: 'time'`): time mode defaults to `off`. Circuits work through the
  superset id `sg` on contiguous exercises (any group size), and `restSec` sets rest per exercise.
  Not expressible: a session time cap, AMRAP, or EMOM. `build()` in `starter.js` only emits
  `id/sets/reps/weight` today, so the first timed plan must extend it.
- [x] Audit catalog for mobility/stretching entries and their movement patterns (blocks #6).
  Completed 2026-10-10: selected eight `body weight` catalog entries covering ankles, hips,
  hamstrings, glutes, trunk rotation, lats, rear delts, and upper back; see `ROUTINE_MOBILITY.md`.
- [ ] Decide whether starter plans should set an explicit progression policy, and which per category.
- [x] Decide how the plan chooser groups a growing list — by goal (general fitness, strength,
  hypertrophy), chosen with the user on 2026-09-26 over grouping by equipment.
- [ ] Track catalog gaps (air squat, dumbbell floor press, a tube-band squat, kettlebell deadlift,
  kettlebell carry) as candidate custom entries.

## Log

- 2026-09-26 — Roadmap created. Seven plans shipped; backlog of seven proposed.
- 2026-09-26 — #1 Resistance Band shipped (tube bands + door anchor, Mon/Wed/Fri A/B/C).
- 2026-09-26 — #2 Kettlebell shipped (matched pair, trained-base audience, Mon/Wed/Fri A/B/C).
- 2026-09-26 — Added the nine routine axes (A1–A9), a type-of-training list, and ten longer-horizon projections (P1–P10).
- 2026-09-26 — #3 Home Hypertrophy shipped (dumbbells + pull-up bar, no bench, trained base, Mon/Wed/Fri A/B/C).
- 2026-09-26 — #4 Dumbbell + Bench shipped (flat bench, strength, Dumbbell graduates, Mon/Wed/Fri A/B/C).
- 2026-09-26 — Plan chooser grouped by goal (General fitness / Strength / Hypertrophy).
- 2026-09-26 — #5 Bodyweight Conditioning shipped (first timed plan: one 5-station circuit, 30 s × 3 rounds, `time` policy; new Conditioning section in the chooser).
- 2026-10-10 — #6 Mobility shipped (one E0 full-body sequence Mon/Thu, 2 × 20 s timed holds,
  automatic progression off; new Mobility chooser section).
- 2026-10-11 — #7 delivered retrospective documentation for the published PPL, Upper/Lower, and Full Body programs and their existing sessions. This did not create three autonomous programs or an audit result.
- 2026-10-12 — P1 Express Bodyweight shipped: a beginner E0, Mon/Wed/Fri general-fitness plan with four movements and two sets each (8 work sets per session).
- 2026-10-12 — P2 Home Upper/Lower shipped: an intermediate E3 + E1 hypertrophy plan with four home sessions (upper/lower Monday/Tuesday/Thursday/Friday).
