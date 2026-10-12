# Intermediate Strength

## Brief

| Field | Decision |
| --- | --- |
| Name | Intermediate Strength |
| Audience | Healthy intermediate trainees who already know the listed barbell lifts and can train with a rack and bench. It is not a beginner instruction or rehabilitation program. |
| Goal | Strength. |
| Setting | Gym. |
| Equipment | Barbell, weight plates, squat rack, and flat/incline bench. |
| Frequency | Four sessions weekly: Monday upper A, Tuesday lower A, Thursday upper B, Friday lower B. |
| Duration | Long: five exercises and 17–18 working sets per session. |
| Progression | Every routine explicitly uses `linear`: after every completed prescription, increase by the app's lift-specific load step; after three consecutive missed sessions, apply the existing deload. Starting weights are zero so the trainee selects a verified safe load. |
| Safety boundary | Stop for pain or a loss of safe control. Use rack safeties and an appropriate spotter for barbell presses and squats; seek qualified coaching or medical guidance when appropriate. |

## Sessions

All movements are built-in barbell catalog entries. Upper A: bench press 4×5, bent-over row 4×6,
seated overhead press 3×6, curl 3×8, lying triceps extension 3×8. Lower A: full squat 4×5,
Romanian deadlift 4×6, lunge 3×8, standing calf raise 3×10, rollerout 3×8. Upper B: incline
bench press 4×5, bent-over row 4×6, seated overhead press 3×6, curl 3×8, lying triceps extension
3×8. Lower B: deadlift 3×5, front squat 4×5, Romanian deadlift 3×6, standing calf raise 3×10,
rollerout 3×8.

## Catalog and compatibility audit

The plan uses `0025`, `0027`, `0091`, `0031`, `0061`, `0043`, `0085`, `0054`, `1372`, `0084`,
`0047`, `0032`, and `0042`; each resolves to a barbell entry in the built-in exercise inventory.
Sessions begin with the highest-skill compound movement, then cover horizontal push/pull, vertical
push, squat, hinge, unilateral leg work, calves, trunk, and limited arm assistance. The fixed weekly
model supports its Monday/Tuesday/Thursday/Friday upper/lower split but does not model load blocks,
autoregulatory substitutions, or alternating weeks.

Routine-level `linear` progression is supported directly by the existing progression engine. It adds
the catalog-derived increment after a completed rep prescription and has a configured three-session
miss threshold before deloading. The app's zero starting load is intentional: preset source loads
without a person's unit, training history, and equipment are unsafe to import.

## Evidence and review status

Exercise selection was authored from the built-in inventory and the routine authoring guide; it was
not copied from an external routine. `frontend/src/lib/starter.test.js` verifies catalog resolution,
the exact prescriptions and schedule, zero starting weights, the barbell-only boundary, and explicit
linear progression. `frontend/src/sheets.starter.test.jsx` verifies chooser grouping and gym labeling.
Review status: approved for this starter-program delivery.
