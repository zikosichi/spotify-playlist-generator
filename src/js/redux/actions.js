import * as actionTypes from './actionTypes';

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

export function clearSearch() {
  return {
    type: actionTypes.CLEAR_SEARCH
  }
}

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
