# Routine authoring guide

This guide defines how to turn external training knowledge and the openGym exercise catalog into original, reviewable starter routines. It is the required path for every future built-in routine.

## Quick path

1. Write a routine brief.
2. Read evidence and external examples; record the source and intended use.
3. Select only catalog exercises that are audited for the routine's needs.
4. Map each selected exercise to a stable openGym ID.
5. Validate coverage, equipment, scheduling, and progression.
6. Implement the starter plan, write a failing test first, then expose it in the app.
7. Have a qualified reviewer approve the programming claims before release.

## 1. Create a routine brief

Do not start with a list of exercises. Define the training problem first.

| Field | Required decision |
| --- | --- |
| Name | Clear, user-facing program name. |
| Audience | Training experience, health scope, and exclusions. |
| Goal | Strength, hypertrophy, conditioning, mobility, or general fitness. |
| Setting | Home, gym, or both. |
| Equipment | Required and optional equipment. |
| Frequency | Sessions and days per week. |
| Duration | Expected session and program duration. |
| Progression | How a successful session changes the next prescription. |
| Safety boundary | What the routine does not cover and when to seek professional guidance. |

## 2. Read sources without treating them as the routine

Use [Routine research sources](ROUTINE_RESEARCH_SOURCES.md) to classify every source as evidence, metadata, reference, or format.

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

External routines can reveal useful structure—frequency, exercise ordering, or progression—but the openGym routine must be authored and reviewed as its own artifact. Preserve attribution and licensing metadata whenever any external data is imported.

## 3. Audit the exercises needed first

Use [Exercise inventory](EXERCISE_INVENTORY.md) as the baseline. Do not wait to audit all 1,324 entries: audit the smallest set required for the next routine.

For every selected exercise, complete this record:

| Field | Requirement |
| --- | --- |
| Catalog ID and name | Resolve to exactly one built-in exercise, or create a reviewed custom entry. |
| Movement pattern | Assign a programming pattern, such as squat, hinge, horizontal push, horizontal pull, vertical push, vertical pull, carry, locomotion, or core. |
| Equipment and setting | Verify it is available in the routine's intended setting. |
| Level | Confirm the exercise and its regressions match the audience. |
| Substitution | Identify an equivalent option for common equipment constraints. |
| Review status | Record pending, reviewed, or approved. |
| Source and notes | Record the evidence or expert rationale. |

## 4. Design and validate the routine

A routine must pass these checks before implementation:

- [ ] The goal, audience, equipment, and schedule agree with the brief.
- [ ] All exercise IDs resolve in the openGym catalog.
- [ ] The routine covers the intended movement patterns and major muscle groups.
- [ ] Exercise ordering, volume, recovery, and progression have documented rationale.
- [ ] Every required equipment item is compatible with the intended setting.
- [ ] Exercise substitutions preserve the same movement purpose.
- [ ] Weight units, rest defaults, and progression rules are explicit.
- [ ] The routine does not claim to diagnose, treat, or rehabilitate a medical condition.

## 5. Check program compatibility before encoding

openGym currently models routines and a static weekly schedule. It does not model every possible program feature.

| Program feature | Current handling | Author action |
| --- | --- | --- |
| Exercise, sets, reps, and starting weight | Supported in a routine entry. | Map to a catalog ID and specify the prescription. |
| Fixed weekly schedule | Supported by weekday-to-routine assignments. | Assign routine IDs to weekdays. |
| Exercise-level progression | Supported by existing progression policies. | Choose a compatible policy and test it. |
| Alternating weeks or rotating sessions | Not modeled as a program sequence. | Document the manual schedule or create program-sequence support first. |
| Source weights with unknown units | Unsafe to transfer directly. | Start at zero or confirm units before import. |
| Generic external exercise names | May not match a catalog entry. | Resolve the exact variant before encoding. |

Document this assessment in a routine-specific file. See [Strength 5×5 assessment](EXTERNAL_ROUTINE_INTRVL_STRENGTH_5X5.md) for an example.

## 6. Implement a built-in starter plan

Built-in definitions live in `frontend/src/lib/starter.js`. As of the multi-plan chooser
(`frontend/src/lib/starter.js`, `frontend/src/sheets.jsx` — landed after this guide's first
draft; see the Maintenance note below), a plan is not a bare list of routines: it is one entry
in the `PLANS` map, and each routine tuple carries a **stable key** so the weekly schedule can
reference it independently of array position.

```js
// One routine: [key, name, emoji, [[catalog-id, sets, reps], ...]]. The key is what the
// schedule below points at — it must never change once the plan ships, or an existing
// user's `week` assignment would resolve to nothing.
const EXAMPLE_ROUTINES = [
  ['day-a', 'Example Day A', 'barbell', [['catalog-id', 3, 8]]]
]

// [weekday, routineKey] pairs — weekday matches DAYN's index (1 = Monday, 0 = Sunday).
const PLANS = {
  // ...existing entries (ppl, 'upper-lower', 'full-body', '5x5')...
  'example-plan': { routines: EXAMPLE_ROUTINES, schedule: [[1, 'day-a']] }
}
```

`PLANS` is consumed by `starterPlanOptions`/`starterPlanDays`/`buildStarterPlan`, already defined
in `starter.js` — a new plan needs no changes there, only a new key in the map.

Then:

1. Add a `PLAN_COPY` entry for the new plan id in `frontend/src/sheets.jsx`, with the name and
   description wrapped in `t()` calls **written inline there**, not passed in as a variable —
   `check-source-strings.mjs` only finds literal `t('...')` calls, so copy authored anywhere
   else (including here in `starter.js`) silently ships English in every language.
2. **Wrapping a string in `t()` does not translate it by itself — `t()` is a dictionary
   lookup that falls back to the original English when a locale has no entry for that exact
   string.** Add the actual translation to `frontend/src/locales/es.js` (and any other locale
   you're maintaining) in the same block as the other plan names/descriptions. Learned the hard
   way shipping the Bodyweight plan: its name happened to already resolve correctly in Spanish
   (`'Bodyweight': 'Peso corporal'` already existed as a key reused from an unrelated
   weight-input label), which masked that its *description* had no `es.js` entry at all and
   silently shipped in English until caught by manual testing, not by any test suite.
3. `starterPlanSheet`'s chooser already lists every `PLANS` key automatically — no separate
   loader or entry-point wiring is needed for a new plan once it is in the map and has its
   `PLAN_COPY` entry. **But "discoverable from every promised entry point" (step 7) is not
   automatic across all three entry points** — verify each one by reading the component, not by
   assumption:
   - `views/Settings.jsx`'s "Load starter plan" row is unconditional — always visible.
   - `views/Home.jsx`'s button only renders in the empty/welcome state.
   - `views/Plan.jsx`'s button only renders when `S.routines.length === 0` — it disappears
     entirely, replaced by the user's own routine list, for anyone who already has routines.
     A tester (or user) with existing routines will report "I can't see the new plan" on the
     Plan screen and be technically correct — Settings is the only entry point guaranteed to
     show it regardless of the account's existing state.
4. Add a focused test under `frontend/src/lib/` (see `starter.test.js` for the existing pattern)
   before adding the implementation.
5. Keep starting weights at zero unless a unit and a safe user-specific initialization rule are
   documented.
6. **Starter plans are a purely front-end concept — the backend has no idea they exist.**
   `PLANS` lives only in `frontend/src/lib/starter.js`; `api/server.js` has zero references to
   "starter" or plan catalogs (verified by grep). Shipping a new or changed plan only ever needs
   a frontend build + redeploy; it never requires restarting the API.

## 7. Verify and release

Run the focused routine-definition test first, then the full frontend test suite and production build.

```bash
cd frontend
npm test -- --run src/lib/<routine>.test.js
npm test
npm run build
```

Review the UI manually with an empty profile and confirm:

- The plan is discoverable from every promised entry point.
- Loading it creates fresh routines without overwriting existing data.
- The weekly schedule is correct.
- Each exercise resolves with the intended equipment and instructions.
- Any known limitation is documented in the routine-specific assessment.

## Maintenance

Revisit a routine when the exercise catalog, evidence, app scheduling model, or progression engine changes. Update its audit status and compatibility assessment rather than silently changing the program.

**2026-09-09** — Step 6 updated. Between this guide's first draft (2026-09-02) and its commit, upstream landed the multi-plan chooser (`frontend/src/lib/starter.js`, `frontend/src/sheets.jsx`): a starter plan became one entry in a `PLANS` map with a keyed routine tuple and its own weekly schedule, instead of a single flat routine list. Step 6's example was still the pre-refactor shape and would not have matched the real file. Steps 1-5 and 7 do not depend on that shape and were unaffected.

**2026-09-16** — Step 6 expanded after shipping the Bodyweight plan end-to-end (implementation, deploy, and live user testing on `gimnasia.diazignacio.ar`). Three things only became visible by actually shipping and testing with a real account, not from reading the code in isolation: (1) a missing `es.js` translation for the plan description shipped silently because `t()` fails open to English rather than erroring; (2) the `Plan.jsx` starter-plan button is conditionally hidden once an account already has routines, which reads as a bug ("I can't see the new plan") until you check `Settings.jsx`'s always-visible entry point instead; (3) starter plans are frontend-only data with zero backend awareness, confirmed by grepping `api/server.js`, so releasing one is a frontend deploy only. All three are now explicit in step 6 above.
