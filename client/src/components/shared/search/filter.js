import React, { Component } from 'react';
import { ButtonToolbar } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Context from '../dropdown/context';
import DateMenu from '../dropdown/date-menu';
import ResetButton from '../button/reset';

class Filter extends Component {
  render() {
    const { info, showDate, onChangeEvents } = this.props;
    return (
      <ButtonToolbar className="justify-content-center">
        <Context info={info} onChangeEvents={onChangeEvents} />
        {showDate && <DateMenu /> }
        <ResetButton />
      </ButtonToolbar>
    );
  }
}

Filter.propTypes = {
  info: PropTypes.array.isRequired,
  showDate: PropTypes.bool.isRequired,
  onChangeEvents: PropTypes.any.isRequired,

};

export default Filter;
