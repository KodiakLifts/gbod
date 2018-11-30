export const INITIALIZE_USER_DATA = "INITIALIZE_USER_DATA";

export const USER_ACTIONS = [INITIALIZE_USER_DATA];

export const initializeUserData = data => {
  return {
    type: INITIALIZE_USER_DATA,
    data
  };
};
