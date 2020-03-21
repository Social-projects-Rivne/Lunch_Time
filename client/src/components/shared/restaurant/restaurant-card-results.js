import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CardDeck, Container } from 'react-bootstrap';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Spinner from 'react-bootstrap/Spinner';
import RestaurantCardView from './restaurant-card-view';

export default class RestaurantCardResults extends Component {
  render() {
    const {
      isFetching, restaurants, restaurantContainerClassName,
      cardDeckClassName, spinnerContainerClassName,
      buttonToolbarClassName, spinnerAnimation, spinnerVariant,
    } = this.props;
    return (
      <Container className={restaurantContainerClassName}>
        {isFetching ? (
          <CardDeck className={cardDeckClassName}>
            {restaurants.map((restaurant) => (
              <RestaurantCardView key={restaurant.id} restaurant={restaurant} isFetching={isFetching} />
            ))}
          </CardDeck>
        ) : (
          <Container className={spinnerContainerClassName}>
            <ButtonToolbar className={buttonToolbarClassName}>
              <Spinner animation={spinnerAnimation} variant={spinnerVariant} />
            </ButtonToolbar>
          </Container>
        )}
      </Container>
    );
  }
}

RestaurantCardResults.defaultProps = {
  restaurantContainerClassName: 'card-body pl-5 pr-5',
  cardDeckClassName: 'wrapper',
  spinnerContainerClassName: 'spinner-container',
  buttonToolbarClassName: 'justify-content-center',
  spinnerAnimation: 'border',
  spinnerVariant: 'warning',
};

RestaurantCardResults.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  restaurants: PropTypes.array.isRequired,
  restaurantContainerClassName: PropTypes.string,
  cardDeckClassName: PropTypes.string,
  spinnerContainerClassName: PropTypes.string,
  buttonToolbarClassName: PropTypes.string,
  spinnerAnimation: PropTypes.string,
  spinnerVariant: PropTypes.string,
};
