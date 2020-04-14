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
      data: {
        id: this.props.user.id,
        name: this.props.user.name,
        phoneNumber: this.props.user.phoneNumber,
      },
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
    console.log(`name=${name} val=${value}`);
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        [name]: value,
      },
      errors,
      [name]: value,
      isShowAlert: false,
    }));
  }

  updateProfile() {
    const { data, errors } = this.state;
    if (!this.validateForm(errors)) {
      this.setAlertState(true);
    } else if (data.password !== undefined) {
      this.sendData('persons/password', data);
    } else {
      this.sendData('persons', data);
    }
  }

  validateForm(errors) {
    let valid = true;
    Object.values(errors).forEach(
      (val) => { if (val.length > 0) valid = false; },
    );
    return valid;
  }

  sendData(path, data) {
    const { user, errors } = this.state;
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
        Object.assign(user, data);
        this.props.updateUser(user);
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
              placeholder={user.name}
              label="Name"
              onChange={this.handleChange}
            />
            <Input
              name="phoneNumber"
              placeholder={user.phoneNumber}
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
                name={user.name}
                size="150"
                round
                src={user.avatarUrl}
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
