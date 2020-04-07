import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class RestaurantCardView extends Component {
  render() {
    const { restaurant } = this.props;
    const link = `/restaurants/${restaurant.id}`;
    return (
      <Card className="m-2" border="dark">
        <Link to={link}>
          <Card.Body>
            <Card.Title className="">{restaurant.name}</Card.Title>
            <Card.Subtitle className="restaurant-name mb-2">
              Hours:
              {' '}
              {restaurant.workingTime}
            </Card.Subtitle>
            <Card.Subtitle className="restaurant-name mb-2">
              Address:
              {' '}
              {restaurant.textAddress}
            </Card.Subtitle>
          </Card.Body>
        </Link>
      </Card>
    );
  }
}

RestaurantCardView.propTypes = {
  restaurant: PropTypes.object.isRequired,
};

export default RestaurantCardView;
