import React, { Component } from 'react';
import {
  Button, Form, Container,
} from 'react-bootstrap';
import '../../styles/restaurant-registration.css';

class RestaurantRegistration extends Component {
  constructor(props) {
    super(props);
    this.endpoint = '';
    this.state = {
      name: '',
      email: '',
      address: '',
      time_from: '09:00',
      time_to: '22:00',
      description: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  saveRestaurant() { }

  render() {
    // const [startDate, setStartDate] = useState(new Date());
    return (
      <Container fluid className="restaurantRegistration">
        <h4>
          Restaurant registration
          {' '}
        </h4>
        <Form name="registrationForm">
          <br />
          {' '}
          <div className="register_info_container">
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                autoFocus
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </Form.Group>
            {' '}
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                autoFocus
                name="address"
                value={this.state.address}
                onChange={this.handleChange}
              />
            </Form.Group>
            {' '}
            <Form.Group controlId="workingTime">
              <Form.Label>Working Time</Form.Label>
              <br />
              <div className="time_from">
                From:
                <Form.Control
                  autoFocus
                  type="time"
                  value={this.state.time_from}
                  onChange={(event) => { this.setState({ time_from: event.target.value }); }}
                />
              </div>
              <div className="time_to">
                To:
                <Form.Control
                  autoFocus
                  type="time"
                  value={this.state.time_to}
                  onChange={(event) => { this.setState({ time_to: event.target.value }); }}
                />
              </div>
            </Form.Group>
          </div>
          <div className="register_map_container"> </div>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              placeholder="Write description of your restaurant"
              value={this.state.description}
              onChange={(event) => { this.setState({ description: event.target.value }); }}
            />
          </Form.Group>
        </Form>

        <div className="registe_btn_container">
          <Button variant="danger" className="registe_btn_cancel">Cancel</Button>
          <Button
            onClick={() => this.saveRestaurant()}
          >
            Register
          </Button>
        </div>
      </Container>

    );
  }
}
export default RestaurantRegistration;
