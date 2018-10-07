export const deleteDay = (state, dayId) => {
  const activeProgram = state.activeWorkout.program;

  let newDays =
    state.programs[activeProgram].days.filter(day => day.id !== dayId);
  newDays.forEach((day, index) => {
    day.id = index;
  });

  let newSets = state.programs[activeProgram].sets.filter(set =>
    set.day !== dayId
  );
  newSets.forEach((set, index) => {
    set.id = index;
    if (set.day >= dayId) {
      set.day--;
    }
  });

  let newExercises =
    state.programs[activeProgram].exercises.filter(exercise =>
      exercise.day !== dayId
    );
  newExercises.forEach((exercise, index) => {
    newSets.forEach(set => {
      if (set.exercise === exercise.id) {
        set.exercise = index;
      }
    });
    exercise.id = index;
    if (exercise.day >= dayId) {
      exercise.day--;
    }
  });

  const currentDay = newDays[0].id;
  const currentExercise = newExercises[0].id;

  const newState = {
    ...state,
    activeWorkout: {
      ...state.activeWorkout,
      day: currentDay,
      currentExercise: currentExercise
    },
    programs: state.programs.map(program => {
      if (program.id === activeProgram) {
        return {
          ...program,
          days: newDays,
          exercises: newExercises,
          sets: newSets
        };
      }
      return program;
    })
  };
  return newState;
};

export const updateDayData = (state, dayId, name) => {
  const activeProgram = state.activeWorkout.program;

  const exercises = state.programs[activeProgram].exercises.filter(exercise => {
    return exercise.day === dayId;
  });

  const currentExercise = exercises[0].id;

  const newState = {
    ...state,
    timer: {
      ...state.timer,
      started: false
    },
    activeWorkout: {
      ...state.activeWorkout,
      day: dayId,
      currentExercise: currentExercise
    },
    programs: state.programs.map(program => {
      if (program.id === activeProgram) {
        return {
          ...program,
          sets: state.programs[activeProgram].sets.map(set => {
            return { ...set, complete: false };
          }),
          days: state.programs[activeProgram].days.map(day => {
            if (day.id === dayId) {
              return { ...day, name: name };
            }
            return day;
          })
        };
      }
      return program;
    })
  };
  return newState;
};