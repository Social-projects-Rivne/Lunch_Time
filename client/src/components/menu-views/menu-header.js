import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <Container>
        <Container className="header">
          <h2>Menu </h2>
        </Container>
        <br />
        <Row>
          <Col className="headers-item">
            Category
          </Col>
          <Col className="headers-item">
            Dish
            <br />
            (Ingredients)
          </Col>
          <Col className="headers-item">
            Image
          </Col>
          <Col className="headers-item">
            Portion size
          </Col>
          <Col className="headers-item">
            Portion price
          </Col>
          <Col className="headers-item">
            Add to Order
          </Col>
        </Row>
        <hr className="menu-item" />
      </Container>
    );
  }
}

export default Header;
