import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

// Assets
import searchIcon from '../../../../assets/icons/search-icon.svg';
import closeIcon from '../../../../assets/icons/close.svg';

// Actions
import { updateFieldValue, clearSearch, updateSearchActiveItem } from '../../../redux/actions'

// Styles
import './search-input.scss';

class SearchInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { searchString: '' }

    // Bind events
    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  // On search input change update
  handleChange(e) {
    this.props.updateFieldValue('searchString', e.target.value)

    if (!e.target.value) {
      this.props.clearSearch()
    }
  }

  // If arrow keys were pressed
  handleKeyDown(e) {
    if (e.keyCode === 38) {
      e.preventDefault()
      this.props.updateSearchActiveItem({type: 'KEYBOARD', direction: 'UP'})
    }
    if (e.keyCode === 40) {
      e.preventDefault()
      this.props.updateSearchActiveItem({type: 'KEYBOARD', direction: 'DOWN'})
    }
    if (e.keyCode === 27) {
      this.props.clearSearch()
    }
  }

  // Handle input clear
  handleClear() {
    this.setState({ searchString: '' })
    this.props.clearSearch()
  }

  render() {
    const placeholder = this.props.playlist.size > 0 ?
      'Add more songs or artists' :
      'Search for a song or artist'

    const loupeAddon = (
      <div className="input-group-prepend">
        <span className="input-group-text">
          {
            this.props.isFetching ?
              <i className="fa fa-spinner fa-spin"></i> :
              <img src={searchIcon} />
          }
        </span>
      </div>
    )

    const clearBtn = (
      <div className="input-group-append search-bar__clear"
           onClick={this.handleClear}>
        <span className="input-group-text">
          <img src={closeIcon}
            className="search-bar__clear__img" />
        </span>
      </div>
    )

    return (
      <div className="d-flex search-bar">
        <div className="input-group search-bar__input-group">
          {loupeAddon}

          <input type="text"
                 placeholder={placeholder}
                 className="form-control search-bar__input"
                 value={this.props.searchString}
                 onChange={this.handleChange}
                 onKeyDown={this.handleKeyDown}
                 />

          {this.props.searchString && clearBtn}
        </div>
      </div>
    );
  }
}

// Define types
SearchInput.propTypes = {
  updateSearchActiveItem: PropTypes.func,
  updateFieldValue: PropTypes.func,
  clearSearch: PropTypes.func,
};

const mapStateToProps = state => ({
  searchString: state.get('searchString'),
  isFetching: state.get('isFetching'),
  playlist: state.get('playlist'),
})

const mapDispatchToProps = dispatch => ({
  updateSearchActiveItem: (payload) => dispatch(updateSearchActiveItem(payload)),
  updateFieldValue: (field, value) => dispatch(updateFieldValue(field, value)),
  clearSearch: () => dispatch(clearSearch()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput)