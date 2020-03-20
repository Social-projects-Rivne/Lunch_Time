import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

export default class RestaurantCard extends Component {
  render() {
    const { restaurant } = this.state;
    return (
      <Card>
        <Card.Img variant="top" src={restaurant.image} />
        <Card.Body>
          <Card.Title>{restaurant.name}</Card.Title>
          <Card.Text>{restaurant.description}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
