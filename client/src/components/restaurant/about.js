import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../style/restaurant-about.css';
import { Container } from 'react-bootstrap';

class About extends Component {
  render() {
    const { isFetching, restaurant } = this.props;
    if (isFetching) {
      return (
        <Container>
          <p>
            Email:
            {' '}
            { restaurant.email }
          </p>
          <p>
            Description:
            {' '}
            { restaurant.description }
          </p>
          <p>
            Address:
            {' '}
            { restaurant.text_address }
          </p>
          <p>
            Website:
            {' '}
            { restaurant.website }
          </p>
          <p>
            Working hours:
            {' '}
            { restaurant.working_time }
          </p>
        </Container>
      );
    }
    return <div>Loading...</div>;
  }
}

About.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  restaurant: PropTypes.any.isRequired,
};

export default About;
