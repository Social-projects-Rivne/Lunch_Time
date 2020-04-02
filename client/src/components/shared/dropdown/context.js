import React, { Component } from 'react';
import PropTypes from 'prop-types';
import View from './view';

class Context extends Component {
  onSelectCategory(path) {
    this.props.onChangeEvents(path);
  }

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
              onSelect={(p) => this.onSelectCategory(`events/month/${p}`)}
            />
          );
        }));
    }
    return null;
  }
}

Context.propTypes = {
  info: PropTypes.array.isRequired,
  onChangeEvents: PropTypes.any.isRequired,
};

export default Context;
