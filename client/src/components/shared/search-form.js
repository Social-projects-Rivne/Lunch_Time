import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import SearchButton from './search/search-button';

class SearchForm extends Component {
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
            <SearchButton />
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
};

SearchForm.propTypes = {
  containerClassName: PropTypes.string,
  inputGroupClassName: PropTypes.string,
  placeholder: PropTypes.string,
};

export default SearchForm;
