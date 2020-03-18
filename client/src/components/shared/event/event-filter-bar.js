import React from 'react';
import Filter from '../search/filter';
import eventData from '../../data/event-data';

class EventFilterBar extends React.Component {
  render() {
    return (
      <Filter data={eventData} />
    );
  }
}

export default EventFilterBar;
