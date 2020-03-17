import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropdownView from './dropdown-view';

class DropdownFactory extends Component {
  render() {
    const { data } = this.props;
    return (
      data && data.length > 0 && data.map((e) => {
        return (
          <DropdownView
            id={e.id}
            name={e.name}
            values={e.values}
            key={e.id}
          />
        );
      }));
  }
}

DropdownFactory.propTypes = {
  data: PropTypes.array.isRequired,
};

export default DropdownFactory;
