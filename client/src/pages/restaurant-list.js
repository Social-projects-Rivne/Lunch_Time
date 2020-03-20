import React, { Component } from 'react';
import {
  CardDeck,
  Container,
  ButtonToolbar,
  Spinner,
} from 'react-bootstrap';
import Api from '../services/api';
import RestaurantCard from '../components/restaurant-card';

export default class ListRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
    };
  }

  componentDidMount() {
    this.getAll();
  }

  getAll() {
    Api.getAll('restaurants')
      .then((response) => {
        return response.error ? this.initError(response) : this.initState(response);
      });
  }

  initError(response) {
    // eslint-disable-next-line no-console
    console.error(response);
  }

  initState(response) {
    this.setState({
      restaurants: response.data,
      isFetching: true,
    });
  }

  initCardDeck(restaurants) {
    return (
      <CardDeck className="wrapper">
        {restaurants.map((restaurant) => <RestaurantCard key={restaurant.id} props={restaurant} />)}
      </CardDeck>
    );
  }

  initSpinner() {
    return (
      <Container className="spinner-container">
        <ButtonToolbar className="justify-content-center">
          <Spinner animation="border" variant="warning" />
        </ButtonToolbar>
      </Container>
    );
  }

  render() {
    const { restaurants, isFetching } = this.state;
    return (
      <Container className="card-body pl-5 pr-5">
        {isFetching ? this.initCardDeck(restaurants) : this.initSpinner()}
      </Container>
    );
  }
}
