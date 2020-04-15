import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

class RightSide extends Component {
  render() {
    return (
      <Container
        className="right-side"
        ref={this.props.containerRef}
        onClick={this.props.onClick}
      >
        <div className="inner-container">
          <div className="text">{this.props.current}</div>
        </div>
      </Container>
    );
  }
}

RightSide.propTypes = {
  containerRef: PropTypes.any.isRequired,
  onClick: PropTypes.any.isRequired,
  current: PropTypes.any.isRequired,
};

export default RightSide;
