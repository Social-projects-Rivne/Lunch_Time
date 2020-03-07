import React from 'react';
import { ButtonToolbar, Dropdown } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import * as uuid from 'uuid';
import DropdownWithDate from './custom-dropdown';

class DropdownGroup extends React.Component {
  render() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const eventsType = ['Party', 'Karaoke', 'Concert', 'For children', 'Master class', 'Tasting', 'Sports broadcasting'];
    return (
      <ButtonToolbar className="justify-content-center pb-4 pt-4">

        <Dropdown className="mr-3">
          <Dropdown.Toggle id="sort-by-category" className="m-button">By category</Dropdown.Toggle>
          <Dropdown.Menu>
            {eventsType.map((event) => (
              <Dropdown.Item className="m-dropdown-item" key={uuid.v4()} href={`#/event-${eventsType.indexOf(event)}`}>{event}</Dropdown.Item>))}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown className="mr-3">
          <Dropdown.Toggle id="sort-by-month" className="m-button">By month</Dropdown.Toggle>
          <Dropdown.Menu>
            {months.map((month) => (
              <Dropdown.Item className="m-dropdown-item" key={uuid.v4()} href={`#/${month.toLowerCase()}`}>{month}</Dropdown.Item>))}
          </Dropdown.Menu>
        </Dropdown>

        <DropdownWithDate />

        {/* Reset filters */}
        <Button className="m-button ml-5">Reset</Button>
      </ButtonToolbar>
    );
  }
}

export default DropdownGroup;
