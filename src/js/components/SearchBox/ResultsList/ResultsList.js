import React from 'react'
import PropTypes from 'prop-types'
import ResultItem from './ResultItem/ResultItem'
import { connect } from 'react-redux'
import './results-list.scss'

import { updateSearchActiveItem, selectItem } from '../../../redux/actions'

class ResultsList extends React.Component {
  constructor() {
    super()

    this.state = {
      currentlyPlaying: null,
    }
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
                        <div onMouseEnter={() => this.props.updateSearchActiveItem({type: 'MOUSE_ENTER', item})}
                             className={item === this.props.activeSearchItem ? 'results-list__item--active' : ''}
                             onClick={() => this.props.selectItem(item)}
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
  activeSearchItem: PropTypes.object,
};

// Define types
ResultsList.defaultProps = {
  onItemHover: () => false,
  onItemSelect: () => false,
};

// Map reducer props
const mapStateToProps = state => ({
  resultItems: state.get('items'),
  isFetching: state.get('isFetching'),
  activeSearchItem: state.get('activeSearchItem'),
})

// Map reducer methods
const mapDispatchToProps = dispatch => ({
  updateSearchActiveItem: (payload) => dispatch(updateSearchActiveItem(payload)),
  selectItem: (payload) => dispatch(selectItem(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ResultsList)