import React from 'react';
import { ButtonToolbar } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import DateMenu from '../shared/button/date-menu';
import View from '../shared/dropdown/view';
import Category from '../shared/dropdown/category';
import info from '../info/events';

class FilterBar extends React.Component {
  onSelectCategory(path) {
    this.props.onChangeEvents(path);
  }

  render() {
    return (
      <ButtonToolbar className="justify-content-center pb-4 pt-4">

        <Category
          homePath="events"
          path="events/categories/"
          items={info[0].values}
          onApply={(path) => this.onSelectCategory(path)}
        />

        <View
          id="sort-by-month"
          name="By month"
          values={info[1].values}
          onSelect={(e) => this.onSelectCategory(`events/month/${e}`)}
        />

        <DateMenu
          oneDate="events/date/"
          rangeDate="events/dates?from="
          onApply={(path) => this.onSelectCategory(path)}
        />

        <Button
          onClick={() => window.location.reload()}
          className="m-button ml-5"
        >
          Reset
        </Button>
      </ButtonToolbar>
    );
  }
}

FilterBar.propTypes = {
  onChangeEvents: PropTypes.any.isRequired,
};

export default FilterBar;
