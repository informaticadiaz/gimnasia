# Routine roadmap: goals × equipment

Working plan for growing the starter-plan catalog so it covers the main training goals across
the equipment people actually have. Every routine here is still built through
[Routine authoring guide](ROUTINE_AUTHORING_GUIDE.md) — this file only decides *what* to build
next and tracks progress; it does not replace the per-routine brief.

## Axes

**Goals** (from the guide's brief): strength, hypertrophy, general fitness, conditioning, mobility.

**Equipment tiers**, ordered by how much a person needs to own. Catalog counts come from
[Exercise inventory](EXERCISE_INVENTORY.md) (`equipment` field):

| Tier | Equipment | Catalog entries |
| --- | --- | ---: |
| E0 | None (body weight) | 325 |
| E1 | Pull-up bar | (body-weight subset) |
| E2 | Resistance bands | 54 band + 7 resistance band |
| E3 | Dumbbells | 294 |
| E4 | Kettlebell | 41 |
| E5 | Dumbbells + bench | (dumbbell subset) |
| E6 | Full gym | barbell 154, cable 157, machines 81+48 |

## Coverage today

| Plan id | Goal | Tier | Days/week | Doc |
| --- | --- | --- | ---: | --- |
| `ppl` | Hypertrophy | E6 | 3 | — |
| `upper-lower` | Hypertrophy | E6 | 4 | — |
| `full-body` | General fitness | E6 | 3 | — |
| `5x5` | Strength | E6 | 3 | [Intrvl 5×5](EXTERNAL_ROUTINE_INTRVL_STRENGTH_5X5.md) |
| `bodyweight` | General fitness | E0 | 3 | [Bodyweight](ROUTINE_BODYWEIGHT_NO_EQUIPMENT.md) |
| `pull-up-bar` | General fitness | E1 | 3 | [Pull-up Bar](ROUTINE_PULL_UP_BAR.md) |
| `dumbbell` | General fitness | E3 | 2 | [Dumbbell](ROUTINE_DUMBBELL_NO_BENCH.md) |
| `resistance-band` | General fitness | E2 | 3 | [Resistance Band](ROUTINE_RESISTANCE_BAND.md) |
| `kettlebell` | Strength + conditioning | E4 | 3 | [Kettlebell](ROUTINE_KETTLEBELL.md) |

Gaps at a glance: no mobility plan at any tier; conditioning only as volume (Kettlebell), no
timed-interval plan; no home hypertrophy plan; no documented brief for the four gym plans.

## Constraints that shape every task

- **Fixed weekly schedule.** A plan is one repeating week (`PLANS[id].schedule`); no alternating
  weeks, no multi-week blocks.
- **Prescription is sets × reps, weight starts at 0.** Timed work (holds, intervals) must fit the
  existing time-based progression rule in `lib/progression.js` — verify before promising it.
- **Catalog-limited picks.** Known holes: no plain air squat (E0), no dumbbell floor press (E3), no
  kettlebell deadlift or carry (E4).
- **UI copy lives in `sheets.jsx`** inside `t()` calls, with an `es` translation, not in `starter.js`.
- **Every plan needs a failing test first** (`starter.test.js`) and a routine doc in `docs/`.

## Backlog

Priority order is a proposal; confirm before starting each task. Status: `todo` → `brief`
(brief confirmed) → `wip` → `done`.

| # | Plan | Goal | Tier | Why this slot | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Resistance Band | General fitness | E2 | Cheapest home upgrade after E0/E1; 61 catalog entries to audit. | done |
| 2 | Kettlebell | Conditioning + strength | E4 | Opens the conditioning goal; a matched pair, swing-based (catalog has no KB carry). | done |
| 3 | Home Hypertrophy | Hypertrophy | E3 + E1 | Next step for Dumbbell/Pull-up Bar graduates; covers vertical pull. | todo |
| 4 | Dumbbell + Bench | Strength | E5 | Real horizontal press; closes the floor-press gap. | todo |
| 5 | Bodyweight Conditioning | Conditioning | E0 | Circuit format — first verify time-based progression fits. | todo |
| 6 | Mobility | Mobility | E0 | Needs a stretching/mobility audit of the catalog first. | todo |
| 7 | Gym plan briefs | — | E6 | Write retroactive briefs/docs for `ppl`, `upper-lower`, `full-body`. | todo |

## Supporting tasks

- [ ] Verify the time-based progression rule can express holds and intervals (blocks #5, #6).
- [ ] Audit catalog for mobility/stretching entries and their movement patterns (blocks #6).
- [ ] Decide how the plan chooser groups a growing list (by goal? by equipment?) before it passes ~10 plans.
- [ ] Track catalog gaps (air squat, dumbbell floor press, a tube-band squat) as candidate custom entries.

## Log

- 2026-09-26 — Roadmap created. Seven plans shipped; backlog of seven proposed.
- 2026-09-26 — #1 Resistance Band shipped (tube bands + door anchor, Mon/Wed/Fri A/B/C).
- 2026-09-26 — #2 Kettlebell shipped (matched pair, trained-base audience, Mon/Wed/Fri A/B/C).
