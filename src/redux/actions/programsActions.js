export const UPDATE_PROGRAM_DATA = 'UPDATE_PROGRAM_DATA';
export const DELETE_PROGRAM = 'DELETE_PROGRAM';
export const UPDATE_SELECTED_PROGRAM_CATEGORY = 'UPDATE_SELECTED_PROGRAM_CATEGORY';

export const PROGRAMS_ACTIONS = [
  UPDATE_PROGRAM_DATA,
  DELETE_PROGRAM,
  UPDATE_SELECTED_PROGRAM_CATEGORY
];

export const updateProgramData = (programId, current, name) => {
  return {
    type: UPDATE_PROGRAM_DATA,
    programId,
    current,
    name
  };
};

export const deleteProgram = (programId) => {
  return {
    type: DELETE_PROGRAM,
    programId
  };
};

export const updateSelectedProgramCategory = (categoryId) => {
  return {
    type: UPDATE_SELECTED_PROGRAM_CATEGORY,
    categoryId
  };
};
