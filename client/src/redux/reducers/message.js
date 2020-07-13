import { SET_MESSAGE, REMOVE_MESSAGE, LOGOUT } from "../actions/types";

const initialState = {};

export const messageReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_MESSAGE:
      return { ...state, payload };
    case REMOVE_MESSAGE:
    case LOGOUT:
      return {};
    default:
      return state;
  }
};
