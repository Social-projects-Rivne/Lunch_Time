import React from 'react';
import SearchFilterToolbar from '../search/search-filter-toolbar';
import eventData from '../../data/event-data';

class EventFilterBar extends React.Component {
  render() {
    // const bool {is date} ?
    return (
      <SearchFilterToolbar data={eventData} />
    );
  }
}

export default EventFilterBar;
