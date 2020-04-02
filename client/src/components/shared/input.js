import * as React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

class Input extends React.Component {
  render() {
    const {
      placeholder, name, label, type, onChange,
    } = this.props;
    let newType = type;
    if (type === null) {
      newType = name;
    }
    return (
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type={newType}
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
  label: PropTypes.string.isRequired,
  onChange: PropTypes.any.isRequired,
  type: PropTypes.string,
};

Input.defaultProps = {
  type: null,
};

export default Input;
