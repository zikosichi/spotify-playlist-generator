import * as actionTypes from './actionTypes';

/**
 * Get search items
 */
export function fetchDataRequest(payload) {
  return {
    type: actionTypes.API_CALL_REQUEST,
    payload
  }
}

export function fetchDataSuccess(payload) {
  return {
    type: actionTypes.API_CALL_SUCCESS,
    payload,
  }
}

export function fetchDataFailure(error) {
  return {
    type: actionTypes.API_CALL_FAILURE,
    error,
  }
}

/**
 * Get item suggestions
 */
export function getSuggestionsRequest(payload) {
  return {
    type: actionTypes.GET_SUGGESTIONS_REQUEST,
    payload
  }
}

export function getSuggestionsSuccess(payload) {
  return {
    type: actionTypes.GET_SUGGESTIONS_SUCCESS,
    payload,
  }
}

export function getSuggestionsFailure(error) {
  return {
    type: actionTypes.GET_SUGGESTIONS_FAILURE,
    error,
  }
}


/**
 * Fetch User details
 */
export function fetchUserRequest() {
  return {
    type: actionTypes.USER_DETAILS_REQUEST
  }
}

export function fetchUserSuccess(payload) {
  return {
    type: actionTypes.USER_DETAILS_SUCCESS,
    payload,
  }
}

export function fetchUserFailure(error) {
  return {
    type: actionTypes.USER_DETAILS_FAILURE,
    error,
  }
}

/**
 * Clear search
 */
export function clearSearch() {
  return {
    type: actionTypes.CLEAR_SEARCH
  }
}

/**
 * Select Artist
 */
export function addItem(payload) {
  return {
    type: actionTypes.ADD_ITEM,
    payload
  }
}

// This function updates provided field in the store
// With a given value. It can be used from many components
export function updateFieldValue(field, value, parent = '') {
  let fields = []
  if (parent === '') {
    fields = field.split('.')
  } else {
    fields = parent.split('.').concat(field.split('.'))
  }
  return {
    type: actionTypes.UPDATE_FIELD_VALUE,
    fields,
    value,
  }
}

/**
 * Clear search
 */
export function updateSearchActiveItem(payload) {
  return {
    type: actionTypes.UPDATE_SEARCH_ACTIVE_ITEM,
    payload
  }
}
