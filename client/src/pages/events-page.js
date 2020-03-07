import React from 'react';
import '../style/events-page.css';
import '../style/dropdown.css';
import '../style/m-button.css';
import { CardDeck, Container, Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import * as uuid from 'uuid';
import EventCard from '../components/event-card';
import 'react-datepicker/dist/react-datepicker.css';
import LocalSearch from '../components/local-search';
import DropdownGroup from '../components/dropdown-group';

class EventsPage extends React.Component {
  render() {
    const eventsList = [<EventCard />, <EventCard />, <EventCard />, <EventCard />,
      <EventCard />, <EventCard />, <EventCard />];

    return (
      <Container fluid className="page-container p-0">

        <Container fluid className="page-header">
          <h1 className="page-header-title">
            {' '}
            All events and activities in restaurants,
            <br />
            {' '}
            cafes and bars
          </h1>
          <LocalSearch />

          <Container fluid className="filter-and-sort">
            <DropdownGroup />
          </Container>
        </Container>

        <Container className="card-body">
          <CardDeck>
            <Row>
              {eventsList.map((event) => (
                <Col xs="4" className="p-0" key={uuid.v4()}>
                  {event}
                </Col>
              ))}
            </Row>
          </CardDeck>
        </Container>
      </Container>
    );
  }
}

export default EventsPage;
