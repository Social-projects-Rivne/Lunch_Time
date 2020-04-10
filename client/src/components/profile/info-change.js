import * as React from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import Avatar from 'react-avatar';
import PropTypes from 'prop-types';
import validator from 'validator';
import { Link, withRouter } from 'react-router-dom';
import AlertBase from '../shared/alert-base';
import PassChange from './pass-change';
import Api from '../../services/api';
import Input from '../shared/input';

class InfoChange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowAlert: false,
      user: this.props.user,
      updatedUser: this.props.user,
      errors: {
        name: '', phone: '', password: '', err: 'Profile is not changed',
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveFormState = this.saveFormState.bind(this);
  }

  setAlertState(showAlert) {
    this.setState({
      isShowAlert: showAlert,
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { errors } = this.state;
    switch (name) {
      case 'name':
        errors.name = value.length < 1 ? 'The name cannot be empty ' : '';
        break;
      case 'phoneNumber':
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
      this.setAlertState(true);
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
          this.setAlertState(true);
          return;
        }
        this.props.updateUser(user);
        this.props.history.push('/profile');
      });
  }

  render() {
    const {
      isShowAlert, user, updatedUser, errors,
    } = this.state;
    return (
      <Container fluid>
        <AlertBase
          show={isShowAlert}
          type="danger"
          title={Object.values(errors).join('')}
        />
        <Row className="profile-row">
          <Col md="6">
            <Input
              name="name"
              placeholder={updatedUser.name}
              label="Name"
              onChange={this.handleChange}
            />
            <Input
              name="phoneNumber"
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
            <Link to="avatar">
              <Avatar
                className="mt-2"
                name={updatedUser.name}
                size="150"
                round
                src={updatedUser.avatarUrl}
              />
            </Link>
          </Col>

        </Row>
        <hr className="hr-border mt-0" />
        <Button
          className="ml-3 m-button"
          type="submit"
          onClick={() => this.updateProfile()}
        >
          Submit
        </Button>
        <Link to="info">
          <Button className="ml-3 m-button">Cancel</Button>
        </Link>
      </Container>
    );
  }
}

InfoChange.propTypes = {
  user: PropTypes.any.isRequired,
  updateUser: PropTypes.any.isRequired,
  history: PropTypes.any.isRequired,
};

export default withRouter(InfoChange);
