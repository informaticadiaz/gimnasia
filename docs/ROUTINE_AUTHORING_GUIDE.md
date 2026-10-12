# Routine authoring guide

This guide defines the process for creating or changing **one starter program**. The
[Starter program catalog](STARTER_PROGRAM_CATALOG.md) is the product authority for coverage and
objectives; this guide does not create a competing portfolio rule.

## Quick path

1. For an item in the [routine roadmap](task-rutinas.md), use its already-authorized objective;
   otherwise confirm that the proposed program advances a catalog objective or an approved catalog
   change.
2. Write one brief for that program. The brief records delivery decisions; it does not re-approve
   roadmap work.
3. Read and record evidence without copying an external routine.
4. Audit the program's sessions, exercises, equipment, coverage, progression boundary, and safety
   claims.
5. Implement the audited program test-first, then verify and release it.

A program is one selectable app option. Its sessions are the workouts inside its weekly schedule.
A brief specifies that one program. This process does not require a fixed number of variants or
lettered alternatives.

## 1. Create a program brief

Do not start with a list of exercises. Define the training problem first. For an authorized
roadmap item, translate its listed scope into this one-program brief; do not seek a second product
approval.

| Field | Required decision |
| --- | --- |
| Name | Clear, user-facing program name. |
| Audience | Training experience, health scope, and exclusions. |
| Goal | A catalog category: strength, hypertrophy, conditioning, mobility, or general fitness. |
| Setting | Home, gym, or both. |
| Equipment | Required and optional equipment. |
| Frequency | Sessions and days per week. |
| Duration | Expected session and program duration. |
| Progression | How a successful session changes the next prescription. |
| Safety boundary | What the program does not cover and when to seek professional guidance. |

## 2. Research and audit the program

Use [Routine research sources](ROUTINE_RESEARCH_SOURCES.md) to classify every source as evidence,
metadata, reference, or format. External routines can inform structure, but the openGym program
must be authored and reviewed as its own artifact.

For each source, record:

```text
Source URL:
Author / publisher:
Retrieved date:
License or permission:
What was learned:
What will be authored originally:
Open questions:
```

Audit every exercise used by the program against [Exercise inventory](EXERCISE_INVENTORY.md).

| Field | Requirement |
| --- | --- |
| Catalog ID and name | Resolve to exactly one built-in exercise, or create a reviewed custom entry. |
| Movement pattern | Assign a programming pattern, such as squat, hinge, horizontal push, horizontal pull, vertical push, vertical pull, carry, locomotion, or core. |
| Equipment and setting | Verify it is available in the program's intended setting. |
| Level | Confirm the exercise and its regressions match the audience. |
| Substitution | Identify an equivalent option for common equipment constraints. |
| Review status | Record pending, reviewed, or approved. |
| Source and notes | Record the evidence or expert rationale. |

Before implementation, confirm:

- [ ] The brief agrees with the catalog objective.
- [ ] All exercise IDs resolve in the openGym catalog.
- [ ] Sessions cover the intended movement patterns and major muscle groups.
- [ ] Exercise ordering, volume, recovery, and progression have documented rationale.
- [ ] Required equipment is compatible with the setting.
- [ ] Substitutions preserve the intended movement purpose.
- [ ] The program does not claim to diagnose, treat, or rehabilitate a medical condition.

## 3. Check product compatibility before encoding

openGym currently models routines and a static weekly schedule. It does not model every program
feature.

| Program feature | Current handling | Author action |
| --- | --- | --- |
| Exercise, sets, reps, and starting weight | Supported in a routine entry. | Map to a catalog ID and specify the prescription. |
| Fixed weekly schedule | Supported by weekday-to-routine assignments. | Assign routine IDs to weekdays. |
| Exercise-level progression | Supported by existing progression policies. | Choose a compatible policy and test it. |
| Alternating weeks or rotating sessions | Not modeled as a program sequence. | Document the manual schedule or create program-sequence support first. |
| Source weights with unknown units | Unsafe to transfer directly. | Start at zero or confirm units before import. |
| Generic external exercise names | May not match a catalog entry. | Resolve the exact variant before encoding. |

Document this assessment in a program-specific file. See [Strength 5×5 assessment](EXTERNAL_ROUTINE_INTRVL_STRENGTH_5X5.md) for an example.

## 4. Implement a built-in starter program

Built-in definitions live in `frontend/src/lib/starter.js`. A program is one entry in the `PLANS`
map, and each session tuple carries a stable key so the weekly schedule can reference it
independently of array position.

1. Add the `PLANS` entry and its sessions in `starter.js`.
2. Add plan copy in `frontend/src/sheets.jsx` with literal `t('...')` calls, then add the matching
   translations in `frontend/src/locales/es.js`.
3. Add a focused failing test under `frontend/src/lib/` before implementation.
4. Keep starting weights at zero unless safe, unit-specific initialization is documented.
5. Verify each promised discovery entry point; Settings is always visible, while Home and Plan have
   state-dependent visibility.

Starter programs are front-end data: releasing one requires a frontend build and deploy, not an
API restart.

## 5. Verify and release

Run the focused definition test, then the full frontend suite and production build.

```bash
cd frontend
npm test -- --run src/lib/<routine>.test.js
npm test
npm run build
```

Review the UI with an empty profile and confirm that loading creates fresh sessions, preserves
existing data, assigns the intended weekly schedule, and exposes documented limitations.

## Maintenance

Revisit a program when the exercise catalog, evidence, scheduling model, or progression engine
changes. Update its brief and audit status rather than silently changing the program.
