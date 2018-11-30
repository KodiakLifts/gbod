export const firebaseState = {
  workoutData: {
    uid: "",
    timer: { started: false, minutes: 0, seconds: 0, set: 0 },
    tmpActiveWorkout: {
      program: 0,
      day: 0,
      currentExercise: 0,
      dayBarActive: false,
      notes: ""
    },
    activeProgramId: 3,
    activeWorkout: {
      program: 0,
      day: 0,
      currentExercise: 0,
      dayBarActive: false,
      notes: ""
    },
    programs: [
      {
        id: 0,
        name: "Freestyle",
        category: -1,
        description: "Holds current active program.",
        favorite: false,
        sets: [],
        exercises: [],
        days: [{ id: 0, name: "Day 1" }]
      },
      {
        id: 1,
        name: "EditProgram",
        category: -1,
        description: "Holds program to edit.",
        favorite: false,
        sets: [],
        exercises: [],
        days: [{ id: 0, name: "edit" }]
      },
      {
        id: 2,
        name: "EditLog",
        category: -1,
        description: "Holds log to edit.",
        favorite: false,
        sets: [],
        exercises: [],
        days: [{ id: 0, name: "Log" }]
      },
      {
        id: 3,
        name: "Freestyle",
        category: 0,
        description: "",
        favorite: true,
        sets: [],
        exercises: [],
        days: [{ id: 0, name: "Day 1" }]
      }
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
      { id: 8, name: "Strongman" }
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
        id: 0,
        name: "",
        bodyPart: 0,
        category: 0,
        favorite: true,
        repMaxes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        logs: []
      }
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
      { id: 5, name: "kcal" }
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
      { id: 18, name: "Right Calf", units: 2 }
    ],
    selectedLogDate: "2018-01-01",
    selectedWorkoutLogId: -1,
    anyLogsSelectedDate: false,
    measurementLogs: [],
    workoutLogs: []
  }
};
