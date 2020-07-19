import {
  GET_ALL_POSTS_FAILED,
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_REQUEST,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILED,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  ADD_COMMENT_REQUEST,
  LOGOUT,
} from "../actions/types";

const initialState = {
  posts: [],
  commentsLoading: false,
  errors: null,
  loading: false,
};

export const postReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_POSTS_REQUEST:
    case ADD_POST_REQUEST:
    case DELETE_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        commentsLoading: true,
      };
    case GET_ALL_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: payload,
        commentsLoading: false,
      };

    case ADD_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [payload, ...state.posts],
      };
    case GET_ALL_POSTS_FAILED:
    case ADD_POST_FAILED:
      return {
        ...state,
        posts: null,
        loading: false,
        errors: payload,
      };

    case DELETE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post._id != payload._id),
      };
    case LOGOUT:
      return {
        ...state,
        posts: [],
        commentsLoading: false,
        errors: null,
        loading: false,
      };
    default:
      return state;
  }
};
