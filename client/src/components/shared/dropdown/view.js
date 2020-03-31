import React from 'react';
import { Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';

class View extends React.Component {
  render() {
    const {
      id, name, values, onSelect,
    } = this.props;
    return (
      <Dropdown className="ml-3" onSelect={onSelect}>
        <Dropdown.Toggle id={id} className="m-button">{name}</Dropdown.Toggle>
        <Dropdown.Menu>
          {values.map((item) => (
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

View.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  onSelect: PropTypes.any.isRequired,
};

export default View;