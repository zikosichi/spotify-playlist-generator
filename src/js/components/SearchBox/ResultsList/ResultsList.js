import React from 'react'
import PropTypes from 'prop-types'
import ResultItem from './ResultItem/ResultItem'
import AudioPlayer from '../../../utils/audioPlayer'
import { connect } from 'react-redux'
import './results-list.scss'

class ResultsList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentlyPlaying: null
    }

    this.handleShowMore = this.handleShowMore.bind(this)
  }

  // On show more click
  handleShowMore(e) {
    this.props.onShowMore(this.props.resultItems.next)
  }

  render() {
    const loadMore = (
      <div className="show-more"
        onClick={this.handleShowMore}>
        Show More...
      </div>
    )

    return (
      <div>
        <div className="results-list">
          {this.props.resultItems.map((item) => {
            return (
              <ResultItem key={item.get('id')}
                          item={item.toJS()}/>
            )
          }
          )}
        </div>
        {this.props.showLoadMore && loadMore}
      </div>
    )
  }
}

ResultsList.propTypes = {
  onShowMore: PropTypes.func
}

// Map reducer props
const mapStateToProps = state => ({
  resultItems: state.get('items')
})

export default connect(mapStateToProps)(ResultsList)