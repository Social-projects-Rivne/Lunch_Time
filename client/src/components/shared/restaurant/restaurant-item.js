import React, { Component } from 'react';
import { Tab, Tabs, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Api from '../../../services/api';
import About from './restaurant-about';
import Feedback from '../../feedbacks/feedback';
import '../../../style/restaurant-item.css';


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
    const { match: { params: { id } } } = this.props;
    return (
      <Container className="restaurant-container">
        <h2>{restaurant.name}</h2>
        <Tabs defaultActiveKey="about">
          <Tab eventKey="about" title="About">
            <About restaurant={restaurant} isFetching={isFetching} />
          </Tab>
          <Tab eventKey="menu" title="Menu">
            <h3>Menu</h3>
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
};

export default Restaurant;
