import React, { Component } from 'react';
import SearchMenuButton from './search-menu-button';

class Reset extends Component {
  render() {
    return (
      <SearchMenuButton
        buttonClassName="m-button ml-5"
        buttonName="Reset"
      />
    );
  }
}

export default Reset;
