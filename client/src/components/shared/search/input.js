import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import SearchMenuButton from '../button/search-menu-button';

class Input extends Component {
  render() {
    const {
      containerClassName,
      inputGroupClassName,
      placeHolder,
    } = this.props;
    return (
      <Container className={containerClassName}>
        <InputGroup className={inputGroupClassName}>
          <FormControl
            placeholder={placeHolder}
          />
          <InputGroup.Append>
            <SearchMenuButton />
          </InputGroup.Append>
        </InputGroup>
      </Container>
    );
  }
}

Input.defaultProps = {
  containerClassName: 'search-container pt-4',
  inputGroupClassName: 'mb-3',
  placeHolder: 'Search',
};

Input.propTypes = {
  containerClassName: PropTypes.string,
  inputGroupClassName: PropTypes.string,
  placeHolder: PropTypes.string,
};

export default Input;
