import React from 'react';
import '../styles/events-page.css';
import '../styles/dropdown.css';
import '../styles/m-button.css';
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
      isFetching: false,
    };
    this.handleEvents = this.handleEvents.bind(this);
  }

  componentDidMount() {
    this.getAll('events');
  }

  getAll(path) {
    Api.getAll(path)
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

  handleEvents(path) {
    this.getAll(path);
  }

  render() {
    const { events, isFetching } = this.state;

    return (
      <Container fluid className="page-container p-0">
        <SearchMenu
          title={title}
          placeHolder={placeHolder}
          info={info}
          onChangeEvents={this.handleEvents}
          showDate
        />
        <Results events={events} isFetching={isFetching} />
      </Container>
    );
  }
}

export default Events;
