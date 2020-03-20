import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Title extends Component {
  render() {
    const { title } = this.props;
    return (
      <span>
        {title}
      </span>
    );
  }
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
