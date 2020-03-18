import React, { Component } from 'react';
import { ButtonToolbar } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Context from '../dropdown/context';
import DateMenu from '../dropdown/date-menu';
import ResetButton from '../button/reset';

class Filter extends Component {
  render() {
    const { data } = this.props;
    return (
      <ButtonToolbar className="justify-content-center">
        <Context data={data} />
        <DateMenu />
        <ResetButton />
      </ButtonToolbar>
    );
  }
}

Filter.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Filter;
