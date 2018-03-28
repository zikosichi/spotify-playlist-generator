import { fromJS } from 'immutable'
import * as actionTypes from './actionTypes'

const initialState = fromJS({
  isFetching: false,
  tabItems: [
    { title: 'Tracks', type: 'track', active: true },
    { title: 'Artists', type: 'artist' },
    { title: 'Albums', type: 'album' }
  ],
  items: [],
  searchString: ''
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
                  .set('items', fromJS(action.payload))

    case actionTypes.API_CALL_FAILURE:
      return state.set('isFetching', false)

    case actionTypes.CLEAR_SEARCH:
      return state.set('searchString', initialState.get('searchString'))
                  .set('items', initialState.get('items'))

    default:
      return state
  }
}
