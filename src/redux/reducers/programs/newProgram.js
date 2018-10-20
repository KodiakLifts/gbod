export const newProgram = (
  state,
  current,
  name,
  templateId,
  categoryId,
  description,
  favorite
) => {
  const newId = state.programs.length;
  const activeProgram = current ? newId : state.activeWorkout.program;
  const template = Object.assign({}, state.programs[templateId]);
  const newProgram = {
    id: newId,
    name: name,
    category: categoryId,
    description: description,
    favorite: favorite,
    sets: Array.from(template.sets),
    exercises: Array.from(template.exercises),
    days: Array.from(template.days)
  };

  const newState = {
    ...state,
    activeWorkout: {
      ...state.activeWorkout,
      program: activeProgram
    },
    programs: [...state.programs, newProgram]
  };
  return newState;
};
