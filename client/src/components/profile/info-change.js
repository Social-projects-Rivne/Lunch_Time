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

  updateUser(data) {
    this.setState({
      user: data,
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
      user: {
        ...prevState.user,
        [name]: value,
      },
      errors,
      [name]: value,
      isShowAlert: false,
    }));
  }

  updateProfile() {
    const { user, errors } = this.state;
    if (!this.validateForm(errors)) {
      this.setAlertState(true);
    } else if (user.password !== undefined) {
      this.sendData('persons/password', user);
    } else {
      this.sendData('persons', user);
    }
  }

  validateForm(errors) {
    let valid = true;
    Object.values(errors).forEach(
      (val) => { if (val.length > 0) valid = false; },
    );
    if (errors.err === 'Profile is not changed') {
      this.props.history.push('/profile');
    }
    return valid;
  }

  sendData(path, data) {
    const { errors } = this.state;
    Api.put(path, data)
      .then((response) => {
        if (response.status === 204) {
          errors.err = 'Wrong old password ';
          this.setAlertState(true);
          return;
        }
        if (response.error) {
          errors.err = 'Server Error, please try again later! ';
          this.setAlertState(true);
          return;
        }
        // eslint-disable-next-line no-param-reassign
        data.password = undefined;
        this.updateUser(data);
        this.props.updateUser(data);
        this.props.history.push('/profile');
      });
  }

  render() {
    const {
      isShowAlert, user, errors,
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
              label="Name"
              value={user.name}
              placeholder="Enter a new name"
              onChange={this.handleChange}
            />
            <Input
              name="phoneNumber"
              label="Phone number"
              value={user.phoneNumber}
              placeholder="Enter a new phone number"
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
                size="150"
                round
                src={user.avatar}
              />
            </Link>
          </Col>

        </Row>
        <hr className="hr-border mt-0" />
        <Button
          className="ml-3 mb-5"
          type="submit"
          onClick={() => this.updateProfile()}
        >
          Submit
        </Button>
        <Link to="info">
          <Button variant="danger" className="ml-3 mb-5">Cancel</Button>
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
