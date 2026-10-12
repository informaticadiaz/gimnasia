# Gym Machines Starter

## Brief

| Field | Decision |
| --- | --- |
| Name | Gym Machines Starter |
| Audience | Healthy beginners who can use standard gym machines and cable stations. It is not a rehabilitation program. |
| Goal | General fitness. |
| Setting | Gym. |
| Equipment | Leg press, lever machines, cable station, and seated row station. |
| Frequency | Three sessions weekly: Monday, Wednesday, and Friday. |
| Duration | Standard: five exercises and 15 working sets per session. |
| Progression | Existing rep-based exercise progression; all starting weights are zero so the trainee selects a safe first load. |
| Safety boundary | Stop for pain, obtain instruction for unfamiliar equipment, and seek qualified medical or coaching guidance when appropriate. |

## Sessions

All prescriptions are 3 sets. A: 45° leg press 10, lever chest press 10, cable lat pulldown 10,
cable seated row 10, cable kneeling crunch 12. B: lever leg extension 12, lever lying leg curl 12,
lever shoulder press 10, cable seated row 10, cable triceps pushdown 12. C: 45° leg press 10,
cable seated chest press 10, cable lat pulldown 10, cable curl 12, cable kneeling crunch 12.

## Catalog and compatibility audit

The plan uses only built-in machine/cable entries: `0739`, `0577`, `2330`, `0861`, `0175`,
`0585`, `0586`, `0603`, `0241`, `2144`, and `0868`. Sessions cover lower-body push and knee
flexion/extension, horizontal and vertical push/pull, and trunk flexion. Machine paths reduce
setup complexity for a beginner without claiming that machines make training risk-free.

The static weekly model supports this fixed Monday/Wednesday/Friday plan. It does not model a
multi-week block or equipment substitutions; substitute a comparable machine or cable movement
with qualified gym guidance when a station is unavailable. No new progression policy or schema is
needed.

## Evidence and review status

Exercise selection was authored against the built-in inventory and the routine authoring guide,
not copied from an external routine. Catalog IDs, equipment boundary, fixed schedule, zero starting
weights, and prescriptions are covered by `frontend/src/lib/starter.test.js`; chooser copy is
covered by `frontend/src/sheets.starter.test.jsx`. Review status: approved for this starter-plan
delivery.
