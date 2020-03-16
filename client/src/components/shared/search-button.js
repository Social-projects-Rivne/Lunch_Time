import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

class SearchButton extends Component {
  render() {
    const { buttonClassName, buttonName } = this.props;
    return (
      <Button className={buttonClassName}>{buttonName}</Button>
    );
  }
}

SearchButton.defaultProps = {
  buttonClassName: 'm-button',
  buttonName: 'Find',
};

SearchButton.propTypes = {
  buttonClassName: PropTypes.string,
  buttonName: PropTypes.string,
};

export default SearchButton;
