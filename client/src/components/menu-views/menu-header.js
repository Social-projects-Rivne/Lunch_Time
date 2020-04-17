import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <Container>
        <br />
        <Row>
          <Col className="header-item">
            Category
          </Col>
          <Col className="header-item">
            Dish
            <br />
            (Ingredients)
          </Col>
          <Col className="header-item">
            Image
          </Col>
          <Col className="header-item">
            Portion size
          </Col>
          <Col className="header-item">
            Portion price
          </Col>
          <Col className="header-item">
            Add to Order
          </Col>
        </Row>
        <hr className="menu-item" />
      </Container>
    );
  }
}

export default Header;
