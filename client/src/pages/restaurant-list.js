import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Api from '../services/api';
import RestaurantCardResults from '../components/restaurant/restaurant-card-results';

class ListRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      isFetching: false,
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

  render() {
    const { restaurants, isFetching } = this.state;
    return (
      <Container fluid className="page-container p-0">
        <RestaurantCardResults restaurants={restaurants} isFetching={isFetching} />
      </Container>
    );
  }
}

export default ListRestaurant;
