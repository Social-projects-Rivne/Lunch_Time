import React from 'react';
import { Container, Dropdown } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import moment from 'moment';
import PropTypes from 'prop-types';


class DropdownWithDate extends React.Component {
  constructor(props) {
    super(props);
    const date = new Date();
    this.state = {
      startDate: date,
      endDate: date,
    };
    this.handleOnApplyClick = this.handleOnApplyClick.bind(this);
  }

  handleOnApplyClick() {
    const { startDate, endDate } = this.state;
    let path = `events/dates/from=${this.formatDate(startDate)}&to=${
      this.formatDate(endDate)}`;
    if (startDate === endDate) {
      path = `events/date/${this.formatDate(startDate)}`;
    }
    // eslint-disable-next-line react/destructuring-assignment
    this.props.onApply('', path);
  }

  handleChange(startDate, endDate) {
    this.setState({
      startDate: startDate,
      endDate: endDate,
    });
  }

  formatDate(date) {
    return moment(date).format('YYYY-MM-DD');
  }

  render() {
    const { startDate, endDate } = this.state;

    // This toggle prevent to close dropdown when you click on date-picker
    // eslint-disable-next-line react/prop-types
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
      <DropdownToggle
        className="m-button"
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
        id="toggle"
      >
        {children}
      </DropdownToggle>
    ));

    return (
      <Dropdown className="mr-3">
        <Dropdown.Toggle as={CustomToggle} id="sort-by-date" className="m-button">Date</Dropdown.Toggle>
        <Dropdown.Menu>
          <Container className="text-center pb-2">
            <DatePicker
              className="text-center"
              selected={startDate}
              onChange={(date) => this.handleChange(date, date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="dd/MM/yyyy"
            />
            <DatePicker
              className="text-center"
              selected={endDate}
              onChange={(date) => this.handleChange(startDate, date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="dd/MM/yyyy"
            />
            <Dropdown.Item
              onClick={this.handleOnApplyClick}
              className="m-dropdown-item mt-2"
            >
              Apply
            </Dropdown.Item>
          </Container>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

DropdownWithDate.propTypes = {
  onApply: PropTypes.any.isRequired,
};

export default DropdownWithDate;
