import React from 'react';
import Filter from '../search/filter';
import info from '../../info/events';

class EventFilterBar extends React.Component {
  render() {
    return (
      <Filter data={info} />
    );
  }
}

export default EventFilterBar;
