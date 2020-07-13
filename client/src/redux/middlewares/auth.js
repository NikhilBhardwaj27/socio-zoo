import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  USER_LOADED,
  USER_LOAD,
  AUTH_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from "../actions/types";
import { setMessage } from "../actions/message";
import axios from "axios";
import setToken from "../../utils/setToken";

// headers config
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

// register call
const registerCall = async ({ type, payload }) => {
  const { username, email, password } = payload;
  const body = { username, email, password };
  return await axios.post("/api/users", body, config);
};

//login call
const loginCall = async ({ type, payload }) => {
  const { email, password } = payload;
  const body = { email, password };
  return await axios.post("/api/users/login", body, config);
};

// Generator Function for user-registration
function* userRegistration(payload) {
  try {
    const res = yield call(registerCall, payload);
    yield put({ type: REGISTRATION_SUCCESS, payload: res.data });
    yield put(setMessage("Registration Successful,Login Now", "success"));
  } catch (err) {
    const error = err.response.data;
    if (error) {
      yield put(setMessage(error.message, "error"));
    }
    yield put({ type: REGISTRATION_FAILED });
  }
}

// Generator Function for user-login
function* userLogin(payload) {
  try {
    const res = yield call(loginCall, payload);
    yield put({ type: LOGIN_SUCCESS, payload: res.data });
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    yield put(setMessage("Login Successful", "success"));
    yield put({ type: USER_LOAD });
  } catch (err) {
    const error = err.response.data;
    if (error) {
      yield put(setMessage(error.message, "error"));
    }
    yield put({ type: LOGIN_FAILED });
  }
}

// User load call
function* userLoad() {
  try {
    const res = yield axios.get("/api/users/current_user");
    yield put({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    yield put({ type: AUTH_ERROR });
  }
}

// watcher for auth saga
export function* watcherAuthSaga() {
  yield takeLatest(REGISTRATION_REQUEST, userRegistration);
  yield takeLatest(LOGIN_REQUEST, userLogin);
  yield takeLatest(USER_LOAD, userLoad);
}
