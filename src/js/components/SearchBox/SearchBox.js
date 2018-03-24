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
      nextUrl: ''
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
   *
   * @param {any} url
   * If url is provided then the function will use it
   * for making the call
   *
   * @param {boolean} [append=false]
   * If append is true it will append res to resultItems
   * the results instead of replacing it with new array
   */
  performSearch(url, append = false) {
    const q = this.state.searchString;
    const type = this.tabItems[this.state.selectedTabIndex].type
    const limit = 5
    url = url ? url : `https://api.spotify.com/v1/search?q=${q}&type=${type}&limit=${limit}`;

    axios.get(url)
      .then((res) => {
        const items = res.data[type + 's'].items;

        // console.log(items);

        this.setState((prevState) => {
          return {
            resultItems: append ? [...prevState.resultItems, ...items] : items,
            nextUrl: res.data[type + 's'].next
          }
        });

      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const resultsBox = (
      <div className="search-result">
        <div className="search-result__header">
          <Tabs tabItems={this.tabItems}
            selectedIndex={this.state.selectedTabIndex}
            onTabSelect={this.handleTabChange} />
        </div>
        <div className="search-result__content">
          <ResultsList resultItems={this.state.resultItems}
            showLoadMore={this.state.nextUrl.length ? true : false}
            onShowMore={this.handleShowMore}
          />
        </div>
      </div>
    )

    return (
      <div>
        <SearchBar onSearch={this.handleSearch} />
        {this.state.resultItems && resultsBox}
      </div>
    )
  }
}

export default SearchBox;