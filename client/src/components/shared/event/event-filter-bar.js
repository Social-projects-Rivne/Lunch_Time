import React from 'react';
import FilterToolbar from '../search/filter-toolbar';
import eventData from '../../data/event-data';

class EventFilterBar extends React.Component {
  render() {
    return (
      <FilterToolbar data={eventData} />
    );
  }
}

export default EventFilterBar;
