import * as React from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Header from './header';
import Filter from './filter';

class SearchMenu extends React.Component {
  render() {
    const {
      title, placeHolder, info, showDate, containerClassName, onChangeEvents,
    } = this.props;
    return (
      <Container className={containerClassName}>
        <Header title={title} placeHolder={placeHolder} filter={(f) => this.props.filter(f)} />
        <Filter info={info} showDate={showDate} onChangeEvents={onChangeEvents} />
      </Container>
    );
  }
}

SearchMenu.defaultProps = {
  containerClassName: 'justify-content-center pb-4 pt-4',
  showDate: false,
};

SearchMenu.propTypes = {
  containerClassName: PropTypes.string,
  title: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  info: PropTypes.array.isRequired,
  showDate: PropTypes.bool,
  onChangeEvents: PropTypes.any.isRequired,
  filter: PropTypes.func.isRequired,
};

export default SearchMenu;
