import React, { Component } from 'react';
import Api from '../../services/api';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: {},
    };
  }

  componentDidMount() {
    this.getAll();
  }

  getAll() {
    Api.getOne('restaurants', 1)
      .then((restaurant) => {
        this.setState({
          restaurant: restaurant,
        });
      });
  }

  render() {
    const { restaurant } = this.state;
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
}

export default About;
