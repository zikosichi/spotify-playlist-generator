import React from 'react';
import PropTypes from 'prop-types';

// Components
import ResultAvatar from './ResultAvatar/ResultAvatar';

// Styles
import './result-item.scss';

class ResultItem extends React.Component {
  render() {
    const trackArtists = (item) => {
      return item.artists.map(a => a.name).join(', ')
    }

    return (
      <div className="result">
        <ResultAvatar item={this.props.item}/>
        <div className="result__content">
          <h3 className="result__content__title">
            {this.props.item.name}
          </h3>
          <p className="result__content__sub-title">
            {this.props.item.type === 'artist' ? this.props.item.type : trackArtists(this.props.item)}
          </p>
        </div>
      </div>
    )
  }
}

export default ResultItem;

ResultItem.propTypes = {
  item: PropTypes.object,
};
