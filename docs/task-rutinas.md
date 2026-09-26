# Routine roadmap: goals × equipment

Working plan for growing the starter-plan catalog so it covers the main training goals across
the equipment people actually have. Every routine here is still built through
[Routine authoring guide](ROUTINE_AUTHORING_GUIDE.md) — this file only decides *what* to build
next and tracks progress; it does not replace the per-routine brief.

## Axes

A routine is a point in several independent dimensions. Goal and equipment are the two primary
axes (they decide the exercise pool); the rest shape how a plan is structured and who it serves.
Every brief — and every projection below — must state a value on each axis.

| # | Axis | Values | Covered today | Missing |
| --- | --- | --- | --- | --- |
| A1 | Goal | strength, hypertrophy, general fitness, conditioning, mobility | strength, hypertrophy, general fitness, conditioning (volume only) | mobility; timed conditioning |
| A2 | Equipment | E0–E6 (table below) | E0, E1, E2, E3, E4, E6, E3+E1 | E5; other combined tiers |
| A3 | Level | beginner, trained base, intermediate, advanced | beginner, trained base (Kettlebell) | intermediate, advanced |
| A4 | Frequency | 2, 3, 4, 5–6 days/week | 2, 3, 4 | 5–6 |
| A5 | Session length | short (≤30 min), standard (45–60 min), long (60+ min) | standard | short, long |
| A6 | Split | full body, upper/lower, push/pull/legs, body-part | full body, upper/lower, PPL | body-part |
| A7 | Setting | home, gym, outdoor, travel | home, gym | outdoor, travel |
| A8 | Audience | general adult, older adult, returning after a break | general adult | older adult, returning |
| A9 | Progression rule | `linear`, `greyskull`, `double`, `time`, `off` (`lib/progression.js`) | default only — no starter plan sets a policy | any explicit policy per plan |

Notes on the axes:

- **A3 Level** decides exercise complexity and volume, not just load. "Trained base" means has
  finished a beginner plan here (as Kettlebell requires), not years of training.
- **A5 Session length** is approximated by exercise count × sets: 5 × 3 is standard; short means
  3–4 exercises or a circuit.
- **A8 Audience** stays inside the general-fitness safety boundary: an older-adult or returning plan
  is lower-impact and more gradual, never a treatment or rehabilitation program.
- **A9 Progression** exists in the engine (`POLICIES` in `lib/progression.js`, `time` counts
  seconds), but starter plans don't set one yet. Choosing a policy per plan is its own supporting
  task, not something a single routine should improvise.

### A2 — Equipment tiers

Ordered by how much a person needs to own. Catalog counts come from
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

### Type of training

What kind of training each routine is, independent of the equipment it uses.

| Type | Status |
| --- | --- |
| General fitness | Covered (Bodyweight, Pull-up Bar, Dumbbell, Resistance Band, Full Body) |
| Strength | Covered (5×5, Kettlebell) |
| Hypertrophy | Covered (PPL, Upper/Lower at the gym; Home Hypertrophy at home) |
| Conditioning / circuits | Partly (Kettlebell); dedicated plan pending (#5) |
| Mobility / stretching | Pending (#6) |
| Calisthenics | Future |
| Functional training | Future |

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
| `home-hypertrophy` | Hypertrophy | E3 + E1 | 3 | [Home Hypertrophy](ROUTINE_HOME_HYPERTROPHY.md) |

Gaps at a glance: no mobility plan at any tier; conditioning only as volume (Kettlebell), no
timed-interval plan; no loaded horizontal press at home (needs a bench, #4); no documented brief for three of the four gym plans
(`ppl`, `upper-lower`, `full-body`).

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
| 3 | Home Hypertrophy | Hypertrophy | E3 + E1 | Next step for Dumbbell/Pull-up Bar graduates; covers vertical pull. | done |
| 4 | Dumbbell + Bench | Strength | E5 | Real horizontal press; closes the floor-press gap. | todo |
| 5 | Bodyweight Conditioning | Conditioning | E0 | Circuit format — first verify time-based progression fits. | todo |
| 6 | Mobility | Mobility | E0 | Needs a stretching/mobility audit of the catalog first. | todo |
| 7 | Gym plan briefs | — | E6 | Write retroactive briefs/docs for `ppl`, `upper-lower`, `full-body`. | todo |

## Projections

Longer-horizon candidates, beyond the backlog. They are a guide for choosing future work, not
commitments: a projection becomes a backlog row only when it is prioritized, and it still needs its
own confirmed brief. Each one is chosen to fill an empty cell on at least one axis.

| ID | Candidate | Goal | Equip. | Level | Days | Length | Split | Setting / audience | Axis gap it fills |
| --- | --- | --- | --- | --- | ---: | --- | --- | --- | --- |
| P1 | Express Bodyweight | General fitness | E0 | Beginner | 3 | Short | Full body | Home | A5 short |
| P2 | Home Upper/Lower | Hypertrophy | E3 + E1 | Intermediate | 4 | Standard | Upper/lower | Home | A3 intermediate at home |
| P3 | Gym Machines Starter | General fitness | E6 (machines, cable) | Beginner | 3 | Standard | Full body | Gym | Beginner-friendly gym entry without barbell skill |
| P4 | Intermediate Strength | Strength | E6 (barbell) | Intermediate | 4 | Long | Upper/lower | Gym | A3 intermediate, A5 long — after 5×5 |
| P5 | Body-part Split | Hypertrophy | E6 | Advanced | 5 | Long | Body-part | Gym | A4 5–6 days, A6 body-part |
| P6 | Travel Kit | General fitness | E0 + E2 | Beginner | 3 | Short | Full body | Travel | A7 travel |
| P7 | Active Aging | General fitness | E0 + E2 | Beginner | 2 | Short | Full body | Home / older adult | A8 older adult |
| P8 | Comeback | General fitness | E3 | Returning | 2 | Standard | Full body | Home or gym / returning | A8 returning |
| P9 | Outdoor Park | Conditioning | E0 + E1 | Trained base | 3 | Standard | Full body | Outdoor | A7 outdoor |
| P10 | Core & Mobility Add-on | Mobility | E0 | Any | 2 | Short | Add-on | Home | A1 mobility as a complement to another plan |

Open questions the projections raise (resolve before the first one that needs it):

- **Add-on plans (P10).** A plan that complements another one would share weekdays with it; the
  plan model today assigns whole days. Needs a design decision before P10.
- **Explicit progression (P4, P5).** Intermediate plans only make sense with a chosen progression
  rule — depends on the A9 supporting task.
- **Audience safety wording (P7, P8).** Needs a reviewed boundary text shared by every
  special-audience plan, not written per plan.
- **Chooser overload.** Ten more plans on top of nine makes the grouping task below mandatory.

## Supporting tasks

- [ ] Verify the time-based progression rule can express holds and intervals (blocks #5, #6).
- [ ] Audit catalog for mobility/stretching entries and their movement patterns (blocks #6).
- [ ] Decide whether starter plans should set an explicit progression policy (A9), and which per goal.
- [ ] Decide how the plan chooser groups a growing list (by goal? by equipment?) before it passes ~10 plans.
- [ ] Track catalog gaps (air squat, dumbbell floor press, a tube-band squat, kettlebell deadlift,
  kettlebell carry) as candidate custom entries.

## Log

- 2026-09-26 — Roadmap created. Seven plans shipped; backlog of seven proposed.
- 2026-09-26 — #1 Resistance Band shipped (tube bands + door anchor, Mon/Wed/Fri A/B/C).
- 2026-09-26 — #2 Kettlebell shipped (matched pair, trained-base audience, Mon/Wed/Fri A/B/C).
- 2026-09-26 — Added the nine routine axes (A1–A9), a type-of-training list, and ten longer-horizon projections (P1–P10).
- 2026-09-26 — #3 Home Hypertrophy shipped (dumbbells + pull-up bar, no bench, trained base, Mon/Wed/Fri A/B/C).
