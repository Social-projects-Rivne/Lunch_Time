import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

class SearchMenuButton extends Component {
  render() {
    const { buttonName } = this.props;
    return (
      <Button>{buttonName}</Button>
    );
  }
}

SearchMenuButton.defaultProps = {
  buttonName: 'Find',
};

SearchMenuButton.propTypes = {
  buttonName: PropTypes.string,
};

export default SearchMenuButton;
