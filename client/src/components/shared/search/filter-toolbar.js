import React, { Component } from 'react';
import { ButtonToolbar } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DateMenu from '../dropdown/date-menu';
import Reset from '../button/reset';
import Context from '../dropdown/context';

class FilterToolbar extends Component {
  render() {
    const { data } = this.props;
    return (
      <ButtonToolbar className="justify-content-center">
        <Context data={data} />
        <DateMenu />
        <Reset />
      </ButtonToolbar>
    );
  }
}

FilterToolbar.propTypes = {
  data: PropTypes.array.isRequired,
};

export default FilterToolbar;
