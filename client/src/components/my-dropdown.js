import React from 'react';
import { Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';

class MyDropdown extends React.Component {
  render() {
    const {
      id, name, items, onSelect,
    } = this.props;
    return (
      <Dropdown className="ml-3" onSelect={onSelect}>
        <Dropdown.Toggle id={id} className="m-button">{name}</Dropdown.Toggle>
        <Dropdown.Menu>
          {items.map((item) => (
            <Dropdown.Item
              className="m-dropdown-item"
              key={item}
              eventKey={item.replace('\u0020', '\u005f').toLowerCase()}
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
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  items: PropTypes.any.isRequired,
  onSelect: PropTypes.any.isRequired,
};

export default MyDropdown;
