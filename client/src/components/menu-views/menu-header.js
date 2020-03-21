import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <Container className="header">
        <span>
          <h2>Restaurant name</h2>
        </span>
      </Container>
    );
  }
}

export default Header;
