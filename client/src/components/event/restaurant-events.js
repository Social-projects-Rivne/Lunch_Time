import React from 'react';
import PropTypes from 'prop-types';
import Api from '../../services/api';
import Results from './results';

class RestaurantEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantId: this.props.id,
      events: [],
      isFetching: false,
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
    const { events, isFetching } = this.state;

    return (
      <Results events={events} isFetching={isFetching} />
    );
  }
}

RestaurantEvents.propTypes = {
  id: PropTypes.any.isRequired,
};

export default RestaurantEvents;
