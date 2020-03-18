import * as React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import Header from '../search/header';
import Filter from '../search/filter';

class SearchMenu extends React.Component {
  render() {
    const { title, placeHolder, data } = this.props;
    return (
      <Container fluid className="page-header">
        <Header title={title} placeHolder={placeHolder} />
        <Filter data={data} />
      </Container>
    );
  }
}

SearchMenu.propTypes = {
  title: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default SearchMenu;
