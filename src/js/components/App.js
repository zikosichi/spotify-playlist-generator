import React, { Component } from 'react'
import spotifyApi from 'utils/spotify'
import { hot } from 'react-hot-loader'

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

export default hot(module)(App)
