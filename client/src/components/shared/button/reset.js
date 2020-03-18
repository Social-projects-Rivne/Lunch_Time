import React, { Component } from 'react';
import SearchBarButton from './search-bar-button';

class Reset extends Component {
  render() {
    return (
      <SearchBarButton
        buttonClassName="m-button ml-5"
        buttonName="Reset"
      />
    );
  }
}

export default Reset;
