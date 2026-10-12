# Body-part Split

## Brief

| Field | Decision |
| --- | --- |
| Name | Body-part Split |
| Audience | Healthy advanced trainees with established lifting technique, recovery habits, and access to a full gym. It is not beginner instruction, rehabilitation, or a substitute for individualized coaching. |
| Goal | Hypertrophy. |
| Setting | Gym. |
| Equipment | Barbell, dumbbells, cable station, bodyweight dip station, and leverage or sled machines. |
| Frequency | Five long sessions weekly: Monday chest, Tuesday back, Wednesday legs, Thursday shoulders, Friday arms. |
| Duration | Long: 17–21 working sets per session. The plan is a fixed repeating week, not a periodized block. |
| Progression | Every routine explicitly uses `double`. Keep the same weight while building each set from its documented lower rep limit to its upper target; when every set reaches the upper target, add the app's lift-specific load step and return to the lower limit. Three stalled sessions use the existing deload behavior. Starting weights are zero so each trainee chooses a verified safe load. |
| Safety boundary | Stop for pain, dizziness, or loss of safe control. Use safeties and a spotter for loaded barbell lifts when appropriate; seek qualified coaching or medical guidance when appropriate. |

## Sessions

Chest: barbell bench press 4×8–12, incline barbell bench press 4×8–12, dips 3×10–15,
cable low fly 3×10–15, cable seated chest press 3×10–15. Back: cable pulldown 4×8–12,
bent-over barbell row 4×8–12, cable seated row 3×10–15, leverage high row 3×10–15, leverage
t-bar row 3×10–15. Legs: full squat 4×8–12, Romanian deadlift 4×8–12, sled leg press 3×10–15,
leverage leg extension 3×10–15, leverage leg curl 3×10–15, leverage calf raise 4×12–20.
Shoulders: dumbbell overhead press 4×8–12, dumbbell lateral raise 4×10–15, dumbbell rear-delt
raise 3×10–15, leverage shoulder press 3×10–15, cable rear-delt row 3×10–15. Arms: barbell curl
4×10–15, hammer curl 4×10–15, cable pushdown 4×10–15, barbell lying triceps extension
4×10–15, dips 3×10–15.

## Catalog and compatibility audit

The plan uses `0025`, `0047`, `0251`, `0179`, `2144`, `2330`, `0027`, `1323`, `0581`,
`0606`, `0043`, `0085`, `0739`, `0585`, `0586`, `0605`, `0426`, `0334`, `0333`,
`0603`, `0202`, `0031`, `0313`, `0241`, and `0061`.
Each resolves to a built-in full-gym catalog entry using only barbell, dumbbell, cable,
bodyweight, sled-machine, or leverage-machine equipment. Each session begins with its highest
skill compound movement where applicable, then moves to accessories. The split dedicates a
separate day to each major body part, but does not model substitutions, autoregulation, deload
blocks, alternating weeks, or recovery readiness.

Routine-level `double` progression is supported by the existing progression engine. Each loaded
exercise carries `repsMin`, which is the range floor; `reps` remains the range ceiling. Omitting
`repsMin` would silently leave the routine without its authored rep range, so the data encodes it
per exercise. The zero starting load is intentional: preset source loads without a person's unit,
training history, and equipment are unsafe to import.

## Evidence and review status

Exercise selection was authored from the built-in inventory and routine authoring guide; it was
not copied from an external routine. `frontend/src/lib/starter.test.js` verifies catalog resolution,
exact prescriptions and schedule, zero starting weights, the full-gym equipment boundary, and
explicit double progression with rep ranges. `frontend/src/sheets.starter.test.jsx` verifies chooser
grouping and gym labeling. Review status: approved for this starter-program delivery.
