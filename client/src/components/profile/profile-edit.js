import React, { Component } from 'react';
import {
  Form, Container, Row, Col, Button,
} from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import Avatar from 'react-avatar';
import PropTypes from 'prop-types';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isShowAlert: false,
      user: this.props.user,
      previousUserData: { ...this.props.user },

      // errors: {
      //   name: '', phone: '', password: '', err: 'Profile is not changed',
      // },
      oldPassword: null,
      newPassword: null,
      confirmPassword: null,
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.saveFormState = this.saveFormState.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  updateProfile(event) {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    console.log(this.state.user, this.state.previousUserData, form, this.state);
    this.props.history.push('/profile');
  }

  handleFormControl(event) {
    this.state.user[event.target.name] = event.target.value;
  }

  handlePassword(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const {
      user,
    } = this.state;
    return (
      <Container fluid>
        <Row className="profile-row">
          <Col md="6">
            <Form onSubmit={this.updateProfile}>
              <Form.Group controlId="formGroupName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter a new name"
                  defaultValue={user.name}
                  onChange={(event) => this.handleFormControl(event)}
                />
              </Form.Group>
              <Form.Group controlId="formGroupPhone">
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phoneNumber"
                  placeholder="Enter a new phone number"
                  defaultValue={user.phoneNumber}
                  onChange={(event) => this.handleFormControl(event)}
                />
              </Form.Group>
              <Form.Group controlId="formGroupOldPassword">
                <Form.Label>Old password</Form.Label>
                <Form.Control
                  type="password"
                  name="oldPassword"
                  placeholder="Enter old password"
                  onChange={(event) => this.handlePassword(event)}
                />
              </Form.Group>
              <Form.Group controlId="formGroupNewPassword">
                <Form.Label>New password</Form.Label>
                <Form.Control
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password"
                  onChange={(event) => this.handlePassword(event)}
                />
              </Form.Group>
              <Form.Group controlId="formGroupConfirmPassword">
                <Form.Label>Confirm new password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  onChange={(event) => this.handlePassword(event)}
                />
              </Form.Group>
              <hr className="hr-border mt-0" />
              <Link to="info">
                <Button variant="danger" className="ml-3 mb-5">Cancel</Button>
              </Link>
              <Button
                className="ml-3 mb-5"
                type="submit"
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
                src={user.avatar}
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
  // updateUser: PropTypes.any.isRequired,
  history: PropTypes.any.isRequired,
};

export default withRouter(ProfileEdit);
