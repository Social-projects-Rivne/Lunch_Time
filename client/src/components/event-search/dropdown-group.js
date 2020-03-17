import React from 'react';
import { ButtonToolbar } from 'react-bootstrap';
import DropdownWithDate from './custom-dropdown';
import MyDropdown from './my-dropdown';
import SearchButton from '../shared/search/search-button';

class DropdownGroup extends React.Component {
  render() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'];
    const eventsType = ['Party', 'Karaoke', 'Concert', 'For children',
      'Master class', 'Tasting', 'Sports broadcasting'];
    return (
      <ButtonToolbar className="justify-content-center pb-4 pt-4">

        <MyDropdown
          id="sort-by-category"
          name="By category"
          items={eventsType}
        />

        <MyDropdown
          id="sort-by-month"
          name="By month"
          items={months}
        />

        <DropdownWithDate />

        {/* Reset filters */}
        <SearchButton
          buttonClassName="m-button ml-5"
          buttonName="Reset"
        />
      </ButtonToolbar>
    );
  }
}

export default DropdownGroup;
