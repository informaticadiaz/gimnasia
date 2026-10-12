# PPL starter program

This document is the retrospective brief for the published `ppl` program. The published source of
truth is `frontend/src/lib/starter.js`; it contains one three-session Push / Pull / Legs program.

## Brief

| Field | Current documented scope |
| --- | --- |
| Program | Push / Pull / Legs (PPL). |
| Audience | Healthy adults with full-gym access seeking a three-day hypertrophy split. This is retrospective documentation, not an inferred historical product decision. |
| Goal | Hypertrophy. |
| Setting and equipment | Full gym: barbell, cable, dumbbell, bodyweight, sled, and leverage-machine equipment. |
| Frequency | Monday Push, Wednesday Pull, Friday Legs. |
| Progression | Initial weight is 0; no program-specific progression policy is encoded. |

## Published sessions

| Session | Prescription |
| --- | --- |
| Push (Mon) | `0025` 4×8; `0047` 3×10; `0426` 3×10; `0334` 3×12; `0241` 3×12; `0251` 3×10. |
| Pull (Wed) | `2330` 4×10; `0027` 4×8; `1323` 3×10; `0031` 3×10; `0313` 3×12. |
| Legs (Fri) | `0043` 4×8; `0085` 3×10; `0739` 3×12; `0585` 3×12; `0586` 3×12; `0605` 4×15. |

## Sources

- [ACSM: Resistance Training Guidelines (2026)](https://acsm.org/resistance-training-guidelines-update-2026/), retrieved 2026-10-11. Used as evidence to inform original resistance-training programming for healthy adults; no ACSM wording, tables, or routines are reused.
- [Routine research sources](ROUTINE_RESEARCH_SOURCES.md) records the boundary between evidence and reusable content.

## Retrospective audit boundary

The exercise IDs below were structurally verified against `EXDB`. This document does **not** invent a qualified programming audit outcome. Equipment, coverage, ordering, volume, recovery, substitutions, and progression rationale remain subject to retrospective review.

## Product compatibility and limits

The current model encodes a repeating fixed week, sets × reps, and an initial weight of 0. It does not encode alternating weeks, multi-week blocks, or a plan-specific progression policy for this program. The program remains within a general-fitness boundary; it is not medical treatment, rehabilitation, or individualized loading advice. Stop for pain and seek qualified guidance for injury, symptoms, or relevant health conditions.
