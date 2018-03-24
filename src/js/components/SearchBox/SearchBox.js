import React from 'react';

// Components
import SearchBar from './SearchBar/SearchBar'
import Tabs from '../Tabs/Tabs'
import ResultsList from './ResultsList/ResultsList'

// Styles
import './search-box.scss'

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const tabItems = [
      { title: 'Tracks', type: 'track' },
      { title: 'Artists', type: 'artist' },
      { title: 'Albums', type: 'album' }
    ]

    return (
      <div>
        <SearchBar></SearchBar>
        <div className="search-result">
          <div className="search-result__header">
            <Tabs tabItems={tabItems} />
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