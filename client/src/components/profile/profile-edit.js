import React, { Component } from 'react';
import {
  Form, Container, Row, Col, Button, Alert,
} from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import Avatar from 'react-avatar';
import PropTypes from 'prop-types';
import validator from 'validator';
import Api from '../../services/api';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowAlert: false,
      user: { ...this.props.user },
      previousUserData: { ...this.props.user },
      errors: {
        name: '', phoneNumber: '', oldPassword: '', newPassword: '', confirmPassword: '',
      },
      alertError: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  updateProfile(event) {
    this.disableAlert();
    event.preventDefault();
    event.stopPropagation();
    const { newPassword, user, previousUserData } = this.state;
    const requests = [];

    if (JSON.stringify(user) !== JSON.stringify(previousUserData)) {
      requests.push(this.changeUserData());
    }
    if (newPassword) {
      requests.push(this.changePassword());
    }
    Promise.all(requests)
      .then((response) => {
        for (const responseData of response) {
          if (responseData.error) {
            return;
          }
          if (responseData.data !== '') {
            this.props.updateUser(responseData.data);
          }
        }
        this.props.history.push('/profile');
      });
  }

  changePassword() {
    const passwordEndpoint = 'persons/password';
    return Promise.resolve(
      Api.put(passwordEndpoint, { oldPassword: this.state.oldPassword, newPassword: this.state.newPassword })
        .then((response) => {
          if (response.error && response.error.response && response.error.response.status === 400) {
            this.makeAlert('Wrong old password. ');
            return response;
          }
          if (response.error) {
            this.makeAlert('Something went wrong. Try again later. ');
            return response;
          }
          return response;
        }),
    );
  }

  changeUserData() {
    const personEndpoint = 'persons';
    return Promise.resolve(
      Api.put(personEndpoint, this.state.user)
        .then((response) => {
          if (response.error && response.error.response && response.error.response.status === 400) {
            this.makeAlert('Bad request. Change profile information and try again. ');
            return response;
          }
          if (response.error) {
            this.makeAlert('Something went wrong. Try again later. ');
            return response;
          }
          return response;
        }),
    );
  }

  makeAlert(message) {
    const { alertError } = this.state;
    this.setState({
      alertError: alertError + message,
      isShowAlert: true,
    });
  }

  disableAlert() {
    this.setState({
      isShowAlert: false,
      alertError: '',
    });
  }

  handleUserData(name, value) {
    const { user } = this.state;
    user[name] = value;
    this.setState({
      user: user,
    });
  }

  handlePassword(name, value) {
    this.setState({
      [name]: value,
    });
  }

  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    const { errors, newPassword } = this.state;

    switch (name) {
      case 'name':
        errors.name = value.length < 1 ? 'The name cannot be empty' : '';
        this.handleUserData(name, value);
        break;
      case 'phoneNumber':
        errors.phoneNumber = validator.isMobilePhone(value) ? '' : 'Phone number is not valid! ';
        this.handleUserData(name, value);
        break;
      case 'oldPassword':
        this.handlePassword(name, value);
        break;
      case 'newPassword':
        this.handlePassword(name, value);
        errors.newPassword = value.length > 7 ? '' : 'New password must be at least 8 characters! ';
        errors.newPassword += /^\s|\s$/.test(value) ? 'New password cannot begin or end with a space!' : '';
        errors.newPassword += value === this.props.user.phoneNumber
          ? 'Password cannot be the same as the phone number! ' : '';
        errors.newPassword += value === this.props.user.email
          ? 'Password cannot be the same as the email address! ' : '';
        break;
      case 'confirmPassword':
        this.handlePassword(name, value);
        errors.confirmPassword = newPassword === value ? '' : 'Passwords do not match! ';
        break;
      default:
        break;
    }

    this.setState({
      errors: errors,
    });
  }

  isFormInvalid() {
    const {
      errors, user, previousUserData,
    } = this.state;

    if (errors.name.length || errors.phoneNumber.length) {
      return true;
    }
    if (JSON.stringify(user) === JSON.stringify(previousUserData)) {
      return true;
    }
    return false;
  }

  isPasswordFormInvalid() {
    const {
      errors, oldPassword, newPassword, confirmPassword,
    } = this.state;

    if (!oldPassword.length && !newPassword.length && !confirmPassword.length) {
      return false;
    }
    if (oldPassword.length < 8) {
      return true;
    }
    if (errors.oldPassword.length || errors.newPassword.length || errors.confirmPassword.length) {
      return true;
    }
    if (oldPassword.length && (!newPassword.length || !confirmPassword.length)) {
      return true;
    }
    return false;
  }

  render() {
    const {
      user, errors, isShowAlert, alertError,
    } = this.state;
    const { avatar } = this.props;
    return (
      <Container fluid>
        {isShowAlert && (
          <Alert variant="danger" onClose={() => this.disableAlert()} dismissible>
            <Alert.Heading>{alertError}</Alert.Heading>
          </Alert>
        )}
        <Row className="profile-row">
          <Col md="6">
            <Form onSubmit={this.updateProfile}>
              <Form.Group controlId="formGroupName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  required
                  min="1"
                  max="255"
                  placeholder="Enter a new name"
                  defaultValue={user.name}
                  onChange={this.handleChange}
                />
                {errors.name.length > 0 && (
                  <span className="errorMessage">{errors.name}</span>
                )}
              </Form.Group>
              <Form.Group controlId="formGroupPhone">
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phoneNumber"
                  required
                  placeholder="Enter a new phone number"
                  defaultValue={user.phoneNumber}
                  onChange={this.handleChange}
                />
                {errors.phoneNumber.length > 0 && (
                  <span className="errorMessage">{errors.phoneNumber}</span>
                )}
              </Form.Group>
              <Form.Group controlId="formGroupOldPassword">
                <Form.Label>Old password</Form.Label>
                <Form.Control
                  type="password"
                  name="oldPassword"
                  placeholder="Enter old password"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formGroupNewPassword">
                <Form.Label>New password</Form.Label>
                <Form.Control
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password"
                  onChange={this.handleChange}
                />
                {errors.newPassword.length > 0 && (
                  <span className="errorMessage">{errors.newPassword}</span>
                )}
              </Form.Group>
              <Form.Group controlId="formGroupConfirmPassword">
                <Form.Label>Confirm new password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  onChange={this.handleChange}
                />
                {errors.confirmPassword.length > 0 && (
                  <span className="errorMessage">{errors.confirmPassword}</span>
                )}
              </Form.Group>
              <hr className="hr-border mt-0" />
              <Link to="info">
                <Button variant="danger" className="ml-3 mb-5">Cancel</Button>
              </Link>
              <Button
                className="ml-3 mb-5"
                type="submit"
                disabled={this.isPasswordFormInvalid() || this.isFormInvalid()}
              >
                Submit
              </Button>
            </Form>
          </Col>

          <Col className="text-sm-center">
            <Link to="avatar">
              <Avatar
                className="mt-2"
                size="150"
                round
                src={avatar}
              />
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

ProfileEdit.propTypes = {
  user: PropTypes.any.isRequired,
  updateUser: PropTypes.any.isRequired,
  history: PropTypes.any.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default withRouter(ProfileEdit);
