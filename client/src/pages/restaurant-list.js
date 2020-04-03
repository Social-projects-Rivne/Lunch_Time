import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ListRestaurant extends Component {
  render() {
    const restaurantId = 7;
    const { match } = this.props;
    return (
      <div>
        <h1>ListRestaurant Page</h1>
        <Link to={`${match.path}/${restaurantId}`}>Restaurant</Link>
      </div>
    );
  }
}

ListRestaurant.propTypes = {
  match: PropTypes.any.isRequired,
};

export default ListRestaurant;
