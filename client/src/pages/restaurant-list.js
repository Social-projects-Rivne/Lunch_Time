import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Pagination from 'react-bootstrap-pagination-logic';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Spinner from 'react-bootstrap/Spinner';
import PropTypes from 'prop-types';
import Api from '../services/api';
import RestaurantCardResults from '../components/restaurant/restaurant-card-results';
import '../styles/restaurant-list.css';

class RestaurantList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPages: 0,
      number: 0,
      pageSize: 9,
      restaurants: [],
      isFetching: false,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    this.getAll(this.state.number, this.state.pageSize);
  }

  getAll(page, pageSize) {
    Api.get(`restaurants?page=${page}&size=${pageSize}`)
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
    this.props.selectedTab('about');
  }

  handlePageChange(page) {
    this.getAll(page - 1, this.state.pageSize);
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
    const { isFetching } = this.state;
    if (isFetching) {
      return (
        <Container fluid className="restaurant-list-container">
          {this.initRestaurantResultCard()}
          {this.initPagination()}
        </Container>
      );
    }
    return (
      <Container fluid className="restaurant-list-container">
        {this.initButtonToolbar()}
      </Container>
    );
  }
}

RestaurantList.propTypes = {
  selectedTab: PropTypes.func.isRequired,
};

export default RestaurantList;
