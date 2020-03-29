import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { restaurant } = this.props;
    return (
      <Container className="header">
        <span>
          <h2>{restaurant.name}</h2>
        </span>
      </Container>
    );
  }
}

Header.propTypes = {
  restaurant: PropTypes.any.isRequired,
};

export default Header;
