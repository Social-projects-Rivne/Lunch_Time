import React from "react";
import './style.css'
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import {ButtonToolbar, CardDeck, Container, Row} from "react-bootstrap";
import {Dropdown} from "react-bootstrap";
import EventCard from "./event-card";
import Col from "react-bootstrap/Col";
import "react-datepicker/dist/react-datepicker.css";
import DropdownWithDate from "./custom-dropdown";


class EventsPage extends React.Component{

  render (){
    const eventsList = [<EventCard />, <EventCard />,<EventCard />, <EventCard />, <EventCard />, <EventCard />, <EventCard />];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const eventsType = ['Party', 'Karaoke', 'Concert', 'For children', 'Master class', 'Tasting', 'Sports broadcasting'];

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
              <Button className="m-button">Find</Button>
            </InputGroup.Append>
          </InputGroup>
          </Container>

         <Container fluid className="filter-and-sort">
           <ButtonToolbar className="justify-content-center pb-4 pt-4">

             <Dropdown className="mr-3">
               <Dropdown.Toggle id="sort-by-category" className="m-button">By category</Dropdown.Toggle>
               <Dropdown.Menu>
                 {eventsType.map((event, index) => (
                   <Dropdown.Item key={index} href={"#/event-" + eventsType.indexOf(event)}>{event}</Dropdown.Item>))}
               </Dropdown.Menu>
             </Dropdown>

             <Dropdown className="mr-3">
               <Dropdown.Toggle id="sort-by-month" className="m-button">By month</Dropdown.Toggle>
               <Dropdown.Menu>
                 {months.map((month, index) => (
                   <Dropdown.Item key={index} href={"#/" + month.toLowerCase()}>{month}</Dropdown.Item>))}
               </Dropdown.Menu>
             </Dropdown>

             <DropdownWithDate />

             {/* Reset filters */}
             <Button className="m-button ml-5">Reset</Button>
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
