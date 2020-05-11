import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Api from '../../services/api';

class CardView extends React.Component {
  getImage(event) {
    if (event && event.image && event.image.length) {
      return `${Api.apiUrl}images/events/${event.image}`;
    }
    return '/img/default-event.jpg';
  }

  render() {
    const { event, showLink } = this.props;
    const link = `/restaurants/${event.restaurant.id}`;
    return (
      <Card className="text-dark m-2" border="dark">
        <Card.Img className="event-pic" variant="top" src={this.getImage(event)} alt="Event image" />
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
