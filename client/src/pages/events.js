import React from 'react';
import '../style/events-page.css';
import '../style/dropdown.css';
import '../style/m-button.css';
import { Container } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import Api from '../services/api';
import SearchMenu from '../components/shared/search/search-menu';
import info, { title, placeHolder } from '../components/info/events';
import CardResults from '../components/shared/event/card-results';

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
        <SearchMenu
          title={title}
          placeHolder={placeHolder}
          data={info}
        />
        <CardResults events={events} isFetching={isFetching} />
      </Container>
    );
  }
}

export default Events;
