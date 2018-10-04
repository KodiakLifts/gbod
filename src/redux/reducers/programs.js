import {
  UPDATE_PROGRAM_DATA
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
    default:
      return state;
  }
}

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
  console.log(newState);
  return newState;

};