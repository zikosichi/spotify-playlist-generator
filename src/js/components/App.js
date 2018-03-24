import React, { Component } from 'react'
import spotifyApi from 'utils/spotify'

// Components
import SearchBar from 'components/SearchBar/SearchBar'
import Tabs from 'components/Tabs/Tabs'

class App extends Component {
  render() {
    return (
      <div className="container">
        <SearchBar></SearchBar>
        <Tabs />
      </div>
    )
  }
}

export default App
