// The starter-plan catalog. Training data only: the chooser's plan names and descriptions are
// written as string literals inside t() calls in sheets.jsx, because check-source-strings.mjs
// only finds them there — copy parked in here would silently ship English in every language.
//
// A routine is [key, name, emoji, [[exerciseId, sets, reps], …]]. The key is what a plan's
// schedule points at, so a weekday never depends on the position of a routine in the array.
// An exercise may carry a fourth element — extra routine-exercise fields (timed work, circuits),
// merged in as-is; see `circuit` below.
// Names stay canonical English — they become ordinary user routines, which are not translated.
import { uid } from './format.js'

const PPL = [
  ['push', 'Push Day', 'barbell', [['0025', 4, 8], ['0047', 3, 10], ['0426', 3, 10], ['0334', 3, 12], ['0241', 3, 12], ['0251', 3, 10]]],
  ['pull', 'Pull Day', 'pullup', [['2330', 4, 10], ['0027', 4, 8], ['1323', 3, 10], ['0031', 3, 10], ['0313', 3, 12]]],
  ['legs', 'Leg Day', 'legs', [['0043', 4, 8], ['0085', 3, 10], ['0739', 3, 12], ['0585', 3, 12], ['0586', 3, 12], ['0605', 4, 15]]]
]

const UPPER_LOWER = [
  ['upper-a', 'Upper A', 'barbell', [['0025', 3, 8], ['2330', 3, 10], ['0047', 2, 10], ['1323', 2, 10], ['0334', 2, 12], ['0241', 2, 12], ['0031', 2, 12]]],
  ['lower-a', 'Lower A', 'legs', [['0043', 3, 8], ['0085', 3, 8], ['0739', 2, 10], ['0586', 2, 12], ['0605', 3, 15]]],
  ['upper-b', 'Upper B', 'barbell', [['0047', 3, 8], ['0027', 3, 8], ['0426', 2, 10], ['2330', 2, 10], ['0334', 2, 12], ['0241', 2, 12], ['0313', 2, 12]]],
  ['lower-b', 'Lower B', 'legs', [['0739', 3, 10], ['0085', 2, 10], ['0585', 2, 12], ['0586', 3, 12], ['0605', 3, 15]]]
]

const FULL_BODY = [
  ['fb-a', 'Full Body A', 'figureStrength', [['0043', 3, 8], ['0025', 3, 8], ['2330', 3, 10], ['0586', 3, 12], ['0334', 2, 12], ['0031', 2, 12]]],
  ['fb-b', 'Full Body B', 'figureStrength', [['0085', 3, 8], ['0047', 3, 10], ['1323', 3, 10], ['0585', 3, 12], ['0334', 2, 12], ['0241', 2, 12]]],
  ['fb-c', 'Full Body C', 'figureStrength', [['0739', 3, 10], ['0025', 2, 10], ['0027', 3, 10], ['0426', 2, 10], ['0586', 3, 12], ['0605', 3, 15]]]
]

const FIVE_BY_FIVE = [
  ['5x5-a', '5×5 A', 'barbell', [['0043', 5, 5], ['0025', 5, 5], ['0027', 5, 5]]],
  ['5x5-b', '5×5 B', 'barbell', [['0085', 5, 5], ['0426', 5, 5], ['2330', 5, 5]]],
  ['5x5-c', '5×5 C', 'barbell', [['0739', 5, 5], ['0047', 5, 5], ['1323', 5, 5]]]
]

// No equipment at all — every id below carries eq:"body weight" in the catalog. The squat
// pattern has no plain two-leg entry there (see docs/ROUTINE_BODYWEIGHT_NO_EQUIPMENT.md), so
// split squats stand in across all three days; push, pull and core rotate for variety instead.
const BODYWEIGHT = [
  ['bw-a', 'Bodyweight A', 'stretch', [['2368', 3, 10], ['0662', 3, 8], ['0499', 3, 8], ['3013', 3, 12], ['0001', 3, 12]]],
  ['bw-b', 'Bodyweight B', 'abs', [['2368', 3, 10], ['0283', 3, 8], ['0497', 3, 8], ['3561', 3, 10], ['0003', 3, 15]]],
  ['bw-c', 'Bodyweight C', 'figureRun', [['2368', 3, 10], ['1311', 3, 8], ['3166', 3, 10], ['0464', 3, 10], ['0630', 3, 20]]]
]

// Dumbbells only, no bench (see docs/ROUTINE_DUMBBELL_NO_BENCH.md) — squat, hinge and press
// repeat unchanged on both days (the highest-skill lifts, worth the repetition at only 2
// sessions/week); only the row and the push vary, for some freshness without adding a third
// day. No dumbbell floor press exists in the catalog (only barbell/kettlebell do), so the
// push is the plan's one bodyweight exception: a push-up needs less equipment than a
// dumbbell, not more, so it doesn't break the "just dumbbells" promise in practice.
const DUMBBELL = [
  ['db-a', 'Dumbbell A', 'dumbbell', [['1760', 3, 10], ['1459', 3, 10], ['0293', 3, 10], ['0426', 3, 10], ['0662', 3, 8]]],
  ['db-b', 'Dumbbell B', 'dumbbell', [['1760', 3, 10], ['1459', 3, 10], ['0292', 3, 10], ['0426', 3, 10], ['1311', 3, 8]]]
]

// One added piece of equipment over BODYWEIGHT: a pull-up bar, which unlocks a real vertical
// pull (instead of Bodyweight's inverted-row/standing-row substitutes) and hanging core work.
// Squat and hinge/glute reuse Bodyweight's exact same catalog-limited picks (see its own
// comment above — still no plain air squat or a third clean bodyweight glute-bridge variant).
// Anyone who cannot yet do a full pull-up/chin-up should substitute `0688` scapular pull-up or
// Bodyweight's `0499` inverted row until ready (docs/ROUTINE_PULL_UP_BAR.md).
const PULL_UP_BAR = [
  ['pb-a', 'Pull-up Bar A', 'pullup', [['2368', 3, 10], ['0652', 3, 5], ['0662', 3, 8], ['3013', 3, 12], ['0472', 3, 8]]],
  ['pb-b', 'Pull-up Bar B', 'pullup', [['2368', 3, 10], ['1326', 3, 5], ['1311', 3, 8], ['3561', 3, 10], ['1761', 3, 8]]],
  ['pb-c', 'Pull-up Bar C', 'pullup', [['2368', 3, 10], ['0651', 3, 5], ['0283', 3, 8], ['3013', 3, 12], ['0475', 3, 8]]]
]

// Resistance bands with handles plus a door anchor (docs/ROUTINE_RESISTANCE_BAND.md). The
// catalog's only band squat (`1004`) needs a mini loop band, which this plan deliberately does not
// assume — so A/C squat through `1003` band squat row and B reuses Bodyweight's `2368` split squats.
const RESISTANCE_BAND = [
  ['rb-a', 'Resistance Band A', 'figureStrength', [['1003', 3, 12], ['1010', 3, 12], ['3124', 3, 12], ['3116', 3, 12], ['0979', 3, 10]]],
  ['rb-b', 'Resistance Band B', 'arm', [['2368', 3, 10], ['0991', 3, 12], ['0997', 3, 12], ['3144', 3, 12], ['1015', 3, 10]]],
  ['rb-c', 'Resistance Band C', 'abs', [['1003', 3, 12], ['1010', 3, 12], ['0989', 3, 10], ['0974', 3, 12], ['1005', 3, 12]]]
]

// A matched pair of kettlebells (docs/ROUTINE_KETTLEBELL.md), for people with a training base —
// the swing is ballistic and technical. The catalog has no kettlebell deadlift, so the swing is
// the plan's pure hinge on A and C, and B hinges through the two-arm clean.
const KETTLEBELL = [
  ['kb-a', 'Kettlebell A', 'kettlebell', [['0534', 3, 10], ['0549', 3, 15], ['0553', 3, 8], ['1345', 3, 10], ['0554', 3, 6]]],
  ['kb-b', 'Kettlebell B', 'kettlebell', [['0536', 3, 8], ['0552', 3, 8], ['0519', 3, 10], ['0521', 3, 8], ['0532', 3, 10]]],
  ['kb-c', 'Kettlebell C', 'kettlebell', [['0533', 3, 8], ['0549', 3, 20], ['0520', 3, 8], ['0522', 3, 10], ['0548', 3, 12]]]
]

// A pair of dumbbells plus a pull-up bar, no bench (docs/ROUTINE_HOME_HYPERTROPHY.md) — the next
// step for Dumbbell and Pull-up Bar graduates. Six exercises a day with arm and shoulder isolation
// for volume. With no bench and no dumbbell floor press in the catalog, the horizontal push stays
// a push-up variant (`1274` uses the dumbbells as handles) and progresses by reps, not load.
const HOME_HYPERTROPHY = [
  ['hh-a', 'Home Hypertrophy A', 'dumbbell', [['1760', 3, 10], ['0652', 3, 6], ['1274', 3, 10], ['1459', 3, 10], ['0334', 3, 12], ['0313', 3, 12]]],
  ['hh-b', 'Home Hypertrophy B', 'dumbbell', [['0410', 3, 10], ['0292', 3, 10], ['0426', 3, 10], ['1326', 3, 6], ['0430', 3, 12], ['0472', 3, 10]]],
  ['hh-c', 'Home Hypertrophy C', 'dumbbell', [['1760', 3, 12], ['0651', 3, 6], ['1311', 3, 10], ['1757', 3, 10], ['0294', 3, 12], ['0333', 3, 12]]]
]

// A pair of dumbbells plus a flat bench (docs/ROUTINE_DUMBBELL_BENCH.md), for strength — the bench
// closes the Dumbbell plan's missing loaded horizontal press. It is flat, not adjustable, so the
// only row is `0292` one-arm row on all three days (incline chest-supported rows need an
// adjustable bench); the bench also serves the step-up and split squat.
const DUMBBELL_BENCH = [
  ['dbb-a', 'Dumbbell + Bench A', 'dumbbell', [['1760', 4, 8], ['1459', 3, 8], ['0289', 4, 6], ['0292', 4, 8], ['0351', 3, 10]]],
  ['dbb-b', 'Dumbbell + Bench B', 'dumbbell', [['0431', 3, 8], ['0300', 4, 6], ['0405', 4, 6], ['0292', 4, 8], ['0375', 3, 10]]],
  ['dbb-c', 'Dumbbell + Bench C', 'dumbbell', [['0410', 3, 8], ['1459', 3, 8], ['0352', 4, 6], ['0292', 4, 8], ['0294', 3, 10]]]
]

// One routine run as a circuit: every exercise timed for `sec` seconds under the `time` policy
// (time mode defaults to no progression, so it must be asked for), all sharing superset id `sg`
// so the workout moves through them as one round, with `restSec` of rest after each round.
const circuit = (sg, sets, sec, restSec, ids) =>
  ids.map(id => [id, sets, null, { mode: 'time', sec, prog: 'time', sg, restSec }])

// No equipment, conditioning (docs/ROUTINE_BODYWEIGHT_CONDITIONING.md): one five-exercise circuit
// a day, 30 s on each, three rounds, 60 s between rounds. Jumps and burpees make it high-impact,
// so it is meant for people who finished Bodyweight, not as a first plan.
const BODYWEIGHT_CONDITIONING = [
  ['bc-a', 'Conditioning A', 'figureRun', circuit('bc-a', 3, 30, 60, ['0514', '0662', '0630', '3561', '1160'])],
  ['bc-b', 'Conditioning B', 'figureRun', circuit('bc-b', 3, 30, 60, ['3361', '1471', '3636', '2368', '0464'])],
  ['bc-c', 'Conditioning C', 'figureRun', circuit('bc-c', 3, 30, 60, ['3223', '1311', '3360', '3655', '0501'])]
]

// No equipment, gentle general mobility (docs/ROUTINE_MOBILITY.md): one full-body sequence
// repeated Monday and Thursday. Each position is held for 20 seconds over two rounds, with a
// short reset between holds. Holds that name one side require the user to work both sides within
// that hold; the routine model cannot represent independent left/right timers. Progression stays
// manual (20 s to 30 s when controlled), so timed work explicitly opts out of auto progression.
const timedHolds = ids =>
  ids.map(id => [id, 2, null, { mode: 'time', sec: 20, restSec: 10, prog: 'off' }])

const MOBILITY = [
  ['mobility', 'Mobility', 'stretch', timedHolds(['1368', '1604', '1511', '1424', '3639', '1346', '0669', '1365'])]
]

// [weekday, routineKey] — weekday is a DAYN index, so 1 is Monday. Fixed weeks only: every
// plan repeats the same seven days, which is all the weekly plan model can represent.
// goal is what the chooser groups by: 'general', 'strength', 'hypertrophy', 'conditioning' or 'mobility'.
const PLANS = {
  ppl: { goal: 'hypertrophy', routines: PPL, schedule: [[1, 'push'], [3, 'pull'], [5, 'legs']] },
  'upper-lower': { goal: 'hypertrophy', routines: UPPER_LOWER, schedule: [[1, 'upper-a'], [2, 'lower-a'], [4, 'upper-b'], [5, 'lower-b']] },
  'full-body': { goal: 'general', routines: FULL_BODY, schedule: [[1, 'fb-a'], [3, 'fb-b'], [5, 'fb-c']] },
  '5x5': { goal: 'strength', routines: FIVE_BY_FIVE, schedule: [[1, '5x5-a'], [3, '5x5-b'], [5, '5x5-c']] },
  bodyweight: { goal: 'general', routines: BODYWEIGHT, schedule: [[1, 'bw-a'], [3, 'bw-b'], [5, 'bw-c']] },
  dumbbell: { goal: 'general', routines: DUMBBELL, schedule: [[1, 'db-a'], [4, 'db-b']] },
  'pull-up-bar': { goal: 'general', routines: PULL_UP_BAR, schedule: [[1, 'pb-a'], [3, 'pb-b'], [5, 'pb-c']] },
  'resistance-band': { goal: 'general', routines: RESISTANCE_BAND, schedule: [[1, 'rb-a'], [3, 'rb-b'], [5, 'rb-c']] },
  // Strength and conditioning; filed under strength, the half the chooser can name in one word.
  kettlebell: { goal: 'strength', routines: KETTLEBELL, schedule: [[1, 'kb-a'], [3, 'kb-b'], [5, 'kb-c']] },
  'home-hypertrophy': { goal: 'hypertrophy', routines: HOME_HYPERTROPHY, schedule: [[1, 'hh-a'], [3, 'hh-b'], [5, 'hh-c']] },
  'dumbbell-bench': { goal: 'strength', routines: DUMBBELL_BENCH, schedule: [[1, 'dbb-a'], [3, 'dbb-b'], [5, 'dbb-c']] },
  'bodyweight-conditioning': { goal: 'conditioning', routines: BODYWEIGHT_CONDITIONING, schedule: [[1, 'bc-a'], [3, 'bc-b'], [5, 'bc-c']] },
  mobility: { goal: 'mobility', routines: MOBILITY, schedule: [[1, 'mobility'], [4, 'mobility']] }
}

const build = routines =>
  routines.map(([, name, emoji, list]) => ({
    id: uid(), name, emoji,
    // a timed exercise has no reps (null), so the key is left out rather than stored empty
    ex: list.map(([id, sets, reps, extra]) => ({ id, sets, ...(reps != null && { reps }), weight: 0, ...extra }))
  }))

// Fresh routine objects (new ids) — [push, pull, legs]. The demo build seeds a history on
// top of exactly these three, so this entry point keeps its shape.
export const starterRoutines = () => build(PPL)

// [{ id, days, goal }] for the chooser. The day count is read off the schedule rather than stored
// beside it, so the two can never disagree.
export const starterPlanOptions = () =>
  Object.entries(PLANS).map(([id, { goal, schedule }]) => ({ id, days: schedule.length, goal }))

// The weekdays a plan would claim, or null for an unknown id.
export const starterPlanDays = id => PLANS[id]?.schedule.map(([day]) => day) ?? null

// Fresh routines plus the weekdays to put them on, or null for an unknown id — a caller that
// treats null as "change nothing" can never half-apply a plan.
export const buildStarterPlan = id => {
  const plan = PLANS[id]
  if (!plan) return null
  const routines = build(plan.routines)
  // key → the id just minted for it, so the schedule below names its routine
  const byKey = Object.fromEntries(plan.routines.map(([key], i) => [key, routines[i].id]))
  return { routines, schedule: plan.schedule.map(([day, key]) => ({ day, routineId: byKey[key] })) }
}
