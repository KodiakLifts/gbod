export const initState = {
  activeWorkout: { id: "greySkullLP", day: "A", title: "GreySkull LP - A", activeExercise: 0 },
  activeSets: [
    { id: 0, exercise: 0, weight: 125, reps: 5, type: "N", complete: false },
    { id: 1, exercise: 0, weight: 125, reps: 5, type: "N", complete: false },
    { id: 2, exercise: 0, weight: 125, reps: 5, type: "N", complete: false },
    { id: 3, exercise: 1, weight: 150, reps: 5, type: "N", complete: false },
    { id: 4, exercise: 1, weight: 150, reps: 5, type: "N", complete: false },
    { id: 5, exercise: 1, weight: 150, reps: 5, type: "N", complete: false },
  ],
  activeExercises: [
    {
      id: 0, exercise: "barbellBackSquat", name: "Barbell Back Squat",
      supersetNext: false, restTime: "3:00", includeWarmup: false, increaseRule: "",
      barType: "", units: "", note: ""
    },
    {
      id: 1, exercise: "barbellBenchPress", name: "Barbell Bench Press",
      supersetNext: false, restTime: "3:00", includeWarmup: false, increaseRule: "",
      barType: "", units: "", note: ""
    }
  ],
  allExercises: [],
  allPrograms: [],
  stats: [],
  logs: []
};