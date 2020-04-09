import React, { Component } from 'react';
import { ButtonToolbar } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Context from '../dropdown/context';
import ResetButton from '../button/reset';
import FilterBar from '../../event/filter-bar';

class Filter extends Component {
  render() {
    const { info, showDate, onChangeEvents } = this.props;
    return (
      <ButtonToolbar className="justify-content-center">
        {showDate && <FilterBar onChangeEvents={onChangeEvents} />}
        {!showDate && <Context info={info} onChangeEvents={onChangeEvents} />
        && <ResetButton />}
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
