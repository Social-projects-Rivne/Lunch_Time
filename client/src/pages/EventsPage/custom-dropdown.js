import React from "react";
import {Container, Dropdown} from "react-bootstrap";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import MyDatePicker from "./date-picker";

class DropdownWithDate extends React.Component {
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
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
      <DropdownToggle
        className={"m-button"}
        onClick={e => {
          e.preventDefault();
          onClick(e);
        }}
       id={"toggle"}>
        {children}
      </DropdownToggle>
    ));

    const CustomMenu = React.forwardRef(
      ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        return (
          <div
               ref={ref}
               style={style}
               className={className}
               aria-labelledby={labeledBy}
          >
            <Container className="text-center">
             <MyDatePicker />
             <MyDatePicker />
            </Container>
          </div>
        );
      },
    );

    return (
      <Dropdown className="mr-3">
        <Dropdown.Toggle as={CustomToggle} id="sort-by-date" className="m-button"  >Date</Dropdown.Toggle>
        <Dropdown.Menu as={CustomMenu}>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default DropdownWithDate;
