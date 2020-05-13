import React from 'react';
import '../styles/events-page.css';
import { Container } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import Api from '../services/api';
import SearchMenu from '../components/shared/search/search-menu';
import info, { title, placeHolder } from '../components/info/events';
import Results from '../components/event/results';

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      filteredEvents: [],
      isFetching: false,
    };
    this.handleEvents = this.handleEvents.bind(this);
  }

  componentDidMount() {
    this.getAll('events');
  }

  getAll(path) {
    Api.get(path)
      .then((response) => {
        if (response.error) {
          // eslint-disable-next-line no-console
          console.error(response);
          return;
        }
        this.setState({
          events: response.data,
          filteredEvents: response.data,
          isFetching: true,
        });
      });
  }

  handleEvents(path) {
    this.getAll(path);
  }

  searchEvents(filter) {
    const { events } = this.state;
    let filteredEvents = events;
    filteredEvents = filteredEvents.filter((event) => {
      const eventStr = event.name.toLowerCase() + event.description.toLowerCase();
      return eventStr.indexOf(
        filter.toLowerCase(),
      ) !== -1;
    });
    this.setState({
      filteredEvents: filteredEvents,
    });
  }

  render() {
    const { filteredEvents, isFetching } = this.state;
    return (
      <Container fluid className="page-container">
        <SearchMenu
          title={title}
          placeHolder={placeHolder}
          info={info}
          onChangeEvents={this.handleEvents}
          showDate
          filter={(f) => { this.searchEvents(f); }}
        />
        <Results events={filteredEvents} isFetching={isFetching} showLink />
      </Container>
    );
  }
}

export default Events;
