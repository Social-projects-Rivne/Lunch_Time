import React from 'react';
import '../style/events-page.css';
import '../style/dropdown.css';
import '../style/m-button.css';
import { CardDeck, Container } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import EventCard from '../components/event-search/event-card';
import 'react-datepicker/dist/react-datepicker.css';
import EventSearchForm from '../components/shared/event/event-search-form';
import Api from '../services/api';
import EventFilterBar from '../components/shared/event/event-filter-bar';

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      isFetching: false,
    };
  }

  componentDidMount() {
    this.getAll();
  }

  getAll() {
    Api.getAll('events')
      .then((response) => {
        if (response.error) {
          // eslint-disable-next-line no-console
          console.error(response);
          return;
        }
        this.setState({
          events: response.data,
          isFetching: true,
        });
      });
  }

  render() {
    const { events, isFetching } = this.state;

    return (
      <Container fluid className="page-container p-0">

        <Container fluid className="page-header">
          <h1 className="page-header-title">
            {' '}
            <span>
              All events and activities in restaurants,
              <br />
              {' '}
              cafes and bars
            </span>
          </h1>
          <EventSearchForm />

          <Container fluid className="filter-and-sort">
            <EventFilterBar />
          </Container>
        </Container>

        <Container className="card-body pl-5 pr-5">
          {isFetching ? (
            <CardDeck className="wrapper">
              {events.map((event) => (
                <EventCard key={event.id} event={event} isFetching={isFetching} />
              ))}
            </CardDeck>
          ) : (
            <Container className="spinner-container">
              <ButtonToolbar className="justify-content-center">
                <Spinner animation="border" variant="warning" />
              </ButtonToolbar>
            </Container>
          )}
        </Container>

      </Container>
    );
  }
}

export default Events;
