import React from 'react';
import { ButtonToolbar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import DropdownWithDate from './custom-dropdown';
import MyDropdown from './my-dropdown';

class DropdownGroup extends React.Component {
  constructor(props) {
    super(props);
    this.onSelectCategory = this.onSelectCategory.bind(this);
  }

  onSelectCategory(e, path) {
    const fullPath = path + e;
    console.log(`Value = ${fullPath}`);
    // eslint-disable-next-line react/destructuring-assignment
    this.props.onChangeEvents(fullPath);
  }

  render() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'];
    const eventsType = ['Party', 'Karaoke', 'Concert', 'For children',
      'Master class', 'Tasting', 'Sports broadcasting'];
    return (
      <ButtonToolbar className="justify-content-center pb-4 pt-4">

        <MyDropdown
          id="sort-by-category"
          name="By category"
          items={eventsType}
          onSelect={(e) => this.onSelectCategory(e, 'events/sort?category=')}
        />

        <MyDropdown
          id="sort-by-month"
          name="By month"
          items={months}
          onSelect={(e) => this.onSelectCategory(e, 'events/month/')}
        />

        <DropdownWithDate onApply={this.onSelectCategory} />

        {/* Reset filters */}
        <Button
          onClick={() => this.onSelectCategory('', 'events')}
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
};

export default DropdownGroup;
