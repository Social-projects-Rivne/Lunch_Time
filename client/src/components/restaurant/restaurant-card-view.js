import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Api from '../../services/api';
import '../../styles/restaurant-card-view.css';

class RestaurantCardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantImage: {},
    };
  }

  componentDidMount() {
    this.getOne();
  }

  getOne() {
    const { restaurant } = this.props;
    Api.getOne('restaurant-images', restaurant.id)
      .then((response) => {
        if (response.error) {
          // eslint-disable-next-line no-console
          console.error(response);
          this.setState({
            restaurantImage: '/img/default-image-restaurant.jpg',
          });
          return;
        }
        if (response.data === undefined || response.data === null) {
          this.setState({
            restaurantImage: '/img/default-image-restaurant.jpg',
          });
        } else {
          this.getImage(response);
        }
      });
  }

  getImage(response) {
    Api.getImage(`images/restaurants/${response.data.image}`)
      .then((res) => {
        if (res.error == null) {
          this.setState({
            restaurantImage: `data:image/jpg;base64,${res.data}`,
          });
        }
      });
  }

  render() {
    const { restaurant } = this.props;
    const { restaurantImage } = this.state;
    const link = `/restaurants/${restaurant.id}`;
    return (
      <Card className="text-dark m-2" border="dark">
        <Card.Img variant="top" src={restaurantImage} alt="Restaurant image" />
        <Card.Body>
          <Link to={link}>
            <Card.Title>{restaurant.name}</Card.Title>
          </Link>
          <Card.Subtitle className="restaurant-name mb-2">
            Hours:
            {' '}
            {restaurant.workingTime}
          </Card.Subtitle>
          <Card.Subtitle className="restaurant-name mb-2">
            Address:
            {' '}
            {restaurant.textAddress}
          </Card.Subtitle>
        </Card.Body>
      </Card>
    );
  }
}

RestaurantCardView.propTypes = {
  restaurant: PropTypes.object.isRequired,
};

export default RestaurantCardView;
