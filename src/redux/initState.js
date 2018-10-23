export const initState =
  // prettier-ignore
  {
  workoutData:
  {
    
    timer: {
      started: false,
      minutes: 0,
      seconds: 0,
      set: 0
    },
    activeWorkout: {
      program: 2,
      day: 0,
      currentExercise: 0,
      dayBarActive: false,
      notes: ""
    },
    programs: [
      {
        id: 0,
        name: "EditLogProgram",
        category: -1,
        description: "Template for editing logs.",
        favorite: false,
        sets: [],
        exercises: [],
        days: []
      },
      {
        id: 1,
        name: "FreeStyle",
        category: 0,
        description: "",
        favorite: true,
        sets: [],
        exercises: [],
        days: [
          { id: 0, name: "Day 1" }
        ]
      },
      {
        id: 2,
        name: "GreySkull LP",
        category: 2,
        description: "Beginner strength program.",
        favorite: true,
        sets: [
          {
            id: 0, exercise: 0, day: 0, weight: 125, reps: 5, type: 0, complete: false, restMinutes: 0, restSeconds: 3, timerOn: true,
            percentage: false, percent: 50
          },
          {
            id: 1, exercise: 0, day: 0, weight: 125, reps: 5, type: 1, complete: false, restMinutes: 4, restSeconds: 0, timerOn: true,
            percentage: false, percent: 50},
          {
            id: 2, exercise: 0, day: 0, weight: 125, reps: 5, type: 2, complete: false, restMinutes: 5, restSeconds: 0, timerOn: true,
            percentage: false, percent: 50},
          {
            id: 3, exercise: 1, day: 0, weight: 150, reps: 5, type: 1, complete: false, restMinutes: 3, restSeconds: 0, timerOn: true,
            percentage: false, percent: 50},
          {
            id: 4, exercise: 1, day: 0, weight: 150, reps: 5, type: 1, complete: false, restMinutes: 3, restSeconds: 0, timerOn: true,
            percentage: false, percent: 50},
          {
            id: 5, exercise: 1, day: 0, weight: 150, reps: 5, type: 2, complete: false, restMinutes: 3, restSeconds: 0, timerOn: true,
            percentage: false, percent: 50},
          {
            id: 6, exercise: 2, day: 0, weight: 180, reps: 5, type: 1, complete: false, restMinutes: 3, restSeconds: 0, timerOn: true,
            percentage: false, percent: 50},
          {
            id: 7, exercise: 2, day: 0, weight: 180, reps: 5, type: 1, complete: false, restMinutes: 3, restSeconds: 0, timerOn: true,
            percentage: false, percent: 50},
          {
            id: 8, exercise: 2, day: 0, weight: 180, reps: 5, type: 3, complete: false, restMinutes: 3, restSeconds: 0, timerOn: true,
            percentage: false, percent: 50},
          {
            id: 9, exercise: 3, day: 1, weight: 135, reps: 5, type: 1, complete: false, restMinutes: 3, restSeconds: 0, timerOn: true,
            percentage: false, percent: 50},
          {
            id: 10, exercise: 3, day: 1, weight: 135, reps: 5, type: 1, complete: false, restMinutes: 3, restSeconds: 0, timerOn: true,
            percentage: false, percent: 50},
          {
            id: 11, exercise: 3, day: 1, weight: 135, reps: 5, type: 2, complete: false, restMinutes: 3, restSeconds: 0, timerOn: true,
            percentage: false, percent: 50},
          {
            id: 12, exercise: 4, day: 1, weight: 155, reps: 5, type: 1, complete: false, restMinutes: 3, restSeconds: 0, timerOn: true,
            percentage: false, percent: 50},
          {
            id: 13, exercise: 4, day: 1, weight: 155, reps: 5, type: 1, complete: false, restMinutes: 3, restSeconds: 0, timerOn: true,
            percentage: false, percent: 50},
          {
            id: 14, exercise: 4, day: 1, weight: 155, reps: 5, type: 2, complete: false, restMinutes: 3, restSeconds: 0, timerOn: true,
            percentage: false, percent: 50},
          {
            id: 15, exercise: 5, day: 1, weight: 195, reps: 5, type: 0, complete: false, restMinutes: 3, restSeconds: 0, timerOn: true,
            percentage: false, percent: 50},
          {
            id: 16, exercise: 5, day: 1, weight: 195, reps: 5, type: 2, complete: false, restMinutes: 3, restSeconds: 0, timerOn: true,
            percentage: false, percent: 50},
          {
            id: 17, exercise: 5, day: 1, weight: 195, reps: 5, type: 3, complete: false, restMinutes: 3, restSeconds: 0, timerOn: true,
            percentage: false, percent: 50},
        ],
        exercises: [
          {
            id: 0, libraryId: 1, day: 0, complete: false,
            supersetNext: true, includeWarmup: true, workoutsToIncrease: 1, increaseAmmount: 5, workoutsTowardsIncrease: 0,
            barType: "", units: 0
          },
          {
            id: 1, libraryId: 2, day: 0, complete: false,
            supersetNext: false, includeWarmup: false, workoutsToIncrease: 1, increaseAmmount: 5, workoutsTowardsIncrease: 0,
            barType: "", units: 0
          },
          {
            id: 2, libraryId: 3, day: 0, complete: false,
            supersetNext: false, includeWarmup: false, workoutsToIncrease: 1, increaseAmmount: 5, workoutsTowardsIncrease: 0,
            barType: "", units: 0
          },
          {
            id: 3, libraryId: 4, day: 1, complete: false,
            supersetNext: true, includeWarmup: false, workoutsToIncrease: 1, increaseAmmount: 5, workoutsTowardsIncrease: 0,
            barType: "", units: 0
          },
          {
            id: 4, libraryId: 5, day: 1, complete: false,
            supersetNext: false, includeWarmup: false, workoutsToIncrease: 1, increaseAmmount: 5, workoutsTowardsIncrease: 0,
            barType: "", units: 0
          },
          {
            id: 5, libraryId: 6, day: 1, complete: false,
            supersetNext: false, includeWarmup: false, workoutsToIncrease: 1, increaseAmmount: 5, workoutsTowardsIncrease: 0,
            barType: "", units: 0
          },
        ],
        days: [
          { id: 0, name: "A" },
          { id: 1, name: "B" },
          {id: 2, name: "C"}
        ]
      },
      {
        id: 3,
        name: "5/3/1 Boring But Big",
        category: 2,
        description: "Another beginner strength program.",
        favorite: false,
        sets: [
          {
            id: 0, exercise: 0, day: 0, weight: 0, reps: 0, type: 1, complete: false, restMinutes: 0, restSeconds: 0, timerOn: true,
            percentage: false, percent: 50}
        ],
        exercises: [
          {
            id: 0, libraryId: 0, day: 0, complete: false,
            supersetNext: false, includeWarmup: false, workoutsToIncrease: 1, increaseAmmount: 5, workoutsTowardsIncrease: 0,
            barType: "", units: 0
          }
        ],
        days: [
          { id: 0, name: "Day 1" }
        ]
      },
    ],
    programCategories: [
      { id: 0, name: "All Categories" },
      { id: 1, name: "Favorites" },
      { id: 2, name: "Beginner" },
      { id: 3, name: "Bodybuilding" },
      { id: 4, name: "Conditioning" },
      { id: 5, name: "Custom" },
      { id: 6, name: "Olympic" },
      { id: 7, name: "Powerlifting" },
      { id: 8, name: "Strongman" },
    ],
    selectedProgramCategory: 0,
    setTypes: [
      { id: 0, name: "Warmup" },
      { id: 1, name: "Normal" },
      { id: 2, name: "AMRAP" },
      { id: 3, name: "Dropset" }
    ],
    selectedExerciseCategory: 0,
    selectedBodyPart: 0,
    modalSelectedExerciseCategory: 0,
    modalSelectedBodyPart: 0,
    exerciseLibrary: [
      {
        id: 1, name: "Barbell Flat Bench Press", bodyPart: 4, category: 2, favorite: true,
        repMaxes: [
          { reps: 0, weight: 0 },
          { reps: 1, weight: 200 },
          { reps: 2, weight: 0 },
          { reps: 3, weight: 0 },
          { reps: 4, weight: 0 },
          { reps: 5, weight: 0 },
          { reps: 6, weight: 0 },
          { reps: 7, weight: 0 },
          { reps: 8, weight: 0 },
          { reps: 9, weight: 0 },
          { reps: 10, weight: 0 },
          { reps: 11, weight: 0 },
          { reps: 12, weight: 0 },
          { reps: 13, weight: 0 },
          { reps: 14, weight: 0 },
          { reps: 15, weight: 0 },
          { reps: 16, weight: 0 },
          { reps: 17, weight: 0 },
          { reps: 18, weight: 0 },
          { reps: 19, weight: 0 },
          { reps: 20, weight: 0 },],
        logs: [
          {
            id: 0, date: "2018-10-16", title: "GreySkull LP - A", program: 1, day: 0, supersetNext: true, includeWarmup: false, workoutsToIncrease: 1, increaseAmmount: 5, workoutsTowardsIncrease: 0, barType: "", units: 0,
            sets: [
              { reps: 5, weight: 145, type: 1, restMinutes: 0, restSeconds: 0, timerOn: false, percentage: false, percent: 50 },
              { reps: 5, weight: 145, type: 1, restMinutes: 0, restSeconds: 0, timerOn: false, percentage: false, percent: 50 },
              { reps: 5, weight: 145, type: 1, restMinutes: 0, restSeconds: 0, timerOn: false, percentage: false, percent: 50 }
            ]
          },
          {
            id: 0, date: "2018-10-16", title: "GreySkull LP - B", program: 1, day: 1, supersetNext: true, includeWarmup: false, workoutsToIncrease: 1, increaseAmmount: 5, workoutsTowardsIncrease: 0, barType: "", units: 0,
            sets: [
              { reps: 5, weight: 145, type: 1, restMinutes: 0, restSeconds: 0, timerOn: false, percentage: false, percent: 50 },
              { reps: 5, weight: 145, type: 1, restMinutes: 0, restSeconds: 0, timerOn: false, percentage: false, percent: 50 },
              { reps: 5, weight: 145, type: 1, restMinutes: 0, restSeconds: 0, timerOn: false, percentage: false, percent: 50 }
            ]
          }
        ]
      },
      {
        id: 2, name: "Barbell Row", bodyPart: 2, category: 2, favorite: true, repMaxes: [
          { reps: 0, weight: 0 },
          { reps: 1, weight: 0 },
          { reps: 2, weight: 0 },
          { reps: 3, weight: 0 },
          { reps: 4, weight: 0 },
          { reps: 5, weight: 0 },
          { reps: 6, weight: 0 },
          { reps: 7, weight: 0 },
          { reps: 8, weight: 0 },
          { reps: 9, weight: 0 },
          { reps: 10, weight: 0 },
          { reps: 11, weight: 0 },
          { reps: 12, weight: 0 },
          { reps: 13, weight: 0 },
          { reps: 14, weight: 0 },
          { reps: 15, weight: 0 },
          { reps: 16, weight: 0 },
          { reps: 17, weight: 0 },
          { reps: 18, weight: 0 },
          { reps: 19, weight: 0 },
          { reps: 20, weight: 0 },],
        logs: [
          {
            id: 0, date: "2018-10-16", title: "GreySkull LP - A", supersetNext: true, includeWarmup: false, workoutsToIncrease: 1, increaseAmmount: 5, workoutsTowardsIncrease: 0, barType: "", units: 0,
            sets: [
              { reps: 5, weight: 150, type: 1, restMinutes: 0, restSeconds: 0, timerOn: false, percentage: false, percent: 50 },
              { reps: 5, weight: 150, type: 1, restMinutes: 0, restSeconds: 0, timerOn: false, percentage: false, percent: 50 },
              { reps: 5, weight: 150, type: 1, restMinutes: 0, restSeconds: 0, timerOn: false, percentage: false, percent: 50 }
            ]
          }
        ]
      },
      {
        id: 3, name: "Squat", bodyPart: 7, category: 2, favorite: false, repMaxes: [
          { reps: 0, weight: 0 },
          { reps: 1, weight: 0 },
          { reps: 2, weight: 0 },
          { reps: 3, weight: 0 },
          { reps: 4, weight: 0 },
          { reps: 5, weight: 0 },
          { reps: 6, weight: 0 },
          { reps: 7, weight: 0 },
          { reps: 8, weight: 0 },
          { reps: 9, weight: 0 },
          { reps: 10, weight: 0 },
          { reps: 11, weight: 0 },
          { reps: 12, weight: 0 },
          { reps: 13, weight: 0 },
          { reps: 14, weight: 0 },
          { reps: 15, weight: 0 },
          { reps: 16, weight: 0 },
          { reps: 17, weight: 0 },
          { reps: 18, weight: 0 },
          { reps: 19, weight: 0 },
          { reps: 20, weight: 0 },],
        logs: [{
          id: 0, date: "2018-10-16", title: "GreySkull LP - B", supersetNext: true, includeWarmup: false, workoutsToIncrease: 1, increaseAmmount: 5, workoutsTowardsIncrease: 0, barType: "", units: 0,
          sets: [
            { reps: 5, weight: 145, type: 1, restMinutes: 0, restSeconds: 0, timerOn: false, percentage: false, percent: 50 },
            { reps: 5, weight: 145, type: 1, restMinutes: 0, restSeconds: 0, timerOn: false, percentage: false, percent: 50 },
            { reps: 5, weight: 145, type: 1, restMinutes: 0, restSeconds: 0, timerOn: false, percentage: false, percent: 50 }
          ]
        }]},
      {
        id: 4, name: "Overhead Press", bodyPart: 8, category: 2, favorite: true, repMaxes: [
          { reps: 0, weight: 0 },
          { reps: 1, weight: 0 },
          { reps: 2, weight: 0 },
          { reps: 3, weight: 0 },
          { reps: 4, weight: 0 },
          { reps: 5, weight: 0 },
          { reps: 6, weight: 0 },
          { reps: 7, weight: 0 },
          { reps: 8, weight: 0 },
          { reps: 9, weight: 0 },
          { reps: 10, weight: 0 },
          { reps: 11, weight: 0 },
          { reps: 12, weight: 0 },
          { reps: 13, weight: 0 },
          { reps: 14, weight: 0 },
          { reps: 15, weight: 0 },
          { reps: 16, weight: 0 },
          { reps: 17, weight: 0 },
          { reps: 18, weight: 0 },
          { reps: 19, weight: 0 },
          { reps: 20, weight: 0 },],
        logs: [{
          id: 0, date: "2018-10-16", title: "GreySkull LP - B", supersetNext: true, includeWarmup: false, workoutsToIncrease: 1, increaseAmmount: 5, workoutsTowardsIncrease: 0, barType: "", units: 0,
          sets: [
            { reps: 5, weight: 145, type: 1, restMinutes: 0, restSeconds: 0, timerOn: false, percentage: false, percent: 50 },
            { reps: 5, weight: 145, type: 1, restMinutes: 0, restSeconds: 0, timerOn: false, percentage: false, percent: 50 },
            { reps: 5, weight: 145, type: 1, restMinutes: 0, restSeconds: 0, timerOn: false, percentage: false, percent: 50 }
          ]
        }]},
      {
        id: 5, name: "Pull-up", bodyPart: 2, category: 3, favorite: false, repMaxes: [
          { reps: 0, weight: 0 },
          { reps: 1, weight: 0 },
          { reps: 2, weight: 0 },
          { reps: 3, weight: 0 },
          { reps: 4, weight: 0 },
          { reps: 5, weight: 0 },
          { reps: 6, weight: 0 },
          { reps: 7, weight: 0 },
          { reps: 8, weight: 0 },
          { reps: 9, weight: 0 },
          { reps: 10, weight: 0 },
          { reps: 11, weight: 0 },
          { reps: 12, weight: 0 },
          { reps: 13, weight: 0 },
          { reps: 14, weight: 0 },
          { reps: 15, weight: 0 },
          { reps: 16, weight: 0 },
          { reps: 17, weight: 0 },
          { reps: 18, weight: 0 },
          { reps: 19, weight: 0 },
          { reps: 20, weight: 0 },],
        logs: []},
      {
        id: 6, name: "Deadlift", bodyPart: 6, category: 2, favorite: false, repMaxes: [
          { reps: 0, weight: 0 },
          { reps: 1, weight: 0 },
          { reps: 2, weight: 0 },
          { reps: 3, weight: 0 },
          { reps: 4, weight: 0 },
          { reps: 5, weight: 0 },
          { reps: 6, weight: 0 },
          { reps: 7, weight: 0 },
          { reps: 8, weight: 0 },
          { reps: 9, weight: 0 },
          { reps: 10, weight: 0 },
          { reps: 11, weight: 0 },
          { reps: 12, weight: 0 },
          { reps: 13, weight: 0 },
          { reps: 14, weight: 0 },
          { reps: 15, weight: 0 },
          { reps: 16, weight: 0 },
          { reps: 17, weight: 0 },
          { reps: 18, weight: 0 },
          { reps: 19, weight: 0 },
          { reps: 20, weight: 0 },],
        logs: []},
      {
        id: 7, name: "Chest Dip", bodyPart: 4, category: 3, favorite: true, repMaxes: [
          { reps: 0, weight: 0 },
          { reps: 1, weight: 0 },
          { reps: 2, weight: 0 },
          { reps: 3, weight: 0 },
          { reps: 4, weight: 0 },
          { reps: 5, weight: 0 },
          { reps: 6, weight: 0 },
          { reps: 7, weight: 0 },
          { reps: 8, weight: 0 },
          { reps: 9, weight: 0 },
          { reps: 10, weight: 0 },
          { reps: 11, weight: 0 },
          { reps: 12, weight: 0 },
          { reps: 13, weight: 0 },
          { reps: 14, weight: 0 },
          { reps: 15, weight: 0 },
          { reps: 16, weight: 0 },
          { reps: 17, weight: 0 },
          { reps: 18, weight: 0 },
          { reps: 19, weight: 0 },
          { reps: 20, weight: 0 },],
        logs: []},
      {
        id: 8, name: "Behind The Neck Press", bodyPart: 8, category: 2, favorite: false,
        repMaxes: [
          { reps: 0, weight: 0 },
          { reps: 1, weight: 0 },
          { reps: 2, weight: 0 },
          { reps: 3, weight: 0 },
          { reps: 4, weight: 0 },
          { reps: 5, weight: 0 },
          { reps: 6, weight: 0 },
          { reps: 7, weight: 0 },
          { reps: 8, weight: 0 },
          { reps: 9, weight: 0 },
          { reps: 10, weight: 0 },
          { reps: 11, weight: 0 },
          { reps: 12, weight: 0 },
          { reps: 13, weight: 0 },
          { reps: 14, weight: 0 },
          { reps: 15, weight: 0 },
          { reps: 16, weight: 0 },
          { reps: 17, weight: 0 },
          { reps: 18, weight: 0 },
          { reps: 19, weight: 0 },
          { reps: 20, weight: 0 },],
        logs: []},
      {
        id: 9, name: "Front Squat", bodyPart: 7, category: 2, favorite: false, repMaxes: [
          { reps: 0, weight: 0 },
          { reps: 1, weight: 0 },
          { reps: 2, weight: 0 },
          { reps: 3, weight: 0 },
          { reps: 4, weight: 0 },
          { reps: 5, weight: 0 },
          { reps: 6, weight: 0 },
          { reps: 7, weight: 0 },
          { reps: 8, weight: 0 },
          { reps: 9, weight: 0 },
          { reps: 10, weight: 0 },
          { reps: 11, weight: 0 },
          { reps: 12, weight: 0 },
          { reps: 13, weight: 0 },
          { reps: 14, weight: 0 },
          { reps: 15, weight: 0 },
          { reps: 16, weight: 0 },
          { reps: 17, weight: 0 },
          { reps: 18, weight: 0 },
          { reps: 19, weight: 0 },
          { reps: 20, weight: 0 },],
        logs: []},
    ],
    bodyParts: [
      { id: 0, name: "All Body Parts" },
      { id: 1, name: "Arms" },
      { id: 2, name: "Back" },
      { id: 3, name: "Cardio" },
      { id: 4, name: "Chest" },
      { id: 5, name: "Core" },
      { id: 6, name: "Full Body" },
      { id: 7, name: "Legs" },
      { id: 8, name: "Shoulders" },
      { id: 9, name: "Other" }
    ],
    exerciseCategories: [
      { id: 0, name: "All Categories" },
      { id: 1, name: "Assisted" },
      { id: 2, name: "Barbell" },
      { id: 3, name: "Bodyweight" },
      { id: 4, name: "Conditioning" },
      { id: 5, name: "Dumbbell" },
      { id: 6, name: "Favorites" },
      { id: 7, name: "Machine" },
      { id: 8, name: "Olympic" },
      { id: 9, name: "Other" },
      { id: 10, name: "Strongman" }
    ],
    weightUnits: 0,
    lengthUnits: 2,
    units: [
      { id: 0, name: "lbs" },
      { id: 1, name: "kgs" },
      { id: 2, name: "in" },
      { id: 3, name: "cm" },
      { id: 4, name: "%" },
      {id: 5, name: "kcal"}
    ],
    measurementCategories: [
      { id: 0, name: "All Measurements", units: 0 },
      { id: 1, name: "Bodyweight", units: 0 },
      { id: 2, name: "Body Fat Percentage", units: 4 },
      { id: 3, name: "Calories", units: 5 },
      { id: 4, name: "Neck", units: 2 },
      { id: 5, name: "Shoulders", units: 2 },
      { id: 6, name: "Chest", units: 2 },
      { id: 7, name: "Left Bicep", units: 2 },
      { id: 8, name: "Right Bicep", units: 2 },
      { id: 9, name: "Left Forearm", units: 2 },
      { id: 10, name: "Right Forearm", units: 2 },
      { id: 11, name: "Upper Abs", units: 2 },
      { id: 12, name: "Waist", units: 2 },
      { id: 13, name: "Lower Abs", units: 2 },
      { id: 14, name: "Hips", units: 2 },
      { id: 15, name: "Left Thigh", units: 2 },
      { id: 16, name: "Right Thigh", units: 2 },
      { id: 17, name: "Left Calf", units: 2 },
      { id: 18, name: "Right Calf", units: 2 },
    ],
    selectedLogDate: "2018-10-16",
    selectedWorkoutLogId: 0,
    anyLogsSelectedDate: true,
    measurementLogs: [
      {
        id: 0, date: "2018-10-16", measurements: [
          { id: 0, measurementCategory: 1, ammount: 180 },
          { id: 1, measurementCategory: 2, ammount: 20 },
          { id: 2, measurementCategory: 3, ammount: 2000 }
        ]
      }
    ],
    workoutLogs: [
      {
        id: 0, date: "2018-10-16", title: "GreySkull LP - A", notes: "Had a good workout. Made a lot of progress on bench press by tucking elbows more.", libraryExercises: [1, 2],
      },
      {
        id: 1, date: "2018-10-16", title: "GreySkull LP - B", notes: "Had a good workout again.", libraryExercises: [1, 3, 4],
      }
    ],
  }
};
