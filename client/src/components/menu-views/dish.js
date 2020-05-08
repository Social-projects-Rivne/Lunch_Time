import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

class Dish extends Component {
  render() {
    const { dish } = this.props.dish;
    return (
      <Col className="col-item">
        {dish.name}
        <p>
          (
          {dish.ingredients}
          {' )'}
        </p>
      </Col>
    );
  }
}

Dish.propTypes = {
  dish: PropTypes.any.isRequired,
};


export default Dish;
