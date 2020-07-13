import {
  GET_PROFILE_FAILED,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  LOGOUT,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  errors: {},
  loading: false,
};

export const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: payload,
      };

    case GET_PROFILE_FAILED:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case LOGOUT:
      return {
        ...state,
        profile: null,
        profiles: [],
        errors: {},
      };
    default:
      return state;
  }
};
