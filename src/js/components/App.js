import React, { Component } from 'react'
import spotifyApi from 'utils/spotify'

// Components
import SearchBar from 'components/SearchBar/SearchBar'

class App extends Component {
  render() {
    return (
      <div className="container">
        <SearchBar></SearchBar>
      </div>
    )
  }
}

export default App
