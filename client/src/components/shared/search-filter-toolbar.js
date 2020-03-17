import React, { Component } from 'react';
import { ButtonToolbar } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DropdownWithDate from '../custom-dropdown';
import ResetButton from './reset-button';
import DropdownMaker from './dropdown/dropdown-maker';

class SearchFilterToolbar extends Component {
  render() {
    const { data } = this.props;
    return (
      <ButtonToolbar className="justify-content-center">
        <DropdownMaker data={data} />
        <DropdownWithDate />
        <ResetButton />
      </ButtonToolbar>
    );
  }
}

SearchFilterToolbar.propTypes = {
  data: PropTypes.array.isRequired,
};

export default SearchFilterToolbar;
