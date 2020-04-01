import * as React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

class Input extends React.Component {
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    const { placeholder, name, onChange } = this.props;
    const labelName = this.capitalizeFirstLetter(name);
    return (
      <Form.Group>
        <Form.Label>{labelName}</Form.Label>
        <Form.Control
          type={name}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
        />
      </Form.Group>
    );
  }
}

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.any.isRequired,
};

export default Input;
