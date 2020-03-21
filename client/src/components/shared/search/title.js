import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Title extends Component {
  render() {
    const { title } = this.props;
    return (
      <div>
        {title}
      </div>
    );
  }
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
