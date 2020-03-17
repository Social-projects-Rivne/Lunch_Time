import React from 'react';
import { Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';

class MyDropdown extends React.Component {
  render() {
    const { id, name, items } = this.props;
    return (
      <Dropdown className="mr-3">
        <Dropdown.Toggle id={id} className="m-button">{name}</Dropdown.Toggle>
        <Dropdown.Menu>
          {items.map((item) => (
            <Dropdown.Item
              className="m-dropdown-item"
              key={item}
              href={`#/sort=${item.toLowerCase()}`}
            >
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

MyDropdown.propTypes = {
  items: PropTypes.any.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default MyDropdown;
