import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';

class EventCard extends React.Component {
  render() {
    const { event } = this.props;
    const link = `/restaurants/${event.restaurant.id}`;
    return (
      <Card className="text-dark m-2" border="dark">
        <Card.Img variant="top" src={event.image} alt="Event image" />
        <Card.Body className="">
          <Link to={link}><Card.Title className="">{event.name}</Card.Title></Link>
          <Card.Subtitle className="font-weight-bold mb-2">{event.restaurant.name}</Card.Subtitle>
          <Card.Subtitle className="event-date mb-2 text-muted">
            {moment(event.date).format('DD.MM.YYYY HH:MM')}
          </Card.Subtitle>
          <Card.Text>{event.description}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

EventCard.propTypes = {
  event: PropTypes.shape([]).isRequired,
};

export default EventCard;
