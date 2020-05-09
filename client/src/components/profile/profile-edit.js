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
      // errors: {
      //   name: '', phone: '', password: '', err: 'Profile is not changed',
      // },
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.saveFormState = this.saveFormState.bind(this);
  }

  updateProfile() {
    console.log(this.state.user);
    this.props.history.push('/profile');
  }

  render() {
    const {
      user,
    } = this.state;
    return (
      <Container fluid>
        <Row className="profile-row">
          <Col md="6">
            <Form>
              <Form.Group controlId="formGroupName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter a new name" />
              </Form.Group>
              <Form.Group controlId="formGroupPhone">
                <Form.Label>Phone number</Form.Label>
                <Form.Control type="tel" placeholder="Enter a new phone number" />
              </Form.Group>
              <Form.Group controlId="formGroupOldPassword">
                <Form.Label>Old password</Form.Label>
                <Form.Control type="password" placeholder="Enter old password" />
              </Form.Group>
              <Form.Group controlId="formGroupNewPassword">
                <Form.Label>New password</Form.Label>
                <Form.Control type="password" placeholder="Enter new password" />
              </Form.Group>
              <Form.Group controlId="formGroupConfirmPassword">
                <Form.Label>Confirm new password</Form.Label>
                <Form.Control type="password" placeholder="Confirm new password" />
              </Form.Group>
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

        <hr className="hr-border mt-0" />
        <Link to="info">
          <Button variant="danger" className="ml-3 mb-5">Cancel</Button>
        </Link>
        <Button
          className="ml-3 mb-5"
          type="submit"
          onClick={() => this.updateProfile()}
        >
          Submit
        </Button>
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
