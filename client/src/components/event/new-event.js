import React from 'react';
import {
  Button, ButtonToolbar, Container, Dropdown, Form, Image,
} from 'react-bootstrap';
import '../../styles/new-event.css';
import DatePicker from 'react-datepicker';


class NewEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleChange(e) {
    console.log(`${e.name}`);
  }

  render() {
    return (
      <Container fluid className="new-event-container">
        <h5>Add a new event</h5>

        <Form.Group>
          <Form.Label>Category: </Form.Label>
          <br />
          <Dropdown>
            <Dropdown.Toggle>Cat</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                dsd
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>

        <Form.Group>
          <Form.Label>Start time:</Form.Label>
          <br />
          <DatePicker
            showTimeSelect
            timeFormat="HH:mm"
            className="date-time-input"
            timeCaption="time"
            dateFormat="yyyy-MM-dd HH:mm"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Event name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Please enter the event name"
            onChange={(e) => this.handleChange(e)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Event description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            placeholder="Please enter the events description"
            onChange={(e) => this.handleChange(e)}
          />
        </Form.Group>

        <Form.Group>
          <Button onClick={() => this.onSelectClick()}>Select dish photo</Button>
          <br />
          <Image roundedCircle className="img mt-3" id="dishImage" src="/img/dish-default.png" />
        </Form.Group>

        <input
          ref={this.fileInputRef}
          type="file"
          accept="image/jpeg,image/png"
          hidden
          onChange={(e) => this.onFileSelect(e)}
        />

        <ButtonToolbar className="mb-5">
          <Button
            disabled={false}
            className="mr-3 m-button"
            onClick={() => this.onAddClick()}
          >
            Add
          </Button>
          <Button variant="danger" className="mr-3" onClick={() => this.onCancelClick()}>Cancel</Button>
        </ButtonToolbar>

      </Container>
    );
  }
}

export default NewEvent;
