export const UPDATE_PROGRAM_DATA = 'UPDATE_PROGRAM_DATA';

export const PROGRAMS_ACTIONS = [
  UPDATE_PROGRAM_DATA
];

export const updateProgramData = (programId, current, name) => {
  return {
    type: UPDATE_PROGRAM_DATA,
    programId,
    current,
    name
  };
};