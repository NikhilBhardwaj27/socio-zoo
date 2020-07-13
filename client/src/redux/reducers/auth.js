import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  USER_LOADED,
  LOGOUT,
  USER_LOAD,
  AUTH_ERROR,
} from "../actions/types";

const initialState = {
  token: null,
  isAuthenticated: false,
  user: null,
  loading: false,
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: payload,
      };
    case REGISTRATION_REQUEST:
    case LOGIN_REQUEST:
    case USER_LOAD:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
        isAuthenticated: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        token: payload.token,
        loading: false,
        isAuthenticated: true,
      };
    case REGISTRATION_FAILED:
    case AUTH_ERROR:
    case LOGIN_FAILED:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        user:null,
        loading: false,
        token:null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};
