// The starter-plan catalog. Training data only: the chooser's plan names and descriptions are
// written as string literals inside t() calls in sheets.jsx, because check-source-strings.mjs
// only finds them there — copy parked in here would silently ship English in every language.
//
// A routine is [key, name, emoji, [[exerciseId, sets, reps], …]]. The key is what a plan's
// schedule points at, so a weekday never depends on the position of a routine in the array.
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

// [weekday, routineKey] — weekday is a DAYN index, so 1 is Monday. Fixed weeks only: every
// plan repeats the same seven days, which is all the weekly plan model can represent.
const PLANS = {
  ppl: { routines: PPL, schedule: [[1, 'push'], [3, 'pull'], [5, 'legs']] },
  'upper-lower': { routines: UPPER_LOWER, schedule: [[1, 'upper-a'], [2, 'lower-a'], [4, 'upper-b'], [5, 'lower-b']] },
  'full-body': { routines: FULL_BODY, schedule: [[1, 'fb-a'], [3, 'fb-b'], [5, 'fb-c']] },
  '5x5': { routines: FIVE_BY_FIVE, schedule: [[1, '5x5-a'], [3, '5x5-b'], [5, '5x5-c']] },
  bodyweight: { routines: BODYWEIGHT, schedule: [[1, 'bw-a'], [3, 'bw-b'], [5, 'bw-c']] },
  dumbbell: { routines: DUMBBELL, schedule: [[1, 'db-a'], [4, 'db-b']] },
  'pull-up-bar': { routines: PULL_UP_BAR, schedule: [[1, 'pb-a'], [3, 'pb-b'], [5, 'pb-c']] },
  'resistance-band': { routines: RESISTANCE_BAND, schedule: [[1, 'rb-a'], [3, 'rb-b'], [5, 'rb-c']] }
}

const build = routines =>
  routines.map(([, name, emoji, list]) => ({ id: uid(), name, emoji, ex: list.map(([id, sets, reps]) => ({ id, sets, reps, weight: 0 })) }))

// Fresh routine objects (new ids) — [push, pull, legs]. The demo build seeds a history on
// top of exactly these three, so this entry point keeps its shape.
export const starterRoutines = () => build(PPL)

// [{ id, days }] for the chooser. The day count is read off the schedule rather than stored
// beside it, so the two can never disagree.
export const starterPlanOptions = () =>
  Object.entries(PLANS).map(([id, { schedule }]) => ({ id, days: schedule.length }))

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
