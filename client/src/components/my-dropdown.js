import React from 'react';
import { Dropdown } from 'react-bootstrap';
import * as uuid from 'uuid';

class MyDropdown extends React.Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { id, name, items } = this.props;
    return (
      <Dropdown className="mr-3">
        <Dropdown.Toggle id={id} className="m-button">{name}</Dropdown.Toggle>
        <Dropdown.Menu>
          { // eslint-disable-next-line react/prop-types
            items.map((item) => (
              <Dropdown.Item
                className="m-dropdown-item"
                key={uuid.v4()}
                href={`#/sort=${item.toLowerCase()}`}
              >
                {item}
              </Dropdown.Item>
            ))
}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default MyDropdown;
