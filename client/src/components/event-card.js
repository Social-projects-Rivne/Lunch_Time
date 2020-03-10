import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Object } from 'ol';

class EventCard extends React.Component {
  render() {
    const { event } = this.props;
    return (
      <Card className="eventCard m-2" border="dark">
        <Card.Img variant="top" src={event.image} alt="Event image" />
        <Card.Body>
          <Link to="#/"><Card.Title className="">{event.name}</Card.Title></Link>
          <Card.Subtitle className="restaurant-name mb-2">Restaurant Name</Card.Subtitle>
          <Card.Subtitle className="event-date mb-2 text-muted">
            {moment(event.date).format('DD.MM.YYYY hh:MM')}
          </Card.Subtitle>
          <Card.Text>{event.description}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

EventCard.propTypes = {
  event: PropTypes.instanceOf(Object).isRequired,
};

export default EventCard;
