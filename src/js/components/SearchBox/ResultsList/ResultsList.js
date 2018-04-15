import React from 'react'
import PropTypes from 'prop-types'
import ResultItem from './ResultItem/ResultItem'
import { connect } from 'react-redux'
import './results-list.scss'

class ResultsList extends React.Component {
  constructor() {
    super()

    this.state = {
      currentlyPlaying: null,
    }

    this.handleItemActivation = this.handleItemActivation.bind(this)
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  // Activate item
  handleItemActivation(item) {
    this.props.onItemHover(item)
  }

  // Activate item
  handleItemClick() {
    this.props.onItemSelect()
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
                             className={item.get('id') === this.props.activeItemId ? 'results-list__item--active' : ''}
                             key={item.get('id')}
                             onClick={this.handleItemClick}
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
  onItemSelect: PropTypes.func,
};

// Define types
ResultsList.defaultProps = {
  onItemHover: () => false,
  onItemSelect: () => false,
};

// Map reducer props
const mapStateToProps = state => ({
  resultItems: state.get('items'),
  isFetching: state.get('isFetching')
})

export default connect(mapStateToProps)(ResultsList)