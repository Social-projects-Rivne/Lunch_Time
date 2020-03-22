import React from 'react';
import { ButtonToolbar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import DropdownWithDate from './custom-dropdown';
import MyDropdown from './my-dropdown';
import CategoryDropdown from './category-dropdown';

class DropdownGroup extends React.Component {
  onSelectCategory(path) {
    console.log(`path= ${path}`);
    this.props.onChangeEvents(path);
  }

  render() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'];
    const eventsType = ['Party', 'Karaoke', 'Concert', 'For children',
      'Master class', 'Tasting', 'Sports broadcasting'];
    return (
      <ButtonToolbar className="justify-content-center pb-4 pt-4">

        <CategoryDropdown
          items={eventsType}
          homePath="events"
          path="events/categories/"
          onApply={(path) => this.onSelectCategory(path)}
        />

        <MyDropdown
          id="sort-by-month"
          name="By month"
          items={months}
          onSelect={(e) => this.onSelectCategory(`events/month/${e}`)}
        />

        <DropdownWithDate
          oneDate="events/date/"
          rangeDate="events/dates?from="
          onApply={(path) => this.onSelectCategory(path)}
        />

        <Button
          onClick={() => window.location.reload()}
          className="m-button ml-5"
        >
          Reset
        </Button>
      </ButtonToolbar>
    );
  }
}

DropdownGroup.propTypes = {
  onChangeEvents: PropTypes.any.isRequired,
};

export default DropdownGroup;
