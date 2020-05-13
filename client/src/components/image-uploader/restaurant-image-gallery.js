import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ButtonToolbar, Card, CardColumns, Container, Spinner,
} from 'react-bootstrap';
import Api from '../../services/api';

class RestaurantImageGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
    };
  }

  componentDidMount() {
    this.getAll(this.props.restaurantId);
  }

  getAll(id) {
    Api.get(`restaurant-images/gallery/${id}`)
      .then((response) => {
        if (response.error) {
          // eslint-disable-next-line no-console
          console.log(response);
          return;
        }
        this.setState({
          restaurantImages: response.data,
          isFetching: true,
        });
      });
  }

  initButtonToolbar() {
    return (
      <Container className="spinner-container">
        <ButtonToolbar className="justify-content-center">
          <Spinner animation="border" variant="warning" />
        </ButtonToolbar>
      </Container>
    );
  }

  render() {
    const { restaurantImages, isFetching } = this.state;
    if (isFetching) {
      return (
        <Container className="card-body pl-5 pr-5">
          <CardColumns>
            {restaurantImages.map((restaurantImage) => (
              <Card key={restaurantImage.id} className="text-dark m-2" border="dark">
                <Card.Img
                  variant="top"
                  key={restaurantImage.id}
                  src={`${Api.apiUrl}images/restaurants/${restaurantImage.image}`}
                  alt="Image"
                />
              </Card>
            ))}
          </CardColumns>
        </Container>
      );
    }
    return (
      <Container fluid>
        {this.initButtonToolbar()}
      </Container>
    );
  }
}
RestaurantImageGallery.propTypes = {
  restaurantId: PropTypes.number.isRequired,
};
export default RestaurantImageGallery;
