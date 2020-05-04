import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Api from '../../services/api';

class CardView extends React.Component {
  render() {
    const { event, showLink } = this.props;
    console.log(showLink);
    const img = `${Api.apiUrl}images/events/${event.image}`;
    const link = `/restaurants/${event.restaurant.id}`;
    return (
      <Card className="text-dark m-2" border="dark">
        <Card.Img variant="top" src={img} alt="Event image" />
        <Card.Body className="">
          {showLink && <Link to={link}><Card.Title className="">{event.name.toUpperCase()}</Card.Title></Link>}
          {!showLink && <Card.Title className="" style={{ color: '#1e1e1e' }}>{event.name.toUpperCase()}</Card.Title>}
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

CardView.defaultProps = {
  showLink: false,
};

CardView.propTypes = {
  event: PropTypes.shape([]).isRequired,
  showLink: PropTypes.bool,
};

export default CardView;
