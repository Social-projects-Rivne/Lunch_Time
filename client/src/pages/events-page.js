import React from 'react';
import '../style/events-page.css';
import '../style/dropdown.css';
import '../style/m-button.css';
import { CardDeck, Container } from 'react-bootstrap';
import EventCard from '../components/event-card';
import 'react-datepicker/dist/react-datepicker.css';
import LocalSearch from '../components/local-search';
import DropdownGroup from '../components/dropdown-group';

class EventsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/events/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        response.json().then((json) => {
          console.log(json);
          this.setState({
            events: json,
          });
        });
      }
    });
  }

  render() {
    const { events } = this.state;

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

        <Container className="card-body pl-5 pr-5">
          <CardDeck className="wrapper">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </CardDeck>
        </Container>
      </Container>
    );
  }
}

export default EventsPage;
