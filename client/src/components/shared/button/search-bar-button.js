import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

class SearchBarButton extends Component {
  render() {
    const { buttonClassName, buttonName } = this.props;
    return (
      <Button className={buttonClassName}>{buttonName}</Button>
    );
  }
}

SearchBarButton.defaultProps = {
  buttonClassName: 'm-button',
  buttonName: 'Find',
};

SearchBarButton.propTypes = {
  buttonClassName: PropTypes.string,
  buttonName: PropTypes.string,
};

export default SearchBarButton;
