# Intrvl Strength 5×5 Program

Source transcription and openGym compatibility assessment for the program published by [Intrvl](https://intrvl.app/assets/programs/strength_5x5.json). Retrieved 2026-09-03.

## Source routine

**Program:** Strength 5×5 Program  
**Author:** Intrvl  
**Schedule:** Alternate Workout A and Workout B three times per week.  
**Default rest:** 180 seconds.  
**Source tags:** 5×5, full body, strength, beginner.

### Workout A

| Exercise | Equipment | Prescription | Suggested weight from source |
| --- | --- | --- | ---: |
| Squat | Barbell, squat rack | 5 × 5 | 60 |
| Bench Press | Barbell, bench | 5 × 5 | 40 |
| Barbell Row | Barbell | 5 × 5 | 40 |

### Workout B

| Exercise | Equipment | Prescription | Suggested weight from source |
| --- | --- | --- | ---: |
| Squat | Barbell, squat rack | 5 × 5 | 60 |
| Overhead Press | Barbell | 5 × 5 | 30 |
| Deadlift | Barbell | 1 × 5 | 80 |

## openGym compatibility

### Exercise mapping

| Source exercise | openGym candidate | Catalog ID | Mapping status |
| --- | --- | ---: | --- |
| Squat | Barbell full squat | `0043` | Compatible candidate. |
| Bench Press | Barbell bench press | `0025` | Compatible candidate. |
| Barbell Row | Barbell bent over row | `0027` | Compatible candidate. |
| Overhead Press | Barbell seated overhead press | `0091` | Needs a product decision: the source does not state seated or standing. |
| Deadlift | Barbell deadlift | `0032` | Compatible candidate. |

### What transfers now

- The two workout templates can be represented as two openGym routines.
- Every prescription can be represented through an exercise ID, set count, repetition count, and weight.
- The routines can be added to a shared openGym plan bundle.

### What needs a decision or feature

| Source capability | openGym status | Required action |
| --- | --- | --- |
| Suggested weights | The source does not declare a unit. | Confirm the unit before mapping values to openGym weights. |
| 180-second default rest | Not represented in the current routine export format. | Confirm whether to use the profile default or add routine/exercise-level rest configuration. |
| A/B alternation three times per week | A weekly plan assigns a fixed routine to each weekday. | Schedule manually or add program-sequence support. |
| Add weight every session | openGym has progression rules, but this source's session-by-session program behavior needs an explicit mapping. | Define and test a progression policy for this program. |

## Result

**Partial compatibility.** The source routine can be imported as two static routine templates after resolving the overhead-press variant and weight unit. Faithful automatic execution of the complete program additionally requires alternating-schedule and progression-policy support.
