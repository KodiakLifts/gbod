export const initState = {
  activeWorkout: {
    programId: 0,
    dayId: 0,
    title: "GreySkullLP - A",
    currentExercise: 0,
    complete: false,
    sets: [
      { id: 0, exercise: 0, weight: 125, reps: 5, type: "N", complete: false },
      { id: 1, exercise: 0, weight: 125, reps: 5, type: "N", complete: false },
      { id: 2, exercise: 0, weight: 125, reps: 5, type: "F", complete: false },
      { id: 3, exercise: 1, weight: 150, reps: 5, type: "N", complete: false },
      { id: 4, exercise: 1, weight: 150, reps: 5, type: "N", complete: false },
      { id: 5, exercise: 1, weight: 150, reps: 5, type: "F", complete: false },
      { id: 6, exercise: 2, weight: 180, reps: 5, type: "N", complete: false },
      { id: 7, exercise: 2, weight: 180, reps: 5, type: "N", complete: false },
      { id: 8, exercise: 2, weight: 180, reps: 5, type: "F", complete: false },
    ],
    exercises: [
      {
        id: 0, exerciseId: 0, name: "Bench Press", complete: false,
        supersetNext: true, restTime: "3:00", includeWarmup: false, increaseRule: "",
        barType: "", units: "", note: ""
      },
      {
        id: 1, exerciseId: 1, name: "Barbell Row", complete: false,
        supersetNext: false, restTime: "3:00", includeWarmup: false, increaseRule: "",
        barType: "", units: "", note: ""
      },
      {
        id: 2, exerciseId: 2, name: "Squat", complete: false,
        supersetNext: false, restTime: "3:00", includeWarmup: false, increaseRule: "",
        barType: "", units: "", note: ""
      },
    ]
  }
};