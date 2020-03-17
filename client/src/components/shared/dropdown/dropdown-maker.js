import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropdownMenu from './dropdown-menu';

class DropdownMaker extends Component {
  render() {
    const { data } = this.props;
    const eventFilters = data.map((e) => ( // add a function and import
      <DropdownMenu
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

DropdownMaker.propTypes = {
  data: PropTypes.array.isRequired,
};

export default DropdownMaker;
