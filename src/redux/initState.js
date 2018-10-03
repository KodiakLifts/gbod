export const initState = {
  workoutData:
  {
    timer: {
      started: false,
      minutes: 0,
      seconds: 0,
      set: 0
    },
    activeWorkout: {
      program: 0,
      day: 0,
      currentExercise: 0,
    },
    programs: [
      {
        id: 0,
        name: "GreySkull LP",
        category: 0,
        sets: [
          { id: 0, exercise: 0, day: 0, weight: 125, reps: 5, type: 0, complete: false, restMinutes: 0, restSeconds: 3, timerOn: true },
          { id: 1, exercise: 0, day: 0, weight: 125, reps: 5, type: 1, complete: false, restMinutes: 4, restSeconds: 0, timerOn: true },
          { id: 2, exercise: 0, day: 0, weight: 125, reps: 5, type: 2, complete: false, restMinutes: 5, restSeconds: 0, timerOn: true },
          { id: 3, exercise: 1, day: 0, weight: 150, reps: 5, type: 1, complete: false, restMinutes: 3, restSeconds: 0, timerOn: true },
          { id: 4, exercise: 1, day: 0, weight: 150, reps: 5, type: 1, complete: false, restMinutes: 3, restSeconds: 0, timerOn: true },
          { id: 5, exercise: 1, day: 0, weight: 150, reps: 5, type: 2, complete: false, restMinutes: 3, restSeconds: 0, timerOn: true },
          { id: 6, exercise: 2, day: 0, weight: 180, reps: 5, type: 1, complete: false, restMinutes: 3, restSeconds: 0, timerOn: true },
          { id: 7, exercise: 2, day: 0, weight: 180, reps: 5, type: 1, complete: false, restMinutes: 3, restSeconds: 0, timerOn: true },
          { id: 8, exercise: 2, day: 0, weight: 180, reps: 5, type: 3, complete: false, restMinutes: 3, restSeconds: 0, timerOn: true },
          { id: 9, exercise: 3, day: 1, weight: 135, reps: 5, type: 1, complete: false, restMinutes: 3, restSeconds: 0, timerOn: true },
          { id: 10, exercise: 3, day: 1, weight: 135, reps: 5, type: 1, complete: false, restMinutes: 3, restSeconds: 0, timerOn: true },
          { id: 11, exercise: 3, day: 1, weight: 135, reps: 5, type: 2, complete: false, restMinutes: 3, restSeconds: 0, timerOn: true },
          { id: 12, exercise: 4, day: 1, weight: 155, reps: 5, type: 1, complete: false, restMinutes: 3, restSeconds: 0, timerOn: true },
          { id: 13, exercise: 4, day: 1, weight: 155, reps: 5, type: 1, complete: false, restMinutes: 3, restSeconds: 0, timerOn: true },
          { id: 14, exercise: 4, day: 1, weight: 155, reps: 5, type: 2, complete: false, restMinutes: 3, restSeconds: 0, timerOn: true },
          { id: 15, exercise: 5, day: 1, weight: 195, reps: 5, type: 0, complete: false, restMinutes: 3, restSeconds: 0, timerOn: true },
          { id: 16, exercise: 5, day: 1, weight: 195, reps: 5, type: 2, complete: false, restMinutes: 3, restSeconds: 0, timerOn: true },
          { id: 17, exercise: 5, day: 1, weight: 195, reps: 5, type: 3, complete: false, restMinutes: 3, restSeconds: 0, timerOn: true },
        ],
        exercises: [
          {
            id: 0, libraryId: 0, day: 0, complete: false,
            supersetNext: true, includeWarmup: true, increaseRule: "",
            barType: "", units: "", note: ""
          },
          {
            id: 1, libraryId: 1, day: 0, complete: false,
            supersetNext: false, includeWarmup: false, increaseRule: "",
            barType: "", units: "", note: ""
          },
          {
            id: 2, libraryId: 2, day: 0, complete: false,
            supersetNext: false, includeWarmup: false, increaseRule: "",
            barType: "", units: "", note: ""
          },
          {
            id: 3, libraryId: 3, day: 1, complete: false,
            supersetNext: true, includeWarmup: false, increaseRule: "",
            barType: "", units: "", note: ""
          },
          {
            id: 4, libraryId: 4, day: 1, complete: false,
            supersetNext: false, includeWarmup: false, increaseRule: "",
            barType: "", units: "", note: ""
          },
          {
            id: 5, libraryId: 5, day: 1, complete: false,
            supersetNext: false, includeWarmup: false, increaseRule: "",
            barType: "", units: "", note: ""
          },
        ],
        days: [
          { id: 0, name: "A" },
          { id: 1, name: "B" },
        ]
      },
    ],
    setTypes: [
      { id: 0, name: "Warmup" },
      { id: 1, name: "Normal" },
      { id: 2, name: "AMRAP" },
      { id: 3, name: "Dropset" }
    ],
    exerciseLibrary: [
      { id: 0, name: "Bench Press" },
      { id: 1, name: "Barbell Row" },
      { id: 2, name: "Squat" },
      { id: 3, name: "Overhead Press" },
      { id: 4, name: "Pull-up" },
      { id: 5, name: "Deadlift" },
    ]
  }
};