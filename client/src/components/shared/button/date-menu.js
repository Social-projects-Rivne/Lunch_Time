import React from 'react';
import { Container, Dropdown } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import moment from 'moment';
import PropTypes from 'prop-types';
// import MyDatePicker from '../button/date-picker';

class DateMenu extends React.Component {
  constructor(props) {
    super(props);
    this.currentDate = new Date();
    this.state = {
      startDate: this.currentDate,
      endDate: this.currentDate,
    };
    this.handleOnApplyClick = this.handleOnApplyClick.bind(this);
  }

  handleOnApplyClick() {
    const { startDate, endDate } = this.state;
    const { oneDate, rangeDate } = this.props;

    let path = `${rangeDate}${this.formatDate(startDate)}&to=${this.formatDate(endDate)}`;
    if (startDate === endDate) {
      path = oneDate + this.formatDate(startDate);
    }
    this.props.onApply(path);
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

  reset() {
    this.setState({
      startDate: this.currentDate,
      endDate: this.currentDate,
    });
  }

  render() {
    const { startDate, endDate } = this.state;
    // eslint-disable-next-line react/prop-types
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
      <DropdownToggle
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
      <Dropdown className="ml-3">
        <Dropdown.Toggle as={CustomToggle} id="sort-by-date">Date</Dropdown.Toggle>
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

DateMenu.propTypes = {
  onApply: PropTypes.any.isRequired,
  oneDate: PropTypes.string.isRequired,
  rangeDate: PropTypes.string.isRequired,
};

export default DateMenu;
