import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropdownView from './dropdown-view';

class DropdownFactory extends Component {
  render() {
    const { data } = this.props;
    const eventFilters = data.map((e) => ( // add a function and import
      <DropdownView
        id={e.id}
        name={e.name}
        values={e.values}
      />
    ));
    return (
      { eventFilters }
    );
  }
}

DropdownFactory.propTypes = {
  data: PropTypes.array.isRequired,
};

export default DropdownFactory;
