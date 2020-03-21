import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class RestaurantCardView extends Component {
  render() {
    const { restaurant } = this.props;
    return (
      <Card className="m-2" border="dark">
        <Card.Img variant="top" src={restaurant.image} alt="Event image" />
        <Card.Body>
          <Link to="#/"><Card.Title className="">{restaurant.name}</Card.Title></Link>
          <Card.Subtitle className="restaurant-name mb-2">{restaurant.name}</Card.Subtitle>
          <Card.Text>{restaurant.description}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

RestaurantCardView.propTypes = {
  restaurant: PropTypes.object.isRequired,
};
