import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import spotifyApi from 'utils/spotify'
import initInterceptor from 'utils/interceptor'

// Components
import SearchBox from 'components/SearchBox/SearchBox'

class App extends Component {
  componentDidMount() {
    initInterceptor()
  }

  render() {
    return (
      <div className="container">
        <SearchBox></SearchBox>
      </div>
    )
  }
}

export default hot(module)(App)
