import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import index from "../reducers/index";
import { watcherAuthSaga as authSaga } from "../middlewares/auth";
import { fork, all } from "redux-saga/effects";
import { watcherProfileSaga as profileSaga } from "../middlewares/profile";
import { watcherPostSaga as postSaga } from "../middlewares/post";

// Initial State
const initialState = {};

// Creating sagaMiddleware
const saga = createSagaMiddleware();

// Creating Store
const store = createStore(
  index,
  initialState,
  composeWithDevTools(applyMiddleware(saga))
);

// forking all sagas(non-blocking)
function* rootSaga() {
  yield all([fork(authSaga), fork(profileSaga), fork(postSaga)]);
}

// Running saga middleware
saga.run(rootSaga);

export default store;
