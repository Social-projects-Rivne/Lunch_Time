import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, Container, Alert,
} from 'react-bootstrap';
import '../../styles/restaurant-registration.css';
import Api from '../../services/api';
import Auth from '../../services/auth';
import MyBadge from '../shared/my-batch';

class RestaurantRegistration extends Component {
  constructor(props) {
    super(props);
    this.endpoint = '';
    this.state = {
      name: '',
      email: '',
      address: '',
      timeFrom: '09:00',
      timeTo: '22:00',
      description: '',
      tables: 3,
      isRegistered: false,
      isBadRequestError: '',
      isValid: false,
    };
    this.isValidName = true;
    this.isValidEmail = true;
    this.isValidAddress = true;
    this.isValidWorkingTime = true;
    this.isValidCountTables = true;
    this.isValidDescription = true;
    this.personId = Auth.getPersonId();
    this.handleChange = this.handleChange.bind(this);
    this.showRegistration = this.showRegistration.bind(this);
  }

  // eslint-disable-next-line react/sort-comp
  isValidCheck() {
    const { isValid } = this.state;
    this.setState({ isValid: true });
    return isValid;
  }

  // eslint-disable-next-line react/sort-comp
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

  validInput() {
    const {
      email, name, address, description, tables, timeFrom, timeTo,
    } = this.state;
    if (email.length < 3) { this.isValidEmail = false; } else { this.isValidEmail = true; }
    if (name.length < 2) { this.isValidName = false; } else { this.isValidName = true; }
    if (address.length < 1) { this.isValidAddress = false; } else { this.isValidAddress = true; }
    if (description.length < 2) { this.isValidDescription = false; } else { this.isValidDescription = true; }
    if (timeFrom.length < 3 || timeTo.length < 3) {
      this.isValidWorkingTime = false;
    } else { this.isValidWorkingTime = true; }
    if (tables < 0) { this.isValidCountTables = false; } else { this.isValidCountTables = true; }
    return this.isValidName && this.isValidEmail && this.isValidAddress
    && this.isValidCountTables && this.isValidDescription && this.isValidWorkingTime;
  }

  showRegistration() {
    this.setState({ isRegistered: true });
    this.setState({
      isRegistered: false,
    });
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
      workingTime: `${this.state.timeFrom}-${this.state.timeTo}`,
      personId: this.personId,
      createdBy: this.personId,
      modifyBy: this.personId,
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

  checkForSending() {
    this.isValidCheck();
    if (this.validInput()) {
      this.saveRestaurant();
    }
  }

  render() {
    const {
      isRegistered,
    } = this.state;
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
                <Form.Label>Restaurant name *</Form.Label>
                <Form.Control
                  autoFocus
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </Form.Group>
              {!this.isValidName && (
              <MyBadge variant="danger" message="'Restaurant name' field must be filled !" />
              )}
              <Form.Group controlId="email">
                <Form.Label>Restaurant email *</Form.Label>
                <Form.Control
                  autoFocus
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </Form.Group>
              {!this.isValidEmail && (
              <MyBadge variant="danger" message="'Email' field must be filled!" />
              )}
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
              {!this.isValidAddress && (
              <MyBadge variant="danger" message="'Address' field must be filled!" />
              )}
              {' '}
              <Form.Group controlId="workingTime">
                <Form.Label>Working Time *</Form.Label>
                <br />
                <div className="time_from">
                  From:
                  <Form.Control
                    autoFocus
                    type="time"
                    value={this.state.timeFrom}
                    onChange={(event) => { this.setState({ timeFrom: event.target.value }); }}
                  />
                </div>
                <div className="time_to">
                  To:
                  <Form.Control
                    autoFocus
                    type="time"
                    value={this.state.timeTo}
                    onChange={(event) => { this.setState({ timeTo: event.target.value }); }}
                  />
                </div>
              </Form.Group>
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
                {!this.isValidCountTables && (
                  <MyBadge variant="danger" message="The number of tables must be greater than zero!" />
                )}
              </div>
              {!this.isValidWorkingTime && (
              <MyBadge variant="danger" message="Time must be valid!" />
              )}
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
              placeholder="Write your restaurant's description here"
              value={this.state.description}
              onChange={(event) => { this.setState({ description: event.target.value }); }}
            />
          </Form.Group>
          {!this.isValidDescription && (
          <MyBadge variant="danger" message="'Description' field must be filled!" />
          )}
        </Form>
        <br />
        {
          this.state.isBadRequestError
            ? this.allertMessage('Something went wrong. Try again later', 'danger', true)
            : null
        }

        <div className="registe_btn_container">
          {isRegistered && (
          <MyBadge variant="success" message="Your restaurant was successfully registered!" />
          )}
          <Button onClick={() => this.backtoInfo()} variant="danger" className="registe_btn_cancel">Cancel</Button>
          <Button
            style={{
              height: 37,
            }}
            block
            onClick={() => this.checkForSending()}
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
