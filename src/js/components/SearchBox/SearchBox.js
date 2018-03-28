import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

// Components
import SearchBar from './SearchBar/SearchBar'
import Tabs from '../Tabs/Tabs'
import ResultsList from './ResultsList/ResultsList'

// Actions
import { fetchDataRequest } from '../../redux/actions'

// Styles
import './search-box.scss'

class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    // Init state
    this.state = {
      searchString: '',
      selectedTabIndex: 0,
      resultItems: [],
      nextUrl: '',
      isLoading: false
    }

    // Bind events
    // this.handleTabChange = this.handleTabChange.bind(this);
    // this.handleShowMore = this.handleShowMore.bind(this);
  }

  // On tab change
  // handleTabChange(e) {
  //   this.setState({
  //     selectedTabIndex: e
  //   }, () => {
  //     this.performSearch()
  //   })
  // }

  // On show more
  // handleShowMore(e) {
  //   this.performSearch(this.state.nextUrl, true)
  // }

  /**
   * @param {boolean} [append=false]
   * If append is true it will append result to
   * resultItems instead of replacing it with new array
   */
  performSearch(append = false) {
    const payload = {
      q: this.props.searchString,
      type: this.props.tabItems.toJS()[this.props.activeTabIndex].type,
      limit: this.props.itemsPerPage,
      nextUrl: this.props.nextUrl,
      append: append
    }

    this.props.fetchDataRequest(payload)
  }

  render() {
    const type = this.props.tabItems.toJS()[this.props.activeTabIndex].type

    const resultContent = (
      <div className="search-result__content">
        <ResultsList resultItems={this.props.resultItems}
                     showLoadMore={this.state.nextUrl ? true : false}
                     onShowMore={this.handleShowMore}
                     type={type}
        />
      </div>
    )

    const noResultContent = (
      <div className="search-result__no-content">
        No results found
      </div>
    )

    const loadingContent = (
      <div className="search-result__no-content">
        Loading...
      </div>
    )

    const resultsBox = (
      <div className="search-result">
        <div className="search-result__header">
          <Tabs tabItems={this.tabItems}
            selectedIndex={this.state.selectedTabIndex}
            onTabSelect={this.handleTabChange} />
        </div>
        { this.props.resultItems.size > 0 && resultContent }
        { !this.props.isLoading && !this.props.resultItems.size && noResultContent }
        { this.props.isLoading && loadingContent }
      </div>
    )

    return (
      <div>
        <SearchBar onSearch={() => this.performSearch()} />
        {this.state.searchString && resultsBox}
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
  nextUrl: state.get('nextUrl')
})

// Map reducer methods
const mapDispatchToProps = dispatch => ({
  fetchDataRequest: (payload) => dispatch(fetchDataRequest(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox)