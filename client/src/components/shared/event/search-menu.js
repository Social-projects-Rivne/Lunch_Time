import * as React from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Header from '../search/header';
import Filter from '../search/filter';

class SearchMenu extends React.Component {
  render() {
    const { title, placeHolder, data } = this.props;
    return (
      <Container fluid className="page-header">
        <Header title={title} placeHolder={placeHolder} />
        <Filter info={data} />
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
