import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

class Dish extends Component {
  render() {
    const { dish } = this.props.dish;
    return (
      <Row className="col-item">
        <Container>
          {dish.name}
          <br />
          <p>
            {dish.ingredients}
          </p>
        </Container>
      </Row>
    );
  }
}

Dish.propTypes = {
  dish: PropTypes.any.isRequired,
};


export default Dish;
