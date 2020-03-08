import React, { Component } from 'react';
import PropTypes from 'prop-types';

class About extends Component {
  render() {
    const { isFetching, restaurant } = this.props;
    if (isFetching) {
      return (
        <div>
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
        </div>
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
