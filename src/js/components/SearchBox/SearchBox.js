import React from 'react'
import axios from 'axios'
import AudioPlayer from '../../utils/audioPlayer'
import { connect } from 'react-redux'

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
    this.state = { activeItemId: null }

    this.handleArrowNav = this.handleArrowNav.bind(this)
    this.handleItemHover = this.handleItemHover.bind(this)
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

  // On arrow up key press
  handleArrowNav(e) {
    console.log(e);
  }

  // On arrow up key press
  handleItemHover(item) {
    this.setState({ activeItemId: item.get('id') })
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
        <ResultsList resultItems={this.props.resultItems}
                     onItemHover={this.handleItemHover}
                     activeItemId={this.state.activeItemId}
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
        <SearchInput onArrowNavChange={this.handleArrowNav}
                   />
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
