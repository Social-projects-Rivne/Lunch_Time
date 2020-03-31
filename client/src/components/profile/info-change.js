import * as React from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Avatar from 'react-avatar';
import PropTypes from 'prop-types';
import AlertBase from '../shared/alert-base';
import PassChange from './pass-change';
import Api from '../../services/api';

class InfoChange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowAlert: false,
      isSuccessUpdate: true,
      user: this.props.user,
      updatedUser: this.props.user,
    };
    this.fileInputRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
  }

  onAvatarClick() {
    this.fileInputRef.current.click();
  }

  onFileSelect() {
    console.log('Selected');
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      updatedUser: {
        ...prevState.updatedUser,
        [name]: value,
      },
    }));
  }

  updateProfile() {
    const { updatedUser, user } = this.state;
    if (updatedUser === user) {
      this.setState({
        isShowAlert: true,
        isSuccessUpdate: false,
      });
    } else {
      this.sendData(updatedUser);
    }
  }

  sendData(user) {
    Api.put('persons', user)
      .then((response) => {
        if (response.error) {
          this.setState({
            isShowAlert: true,
            isSuccessUpdate: false,
          });
          return;
        }
        this.setState({
          isShowAlert: true,
          isSuccessUpdate: true,
        });
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
    const { isShowAlert, isSuccessUpdate, user } = this.state;
    let alert;

    if (isSuccessUpdate) {
      alert = this.initAlert('success', 'Your profile was successfully updated');
    } else {
      alert = this.initAlert('danger', 'Profile is not updated');
    }

    return (
      <Container fluid>
        {isShowAlert ? (alert) : ('')}
        <Row className="profile-row">
          <Col md="6">
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={this.handleChange}
                placeholder={user.name}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                onChange={this.handleChange}
                placeholder={user.email}
              />
            </Form.Group>

            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="phoneNumber"
                type="phone"
                onChange={this.handleChange}
                placeholder={user.phoneNumber}
              />
            </Form.Group>
            <PassChange />
          </Col>
          <Col className="text-sm-center">
            <Avatar
              name={user.name}
              size="150"
              round
              src={user.avatarUrl}
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
