# Starter program catalog

This catalog is the **single product authority** for the starter-program portfolio. It defines the
coverage the application offers and the gaps it has. `frontend/src/lib/starter.js` remains the
implementation authority for what is currently published; when this catalog conflicts with code,
update this document from the code before making product claims.

## Definitions

| Term | Meaning |
| --- | --- |
| Program | A selectable application option with a goal, audience, equipment, and weekly frequency. |
| Session | One workout within a program's repeating week. |
| Brief | The specification for one program; it explains the intended audience, goal, setting, schedule, progression boundary, safety boundary, and evidence. |

A program contains sessions. A brief specifies a program. Neither term means a competing variant
or a single exercise list.

## Required coverage

The initial catalog covers these product categories:

| Category | Current published coverage | Evidence |
| --- | --- | --- |
| Strength | `5x5`, `kettlebell`, `dumbbell-bench` | Their `goal` is `strength` in `starter.js`. |
| Hypertrophy | `ppl`, `upper-lower`, `home-hypertrophy` | Their `goal` is `hypertrophy` in `starter.js`. |
| Conditioning | `bodyweight-conditioning` | Its `goal` is `conditioning` in `starter.js`. |
| Mobility | `mobility` | Its `goal` is `mobility` in `starter.js`. |
| General fitness | `full-body`, `bodyweight`, `express-bodyweight`, `dumbbell`, `pull-up-bar`, `resistance-band`, `gym-machines` | Their `goal` is `general` in `starter.js`. |

These rows establish category coverage only. They do not claim that any program is audited,
clinically appropriate, or suitable for every person.

## Published programs

The following portfolio is derived from the `PLANS` map in `frontend/src/lib/starter.js`.
Routine-specific documents record the published sessions and retrospective evidence where available.

| Program id | Product category | Sessions / week | Supporting document |
| --- | --- | ---: | --- |
| `ppl` | Hypertrophy | 3 | [PPL](ROUTINE_PPL.md) |
| `upper-lower` | Hypertrophy | 4 | [Upper/Lower](ROUTINE_UPPER_LOWER.md) |
| `full-body` | General fitness | 3 | [Full Body](ROUTINE_FULL_BODY.md) |
| `5x5` | Strength | 3 | [Intrvl 5×5](EXTERNAL_ROUTINE_INTRVL_STRENGTH_5X5.md) |
| `bodyweight` | General fitness | 3 | [Bodyweight](ROUTINE_BODYWEIGHT_NO_EQUIPMENT.md) |
| `express-bodyweight` | General fitness | 3 | [Express Bodyweight](ROUTINE_EXPRESS_BODYWEIGHT.md) |
| `dumbbell` | General fitness | 2 | [Dumbbell](ROUTINE_DUMBBELL_NO_BENCH.md) |
| `pull-up-bar` | General fitness | 3 | [Pull-up Bar](ROUTINE_PULL_UP_BAR.md) |
| `resistance-band` | General fitness | 3 | [Resistance Band](ROUTINE_RESISTANCE_BAND.md) |
| `kettlebell` | Strength | 3 | [Kettlebell](ROUTINE_KETTLEBELL.md) |
| `home-hypertrophy` | Hypertrophy | 3 | [Home Hypertrophy](ROUTINE_HOME_HYPERTROPHY.md) |
| `home-upper-lower` | Hypertrophy | 4 | [Home Upper / Lower](ROUTINE_HOME_UPPER_LOWER.md) |
| `dumbbell-bench` | Strength | 3 | [Dumbbell + Bench](ROUTINE_DUMBBELL_BENCH.md) |
| `gym-machines` | General fitness | 3 | [Gym Machines Starter](ROUTINE_GYM_MACHINES.md) |
| `bodyweight-conditioning` | Conditioning | 3 | [Bodyweight Conditioning](ROUTINE_BODYWEIGHT_CONDITIONING.md) |
| `mobility` | Mobility | 2 | [Mobility](ROUTINE_MOBILITY.md) |

## Known gaps and limits

- Category presence is not the same as complete coverage across equipment, experience levels,
  session lengths, settings, or progression policies. The roadmap tracks prioritization across
  those dimensions.
- Starter programs are fixed repeating weeks. The current model does not encode alternating weeks
  or multi-week blocks.
- Published plans do not establish an audit result merely by being listed here. Each program needs
  its own evidence and review record.
- Catalog exercise availability constrains future programs; documented catalog gaps remain work to
  track, not reasons to make unsupported substitutions.

## Document relationships

1. This catalog decides portfolio coverage and the product-level objective.
2. [Routine authoring guide](ROUTINE_AUTHORING_GUIDE.md) defines the process for creating or
   changing one program under that objective.
3. A `ROUTINE_*.md` document is a program brief and its program-specific evidence; it describes
   that program's sessions, not a portfolio rule.
4. [Routine roadmap](task-rutinas.md) is the authorized work queue: it prioritizes future work
   and reports status. Its unfinished backlog rows and projections may become active Codex/SDD
   work without another product-approval step; the authoring guide still requires one brief per
   program. It cannot redefine coverage or process.
5. [Routine research sources](ROUTINE_RESEARCH_SOURCES.md) is evidence, not product authority.
