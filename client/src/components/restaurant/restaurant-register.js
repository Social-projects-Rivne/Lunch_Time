import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, Container, Alert,
} from 'react-bootstrap';
import '../../styles/restaurant-registration.css';
import Api from '../../services/api';
import MyBadge from '../shared/my-batch';

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
      tables: 3,
      isRegistered: false,
    };
    this.userID = localStorage.getItem('userID');
    this.handleChange = this.handleChange.bind(this);
    this.showRegistration = this.showRegistration.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  validateForm() {
    const {
      email, name, address, description, tables,
    } = this.state;
    return email.length > 3 && name.length > 2 && address.length > 1 && description.length > 2 && tables > 0;
  }

  showRegistration() {
    this.setState({ isRegistered: true });
    setTimeout(() => {
      this.setState({
        isRegistered: false,
      });
    }, 3000);
  }

  allertMessage(message, variant = 'danger', dismissible = false) {
    if (dismissible) {
      return (
        <Alert
          variant={variant}
          dismissible={dismissible}
          onClose={() => { this.setState({ isBadRequestError: false }); }}
        >
          {message}
        </Alert>
      );
    }
    return (
      <Alert variant={variant}>
        {message}
      </Alert>
    );
  }

  backtoInfo() {
    return this.props.history.push('/profile/info');
  }

  saveRestaurant() {
    const restaurant = {
      name: this.state.name,
      email: this.state.email,
      textAddress: this.state.address,
      description: this.state.description,
      workingTime: `${this.state.time_from}-${this.state.time_to}`,
      personId: this.userID,
      createdBy: this.userID,
      modifyBy: this.userID,
      tables: this.state.tables,
    };

    Api.post('restaurants', restaurant)
      .then((response) => {
        if (response.error) {
          // eslint-disable-next-line no-console
          console.error(response);
          this.setState({
            isBadRequestError: true,
          });
          return;
        }
        this.showRegistration();
        this.props.history.push(`/restaurants/${response.data.id}`);
      });
  }

  render() {
    const { isRegistered } = this.state;
    return (
      <Container fluid className="restaurantRegistration">
        <h4>
          Restaurant registration
        </h4>
        <h6 className="warning">
          Fields with (*) are required :
        </h6>
        <Form name="registrationForm">
          {' '}
          <div className="form_registration">
            <div className="register_info_container">
              <Form.Group controlId="name">
                <Form.Label>Name *</Form.Label>
                <Form.Control
                  autoFocus
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email *</Form.Label>
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
                <Form.Label>Address *</Form.Label>
                <Form.Control
                  autoFocus
                  name="address"
                  value={this.state.address}
                  onChange={this.handleChange}
                />
              </Form.Group>
              {' '}
              <Form.Group controlId="workingTime">
                <Form.Label>Working Time *</Form.Label>
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
                <br />
                <div className="register_count_container">
                  <Form.Group controlId="countTables">
                    <Form.Label>Table count:</Form.Label>
                    <Form.Control
                      autoFocus
                      name="count"
                      type="number"
                      value={this.state.tables}
                      onChange={(event) => { this.setState({ tables: event.target.value }); }}
                    />
                  </Form.Group>
                </div>
              </Form.Group>
            </div>
            <div className="register_map_container">
              {' '}
            </div>
          </div>
          <Form.Group>
            <Form.Label>Description *</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              placeholder="Write description of your restaurant"
              value={this.state.description}
              onChange={(event) => { this.setState({ description: event.target.value }); }}
            />
          </Form.Group>
        </Form>
        {
          this.state.isBadRequestError
            ? this.allertMessage('Something went wrong. Try again later', 'danger', true)
            : null
        }

        <div className="registe_btn_container">
          {isRegistered && (
          <MyBadge variant="success" message="Your restaurnt was registered!" />
          )}
          <Button onClick={() => this.backtoInfo()} variant="danger" className="registe_btn_cancel">Cancel</Button>
          <Button
            block
            disabled={!this.validateForm()}
            onClick={() => this.saveRestaurant()}
          >
            Register
          </Button>
        </div>
      </Container>
    );
  }
}

RestaurantRegistration.propTypes = {
  history: PropTypes.any.isRequired,
};
export default RestaurantRegistration;
