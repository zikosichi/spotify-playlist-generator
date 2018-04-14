import React from 'react'
import PropTypes from 'prop-types'
import ResultItem from './ResultItem/ResultItem'
import { connect } from 'react-redux'
import './results-list.scss'

class ResultsList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentlyPlaying: null
    }
  }

  // Perform API call if tab or searchString changes
  componentDidUpdate(props) {
    console.log(this.props.resultItems.get('artists'));
  }

  render() {
    const noResultContent = (
      <div className="search-result__no-content">
        No results found
      </div>
    )

    return (
      <div>
        {this.props.resultItems.size > 0 && (
          <div className="results-list">

            {Object.keys(this.props.resultItems.toJS()).map((key) => {
              return (
                <div className="results-list__block"
                     key={key}>
                  <div className="results-list__block__header">
                    { key }
                  </div>

                  <div className="results-list__block__content">
                    {this.props.resultItems.get(key).get('items').map((item) => {
                      return(
                        <ResultItem key={item.get('id')}
                                    item={item.toJS()}/>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        )}
        {!this.props.isFetching && !this.props.resultItems.size && noResultContent}
      </div>
    )
  }
}

// Map reducer props
const mapStateToProps = state => ({
  resultItems: state.get('items'),
  nextUrl: state.get('nextUrl'),
  isFetching: state.get('isFetching')
})

export default connect(mapStateToProps)(ResultsList)