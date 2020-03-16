import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

class SearchForm extends Component {
  render() {
    const {
      containerClassName, inputGroupClassName,
      placeholder, buttonClassName, buttonName,
    } = this.props;
    return (
      <Container className={containerClassName}>
        <InputGroup className={inputGroupClassName}>
          <FormControl
            placeholder={placeholder}
          />
          <InputGroup.Append>
            <Button className={buttonClassName}>{buttonName}</Button>
          </InputGroup.Append>
        </InputGroup>
      </Container>
    );
  }
}

SearchForm.defaultProps = {
  containerClassName: 'search-container pt-4',
  inputGroupClassName: 'mb-3',
  placeholder: 'Search',
  buttonClassName: 'm-button',
  buttonName: 'Find',
};

SearchForm.propTypes = {
  containerClassName: PropTypes.string,
  inputGroupClassName: PropTypes.string,
  placeholder: PropTypes.string,
  buttonClassName: PropTypes.string,
  buttonName: PropTypes.string,
};

export default SearchForm;
