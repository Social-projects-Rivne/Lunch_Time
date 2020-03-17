import React, { Component } from 'react';
import SearchButton from './search/search-button';

class ResetButton extends Component {
  render() {
    return (
      <SearchButton
        buttonClassName="m-button ml-5"
        buttonName="Reset"
      />
    );
  }
}

export default ResetButton;
