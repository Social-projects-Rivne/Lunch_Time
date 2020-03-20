import React, { Component } from 'react';
import PropTypes from 'prop-types';
import View from './view';

class Context extends Component {
  render() {
    const { info } = this.props;
    return (
      info && info.length > 0 && info.map((e) => {
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
  info: PropTypes.array.isRequired,
};

export default Context;
