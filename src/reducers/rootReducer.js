const initState = {
  activeWorkout: {
    id: "greySkullLP",
    day: "A",
    title: "GreySkull LP - A",
    activeExercise: 0,
    completedSets: [],
    exercises: [
      {
        id: "barbellBackSquat",
        name: "Barbell Back Squat",
        supersetNext: false,
        restTime: "3:00",
        sets: [0, 1, 2]
      },
      {
        id: "barbellBenchPress",
        name: "Barbell Bench Press",
        supersetNext: false,
        restTime: "3:00",
        sets: [3, 4, 5]
      }
    ],
    sets: [
      {
        exercise: 0, weight: 160, reps: 5, type: "N"
      },
      {
        exercise: 0, weight: 160, reps: 5, type: "N"
      },
      {
        exercise: 0, weight: 160, reps: 5, type: "F"
      },
      {
        exercise: 1, weight: 125, reps: 5, type: "N"
      },
      {
        exercise: 1, weight: 125, reps: 5, type: "N"
      },
      {
        exercise: 1, weight: 125, reps: 5, type: "F"
      }
    ]
  },
  programs: {
    greySkullLP: {
      name: "GreySkull LP",
      description: "Beginner strength program.",
      sequence: [0],
      days: [
        {
          name: "A",
          exercises: [
            {
              id: "barbellBackSquat",
              name: "Barbell Back Squat",
              supersetNext: false,
              restTime: "3:00",
              sets: [
                {
                  weight: 125,
                  reps: 5,
                  type: "N"
                },
                {
                  weight: 125,
                  reps: 5,
                  type: "N"
                },
                {
                  weight: 125,
                  reps: 5,
                  type: "F"
                }
              ]
            }
          ]
        }
      ]
    }
  },
  exercises: [],
  stats: [],
  logs: [],
  settings: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case 'SET_COMPLETE':
      return state;
    case 'SET_INCOMPLETE':
      return state;

    default:
      return state;
  }
};