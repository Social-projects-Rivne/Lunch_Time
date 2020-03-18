import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

class SearchMenuButton extends Component {
  render() {
    const { buttonClassName, buttonName } = this.props;
    return (
      <Button className={buttonClassName}>{buttonName}</Button>
    );
  }
}

SearchMenuButton.defaultProps = {
  buttonClassName: 'm-button',
  buttonName: 'Find',
};

SearchMenuButton.propTypes = {
  buttonClassName: PropTypes.string,
  buttonName: PropTypes.string,
};

export default SearchMenuButton;
