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
      selectedTabIndex: 0
    }

    // Bind events
    this.handleSearch = this.handleSearch.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  // On search
  handleSearch(e) {
    this.setState({
      searchString: e
    })
    this.performSearch()
  }

  // On tab change
  handleTabChange(e) {
    this.setState({
      selectedTabIndex: e
    })
    this.performSearch()
  }

  performSearch() {
    const q = this.state.searchString;
    const type = this.tabItems[this.state.selectedTabIndex].type

    axios.get(`https://api.spotify.com/v1/search?q=Musea&type=track`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    // axios.get(`https://api.spotify.com/v1/search?q=${q}&type=${type}`)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  render() {
    return (
      <div>
        <SearchBar onSearch={this.handleSearch} />
        <div className="search-result">
          <div className="search-result__header">
            <Tabs tabItems={this.tabItems}
              selectedIndex={this.state.selectedTabIndex}
              onTabSelect={this.handleTabChange} />
          </div>
          <div className="search-result__content">
            <ResultsList />
          </div>
        </div>

      </div>
    )
  }
}

export default SearchBox;