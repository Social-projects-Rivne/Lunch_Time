import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import '../../styles/restaurant-about.css';
import RestaurantImageGallery from '../image-uploader/restaurant-image-gallery';

class About extends Component {
  render() {
    const { isFetching, restaurant } = this.props;
    if (isFetching) {
      return (
        <Container className="restaurant-about-container">
          <p>
            Email:
            {' '}
            { restaurant.email }
          </p>
          <p>
            Free tables:
            {' '}
            { restaurant.tables ? restaurant.tables : 'Do not have information' }
          </p>
          <p>
            Description:
            {' '}
            { restaurant.description }
          </p>
          <p>
            Address:
            {' '}
            { restaurant.textAddress }
          </p>
          <p>
            Website:
            {' '}
            { restaurant.website ? restaurant.website : 'Do not have information' }
          </p>
          <p>
            Working hours:
            {' '}
            { restaurant.workingTime }
          </p>
          <RestaurantImageGallery restaurantId={restaurant.id} />
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
