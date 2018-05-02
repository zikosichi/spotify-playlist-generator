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
import { updateFieldValue, fetchDataRequest } from '../../redux/actions'

// Styles
import './search-box.scss'

class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.node = React.createRef();
    this.handleClick = this.handleClick.bind(this)
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

  // On component mount
  componentWillMount() {
    document.addEventListener('click', this.handleClick, false)
  }

  // On component unmount
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false)
  }

  // Hide results list on outside click
  handleClick(e) {
    if (!this.node.current.contains(e.target)) {
      this.props.updateFieldValue('isSearchListVisible', false)
    } else if (this.props.resultItems.size) {
      this.props.updateFieldValue('isSearchListVisible', true)
    }
  }

  // Perform search
  performSearch(query) {
    this.props.fetchDataRequest({query})
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
      <div ref={this.node}>
        <SearchInput />
        {this.props.isSearchListVisible}
        {this.props.isSearchListVisible && resultsBox}
      </div>
    )
  }
}

// Map reducer props
const mapStateToProps = state => ({
  resultItems: state.get('items'),
  searchString: state.get('searchString'),
  itemsPerPage: state.get('itemsPerPage'),
  currentlyPlayedUrl: state.get('currentlyPlayedUrl'),
  isSearchListVisible: state.get('isSearchListVisible'),
})

// Map reducer methods
const mapDispatchToProps = dispatch => ({
  fetchDataRequest: (payload) => dispatch(fetchDataRequest(payload)),
  updateFieldValue: (field, value) => dispatch(updateFieldValue(field, value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox)
