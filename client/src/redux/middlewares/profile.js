import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILED,
} from "../actions/types";
import { setMessage } from "../actions/message";
import axios from "axios";

// profile api call
const currentProfileCall = async ({ type, payload }) => {
  const { id } = payload;
  return await axios.get(`/api/profiles/user/${id}`);
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
    yield put({ type: GET_PROFILE_FAILED ,payload:error.message});
  }
}

// watcher for profile saga
export function* watcherProfileSaga() {
  yield takeLatest(GET_PROFILE_REQUEST, userProfile);
}
