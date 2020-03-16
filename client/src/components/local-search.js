import * as React from 'react';
import SearchForm from './shared/search-form';

class LocalSearch extends React.Component {
  render() {
    return (
      <SearchForm placeholder="Search event" />
    );
  }
}

export default LocalSearch;
