import React from 'react';

// Components
import SearchBar from 'components/SearchBox/SearchBar/SearchBar'
import Tabs from 'components/Tabs/Tabs'

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const tabItems = [
      { title: 'Tracks', alias: 'track' },
      { title: 'Artists', alias: 'artist' },
      { title: 'Albums', alias: 'album' }
    ]

    return (
      <div>
        <SearchBar></SearchBar>
        <Tabs tabItems={tabItems} />
      </div>
    )
  }
}

export default SearchBox;