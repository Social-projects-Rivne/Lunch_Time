import React, { Component } from 'react';
import { Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';

class MyBadge extends Component {
  render() {
    return (
      <Badge
        className="badge"
        variant={this.props.variant}
        style={{
          marginTop: 12,
        }}
      >
        {this.props.message}
      </Badge>
    );
  }
}

MyBadge.propTypes = {
  variant: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default MyBadge;
