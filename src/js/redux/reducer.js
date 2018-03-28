import { fromJS } from 'immutable'
import * as actionTypes from './actionTypes'

const initialState = fromJS({
  isFetching: false,
  tabItems: [
    { title: 'Tracks', type: 'track', active: true },
    { title: 'Artists', type: 'artist' },
    { title: 'Albums', type: 'album' }
  ],
  items: []
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_FIELD_VALUE:
      const { fields, value } = action
      return state.setIn(fields, fromJS(value))
    case actionTypes.API_CALL_REQUEST:
      return state.set('isFetching', true)
    case actionTypes.API_CALL_SUCCESS:
      return state.set('isFetching', false)
    case actionTypes.API_CALL_FAILURE:
      return state.set('isFetching', false)
    default:
      return state
  }
}
