import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import moment from 'moment';
import Api from '../../services/api';

class CardView extends React.Component {
  render() {
    const { event } = this.props;
    const img = `${Api.apiUrl}images/events/${event.image}`;
    return (
      <Card className="text-dark m-2" border="dark">
        <Card.Img variant="top" src={img} alt="Event image" />
        <Card.Body className="">
          <Card.Title className="" style={{ color: '#3170ED' }}>{event.name.toUpperCase()}</Card.Title>
          <Card.Subtitle className="font-weight-bold mb-2">{event.restaurant.name}</Card.Subtitle>
          <Card.Subtitle className="event-date mb-2 text-muted">
            {moment(event.date).format('DD.MM.YYYY HH:mm')}
          </Card.Subtitle>
          <Card.Text>{event.description}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

CardView.propTypes = {
  event: PropTypes.shape([]).isRequired,
};

export default CardView;
