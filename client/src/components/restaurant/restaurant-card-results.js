import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CardDeck, Container } from 'react-bootstrap';
import RestaurantCardView from './restaurant-card-view';

class RestaurantCardResults extends Component {
  initRestaurantsCards() {
    const { cardDeckClassName, restaurants } = this.props;
    return (
      <CardDeck className={cardDeckClassName}>
        {restaurants.map((restaurant) => (
          <RestaurantCardView key={restaurant.id} restaurant={restaurant} />
        ))}
      </CardDeck>
    );
  }

  render() {
    const { restaurantContainerClassName } = this.props;
    return (
      <Container className={restaurantContainerClassName}>
        {this.initRestaurantsCards()}
      </Container>
    );
  }
}

RestaurantCardResults.defaultProps = {
  restaurantContainerClassName: 'card-body pl-5 pr-5',
  cardDeckClassName: 'wrapper',
};

RestaurantCardResults.propTypes = {
  restaurants: PropTypes.array.isRequired,
  restaurantContainerClassName: PropTypes.string,
  cardDeckClassName: PropTypes.string,
};

export default RestaurantCardResults;
