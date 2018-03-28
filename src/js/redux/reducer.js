import { fromJS } from 'immutable'
import * as actionTypes from './actionTypes'

const initialState = fromJS({
  isFetching: false,
  tabItems: [
    { title: 'Tracks', type: 'track', resultKey: 'tracks' },
    { title: 'Artists', type: 'artist', resultKey: 'artists', },
    { title: 'Albums', type: 'album', resultKey: 'albums', }
  ],
  activeTabIndex: 0,
  items: [],
  searchString: '',
  itemsPerPage: 5,
  nextUrl: ''
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
                  .set('items', fromJS(action.payload.items))
                  .set('nextUrl', fromJS(action.payload.nextUrl))

    case actionTypes.API_CALL_FAILURE:
      return state.set('isFetching', false)

    case actionTypes.CLEAR_SEARCH:
      return state.set('searchString', initialState.get('searchString'))
                  .set('items', initialState.get('items'))

    default:
      return state
  }
}
