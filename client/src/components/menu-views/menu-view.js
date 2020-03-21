import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Header from './menu-header';
import Dish from './dish';

class Menu extends Component {
  render() {
    return (

      <Container className="menu">
        <Header />
        <Dish />
      </Container>

    );
  }
}

export default Menu;
