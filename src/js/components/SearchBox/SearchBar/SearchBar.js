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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  // On form submit
  handleSubmit(e) {
    e.preventDefault();
    this.props.updateFieldValue('searchString', this.state.searchString)
  }

  // On search input change update
  // searchString in store
  handleChange(e) {
    this.setState({ searchString: e.target.value })
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
      <form className="d-flex search-bar"
            onSubmit={this.handleSubmit}>

        <div className="input-group search-bar__input-group">
          {loupeAddon}

          <input type="text"
                 placeholder="Search for a song, album or artist"
                 className="form-control search-bar__input"
                 value={this.state.searchString}
                 onChange={this.handleChange}/>

          {this.props.searchString && clearBtn}
        </div>

        <button type="submit"
                className="btn btn-success ml-3 search-bar__btn">
          Search
        </button>

      </form>
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