import React, { Component } from 'react';
import SearchMenuButton from './search-menu-button';

class Reset extends Component {
  render() {
    return (
      <SearchMenuButton
        onClick={() => window.location.reload()}
        buttonName="Reset"
      />
    );
  }
}

export default Reset;
