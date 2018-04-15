import React from 'react'
import PropTypes from 'prop-types'
import ResultItem from './ResultItem/ResultItem'
import { connect } from 'react-redux'
import './results-list.scss'

class ResultsList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentlyPlaying: null,
      activeItemId: null
    }
  }

  // Activate item
  handleItemActivation(item) {
    this.setState({activeItemId: item.get('id')})
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

            {this.props.resultItems.keySeq().map(key => {
              return (
                <div className="results-list__block"
                     key={key}>
                  <div className="results-list__block__header">
                    { key }
                  </div>

                  <div className="results-list__block__content">
                    {this.props.resultItems.getIn([key, 'items']).map((item) => {
                      return(
                        <div onMouseEnter={() => this.handleItemActivation(item)}
                             className={item.get('id') === this.state.activeItemId ? 'results-list__item--active' : ''}
                             key={item.get('id')}
                             >
                          <ResultItem key={item.get('id')}
                                      item={item.toJS()}
                                      />
                        </div>
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
  isFetching: state.get('isFetching')
})

export default connect(mapStateToProps)(ResultsList)