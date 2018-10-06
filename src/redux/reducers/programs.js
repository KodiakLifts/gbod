import {
  UPDATE_PROGRAM_DATA,
  DELETE_PROGRAM,
  UPDATE_SELECTED_PROGRAM_CATEGORY
} from '../actions/programsActions';

export default function programs(state = {}, action) {
  switch (action.type) {
    case UPDATE_PROGRAM_DATA:
      return updateProgramData(
        state,
        action.programId,
        action.current,
        action.name,
      );
    case DELETE_PROGRAM:
      return deleteProgram(state, action.programId);
    case UPDATE_SELECTED_PROGRAM_CATEGORY:
      return updateSelectedProgramCategory(state, action.categoryId);
    default:
      return state;
  }
}

const updateSelectedProgramCategory = (state, categoryId) => {
  const newState = Object.assign({},
    state,
    {
      selectedProgramCategory: categoryId
    });
  return newState;
}

const deleteProgram = (state, programId) => {
  let activeProgram = state.activeWorkout.program;

  let newPrograms =
    state.programs.filter(program => program.id !== programId);
  newPrograms.forEach((program, index) => {
    program.id = index;
  });

  if (activeProgram === programId) {
    activeProgram = newPrograms[0].id;
  }

  const newState = Object.assign({},
    state,
    {
      activeWorkout: {
        ...state.activeWorkout,
        program: activeProgram
      },
      programs: newPrograms
    });
  return newState;
};

const updateProgramData = (state, programId, current, name) => {
  let activeProgram;
  current ?
    activeProgram = programId :
    activeProgram = state.activeWorkout.program;

  const newState = Object.assign({},
    state,
    {
      activeWorkout: {
        ...state.activeWorkout,
        program: activeProgram
      },
      programs: state.programs.map(program => {
        if (program.id === programId) {
          return {
            ...program,
            name: name
          };
        }
        return program;
      })
    });
  return newState;

};