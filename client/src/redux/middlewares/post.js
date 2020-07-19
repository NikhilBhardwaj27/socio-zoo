import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_FAILED,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILED,
  ADD_POST_REQUEST,
  ADD_COMMENT_REQUEST,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
} from "../actions/types";
import { setMessage } from "../actions/message";
import axios from "axios";

// headers config
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

// add post call
const addPostCall = async ({ type, payload }) => {
  const { formData } = payload;
  return await axios.post("/api/posts", formData, config);
};

// delete post call
const deletePostCall = async ({ type, payload }) => {
  const { id } = payload;
  return await axios.delete(`/api/posts/delete/${id}`);
};

// like call
const likeCall = async ({ type, payload }) => {
  const { id } = payload;
  return await axios.put(`/api/posts/like/${id}`);
};

// unlike call
const unLikeCall = async ({ type, payload }) => {
  const { id } = payload;
  return await axios.put(`/api/posts/unlike/${id}`);
};

// add comment call
const addCommentsCall = async ({ type, payload }) => {
  const { id, text } = payload;
  const body = { text };
  return await axios.post(`/api/posts/comment/${id}`, body, config);
};

// like post
function* likePosts(payload) {
  try {
    const res1 = yield call(likeCall, payload);
    const res = yield axios.get("/api/posts/all-posts");
    yield put({ type: GET_ALL_POSTS_SUCCESS, payload: res.data });
  } catch (err) {
    const error = err.response.data;
    if (error) {
      yield put(setMessage(error.message, "error"));
    }
  }
}

// unlike post
function* unlikePosts(payload) {
  try {
    const res1 = yield call(unLikeCall, payload);
    const res = yield axios.get("/api/posts/all-posts");
    yield put({ type: GET_ALL_POSTS_SUCCESS, payload: res.data });
  } catch (err) {
    const error = err.response.data;
    if (error) {
      yield put(setMessage(error.message, "error"));
    }
  }
}

// add post
function* addPost(payload) {
  try {
    const res = yield call(addPostCall, payload);
    yield put({ type: ADD_POST_SUCCESS, payload: res.data });
    yield put(setMessage("Post added successfully", "success"));
  } catch (err) {
    const error = err.response.data;
    if (error) {
      yield put(setMessage(error.message, "error"));
    }
    yield put({ type: ADD_POST_FAILED });
  }
}

// get posts call
function* getPosts() {
  try {
    const res = yield axios.get("/api/posts/all-posts");
    yield put({ type: GET_ALL_POSTS_SUCCESS, payload: res.data });
  } catch (err) {
    const error = err.response.data;
    if (error) {
      yield put(setMessage(error.message, "error"));
    }
    yield put({ type: GET_ALL_POSTS_FAILED });
  }
}

// delete post call
function* deletePosts(payload) {
  try {
    const res = yield call(deletePostCall, payload);
    yield put({ type: DELETE_POST_SUCCESS, payload: res.data });
    yield put(setMessage("Post deleted", "success"));
  } catch (err) {
    const error = err.response.data;
    if (error) {
      yield put(setMessage(error.message, "error"));
    }
    yield put({ type: GET_ALL_POSTS_FAILED });
  }
}

// add comment call
function* addComments(payload) {
  try {
    const result = yield call(addCommentsCall, payload);
    const res = yield axios.get("/api/posts/all-posts");
    yield put({ type: GET_ALL_POSTS_SUCCESS, payload: res.data });
  } catch (err) {
    const error = err.response.data;
    if (error) {
      yield put(setMessage(error.message, "error"));
    }
  }
}

// watcher for posts saga
export function* watcherPostSaga() {
  yield takeLatest(GET_ALL_POSTS_REQUEST, getPosts);
  yield takeLatest(ADD_POST_REQUEST, addPost);
  yield takeLatest(LIKE_POST_REQUEST, likePosts);
  yield takeLatest(ADD_COMMENT_REQUEST, addComments);
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePosts);
  yield takeLatest(DELETE_POST_REQUEST, deletePosts);
}
