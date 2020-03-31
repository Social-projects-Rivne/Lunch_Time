import * as React from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

class PassChange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
    };
  }

  toggle() {
    this.setState((currentState) => ({ showForm: !currentState.showForm }));
  }

  render() {
    return (
      <div>
        {!this.state.showForm
        && (
        <Button className="m-button" onClick={() => this.toggle()}>
          Change password
        </Button>
        )}
        {this.state.showForm
        && (
        <div>
          <Form.Group className="mt-2" controlId="name">
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
        </div>
        )}
      </div>
    );
  }
}

export default PassChange;
