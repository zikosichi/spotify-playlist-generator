import { fromJS } from 'immutable'
import * as actionTypes from './actionTypes'

const initialState = fromJS({
  isFetching: false,
  items: [],
  searchString: '',
  itemsPerPage: 5,
  isSearchListVisible: false,
  currentlyPlayedUrl: '',
  isFetchingUser: false,
  user: null,
  activeSearchItem: null,
  playlist: [],
  isGettingSuggestions: false,
  isCreatingPlaylist: false,
  playlistName: 'Generated Playlist Name',
  createdPlaylist: null,
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

      let isVisible = false;
      for (const key in action.payload) {
        if (action.payload.hasOwnProperty(key)) {
          const element = action.payload[key];
          element.items = element.items.filter(item =>
            state.get('playlist').toJS().findIndex(x => x.id === item.id) === -1
          ).slice(0, 5)
          isVisible = element.items.length > 0
        }
      }

      return state.set('isFetching', false)
                  .set('items', fromJS(action.payload))
                  .set('isSearchListVisible', isVisible)

    case actionTypes.API_CALL_FAILURE:
      return state.set('isFetching', false)


    case actionTypes.GET_SUGGESTIONS_REQUEST:
      return state.set('isGettingSuggestions', true)

    case actionTypes.GET_SUGGESTIONS_SUCCESS:

      const index = state.get('playlist').findIndex(i => i.get('id') === action.payload.id)
      const playlist = state.get('playlist').toJS()

      const filtered = action.payload.tracks.filter(item => {
        return playlist.findIndex(x => x.id === item.id) === -1;
      });

      playlist.splice(index + 1, 0, ...filtered.slice(0, 5))

      return state.set('isGettingSuggestions', false)
                  .set('playlist', fromJS(playlist))

    case actionTypes.GET_SUGGESTIONS_FAILURE:
      return state.set('isGettingSuggestions', false)

    case actionTypes.CLEAR_SEARCH:
      return state.set('searchString', initialState.get('searchString'))
                  .set('items', initialState.get('items'))
                  .set('isSearchListVisible', false)

    case actionTypes.USER_DETAILS_REQUEST:
      return state.set('isFetchingUser', true)

    case actionTypes.USER_DETAILS_SUCCESS:
      return state.set('isFetchingUser', false)
                  .set('user', fromJS(action.payload.user))

    case actionTypes.USER_DETAILS_FAILURE:
      return state.set('isFetchingUser', false)

    case actionTypes.ADD_ITEM:
      return state.updateIn(['playlist'], list => list.unshift(action.payload))

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

    case actionTypes.REMOVE_PLAYLIST_ITEM:
      return state.set('playlist', state.get('playlist').filter(item => item.get('id') !== action.payload))

    case actionTypes.CREATE_PLAYLIST_REQUEST:
      return state.set('isCreatingPlaylist', true)

    case actionTypes.CREATE_PLAYLIST_SUCCESS:
      return state.set('isCreatingPlaylist', false)
                  .set('playlistName', initialState.get('playlistName'))
                  .set('createdPlaylist', action.payload)

    case actionTypes.CREATE_PLAYLIST_FAILURE:
      return state.set('isCreatingPlaylist', false)

    default:
      return state
  }
}
