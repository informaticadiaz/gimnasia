import { describe, expect, it } from 'vitest'
import { EXIDX } from './exercises.js'
import { buildStarterPlan, starterPlanDays, starterPlanOptions, starterRoutines } from './starter.js'

// The approved prescription, written out again rather than imported: a test that reads the
// same table as the code would pass no matter what that table said. [weekday, name, sets].
const APPROVED = {
  ppl: [
    [1, 'Push Day', [['0025', 4, 8], ['0047', 3, 10], ['0426', 3, 10], ['0334', 3, 12], ['0241', 3, 12], ['0251', 3, 10]]],
    [3, 'Pull Day', [['2330', 4, 10], ['0027', 4, 8], ['1323', 3, 10], ['0031', 3, 10], ['0313', 3, 12]]],
    [5, 'Leg Day', [['0043', 4, 8], ['0085', 3, 10], ['0739', 3, 12], ['0585', 3, 12], ['0586', 3, 12], ['0605', 4, 15]]],
  ],
  'upper-lower': [
    [1, 'Upper A', [['0025', 3, 8], ['2330', 3, 10], ['0047', 2, 10], ['1323', 2, 10], ['0334', 2, 12], ['0241', 2, 12], ['0031', 2, 12]]],
    [2, 'Lower A', [['0043', 3, 8], ['0085', 3, 8], ['0739', 2, 10], ['0586', 2, 12], ['0605', 3, 15]]],
    [4, 'Upper B', [['0047', 3, 8], ['0027', 3, 8], ['0426', 2, 10], ['2330', 2, 10], ['0334', 2, 12], ['0241', 2, 12], ['0313', 2, 12]]],
    [5, 'Lower B', [['0739', 3, 10], ['0085', 2, 10], ['0585', 2, 12], ['0586', 3, 12], ['0605', 3, 15]]],
  ],
  'full-body': [
    [1, 'Full Body A', [['0043', 3, 8], ['0025', 3, 8], ['2330', 3, 10], ['0586', 3, 12], ['0334', 2, 12], ['0031', 2, 12]]],
    [3, 'Full Body B', [['0085', 3, 8], ['0047', 3, 10], ['1323', 3, 10], ['0585', 3, 12], ['0334', 2, 12], ['0241', 2, 12]]],
    [5, 'Full Body C', [['0739', 3, 10], ['0025', 2, 10], ['0027', 3, 10], ['0426', 2, 10], ['0586', 3, 12], ['0605', 3, 15]]],
  ],
  '5x5': [
    [1, '5×5 A', [['0043', 5, 5], ['0025', 5, 5], ['0027', 5, 5]]],
    [3, '5×5 B', [['0085', 5, 5], ['0426', 5, 5], ['2330', 5, 5]]],
    [5, '5×5 C', [['0739', 5, 5], ['0047', 5, 5], ['1323', 5, 5]]],
  ],
  bodyweight: [
    [1, 'Bodyweight A', [['2368', 3, 10], ['0662', 3, 8], ['0499', 3, 8], ['3013', 3, 12], ['0001', 3, 12]]],
    [3, 'Bodyweight B', [['2368', 3, 10], ['0283', 3, 8], ['0497', 3, 8], ['3561', 3, 10], ['0003', 3, 15]]],
    [5, 'Bodyweight C', [['2368', 3, 10], ['1311', 3, 8], ['3166', 3, 10], ['0464', 3, 10], ['0630', 3, 20]]],
  ],
  dumbbell: [
    [1, 'Dumbbell A', [['1760', 3, 10], ['1459', 3, 10], ['0293', 3, 10], ['0426', 3, 10], ['0662', 3, 8]]],
    [4, 'Dumbbell B', [['1760', 3, 10], ['1459', 3, 10], ['0292', 3, 10], ['0426', 3, 10], ['1311', 3, 8]]],
  ],
  'pull-up-bar': [
    [1, 'Pull-up Bar A', [['2368', 3, 10], ['0652', 3, 5], ['0662', 3, 8], ['3013', 3, 12], ['0472', 3, 8]]],
    [3, 'Pull-up Bar B', [['2368', 3, 10], ['1326', 3, 5], ['1311', 3, 8], ['3561', 3, 10], ['1761', 3, 8]]],
    [5, 'Pull-up Bar C', [['2368', 3, 10], ['0651', 3, 5], ['0283', 3, 8], ['3013', 3, 12], ['0475', 3, 8]]],
  ],
  'resistance-band': [
    [1, 'Resistance Band A', [['1003', 3, 12], ['1010', 3, 12], ['3124', 3, 12], ['3116', 3, 12], ['0979', 3, 10]]],
    [3, 'Resistance Band B', [['2368', 3, 10], ['0991', 3, 12], ['0997', 3, 12], ['3144', 3, 12], ['1015', 3, 10]]],
    [5, 'Resistance Band C', [['1003', 3, 12], ['1010', 3, 12], ['0989', 3, 10], ['0974', 3, 12], ['1005', 3, 12]]],
  ],
  kettlebell: [
    [1, 'Kettlebell A', [['0534', 3, 10], ['0549', 3, 15], ['0553', 3, 8], ['1345', 3, 10], ['0554', 3, 6]]],
    [3, 'Kettlebell B', [['0536', 3, 8], ['0552', 3, 8], ['0519', 3, 10], ['0521', 3, 8], ['0532', 3, 10]]],
    [5, 'Kettlebell C', [['0533', 3, 8], ['0549', 3, 20], ['0520', 3, 8], ['0522', 3, 10], ['0548', 3, 12]]],
  ],
  'home-hypertrophy': [
    [1, 'Home Hypertrophy A', [['1760', 3, 10], ['0652', 3, 6], ['1274', 3, 10], ['1459', 3, 10], ['0334', 3, 12], ['0313', 3, 12]]],
    [3, 'Home Hypertrophy B', [['0410', 3, 10], ['0292', 3, 10], ['0426', 3, 10], ['1326', 3, 6], ['0430', 3, 12], ['0472', 3, 10]]],
    [5, 'Home Hypertrophy C', [['1760', 3, 12], ['0651', 3, 6], ['1311', 3, 10], ['1757', 3, 10], ['0294', 3, 12], ['0333', 3, 12]]],
  ],
  'dumbbell-bench': [
    [1, 'Dumbbell + Bench A', [['1760', 4, 8], ['1459', 3, 8], ['0289', 4, 6], ['0292', 4, 8], ['0351', 3, 10]]],
    [3, 'Dumbbell + Bench B', [['0431', 3, 8], ['0300', 4, 6], ['0405', 4, 6], ['0292', 4, 8], ['0375', 3, 10]]],
    [5, 'Dumbbell + Bench C', [['0410', 3, 8], ['1459', 3, 8], ['0352', 4, 6], ['0292', 4, 8], ['0294', 3, 10]]],
  ],
}

const shape = r => r.ex.map(e => [e.id, e.sets, e.reps])

describe('starter plan catalog', () => {
  it('offers exactly the eleven plans, with the day count read off the schedule', () => {
    expect(starterPlanOptions()).toEqual([
      { id: 'ppl', days: 3 }, { id: 'upper-lower', days: 4 },
      { id: 'full-body', days: 3 }, { id: '5x5', days: 3 }, { id: 'bodyweight', days: 3 },
      { id: 'dumbbell', days: 2 }, { id: 'pull-up-bar', days: 3 }, { id: 'resistance-band', days: 3 },
      { id: 'kettlebell', days: 3 }, { id: 'home-hypertrophy', days: 3 },
      { id: 'dumbbell-bench', days: 3 },
    ])
    for (const { id, days } of starterPlanOptions()) expect(starterPlanDays(id)).toHaveLength(days)
  })

  it('changes nothing for an unknown plan id', () => {
    expect(buildStarterPlan('nope')).toBeNull()
    expect(buildStarterPlan(undefined)).toBeNull()
    // A click handler wired straight to a loader would hand the event in as the plan.
    expect(buildStarterPlan({ type: 'click' })).toBeNull()
    expect(starterPlanDays('nope')).toBeNull()
  })
})

describe.each(Object.keys(APPROVED))('%s', planId => {
  const approved = APPROVED[planId]

  it('builds the approved exercises, sets and reps in order', () => {
    const { routines } = buildStarterPlan(planId)
    expect(routines.map(r => r.name)).toEqual(approved.map(([, name]) => name))
    routines.forEach((r, i) => expect(shape(r)).toEqual(approved[i][2]))
  })

  it('puts each routine on its approved weekday, by identity not position', () => {
    const { routines, schedule } = buildStarterPlan(planId)
    const nameOf = Object.fromEntries(routines.map(r => [r.id, r.name]))
    expect(schedule.map(({ day, routineId }) => [day, nameOf[routineId]]))
      .toEqual(approved.map(([day, name]) => [day, name]))
  })

  it('references only real exercises and starts every one at weight 0', () => {
    for (const r of buildStarterPlan(planId).routines) {
      for (const e of r.ex) {
        expect(EXIDX[e.id], e.id).toBeTruthy()
        expect(e.sets).toBeGreaterThan(0)
        expect(e.reps).toBeGreaterThan(0)
        expect(e.weight).toBe(0)
      }
    }
  })

  it('mints fresh ids and independent objects on every build', () => {
    const first = buildStarterPlan(planId)
    const second = buildStarterPlan(planId)
    const ids = first.routines.map(r => r.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(second.routines.some(r => ids.includes(r.id))).toBe(false)
    expect(first.routines[0].ex[0]).not.toBe(second.routines[0].ex[0])
    // and the static definition survives a caller mutating what it got back
    first.routines[0].ex[0].sets = 99
    expect(buildStarterPlan(planId).routines[0].ex[0].sets).toBe(approved[0][2][0][1])
  })
})

describe('starterRoutines (the demo build entry point)', () => {
  it('still returns push, pull and legs unchanged', () => {
    const routines = starterRoutines()
    expect(routines.map(r => r.name)).toEqual(['Push Day', 'Pull Day', 'Leg Day'])
    routines.forEach((r, i) => expect(shape(r)).toEqual(APPROVED.ppl[i][2]))
    expect(routines.map(r => r.emoji)).toEqual(['barbell', 'pullup', 'legs'])
  })

  it('mints fresh ids on every invocation', () => {
    const first = starterRoutines().map(r => r.id)
    const second = starterRoutines().map(r => r.id)
    expect(new Set([...first, ...second]).size).toBe(6)
  })
})
