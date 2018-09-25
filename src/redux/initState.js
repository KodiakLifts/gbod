export const initState = {
  activeWorkout: {
    programId: 0, dayId: 0, title: "GreySkullLP - A", currentExercise: 0, complete: false,
    sets: [
      { id: 0, exercise: 0, weight: 125, reps: 5, type: "N", complete: false },
      { id: 1, exercise: 0, weight: 125, reps: 5, type: "N", complete: false },
      { id: 2, exercise: 0, weight: 125, reps: 5, type: "F", complete: false },
      { id: 3, exercise: 1, weight: 150, reps: 5, type: "N", complete: false },
      { id: 4, exercise: 1, weight: 150, reps: 5, type: "N", complete: false },
      { id: 5, exercise: 1, weight: 150, reps: 5, type: "F", complete: false },
    ],
    exercises: [
      {
        id: 0, exerciseId: 0, name: "Bench Press", day: 0,
        supersetNext: true, restTime: "3:00", includeWarmup: false, increaseRule: "",
        barType: "", units: "", note: ""
      },
      {
        id: 1, exerciseId: 1, name: "Barbell Row", day: 0,
        supersetNext: false, restTime: "3:00", includeWarmup: false, increaseRule: "",
        barType: "", units: "", note: ""
      },
    ]
  },
  allExercises: [],
  allPrograms: [
    {
      id: 0, name: "GreySkullLP",
      days: [
        { id: 0, name: "A", complete: false },
        { id: 1, name: "B", complete: false }
      ],
      daySequence: [0, 1],
      exercises: [
        {
          id: 0, exerciseFk: 0, name: "Bench Press", day: 0,
          supersetNext: true, restTime: "3:00", includeWarmup: false, increaseRule: "",
          barType: "", units: "", note: ""
        },
        {
          id: 1, exerciseFk: 1, name: "Barbell Row", day: 0,
          supersetNext: false, restTime: "3:00", includeWarmup: false, increaseRule: "",
          barType: "", units: "", note: ""
        },
        {
          id: 2, exerciseFk: 2, name: "Squat", day: 0,
          supersetNext: false, restTime: "3:00", includeWarmup: false, increaseRule: "",
          barType: "", units: "", note: ""
        },
        {
          id: 3, exerciseFk: 3, name: "Overhead Press", day: 1,
          supersetNext: true, restTime: "3:00", includeWarmup: false, increaseRule: "",
          barType: "", units: "", note: ""
        },
        {
          id: 4, exerciseFk: 4, name: "Pull-up", day: 1,
          supersetNext: false, restTime: "3:00", includeWarmup: false, increaseRule: "",
          barType: "", units: "", note: ""
        },
        {
          id: 5, exerciseFk: 5, name: "Deadlift", day: 1,
          supersetNext: false, restTime: "3:00", includeWarmup: false, increaseRule: "",
          barType: "", units: "", note: ""
        }
      ],
      sets: [
        { id: 0, exercise: 0, weight: 125, reps: 5, type: "N", complete: false },
        { id: 1, exercise: 0, weight: 125, reps: 5, type: "N", complete: false },
        { id: 2, exercise: 0, weight: 125, reps: 5, type: "F", complete: false },
        { id: 3, exercise: 1, weight: 150, reps: 5, type: "N", complete: false },
        { id: 4, exercise: 1, weight: 150, reps: 5, type: "N", complete: false },
        { id: 5, exercise: 1, weight: 150, reps: 5, type: "F", complete: false },
        { id: 6, exercise: 2, weight: 125, reps: 5, type: "N", complete: false },
        { id: 7, exercise: 2, weight: 125, reps: 5, type: "N", complete: false },
        { id: 8, exercise: 2, weight: 125, reps: 5, type: "F", complete: false },
        { id: 9, exercise: 3, weight: 150, reps: 5, type: "N", complete: false },
        { id: 10, exercise: 3, weight: 150, reps: 5, type: "N", complete: false },
        { id: 11, exercise: 3, weight: 150, reps: 5, type: "F", complete: false },
        { id: 12, exercise: 4, weight: 150, reps: 5, type: "N", complete: false },
        { id: 13, exercise: 4, weight: 150, reps: 5, type: "N", complete: false },
        { id: 14, exercise: 4, weight: 150, reps: 5, type: "F", complete: false },
        { id: 15, exercise: 5, weight: 150, reps: 5, type: "N", complete: false },
        { id: 16, exercise: 5, weight: 150, reps: 5, type: "N", complete: false },
        { id: 17, exercise: 5, weight: 150, reps: 5, type: "F", complete: false },
      ]
    }
  ],
  stats: [],
  logs: []
};