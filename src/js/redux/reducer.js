import { fromJS } from 'immutable'
import * as actionTypes from './actionTypes'

const initialState = fromJS({
  isFetching: false,
  items: [],
  searchString: '',
  itemsPerPage: 5,
  currentlyPlayedUrl: '',
  isFetchingUser: false,
  user: null,
  activeSearchItem: null,
  playlist: [],
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.UPDATE_FIELD_VALUE:
      const { fields, value } = action
      return state.setIn(fields, fromJS(value))

    case actionTypes.API_CALL_REQUEST:
      return state.set('isFetching', true)
                  .set('activeSearchItem', initialState.get('activeSearchItem'))

    case actionTypes.API_CALL_SUCCESS:
      return state.set('isFetching', false)
                  .set('items', fromJS(action.payload))

    case actionTypes.API_CALL_FAILURE:
      return state.set('isFetching', false)

    case actionTypes.CLEAR_SEARCH:
      return state.set('searchString', initialState.get('searchString'))
                  .set('items', initialState.get('items'))

    case actionTypes.USER_DETAILS_REQUEST:
      return state.set('isFetchingUser', true)

    case actionTypes.USER_DETAILS_SUCCESS:
      return state.set('isFetchingUser', false)
                  .set('user', fromJS(action.payload.user))

    case actionTypes.USER_DETAILS_FAILURE:
      return state.set('isFetchingUser', false)

    case actionTypes.ADD_ITEM:
      return state.updateIn(['playlist'], list => list.push( action.payload))

    case actionTypes.UPDATE_SEARCH_ACTIVE_ITEM:
      if (action.payload.type === 'MOUSE_ENTER') {
        return state.set('activeSearchItem', action.payload.item)
      }

      let flattenedItems = state.get('items').keySeq().map(key => {
        return state.get('items').getIn([key, 'items']);
      }).flatten(true)

      const currentIndex = state.get('activeSearchItem') ?
        flattenedItems.findKey(item => item === state.get('activeSearchItem')) : -1

      let nextIndex
      if (action.payload.direction === 'UP') {
        nextIndex = currentIndex <= 0 ? flattenedItems.toJS().length - 1 : currentIndex - 1
      } else {
        nextIndex = currentIndex === flattenedItems.toJS().length - 1 ? 0 : currentIndex + 1
      }

      return state.set('activeSearchItem', flattenedItems.get(nextIndex))

    default:
      return state
  }
}
