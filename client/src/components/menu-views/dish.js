import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

class Dish extends Component {
  render() {
    const { dish } = this.props.dish;
    return (
      <Row className="col-item">
        {dish.name}
        <br />
        {dish.ingredients}
      </Row>
    );
  }
}

Dish.propTypes = {
  dish: PropTypes.any.isRequired,
};


export default Dish;
