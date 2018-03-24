import React, { Component } from 'react'
import spotifyApi from 'utils/spotify'

// Components
import SearchBox from 'components/SearchBox/SearchBox'

class App extends Component {
  render() {
    return (
      <div className="container">
        <SearchBox></SearchBox>
      </div>
    )
  }
}

export default App
