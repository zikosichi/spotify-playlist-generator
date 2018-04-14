import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios"

// Acitons
import * as actionTypes from "./actionTypes"
import * as actions from "./actions"

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield [
    takeLatest(actionTypes.API_CALL_REQUEST, searchSaga),
    takeLatest(actionTypes.USER_DETAILS_REQUEST, userSaga)
  ]
}

// function that makes the api request and returns a Promise for response
function fetchData({ q, type, limit, append, nextUrl }) {
  return axios({
    method: "get",
    url: nextUrl ? nextUrl : `https://api.spotify.com/v1/search?q=${q}&type=${type}&limit=${limit}`
  });
}

// worker saga: makes the api call when watcher saga sees the action
function* searchSaga(action) {
  try {
    const { data } = yield call(fetchData, action.payload)
    const type = action.payload.type + 's'
    const items = data[type].items
    const nextUrl = data[type].next
    const append = action.payload.append

    // dispatch a success action with items and next url
    yield put(actions.fetchDataSuccess({ items: items, nextUrl: nextUrl, append: append }))
  } catch (error) {
    // dispatch a failure action
    yield put(actions.fetchDataFailure(error))
  }
}

// function that makes the api request and returns a Promise for response
function fetchUser() {
  return axios({
    method: "get",
    url: `https://api.spotify.com/v1/me`
  });
}

function* userSaga(action) {
  try {
    const { data } = yield call(fetchUser)
    yield put(actions.fetchUserSuccess({ user: data }))
  } catch (error) {
    yield put(actions.fetchDataFailure(error))
  }
}
