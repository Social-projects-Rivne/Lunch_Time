import React, { Component } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Api from '../../services/api';
import About from './about';

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
    return (
      <div>
        <h2>Title</h2>
        <Tabs defaultActiveKey="about">
          <Tab eventKey="about" title="About">
            <About restaurant={restaurant} isFetching={isFetching} />
          </Tab>
          <Tab eventKey="menu" title="Menu">
            <h2>Menu</h2>
          </Tab>
          <Tab eventKey="events" title="Events">
            <h2>Events</h2>
          </Tab>
          <Tab eventKey="feedback" title="Feedbac">
            <h2>Feedback</h2>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

Restaurant.propTypes = {
  match: PropTypes.any.isRequired,
};

export default Restaurant;
