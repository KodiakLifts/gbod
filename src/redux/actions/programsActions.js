export const UPDATE_PROGRAM_DATA = "UPDATE_PROGRAM_DATA";
export const DELETE_PROGRAM = "DELETE_PROGRAM";
export const UPDATE_SELECTED_PROGRAM_CATEGORY =
  "UPDATE_SELECTED_PROGRAM_CATEGORY";
export const NEW_PROGRAM = "NEW_PROGRAM";

export const PROGRAMS_ACTIONS = [
  UPDATE_PROGRAM_DATA,
  DELETE_PROGRAM,
  UPDATE_SELECTED_PROGRAM_CATEGORY,
  NEW_PROGRAM
];

export const newProgram = (
  current,
  name,
  templateId,
  categoryId,
  description,
  favorite
) => {
  return {
    type: NEW_PROGRAM,
    current,
    name,
    templateId,
    categoryId,
    description,
    favorite
  };
};

export const updateProgram = (
  programId,
  current,
  name,
  categoryId,
  favorite
) => {
  return {
    type: UPDATE_PROGRAM_DATA,
    programId,
    current,
    name,
    categoryId,
    favorite
  };
};

export const deleteProgram = programId => {
  return {
    type: DELETE_PROGRAM,
    programId
  };
};

export const updateSelectedProgramCategory = categoryId => {
  return {
    type: UPDATE_SELECTED_PROGRAM_CATEGORY,
    categoryId
  };
};
