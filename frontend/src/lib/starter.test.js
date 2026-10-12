import { describe, expect, it } from 'vitest'
import { EXIDX } from './exercises.js'
import { buildStarterPlan, starterPlanDays, starterPlanOptions, starterRoutines } from './starter.js'
import { policyFor } from './progression.js'
import { supersetUnits } from './history.js'
import { buildSessionEntries } from './session-start.js'

// The approved prescription, written out again rather than imported: a test that reads the
// same table as the code would pass no matter what that table said. [weekday, name, sets].
// A timed exercise's third value is its duration, written '30s' so it can't pass for reps.
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
  'express-bodyweight': [
    [1, 'Express Bodyweight A', [['2368', 2, 8], ['0659', 2, 8], ['3166', 2, 10], ['3013', 2, 10]]],
    [3, 'Express Bodyweight B', [['2368', 2, 8], ['0659', 2, 8], ['3166', 2, 10], ['3013', 2, 10]]],
    [5, 'Express Bodyweight C', [['2368', 2, 8], ['0659', 2, 8], ['3166', 2, 10], ['3013', 2, 10]]],
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
  'home-upper-lower': [
    [1, 'Home Upper A', [['1274', 3, 10], ['0652', 3, 6], ['0426', 3, 10], ['0292', 3, 10], ['0334', 3, 12], ['0430', 3, 12]]],
    [2, 'Home Lower A', [['1760', 3, 10], ['1459', 3, 10], ['0336', 3, 10], ['0417', 3, 12], ['0472', 3, 10]]],
    [4, 'Home Upper B', [['1311', 3, 10], ['1326', 3, 6], ['0292', 3, 10], ['0426', 3, 10], ['0294', 3, 12], ['0333', 3, 12]]],
    [5, 'Home Lower B', [['0410', 3, 10], ['1757', 3, 10], ['0336', 3, 10], ['0417', 3, 12], ['0472', 3, 10]]],
  ],
  'dumbbell-bench': [
    [1, 'Dumbbell + Bench A', [['1760', 4, 8], ['1459', 3, 8], ['0289', 4, 6], ['0292', 4, 8], ['0351', 3, 10]]],
    [3, 'Dumbbell + Bench B', [['0431', 3, 8], ['0300', 4, 6], ['0405', 4, 6], ['0292', 4, 8], ['0375', 3, 10]]],
    [5, 'Dumbbell + Bench C', [['0410', 3, 8], ['1459', 3, 8], ['0352', 4, 6], ['0292', 4, 8], ['0294', 3, 10]]],
  ],
  'gym-machines': [
    [1, 'Gym Machines A', [['0739', 3, 10], ['0577', 3, 10], ['2330', 3, 10], ['0861', 3, 10], ['0175', 3, 12]]],
    [3, 'Gym Machines B', [['0585', 3, 12], ['0586', 3, 12], ['0603', 3, 10], ['0861', 3, 10], ['0241', 3, 12]]],
    [5, 'Gym Machines C', [['0739', 3, 10], ['2144', 3, 10], ['2330', 3, 10], ['0868', 3, 12], ['0175', 3, 12]]],
  ],
  'intermediate-strength': [
    [1, 'Strength Upper A', [['0025', 4, 5], ['0027', 4, 6], ['0091', 3, 6], ['0031', 3, 8], ['0061', 3, 8]]],
    [2, 'Strength Lower A', [['0043', 4, 5], ['0085', 4, 6], ['0054', 3, 8], ['1372', 3, 10], ['0084', 3, 8]]],
    [4, 'Strength Upper B', [['0047', 4, 5], ['0027', 4, 6], ['0091', 3, 6], ['0031', 3, 8], ['0061', 3, 8]]],
    [5, 'Strength Lower B', [['0032', 3, 5], ['0042', 4, 5], ['0085', 3, 6], ['1372', 3, 10], ['0084', 3, 8]]],
  ],
  'body-part-split': [
    [1, 'Chest', [['0025', 4, 12], ['0047', 4, 12], ['0251', 3, 15], ['0179', 3, 15], ['2144', 3, 15]]],
    [2, 'Back', [['2330', 4, 12], ['0027', 4, 12], ['1323', 3, 15], ['0581', 3, 15], ['0606', 3, 15]]],
    [3, 'Legs', [['0043', 4, 12], ['0085', 4, 12], ['0739', 3, 15], ['0585', 3, 15], ['0586', 3, 15], ['0605', 4, 20]]],
    [4, 'Shoulders', [['0426', 4, 12], ['0334', 4, 15], ['0333', 3, 15], ['0603', 3, 15], ['0202', 3, 15]]],
    [5, 'Arms', [['0031', 4, 15], ['0313', 4, 15], ['0241', 4, 15], ['0061', 4, 15], ['0251', 3, 15]]],
  ],
  'bodyweight-conditioning': [
    [1, 'Conditioning A', [['0514', 3, '30s'], ['0662', 3, '30s'], ['0630', 3, '30s'], ['3561', 3, '30s'], ['1160', 3, '30s']]],
    [3, 'Conditioning B', [['3361', 3, '30s'], ['1471', 3, '30s'], ['3636', 3, '30s'], ['2368', 3, '30s'], ['0464', 3, '30s']]],
    [5, 'Conditioning C', [['3223', 3, '30s'], ['1311', 3, '30s'], ['3360', 3, '30s'], ['3655', 3, '30s'], ['0501', 3, '30s']]],
  ],
}

const shape = r => r.ex.map(e => [e.id, e.sets, e.mode === 'time' ? `${e.sec}s` : e.reps])

describe('starter plan catalog', () => {
  it('offers exactly the eighteen plans, each with its goal and the day count read off the schedule', () => {
    expect(starterPlanOptions()).toEqual([
      { id: 'ppl', days: 3, goal: 'hypertrophy' }, { id: 'upper-lower', days: 4, goal: 'hypertrophy' },
      { id: 'full-body', days: 3, goal: 'general' }, { id: '5x5', days: 3, goal: 'strength' },
      { id: 'bodyweight', days: 3, goal: 'general' }, { id: 'express-bodyweight', days: 3, goal: 'general' }, { id: 'dumbbell', days: 2, goal: 'general' },
      { id: 'pull-up-bar', days: 3, goal: 'general' }, { id: 'resistance-band', days: 3, goal: 'general' },
      { id: 'kettlebell', days: 3, goal: 'strength' }, { id: 'home-hypertrophy', days: 3, goal: 'hypertrophy' },
      { id: 'home-upper-lower', days: 4, goal: 'hypertrophy' },
      { id: 'dumbbell-bench', days: 3, goal: 'strength' },
      { id: 'gym-machines', days: 3, goal: 'general' },
      { id: 'intermediate-strength', days: 4, goal: 'strength' },
      { id: 'body-part-split', days: 5, goal: 'hypertrophy' },
      { id: 'bodyweight-conditioning', days: 3, goal: 'conditioning' },
      { id: 'mobility', days: 2, goal: 'mobility' },
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
        expect(e.mode === 'time' ? e.sec : e.reps, e.id).toBeGreaterThan(0)
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

describe('home upper/lower equipment boundary', () => {
  it('uses only dumbbells or bodyweight catalog entries, never gym machines', () => {
    for (const exercise of buildStarterPlan('home-upper-lower').routines.flatMap(r => r.ex)) {
      expect(['dumbbell', 'body weight'], exercise.id).toContain(EXIDX[exercise.id].eq)
    }
  })
})

describe('gym machines equipment boundary', () => {
  it('uses only machine or cable catalog entries', () => {
    for (const exercise of buildStarterPlan('gym-machines').routines.flatMap(r => r.ex)) {
      expect(['sled machine', 'leverage machine', 'cable'], exercise.id).toContain(EXIDX[exercise.id].eq)
    }
  })
})

describe('intermediate strength equipment and progression boundary', () => {
  it('uses only barbell catalog entries and explicitly applies linear progression to every routine', () => {
    for (const routine of buildStarterPlan('intermediate-strength').routines) {
      expect(routine.prog, routine.name).toBe('linear')
      for (const exercise of routine.ex) {
        expect(EXIDX[exercise.id].eq, exercise.id).toBe('barbell')
        expect(policyFor(exercise, routine, 'reps'), exercise.id).toBe('linear')
      }
    }
  })
})

describe('body-part split equipment and progression boundary', () => {
  it('uses only full-gym catalog entries and explicitly applies double progression with rep ranges', () => {
    for (const routine of buildStarterPlan('body-part-split').routines) {
      expect(routine.prog, routine.name).toBe('double')
      for (const exercise of routine.ex) {
        expect(['barbell', 'cable', 'dumbbell', 'body weight', 'sled machine', 'leverage machine'], exercise.id).toContain(EXIDX[exercise.id].eq)
        expect(exercise.repsMin, exercise.id).toBeGreaterThan(0)
        expect(exercise.repsMin, exercise.id).toBeLessThan(exercise.reps)
        expect(policyFor(exercise, routine, 'reps'), exercise.id).toBe('double')
      }
    }
  })
})

describe('bodyweight-conditioning circuits', () => {
  const { routines } = buildStarterPlan('bodyweight-conditioning')

  it('runs every routine as one circuit: a single superset unit spanning all its exercises', () => {
    for (const r of routines) expect(supersetUnits(r.ex), r.name).toEqual([r.ex.map((_, i) => i)])
    // and the circuits of different days never share a group id
    expect(new Set(routines.map(r => r.ex[0].sg)).size).toBe(routines.length)
  })

  it('times every exercise, rests 60 s after a round, and adds time under the time policy', () => {
    for (const r of routines) {
      for (const e of r.ex) {
        expect(e.mode, e.id).toBe('time')
        expect(e.restSec, e.id).toBe(60)
        // time mode defaults to no progression; the plan has to ask for it
        expect(policyFor(e, r, 'time'), e.id).toBe('time')
      }
    }
  })

  it('starts a workout as a timed circuit, not as rep sets', () => {
    const r = routines[0]
    const entries = buildSessionEntries({ unit: 'kg', workouts: [], routines: [r] }, r)
    expect(supersetUnits(entries)).toEqual([entries.map((_, i) => i)])
    for (const e of entries) {
      expect(e.plan.policy, e.id).toBe('time')
      expect(e.target.restSec, e.id).toBe(60)
      expect(e.sets.map(set => set.sec), e.id).toEqual([30, 30, 30])
    }
  })

  it('leaves the rep-based plans free of timed or circuit fields', () => {
    for (const e of buildStarterPlan('bodyweight').routines.flatMap(r => r.ex)) {
      expect(Object.keys(e).sort()).toEqual(['id', 'reps', 'sets', 'weight'])
    }
  })
})

describe('mobility timed holds', () => {
  const plan = buildStarterPlan('mobility')
  const { routines } = plan

  it('repeats one full-body routine on Monday and Thursday', () => {
    expect(routines.map(r => [r.name, shape(r)])).toEqual([[
      'Mobility',
      [['1368', 2, '20s'], ['1604', 2, '20s'], ['1511', 2, '20s'], ['1424', 2, '20s'], ['3639', 2, '20s'], ['1346', 2, '20s'], ['0669', 2, '20s'], ['1365', 2, '20s']]
    ]])
    expect(plan.schedule.map(({ day, routineId }) => [day, routines.find(r => r.id === routineId)?.name]))
      .toEqual([[1, 'Mobility'], [4, 'Mobility']])
  })

  it('uses 20-second timed holds for two rounds, with manual progression disabled', () => {
    for (const r of routines) {
      for (const e of r.ex) {
        expect(e.mode, e.id).toBe('time')
        expect(e.sec, e.id).toBe(20)
        expect(e.prog, e.id).toBe('off')
        expect(e.reps, e.id).toBeUndefined()
      }
    }
  })

  it('starts each mobility exercise as two 20-second holds without automatic progression', () => {
    const r = routines[0]
    const entries = buildSessionEntries({ unit: 'kg', workouts: [], routines: [r] }, r)
    for (const e of entries) {
      expect(e.plan.policy, e.id).toBe('off')
      expect(e.sets.map(set => set.sec), e.id).toEqual([20, 20])
    }
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
