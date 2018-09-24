const initState = {
  activeWorkout: {
    id: "greySkullLP",
    day: "A",
    title: "GreySkull LP - A",
    exercises: [
      {
        id: "barbellBackSquat",
        name: "Barbell Back Squat",
        active: false,
        supersetNext: false,
        restTime: "3:00",
        sets: [
          {
            completed: false,
            weight: 125,
            reps: 5,
            type: "N"
          },
          {
            completed: false,
            weight: 125,
            reps: 5,
            type: "N"
          },
          {
            completed: false,
            weight: 125,
            reps: 5,
            type: "F"
          }
        ],
        setButtons: [

        ]
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
    default: return state;
  }
};