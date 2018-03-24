import React from 'react';

// Components
import SearchBar from 'components/SearchBar/SearchBar'
import Tabs from 'components/Tabs/Tabs'

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div>
        <SearchBar></SearchBar>
        <Tabs />
      </div>
    )
  }
}

export default SearchBox;