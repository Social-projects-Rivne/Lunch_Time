import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Api from '../../services/api';

class CardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: [],
    };
  }

  componentDidMount() {
    const { event, isFetching } = this.props;
    if (isFetching) {
      this.getRestaurant(event.restaurantId);
    }
  }

  getRestaurant(id) {
    Api.getOne('restaurants', id)
      .then((response) => {
        if (response.error) {
          // eslint-disable-next-line no-console
          console.error(response);
          return;
        }
        this.setState({
          restaurant: response.data,
        });
      });
  }

  render() {
    const { event } = this.props;
    const { restaurant } = this.state;
    return (
      <Card className="m-2" border="dark">
        <Card.Img variant="top" src={event.image} alt="Event image" />
        <Card.Body>
          <Link to="#/"><Card.Title className="">{event.name}</Card.Title></Link>
          <Card.Subtitle className="restaurant-name mb-2">{restaurant.name}</Card.Subtitle>
          <Card.Subtitle className="event-date mb-2 text-muted">
            {moment(event.date).format('DD.MM.YYYY hh:MM')}
          </Card.Subtitle>
          <Card.Text>{event.description}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

CardView.propTypes = {
  event: PropTypes.shape([]).isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default CardView;
