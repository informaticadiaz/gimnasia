# Mobility Starter Plan

Original routine authored per [Routine authoring guide](ROUTINE_AUTHORING_GUIDE.md), task #6 of
[the routine roadmap](task-rutinas.md). It is a gentle general-mobility option, not a rehabilitation
protocol or a substitute for individualized clinical care.

## 1. Routine brief

| Field | Decision |
| --- | --- |
| Name | Mobility |
| Audience | Healthy adults seeking a gentle, general full-body mobility practice. Not for treating pain, injury, or a diagnosed condition. |
| Goal | Mobility. |
| Setting | Home or anywhere with enough floor space. |
| Equipment | None. |
| Frequency | 2 sessions/week — Monday and Thursday; the same full-body sequence repeats. |
| Duration | 8 sequential positions × 2 rounds × 20 s, with short resets; about 7:50 before transitions and warm-up. |
| Progression | Manual: use controlled 20 s holds first, then change the app target to 30 s only when that remains comfortable. Automatic progression is off. |
| Safety boundary | Stay in a comfortable range; stop for sharp, worsening, or radiating pain. People with an injury, significant joint restriction, dizziness, or a condition affecting safe exercise need individualized professional guidance. |

Brief confirmed with the user on 2026-10-10.

## 2. Evidence and compatibility rationale

The [U.S. Physical Activity Guidelines](https://odphp.health.gov/sites/default/files/2019-09/Physical_Activity_Guidelines_2nd_edition.pdf)
recognize flexibility work as an appropriate component of physical activity and state that stretching
can increase flexibility. They do **not** establish stretching alone as a replacement for aerobic or
muscle-strengthening activity. This plan therefore describes a mobility practice, not a complete
fitness program or a treatment.

The app represents each position as a timed exercise: `mode: 'time'`, `sec: 20`, two sets, and
`prog: 'off'`. The existing timer model has no independent left/right timers, so any unilateral or
asymmetric position is performed on **both sides within the displayed hold** (split the time evenly
or use the second round to reverse the starting side). This is a deliberate compatibility limit, not
a claim that one side is sufficient.

A short `restSec: 10` gives enough time to reset and change position without turning the sequence
into a circuit. The exercises have no superset group and remain sequential.

## 3. Exercise audit

All selected ids are present in `frontend/src/lib/exercises-data.js` and use `eq: "body weight"`.
They were selected for broad, gentle regional coverage rather than for diagnosis or corrective claims.

| Catalog ID | Catalog name | Coverage / use |
| --- | --- | --- |
| `1368` | ankle circles | Ankles; work both ankles within the hold. |
| `1604` | world greatest stretch | Hips, hamstrings, and thoracic rotation; work both lunge sides within the hold. |
| `1511` | hamstring stretch | Posterior thigh; work both sides within the hold. |
| `1424` | seated glute stretch | Glutes / hips; work both sides within the hold. |
| `3639` | bent knee lying twist | Gentle trunk rotation; work both sides within the hold. |
| `1346` | kneeling lat stretch | Lats and overhead reach. |
| `0669` | rear deltoid stretch | Rear shoulders; work both sides within the hold. |
| `1365` | upper back stretch | Upper back and shoulder girdle. |

## 4. Schedule

| Day | Routine | Prescription |
| --- | --- | --- |
| Monday | Mobility | All eight positions in order; 2 × 20 s each, 10 s reset between holds. |
| Thursday | Mobility | Repeat the same sequence. |

## 5. Validation

- The plan uses goal `mobility`, a dedicated chooser section, and no equipment.
- Tests pin the exercise order, Monday/Thursday reuse of the one routine, timed-hold shape, and the
  disabled automatic policy; chooser tests pin the new grouping.
- The plan makes no rehabilitation, pain-treatment, or injury-prevention claim.

## Result

**Implemented.** `frontend/src/lib/starter.js` adds `mobility`; `frontend/src/sheets.jsx` adds its
chooser copy and Mobility section; `frontend/src/locales/es.js` supplies Spanish translations.
