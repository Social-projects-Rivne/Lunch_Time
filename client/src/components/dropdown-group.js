import React from 'react';
import { ButtonToolbar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import DropdownWithDate from './custom-dropdown';
import MyDropdown from './my-dropdown';
import CategoryDropdown from './category-dropdown';

class DropdownGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [], // we have empty array, that pass to CategoryDropdown
    };
    // eslint-disable-next-line no-console
    console.log(this.state.categories);
  }

  // eslint-disable-next-line no-unused-vars
  shouldComponentUpdate(nextProps, nextState, nextContent) {
    if (typeof nextProps.categories !== 'undefined' && typeof this.props.categories !== 'undefined') {
      if (nextProps.categories.length !== this.props.categories.length) {
        this.setState({ categories: nextProps.categories });
      }
    }
    return this.state.value !== nextState.value;
  }

  onSelectCategory(path) {
    this.props.onChangeEvents(path);
  }

  render() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'];
    const eventsType = ['Party', 'Karaoke', 'Concert', 'For children',
      'Master class', 'Tasting', 'Sports broadcasting'];
    const { categories } = this.state;
    return (
      <ButtonToolbar className="justify-content-center pb-4 pt-4">

        {/* eslint-disable-next-line no-console */}
        { console.log(categories) }
        <CategoryDropdown
          items={eventsType}
          homePath="events"
          path="events/categories/"
          categories={categories} // here we pass our empty array (or updated later)
          onApply={(path) => this.onSelectCategory(path)}
        />

        <MyDropdown
          id="sort-by-month"
          name="By month"
          items={months}
          onSelect={(e) => this.onSelectCategory(`events/month/${e}`)}
        />

        <DropdownWithDate
          oneDate="events/date/"
          rangeDate="events/dates?from="
          onApply={(path) => this.onSelectCategory(path)}
        />

        <Button
          onClick={() => this.setState({ categories: [] })} // here we can reset the value of our array
          className="m-button ml-5"
        >
          Reset
        </Button>
      </ButtonToolbar>
    );
  }
}

DropdownGroup.propTypes = {
  onChangeEvents: PropTypes.any.isRequired,
  categories: PropTypes.array.isRequired,
};

export default DropdownGroup;
