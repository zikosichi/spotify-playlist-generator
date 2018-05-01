import React from 'react'
import axios from 'axios'
import AudioPlayer from '../../utils/audioPlayer'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'

// Components
import SearchInput from './SearchInput/SearchInput'
import ResultsList from './ResultsList/ResultsList'

// Actions
import { fetchDataRequest } from '../../redux/actions'

// Styles
import './search-box.scss'

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
  }

  // Perform API call if searchString changes
  componentWillReceiveProps(nextProps) {
    // Play/stop preview music
    if (this.props.currentlyPlayedUrl !== nextProps.currentlyPlayedUrl) {
      if (nextProps.currentlyPlayedUrl) {
        AudioPlayer.playAudio(nextProps.currentlyPlayedUrl)
      } else {
        AudioPlayer.stopAudio()
      }
    }

    // Perform search
    const shouldPerformSearch =
      nextProps.searchString !== this.props.searchString

    if (shouldPerformSearch && nextProps.searchString) {
      this.performSearch(nextProps.searchString)
    }
  }

  // Perform search
  performSearch(query) {
    const payload = {
      q: query,
      limit: this.props.itemsPerPage,
    }

    this.props.fetchDataRequest(payload)
  }

  render() {
    const resultContent = (
      <div className="search-result__content">
        <ResultsList />
      </div>
    )

    const resultsBox = (
      <div className="search-result">
        {resultContent}
      </div>
    )

    return (
      <div>
        <SearchInput />
        {this.props.searchString && resultsBox}
      </div>
    )
  }
}

// Map reducer props
const mapStateToProps = state => ({
  resultItems: state.get('items'),
  searchString: state.get('searchString'),
  itemsPerPage: state.get('itemsPerPage'),
  currentlyPlayedUrl: state.get('currentlyPlayedUrl')
})

// Map reducer methods
const mapDispatchToProps = dispatch => ({
  fetchDataRequest: (payload) => dispatch(fetchDataRequest(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox)
