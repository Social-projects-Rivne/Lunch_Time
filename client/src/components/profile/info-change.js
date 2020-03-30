import * as React from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Avatar from 'react-avatar';

class InfoChange extends React.Component {
  render() {
    return (
      <Container fluid>
        <Row className="profile-row">
          <Col md="6">
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" placeholder="Enter a new name" />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-white">
                We&apos;ll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="phone" placeholder="Enter a new phone number" />
            </Form.Group>

            <hr className="hr-border" />
            <Button className="m-button" type="submit">
              Submit
            </Button>
          </Col>
          <Col className="text-sm-center">
            <Avatar name="ads" size="150" round src="" />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default InfoChange;
