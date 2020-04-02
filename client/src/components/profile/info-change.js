import * as React from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import Avatar from 'react-avatar';
import PropTypes from 'prop-types';
import validator from 'validator';
import AlertBase from '../shared/alert-base';
import PassChange from './pass-change';
import Api from '../../services/api';
import Input from '../shared/input';

class InfoChange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowAlert: false,
      isSuccessUpdate: false,
      user: this.props.user,
      updatedUser: this.props.user,
      errors: {
        name: '', email: '', phone: '', password: '', err: 'Profile is not changed',
      },
    };
    this.fileInputRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.saveFormState = this.saveFormState.bind(this);
  }

  onAvatarClick() {
    this.fileInputRef.current.click();
  }

  onFileSelect() {
    console.log('Selected');
  }

  setAlertState(showAlert, success) {
    this.setState({
      isShowAlert: showAlert,
      isSuccessUpdate: success,
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { errors } = this.state;
    const validEmailRegex = RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);
    switch (name) {
      case 'name':
        errors.name = value.length < 3 ? 'Name must be 3 characters long! ' : '';
        break;
      case 'email':
        errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid! ';
        break;
      case 'phone':
        errors.phone = validator.isMobilePhone(value) ? '' : 'Phone number is not valid! ';
        break;
      default:
        break;
    }
    errors.err = '';
    this.saveFormState(errors, name, value);
  }

  saveFormState(errors, name, value) {
    this.setState((prevState) => ({
      updatedUser: {
        ...prevState.updatedUser,
        [name]: value,
      },
      errors,
      [name]: value,
      isShowAlert: false,
    }));
  }

  updateProfile() {
    const { updatedUser, user, errors } = this.state;
    if (updatedUser === user || !this.validateForm(errors)) {
      this.setAlertState(true, false);
    } else {
      this.sendData(updatedUser);
    }
  }

  validateForm(errors) {
    let valid = true;
    Object.values(errors).forEach(
      (val) => { if (val.length > 0) valid = false; },
    );
    return valid;
  }

  sendData(user) {
    Api.put('persons', user)
      .then((response) => {
        if (response.error) {
          this.setAlertState(true, false);
          return;
        }
        this.setAlertState(true, true);
      });
  }

  initAlert(type, title) {
    return (
      <AlertBase
        type={type}
        title={title}
      />
    );
  }

  render() {
    const {
      isShowAlert, isSuccessUpdate, user, updatedUser, errors,
    } = this.state;
    let alert;

    if (isSuccessUpdate) {
      alert = this.initAlert('success', 'Your profile was successfully updated');
    } else {
      alert = this.initAlert('danger', Object.values(errors).join(''));
    }

    return (
      <Container fluid>
        {isShowAlert ? (alert) : ('')}
        <Row className="profile-row">
          <Col md="6">
            <Input
              name="name"
              placeholder={updatedUser.name}
              label="Name"
              onChange={this.handleChange}
            />
            <Input
              name="email"
              placeholder={updatedUser.email}
              label="Email address"
              onChange={this.handleChange}
            />
            <Input
              name="phone"
              placeholder={updatedUser.phoneNumber}
              label="Phone number"
              onChange={this.handleChange}
            />
            <PassChange
              user={user}
              onChange={this.saveFormState}
            />
          </Col>
          <Col className="text-sm-center">
            <Avatar
              className="mt-2"
              name={updatedUser.name}
              size="150"
              round
              src={updatedUser.avatarUrl}
              onClick={() => this.onAvatarClick()}
            />
            <input
              ref={this.fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              hidden
              onChange={() => this.onFileSelect()}
            />
          </Col>

        </Row>
        <hr className="hr-border" />
        <Button
          className="ml-3 m-button"
          type="submit"
          onClick={() => this.updateProfile()}
        >
          Submit
        </Button>
        <Button className="ml-3 m-button" href="info">Cancel</Button>
      </Container>
    );
  }
}

InfoChange.propTypes = {
  user: PropTypes.any.isRequired,
};

export default InfoChange;
