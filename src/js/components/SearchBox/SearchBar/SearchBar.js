import React from 'react';
import { connect } from 'react-redux'

// Assets
import searchIcon from '../../../../assets/icons/search-icon.svg';
import closeIcon from '../../../../assets/icons/close.svg';

// Actions
import { updateFieldValue, clearSearch } from '../../../redux/actions'

// Styles
import './search-bar.scss';

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { searchString: '' }

    // Bind events
    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  // On search input change update
  handleChange(e) {
    this.props.updateFieldValue('searchString', e.target.value)
  }

  // Handle input clear
  handleClear() {
    this.setState({ searchString: '' })
    this.props.clearSearch()
  }

  render() {
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
                 placeholder="Search for a song or artist"
                 className="form-control search-bar__input"
                 value={this.props.searchString}
                 onChange={this.handleChange}/>

          {this.props.searchString && clearBtn}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchString: state.get('searchString'),
  isFetching: state.get('isFetching'),
})

const mapDispatchToProps = dispatch => ({
  updateFieldValue: (field, value) => dispatch(updateFieldValue(field, value)),
  clearSearch: () => dispatch(clearSearch())
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)