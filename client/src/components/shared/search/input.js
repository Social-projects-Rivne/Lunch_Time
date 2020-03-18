import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import SearchBarButton from '../button/search-bar-button';

class Input extends Component {
  render() {
    const {
      containerClassName,
      inputGroupClassName,
      placeholder,
    } = this.props;
    return (
      <Container className={containerClassName}>
        <InputGroup className={inputGroupClassName}>
          <FormControl
            placeholder={placeholder}
          />
          <InputGroup.Append>
            <SearchBarButton />
          </InputGroup.Append>
        </InputGroup>
      </Container>
    );
  }
}

Input.defaultProps = {
  containerClassName: 'search-container pt-4',
  inputGroupClassName: 'mb-3',
  placeholder: 'Search',
};

Input.propTypes = {
  containerClassName: PropTypes.string,
  inputGroupClassName: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Input;
