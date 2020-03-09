import React from 'react';
import { Container, Dropdown } from 'react-bootstrap';
import MyDatePicker from './date-picker';


class DropdownWithDate extends React.Component {
  render() {
    const CustomMenu = React.forwardRef(
      // eslint-disable-next-line react/prop-types
      ({ style, className }, ref) => (
        <div
          ref={ref}
          style={style}
          className={className}
        >
          <Container className="text-center">
            <MyDatePicker />
            <MyDatePicker />
          </Container>
        </div>
      ),
    );

    return (
      <Dropdown className="mr-3">
        <Dropdown.Toggle id="sort-by-date" className="m-button">Date</Dropdown.Toggle>
        <Dropdown.Menu as={CustomMenu}>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default DropdownWithDate;
