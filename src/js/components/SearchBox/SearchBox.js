import React from 'react'
import axios from 'axios'

// Components
import SearchBar from './SearchBar/SearchBar'
import Tabs from '../Tabs/Tabs'
import ResultsList from './ResultsList/ResultsList'

// Styles
import './search-box.scss'

class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    // Tab items
    this.tabItems = [
      { title: 'Tracks', type: 'track' },
      { title: 'Artists', type: 'artist' },
      { title: 'Albums', type: 'album' }
    ]

    // Init state
    this.state = {
      searchString: '',
      selectedTabIndex: 0,
      resultItems: [],
      nextUrl: '',
      isLoading: false
    }

    // Bind events
    this.handleSearch = this.handleSearch.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleShowMore = this.handleShowMore.bind(this);
  }

  // On search
  handleSearch(e) {
    this.setState({
      searchString: e
    }, () => {
      this.performSearch()
    })
  }

  // On tab change
  handleTabChange(e) {
    this.setState({
      selectedTabIndex: e
    }, () => {
      this.performSearch()
    })
  }

  // On tab change
  handleShowMore(e) {
    this.performSearch(this.state.nextUrl, true)
  }

  /**
   * Perform API call
   * @param {any} url
   * If url is provided then the function will use it
   * for making the call
   *
   * @param {boolean} [append=false]
   * If append is true it will append res to resultItems
   * the results instead of replacing it with new array
   */
  performSearch(url, append = false) {
    if (!this.state.searchString) {
      this.setState({
        resultItems: []
      })
      return false;
    }

    const q = this.state.searchString;
    const type = this.tabItems[this.state.selectedTabIndex].type
    const limit = 5
    url = url ? url : `https://api.spotify.com/v1/search?q=${q}&type=${type}&limit=${limit}`;

    this.setState({
      isLoading: true
    })

    axios.get(url)
      .then((res) => {
        const items = res.data[type + 's'].items;
        this.setState((prevState) => {
          return {
            resultItems: append ? [...prevState.resultItems, ...items] : items,
            nextUrl: res.data[type + 's'].next,
            isLoading: false
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const type = this.tabItems[this.state.selectedTabIndex].type

    const resultContent = (
      <div className="search-result__content">
        <ResultsList resultItems={this.state.resultItems}
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
        { this.state.resultItems.length > 0 && resultContent }
        { !this.state.isLoading && !this.state.resultItems.length && noResultContent }
        { this.state.isLoading && loadingContent }
      </div>
    )

    return (
      <div>
        <SearchBar onSearch={this.handleSearch} />
        {this.state.searchString && resultsBox}
      </div>
    )
  }
}

export default SearchBox;