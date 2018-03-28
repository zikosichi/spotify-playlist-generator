import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

// Actions
import { updateFieldValue } from '../../redux/actions'

// Styles
import './tabs.scss';

class Tabs extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick(index) {
    this.props.updateFieldValue('activeTabIndex', index);
  }

  render() {
    const tabs = this.props.tabItems.map((tab, index) =>
      <li className={'tab-item' + (this.props.activeTabIndex === index  ? ' tab-item--active' : '')}
          key={tab.get('type')}
          onClick={this.handleClick.bind(this, index)}>
        {tab.get('title')}
      </li>
    );

    return (
      <ul className="tabs">
        {tabs}
      </ul>
    )
  }
}

// Map reducer props
const mapStateToProps = state => ({
  tabItems: state.get('tabItems'),
  activeTabIndex: state.get('activeTabIndex'),
})

// Map reducer methods
const mapDispatchToProps = dispatch => ({
  updateFieldValue: (field, value) => dispatch(updateFieldValue(field, value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Tabs)