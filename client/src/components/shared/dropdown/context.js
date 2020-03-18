import React, { Component } from 'react';
import PropTypes from 'prop-types';
import View from './view';

class Context extends Component {
  render() {
    const { data } = this.props;
    return (
      data && data.length > 0 && data.map((e) => {
        return (
          <View
            id={e.id}
            name={e.name}
            values={e.values}
            key={e.id}
          />
        );
      }));
  }
}

Context.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Context;
