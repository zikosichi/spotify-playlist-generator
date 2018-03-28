import React from 'react';
import PropTypes from 'prop-types';

// Components
import ResultAvatar from './ResultAvatar/ResultAvatar';

// Styles
import './result-item.scss';

class ResultItem extends React.Component {
  render() {
    return (
      <div className="result">
        <ResultAvatar item={this.props.item}/>
        <div className="result__content">
          <p className="result__content__sub-title">
            {this.props.item.type}
          </p>
          <h3 className="result__content__title">
            {this.props.item.name}
          </h3>
        </div>
      </div>
    )
  }
}

export default ResultItem;

ResultItem.propTypes = {
  item: PropTypes.object,
};
