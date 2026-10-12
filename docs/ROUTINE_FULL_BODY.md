# Full Body starter program

This document is the retrospective brief for the published `full-body` program. The published
source of truth is `frontend/src/lib/starter.js`; it contains one three-session Full Body program.

## Brief

| Field | Current documented scope |
| --- | --- |
| Program | Full Body. |
| Audience | Healthy adults with full-gym access seeking three general-fitness sessions per week. This is retrospective documentation, not an inferred historical product decision. |
| Goal | General fitness. |
| Setting and equipment | Full gym: barbell, cable, dumbbell, sled, and leverage-machine equipment. |
| Frequency | Monday Full Body A, Wednesday Full Body B, Friday Full Body C. |
| Progression | Initial weight is 0; no program-specific progression policy is encoded. |

## Published sessions

| Session | Prescription |
| --- | --- |
| Full Body A (Mon) | `0043` 3×8; `0025` 3×8; `2330` 3×10; `0586` 3×12; `0334` 2×12; `0031` 2×12. |
| Full Body B (Wed) | `0085` 3×8; `0047` 3×10; `1323` 3×10; `0585` 3×12; `0334` 2×12; `0241` 2×12. |
| Full Body C (Fri) | `0739` 3×10; `0025` 2×10; `0027` 3×10; `0426` 2×10; `0586` 3×12; `0605` 3×15. |

## Sources

- [ACSM: Resistance Training Guidelines (2026)](https://acsm.org/resistance-training-guidelines-update-2026/), retrieved 2026-10-11. Used as evidence to inform original resistance-training programming for healthy adults; no ACSM wording, tables, or routines are reused.
- [Routine research sources](ROUTINE_RESEARCH_SOURCES.md) records the boundary between evidence and reusable content.

## Retrospective audit boundary

The exercise IDs below were structurally verified against `EXDB`. This document does **not** invent a qualified programming audit outcome. Equipment, coverage, ordering, volume, recovery, substitutions, and progression rationale remain subject to retrospective review.

## Product compatibility and limits

The current model encodes a repeating fixed week, sets × reps, and an initial weight of 0. It does not encode alternating weeks, multi-week blocks, or a plan-specific progression policy for this program. The program remains within a general-fitness boundary; it is not medical treatment, rehabilitation, or individualized loading advice. Stop for pain and seek qualified guidance for injury, symptoms, or relevant health conditions.
