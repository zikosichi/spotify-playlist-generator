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
    }
  }

  // Activate item
  handleItemActivation(item) {
    this.props.onItemHover(item)
  }

  render() {
    const noResultContent = key => (
      <div className="search-result__no-content">
        No {key} found
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
                    {!this.props.isFetching && !this.props.resultItems.getIn([key, 'items']).size && noResultContent(key)}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }
}

// Define types
ResultsList.propTypes = {
  activeItemId: PropTypes.string,
  onItemHover: PropTypes.func,
};

// Map reducer props
const mapStateToProps = state => ({
  resultItems: state.get('items'),
  isFetching: state.get('isFetching')
})

export default connect(mapStateToProps)(ResultsList)