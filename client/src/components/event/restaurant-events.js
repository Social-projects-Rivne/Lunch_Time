import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Api from '../../services/api';
import Results from './results';

class RestaurantEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantId: this.props.id,
      events: [],
      isFetching: false,
      isOwner: true, // TODO:  Hardcoded change later
    };
  }

  componentDidMount() {
    Api.getOne('events/restaurant', this.state.restaurantId)
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
    const {
      events, isFetching, isOwner, restaurantId,
    } = this.state;

    return (
      <Container fluid>
        <ButtonToolbar className="justify-content-center">
          {isOwner && (
            <Link to={{ pathname: `/restaurants/${restaurantId}/new-event` }}>
              <Button className="mt-2">Add new Event</Button>
            </Link>
          )}
        </ButtonToolbar>
        <Results events={events} isFetching={isFetching} />
      </Container>
    );
  }
}

RestaurantEvents.propTypes = {
  id: PropTypes.any.isRequired,
};

export default RestaurantEvents;
