import * as React from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Header from './header';
import Filter from './filter';

class SearchMenu extends React.Component {
  render() {
    const {
      title, placeHolder, info, showDate,
    } = this.props;
    return (
      <Container fluid className="page-header">
        <Header title={title} placeHolder={placeHolder} />
        <Filter info={info} showDate={showDate} />
      </Container>
    );
  }
}

SearchMenu.defaultProps = {
  showDate: false,
};

SearchMenu.propTypes = {
  title: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  info: PropTypes.array.isRequired,
  showDate: PropTypes.bool,
};

export default SearchMenu;
