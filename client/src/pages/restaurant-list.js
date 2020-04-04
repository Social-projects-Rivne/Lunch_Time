import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Pagination from 'react-bootstrap-pagination-logic';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Spinner from 'react-bootstrap/Spinner';
import Api from '../services/api';
import RestaurantCardResults from '../components/restaurant/restaurant-card-results';

class ListRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPages: 0,
      number: 0,
      restaurants: [],
      isFetching: false,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    this.getAll(this.state.number);
  }

  getAll(props) {
    Api.getAll(`restaurants?page=${props}&size=21`)
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
    this.getAll(page - 1);
  }

  initRestaurantResultCard() {
    const { restaurants } = this.state;
    return (
      <RestaurantCardResults restaurants={restaurants} />
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

  initPagination() {
    const { number, totalPages } = this.state;
    if (totalPages === 1) {
      return;
    }
    // eslint-disable-next-line consistent-return
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
    const { isFetching } = this.state;
    if (isFetching) {
      return (
        <Container fluid className="page-container p-0">
          {this.initRestaurantResultCard()}
          {this.initPagination()}
        </Container>
      );
    }
    return (
      <Container fluid className="page-container p-0">
        {this.initButtonToolbar()}
      </Container>
    );
  }
}

export default ListRestaurant;
