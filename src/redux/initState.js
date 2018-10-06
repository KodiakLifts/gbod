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
      program: 1,
      day: 0,
      currentExercise: 0,
    },
    programs: [
      {
        id: 0,
        name: "Blank Template",
        category: 0,
        description: "",
        sets: [
          { id: 0, exercise: 0, day: 0, weight: 0, reps: 0, type: 1, complete: false, restMinutes: 0, restSeconds: 0, timerOn: true }
        ],
        exercises: [
          {
            id: 0, libraryId: 0, day: 0, complete: false,
            supersetNext: false, includeWarmup: false, increaseRule: "",
            barType: "", units: "", note: ""
          }
        ],
        days: [
          { id: 0, name: "" }
        ]
      },
      {
        id: 1,
        name: "GreySkull LP",
        category: 1,
        description: "Beginner strength program.",
        sets: [
          {
            id: 0, exercise: 0, day: 0, weight: 125, reps: 5, type: 0, complete: false, restMinutes: 0, restSeconds: 3, timerOn: true,
            percentage: true, percent: 50
          },
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
            id: 0, libraryId: 1, day: 0, complete: false,
            supersetNext: true, includeWarmup: true, increaseRule: "",
            barType: "", units: "", note: ""
          },
          {
            id: 1, libraryId: 2, day: 0, complete: false,
            supersetNext: false, includeWarmup: false, increaseRule: "",
            barType: "", units: "", note: ""
          },
          {
            id: 2, libraryId: 3, day: 0, complete: false,
            supersetNext: false, includeWarmup: false, increaseRule: "",
            barType: "", units: "", note: ""
          },
          {
            id: 3, libraryId: 4, day: 1, complete: false,
            supersetNext: true, includeWarmup: false, increaseRule: "",
            barType: "", units: "", note: ""
          },
          {
            id: 4, libraryId: 5, day: 1, complete: false,
            supersetNext: false, includeWarmup: false, increaseRule: "",
            barType: "", units: "", note: ""
          },
          {
            id: 5, libraryId: 6, day: 1, complete: false,
            supersetNext: false, includeWarmup: false, increaseRule: "",
            barType: "", units: "", note: ""
          },
        ],
        days: [
          { id: 0, name: "A" },
          { id: 1, name: "B" },
        ]
      },
      {
        id: 2,
        name: "Starting Strength",
        category: 1,
        description: "Another beginner strength program.",
        sets: [
          { id: 0, exercise: 0, day: 0, weight: 0, reps: 0, type: 1, complete: false, restMinutes: 0, restSeconds: 0, timerOn: true }
        ],
        exercises: [
          {
            id: 0, libraryId: 0, day: 0, complete: false,
            supersetNext: false, includeWarmup: false, increaseRule: "",
            barType: "", units: "", note: ""
          }
        ],
        days: [
          { id: 0, name: "" }
        ]
      },
    ],
    programCategories: [
      { id: 0, name: "All Categories" },
      { id: 1, name: "Beginner" },
      { id: 2, name: "Bodybuilding" },
      { id: 3, name: "Conditioning" },
      { id: 4, name: "Custom" },
      { id: 5, name: "Favorites" },
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
    exerciseLibrary: [
      { id: 0, name: "", bodyPart: 0, category: 0 },
      { id: 1, name: "Bench Press", bodyPart: 4, category: 2 },
      { id: 2, name: "Barbell Row", bodyPart: 2, category: 2 },
      { id: 3, name: "Squat", bodyPart: 7, category: 2 },
      { id: 4, name: "Overhead Press", bodyPart: 8, category: 2 },
      { id: 5, name: "Pull-up", bodyPart: 2, category: 3 },
      { id: 6, name: "Deadlift", bodyPart: 6, category: 2 },
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
    ]
  }
};