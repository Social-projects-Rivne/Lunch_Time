import React, { Component } from 'react';
import {
  Tab, Tabs, Container, Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Api from '../../services/api';
import About from './restaurant-about';
import Menu from '../menu-views/menu-view';
import '../../styles/menu.css';
import '../../styles/restaurant-item.css';
import Feedback from '../feedback/feedback';

class Restaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: {},
      isFetching: false,
    };
  }

  async componentDidMount() {
    this.getOne();
  }

  getOne() {
    const { match } = this.props;
    Api.getOne('restaurants', match.params.id)
      .then((response) => {
        if (response.error) {
          // eslint-disable-next-line no-console
          console.error(response);
          return;
        }
        this.setState({
          restaurant: response.data,
          isFetching: true,
        });
      });
  }

  render() {
    const { isFetching, restaurant } = this.state;
    const { match: { params: { id } }, isAuthenticated } = this.props;

    let newOrderLink;
    if (isAuthenticated) {
      newOrderLink = (
        <Link to={{
          pathname: `/restaurants/${id}/new-order`,
          state: {
            restaurantName: restaurant.name,
          },
        }}
        >
          <Button className="btn-inf ml-5">Make order</Button>
        </Link>
      );
    } else {
      newOrderLink = (
        <Link to={{
          pathname: '/login',
        }}
        >
          <Button className="btn-inf ml-5">Login before making order</Button>
        </Link>
      );
    }

    return (
      <Container className="restaurant-container">
        <h2>{restaurant.name}</h2>
        {newOrderLink}
        <Tabs defaultActiveKey="about">
          <Tab eventKey="about" title="About">
            <About restaurant={restaurant} isFetching={isFetching} />
          </Tab>
          <Tab eventKey="menu" title="Menu">
            <Menu id={id} name={restaurant.name} />
          </Tab>
          <Tab eventKey="events" title="Events">
            <h3>Events</h3>
          </Tab>
          <Tab eventKey="feedback" title="Feedback">
            <Feedback id={id} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

Restaurant.propTypes = {
  match: PropTypes.any.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Restaurant;
