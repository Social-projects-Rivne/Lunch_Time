import React, { Component } from 'react';
import { Alert, Container, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap-pagination-logic';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Api from '../../services/api';

class OwnersRestaurants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      totalPages: 0,
      number: 0,
      pageSize: 10,
      restaurants: [],
      isFetching: false,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    this.getAll(this.state.userId, this.state.number, this.state.pageSize);
  }

  getAll(userId, page, pageSize) {
    Api.get(`restaurants/userId?userId=${userId}&page=${page}&size=${pageSize}`)
      .then((response) => {
        if (response.error) {
          // eslint-disable-next-line no-console
          console.error(response);
          return;
        }
        this.initState(response);
      });
  }

  initState(response) {
    this.setState({
      totalPages: response.data.totalPages,
      number: response.data.number,
      restaurants: response.data.content,
      isFetching: true,
    });
  }

  handlePageChange(page) {
    this.getAll(this.state.userId, page - 1, this.state.pageSize);
  }

  initRestaurantResultCard() {
    const { restaurants } = this.state;
    return (
      <Container className="card-body pl-5 pr-5">
        {restaurants.map((restaurant) => (
          <Card key={restaurant.id} className="m-2" border="dark">
            <Card.Body>
              <Link to={`/restaurants/${restaurant.id}`}>
                <Card.Title>{restaurant.name}</Card.Title>
              </Link>
              <Card.Subtitle>{restaurant.textAddress}</Card.Subtitle>
              <Link to={{
                pathname: `/restaurants/${restaurant.id}/restaurant-images-upload`,
                state: {
                  restaurantId: restaurant.id,
                },
              }}
              >
                Edit Restaurant Photos
              </Link>
            </Card.Body>
          </Card>
        ))}
      </Container>
    );
  }

  initButtonToolbar() {
    return (
      <Container className="spinner-container">
        <ButtonToolbar className="justify-content-center">
          <Spinner animation="border" variant="warning" />
        </ButtonToolbar>
      </Container>
    );
  }

  initTextNoRestaurants() {
    return (
      <Alert variant="info">
        You have no restaurants yet!
      </Alert>
    );
  }

  initPagination() {
    const { number, totalPages } = this.state;
    if (totalPages === 1) {
      return null;
    }
    return (
      <Pagination
        current_page={number + 1}
        last_page={totalPages}
        position="center"
        handlePageChange={this.handlePageChange}
      />
    );
  }

  render() {
    const { isFetching, restaurants } = this.state;
    if (isFetching) {
      if (restaurants.length === 0) {
        return (
          <Container fluid>
            {this.initTextNoRestaurants()}
          </Container>
        );
      }
      return (
        <Container fluid>
          {this.initRestaurantResultCard()}
          {this.initPagination()}
        </Container>
      );
    }
    return (
      <Container fluid>
        {this.initButtonToolbar()}
      </Container>
    );
  }
}

OwnersRestaurants.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default OwnersRestaurants;
