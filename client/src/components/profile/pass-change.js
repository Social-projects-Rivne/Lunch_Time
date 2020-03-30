import * as React from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

class PassChange extends React.Component {
  render() {
    return (
      <Container fluid>
        <Row className="profile-row">
          <Col md="6">
            <Form.Group controlId="name">
              <Form.Label>Old password</Form.Label>
              <Form.Control type="name" placeholder="Enter old password" />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>New password</Form.Label>
              <Form.Control type="email" placeholder="Enter new password" />
            </Form.Group>

            <Form.Group controlId="phone">
              <Form.Label>Repeat new password</Form.Label>
              <Form.Control type="phone" placeholder="Repeat new password" />
            </Form.Group>

            <hr className="hr-border" />
            <Button className="m-button" type="submit">
              Change
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default PassChange;
