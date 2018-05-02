import { takeLatest, call, put, all } from "redux-saga/effects";
import axios from "axios"

// Actions
import * as actionTypes from "./actionTypes"
import * as actions from "./actions"

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield all([
    takeLatest(actionTypes.API_CALL_REQUEST, searchSaga),
    takeLatest(actionTypes.USER_DETAILS_REQUEST, userSaga),
    takeLatest(actionTypes.GET_SUGGESTIONS_REQUEST, suggestionsSaga),
    takeLatest(actionTypes.CREATE_PLAYLIST_REQUEST, createPlaylistSaga),
  ])
}

// function that makes the api request and returns a Promise for response
function fetchData({ query }) {
  return axios({
    method: "get",
    url: `https://api.spotify.com/v1/search?q=${query}&type=track,artist&limit=10`
  });
}

// worker saga: makes the api call when watcher saga sees the action
function* searchSaga(action) {
  try {
    const { data } = yield call(fetchData, action.payload)

    // dispatch a success action with items and next url
    yield put(actions.fetchDataSuccess(data))
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

// Get item suggestions
function getSuggestions(item) {
  let query = item.get('type') === 'track' ? 'seed_tracks=' : 'seed_artists='
  query += item.get('id')

  return axios({
    method: "get",
    url: `https://api.spotify.com/v1/recommendations?limit=50&${query}`
  });
}

function* suggestionsSaga(action) {
  try {
    const { data } = yield call(getSuggestions, action.payload)
    const filtered = data.tracks
                         .sort((a, b) => a.popularity > b.popularity ? -1 : 1)
                         .filter(item => !!item.preview_url)

    yield put(actions.getSuggestionsSuccess({ tracks: filtered, id: action.payload.get('id') }))
  } catch (error) {
    yield put(actions.getSuggestionsFailure(error))
  }
}

// Create playlist
function createPlaylist(userId, name) {
  return axios({
    method: "post",
    url: `https://api.spotify.com/v1/users/${userId}/playlists`,
    data: { name }
  });
}

// Add tracks to playlist
function addToPlaylist(userId, playlistId, uris) {
  return axios({
    method: "post",
    url: `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
    data: { uris }
  });
}

function* createPlaylistSaga(action) {
  console.log(action);
  try {
    const { data } = yield call(createPlaylist, action.payload.id, action.payload.name)
    const uris = action.payload.playlist.filter(item => item.type === 'track').map(item => item.uri)

    const { playlist } = yield call(addToPlaylist, action.payload.id, data.id, uris)

    yield put(actions.createPlaylistSuccess())
  } catch (error) {
    yield put(actions.createPlaylistFailure(error))
  }
}
