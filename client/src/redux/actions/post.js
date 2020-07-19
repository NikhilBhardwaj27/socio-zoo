import {
  UNLIKE_POST_REQUEST,
  LIKE_POST_REQUEST,
  ADD_POST_REQUEST,
  DELETE_POST_REQUEST,
  ADD_COMMENT_REQUEST,
} from "./types";
import { GET_ALL_POSTS_REQUEST } from "../actions/types";

export const getAllPosts = () => {
  return {
    type: GET_ALL_POSTS_REQUEST,
  };
};

export const likePost = (id) => {
  return {
    type: LIKE_POST_REQUEST,
    payload: { id },
  };
};

export const unlikePost = (id) => {
  return {
    type: UNLIKE_POST_REQUEST,
    payload: { id },
  };
};

export const addPost = (formData) => {
  return {
    type: ADD_POST_REQUEST,
    payload: { formData },
  };
};

export const deletePost = (id) => {
  return {
    type: DELETE_POST_REQUEST,
    payload: { id },
  };
};
export const addComment = (id, text) => {
  return {
    type: ADD_COMMENT_REQUEST,
    payload: { id, text },
  };
};
