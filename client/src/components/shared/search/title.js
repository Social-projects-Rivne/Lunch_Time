import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Title extends Component {
  render() {
    const { title, h1ClassName } = this.props;
    return (
      <div>
        <h1 className={h1ClassName} style={{ color: '#fac564' }}>
          {title}
        </h1>
      </div>
    );
  }
}

Title.defaultProps = {
  h1ClassName: 'page-header-title',
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  h1ClassName: PropTypes.string,
};

export default Title;
