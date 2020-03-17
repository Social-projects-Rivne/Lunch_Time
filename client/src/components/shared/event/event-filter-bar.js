import React from 'react';
import SearchFilterToolbar from '../search/search-filter-toolbar';
import eventData from '../../data/event-data';

class EventFilterBar extends React.Component {
  render() {
    return (
      <SearchFilterToolbar data={eventData} />
    );
  }
}

export default EventFilterBar;
