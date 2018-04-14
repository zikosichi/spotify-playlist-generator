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
  nextUrl: '',
  currentlyPlayedUrl: '',
  isFetchingUser: false,
  user: null
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.UPDATE_FIELD_VALUE:
      const { fields, value } = action
      return state.setIn(fields, fromJS(value))

    case actionTypes.API_CALL_REQUEST:
      return state.set('isFetching', true)

    case actionTypes.API_CALL_SUCCESS:
      const append = action.payload.append
      const items = append ? [...state.get('items').toJS(), ...action.payload.items] : action.payload.items
      return state.set('isFetching', false)
                  .set('items', fromJS(items))
                  .set('nextUrl', fromJS(action.payload.nextUrl))

    case actionTypes.API_CALL_FAILURE:
      return state.set('isFetching', false)

    case actionTypes.CLEAR_SEARCH:
      return state.set('searchString', initialState.get('searchString'))
                  .set('items', initialState.get('items'))

    case actionTypes.USER_DETAILS_REQUEST:
      return state.set('isFetchingUser', true)

    case actionTypes.USER_DETAILS_SUCCESS:
      return state.set('isFetchingUser', 'false')
                  .set('user', fromJS(action.payload.user))

    case actionTypes.USER_DETAILS_FAILURE:
      return state.set('isFetchingUser', false)

    default:
      return state
  }
}
