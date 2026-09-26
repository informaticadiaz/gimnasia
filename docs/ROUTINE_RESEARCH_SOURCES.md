# Routine research sources

This register records sources that may inform the professional routine catalog. It separates **evidence**, **open data**, **reference material**, and **data-format design** so that the team does not accidentally treat a workout article as reusable content.

## Quick path

1. Use evidence sources to define original programming rules.
2. Use open datasets only after confirming the license for the exact asset or record.
3. Record source URL, license, review date, and intended use for every imported or derived item.

## Source register

| Source | Category | Approved use | Reuse status | Review notes |
| --- | --- | --- | --- | --- |
| [ACSM: Resistance Training Guidelines (2026)](https://acsm.org/resistance-training-guidelines-update-2026/) | Evidence | Define original guidance for strength, hypertrophy, power, adherence, and individualization. | Do not copy text or routines. | Primary evidence-informed professional guidance for healthy adults. |
| [WHO: Physical activity](https://www.who.int/initiatives/behealthy/physical-activity) | Evidence | Define baseline activity and muscle-strengthening coverage. | Do not copy text or routines. | Supports minimum public-health guidance, not individualized medical prescriptions. |
| [U.S. Physical Activity Guidelines](https://odphp.health.gov/sites/default/files/2019-09/Physical_Activity_Guidelines_2nd_edition.pdf) | Evidence | Cross-check baseline frequency, progression, and major-muscle coverage. | Do not copy text or routines. | Use alongside ACSM; not a substitute for clinical assessment. |
| [Free Exercise DB](https://github.com/yuhonas/free-exercise-db) | Open exercise metadata | Compare fields such as force, level, mechanic, equipment, and muscles. | Public-domain / Unlicense dataset; verify the repository's current terms before import. | Useful for enrichment and taxonomy comparison, not for adopting its programming advice. |
| [wger](https://github.com/wger-project/wger) | Licensed exercise catalog reference | Study catalog governance, attribution, translations, and per-entry license handling. | License varies by individual exercise asset; do not bulk import without per-item verification. | Strong reference for provenance and attribution workflow. |
| [Bodyweight Fitness workouts](https://bodyweight.fitness/workouts) | Routine-design reference | Study exercise progressions and minimal-equipment structure. | Reference only until an explicit reuse license is verified. | Do not copy routines, text, or media into openGym. |
| [OpenWeight](https://github.com/radupana/openweight) | Open program-data format | Model workout templates, multi-week programs, and completed sessions. | Apache-2.0; verify version and compatibility before adoption. | A format reference, not a source of programming content. |
| [Weekly Training Frequency Effects on Strength Gain: A Meta-Analysis (PMC)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6081873/) | Evidence | Justify a 2×/week frequency specifically for untrained beginners, alongside the existing ACSM/WHO/U.S. Guidelines entries. | Do not copy text or routines. | Supports 2-3×/week as sufficient for previously-untrained individuals; higher-frequency splits (PPL, upper/lower) are for trained lifters, not a strict upgrade. |
| [Effects of training with elastic resistance versus conventional resistance on muscular strength: a systematic review and meta-analysis (Lopes et al., 2019)](https://journals.sagepub.com/doi/10.1177/2050312119831116) | Evidence | Justify a band-only plan as a legitimate strength-training option rather than a lesser substitute. | Do not copy text or routines. | Found no significant difference between elastic and conventional resistance training for upper- or lower-limb strength, across varied populations and protocols. |
| [Implementation and Evaluation of a 10-Week Kettlebell Training Load Distribution on Strength and Aerobic Capacity in Recreationally Trained Women (Zimerer et al., 2024)](https://pmc.ncbi.nlm.nih.gov/articles/PMC11701850/) | Evidence | Justify a kettlebell plan's combined strength + conditioning goal at 3×/week. | Do not copy text or routines. | 10 weeks, 3×/week, 30:30 s intervals: +23.7% 1RM leg press, +9.6% VO2max (n=11, recreationally active women). Small sample; supporting evidence only. |

## Created routine exemplars

These are examples of already-published routines to study for structure, exercise selection, progression, and coverage. They are **not** approved as content to copy.

| Source | Routine focus | Research use | Reuse status |
| --- | --- | --- | --- |
| [NHS Strength Exercises](https://www.nhs.uk/live-well/exercise/strength-exercises/) | Gentle home strength, mobility, and gradual progression. | Inform accessible home-routine constraints and progression. | Reference only; do not copy text or media. |
| [Bodyweight Fitness workouts](https://bodyweight.fitness/workouts) | Calisthenics progressions for strength foundations and bodyweight training. | Study progression paths and low-equipment program structure. | Reference only until an explicit program-level reuse license is verified. |
| [StrongLifts 5x5](https://stronglifts.com/app/) | Barbell-based beginner strength program. | Study a simple full-body strength template and linear-progression workflow. | Reference only; do not copy exercises, text, or program structure verbatim. |
| [Boostcamp beginner programs](https://www.boostcamp.app/beginners) | Catalog of beginner programs across strength, upper/lower, PPL, dumbbell, and bodyweight approaches. | Compare market coverage, audience labels, and schedule patterns. | Reference only; programs belong to their authors and publishers. |
| [Intrvl free training programs](https://intrvl.app/programs/) | Structured programs published as JSON, including strength templates. | Evaluate a candidate format and possible import source. | Candidate only; verify the exact repository license, program-level rights, and schema compatibility before import. |
| [fit-file](https://github.com/nextfiveinc/fit-file) | A 12-week offline fitness program represented in JSON. | Study how a multi-week plan can be encoded with warm-up, cooldown, and workout arrays. | GPL-licensed repository; review program-content and compatibility obligations before any reuse. |
| [Dumbbell Only Home Or Gym Full Body Workout — Muscle & Strength](https://www.muscleandstrength.com/workouts/dumbbell-only-home-or-gym-fullbody-workout.html) | Dumbbell-only, no-bench full-body structure for beginners. | Confirm which movement patterns are commonly trained without a bench (floor press, standing press, rows, lower body) and cross-check the "no floor press in the catalog" gap against real-world practice. | Reference only; do not copy exercises, text, or program structure verbatim. |
| [The Ultimate Pull Up Progression Plan for Beginners — SET FOR SET](https://www.setforset.com/blogs/news/pull-up-progression) | Vertical-pull regression ladder for someone who cannot yet do a full pull-up. | Validate the dead-hang → scapular-pull → row → negative → band-assisted → first-pull-up sequence, to justify prescribing a real pull-up while still documenting a substitution path. | Reference only; do not copy exercises, text, or program structure verbatim. |

## Adoption rules

| Rule | Decision |
| --- | --- |
| Routine authorship | Write original routines from the evidence and audited exercise catalog. |
| Imported metadata | Keep provenance, license, author, source URL, and review date. |
| Imported media or text | Prohibited until the exact asset's license and attribution requirements are verified. |
| Health limitations | Do not present catalog routines as medical treatment or injury rehabilitation. |
| Expert review | Mark programming claims and exercise-audit fields as pending until reviewed by a qualified professional. |

## Checklist before using a source

- [ ] The intended use is classified: evidence, metadata, reference, or format.
- [ ] The exact license is recorded for every imported asset.
- [ ] Attribution and share-alike obligations are understood.
- [ ] No copyrighted routine text, images, or videos are copied without permission.
- [ ] A qualified reviewer has approved any health or programming claim presented to users.

## Next step

Use this register to define the exercise-audit schema, then audit the first exercise batch needed for the initial routine pilot.
