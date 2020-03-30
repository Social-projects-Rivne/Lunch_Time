import * as React from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Avatar from 'react-avatar';
import PropTypes from 'prop-types';
import AlertBase from '../shared/alert-base';

class InfoChange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowAlert: false,
      isSuccessUpdate: true,
    };
  }

  updateProfile() {
    this.setState({
      // TODO: add isSuccess logic there
      isShowAlert: true,
    });
  }

  render() {
    const { user } = this.props;
    const { isShowAlert, isSuccessUpdate } = this.state;
    let alert;

    if (isSuccessUpdate) {
      alert = (
        <AlertBase
          type="success"
          title="Your profile was successfully updated"
        />
      );
    } else {
      alert = (
        <AlertBase
          type="danger"
          title="Profile is not updated"
        />
      );
    }

    return (
      <Container fluid>
        {isShowAlert ? (alert) : ('')}
        <Row className="profile-row">
          <Col md="6">
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" placeholder={user.name} />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder={user.email} />
              <Form.Text className="text-white">
                We&apos;ll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="phone" placeholder={user.phoneNumber} />
            </Form.Group>

            <hr className="hr-border" />
            <Button
              className="m-button"
              type="submit"
              onClick={() => this.updateProfile()}
            >
              Submit
            </Button>
          </Col>
          <Col className="text-sm-center">
            <Avatar name={user.name} size="150" round src={user.avatarUrl} />
          </Col>
        </Row>
      </Container>
    );
  }
}

InfoChange.propTypes = {
  user: PropTypes.any.isRequired,

};

export default InfoChange;
