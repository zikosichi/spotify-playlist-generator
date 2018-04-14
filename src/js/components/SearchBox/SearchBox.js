import React from 'react'
import axios from 'axios'
import AudioPlayer from '../../utils/audioPlayer'
import { connect } from 'react-redux'

// Components
import SearchBar from './SearchBar/SearchBar'
import ResultsList from './ResultsList/ResultsList'

// Actions
import { fetchDataRequest } from '../../redux/actions'

// Styles
import './search-box.scss'

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
  }

  // Perform API call if tab or searchString changes
  componentDidUpdate(props) {
    // Play/stop preview music
    if (this.props.currentlyPlayedUrl !== props.currentlyPlayedUrl) {
      if (this.props.currentlyPlayedUrl) {
        AudioPlayer.playAudio(this.props.currentlyPlayedUrl)
      } else {
        AudioPlayer.stopAudio()
      }
    }

    // Perform search
    const shouldPerformSearch =
      props.searchString !== this.props.searchString ||
      props.activeTabIndex !== this.props.activeTabIndex

    if (shouldPerformSearch && this.props.searchString) {
      this.performSearch()
    }
  }

  /**
   * @param {boolean} [append=false]
   * If append is true it will append result to
   * resultItems instead of replacing it with new array
   */
  performSearch(append = false, url) {
    const payload = {
      q: this.props.searchString,
      type: this.props.tabItems.toJS()[this.props.activeTabIndex].type,
      limit: this.props.itemsPerPage,
      nextUrl: url,
      append: append
    }

    this.props.fetchDataRequest(payload)
  }

  render() {
    const type = this.props.tabItems.toJS()[this.props.activeTabIndex].type

    const resultContent = (
      <div className="search-result__content">
        <ResultsList resultItems={this.props.resultItems}
                     />
      </div>
    )

    const resultsBox = (
      <div className="search-result">
        {resultContent}
      </div>
    )

    return (
      <div>
        <SearchBar onSearch={() => this.performSearch()} />
        {this.props.searchString && resultsBox}
      </div>
    )
  }
}

// Map reducer props
const mapStateToProps = state => ({
  resultItems: state.get('items'),
  tabItems: state.get('tabItems'),
  activeTabIndex: state.get('activeTabIndex'),
  searchString: state.get('searchString'),
  itemsPerPage: state.get('itemsPerPage'),
  nextUrl: state.get('nextUrl'),
  currentlyPlayedUrl: state.get('currentlyPlayedUrl')
})

// Map reducer methods
const mapDispatchToProps = dispatch => ({
  fetchDataRequest: (payload) => dispatch(fetchDataRequest(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox)
