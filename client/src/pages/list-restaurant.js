import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class ListRestaurant extends Component {
  render() {
    return (
      <div>
        <h1>ListRestaurant Page</h1>
        <Link to="/restaurants/:id">Restaurant</Link>
      </div>
    );
  }
}

export default ListRestaurant;
