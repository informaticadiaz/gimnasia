# Home Upper / Lower Starter Program

This is the delivery brief for the `home-upper-lower` starter program. The published source of
truth is `frontend/src/lib/starter.js`.

## 1. Brief

| Field | Decision |
| --- | --- |
| Name | Home Upper / Lower. |
| Audience | Intermediate healthy adults with a training base, including experience with controlled dumbbell movements and strict pull-ups or chin-ups. It is not a beginner or rehabilitation program. |
| Goal | Hypertrophy. |
| Setting | Home. |
| Equipment | A pair of dumbbells and a pull-up bar; no bench. |
| Frequency | Four sessions weekly: upper body Monday and Thursday; lower body Tuesday and Friday. |
| Duration | Standard: 15–18 working sets per session, usually 45–60 minutes with appropriate rest. |
| Progression | Every exercise starts at weight 0. The existing per-user progression engine applies after logging; this program adds no plan-specific policy. |
| Safety boundary | General fitness only; it does not diagnose, treat, or rehabilitate a condition. Stop for pain and seek qualified individual guidance for injury, symptoms, or relevant health conditions. |

This split extends the three-day `home-hypertrophy` program for someone ready for four weekly
sessions. It does not claim that four days is superior for every person.

## 2. Evidence and authored decisions

```text
Source: Dose-response relationship between weekly resistance training volume and increases in
muscle mass: A systematic review and meta-analysis (Schoenfeld, Ogborn, Krieger — J Sports Sci,
2017;35(11):1073-1082)
URL: https://pubmed.ncbi.nlm.nih.gov/27433992/
Retrieved: 2026-10-12
License: published research article — evidence, not reusable text
What was learned: weekly set volume can be used as one planning input for hypertrophy.
What was authored originally: the four-day schedule, exercise selection, prescriptions, and
home-equipment substitutions.
Open questions: the app records sets and reps but cannot enforce effort, recovery, or adherence.

Source: Strength and Hypertrophy Adaptations Between Low- vs. High-Load Resistance Training:
A Systematic Review and Meta-analysis (Schoenfeld, Grgic, Ogborn, Krieger — J Strength Cond Res,
2017;31(12):3508-3523)
URL: https://pubmed.ncbi.nlm.nih.gov/28834797/
Retrieved: 2026-10-12
License: published research article — evidence, not reusable text
What was learned: load is only one variable in hypertrophy programming; available home movements
can be prescribed without asserting an individualized outcome.
What was authored originally: use of push-up variants where the catalog has no dumbbell floor
press, and the 6–12 repetition prescriptions.
Open questions: proximity to failure and load selection remain user- and coach-directed.
```

## 3. Exercise audit

The IDs below resolve in the built-in exercise catalog. “Reviewed” means structural fit for this
brief only; it is not a clinical or professional programming approval.

| Catalog ID | Name | Equipment | Pattern | Review status |
| --- | --- | --- | --- | --- |
| `1274` | deep push up | dumbbell handles | Horizontal push | Reviewed (structural fit). |
| `1311` | wide hand push up | body weight | Horizontal push | Reviewed. |
| `0652` | pull-up | body weight + bar | Vertical pull | Reviewed. |
| `1326` | chin-up | body weight + bar | Vertical pull | Reviewed. |
| `0292` | dumbbell one arm bent-over row | dumbbell | Horizontal pull | Reviewed. |
| `0426` | dumbbell standing overhead press | dumbbell | Vertical push | Reviewed. |
| `0334` | dumbbell lateral raise | dumbbell | Shoulder isolation | Reviewed. |
| `0430` | dumbbell standing triceps extension | dumbbell | Triceps isolation | Reviewed. |
| `0294` | dumbbell biceps curl | dumbbell | Biceps isolation | Reviewed. |
| `0333` | dumbbell kickback | dumbbell | Triceps isolation | Reviewed. |
| `1760` | dumbbell goblet squat | dumbbell | Squat | Reviewed. |
| `0410` | dumbbell single leg split squat | dumbbell | Unilateral squat | Reviewed. |
| `1459` | dumbbell Romanian deadlift | dumbbell | Hinge | Reviewed. |
| `1757` | dumbbell single leg deadlift | dumbbell | Unilateral hinge | Reviewed. |
| `0336` | dumbbell lunge | dumbbell | Unilateral squat | Reviewed. |
| `0417` | dumbbell standing calf raise | dumbbell | Calf raise | Reviewed. |
| `0472` | hanging leg raise | body weight + bar | Core | Reviewed. |

Substitutions: use `0688` scapular pull-up or fewer controlled repetitions when strict vertical
pulling is not yet available. The program intentionally does not substitute a machine calf raise:
the selected `0417` entry is the catalog’s dumbbell standing variation.

## 4. Sessions

| Day | Exercises |
| --- | --- |
| Monday — Home Upper A | `1274` 3×10, `0652` 3×6, `0426` 3×10, `0292` 3×10, `0334` 3×12, `0430` 3×12 |
| Tuesday — Home Lower A | `1760` 3×10, `1459` 3×10, `0336` 3×10, `0417` 3×12, `0472` 3×10 |
| Thursday — Home Upper B | `1311` 3×10, `1326` 3×6, `0292` 3×10, `0426` 3×10, `0294` 3×12, `0333` 3×12 |
| Friday — Home Lower B | `0410` 3×10, `1757` 3×10, `0336` 3×10, `0417` 3×12, `0472` 3×10 |

The upper sessions provide two horizontal pushes, two vertical pulls, two horizontal-pull slots,
and direct shoulder/arm work. The lower sessions provide bilateral and unilateral squat/hinge work,
with calves and core. The no-bench constraint means chest work stays with push-up variants rather
than pretending a dumbbell floor press exists in the catalog.

## 5. Compatibility and result

- The existing `PLANS` model supports four stable routine keys on a fixed Monday/Tuesday/Thursday/
  Friday weekly schedule; it does not model rotating weeks or program blocks.
- All exercises use the established static sets × reps shape and weight 0 initialization.
- The plan has no timed work, equipment profile, or progression-engine change.
- The chooser uses the existing hypertrophy group and translates its new name and description in
  `frontend/src/locales/es.js`.

**Implemented.** Focused definition and chooser tests cover the plan, its four-day schedule, its
home equipment selection, and its user-facing discovery entry.
