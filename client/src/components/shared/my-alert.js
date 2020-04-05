import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

class MyAlert extends Component {
  render() {
    return (
      <Alert
        variant={this.props.variant}
        style={{
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        {this.props.message}
      </Alert>
    );
  }
}

MyAlert.propTypes = {
  variant: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default MyAlert;
