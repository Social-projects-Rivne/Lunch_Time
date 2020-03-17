import React from 'react';
import { Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';

class DropdownMenu extends React.Component {
  render() {
    const { id, name, values } = this.props;
    return (
      <Dropdown className="mr-3">
        <Dropdown.Toggle id={id} className="m-button">{name}</Dropdown.Toggle>
        <Dropdown.Menu>
          {values.map((item) => (
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

DropdownMenu.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
};

export default DropdownMenu;
