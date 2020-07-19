import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILED,
  GET_PROFILES_REQUEST,
  GET_PROFILES_SUCCESS,
  GET_PROFILES_FAILED,
  CREATE_PROFILE,
  FOLLOW_REQUEST,
  UNFOLLOW_REQUEST,
} from "../actions/types";
import { setMessage } from "../actions/message";
import axios from "axios";

// headers config
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

// profile api call
const createProfileCall = async ({ type, formData }) => {
  return await axios.post("/api/profiles", formData, config);
};

// create  or update profile api call
const currentProfileCall = async ({ type, payload }) => {
  const { id } = payload;
  return await axios.get(`/api/profiles/user/${id}`);
};

// follow api call
const followProfileCall = async ({ type, id }) => {
  return await axios.put(`/api/profiles/follow/${id}`);
};

// unfollow api call
const unFollowProfileCall = async ({ type, id }) => {
  return await axios.put(`/api/profiles/unfollow/${id}`);
};

// Generator Function for getting user profile
function* userProfile(payload) {
  try {
    const res = yield call(currentProfileCall, payload);
    yield put({ type: GET_PROFILE_SUCCESS, payload: res.data });
    yield put(setMessage("Profile Loaded Successfully", "success"));
  } catch (err) {
    const error = err.response.data;
    if (error) {
      yield put(setMessage(error.message, "error"));
    }
    yield put({ type: GET_PROFILE_FAILED, payload: error.message });
  }
}

// Generator Function for getting user profile
function* usersProfile() {
  try {
    const res = yield axios.get("/api/profiles/all");
    yield put({ type: GET_PROFILES_SUCCESS, payload: res.data });
  } catch (err) {
    const error = err.response.data;
    if (error) {
      yield put(setMessage(error.message, "error"));
    }
    yield put({ type: GET_PROFILES_FAILED, payload: error.message });
  }
}

// Generator Function for getting creating or update profile
function* createProfile(formData) {
  try {
    const res = yield call(createProfileCall, formData);
    yield put({ type: GET_PROFILE_SUCCESS, payload: res.data });
    yield put(setMessage("Profile  Updated", "success"));
  } catch (err) {
    const error = err.response.data;
    if (error) {
      yield put(setMessage(error.message, "error"));
    }
    yield put({ type: GET_PROFILE_FAILED, payload: error.message });
  }
}

// Generator Function for follow
function* followProfile(payload) {
  try {
    const res = yield call(followProfileCall, payload);
    yield put({ type: GET_PROFILE_SUCCESS, payload: res.data });
    yield put(setMessage("User Followed", "success"));
  } catch (err) {
    const error = err.response.data;
    if (error) {
      yield put(setMessage("Create profile to follow unfollow", "error"));
    }
  }
}

// Generator Function for unfollow
function* unFollowProfile(payload) {
  try {
    const res = yield call(unFollowProfileCall, payload);
    yield put({ type: GET_PROFILE_SUCCESS, payload: res.data });
    yield put(setMessage("User Unfollowed", "success"));
  } catch (err) {
    const error = err.response.data;
    if (error) {
      yield put(setMessage(error.message, "error"));
    }
    yield put({ type: GET_PROFILE_FAILED, payload: error.message });
  }
}

// watcher for profile saga
export function* watcherProfileSaga() {
  yield takeEvery(GET_PROFILE_REQUEST, userProfile);
  yield takeEvery(GET_PROFILES_REQUEST, usersProfile);
  yield takeLatest(FOLLOW_REQUEST, followProfile);
  yield takeLatest(UNFOLLOW_REQUEST, unFollowProfile);
  yield takeLatest(CREATE_PROFILE, createProfile);
}
