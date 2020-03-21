import React, { Component } from 'react';
import PropTypes from 'prop-types';
import View from './view';

class Context extends Component {
  render() {
    const { info } = this.props;
    if (info.length > 0) {
      return (
        info.map((e) => {
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
    return null;
  }
}

Context.propTypes = {
  info: PropTypes.array.isRequired,
};

export default Context;
