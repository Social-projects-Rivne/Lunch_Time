import * as React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';


class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
    };
  }

  handleClick() {
    this.setState(({ type }) => ({
      type: type === 'text' ? 'password' : 'text',
    }));
  }

  render() {
    const {
      placeholder, name, label, onChange,
    } = this.props;
    const { type } = this.state;

    return (
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <InputGroup>
          <Form.Control
            type={type}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
          />
          {(type === 'password' || type === 'text') && (
          <InputGroup.Append>
            <Button
              onClick={() => this.handleClick()}
              className="m-button"
              style={{ width: '4rem' }}
            >
              {type === 'text' ? 'Hide' : 'Show'}
            </Button>
          </InputGroup.Append>
          )}
        </InputGroup>
      </Form.Group>
    );
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.any.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  type: null,
  placeholder: null,
};

export default Input;
