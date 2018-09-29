export const initState = {
  workoutData:
  {
    activeWorkout: {
      program: 0,
      day: 0,
      currentExercise: 0,
      complete: false,
    },
    programs: [
      {
        id: 0,
        name: "GreySkull LP",
        sets: [
          { id: 0, exercise: 0, day: 0, weight: 125, reps: 5, type: "N", complete: false },
          { id: 1, exercise: 0, day: 0, weight: 125, reps: 5, type: "N", complete: false },
          { id: 2, exercise: 0, day: 0, weight: 125, reps: 5, type: "F", complete: false },
          { id: 3, exercise: 1, day: 0, weight: 150, reps: 5, type: "N", complete: false },
          { id: 4, exercise: 1, day: 0, weight: 150, reps: 5, type: "N", complete: false },
          { id: 5, exercise: 1, day: 0, weight: 150, reps: 5, type: "F", complete: false },
          { id: 6, exercise: 2, day: 0, weight: 180, reps: 5, type: "N", complete: false },
          { id: 7, exercise: 2, day: 0, weight: 180, reps: 5, type: "N", complete: false },
          { id: 8, exercise: 2, day: 0, weight: 180, reps: 5, type: "F", complete: false },
          { id: 9, exercise: 3, day: 1, weight: 135, reps: 5, type: "N", complete: false },
          { id: 10, exercise: 3, day: 1, weight: 135, reps: 5, type: "N", complete: false },
          { id: 11, exercise: 3, day: 1, weight: 135, reps: 5, type: "F", complete: false },
          { id: 12, exercise: 4, day: 1, weight: 155, reps: 5, type: "N", complete: false },
          { id: 13, exercise: 4, day: 1, weight: 155, reps: 5, type: "N", complete: false },
          { id: 14, exercise: 4, day: 1, weight: 155, reps: 5, type: "F", complete: false },
          { id: 15, exercise: 5, day: 1, weight: 195, reps: 5, type: "N", complete: false },
          { id: 16, exercise: 5, day: 1, weight: 195, reps: 5, type: "N", complete: false },
          { id: 17, exercise: 5, day: 1, weight: 195, reps: 5, type: "F", complete: false },
        ],
        exercises: [
          {
            id: 0, libraryId: 0, day: 0, complete: false,
            supersetNext: true, restTime: "3:00", includeWarmup: false, increaseRule: "",
            barType: "", units: "", note: ""
          },
          {
            id: 1, libraryId: 1, day: 0, complete: false,
            supersetNext: false, restTime: "3:00", includeWarmup: false, increaseRule: "",
            barType: "", units: "", note: ""
          },
          {
            id: 2, libraryId: 2, day: 0, complete: false,
            supersetNext: false, restTime: "3:00", includeWarmup: false, increaseRule: "",
            barType: "", units: "", note: ""
          },
          {
            id: 3, libraryId: 3, day: 1, complete: false,
            supersetNext: true, restTime: "3:00", includeWarmup: false, increaseRule: "",
            barType: "", units: "", note: ""
          },
          {
            id: 4, libraryId: 4, day: 1, complete: false,
            supersetNext: false, restTime: "3:00", includeWarmup: false, increaseRule: "",
            barType: "", units: "", note: ""
          },
          {
            id: 5, libraryId: 5, day: 1, complete: false,
            supersetNext: false, restTime: "3:00", includeWarmup: false, increaseRule: "",
            barType: "", units: "", note: ""
          },
        ],
        days: [
          { id: 0, name: "A" },
          { id: 1, name: "B" },
        ]
      },
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