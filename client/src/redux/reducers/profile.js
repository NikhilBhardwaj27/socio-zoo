import {
  GET_PROFILE_FAILED,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILES_FAILED,
  GET_PROFILES_SUCCESS,
  LOGOUT,
  GET_PROFILES_REQUEST,
  FOLLOW_REQUEST,
  UNFOLLOW_REQUEST,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  errors: {},
  loading: false,
  editProfile: false,
};

export const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE_REQUEST:
    case GET_PROFILES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: payload,
        editProfile: true,
      };
    case GET_PROFILES_SUCCESS:
      return {
        ...state,
        loading: false,
        profiles: payload,
      };

    case GET_PROFILE_FAILED:
    case GET_PROFILES_FAILED:
      return {
        ...state,
        loading: false,
        profile: null,
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
