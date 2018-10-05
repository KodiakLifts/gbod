import {
  UPDATE_PROGRAM_DATA,
  DELETE_PROGRAM
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
    default:
      return state;
  }
}

const deleteProgram = (state, programId) => {
  let activeProgram = state.activeWorkout.program;

  let newPrograms =
    state.programs.filter(program => program.id !== programId);

  newPrograms.forEach((program, index) => {
    if (program.id === activeProgram) {
      activeProgram = index;
    }
    program.id = index;
  });

  if (activeProgram === programId) {
    activeProgram = newPrograms[0].id;
  }

  const newState = {
    ...state,
    activeWorkout: {
      ...state.activeWorkout,
      program: activeProgram
    },
    programs: newPrograms
  };
  return newState;
};

const updateProgramData = (state, programId, current, name) => {
  let activeProgram;
  current ?
    activeProgram = programId :
    activeProgram = state.activeWorkout.program;

  const newState = {
    ...state,
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
  };
  return newState;

};