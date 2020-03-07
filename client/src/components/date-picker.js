import * as React from "react";
import DatePicker from "react-datepicker";

class MyDatePicker extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
      useState: new Date()
    });
  }

  render() {
    return (
      <DatePicker className="text-center"
                  selected={this.state.startDate}
                  onChange={this.handleChange}
                  dateFormat="dd/MM/yyyy" />
    );
  }
}

export default MyDatePicker;
