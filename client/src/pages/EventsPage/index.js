import React from "react";
import './style.css'
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import {ButtonToolbar, CardDeck, Container, Row} from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import {Dropdown} from "react-bootstrap";
import EventCard from "./event-card";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class EventsPage extends React.Component{

  render (){
    const eventsList = [<EventCard />, <EventCard />,<EventCard />, <EventCard />, <EventCard />, <EventCard />, <EventCard />];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const eventsType = ['Party', 'Karaoke', 'Concert', 'For children', 'Master class', 'Tasting', 'Sports broadcasting'];

    const CustomDatePicker = ({ value, onClick }) => (
      <Button variant="warning" className="example-custom-input" onClick={onClick}>
        {value} Date Select
      </Button>
    );

    return (
     <Container fluid className="page-container p-0">

       <Container fluid className="page-header">
         <h1 className="page-header-title"> All events and activities in restaurants, <br/> cafes and bars</h1>
          <Container className="search-container pt-4">
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search events"
              aria-label="Search events"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button className="button">Find</Button>
            </InputGroup.Append>
          </InputGroup>
          </Container>

         <Container fluid className="filter-and-sort">
           <ButtonToolbar variant="warning" className="justify-content-center pb-4 pt-4">
             {/* Sort by type */}
             <DropdownButton variant="warning" className="mr-3" id="dropdown-basic-button" title="By category">
               {eventsType.map((event, index) => (
                 <Dropdown.Item key={index} href={"#/event-" + eventsType.indexOf(event)}>{event}</Dropdown.Item>
               ))}
             </DropdownButton >
             {/* Sort by months */}
             <DropdownButton variant="warning" className="mr-3" id="dropdown-basic-button" title="By month">
               {months.map((month, index) => (
                 <Dropdown.Item key={index} href={"#/" + month.toLowerCase()}>{month}</Dropdown.Item>
               ))}
             </DropdownButton>

             {/* Select date range*/}
             <DropdownButton variant="warning" className="mr-3" id="dropdown-basic-button" title="Date">
               {function (e){
                   e.preventDefault();
                   e.stopPropagation();
                   e.nativeEvent.stopImmediatePropagation();
                 } }
                 <Dropdown.Item onClick={this}>
                   <DatePicker customInput={<CustomDatePicker />}/>
                 </Dropdown.Item>
                 <Dropdown.Item onClick={this}>
                   <DatePicker customInput={<CustomDatePicker />}/>
                 </Dropdown.Item>
             </DropdownButton>

             {/* Reset filters */}
             <Button variant="warning" className="ml-5">Reset</Button>
           </ButtonToolbar>
         </Container>
     </Container>

       <Container className="card-body">
          <CardDeck>
          <Row>
            {eventsList.map((event, index) => (
              <Col xs="4" className="p-0" key={index}>
                {event}
              </Col>
            ))}
          </Row>
          </CardDeck>
        </Container>
     </Container>
    )
  }
}

export default EventsPage;
