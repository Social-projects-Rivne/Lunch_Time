import React from "react";
import Card from "react-bootstrap/Card";
import img from './img.svg';
import {Link} from "react-router-dom";

class EventCard extends React.Component {

  render() {
    return (
      <Card className="eventCard m-2" border="dark" >
        <Card.Img variant="top" src={img} alt="Event image"/>
        <Card.Body>
          <Link to="#/"><Card.Title className="">Event Name</Card.Title></Link>
          <Card.Subtitle className="restaurant-name mb-2">Restaurant Name</Card.Subtitle>
          <Card.Subtitle className="event-date mb-2 text-muted">23 March at 00:00</Card.Subtitle>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

export default EventCard
