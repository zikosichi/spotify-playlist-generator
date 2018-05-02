import React from 'react'

import { connect } from 'react-redux'

class Export extends React.Component {
  render() {
    return (
      <div className="container">
        Export
      </div>
    )
  }
}

// Map reducer props
const mapStateToProps = state => ({
})

// Map reducer methods
const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Export)
